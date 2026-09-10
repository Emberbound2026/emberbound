import { useState } from 'react';
import { useEmailAuth } from '../engine/useEmailAuth.js';

export function AuthGate({ heading, description, redirectPath, compact }) {
  const [email, setEmail] = useState('');
  const { status, error, mode, sendAuthLink } = useEmailAuth();

  if (status === 'sent') {
    return (
      <div style={{ textAlign: compact ? 'left' : 'center' }}>
        <p style={{ fontFamily: "'Fraunces', serif", fontSize: compact ? 15 : 18, margin: '0 0 6px' }}>
          Check your inbox
        </p>
        <p style={{ fontSize: 13, color: 'var(--ink-dim)', lineHeight: 1.5 }}>
          {mode === 'signin'
            ? <>That email already has an account — we sent a sign-in link to <strong style={{ color: 'var(--ink)' }}>{email}</strong>.</>
            : <>We sent a link to <strong style={{ color: 'var(--ink)' }}>{email}</strong> — click it to continue.</>}
        </p>
      </div>
    );
  }

  return (
    <div style={{ textAlign: compact ? 'left' : 'center' }}>
      {heading && (
        <p style={{ fontFamily: "'Fraunces', serif", fontSize: compact ? 15 : 18, margin: '0 0 6px' }}>
          {heading}
        </p>
      )}
      {description && (
        <p style={{ fontSize: 13, color: 'var(--ink-dim)', marginBottom: 14, lineHeight: 1.5 }}>
          {description}
        </p>
      )}
      <form
        onSubmit={(e) => { e.preventDefault(); sendAuthLink(email, redirectPath); }}
        style={{ display: 'flex', gap: 8, flexWrap: compact ? 'nowrap' : 'wrap' }}
      >
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            flex: 1, minWidth: 140, background: 'var(--surface-raised)',
            border: '1px solid var(--border)', borderRadius: 6,
            padding: '10px 12px', color: 'var(--ink)', fontSize: 14,
          }}
        />
        <button
          type="submit"
          className={compact ? 'narrator-btn' : 'choice-btn'}
          style={compact ? {} : { fontWeight: 600, flex: '1 1 100%' }}
          disabled={status === 'sending'}
        >
          {status === 'sending' ? 'Sending…' : 'Continue'}
        </button>
      </form>
      {status === 'error' && (
        <p style={{ fontSize: 12, color: 'var(--ember)', marginTop: 10 }}>{error}</p>
      )}
    </div>
  );
}
