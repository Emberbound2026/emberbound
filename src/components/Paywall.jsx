import { useState } from 'react';
import { AuthGate } from './AuthGate.jsx';

export function Paywall({ title, titleId, isAnonymous, onUnlock, loading, error }) {
  const [wantsToUnlock, setWantsToUnlock] = useState(false);
  const priceDisplay = title.price_cents
    ? `£${(title.price_cents / 100).toFixed(2)}`
    : '';

  const handleUnlockClick = () => {
    if (isAnonymous) {
      // Purchases must be tied to a real account before checkout — an
      // anonymous session can be lost (cleared cookies, new device)
      // and take a paid unlock down with it. Price/description stay
      // visible either way; only the button's destination changes.
      setWantsToUnlock(true);
      return;
    }
    onUnlock();
  };

  return (
    <div className="page" style={{ textAlign: 'center' }}>
      <p style={{ fontFamily: "'Fraunces', serif", fontSize: 18, marginBottom: 6 }}>
        Your choice unlocks the rest
      </p>
      <p style={{ fontSize: 13, color: 'var(--ink-dim)', marginBottom: 24, lineHeight: 1.5 }}>
        {title.name} continues past this point — four endings, your path to choose.
      </p>

      {isAnonymous && wantsToUnlock ? (
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 20 }}>
          <AuthGate
            heading="Create a free account to continue"
            description="This keeps your purchase safe — it can't be lost even if you clear your browser or switch devices. No password needed."
            redirectPath={`/?title=${titleId}&autoPurchase=single`}
          />
          <button
            onClick={() => setWantsToUnlock(false)}
            style={{ background: 'none', border: 'none', color: 'var(--ink-dim)', fontSize: 12, textDecoration: 'underline', cursor: 'pointer', marginTop: 12, padding: 0 }}
          >
            Never mind
          </button>
        </div>
      ) : (
        <>
          <button
            className="choice-btn"
            style={{ background: 'var(--ember)', color: '#1f1408', borderLeft: 'none', textAlign: 'center', fontWeight: 600 }}
            onClick={handleUnlockClick}
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
        </>
      )}
    </div>
  );
}
