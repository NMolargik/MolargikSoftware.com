/**
 * Site-wide constants. Anything that is "fill in later" lives here so that
 * one edit lights it up everywhere.
 */

export const SITE_URL = 'https://molargiksoftware.com';
export const SITE_NAME = 'Molargik Software';
export const LEGAL_NAME = 'Molargik Software LLC';
export const CONTACT_EMAIL = 'nick@molargiksoftware.com';
export const FOUNDER = 'Nick Molargik';

/**
 * Apple Services Performance Partner "provider token" (the `pt` campaign
 * parameter). Leave empty until Apple issues one; links omit `pt` when this
 * is blank and still carry `ct` (channel) and `mt=8` (App Store media type).
 */
export const APP_STORE_PT = '122216719';

/**
 * Cloudflare Web Analytics beacon token. Empty disables the beacon entirely
 * (nothing is rendered into index.html). Set it and rebuild to turn it on.
 */
export const CF_BEACON_TOKEN = '8b27de4a6b5d48efa8ac666a98f8147c';
