/**
 * CloudKit JS service for authenticating users and fetching/saving
 * their private Opalite data (colors & palettes).
 */

import type {
  OpaliteColor,
  OpalitePalette,
  CloudKitContainer,
  CloudKitRecord,
} from '../types/opalite';

// SwiftData/CoreData CloudKit sync zone
const CK_ZONE = 'com.apple.coredata.cloudkit.zone';

let container: CloudKitContainer | null = null;

// Raw CloudKit records keyed by CD_id — needed for saving modifications
const colorRecordMap = new Map<string, CloudKitRecord>();
// Palette recordName keyed by CD_id — needed for setting CD_palette references
const paletteRecordNameMap = new Map<string, string>();

const CLOUDKIT_JS_URL = 'https://cdn.apple-cloudkit.com/ck/2/cloudkit.js';
const CLOUDKIT_SCRIPT_ID = 'cloudkit-js';

/** Thrown when the site was built without the CloudKit configuration. */
export class CloudKitConfigError extends Error {
  constructor() {
    super('CloudKit is not configured for this build');
    this.name = 'CloudKitConfigError';
  }
}

/**
 * Loads CloudKit JS on demand. Only the Opalite Web route needs it, so the
 * 200 KB script is not in index.html; it is injected the first time a
 * CloudKit call is made and reused afterwards.
 */
function loadCloudKitScript(): Promise<void> {
  if (window.CloudKit) return Promise.resolve();
  return new Promise((resolve, reject) => {
    let script = document.getElementById(CLOUDKIT_SCRIPT_ID) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = CLOUDKIT_SCRIPT_ID;
      script.src = CLOUDKIT_JS_URL;
      script.async = true;
      document.head.appendChild(script);
    }
    const timeout = setTimeout(() => reject(new Error('CloudKit JS failed to load')), 15_000);
    script.addEventListener('load', () => {
      clearTimeout(timeout);
      resolve();
    });
    script.addEventListener('error', () => {
      clearTimeout(timeout);
      script?.remove();
      reject(new Error('CloudKit JS failed to load'));
    });
  });
}

/** Configures the container once CloudKit JS is available. */
async function getContainer(): Promise<CloudKitContainer> {
  if (container) return container;

  const containerIdentifier = import.meta.env.VITE_CLOUDKIT_CONTAINER as string | undefined;
  const apiToken = import.meta.env.VITE_CLOUDKIT_API_TOKEN as string | undefined;
  const environment = (import.meta.env.VITE_CLOUDKIT_ENVIRONMENT as 'development' | 'production' | undefined) ?? 'production';
  if (!containerIdentifier || !apiToken) {
    // Without these, CloudKit JS builds requests against ".../undefined/..."
    // and Apple answers "Method Not Allowed". Fail early with a clear cause.
    throw new CloudKitConfigError();
  }

  await loadCloudKitScript();
  if (!window.CloudKit) throw new Error('CloudKit JS failed to load');

  window.CloudKit.configure({
    containers: [
      {
        containerIdentifier,
        apiTokenAuth: { apiToken, persist: true },
        environment,
      },
    ],
  });
  container = window.CloudKit.getDefaultContainer();
  return container;
}

/** Drops the cached container so the next call reconfigures from scratch. */
export function resetContainer() {
  container = null;
}

/**
 * Turns CloudKit's raw errors into something a person can act on. The raw
 * message is logged to the console for debugging; the UI never shows it.
 */
export function describeCloudKitError(err: unknown): string {
  const raw = err instanceof Error ? err.message : typeof err === 'string' ? err : JSON.stringify(err);
  console.error('[CloudKit]', raw, err);
  if (err instanceof CloudKitConfigError) {
    return 'Opalite Web is temporarily unavailable. Please try again later.';
  }
  const text = raw.toLowerCase();
  if (text.includes('authentication failed') || text.includes('authentication_failed')) {
    // The API token does not allow this origin, or belongs to another
    // container/environment: fixed in CloudKit Dashboard, not by retrying.
    return "Opalite Web isn't authorized to reach iCloud from this address yet. Please try again later.";
  }
  if (text.includes('failed to load')) {
    return "We couldn't load Apple's iCloud library. Check your connection and try again.";
  }
  if (text.includes('method not allowed') || text.includes('unexpected_server_response') || text.includes('not_found')) {
    return "We couldn't reach your iCloud library right now. Please try again in a moment.";
  }
  if (text.includes('auth') || text.includes('401') || text.includes('403')) {
    return 'Your iCloud session has expired. Sign in again to continue.';
  }
  if (text.includes('network') || text.includes('fetch')) {
    return 'The connection to iCloud was interrupted. Check your network and try again.';
  }
  return 'Something went wrong while talking to iCloud. Please try again.';
}

/** Authenticate the user via Apple ID. Returns user identity or null. */
export async function signIn() {
  const c = await getContainer();
  const identity = await c.setUpAuth({
    signInButton: { id: 'apple-sign-in-button' },
    signOutButton: { id: 'apple-sign-out-button' },
  });
  return identity;
}

/** Listen for sign-out events. */
export async function onSignOut(callback: () => void) {
  const c = await getContainer();
  c.whenUserSignsOut().then(callback);
}

/** Listen for sign-in events. */
export async function onSignIn(callback: (identity: unknown) => void) {
  const c = await getContainer();
  c.whenUserSignsIn().then(callback);
}

// ─── Record parsing ──────────────────────────────────────────────

function fieldValue<T>(record: CloudKitRecord, cdField: string, fallback: T): T {
  const field = record.fields[cdField];
  if (!field || field.value === undefined || field.value === null) return fallback;
  return field.value as T;
}

function parseColor(record: CloudKitRecord): OpaliteColor {
  return {
    id: fieldValue(record, 'CD_id', record.recordName),
    name: fieldValue(record, 'CD_name', undefined) as string | undefined,
    notes: fieldValue(record, 'CD_notes', undefined) as string | undefined,
    red: fieldValue(record, 'CD_red', 0),
    green: fieldValue(record, 'CD_green', 0),
    blue: fieldValue(record, 'CD_blue', 0),
    alpha: fieldValue(record, 'CD_alpha', 1),
    createdAt: new Date(fieldValue(record, 'CD_createdAt', Date.now())),
    updatedAt: new Date(fieldValue(record, 'CD_updatedAt', Date.now())),
    createdByDisplayName: fieldValue(record, 'CD_createdByDisplayName', undefined) as
      | string
      | undefined,
    createdOnDeviceName: fieldValue(record, 'CD_createdOnDeviceName', undefined) as
      | string
      | undefined,
    updatedOnDeviceName: fieldValue(record, 'CD_updatedOnDeviceName', undefined) as
      | string
      | undefined,
    paletteId: undefined, // resolved below from reference
  };
}

function parsePalette(record: CloudKitRecord): OpalitePalette {
  const tagsRaw = fieldValue(record, 'CD_tags', null);
  let tags: string[] = [];
  if (Array.isArray(tagsRaw)) {
    tags = tagsRaw as string[];
  } else if (typeof tagsRaw === 'string') {
    try {
      tags = JSON.parse(tagsRaw);
    } catch {
      tags = [];
    }
  }

  return {
    id: fieldValue(record, 'CD_id', record.recordName),
    name: fieldValue(record, 'CD_name', 'Untitled'),
    notes: fieldValue(record, 'CD_notes', undefined) as string | undefined,
    tags,
    createdAt: new Date(fieldValue(record, 'CD_createdAt', Date.now())),
    updatedAt: new Date(fieldValue(record, 'CD_updatedAt', Date.now())),
    createdByDisplayName: fieldValue(record, 'CD_createdByDisplayName', undefined) as
      | string
      | undefined,
    previewBackgroundRaw: fieldValue(record, 'CD_previewBackgroundRaw', undefined) as
      | string
      | undefined,
    colors: [],
  };
}

// ─── Data fetching ───────────────────────────────────────────────

async function queryPrivateRecords(recordType: string): Promise<CloudKitRecord[]> {
  const c = await getContainer();
  const db = c.privateCloudDatabase;

  const allRecords: CloudKitRecord[] = [];
  let continuationMarker: string | undefined;

  const performQuery = (db as unknown as {
    performQuery(
      query: Record<string, unknown>,
      options?: Record<string, unknown>
    ): Promise<{
      records: CloudKitRecord[];
      continuationMarker?: string;
    }>;
  }).performQuery.bind(db);

  do {
    const zoneOptions: Record<string, unknown> = {
      zoneID: { zoneName: CK_ZONE },
    };

    if (continuationMarker) {
      zoneOptions.continuationMarker = continuationMarker;
    }

    const response = await performQuery({ recordType }, zoneOptions);

    if (response.records) {
      allRecords.push(...response.records);
    }
    continuationMarker = response.continuationMarker;
  } while (continuationMarker);

  return allRecords;
}

/** Fetch all palettes and colors, returning them organized. */
export async function fetchPortfolio(): Promise<{
  palettes: OpalitePalette[];
  looseColors: OpaliteColor[];
}> {
  const [paletteRecords, colorRecords] = await Promise.all([
    queryPrivateRecords('CD_OpalitePalette'),
    queryPrivateRecords('CD_OpaliteColor'),
  ]);

  // Clear and rebuild record maps
  colorRecordMap.clear();
  paletteRecordNameMap.clear();

  // Parse palettes (exclude archived)
  const palettes: OpalitePalette[] = [];
  const paletteMap = new Map<string, OpalitePalette>();

  for (const record of paletteRecords) {
    if (fieldValue(record, 'CD_isArchived', 0)) continue;
    const palette = parsePalette(record);
    palettes.push(palette);
    // Map by recordName (what colors reference via CD_palette)
    paletteMap.set(record.recordName, palette);
    // Map CD_id → recordName for when we need to set CD_palette on a color
    paletteRecordNameMap.set(palette.id, record.recordName);
  }

  // Parse colors and assign to palettes
  const looseColors: OpaliteColor[] = [];

  for (const record of colorRecords) {
    const color = parseColor(record);

    // Store raw record keyed by CD_id for later saves
    colorRecordMap.set(color.id, record);

    // CD_palette is a string matching the palette's CloudKit recordName
    const paletteIdField = record.fields['CD_palette'];
    const paletteId = paletteIdField?.value as string | undefined;
    if (paletteId && paletteMap.has(paletteId)) {
      color.paletteId = paletteId;
      paletteMap.get(paletteId)!.colors.push(color);
      continue;
    }

    looseColors.push(color);
  }

  // Sort palettes by createdAt descending
  palettes.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Sort each palette's colors by createdAt descending
  for (const palette of palettes) {
    palette.colors.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  // Sort loose colors by createdAt descending (matches app's colorSort)
  looseColors.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return { palettes, looseColors };
}

// ─── Record saving ───────────────────────────────────────────────

/**
 * Reassign a color to a different palette (or make it loose).
 * @param colorId - The CD_id of the color to move
 * @param targetPaletteId - The CD_id of the target palette, or null to detach
 */
export async function saveColorPaletteAssignment(
  colorId: string,
  targetPaletteId: string | null
): Promise<void> {
  const record = colorRecordMap.get(colorId);
  if (!record) throw new Error('Color record not found in cache');

  const c = await getContainer();
  const db = c.privateCloudDatabase;

  // Build the palette reference value
  // CD_palette stores the palette's CloudKit recordName, or null for loose colors.
  // IMPORTANT: Never set CD_palette to an empty string — CoreData interprets it as
  // a reference with an empty recordName, which crashes the import on Apple devices.
  let paletteRecordName: string | null = null;
  if (targetPaletteId) {
    const rn = paletteRecordNameMap.get(targetPaletteId);
    if (!rn) throw new Error('Palette record not found in cache');
    paletteRecordName = rn;
  }

  const now = Date.now();

  // Build fields — spread existing, override what changed, remove CD_palette if loose
  const fields = { ...record.fields };
  if (paletteRecordName) {
    fields.CD_palette = { value: paletteRecordName, type: 'STRING' };
  } else {
    delete fields.CD_palette;
  }
  fields.CD_updatedAt = { value: now, type: 'TIMESTAMP' };
  fields.CD_updatedOnDeviceName = { value: 'Opalite Web', type: 'STRING' };

  const recordToSave = {
    recordType: 'CD_OpaliteColor',
    recordName: record.recordName,
    recordChangeTag: record.recordChangeTag,
    fields,
  };

  const saveRecords = (db as unknown as {
    saveRecords(
      records: Record<string, unknown>[],
      options?: Record<string, unknown>
    ): Promise<{ records: CloudKitRecord[] }>;
  }).saveRecords.bind(db);

  console.log('[OpaliteWeb] Saving record:', record.recordName, '→ palette:', paletteRecordName || '(loose)');

  const response = await saveRecords(
    [recordToSave],
    { zoneID: { zoneName: CK_ZONE } }
  );

  console.log('[OpaliteWeb] Save response:', response);

  // Update our cached record with the new recordChangeTag
  if (response.records?.[0]) {
    colorRecordMap.set(colorId, response.records[0]);
  }
}

/**
 * Create a new loose color from a hex string.
 * Returns the parsed OpaliteColor for optimistic UI.
 */
export async function createColorFromHex(hex: string): Promise<OpaliteColor> {
  // Parse hex
  const clean = hex.replace(/^#/, '');
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) throw new Error('Invalid hex color');
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;

  const now = Date.now();
  const colorId = crypto.randomUUID().toUpperCase();

  const c = await getContainer();
  const db = c.privateCloudDatabase;

  const recordToSave = {
    recordType: 'CD_OpaliteColor',
    fields: {
      CD_id: { value: colorId, type: 'STRING' },
      CD_red: { value: r, type: 'DOUBLE' },
      CD_green: { value: g, type: 'DOUBLE' },
      CD_blue: { value: b, type: 'DOUBLE' },
      CD_alpha: { value: 1, type: 'DOUBLE' },
      CD_createdAt: { value: now, type: 'TIMESTAMP' },
      CD_updatedAt: { value: now, type: 'TIMESTAMP' },
      CD_createdOnDeviceName: { value: 'Opalite Web', type: 'STRING' },
      CD_updatedOnDeviceName: { value: 'Opalite Web', type: 'STRING' },
      CD_createdByDisplayName: { value: 'User', type: 'STRING' },
      CD_entityName: { value: 'OpaliteColor', type: 'STRING' },
    },
  };

  const saveRecords = (db as unknown as {
    saveRecords(
      records: Record<string, unknown>[],
      options?: Record<string, unknown>
    ): Promise<{ records: CloudKitRecord[] }>;
  }).saveRecords.bind(db);

  const response = await saveRecords(
    [recordToSave],
    { zoneID: { zoneName: CK_ZONE } }
  );

  // Cache the new record
  if (response.records?.[0]) {
    colorRecordMap.set(colorId, response.records[0]);
  }

  return {
    id: colorId,
    name: undefined,
    notes: undefined,
    red: r,
    green: g,
    blue: b,
    alpha: 1,
    createdAt: new Date(now),
    updatedAt: new Date(now),
    createdByDisplayName: 'User',
    createdOnDeviceName: 'Opalite Web',
    updatedOnDeviceName: 'Opalite Web',
    paletteId: undefined,
  };
}
