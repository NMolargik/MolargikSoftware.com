/**
 * TypeScript interfaces for Opalite CloudKit data models
 * Maps to the SwiftData models: OpaliteColor and OpalitePalette
 */

// Core color interface matching OpaliteColor SwiftData model
export interface OpaliteColor {
  id: string;                       // UUID as string
  name?: string;                    // Optional display name
  notes?: string;                   // Optional user notes
  red: number;                      // 0-1 sRGB
  green: number;                    // 0-1 sRGB
  blue: number;                     // 0-1 sRGB
  alpha: number;                    // 0-1 opacity
  createdAt: Date;
  updatedAt: Date;
  createdByDisplayName?: string;    // User who created
  createdOnDeviceName?: string;     // Device where created
  updatedOnDeviceName?: string;     // Device where last updated
  paletteId?: string;               // Reference to parent palette (null = loose color)
}

// Core palette interface matching OpalitePalette SwiftData model
export interface OpalitePalette {
  id: string;                       // UUID as string
  name: string;                     // Palette name (required)
  notes?: string;                   // Optional user notes
  tags: string[];                   // Array of tags
  createdAt: Date;
  updatedAt: Date;
  createdByDisplayName?: string;    // User who created
  previewBackgroundRaw?: string;    // Preview background setting
  colors: OpaliteColor[];           // One-to-many relationship
}

// Color representations for display
export interface ColorRepresentations {
  hex: string;                      // #RRGGBB format
  hexWithAlpha: string;             // #RRGGBBAA format
  rgb: { r: number; g: number; b: number };  // 0-255 values
  hsl: { h: number; s: number; l: number };  // h: 0-360, s/l: 0-100
  rgbString: string;                // "rgb(r, g, b)" CSS format
  rgbaString: string;               // "rgba(r, g, b, a)" CSS format
  hslString: string;                // "hsl(h, s%, l%)" CSS format
}

// Color harmony types
export type HarmonyType =
  | 'complementary'
  | 'analogous'
  | 'triadic'
  | 'split-complementary'
  | 'tetradic';

export interface ColorHarmony {
  type: HarmonyType;
  label: string;
  colors: string[];                 // Array of hex colors
}

// CloudKit authentication state
export interface CloudKitAuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user?: {
    userRecordName: string;
    displayName?: string;
  };
  error?: string;
}

// Generic fetch state for data loading
export interface DataFetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

// CloudKit JS SDK types (minimal declarations for our usage)
declare global {
  interface Window {
    CloudKit?: CloudKitNamespace;
  }
}

export interface CloudKitNamespace {
  configure(config: CloudKitConfig): void;
  getDefaultContainer(): CloudKitContainer;
}

export interface CloudKitConfig {
  containers: CloudKitContainerConfig[];
}

export interface CloudKitContainerConfig {
  containerIdentifier: string;
  apiTokenAuth: {
    apiToken: string;
    persist: boolean;
  };
  environment: 'development' | 'production';
}

export interface CloudKitAuthOptions {
  signInButton?: { id: string };
  signOutButton?: { id: string };
}

export interface CloudKitContainer {
  containerIdentifier: string;
  privateCloudDatabase: CloudKitDatabase;
  publicCloudDatabase: CloudKitDatabase;
  setUpAuth(options?: CloudKitAuthOptions): Promise<CloudKitUserIdentity | null>;
  whenUserSignsIn(): Promise<CloudKitUserIdentity>;
  whenUserSignsOut(): Promise<void>;
}

export interface CloudKitDatabase {
  performQuery(query: CloudKitQuery): Promise<CloudKitQueryResponse>;
  fetchRecords(recordNames: string[]): Promise<CloudKitFetchResponse>;
}

export interface CloudKitQuery {
  recordType: string;
  filterBy?: CloudKitFilter[];
  sortBy?: CloudKitSortDescriptor[];
}

export interface CloudKitFilter {
  fieldName: string;
  comparator: string;
  fieldValue: { value: unknown };
}

export interface CloudKitSortDescriptor {
  fieldName: string;
  ascending: boolean;
}

export interface CloudKitQueryResponse {
  records: CloudKitRecord[];
  continuationMarker?: string;
}

export interface CloudKitFetchResponse {
  records: CloudKitRecord[];
}

export interface CloudKitRecord {
  recordName: string;
  recordType: string;
  recordChangeTag?: string;
  fields: Record<string, CloudKitRecordField>;
  created?: { timestamp: number };
  modified?: { timestamp: number };
}

export interface CloudKitRecordField {
  value: unknown;
  type?: string;
}

export interface CloudKitUserIdentity {
  userRecordName: string;
  nameComponents?: {
    givenName?: string;
    familyName?: string;
  };
}
