import { cache } from 'react';

import { SITE_URL } from '@/lib/config';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type MarketingPublicEvent = {
  id: string;
  title: string;
  description: string;
  category: string;
  vibe_tag: string | null;
  host_display_name: string;
  event_date: string | null;
  start_time: string | null;
  starts_at: string | null;
  ends_at: string | null;
  photos: unknown;
  is_closed: boolean;
};

function firstHttpsPhoto(raw: unknown): string | null {
  if (!raw) return null;
  if (Array.isArray(raw)) {
    for (const u of raw) {
      const s = typeof u === 'string' ? u.trim() : '';
      if (s.startsWith('https://') || s.startsWith('http://')) return s;
    }
    return null;
  }
  if (typeof raw === 'string') {
    const t = raw.trim();
    if (!t) return null;
    try {
      const parsed = JSON.parse(t) as unknown;
      return firstHttpsPhoto(parsed);
    } catch {
      return null;
    }
  }
  return null;
}

export function parseMarketingEventIdParam(raw: string): string | null {
  try {
    const decoded = decodeURIComponent(raw).trim();
    return UUID_RE.test(decoded) ? decoded : null;
  } catch {
    return null;
  }
}

async function fetchPublicEventUncached(eventIdRaw: string): Promise<MarketingPublicEvent | null> {
  const id = parseMarketingEventIdParam(eventIdRaw);
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '');
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!id || !baseUrl || !anon) return null;

  const url =
    `${baseUrl}/rest/v1/events` +
    `?id=eq.${encodeURIComponent(id)}` +
    '&select=id,title,description,category,vibe_tag,host_display_name,event_date,start_time,starts_at,ends_at,photos,is_closed' +
    '&limit=1';

  const res = await fetch(url, {
    headers: {
      apikey: anon,
      Authorization: `Bearer ${anon}`,
      Accept: 'application/json',
      'Accept-Profile': 'public',
      'Content-Profile': 'public',
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;
  const rows = (await res.json()) as MarketingPublicEvent[];
  const row = rows[0];
  if (!row || row.is_closed) return null;
  return row;
}

export const fetchPublicMarketingEvent = cache(fetchPublicEventUncached);

/** Human timing line for previews + page (avoid fake scarcity). */
export function eventMomentumLine(ev: MarketingPublicEvent): string {
  if (ev.starts_at) {
    const t = Date.parse(ev.starts_at);
    if (Number.isFinite(t)) {
      try {
        return new Intl.DateTimeFormat(undefined, {
          weekday: 'short',
          hour: 'numeric',
          minute: '2-digit',
        }).format(new Date(t));
      } catch {
        /* fallback below */
      }
    }
  }
  const bits = [
    ev.event_date ? friendlyDatePhrase(ev.event_date) : null,
    ev.start_time?.trim() || null,
  ].filter(Boolean);
  return bits.length ? bits.join(' · ') : 'Tonight · time flexible';
}

function friendlyDatePhrase(isoDate: string): string {
  try {
    const [y, m, d] = isoDate.split('-').map(Number);
    if (!y || !m || !d) return isoDate;
    const dt = new Date(y, m - 1, d);
    return new Intl.DateTimeFormat(undefined, { weekday: 'short', month: 'short', day: 'numeric' }).format(dt);
  } catch {
    return isoDate;
  }
}

export function eventOgImage(ev: MarketingPublicEvent): URL | undefined {
  const pic = firstHttpsPhoto(ev.photos);
  if (!pic) return undefined;
  try {
    return new URL(pic);
  } catch {
    return undefined;
  }
}

export function eventLandingAbsoluteUrl(ev: MarketingPublicEvent): string {
  return `${SITE_URL}/event/${encodeURIComponent(ev.id)}`;
}
