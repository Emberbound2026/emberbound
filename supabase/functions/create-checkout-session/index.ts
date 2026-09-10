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
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'gbp',
          unit_amount: BUNDLE_PRICE_CENTS,
          product_data: { name: BUNDLE_NAME },
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
