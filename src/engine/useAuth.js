import { useState, useEffect } from 'react';
import { supabase } from '../data/supabaseClient.js';

/**
 * Ensures every reader has a Supabase session, without ever showing a
 * login screen. Anonymous auth means we get a stable user_id to key
 * reading_progress/purchases off from the first page load — the reader
 * only needs to create a real account later, if they want purchases to
 * follow them to a new device (that's a separate "upgrade this session"
 * flow, not built yet — flagging it as a real Week 2 gap, not forgotten).
 */
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function ensureSession() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        if (!cancelled) { setUser(session.user); setLoading(false); }
        return;
      }
      const { data, error } = await supabase.auth.signInAnonymously();
      if (error) {
        console.error('Anonymous sign-in failed:', error.message);
        if (!cancelled) setLoading(false);
        return;
      }
      if (!cancelled) { setUser(data.user); setLoading(false); }
    }

    ensureSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      cancelled = true;
      listener.subscription.unsubscribe();
    };
  }, []);

  return { user, loading, isAnonymous: user?.is_anonymous ?? false };
}
