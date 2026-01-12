/**
 * CloudKit service for Opalite Web
 * Handles authentication and data fetching from iCloud
 */

import type {
  OpaliteColor,
  OpalitePalette,
  CloudKitContainer,
  CloudKitRecord,
  CloudKitUserIdentity,
  CloudKitAuthOptions,
} from '../types/opalite';

// Singleton container instance
let container: CloudKitContainer | null = null;
let isInitialized = false;

/**
 * Initialize CloudKit with configuration
 * Must be called before any other CloudKit operations
 */
export async function initCloudKit(): Promise<CloudKitContainer | null> {
  if (isInitialized && container) {
    return container;
  }

  // Wait for CloudKit JS to load
  if (!window.CloudKit) {
    // Try waiting for the script to load
    await new Promise<void>((resolve) => {
      const checkInterval = setInterval(() => {
        if (window.CloudKit) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);
      // Timeout after 10 seconds
      setTimeout(() => {
        clearInterval(checkInterval);
        resolve();
      }, 10000);
    });
  }

  if (!window.CloudKit) {
    console.error('CloudKit JS SDK not loaded');
    return null;
  }

  const containerIdentifier = import.meta.env.VITE_CLOUDKIT_CONTAINER;
  const apiToken = import.meta.env.VITE_CLOUDKIT_API_TOKEN;
  const environment = (import.meta.env.VITE_CLOUDKIT_ENVIRONMENT || 'production') as 'development' | 'production';

  console.log('CloudKit config:', {
    containerIdentifier,
    apiToken: apiToken || 'MISSING',
    apiTokenLength: apiToken?.length,
    environment,
  });

  if (!containerIdentifier || !apiToken) {
    console.error('CloudKit environment variables not configured');
    return null;
  }

  try {
    window.CloudKit.configure({
      containers: [
        {
          containerIdentifier,
          apiTokenAuth: {
            apiToken,
            persist: true,
          },
          environment,
        },
      ],
    });

    container = window.CloudKit.getDefaultContainer();
    isInitialized = true;
    return container;
  } catch (error) {
    console.error('Failed to initialize CloudKit:', error);
    return null;
  }
}

/**
 * Get the current CloudKit container
 */
export function getContainer(): CloudKitContainer | null {
  return container;
}

// Store reference to auth object for sign-in triggering
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let authInstance: any = null;

/**
 * Set up authentication and get current user status
 * @param signInButtonId - Optional DOM element ID for CloudKit to render sign-in button
 * @param signOutButtonId - Optional DOM element ID for CloudKit to render sign-out button
 */
export async function setupAuth(
  signInButtonId?: string,
  signOutButtonId?: string
): Promise<CloudKitUserIdentity | null> {
  const ck = await initCloudKit();
  if (!ck) return null;

  try {
    // Build auth options - CloudKit needs these to render its buttons
    const authOptions: CloudKitAuthOptions = {};

    if (signInButtonId) {
      const signInContainer = document.getElementById(signInButtonId);
      if (signInContainer) {
        authOptions.signInButton = { id: signInButtonId };
      }
    }

    if (signOutButtonId) {
      const signOutContainer = document.getElementById(signOutButtonId);
      if (signOutContainer) {
        authOptions.signOutButton = { id: signOutButtonId };
      }
    }

    // setUpAuth returns the current user identity if already signed in
    // When button containers are provided, CloudKit renders its buttons there
    const userIdentity = await ck.setUpAuth(authOptions);
    console.log('CloudKit auth setup complete, user:', userIdentity);

    // Store auth instance for later use
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    authInstance = (ck as any)._auth || null;
    console.log('Auth instance:', authInstance);

    return userIdentity;
  } catch (error) {
    console.error('CloudKit auth setup failed:', error);
    return null;
  }
}

/**
 * Sign in with Apple
 * Redirects to Apple's sign-in URL provided by CloudKit
 */
export async function signIn(): Promise<CloudKitUserIdentity | null> {
  const ck = await initCloudKit();
  if (!ck) return null;

  return new Promise((resolve) => {
    console.log('Starting CloudKit sign in...');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const containerAny = ck as any;

    // Get the sign-in URL from the auth instance
    const signInURL = containerAny._auth?._signInURL;

    if (!signInURL) {
      console.error('No sign-in URL available');
      resolve(null);
      return;
    }

    console.log('Redirecting to Apple sign-in URL...');

    // Listen for the postMessage from Apple sign-in
    const messageHandler = (event: MessageEvent) => {
      // Only handle messages from Apple's CloudKit
      if (event.origin === 'https://cdn.apple-cloudkit.com' && event.data?.ckSession) {
        console.log('Authentication successful! Session received.');
        window.removeEventListener('message', messageHandler);

        // Give CloudKit JS a moment to process the session
        setTimeout(async () => {
          // Fetch the current user identity
          try {
            const userIdentity = await ck.fetchCurrentUserIdentity();
            console.log('User identity:', userIdentity);
            resolve(userIdentity);
          } catch {
            // If fetchCurrentUserIdentity fails, try to construct from session
            console.log('Using session data directly');
            resolve({
              userRecordName: event.data.ckSession.split('__')[0] || 'authenticated',
              nameComponents: undefined,
            } as CloudKitUserIdentity);
          }
        }, 500);
      }
    };
    window.addEventListener('message', messageHandler);

    // Open sign-in in a popup window
    const width = 600;
    const height = 700;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const popup = window.open(
      signInURL,
      'apple-sign-in',
      `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no`
    );

    // Also handle popup being closed without completing sign-in
    const pollTimer = setInterval(() => {
      if (popup?.closed) {
        clearInterval(pollTimer);
        // Give a moment for any postMessage to be processed
        setTimeout(() => {
          window.removeEventListener('message', messageHandler);
        }, 1000);
      }
    }, 500);
  });
}

/**
 * Sign out
 */
export async function signOut(): Promise<void> {
  const ck = await initCloudKit();
  if (!ck) return;

  try {
    await ck.whenUserSignsOut();
  } catch (error) {
    console.error('CloudKit sign out failed:', error);
  }
}

/**
 * Check if user is currently authenticated
 */
export async function checkAuth(): Promise<CloudKitUserIdentity | null> {
  return setupAuth();
}

/**
 * Fetch all colors from the private database
 */
export async function fetchColors(): Promise<OpaliteColor[]> {
  const ck = await initCloudKit();
  if (!ck) return [];

  try {
    const database = ck.privateCloudDatabase;
    const response = await database.performQuery({
      recordType: 'CD_OpaliteColor',
    });

    return response.records.map(transformRecordToColor);
  } catch (error) {
    console.error('Failed to fetch colors:', error);
    throw error;
  }
}

/**
 * Fetch all palettes from the private database
 */
export async function fetchPalettes(): Promise<OpalitePalette[]> {
  const ck = await initCloudKit();
  if (!ck) return [];

  try {
    const database = ck.privateCloudDatabase;
    const response = await database.performQuery({
      recordType: 'CD_OpalitePalette',
    });

    // Fetch all colors to associate with palettes
    const allColors = await fetchColors();

    return response.records.map((record) => {
      const palette = transformRecordToPalette(record);
      // Find colors that belong to this palette
      palette.colors = allColors.filter((c) => c.paletteId === palette.id);
      return palette;
    });
  } catch (error) {
    console.error('Failed to fetch palettes:', error);
    throw error;
  }
}

/**
 * Fetch a single color by ID
 */
export async function fetchColorById(id: string): Promise<OpaliteColor | null> {
  const ck = await initCloudKit();
  if (!ck) return null;

  try {
    const database = ck.privateCloudDatabase;
    const response = await database.fetchRecords([id]);

    if (response.records.length === 0) {
      return null;
    }

    return transformRecordToColor(response.records[0]);
  } catch (error) {
    console.error('Failed to fetch color:', error);
    throw error;
  }
}

/**
 * Fetch a single palette by ID with its colors
 */
export async function fetchPaletteById(id: string): Promise<OpalitePalette | null> {
  const ck = await initCloudKit();
  if (!ck) return null;

  try {
    const database = ck.privateCloudDatabase;
    const response = await database.fetchRecords([id]);

    if (response.records.length === 0) {
      return null;
    }

    const palette = transformRecordToPalette(response.records[0]);

    // Fetch colors that belong to this palette
    const allColors = await fetchColors();
    palette.colors = allColors.filter((c) => c.paletteId === palette.id);

    return palette;
  } catch (error) {
    console.error('Failed to fetch palette:', error);
    throw error;
  }
}

/**
 * Transform CloudKit record to OpaliteColor
 * SwiftData uses CD_ prefix for record types and field names
 */
function transformRecordToColor(record: CloudKitRecord): OpaliteColor {
  const fields = record.fields;

  return {
    id: getFieldValue<string>(fields, 'CD_id') ?? record.recordName,
    name: getFieldValue<string>(fields, 'CD_name'),
    notes: getFieldValue<string>(fields, 'CD_notes'),
    red: getFieldValue<number>(fields, 'CD_red') ?? 0,
    green: getFieldValue<number>(fields, 'CD_green') ?? 0,
    blue: getFieldValue<number>(fields, 'CD_blue') ?? 0,
    alpha: getFieldValue<number>(fields, 'CD_alpha') ?? 1,
    createdAt: parseTimestamp(fields, 'CD_createdAt', record.created?.timestamp),
    updatedAt: parseTimestamp(fields, 'CD_updatedAt', record.modified?.timestamp),
    createdByDisplayName: getFieldValue<string>(fields, 'CD_createdByDisplayName'),
    createdOnDeviceName: getFieldValue<string>(fields, 'CD_createdOnDeviceName'),
    updatedOnDeviceName: getFieldValue<string>(fields, 'CD_updatedOnDeviceName'),
    paletteId: getFieldValue<string>(fields, 'CD_palette'),
  };
}

/**
 * Transform CloudKit record to OpalitePalette
 */
function transformRecordToPalette(record: CloudKitRecord): OpalitePalette {
  const fields = record.fields;

  // Tags may be stored as a list or comma-separated string
  let tags: string[] = [];
  const rawTags = getFieldValue<unknown>(fields, 'CD_tags');
  if (Array.isArray(rawTags)) {
    tags = rawTags as string[];
  } else if (typeof rawTags === 'string' && rawTags) {
    tags = rawTags.split(',').map((t) => t.trim()).filter(Boolean);
  }

  return {
    id: getFieldValue<string>(fields, 'CD_id') ?? record.recordName,
    name: getFieldValue<string>(fields, 'CD_name') ?? 'Untitled Palette',
    notes: getFieldValue<string>(fields, 'CD_notes'),
    tags,
    createdAt: parseTimestamp(fields, 'CD_createdAt', record.created?.timestamp),
    updatedAt: parseTimestamp(fields, 'CD_updatedAt', record.modified?.timestamp),
    createdByDisplayName: getFieldValue<string>(fields, 'CD_createdByDisplayName'),
    previewBackgroundRaw: getFieldValue<string>(fields, 'CD_previewBackgroundRaw'),
    colors: [], // Will be populated separately
  };
}

/**
 * Safely get a field value from CloudKit record fields
 */
function getFieldValue<T>(
  fields: Record<string, { value: unknown }>,
  fieldName: string
): T | undefined {
  const field = fields[fieldName];
  return field?.value as T | undefined;
}

/**
 * Parse timestamp from field or fallback
 */
function parseTimestamp(
  fields: Record<string, { value: unknown }>,
  fieldName: string,
  fallback?: number
): Date {
  const timestamp = getFieldValue<number>(fields, fieldName) ?? fallback;
  return timestamp ? new Date(timestamp) : new Date();
}
