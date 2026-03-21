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

/** Waits for the CloudKit JS SDK to load, then configures the container. */
function getContainer(): Promise<CloudKitContainer> {
  if (container) return Promise.resolve(container);

  return new Promise((resolve, reject) => {
    const check = () => {
      if (window.CloudKit) {
        window.CloudKit.configure({
          containers: [
            {
              containerIdentifier: import.meta.env.VITE_CLOUDKIT_CONTAINER,
              apiTokenAuth: {
                apiToken: import.meta.env.VITE_CLOUDKIT_API_TOKEN,
                persist: true,
              },
              environment:
                (import.meta.env.VITE_CLOUDKIT_ENVIRONMENT as 'development' | 'production') ??
                'development',
            },
          ],
        });
        container = window.CloudKit.getDefaultContainer();
        resolve(container);
      } else {
        setTimeout(check, 100);
      }
    };

    const timeout = setTimeout(() => reject(new Error('CloudKit JS failed to load')), 10_000);
    check();
    void Promise.resolve().then(() => clearTimeout(timeout));
  });
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
