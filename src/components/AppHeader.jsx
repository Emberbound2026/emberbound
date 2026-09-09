export function AppHeader({ onBack, title, subtitle }) {
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
        <span className="app-header-spacer" />
      </div>
    </header>
  );
}
