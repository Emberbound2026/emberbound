export function Paywall({ title, onUnlock, loading, error }) {
  const priceDisplay = title.price_cents
    ? `£${(title.price_cents / 100).toFixed(2)}`
    : '';

  return (
    <div className="page" style={{ textAlign: 'center' }}>
      <p style={{ fontFamily: "'Fraunces', serif", fontSize: 18, marginBottom: 6 }}>
        Your choice unlocks the rest
      </p>
      <p style={{ fontSize: 13, color: 'var(--ink-dim)', marginBottom: 24, lineHeight: 1.5 }}>
        {title.name} continues past this point — four endings, your path to choose.
      </p>

      <button
        className="choice-btn"
        style={{ background: 'var(--ember)', color: '#1f1408', borderLeft: 'none', textAlign: 'center', fontWeight: 600 }}
        onClick={onUnlock}
        disabled={loading}
      >
        {loading ? 'Opening checkout…' : `Unlock this book — ${priceDisplay}`}
      </button>

      {error && (
        <p style={{ fontSize: 13, color: 'var(--ember)', marginTop: 12 }}>{error}</p>
      )}

      <p style={{ fontSize: 12, color: 'var(--ink-dim)', marginTop: 20 }}>
        Payment handled securely by Stripe.
      </p>
    </div>
  );
}
