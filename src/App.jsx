import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchTitle, fetchCatalog } from './data/supabaseClient.js';
import { useAuth } from './engine/useAuth.js';
import { useReadingProgress } from './engine/useReadingProgress.js';
import { useStoryEngine } from './engine/useStoryEngine.js';
import { useNarration } from './engine/useNarration.js';
import { useVoiceChoice } from './engine/useVoiceChoice.js';
import { usePurchase } from './engine/usePurchase.js';
import { ChapterView } from './components/ChapterView.jsx';
import { ChoiceList } from './components/ChoiceList.jsx';
import { NarratorBar } from './components/NarratorBar.jsx';
import { Paywall } from './components/Paywall.jsx';
import { LandingPage } from './components/LandingPage.jsx';
import { AccountUpgrade } from './components/AccountUpgrade.jsx';
import './styles/app.css';

const TITLE_ID = 'ember-court';

export default function App() {
  const { user, loading: authLoading, isAnonymous } = useAuth();
  const { initialProgress, saveProgress } = useReadingProgress(user?.id, TITLE_ID);
  const purchase = usePurchase(user?.id, TITLE_ID);

  // Skip the landing page entirely if we're returning from Stripe —
  // the reader was mid-story when they left, they shouldn't be dumped
  // back at the front door after paying.
  const [view, setView] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('checkout') ? 'reader' : 'landing';
  });

  const [catalogEntry, setCatalogEntry] = useState(null);
  const [titleData, setTitleData] = useState(null);
  const [loadError, setLoadError] = useState(null);

  // Landing page only needs the lightweight catalog row, not the full
  // story text — keeps the first paint fast.
  useEffect(() => {
    let cancelled = false;
    fetchCatalog()
      .then((rows) => { if (!cancelled) setCatalogEntry(rows.find((r) => r.id === TITLE_ID) || null); })
      .catch((err) => { if (!cancelled) setLoadError(err); });
    return () => { cancelled = true; };
  }, []);

  // The full story (all node text) only loads once we actually enter
  // the reader — either the user clicked Start/Continue, or we're
  // resuming straight from a Stripe redirect.
  useEffect(() => {
    if (view !== 'reader' || titleData) return;
    let cancelled = false;
    fetchTitle(TITLE_ID)
      .then((data) => { if (!cancelled) setTitleData(data); })
      .catch((err) => { if (!cancelled) setLoadError(err); });
    return () => { cancelled = true; };
  }, [view, titleData]);

  const resumeReady = initialProgress !== undefined;

  if (loadError) {
    return (
      <div className="book">
        <div className="page">
          <p className="story-text">
            Couldn't load Emberbound ({loadError.message}). Check your Supabase
            connection and try refreshing.
          </p>
        </div>
      </div>
    );
  }

  if (view === 'landing') {
    if (!catalogEntry || authLoading || !resumeReady) {
      return (
        <div className="book">
          <div className="page"><p className="story-text">Loading…</p></div>
        </div>
      );
    }
    return (
      <LandingPage
        title={catalogEntry}
        hasProgress={!!initialProgress}
        onStart={() => setView('reader')}
      />
    );
  }

  // view === 'reader'
  if (!titleData || authLoading || !resumeReady || purchase.isUnlocked === undefined) {
    return (
      <div className="book">
        <div className="page"><p className="story-text">Loading…</p></div>
      </div>
    );
  }

  return (
    <StoryReader
      title={titleData.title}
      story={titleData.story}
      resumeFrom={initialProgress}
      onProgressChange={saveProgress}
      purchase={purchase}
      isAnonymous={isAnonymous}
      onBackToLanding={() => setView('landing')}
    />
  );
}

function StoryReader({ title, story, resumeFrom, onProgressChange, purchase, isAnonymous, onBackToLanding }) {
  const { currentNode, choose, restart } = useStoryEngine(story, resumeFrom, onProgressChange);
  const narration = useNarration();
  const voiceChoice = useVoiceChoice();

  const [autoRead, setAutoRead] = useState(false);
  const [handsFree, setHandsFree] = useState(false);
  const handsFreeRef = useRef(handsFree);
  useEffect(() => { handsFreeRef.current = handsFree; }, [handsFree]);

  const isLockedAndUnpaid = currentNode.locked && !purchase.isUnlocked;

  const maybeListen = useCallback((node) => {
    if (handsFreeRef.current && node.choices) {
      voiceChoice.listenForChoice(node.choices, (index) => choose(node.choices[index]));
    }
  }, [voiceChoice, choose]);

  const playPause = useCallback(() => {
    if (narration.isSpeaking) {
      narration.pause();
    } else {
      narration.speakNode(currentNode, () => maybeListen(currentNode));
    }
  }, [narration, currentNode, maybeListen]);

  useEffect(() => {
    narration.stop();
    if (autoRead && !isLockedAndUnpaid) narration.speakNode(currentNode, () => maybeListen(currentNode));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNode, isLockedAndUnpaid]);

  return (
    <div className="book">
      <button
        onClick={onBackToLanding}
        style={{
          background: 'none', border: 'none', color: 'var(--ink-dim)',
          fontSize: 12, cursor: 'pointer', padding: 0, marginBottom: 8,
        }}
      >
        ← Emberbound
      </button>
      <div className="kicker">A branching romantasy — fade-to-black edition</div>
      <h1 className="title">{title.name}</h1>
      {!isLockedAndUnpaid && <div className="chapter-name">{currentNode.chapter}</div>}

      <AccountUpgrade isAnonymous={isAnonymous} />

      {!isLockedAndUnpaid && (
        <NarratorBar
          narration={narration}
          voiceChoice={voiceChoice}
          autoRead={autoRead}
          setAutoRead={setAutoRead}
          handsFree={handsFree}
          setHandsFree={setHandsFree}
          onPlayPause={playPause}
          playLabel={narration.isSpeaking ? 'Pause' : 'Read aloud'}
        />
      )}

      {isLockedAndUnpaid ? (
        <Paywall
          title={title}
          onUnlock={purchase.startCheckout}
          loading={purchase.checkoutLoading}
          error={purchase.checkoutError}
        />
      ) : (
        <div className="page">
          <ChapterView node={currentNode} />
          <ChoiceList node={currentNode} onChoose={choose} onRestart={restart} />
        </div>
      )}
    </div>
  );
}
