// supabase/functions/create-checkout-session/index.ts
//
// Called from the client (see src/engine/usePurchase.js) when a reader
// hits "Unlock this book". Runs server-side because it needs the Stripe
// *secret* key — that can never live in client code.

import { createClient } from 'npm:@supabase/supabase-js@2';
import Stripe from 'npm:stripe@16';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2024-06-20',
});

const siteUrl = Deno.env.get('SITE_URL')!; // e.g. https://emberbound.vercel.app

// Required because this function is called directly from the browser —
// without these headers, the browser's CORS preflight (an automatic
// OPTIONS request) gets rejected before our actual code ever runs.
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

  // Verify the reader's Supabase session from their auth header — we
  // need a real user_id to attach to the purchase, not something the
  // client could spoof by just passing a value in the request body.
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) return new Response('Missing auth', { status: 401, headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: authHeader } } }
  );
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) return new Response('Invalid session', { status: 401, headers: corsHeaders });

  const { titleId } = await req.json();
  if (!titleId) return new Response('Missing titleId', { status: 400, headers: corsHeaders });

  // Look up the real price server-side — never trust a price from the client.
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
    // metadata is how the webhook (which has no idea who clicked what)
    // finds out which user bought which title.
    metadata: { user_id: user.id, title_id: title.id },
    success_url: `${siteUrl}/?checkout=success`,
    cancel_url: `${siteUrl}/?checkout=cancelled`,
  });

  return new Response(JSON.stringify({ url: session.url }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});
