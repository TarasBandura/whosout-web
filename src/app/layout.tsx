import type { Metadata, Viewport } from 'next';

import { BRAND, SITE_URL } from '@/lib/config';

import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#040508',
};

const description =
  "See who's out tonight. Discover nearby hangouts and spontaneous plans.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: BRAND, template: `%s · ${BRAND}` },
  description,
  icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }] },
  openGraph: {
    title: BRAND,
    description,
    url: SITE_URL,
    siteName: BRAND,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: BRAND,
    description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="wo-body">{children}</body>
    </html>
  );
}
