// supabase/functions/create-checkout-session/index.ts
//
// Called from the client (see src/engine/usePurchase.js and
// src/engine/useBundlePurchase.js) when a reader hits "Unlock this
// book" or "Unlock the full library". Runs server-side because it
// needs the Stripe *secret* key — that can never live in client code.

import { createClient } from 'npm:@supabase/supabase-js@2';
import Stripe from 'npm:stripe@16';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2024-06-20',
});

const siteUrl = Deno.env.get('SITE_URL')!; // e.g. https://wovenfate.vercel.app

// Bundle price lives here, server-side, same reasoning as never trusting
// a single title's price from the client — the amount actually charged
// must never come from the browser. One bundle exists today (the full
// catalog), so a constant is fine; revisit if that ever changes.
const BUNDLE_PRICE_CENTS = 1000; // £10.00
const BUNDLE_NAME = 'Wovenfate — Full Library';

// Stripe's actual documented minimum for GBP (docs.stripe.com/currencies)
// — used as the floor for a discounted "complete your collection" price,
// since Stripe can't process a charge below this regardless of how much
// credit a reader has earned from prior individual purchases.
const MIN_CHARGE_CENTS = 30; // £0.30

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders });
  }

  const authHeader = req.headers.get('Authorization');
  if (!authHeader) return new Response('Missing auth', { status: 401, headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: authHeader } } }
  );
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) return new Response('Invalid session', { status: 401, headers: corsHeaders });

  const { titleId, bundle } = await req.json();

  if (bundle) {
    // Fair "complete your collection" pricing: a reader who already
    // bought some titles individually gets credit for what they've
    // already paid, so buying the bundle afterward never costs more in
    // total than the bundle price itself — regardless of the order
    // they bought things in. Without this, someone who bought 2 books
    // individually (£5.98) then the full bundle (£10) would end up
    // paying £15.98 total, MORE than a brand-new customer buying
    // everything as singles (£14.95). That's the exact bug being fixed.
    const [{ data: allTitles, error: titlesError }, { data: owned, error: ownedError }] = await Promise.all([
      supabase.from('titles').select('id, price_cents').eq('is_published', true),
      supabase.from('purchases').select('title_id').eq('user_id', user.id),
    ]);
    if (titlesError || !allTitles) return new Response('Failed to load titles', { status: 500, headers: corsHeaders });
    if (ownedError) return new Response('Failed to load purchases', { status: 500, headers: corsHeaders });

    const ownedIds = new Set((owned ?? []).map((p) => p.title_id));
    if (ownedIds.size >= allTitles.length) {
      return new Response('Already own the full library', { status: 400, headers: corsHeaders });
    }

    const alreadyPaid = allTitles
      .filter((t) => ownedIds.has(t.id))
      .reduce((sum, t) => sum + (t.price_cents || 0), 0);

    const isDiscounted = alreadyPaid > 0;
    const unitAmount = Math.max(MIN_CHARGE_CENTS, BUNDLE_PRICE_CENTS - alreadyPaid);
    const productName = isDiscounted
      ? `${BUNDLE_NAME} — Complete Your Collection`
      : BUNDLE_NAME;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'gbp',
          unit_amount: unitAmount,
          product_data: { name: productName },
        },
        quantity: 1,
      }],
      // No title_id here — the webhook checks for type:'bundle' and
      // unlocks every published title for this user, rather than one.
      metadata: { user_id: user.id, type: 'bundle' },
      success_url: `${siteUrl}/?checkout=success&bundle=true`,
      cancel_url: `${siteUrl}/?checkout=cancelled&bundle=true`,
    });
    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  if (!titleId) return new Response('Missing titleId', { status: 400, headers: corsHeaders });

  const { data: title, error: titleError } = await supabase
    .from('titles')
    .select('id, name, price_cents')
    .eq('id', titleId)
    .single();
  if (titleError || !title) return new Response('Title not found', { status: 404, headers: corsHeaders });

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{
      price_data: {
        currency: 'gbp',
        unit_amount: title.price_cents,
        product_data: { name: title.name },
      },
      quantity: 1,
    }],
    metadata: { user_id: user.id, type: 'single', title_id: title.id },
    success_url: `${siteUrl}/?checkout=success&title=${title.id}`,
    cancel_url: `${siteUrl}/?checkout=cancelled&title=${title.id}`,
  });

  return new Response(JSON.stringify({ url: session.url }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});
