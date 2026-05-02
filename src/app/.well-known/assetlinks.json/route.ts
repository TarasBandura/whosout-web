import { NextResponse } from 'next/server';

/**
 * Android App Links — Digital Asset Links.
 *
 * BEFORE PRODUCTION: replace TODO placeholders:
 * - ANDROID_PACKAGE_NAME (e.g. com.mrtclub.onlyfriends)
 * - SHA256_CERT_FINGERPRINT from Play signing key (`keytool -list -v` or Play Console → App signing)
 *
 * Optionally add separate entries for debug vs prod signing keys.
 */

const body = [
  {
    relation: ['delegate_permission/common.handle_all_urls'],
    target: {
      namespace: 'android_app',
      package_name: 'ANDROID_PACKAGE_NAME_TODO',
      sha256_cert_fingerprints: ['SHA256_RELEASE_CERT_FINGERPRINT_TODO'],
    },
  },
];

export const dynamic = 'force-static';

export function GET() {
  return NextResponse.json(body, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
