import type { Metadata } from 'next';

import { OpenAppButtons } from '@/components/OpenAppButtons';
import { StoreButtons } from '@/components/StoreButtons';
import { MarketingSubLayout } from '@/components/marketing/MarketingSubLayout';
import { BRAND, SITE_URL } from '@/lib/config';

function safeCode(raw: string): string | null {
  const t = raw.trim().toUpperCase().replace(/[^A-Z0-9-]/g, '');
  return t.length >= 2 && t.length <= 48 ? t : null;
}

type Props = { params: Promise<{ code: string }> };

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { code } = await props.params;
  const c = safeCode(decodeURIComponent(code));
  const title = c ? `You're invited (${c})` : "You're invited";
  const description = "Join your friends and see what's happening nearby tonight.";
  const path = `/invite/${encodeURIComponent(c ?? code)}`;
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}${path}` },
    openGraph: { title, description, url: path },
    twitter: { title, description },
  };
}

export default async function InvitePage(props: Props) {
  const { code } = await props.params;
  const decoded = decodeURIComponent(code);
  const display = safeCode(decoded);
  const stripped = decoded.replace(/[^a-zA-Z0-9-]/g, '').slice(0, 48);
  const linkPath = (display ?? stripped) || '_';

  return (
    <MarketingSubLayout>
      <div className="wo-panel wo-reveal">
        <div className="wo-panel__shine" aria-hidden />
        <p className="wo-panel__eyebrow">You&apos;ve got mail · from the Night</p>
        <h1 className="wo-panel__headline">You were invited to {BRAND} 🔥</h1>
        <p className="wo-panel__lead">
          Join your friends and see what&apos;s happening nearby tonight.
        </p>
        {display ? (
          <div className="wo-invite-code">
            <span className="wo-invite-code__label">Your link code</span>
            <span className="wo-invite-code__value">{display}</span>
          </div>
        ) : null}
        <div className="wo-panel__actions">
          <OpenAppButtons deepLinkPath={`invite/${linkPath}`} />
          <div className="wo-panel__divider">
            <span>or snag the app</span>
          </div>
          <div className="wo-btn-stack">
            <StoreButtons />
          </div>
        </div>
      </div>
    </MarketingSubLayout>
  );
}
