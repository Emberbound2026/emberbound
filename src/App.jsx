import { useState, useEffect, useCallback, useRef } from 'react';
import { emberCourt } from './data/stories/ember-court.js';
import { useStoryEngine } from './engine/useStoryEngine.js';
import { useNarration } from './engine/useNarration.js';
import { useVoiceChoice } from './engine/useVoiceChoice.js';
import { ChapterView } from './components/ChapterView.jsx';
import { ChoiceList } from './components/ChoiceList.jsx';
import { NarratorBar } from './components/NarratorBar.jsx';
import './styles/app.css';

export default function App() {
  // Swapping `emberCourt` for a Supabase-fetched title is the whole
  // multi-title story — the engine and every component below only ever
  // deal with the { startNode, nodes } shape, never this specific file.
  const { currentNode, choose, restart } = useStoryEngine(emberCourt);
  const narration = useNarration();
  const voiceChoice = useVoiceChoice();

  const [autoRead, setAutoRead] = useState(false);
  const [handsFree, setHandsFree] = useState(false);

  const handsFreeRef = useRef(handsFree);
  useEffect(() => { handsFreeRef.current = handsFree; }, [handsFree]);

  const maybeListen = useCallback((node) => {
    if (handsFreeRef.current && node.choices) {
      voiceChoice.listenForChoice(node.choices, (index) => {
        choose(node.choices[index]);
      });
    }
  }, [voiceChoice, choose, handsFreeRef]);

  const playPause = useCallback(() => {
    if (narration.isSpeaking) {
      narration.pause();
    } else {
      narration.speakNode(currentNode, () => maybeListen(currentNode));
    }
  }, [narration, currentNode, maybeListen]);

  // Reset narration/voice state and optionally auto-read on every navigation.
  useEffect(() => {
    narration.stop();
    if (autoRead) {
      narration.speakNode(currentNode, () => maybeListen(currentNode));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNode]);

  return (
    <div className="book">
      <div className="kicker">A branching romantasy — fade-to-black edition</div>
      <h1 className="title">The Ember Court</h1>
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
