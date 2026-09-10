import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../data/supabaseClient.js';

/**
 * Reports whether `titleId` is unlocked for the current user, and exposes
 * `startCheckout()` to begin a purchase. The actual unlock only ever
 * happens via the Stripe webhook writing to `purchases` server-side (see
 * supabase/functions/stripe-webhook) — this hook just reads that table
 * and calls the checkout-session function; it never writes a purchase
 * itself, by design.
 */
export function usePurchase(userId, titleId) {
  const [isUnlocked, setIsUnlocked] = useState(undefined); // undefined = still checking
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);

  const checkUnlockStatus = useCallback(() => {
    if (!userId || !titleId) return;
    supabase
      .from('purchases')
      .select('id')
      .eq('user_id', userId)
      .eq('title_id', titleId)
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) { console.error('Failed to check purchase status:', error.message); return; }
        setIsUnlocked(!!data);
      });
  }, [userId, titleId]);

  useEffect(() => { checkUnlockStatus(); }, [checkUnlockStatus]);

  // If we just came back from Stripe (?checkout=success), the webhook may
  // take a second or two to land — poll briefly rather than showing a
  // false "still locked" state right after a real successful payment.
  // Guarded on titleId: without one, there's nothing for *this* hook to
  // check, and clearing the URL here would strip a bundle-purchase
  // redirect's params before useBundlePurchase gets to read them.
  useEffect(() => {
    if (!titleId) return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('checkout') !== 'success') return;

    let attempts = 0;
    const interval = setInterval(() => {
      attempts += 1;
      checkUnlockStatus();
      if (attempts >= 8) clearInterval(interval); // ~12s, then give up polling
    }, 1500);

    // Clean the URL so refreshing doesn't re-trigger polling forever.
    window.history.replaceState({}, '', window.location.pathname);

    return () => clearInterval(interval);
  }, [checkUnlockStatus]);

  const startCheckout = useCallback(async () => {
    setCheckoutLoading(true);
    setCheckoutError(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { titleId },
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (error) throw error;
      window.location.href = data.url;
    } catch (err) {
      console.error('Checkout failed to start:', err.message);
      setCheckoutError('Couldn\u2019t start checkout — try again in a moment.');
      setCheckoutLoading(false);
    }
  }, [titleId]);

  return { isUnlocked, startCheckout, checkoutLoading, checkoutError };
}
