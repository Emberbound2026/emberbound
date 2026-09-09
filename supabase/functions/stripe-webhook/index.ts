// supabase/functions/stripe-webhook/index.ts
//
// Stripe calls this directly (not the client) once a payment genuinely
// completes. This is the ONLY place that writes to `purchases` — the
// table's RLS policy has no client-facing insert path on purpose, so
// there's no way to unlock content without a real, Stripe-verified
// payment. Uses the service role key to bypass RLS for this one insert.

import { createClient } from 'npm:@supabase/supabase-js@2';
import Stripe from 'npm:stripe@16';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2024-06-20',
});
const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!;

const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

Deno.serve(async (req) => {
  const signature = req.headers.get('stripe-signature');
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature!, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return new Response('Invalid signature', { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const { user_id, title_id } = session.metadata ?? {};

    if (!user_id || !title_id) {
      console.error('Webhook received without expected metadata:', session.id);
      return new Response('Missing metadata', { status: 400 });
    }

    const { error } = await supabaseAdmin.from('purchases').upsert({
      user_id,
      title_id,
      platform: 'stripe',
      receipt: session.id,
    }, { onConflict: 'user_id,title_id' });

    if (error) {
      console.error('Failed to record purchase:', error.message);
      return new Response('DB error', { status: 500 });
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
