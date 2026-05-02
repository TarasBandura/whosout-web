import { NextResponse } from 'next/server';

/**
 * Apple Universal Links — Apple App Site Association (JSON).
 *
 * BEFORE PRODUCTION: replace TODO placeholders:
 * - APPLE_TEAM_ID (10-char) from Apple Developer → Membership
 * - IOS_BUNDLE_ID e.g. com.mrtclub.onlyfriends (must match native app)
 * - Adjust `paths` if you add more web → app routes
 *
 * After editing, host must stay HTTPS with no redirects stripping .well-known.
 */
const body = {
  applinks: {
    apps: [],
    details: [
      {
        appID: 'APPLE_TEAM_ID_TODO.IOS_BUNDLE_ID_TODO',
        paths: ['/invite/*', '/event/*'],
      },
    ],
  },
  webcredentials: {
    apps: [],
  },
};

export const dynamic = 'force-static';

export function GET() {
  return NextResponse.json(body, {
    headers: {
      'Content-Type': 'application/json',
      // Some CDNs cache aggressively; bump when you finalize AASA
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
