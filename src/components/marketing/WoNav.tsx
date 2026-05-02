import Link from 'next/link';

import { BRAND } from '@/lib/config';

export function WoNav() {
  return (
    <header className="wo-nav">
      <Link href="/" className="wo-nav__brand">
        {BRAND}
      </Link>
      <Link href="/#get-app" className="wo-nav__cta" scroll>
        Get the app
      </Link>
    </header>
  );
}
