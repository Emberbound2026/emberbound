import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchTitle } from './data/supabaseClient.js';
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
import './styles/app.css';

const TITLE_ID = 'ember-court';

export default function App() {
  const { user, loading: authLoading } = useAuth();
  const [titleData, setTitleData] = useState(null);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchTitle(TITLE_ID)
      .then((data) => { if (!cancelled) setTitleData(data); })
      .catch((err) => { if (!cancelled) setLoadError(err); });
    return () => { cancelled = true; };
  }, []);

  const { initialProgress, saveProgress } = useReadingProgress(user?.id, TITLE_ID);
  const purchase = usePurchase(user?.id, TITLE_ID);

  const resumeReady = initialProgress !== undefined;

  if (loadError) {
    return (
      <div className="book">
        <div className="page">
          <p className="story-text">
            Couldn't load the story ({loadError.message}). Check your Supabase
            connection and try refreshing.
          </p>
        </div>
      </div>
    );
  }

  if (!titleData || authLoading || !resumeReady || purchase.isUnlocked === undefined) {
    return (
      <div className="book">
        <div className="page">
          <p className="story-text">Loading…</p>
        </div>
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
    />
  );
}

function StoryReader({ title, story, resumeFrom, onProgressChange, purchase }) {
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
    // Never narrate locked content the reader hasn't paid for.
    if (autoRead && !isLockedAndUnpaid) narration.speakNode(currentNode, () => maybeListen(currentNode));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNode, isLockedAndUnpaid]);

  return (
    <div className="book">
      <div className="kicker">A branching romantasy — fade-to-black edition</div>
      <h1 className="title">{title.name}</h1>
      {!isLockedAndUnpaid && <div className="chapter-name">{currentNode.chapter}</div>}

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
