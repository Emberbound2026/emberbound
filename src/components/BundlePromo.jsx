import { useState } from 'react';
import { AuthGate } from './AuthGate.jsx';

// Mirrors the server's pricing exactly (see create-checkout-session)
// so what's displayed always matches what Stripe will actually charge.
// Kept in sync deliberately rather than fetched, since this is just for
// display — the server is what actually enforces the real price.
const BUNDLE_PRICE_CENTS = 1000; // £10.00
const MIN_CHARGE_CENTS = 30; // £0.30, Stripe's documented GBP minimum

export function BundlePromo({ titles, purchasedIds, isAnonymous, hasFullLibrary, onUnlock, loading, error, redirectPath, compact }) {
  const [wantsToUnlock, setWantsToUnlock] = useState(false);

  if (hasFullLibrary) {
    if (compact) return null; // nothing to upsell on the paywall if they already own everything
    return (
      <div className="page" style={{ textAlign: 'center' }}>
        <p style={{ fontFamily: "'Fraunces', serif", fontSize: 16, margin: 0 }}>
          You own the full library — happy reading.
        </p>
      </div>
    );
  }

  const owned = titles.filter((t) => purchasedIds?.has(t.id));
  const remaining = titles.filter((t) => !purchasedIds?.has(t.id));
  const alreadyPaid = owned.reduce((sum, t) => sum + (t.price_cents || 0), 0);
  const remainingIndividualTotal = remaining.reduce((sum, t) => sum + (t.price_cents || 0), 0);
  const unitAmount = Math.max(MIN_CHARGE_CENTS, BUNDLE_PRICE_CENTS - alreadyPaid);
  const hasCredit = alreadyPaid > 0;

  const priceDisplay = `£${(unitAmount / 100).toFixed(2)}`;
  const remainingIndividualDisplay = `£${(remainingIndividualTotal / 100).toFixed(2)}`;
  const savingsCents = Math.max(0, remainingIndividualTotal - unitAmount);
  const savingsDisplay = `£${(savingsCents / 100).toFixed(2)}`;
  const label = hasCredit ? `Complete your collection — ${remaining.length} left` : 'Full Library';
  const countLabel = hasCredit ? `the remaining ${remaining.length} book${remaining.length === 1 ? '' : 's'}` : `all ${titles.length} books`;

  const handleClick = () => {
    if (isAnonymous) { setWantsToUnlock(true); return; }
    onUnlock();
  };

  if (isAnonymous && wantsToUnlock) {
    return (
      <div className={compact ? '' : 'page'}>
        <AuthGate
          heading="Create a free account to continue"
          description="This keeps your purchase safe — it can't be lost even if you clear your browser or switch devices. No password needed."
          redirectPath={redirectPath}
          compact={compact}
        />
        <button
          onClick={() => setWantsToUnlock(false)}
          style={{ background: 'none', border: 'none', color: 'var(--ink-dim)', fontSize: 12, textDecoration: 'underline', cursor: 'pointer', marginTop: 10, padding: 0 }}
        >
          Never mind
        </button>
      </div>
    );
  }

  if (compact) {
    return (
      <div style={{ marginTop: 14, textAlign: 'center' }}>
        <button
          onClick={handleClick}
          disabled={loading}
          className="choice-btn"
          style={{
            width: '100%', textAlign: 'center', fontWeight: 600,
            background: 'transparent', borderLeft: '3px solid var(--ember)',
            color: 'var(--ember)',
          }}
        >
          {loading
            ? 'Opening checkout…'
            : savingsCents > 0
            ? `Unlock ${countLabel} — ${priceDisplay} (save ${savingsDisplay})`
            : `Unlock ${countLabel} — ${priceDisplay}`}
        </button>
        {error && <p style={{ fontSize: 12, color: 'var(--ember)', marginTop: 8 }}>{error}</p>}
      </div>
    );
  }

  return (
    <div className="page" style={{ position: 'relative', overflow: 'visible' }}>
      <span style={{
        position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
        background: 'var(--ember)', color: '#1f1408', fontSize: 11, fontWeight: 700,
        letterSpacing: '0.03em', padding: '4px 14px', borderRadius: 20,
        whiteSpace: 'nowrap',
      }}>
        ★ BEST VALUE
      </span>
      <div style={{ textAlign: 'center', paddingTop: 8 }}>
        <p style={{ fontFamily: "'Fraunces', serif", fontSize: 20, margin: '0 0 4px' }}>
          {label}
        </p>
        <p style={{ fontSize: 13, color: 'var(--ink-dim)', marginBottom: 16 }}>
          {hasCredit
            ? `You already own ${owned.length} — unlock ${countLabel}`
            : `Unlock ${countLabel} completely`}
        </p>
        <p style={{ margin: '0 0 4px' }}>
          <span style={{ fontFamily: "'Fraunces', serif", fontSize: 32, fontWeight: 600 }}>{priceDisplay}</span>
        </p>
        {savingsCents > 0 && (
          <p style={{ fontSize: 13, color: 'var(--ink-dim)', marginBottom: 20 }}>
            <span style={{ textDecoration: 'line-through' }}>{remainingIndividualDisplay}</span>
            {' '}— save {savingsDisplay}
          </p>
        )}
        {hasCredit && (
          <p style={{ fontSize: 12, color: 'var(--violet)', marginBottom: 20 }}>
            Credited {`£${(alreadyPaid / 100).toFixed(2)}`} for books you already own
          </p>
        )}
        <button
          className="choice-btn"
          style={{ background: 'var(--ember)', color: '#1f1408', borderLeft: 'none', textAlign: 'center', fontWeight: 600, width: '100%' }}
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? 'Opening checkout…' : `Unlock ${countLabel} — ${priceDisplay}`}
        </button>
        {error && <p style={{ fontSize: 13, color: 'var(--ember)', marginTop: 12 }}>{error}</p>}
      </div>
    </div>
  );
}
