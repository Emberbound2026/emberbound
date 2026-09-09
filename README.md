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

### Deploy to Vercel

1. Push this project to a GitHub repo.
2. vercel.com → New Project → import the repo → it auto-detects Vite.
3. Add the two `VITE_SUPABASE_*` environment variables in the Vercel
   project settings (Settings → Environment Variables) — same values as
   your `.env.local`.
4. Deploy. You'll get a real HTTPS URL — this replaces the Netlify Drop
   link from the prototype phase with something stable and shareable.

