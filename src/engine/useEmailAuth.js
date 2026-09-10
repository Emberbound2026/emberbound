import { useState, useCallback } from 'react';
import { supabase } from '../data/supabaseClient.js';

/**
 * One email form, three outcomes, handled transparently:
 *
 * 1. New email, currently a guest → links this email to the CURRENT
 *    anonymous session (updateUser). Same user id, so any progress or
 *    in-flight purchase on this device is preserved.
 * 2. Email already belongs to an existing account (e.g. reader is on
 *    a new device) → updateUser fails with "already registered" —
 *    caught here and retried as signInWithOtp instead, which signs
 *    into that existing account. Anything tied to *this* device's
 *    anonymous session is abandoned in favor of the real account's
 *    data — the right tradeoff, since the existing account is what
 *    they actually came back for.
 * 3. Genuinely new reader who wants an account before reading anything
 *    — same as case 1, there's just very little on the anonymous
 *    session yet to preserve.
 *
 * Either path ends the same way: a magic link is emailed, and
 * `emailRedirectTo` (when given) brings the reader back to the exact
 * screen they were on — critical for the paywall case, where landing
 * back at the homepage instead of the book they were trying to buy
 * would be a genuinely bad moment to get wrong.
 */
export function useEmailAuth() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState(null);
  const [mode, setMode] = useState(null); // 'linked' | 'signin' — which path was taken, for messaging

  const sendAuthLink = useCallback(async (email, redirectPath) => {
    setStatus('sending');
    setError(null);

    const emailRedirectTo = redirectPath
      ? `${window.location.origin}${redirectPath}`
      : window.location.origin;

    const { error: linkError } = await supabase.auth.updateUser(
      { email },
      { emailRedirectTo }
    );

    if (!linkError) {
      setMode('linked');
      setStatus('sent');
      return;
    }

    // "already registered"-type errors mean this email belongs to a
    // real existing account already — fall back to a normal sign-in
    // link for that account instead of treating it as a hard failure.
    const alreadyExists = /already|exists|registered/i.test(linkError.message);
    if (!alreadyExists) {
      setStatus('error');
      setError(linkError.message);
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo },
    });
    if (signInError) {
      setStatus('error');
      setError(signInError.message);
      return;
    }
    setMode('signin');
    setStatus('sent');
  }, []);

  return { status, error, mode, sendAuthLink };
}
