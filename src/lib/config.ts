/**
 * Centralized marketing / store links.
 * TODO: Replace with real App Store and Google Play URLs when live.
 */
export const APP_STORE_URL =
  process.env.NEXT_PUBLIC_APP_STORE_URL ?? 'https://apps.apple.com/app/whos-out/TODO_REPLACE';

export const GOOGLE_PLAY_URL =
  process.env.NEXT_PUBLIC_GOOGLE_PLAY_URL ?? 'https://play.google.com/store/apps/details?id=TODO_REPLACE';

/** Public site origin (Open Graph, canonical). Override in Vercel env. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://joinwhosout.com';

export const BRAND = "Who's Out";

/** Deep link schemes — must match native app configuration. */
export const SCHEME_PRIMARY = 'onlyfriends';
export const SCHEME_FUTURE = 'whosout';

export function primaryAppPath(segments: string): string {
  return `${SCHEME_PRIMARY}://${segments}`;
}

export function futureAppPath(segments: string): string {
  return `${SCHEME_FUTURE}://${segments}`;
}
