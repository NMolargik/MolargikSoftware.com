/**
 * CloudKit JS service for authenticating users and fetching
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

    // Timeout after 10 seconds
    const timeout = setTimeout(() => reject(new Error('CloudKit JS failed to load')), 10_000);
    check();
    // Clear timeout on success (check resolves synchronously if already loaded)
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

    let response;
    if (continuationMarker) {
      // For pagination, pass continuation marker in options
      zoneOptions.continuationMarker = continuationMarker;
      response = await performQuery({ recordType }, zoneOptions);
    } else {
      response = await performQuery({ recordType }, zoneOptions);
    }

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

  // Parse palettes (exclude archived)
  // Keep a mapping from recordName → palette, since colors reference palettes by recordName
  const palettes: OpalitePalette[] = [];
  const paletteMap = new Map<string, OpalitePalette>();

  for (const record of paletteRecords) {
    if (fieldValue(record, 'CD_isArchived', 0)) continue;
    const palette = parsePalette(record);
    palettes.push(palette);
    paletteMap.set(record.recordName, palette);
  }

  // Parse colors and assign to palettes
  const looseColors: OpaliteColor[] = [];

  for (const record of colorRecords) {
    const color = parseColor(record);

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
