import { useState, useCallback, useEffect } from 'react';

export function useStoryEngine(story, resumeFrom, onChange) {
  const [currentNodeId, setCurrentNodeId] = useState(resumeFrom?.current_node_id || story.startNode);
  const [flags, setFlags] = useState(resumeFrom?.flags || {});
  const [pathTaken, setPathTaken] = useState(resumeFrom?.path_taken || []);

  const [hasResumed, setHasResumed] = useState(false);
  useEffect(() => {
    if (resumeFrom && !hasResumed && pathTaken.length === 0) {
      setCurrentNodeId(resumeFrom.current_node_id);
      setFlags(resumeFrom.flags || {});
      setPathTaken(resumeFrom.path_taken || []);
      setHasResumed(true);
    }
  }, [resumeFrom, hasResumed, pathTaken.length]);

  const currentNode = story.nodes[currentNodeId];

  const choose = useCallback((choice) => {
    if (choice.setFlag) {
      setFlags((prev) => ({ ...prev, [choice.setFlag.name]: choice.setFlag.value }));
    }
    setPathTaken((prev) => [...prev, choice.label]);

    let nextId = choice.next;
    if (choice.branchOn) {
      nextId = flags[choice.branchOn.flag] ? choice.branchOn.ifTrue : choice.branchOn.ifFalse;
    }
    setCurrentNodeId(nextId);
  }, [flags]);

  const restart = useCallback(() => {
    setFlags({});
    setPathTaken([]);
    setCurrentNodeId(story.startNode);
  }, [story.startNode]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [currentNodeId]);

  useEffect(() => {
    if (onChange) onChange(currentNodeId, flags, pathTaken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNodeId]);

  return { currentNode, currentNodeId, flags, pathTaken, choose, restart };
}