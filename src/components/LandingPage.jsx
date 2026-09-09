// Covers live in /public/covers — a static mapping is a pragmatic
// stopgap until titles have a real upload/CMS pipeline (at which point
// this becomes title.cover_image_url from Supabase instead).
const COVER_IMAGES = {
  'ember-court': '/covers/ember-court.png',
  'binding-oath': '/covers/binding-oath.png',
};

export function LandingPage({ titles, inProgressIds, onSelect }) {
  return (
    <div className="book" style={{ textAlign: 'center' }}>
      <div style={{ position: 'relative', width: 88, height: 88, margin: '0 auto 16px' }}>
        <div style={{
          position: 'absolute', inset: -20, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,122,61,0.25), transparent 70%)',
        }} />
        <img
          src="/icon-512.png"
          alt="Emberbound"
          style={{ width: 88, height: 88, borderRadius: 20, position: 'relative', display: 'block' }}
        />
      </div>
      <p style={{ fontSize: 14, color: 'var(--ink-dim)', marginBottom: 32 }}>
        Choose how the story unfolds.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, textAlign: 'left' }}>
        {titles.map((title) => {
          const hasProgress = inProgressIds.has(title.id);
          const priceDisplay = title.price_cents ? `£${(title.price_cents / 100).toFixed(2)}` : '';
          const cover = COVER_IMAGES[title.id];

          return (
            <div key={title.id} className="page" style={{ padding: 0, overflow: 'hidden' }}>
              {cover && (
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9' }}>
                  <img
                    src={cover}
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(180deg, transparent 40%, var(--surface) 100%)',
                  }} />
                  <span style={{
                    position: 'absolute', top: 12, left: 12,
                    fontSize: 11, fontWeight: 600, letterSpacing: '0.03em',
                    color: 'var(--ink)', background: 'rgba(23,20,31,0.6)',
                    border: '1px solid var(--border)', borderRadius: 20,
                    padding: '4px 10px', backdropFilter: 'blur(4px)',
                  }}>
                    ROMANTASY
                  </span>
                </div>
              )}

              <div style={{ padding: '20px 24px 26px' }}>
                <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, margin: '0 0 8px' }}>
                  {title.name}
                </h2>
                <p style={{ fontSize: 14, color: 'var(--ink-dim)', marginBottom: 18, lineHeight: 1.5 }}>
                  {title.tagline}
                </p>
                <button
                  className="choice-btn"
                  style={{ textAlign: 'center', fontWeight: 600 }}
                  onClick={() => onSelect(title.id)}
                >
                  {hasProgress ? 'Continue Reading' : 'Start Reading — free to begin'}
                </button>
                {title.price_cents ? (
                  <p style={{ fontSize: 12, color: 'var(--ink-dim)', marginTop: 10 }}>
                    Free through Chapter 3 · unlock the rest for {priceDisplay}
                  </p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
