import { useState } from 'react';
import { AuthGate } from './AuthGate.jsx';

export function BundlePromo({ titles, isAnonymous, hasFullLibrary, onUnlock, loading, error, redirectPath, compact }) {
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

  const individualTotal = titles.reduce((sum, t) => sum + (t.price_cents || 0), 0);
  const bundlePriceDisplay = '£10.00';
  const individualTotalDisplay = `£${(individualTotal / 100).toFixed(2)}`;
  const savingsDisplay = `£${((individualTotal - 1000) / 100).toFixed(2)}`;

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
          style={{ background: 'none', border: 'none', color: 'var(--violet)', fontSize: 13, textDecoration: 'underline', cursor: 'pointer', padding: 0 }}
        >
          {loading ? 'Opening checkout…' : `Or unlock all ${titles.length} books for ${bundlePriceDisplay} — save ${savingsDisplay}`}
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
          Full Library
        </p>
        <p style={{ fontSize: 13, color: 'var(--ink-dim)', marginBottom: 16 }}>
          Unlock all {titles.length} books completely
        </p>
        <p style={{ margin: '0 0 4px' }}>
          <span style={{ fontFamily: "'Fraunces', serif", fontSize: 32, fontWeight: 600 }}>{bundlePriceDisplay}</span>
        </p>
        <p style={{ fontSize: 13, color: 'var(--ink-dim)', marginBottom: 20 }}>
          <span style={{ textDecoration: 'line-through' }}>{individualTotalDisplay}</span>
          {' '}— save {savingsDisplay}
        </p>
        <button
          className="choice-btn"
          style={{ background: 'var(--ember)', color: '#1f1408', borderLeft: 'none', textAlign: 'center', fontWeight: 600, width: '100%' }}
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? 'Opening checkout…' : `Unlock the full library — ${bundlePriceDisplay}`}
        </button>
        {error && <p style={{ fontSize: 13, color: 'var(--ember)', marginTop: 12 }}>{error}</p>}
      </div>
    </div>
  );
}
