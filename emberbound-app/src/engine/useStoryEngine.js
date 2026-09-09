import { useState, useCallback, useEffect } from 'react';

/**
 * Drives a branching story from its data (see data/stories/ember-court.js
 * for the expected shape). Framework-agnostic in spirit — this hook is the
 * only place that understands "flags", "branchOn", "setFlag" etc, so the
 * story JSON itself stays portable to any future renderer.
 *
 * `resumeFrom`, if given, is { current_node_id, flags, path_taken } from
 * a previous session (see useReadingProgress) — pass null/undefined to
 * always start fresh.
 */
export function useStoryEngine(story, resumeFrom, onChange) {
  const [currentNodeId, setCurrentNodeId] = useState(resumeFrom?.current_node_id || story.startNode);
  const [flags, setFlags] = useState(resumeFrom?.flags || {});
  const [pathTaken, setPathTaken] = useState(resumeFrom?.path_taken || []);

  // If resumeFrom arrives *after* first render (it's loaded async from
  // Supabase), apply it once — but only if the reader hasn't already
  // started clicking through on the fresh state in the meantime.
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

  // Report every change so the caller can persist it (debounced saving
  // lives in useReadingProgress, not here — this hook doesn't know or
  // care that Supabase exists).
  useEffect(() => {
    if (onChange) onChange(currentNodeId, flags, pathTaken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNodeId]);

  return { currentNode, currentNodeId, flags, pathTaken, choose, restart };
}
