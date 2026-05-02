import { StoreButtons } from '@/components/StoreButtons';
import { WoBackground } from '@/components/marketing/WoBackground';
import { WoFooter } from '@/components/marketing/WoFooter';
import { WoNav } from '@/components/marketing/WoNav';
import { PhoneMockup } from '@/components/marketing/PhoneMockup';
import { BRAND } from '@/lib/config';

const HOW_STEPS = [
  { title: "Signal you're out 🔥", sub: 'Approximate vibe on the map when you\'re genuinely heading out.', accent: 'fire' as const },
  { title: 'Discover nearby hangouts', sub: 'Tonight\'s hangs around you — not a feed from last week.', accent: 'pin' as const },
  { title: 'Request to join', sub: 'Say hi once. Host picks who folds into the crew.', accent: 'chat' as const },
  { title: 'Pull up tonight', sub: 'Spontaneous and local. The kind of plan that survives one text.', accent: 'bolt' as const },
] as const;

export default function HomePage() {
  return (
    <>
      <WoBackground />
      <div className="wo-page">
        <WoNav />

        <main>
          {/* Hero */}
          <section className="wo-section wo-hero">
            <div className="wo-hero__badge wo-reveal">
              <span className="wo-pulse-dot" aria-hidden /> Something&apos;s brewing tonight · NYC-first
            </div>
            <h1 className="wo-headline xl wo-reveal wo-reveal-delay-1">See who&apos;s out tonight.</h1>
            <p className="wo-lead wo-reveal wo-reveal-delay-2">
              Find nearby hangouts, signal you&apos;re out, and make spontaneous plans with people around you.
            </p>
            <p className="wo-nyc-strip wo-reveal wo-reveal-delay-2">Launching in select NYC neighborhoods.</p>
            <div className="wo-hero__cta wo-reveal wo-reveal-delay-3" id="get-app">
              <div className="wo-btn-stack">
                <StoreButtons />
              </div>
            </div>
            <div className="wo-hero__mock wo-float-slow wo-reveal wo-reveal-delay-4">
              <PhoneMockup />
            </div>
          </section>

          {/* How it works */}
          <section className="wo-section wo-band">
            <h2 className="wo-headline md wo-section-title wo-reveal">How it flows</h2>
            <p className="wo-section-sub wo-reveal">Built for nights that don&apos;t wait for a Google Calendar invite.</p>
            <div className="wo-steps">
              {HOW_STEPS.map((step, i) => (
                <div
                  key={step.title}
                  className="wo-card wo-card--float wo-reveal"
                  style={{ animationDelay: `${80 + i * 70}ms` }}>
                  <div className="wo-card__top">
                    <span className={`wo-icon-chip wo-icon-chip--${step.accent}`} aria-hidden />
                  </div>
                  <h3 className="wo-card__title">{step.title}</h3>
                  <p className="wo-card__sub">{step.sub}</p>
                </div>
              ))}
            </div>
          </section>

          {/* I&apos;m Out */}
          <section className="wo-section">
            <div className="wo-split">
              <div className="wo-split__text wo-reveal">
                <span className="wo-kicker">I&apos;m Out · map energy</span>
                <h2 className="wo-headline md">Show you&apos;re in play — without dropping your pin.</h2>
                <p className="wo-body">
                  A temporary flame on the map: friends-of-friends energy, not a live GPS breadcrumb.
                  You control when it&apos;s on. When it&apos;s off, you&apos;re invisible.
                </p>
                <ul className="wo-checks">
                  <li>Approximate area only · never exact address</li>
                  <li>Soft glow aura — unmistakably nightlife, not Uber tracking</li>
                  <li>Expires on its own so &ldquo;out tonight&rdquo; stays literal</li>
                </ul>
              </div>
              <div className="wo-split__viz wo-reveal wo-reveal-delay-2">
                <div className="wo-flame-card">
                  <div className="wo-flame-card__rings" aria-hidden />
                  <div className="wo-flame-card__body">
                    <div className="wo-flame-card__avatar" aria-hidden />
                    <p className="wo-flame-card__label">
                      Out now <span aria-hidden>🔥</span>
                    </p>
                    <p className="wo-flame-card__hint">&ldquo;Around Ludlow-ish&rdquo; · fades after hours</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Safety */}
          <section className="wo-section wo-band wo-band--tight">
            <h2 className="wo-headline md wo-section-title wo-reveal">Safety that respects the vibe</h2>
            <div className="wo-trust-grid">
              <div className="wo-trust-pill wo-reveal">
                <span className="wo-trust-pill__ic" aria-hidden>◎</span>
                <strong>Approximate location</strong>
                <span>Fuzzy pins by design · your block isn&apos;t a billboard.</span>
              </div>
              <div className="wo-trust-pill wo-reveal wo-reveal-delay-1">
                <span className="wo-trust-pill__ic" aria-hidden>✓</span>
                <strong>Host approval</strong>
                <span>You message first · invites are intentional.</span>
              </div>
              <div className="wo-trust-pill wo-reveal wo-reveal-delay-2">
                <span className="wo-trust-pill__ic" aria-hidden>⛔</span>
                <strong>Block &amp; report</strong>
                <span>Shut down weird energy — controls stay one tap away.</span>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="wo-section wo-final wo-reveal" id="join">
            <div className="wo-final__inner">
              <h2 className="wo-headline md">Ready to see who&apos;s out?</h2>
              <p className="wo-final__sub">{BRAND} — where the weekend actually starts.</p>
              <div className="wo-btn-stack">
                <StoreButtons />
              </div>
            </div>
          </section>
        </main>

        <WoFooter />
      </div>
    </>
  );
}
