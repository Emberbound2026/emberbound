# Emberbound — Week 1 scaffold

React + Vite rebuild of the branching-story engine, multi-voice narration,
and hands-free voice choices, ported from the single-file HTML prototype.

## Windows setup notes

Everything here is cross-platform (Node/Vite/Supabase don't care about
OS) — only two commands need a Windows-specific version:

- **Install Node.js first** if you haven't: nodejs.org → LTS version →
  installer. This gives you `node` and `npm` in Command Prompt/PowerShell.
- **Unzipping**: right-click the zip → "Extract All" in File Explorer,
  or in PowerShell: `Expand-Archive emberbound-app.zip`. (The `unzip`
  command from the earlier instructions is a Linux/Mac thing.)
- **Everything else** (`npm install`, `npm run dev`, `node supabase/seed.js`,
  `git` commands) — run exactly as written, in PowerShell, Command Prompt,
  or Git Bash (installed alongside Git for Windows) — all three work.
- **Git for Windows**: if you don't have `git` yet, get it from
  git-scm.com — installs Git Bash too, which behaves like a Linux
  terminal if you'd rather use that throughout.

## Run it

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## What's here

- `src/engine/useStoryEngine.js` — branching logic (choices, flags,
  branchOn) as a framework-agnostic hook. This never changes when you add
  a new title.
- `src/engine/useNarration.js` — multi-voice narration: loads available
  browser voices, splits chapter text into narrator/her/his segments, and
  queues them for playback.
- `src/engine/useVoiceChoice.js` — hands-free voice recognition for
  choosing options. **Chrome only** (Android/desktop) — Safari doesn't
  implement the Web Speech recognition API at all. This gets fixed for
  real in Week 7 when we wrap for native and swap in iOS's Speech
  framework / Android's SpeechRecognizer.
- `src/data/stories/ember-court.js` — the flagship title's content, in
  the `{ startNode, nodes }` shape the engine expects. Any future title
  (hardcoded, or fetched from Supabase) just needs to match this shape —
  that's the whole mechanism for multi-title support later.
- `src/components/` — presentation only; no story logic lives here.

## Known gaps (expected at this stage — Week 1 is engine migration only)

- No Supabase connection yet (Week 1 also stands up the schema, next).
- No paywall/purchase logic yet (Week 3).
- Dialogue speaker-detection is still heuristic (context-based guessing),
  same limitation as the prototype — worth revisiting once content moves
  to structured storage, where speaker can be tagged per line instead of
  guessed.
- No automated tests yet — flagged for the Week 8 testing pass, but
  honestly worth adding incrementally as each engine piece stabilizes
  rather than saving it all for one big push at the end.

## Next (Week 1, remaining)

- Supabase project + schema (titles, nodes, users, purchase_state)
- Deploy this skeleton to Vercel

### Supabase setup

1. Create a project at supabase.com (free tier).
2. Project → SQL Editor → paste and run `supabase/schema.sql`.
3. Project Settings → API → copy the Project URL and `anon` public key.
4. Copy `.env.example` to `.env.local` and fill in `VITE_SUPABASE_URL` /
   `VITE_SUPABASE_ANON_KEY`. Also grab the `service_role` key (same page)
   for `SUPABASE_SERVICE_ROLE_KEY` — needed only for the seed script below,
   never used in the app itself.
5. Seed The Ember Court into the database:
   ```bash
   node supabase/seed.js
   ```
6. The app still imports `ember-court.js` directly for now (Week 1 is
   about proving the schema works, not rewiring `App.jsx` yet) — swapping
   `App.jsx` to call `fetchTitle('ember-court')` instead of the static
   import is a small, deliberate next step once you've confirmed the seed
   worked (check the Supabase Table Editor — `titles` should have 1 row,
   `nodes` should have 14).

### Live data, accounts, and resume progress (this session)

`App.jsx` now fetches from Supabase instead of a hardcoded file, and every
reader gets a silent anonymous account so their progress can be saved and
resumed — no login screen, no signup friction, just reading.

**One required dashboard step:** anonymous sign-in is off by default.
- Supabase dashboard → **Authentication** → **Sign In / Providers**
- Find **Anonymous Sign-Ins** → toggle it **on**

Without this, `useAuth` will fail silently on `signInAnonymously()` and
nothing will save.

**To verify it's working:**
1. `npm run dev`, open the app, click through a couple of choices
2. Supabase dashboard → **Table Editor** → `auth.users` — you should see
   a new row (anonymous, no email) appear
3. **Table Editor** → `reading_progress` — should show a row with your
   `current_node_id` updating as you click through (there's an ~800ms
   save delay by design, so it won't update instantly on every click)
4. Refresh the browser tab entirely — you should land back where you
   left off, not at Chapter One

**Known gap, not yet built:** there's no way for a reader to turn their
anonymous session into a real account (email/password or magic link) —
which matters once purchases exist, since an anonymous session can be
lost (cleared cookies, new device) and take a paid unlock with it. This
is real Week 2/3 scope, not an oversight — flagging it so it doesn't get
forgotten once the paywall goes in.

### Paywall setup (Stripe + Edge Functions)

Free through the end of Chapter 3 (the binding scene) — everything from
Chapter 4 onward, plus all four endings, is locked until purchase. The
gate is enforced server-side: the client only ever *reads* the
`purchases` table, it never writes to it — the Stripe webhook is the
only thing allowed to record a purchase, so there's no way to spoof an
unlock from the browser.

**One UX note vs. the earlier mockup:** the paywall now appears as its
own full screen right after a Chapter 3 choice, rather than overlaid
with blurred choice buttons on the Chapter 3 screen itself — simpler
and more robust to build correctly. Worth revisiting later if the
blurred-preview version tests better once you have real readers.

**1. Run the migration** (your DB already exists from Week 1, so this is
an addition, not the full schema again):
- Supabase → SQL Editor → paste and run `supabase/migrations/002_paywall.sql`

**2. Re-run the seed** so the `locked` flags reach the database:
```
node supabase/seed.js
```

**3. Create a Stripe account** at stripe.com if you don't have one.
Stay in **Test mode** (toggle, top right of the Stripe dashboard) until
you're ready to take real payments — test mode uses fake card numbers,
zero real money moves.

**4. Get your Stripe secret key**
- Stripe dashboard → **Developers** → **API keys**
- Copy the **Secret key** (starts `sk_test_...` in test mode)

**5. Install the Supabase CLI** (needed to deploy Edge Functions —
different from the `supabase-js` npm package already in this project):
- Windows: `scoop install supabase` (install Scoop first from scoop.sh if you don't have it)
- Mac: `brew install supabase/tap/supabase`

**6. Link the CLI to your project**
```
supabase login
supabase link --project-ref <your-project-ref>
```
(Project ref is the part before `.supabase.co` in your project URL.)

**7. Set the function secrets** (these stay server-side, never in `.env.local`):
```
supabase secrets set STRIPE_SECRET_KEY=sk_test_...
supabase secrets set SITE_URL=https://emberbound.vercel.app
```
(`STRIPE_WEBHOOK_SECRET` comes in step 9, after Stripe gives it to you.)

**8. Deploy both functions**
```
supabase functions deploy create-checkout-session
supabase functions deploy stripe-webhook
```
This prints each function's URL — you'll need the `stripe-webhook` one next.

**9. Create the Stripe webhook**
- Stripe dashboard → **Developers** → **Webhooks** → **Add endpoint**
- Endpoint URL: the `stripe-webhook` URL from step 8
- Select event: **checkout.session.completed**
- Save, then copy the **Signing secret** shown (starts `whsec_...`)
```
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...
```

**10. Test it end-to-end**
- Run the app, click through to Chapter 4 — paywall should appear
- Click **Unlock this book** → redirects to Stripe Checkout
- Use Stripe's test card: `4242 4242 4242 4242`, any future expiry, any CVC
- Should redirect back and unlock within a few seconds (polling covers
  the brief gap while the webhook processes)
- Supabase Table Editor → `purchases` → should show a new row

### Deploy to Vercel

1. Push this project to a GitHub repo.
2. vercel.com → New Project → import the repo → it auto-detects Vite.
3. Add the two `VITE_SUPABASE_*` environment variables in the Vercel
   project settings (Settings → Environment Variables) — same values as
   your `.env.local`.
4. Deploy. You'll get a real HTTPS URL — this replaces the Netlify Drop
   link from the prototype phase with something stable and shareable.

