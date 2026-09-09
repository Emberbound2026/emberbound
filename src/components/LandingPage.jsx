export function LandingPage({ titles, inProgressIds, onSelect }) {
  return (
    <div className="book" style={{ textAlign: 'center' }}>
      <img
        src="/icon-512.png"
        alt="Emberbound"
        style={{ width: 72, height: 72, borderRadius: 16, margin: '0 auto 16px', display: 'block' }}
      />
      <p style={{ fontSize: 14, color: 'var(--ink-dim)', marginBottom: 36 }}>
        Choose how the story unfolds.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, textAlign: 'left' }}>
        {titles.map((title) => {
          const hasProgress = inProgressIds.has(title.id);
          const priceDisplay = title.price_cents ? `£${(title.price_cents / 100).toFixed(2)}` : '';
          return (
            <div key={title.id} className="page">
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
          );
        })}
      </div>
    </div>
  );
}
