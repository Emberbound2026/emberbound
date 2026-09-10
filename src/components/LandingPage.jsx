import { useState } from 'react';
import { COVER_IMAGES } from '../data/covers.js';
import { AuthGate } from './AuthGate.jsx';

function CatalogCard({ title, hasProgress, isPurchased, onSelect }) {
  const cover = COVER_IMAGES[title.id];
  const priceDisplay = title.price_cents ? `£${(title.price_cents / 100).toFixed(2)}` : '';
  const metaText = isPurchased ? 'Purchased' : hasProgress ? 'In progress' : `Free start · ${priceDisplay}`;
  return (
    <button className="hscroll-card" onClick={() => onSelect(title.id)}>
      <div className="hscroll-cover">
        {cover && <img src={cover} alt="" />}
        {hasProgress && <span className="hscroll-progress-badge">Continue</span>}
      </div>
      <p className="hscroll-title">{title.name}</p>
      <p className="hscroll-meta">{metaText}</p>
    </button>
  );
}

export function LandingPage({ titles, inProgressIds, purchasedIds, onSelect, isAnonymous }) {
  const [signInOpen, setSignInOpen] = useState(false);
  const inProgress = titles.filter((t) => inProgressIds.has(t.id));
  const discover = titles;

  // Dedicated wide banner spanning all titles' motifs — deliberately
  // NOT a reused title cover, which left dead space when stretched
  // wide and duplicated whichever title happened to render below it.
  const heroCover = '/covers/hero-banner.png';

  return (
    <div className="book">
      <div className="hero">
        <div className="hero-bg" style={{ backgroundImage: `url(${heroCover})` }} />
        <div className="hero-scrim" />
        <div className="hero-content">
          <span className="hero-kicker">ROMANTASY · FADE TO BLACK</span>
          <h1 className="hero-headline">Choose how the story unfolds.</h1>
          <p className="hero-sub">{titles.length} stories, every ending yours to find.</p>
        </div>
      </div>

      {isAnonymous && (
        <div className="catalog-section">
          {signInOpen ? (
            <div className="page">
              <AuthGate
                heading="Sign in"
                description="Already have an account? Enter your email and we'll send a link — no password needed."
                redirectPath="/"
                compact
              />
              <button
                onClick={() => setSignInOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--ink-dim)', fontSize: 12, textDecoration: 'underline', cursor: 'pointer', marginTop: 12, padding: 0 }}
              >
                Never mind
              </button>
            </div>
          ) : (
            <p style={{ fontSize: 13, color: 'var(--ink-dim)', textAlign: 'center' }}>
              Have an account?{' '}
              <button
                onClick={() => setSignInOpen(true)}
                style={{ background: 'none', border: 'none', color: 'var(--ink)', fontSize: 13, textDecoration: 'underline', cursor: 'pointer', padding: 0, fontWeight: 600 }}
              >
                Sign in
              </button>
              {' '}— or just start reading below as a guest.
            </p>
          )}
        </div>
      )}

      {inProgress.length > 0 && (
        <div className="catalog-section">
          <h2 className="catalog-section-title">Continue Reading</h2>
          <div className="hscroll">
            {inProgress.map((title) => (
              <CatalogCard key={title.id} title={title} hasProgress isPurchased={purchasedIds.has(title.id)} onSelect={onSelect} />
            ))}
          </div>
        </div>
      )}

      <div className="catalog-section">
        <h2 className="catalog-section-title">
          {inProgress.length > 0 ? 'All Stories' : 'Discover'}
        </h2>
        <div className="hscroll">
          {discover.map((title) => (
            <CatalogCard
              key={title.id}
              title={title}
              hasProgress={inProgressIds.has(title.id)}
              isPurchased={purchasedIds.has(title.id)}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
