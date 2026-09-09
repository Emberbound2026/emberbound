import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchTitle } from './data/supabaseClient.js';
import { useAuth } from './engine/useAuth.js';
import { useReadingProgress } from './engine/useReadingProgress.js';
import { useStoryEngine } from './engine/useStoryEngine.js';
import { useNarration } from './engine/useNarration.js';
import { useVoiceChoice } from './engine/useVoiceChoice.js';
import { ChapterView } from './components/ChapterView.jsx';
import { ChoiceList } from './components/ChoiceList.jsx';
import { NarratorBar } from './components/NarratorBar.jsx';
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

  // Don't hand resumeFrom to the engine until we actually know whether
  // there's saved progress (undefined = still checking) — otherwise
  // we'd flash the start node then jump to a resumed one.
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

  if (!titleData || authLoading || !resumeReady) {
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
    />
  );
}

function StoryReader({ title, story, resumeFrom, onProgressChange }) {
  const { currentNode, choose, restart } = useStoryEngine(story, resumeFrom, onProgressChange);
  const narration = useNarration();
  const voiceChoice = useVoiceChoice();

  const [autoRead, setAutoRead] = useState(false);
  const [handsFree, setHandsFree] = useState(false);
  const handsFreeRef = useRef(handsFree);
  useEffect(() => { handsFreeRef.current = handsFree; }, [handsFree]);

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
    if (autoRead) narration.speakNode(currentNode, () => maybeListen(currentNode));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNode]);

  return (
    <div className="book">
      <div className="kicker">A branching romantasy — fade-to-black edition</div>
      <h1 className="title">{title.name}</h1>
      <div className="chapter-name">{currentNode.chapter}</div>

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

      <div className="page">
        <ChapterView node={currentNode} />
        <ChoiceList node={currentNode} onChoose={choose} onRestart={restart} />
      </div>
    </div>
  );
}
