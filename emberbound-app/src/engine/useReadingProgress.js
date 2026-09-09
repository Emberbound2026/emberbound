import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '../data/supabaseClient.js';

const SAVE_DEBOUNCE_MS = 800;

/**
 * Loads any existing progress for this user+title on mount, and exposes
 * a `saveProgress` function the engine calls on every navigation. Writes
 * are debounced — if someone clicks through several choices fast, we
 * only actually hit the database once they pause.
 */
export function useReadingProgress(userId, titleId) {
  const [initialProgress, setInitialProgress] = useState(undefined); // undefined = still loading, null = no saved progress
  const debounceRef = useRef(null);

  useEffect(() => {
    if (!userId || !titleId) return;
    let cancelled = false;

    supabase
      .from('reading_progress')
      .select('current_node_id, flags, path_taken')
      .eq('user_id', userId)
      .eq('title_id', titleId)
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) { console.error('Failed to load progress:', error.message); setInitialProgress(null); return; }
        setInitialProgress(data || null);
      });

    return () => { cancelled = true; };
  }, [userId, titleId]);

  const saveProgress = useCallback((currentNodeId, flags, pathTaken) => {
    if (!userId || !titleId) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      supabase
        .from('reading_progress')
        .upsert({
          user_id: userId,
          title_id: titleId,
          current_node_id: currentNodeId,
          flags,
          path_taken: pathTaken,
          updated_at: new Date().toISOString(),
        })
        .then(({ error }) => {
          if (error) console.error('Failed to save progress:', error.message);
        });
    }, SAVE_DEBOUNCE_MS);
  }, [userId, titleId]);

  return { initialProgress, saveProgress };
}
