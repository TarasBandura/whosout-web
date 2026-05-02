/** Lightweight abstract phone + map vibes — SVG + CSS, no raster assets */

export function PhoneMockup() {
  return (
    <div className="wo-phone" aria-hidden="true">
      <div className="wo-phone__frame">
        <div className="wo-phone__notch" />
        <div className="wo-phone__screen">
          <div className="wo-phone__map">
            {/* grid lines */}
            <svg className="wo-phone__svg" viewBox="0 0 200 360" preserveAspectRatio="xMidYMid slice">
              <defs>
                <radialGradient id="wo-pin-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ff8f5c" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#ff8f5c" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="wo-map-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#161a24" />
                  <stop offset="100%" stopColor="#0d0f14" />
                </linearGradient>
              </defs>
              <rect width="200" height="360" fill="url(#wo-map-bg)" />
              {[0, 40, 80, 120, 160].map((y) => (
                <line
                  key={`h-${y}`}
                  x1="0"
                  y1={y}
                  x2="200"
                  y2={y}
                  stroke="rgba(148,163,184,0.06)"
                  strokeWidth="1"
                />
              ))}
              {[0, 50, 100, 150, 200].map((x) => (
                <line
                  key={`v-${x}`}
                  x1={x}
                  y1="0"
                  x2={x}
                  y2="360"
                  stroke="rgba(148,163,184,0.05)"
                  strokeWidth="1"
                />
              ))}
              {/* distant pins */}
              <circle cx="48" cy="220" r="14" fill="rgba(124,108,249,0.35)" />
              <circle cx="152" cy="140" r="12" fill="rgba(124,108,249,0.28)" />
              <circle cx="120" cy="280" r="10" fill="rgba(124,108,249,0.22)" />
              {/* central "I'm out" aura */}
              <circle cx="100" cy="180" r="72" fill="url(#wo-pin-glow)" className="wo-phone__aura" />
              <circle cx="100" cy="180" r="22" fill="#222833" stroke="#ff9f71" strokeWidth="2" />
              <text
                x="100"
                y="176"
                textAnchor="middle"
                fill="#ffccaa"
                fontSize="13"
                fontWeight="700"
                fontFamily="system-ui,sans-serif">
                OUT
              </text>
              <text
                x="100"
                y="190"
                textAnchor="middle"
                fill="#a1a1aa"
                fontSize="8"
                fontFamily="system-ui,sans-serif">
                tonight
              </text>
              {/* event chip */}
              <rect
                x="56"
                y="72"
                width="88"
                height="28"
                rx="8"
                fill="rgba(15,17,24,0.92)"
                stroke="rgba(255,143,92,0.35)"
              />
              <text x="68" y="90" fill="#eaeaea" fontSize="9" fontWeight="600" fontFamily="system-ui,sans-serif">
                Hangout nearby
              </text>
            </svg>
          </div>
          <div className="wo-phone__gloss" />
        </div>
      </div>
    </div>
  );
}
