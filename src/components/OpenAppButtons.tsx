'use client';

import { useCallback } from 'react';

import { SCHEME_PRIMARY, SCHEME_FUTURE } from '@/lib/config';

type Props = {
  /** e.g. `invite/ABC123` or `event/uuid` */
  deepLinkPath: string;
};

const showAlternateDeepLink =
  typeof process.env.NEXT_PUBLIC_SHOW_ALT_DEEP_LINK === 'string' &&
  process.env.NEXT_PUBLIC_SHOW_ALT_DEEP_LINK === '1';

/**
 * Tries the primary custom scheme (best-effort universal-link handoff from Safari).
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
      <button type="button" className="btn btn-primary wo-open-app-btn" onClick={openPrimary}>
        Pull up in app
      </button>
      {showAlternateDeepLink ? (
        <button type="button" className="btn btn-ghost wo-open-app-btn--alt" onClick={openAlternate}>
          Try alternate link ({SCHEME_FUTURE}://)
        </button>
      ) : null}
    </div>
  );
}
