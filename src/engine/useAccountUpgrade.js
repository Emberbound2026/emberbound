import { useState, useCallback } from 'react';
import { supabase } from '../data/supabaseClient.js';

/**
 * Calling updateUser({ email }) on an anonymous session links that email
 * to the SAME user id — Supabase sends a confirmation link, and once
 * clicked, the anonymous account becomes a permanent one without ever
 * changing its id. Every purchases/reading_progress row already keyed to
 * that id stays valid automatically; there's no separate "merge" step.
 */
export function useAccountUpgrade() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState(null);

  const sendUpgradeLink = useCallback(async (email) => {
    setStatus('sending');
    setError(null);
    const { error } = await supabase.auth.updateUser({ email });
    if (error) {
      setStatus('error');
      setError(error.message);
      return;
    }
    setStatus('sent');
  }, []);

  return { status, error, sendUpgradeLink };
}
