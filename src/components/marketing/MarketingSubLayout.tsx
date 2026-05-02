import Link from 'next/link';
import type { ReactNode } from 'react';

import { BRAND } from '@/lib/config';

import { WoBackground } from './WoBackground';
import { WoNav } from './WoNav';

export function MarketingSubLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <WoBackground />
      <div className="wo-page wo-page--sub">
        <WoNav />
        <main className="wo-sub-main">{children}</main>
        <footer className="wo-footer wo-footer--compact">
          <Link href="/" className="wo-footer__link">
            ← Back to home
          </Link>
          <span className="wo-footer__dot" aria-hidden>
            ·
          </span>
          <span className="wo-footer__brand-inline">{BRAND}</span>
        </footer>
      </div>
    </>
  );
}
