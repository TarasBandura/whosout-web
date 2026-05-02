import type { Metadata } from 'next';

import { OpenAppButtons } from '@/components/OpenAppButtons';
import { StoreButtons } from '@/components/StoreButtons';
import { MarketingSubLayout } from '@/components/marketing/MarketingSubLayout';
import { BRAND, SITE_URL } from '@/lib/config';
import {
  eventLandingAbsoluteUrl,
  eventMomentumLine,
  eventOgImage,
  fetchPublicMarketingEvent,
  parseMarketingEventIdParam,
} from '@/lib/public-event-fetch';

export const revalidate = 60;

type Props = { params: Promise<{ eventId: string }> };

function canonicalEventPathSegment(rawEventIdParam: string): string {
  const t = rawEventIdParam.trim();
  try {
    return `/event/${encodeURIComponent(decodeURIComponent(t))}`;
  } catch {
    return `/event/${encodeURIComponent(t)}`;
  }
}

function deepLinkSegment(rawParam: string): string {
  const id = parseMarketingEventIdParam(rawParam);
  if (id) return id;
  try {
    return decodeURIComponent(rawParam).replace(/[^a-zA-Z0-9-]/g, '').slice(0, 64) || '_';
  } catch {
    return '_';
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { eventId } = await props.params;
  const path = canonicalEventPathSegment(eventId);
  const ev = parseMarketingEventIdParam(eventId) ? await fetchPublicMarketingEvent(eventId) : null;

  const fallbackTitle = `Tonight on ${BRAND}`;
  const title = ev ? `${ev.title} · ${BRAND}` : fallbackTitle;
  const description = ev
    ? `${eventMomentumLine(ev)} · Hosted by ${ev.host_display_name}. Open the app for the vibe.`
    : `Something’s unfolding nearby on ${BRAND}. Open the app to see who’s out.`;

  const og = ev ? eventOgImage(ev) : undefined;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: { canonical: `${SITE_URL}${path}` },
    openGraph: {
      type: 'website',
      url: path,
      siteName: BRAND,
      locale: 'en_US',
      title,
      description,
      images: og
        ? [
            {
              url: og.href,
              alt: `${ev!.title} on ${BRAND}`,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: og ? [og.href] : undefined,
    },
  };
}

export default async function EventLandingPage(props: Props) {
  const { eventId } = await props.params;
  const ev = parseMarketingEventIdParam(eventId) ? await fetchPublicMarketingEvent(eventId) : null;
  const deeplink = deepLinkSegment(eventId);
  const canonical = ev ? eventLandingAbsoluteUrl(ev) : `${SITE_URL}/event/${deeplink}`;
  const heroSrc = ev ? (eventOgImage(ev)?.href ?? null) : null;

  const chipLine = [
    ev?.category?.trim() || null,
    ev?.vibe_tag?.trim() || null,
  ].filter(Boolean) as string[];

  const descriptionExcerpt =
    ev?.description
      ?.trim()
      .slice(0, 220)
      .trim()
      .replace(/\s+/g, ' ') ?? '';

  return (
    <MarketingSubLayout>
      <article className="wo-event-page wo-reveal">
        <header className="wo-event-hero">
          {heroSrc ? (
            <img className="wo-event-hero__img" src={heroSrc} alt="" fetchPriority="high" />
          ) : (
            <div className="wo-event-hero__img wo-event-hero__img--placeholder" aria-hidden />
          )}
          <div className="wo-event-hero__scrim" aria-hidden />
          <div className="wo-event-hero__grain" aria-hidden />
          <div className="wo-event-hero__content">
            <div className="wo-event-live-pill" aria-hidden>
              <span className="wo-event-live-dot" /> Tonight nearby
            </div>
            {ev ? (
              <>
                <h1 className="wo-event-title">{ev.title}</h1>
                <p className="wo-event-momentum">{eventMomentumLine(ev)}</p>
                <p className="wo-event-host">Hosted by {ev.host_display_name}</p>
                {chipLine.length ? (
                  <div className="wo-event-tag-row">
                    {chipLine.map((c) => (
                      <span key={c} className="wo-event-tag">
                        {c}
                      </span>
                    ))}
                  </div>
                ) : null}
              </>
            ) : (
              <>
                <h1 className="wo-event-title">This invite is quieter now</h1>
                <p className="wo-event-momentum">The map moves fast — but there’s usually something else brewing.</p>
                <p className="wo-event-host">Pull up on {BRAND}; your corner updates live.</p>
              </>
            )}
          </div>
        </header>

        <section className="wo-event-tier">
          {ev && descriptionExcerpt ? <p className="wo-event-lead">{descriptionExcerpt}</p> : null}

          {!ev ? (
            <p className="wo-event-microcopy">
              If you tapped an invite, hang tight — snapshots don’t linger once a night wraps.
            </p>
          ) : (
            <p className="wo-event-microcopy">Low-pressure energy: come through if the night fits you.</p>
          )}

          <p className="wo-event-link-label">Shareable link</p>
          <code className="wo-event-link-chip">{canonical}</code>

          <div className="wo-event-actions">
            <OpenAppButtons deepLinkPath={`event/${deeplink}`} />
            <div className="wo-panel__divider">
              <span>new here?</span>
            </div>
            <div className="wo-btn-stack">
              <StoreButtons />
            </div>
          </div>
        </section>
      </article>
    </MarketingSubLayout>
  );
}
