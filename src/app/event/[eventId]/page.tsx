import type { Metadata } from 'next';

import { OpenAppButtons } from '@/components/OpenAppButtons';
import { StoreButtons } from '@/components/StoreButtons';
import { MarketingSubLayout } from '@/components/marketing/MarketingSubLayout';
import { BRAND, SITE_URL } from '@/lib/config';

function safeEventId(raw: string): string | null {
  const t = raw.trim().replace(/[^a-zA-Z0-9-]/g, '');
  return t.length >= 8 && t.length <= 64 ? t : null;
}

type Props = { params: Promise<{ eventId: string }> };

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { eventId } = await props.params;
  const id = safeEventId(decodeURIComponent(eventId));
  const title = 'Hangout invite';
  const description = 'Open this hangout, see details, and request to join.';
  const path = `/event/${encodeURIComponent(id ?? eventId)}`;
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}${path}` },
    openGraph: { title, description, url: path },
    twitter: { title, description },
  };
}

export default async function EventLandingPage(props: Props) {
  const { eventId } = await props.params;
  const decoded = decodeURIComponent(eventId);
  const id = safeEventId(decoded);
  const stripped = decoded.replace(/[^a-zA-Z0-9-]/g, '').slice(0, 64);
  const linkSeg = (id ?? stripped) || '_';

  return (
    <MarketingSubLayout>
      <div className="wo-panel wo-panel--event wo-reveal">
        <div className="wo-panel__shine" aria-hidden />
        <div className="wo-event-chip" aria-hidden>
          Hangout pin
        </div>
        <h1 className="wo-panel__headline">Open this hangout on {BRAND} 🔥</h1>
        <p className="wo-panel__lead">
          See the details, request to join, and find out who&apos;s going.
        </p>
        {id ? (
          <div className="wo-invite-code wo-invite-code--muted">
            <span className="wo-invite-code__label">Hangout reference</span>
            <span className="wo-invite-code__value">{id}</span>
          </div>
        ) : null}
        <div className="wo-panel__actions">
          <OpenAppButtons deepLinkPath={`event/${linkSeg}`} />
          <div className="wo-panel__divider">
            <span>need the app?</span>
          </div>
          <div className="wo-btn-stack">
            <StoreButtons />
          </div>
        </div>
      </div>
    </MarketingSubLayout>
  );
}
