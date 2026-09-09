export function LandingPage({ title, hasProgress, onStart }) {
  const priceDisplay = title.price_cents ? `£${(title.price_cents / 100).toFixed(2)}` : '';

  return (
    <div className="book" style={{ textAlign: 'center' }}>
      <img
        src="/icon-512.png"
        alt=""
        style={{ width: 72, height: 72, borderRadius: 16, margin: '0 auto 20px', display: 'block' }}
      />
      <h1 className="title" style={{ marginBottom: 6 }}>Emberbound</h1>
      <p style={{ fontSize: 14, color: 'var(--ink-dim)', marginBottom: 36 }}>
        Choose how the story unfolds.
      </p>

      <div className="page" style={{ textAlign: 'left' }}>
        <p className="kicker" style={{ marginBottom: 4 }}>Featured</p>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, margin: '0 0 8px' }}>
          {title.name}
        </h2>
        <p style={{ fontSize: 14, color: 'var(--ink-dim)', marginBottom: 20, lineHeight: 1.5 }}>
          {title.tagline}
        </p>
        <button
          className="choice-btn"
          style={{ textAlign: 'center', fontWeight: 600 }}
          onClick={onStart}
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
}
