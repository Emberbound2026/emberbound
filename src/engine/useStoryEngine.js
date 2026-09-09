import { useState, useCallback, useEffect } from 'react';

/**
 * Drives a branching story from its data (see data/stories/ember-court.js
 * for the expected shape). Framework-agnostic in spirit — this hook is the
 * only place that understands "flags", "branchOn", "setFlag" etc, so the
 * story JSON itself stays portable to any future renderer.
 */
export function useStoryEngine(story) {
  const [currentNodeId, setCurrentNodeId] = useState(story.startNode);
  const [flags, setFlags] = useState({});
  const [pathTaken, setPathTaken] = useState([]);

  const currentNode = story.nodes[currentNodeId];

  const choose = useCallback((choice) => {
    if (choice.setFlag) {
      setFlags((prev) => ({ ...prev, [choice.setFlag.name]: choice.setFlag.value }));
    }
    setPathTaken((prev) => [...prev, choice.label]);

    let nextId = choice.next;
    if (choice.branchOn) {
      // Read the flag as of *this* click — setFlags above is async, so if a
      // single choice both sets and branches on the same flag we'd read the
      // stale value. None of our current content does that, but branchOn
      // should resolve against the flag state as the reader currently sees
      // it, which is what `flags` holds here.
      nextId = flags[choice.branchOn.flag] ? choice.branchOn.ifTrue : choice.branchOn.ifFalse;
    }
    setCurrentNodeId(nextId);
  }, [flags]);

  const restart = useCallback(() => {
    setFlags({});
    setPathTaken([]);
    setCurrentNodeId(story.startNode);
  }, [story.startNode]);

  // Scroll to top on every navigation — carried over from the prototype fix.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [currentNodeId]);

  return { currentNode, currentNodeId, flags, pathTaken, choose, restart };
}
