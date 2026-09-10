import { useState, useEffect, useCallback } from 'react';
import { supabase, fetchPurchasedTitleIds } from '../data/supabaseClient.js';

/**
 * Reports whether the reader already owns every published title
 * (`hasFullLibrary`), and exposes `startBundleCheckout()`. Mirrors
 * usePurchase's shape, but there's no single titleId to check against —
 * ownership means "purchased count >= catalog size."
 */
export function useBundlePurchase(userId, catalogSize) {
  const [hasFullLibrary, setHasFullLibrary] = useState(undefined); // undefined = still checking
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);

  const checkOwnership = useCallback(() => {
    if (!userId || !catalogSize) return;
    fetchPurchasedTitleIds(userId)
      .then((ids) => setHasFullLibrary(ids.size >= catalogSize))
      .catch((err) => console.error('Failed to check bundle ownership:', err.message));
  }, [userId, catalogSize]);

  useEffect(() => { checkOwnership(); }, [checkOwnership]);

  // Same reasoning as usePurchase's polling — the webhook takes a
  // moment to land after a real Stripe redirect. Specifically checks
  // for the bundle flag so this never fires on a single-title redirect.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('checkout') !== 'success' || params.get('bundle') !== 'true') return;

    let attempts = 0;
    const interval = setInterval(() => {
      attempts += 1;
      checkOwnership();
      if (attempts >= 8) clearInterval(interval);
    }, 1500);

    window.history.replaceState({}, '', window.location.pathname);

    return () => clearInterval(interval);
  }, [checkOwnership]);

  const startBundleCheckout = useCallback(async () => {
    setCheckoutLoading(true);
    setCheckoutError(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { bundle: true },
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (error) throw error;
      window.location.href = data.url;
    } catch (err) {
      console.error('Bundle checkout failed to start:', err.message);
      setCheckoutError('Couldn\u2019t start checkout — try again in a moment.');
      setCheckoutLoading(false);
    }
  }, []);

  return { hasFullLibrary, startBundleCheckout, checkoutLoading, checkoutError };
}
