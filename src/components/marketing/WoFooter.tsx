import { BRAND } from '@/lib/config';

export function WoFooter() {
  return (
    <footer className="wo-footer">
      <p className="wo-footer__brand">{BRAND}</p>
      <p className="wo-footer__meta">NYC nights · spontaneous plans · your crew</p>
    </footer>
  );
}
