// Covers live in /public/covers — a static mapping is a pragmatic
// stopgap until titles have a real upload/CMS pipeline (at which point
// this becomes title.cover_image_url from Supabase instead).
const COVER_IMAGES = {
  'ember-court': '/covers/ember-court.png',
  'binding-oath': '/covers/binding-oath.png',
  'salt-and-drowning': '/covers/salt-and-drowning.png',
  'wardens-heir': '/covers/wardens-heir.png',
  'ashbound': '/covers/ashbound.png',
};

function CatalogCard({ title, hasProgress, onSelect }) {
  const cover = COVER_IMAGES[title.id];
  const priceDisplay = title.price_cents ? `£${(title.price_cents / 100).toFixed(2)}` : '';
  return (
    <button className="hscroll-card" onClick={() => onSelect(title.id)}>
      <div className="hscroll-cover">
        {cover && <img src={cover} alt="" />}
        {hasProgress && <span className="hscroll-progress-badge">Continue</span>}
      </div>
      <p className="hscroll-title">{title.name}</p>
      <p className="hscroll-meta">{hasProgress ? 'In progress' : `Free start · ${priceDisplay}`}</p>
    </button>
  );
}

export function LandingPage({ titles, inProgressIds, onSelect }) {
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

      {inProgress.length > 0 && (
        <div className="catalog-section">
          <h2 className="catalog-section-title">Continue Reading</h2>
          <div className="hscroll">
            {inProgress.map((title) => (
              <CatalogCard key={title.id} title={title} hasProgress onSelect={onSelect} />
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
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
