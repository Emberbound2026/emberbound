export function AppHeader({ onBack, title, subtitle, onAccountClick, accountLinked }) {
  return (
    <header className="app-header">
      <div className="app-header-inner">
        {onBack ? (
          <button className="app-header-back" onClick={onBack} aria-label="Back">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        ) : (
          <span className="app-header-spacer" />
        )}
        <div className="app-header-titles">
          <span className="app-header-title">{title}</span>
          {subtitle && <span className="app-header-subtitle">{subtitle}</span>}
        </div>
        {onAccountClick ? (
          <button
            className="app-header-back"
            onClick={onAccountClick}
            aria-label={accountLinked ? 'Account' : 'Save your account'}
            style={{ position: 'relative' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            {!accountLinked && (
              <span style={{
                position: 'absolute', top: 6, right: 6, width: 7, height: 7,
                borderRadius: '50%', background: 'var(--ember)',
                border: '1.5px solid var(--bg)',
              }} />
            )}
          </button>
        ) : (
          <span className="app-header-spacer" />
        )}
      </div>
    </header>
  );
}
