import { useState } from 'react';
import { useAccountUpgrade } from '../engine/useAccountUpgrade.js';

export function AccountUpgrade({ isAnonymous }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const { status, error, sendUpgradeLink } = useAccountUpgrade();

  if (!isAnonymous) return null;

  if (status === 'sent') {
    return (
      <p style={{ fontSize: 12, color: 'var(--ink-dim)', marginBottom: 12 }}>
        Check {email} for a link to finish saving your account.
      </p>
    );
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={{
          background: 'none', border: 'none', color: 'var(--ink-dim)',
          fontSize: 12, textDecoration: 'underline', cursor: 'pointer',
          marginBottom: 12, padding: 0,
        }}
      >
        Reading on another device? Save your account
      </button>
    );
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); sendUpgradeLink(email); }}
      style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'center', flexWrap: 'wrap' }}
    >
      <input
        type="email"
        required
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          flex: 1, minWidth: 160, background: 'var(--surface-raised)',
          border: '1px solid var(--border)', borderRadius: 3,
          padding: '6px 10px', color: 'var(--ink)', fontSize: 13,
        }}
      />
      <button type="submit" className="narrator-btn" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Save account'}
      </button>
      {status === 'error' && <span style={{ fontSize: 12, color: 'var(--ember)' }}>{error}</span>}
    </form>
  );
}
