import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchTitle, fetchCatalog, fetchInProgressTitleIds } from './data/supabaseClient.js';
import { useAuth } from './engine/useAuth.js';
import { useReadingProgress } from './engine/useReadingProgress.js';
import { useStoryEngine } from './engine/useStoryEngine.js';
import { useNarration } from './engine/useNarration.js';
import { useNarratorSettings } from './engine/useNarratorSettings.js';
import { useVoiceChoice } from './engine/useVoiceChoice.js';
import { usePurchase } from './engine/usePurchase.js';
import { ChapterView } from './components/ChapterView.jsx';
import { ChoiceList } from './components/ChoiceList.jsx';
import { NarratorBar } from './components/NarratorBar.jsx';
import { Paywall } from './components/Paywall.jsx';
import { LandingPage } from './components/LandingPage.jsx';
import { AccountUpgrade } from './components/AccountUpgrade.jsx';
import './styles/app.css';

export default function App() {
  const { user, loading: authLoading, isAnonymous } = useAuth();

  // Which title (if any) is selected. Reading straight from the URL on
  // first load means a Stripe redirect (?checkout=success&title=...)
  // drops the reader back into the right book, not the landing page.
  const [selectedTitleId, setSelectedTitleId] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('title') || null;
  });

  const [catalog, setCatalog] = useState(null);
  const [inProgressIds, setInProgressIds] = useState(new Set());
  const [titleData, setTitleData] = useState(null);
  const [loadError, setLoadError] = useState(null);

  // Landing page needs the lightweight catalog list, not full story text.
  useEffect(() => {
    let cancelled = false;
    fetchCatalog()
      .then((rows) => { if (!cancelled) setCatalog(rows); })
      .catch((err) => { if (!cancelled) setLoadError(err); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!user?.id) return;
    let cancelled = false;
    fetchInProgressTitleIds(user.id)
      .then((ids) => { if (!cancelled) setInProgressIds(ids); })
      .catch((err) => console.error('Failed to load progress list:', err.message));
    return () => { cancelled = true; };
  }, [user?.id]);

  // Full story text only loads once a title is actually selected.
  useEffect(() => {
    if (!selectedTitleId) { setTitleData(null); return; }
    let cancelled = false;
    fetchTitle(selectedTitleId)
      .then((data) => { if (!cancelled) setTitleData(data); })
      .catch((err) => { if (!cancelled) setLoadError(err); });
    return () => { cancelled = true; };
  }, [selectedTitleId]);

  const { initialProgress, saveProgress } = useReadingProgress(user?.id, selectedTitleId);
  const purchase = usePurchase(user?.id, selectedTitleId);

  const handleBackToLanding = useCallback(() => {
    setSelectedTitleId(null);
    setTitleData(null);
    // Refresh so a just-finished/just-started title's Start/Continue
    // label is correct if the reader picks a title again this session.
    if (user?.id) {
      fetchInProgressTitleIds(user.id).then(setInProgressIds).catch(() => {});
    }
  }, [user?.id]);

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

  if (!selectedTitleId) {
    if (!catalog || authLoading) {
      return (
        <div className="book">
          <div className="page"><p className="story-text">Loading…</p></div>
        </div>
      );
    }
    return (
      <LandingPage
        titles={catalog}
        inProgressIds={inProgressIds}
        onSelect={setSelectedTitleId}
      />
    );
  }

  const resumeReady = initialProgress !== undefined;
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
      onBackToLanding={handleBackToLanding}
    />
  );
}

function StoryReader({ title, story, resumeFrom, onProgressChange, purchase, isAnonymous, onBackToLanding }) {
  const { currentNode, choose, restart } = useStoryEngine(story, resumeFrom, onProgressChange);
  const narration = useNarration();
  const voiceChoice = useVoiceChoice();
  const [savedSettings, updateSavedSettings] = useNarratorSettings();

  // Restore auto-read/hands-free immediately from storage — these are
  // simple booleans, no need to wait for anything else to load first.
  const [autoRead, setAutoReadRaw] = useState(() => savedSettings.autoRead ?? false);
  const [handsFree, setHandsFreeRaw] = useState(() => savedSettings.handsFree ?? false);

  const setAutoRead = useCallback((value) => {
    setAutoReadRaw(value);
    updateSavedSettings({ autoRead: value });
  }, [updateSavedSettings]);

  const setHandsFree = useCallback((value) => {
    setHandsFreeRaw(value);
    updateSavedSettings({ handsFree: value });
  }, [updateSavedSettings]);

  const handsFreeRef = useRef(handsFree);
  useEffect(() => { handsFreeRef.current = handsFree; }, [handsFree]);

  // Once the voice list actually loads, resolve any saved voice
  // *names* back to indices in this session's list. Only runs once
  // (guarded by hasRestoredVoices) so it doesn't fight with the user
  // manually picking a different voice afterward.
  const hasRestoredVoicesRef = useRef(false);
  useEffect(() => {
    if (hasRestoredVoicesRef.current || narration.voices.length === 0) return;
    hasRestoredVoicesRef.current = true;

    const findByName = (name) => narration.voices.findIndex((v) => v.name === name);
    if (savedSettings.narratorVoiceName) {
      const i = findByName(savedSettings.narratorVoiceName);
      if (i >= 0) narration.setNarratorVoice(i);
    }
    if (savedSettings.herVoiceName) {
      const i = findByName(savedSettings.herVoiceName);
      if (i >= 0) narration.setHerVoice(i);
    }
    if (savedSettings.hisVoiceName) {
      const i = findByName(savedSettings.hisVoiceName);
      if (i >= 0) narration.setHisVoice(i);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [narration.voices]);

  // Save voice choices by name whenever they change (after restoration,
  // so we're not immediately re-saving the defaults over a real
  // preference during the initial load race).
  useEffect(() => {
    if (!hasRestoredVoicesRef.current) return;
    const name = narration.voices[narration.narratorVoice]?.name;
    if (name) updateSavedSettings({ narratorVoiceName: name });
  }, [narration.narratorVoice, narration.voices, updateSavedSettings]);

  useEffect(() => {
    if (!hasRestoredVoicesRef.current) return;
    const name = narration.voices[narration.herVoice]?.name;
    if (name) updateSavedSettings({ herVoiceName: name });
  }, [narration.herVoice, narration.voices, updateSavedSettings]);

  useEffect(() => {
    if (!hasRestoredVoicesRef.current) return;
    const name = narration.voices[narration.hisVoice]?.name;
    if (name) updateSavedSettings({ hisVoiceName: name });
  }, [narration.hisVoice, narration.voices, updateSavedSettings]);

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
