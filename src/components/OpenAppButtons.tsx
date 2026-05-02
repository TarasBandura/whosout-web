'use client';

import { useCallback } from 'react';

import {
  SCHEME_PRIMARY,
  SCHEME_FUTURE,
} from '@/lib/config';

type Props = {
  /** e.g. `invite/ABC123` or `event/uuid` */
  deepLinkPath: string;
};

/**
 * Tries primary custom URL scheme first (best-effort).
 * Fallback: user uses store buttons; optional alternate scheme tap.
 */
export function OpenAppButtons({ deepLinkPath }: Props) {
  const primary = `${SCHEME_PRIMARY}://${deepLinkPath}`;
  const alternate = `${SCHEME_FUTURE}://${deepLinkPath}`;

  const openPrimary = useCallback(() => {
    window.location.href = primary;
  }, [primary]);

  const openAlternate = useCallback(() => {
    window.location.href = alternate;
  }, [alternate]);

  return (
    <div className="btn-stack">
      <button type="button" className="btn btn-primary" onClick={openPrimary}>
        Open app
      </button>
      <button type="button" className="btn btn-ghost" onClick={openAlternate}>
        Try alternate link ({SCHEME_FUTURE}://)
      </button>
    </div>
  );
}
