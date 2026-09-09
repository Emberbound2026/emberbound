import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../data/supabaseClient.js';

/**
 * Loads any existing progress for this user+title on mount, and exposes
 * a `saveProgress` function the engine calls on every navigation.
 *
 * Saves fire immediately, not debounced. An earlier debounced version
 * caused real data loss: if the reader navigated away fast (e.g.
 * clicking "Unlock" right after landing on a locked node), the pending
 * debounce timer never got a chance to fire before the browser left for
 * Stripe Checkout, so that node was never actually saved. A reader
 * clicking through a story isn't a high-frequency write scenario, so
 * there's no real cost to saving on every single choice.
 */
export function useReadingProgress(userId, titleId) {
  const [initialProgress, setInitialProgress] = useState(undefined); // undefined = still loading, null = no saved progress

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
  }, [userId, titleId]);

  return { initialProgress, saveProgress };
}
