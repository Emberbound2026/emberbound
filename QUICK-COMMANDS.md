# Wovenfate — Quick Commands

Keep this open in a tab while working with Claude. Run everything from
your actual project folder: the one with `package.json`, `.git`, and
`node_modules` directly inside it —
`C:\Users\Liam\Documents\Claude - Wovenfate\wovenfate-app`

(If you haven't renamed your local folders yet, see "One-time folder
rename" below first — do that before using the path above.)

---

## One-time folder rename (do this once, now)

Your local folders are still named for the old "Emberbound" branding.
Renaming them keeps everything consistent going forward:

1. Close any terminal/editor windows with the project open.
2. In File Explorer, rename `Claude - Emberbound` → `Wovenfate`.
3. Inside it, rename `emberbound-app` → `wovenfate-app` (there may be
   a nested folder of the same name inside that one too — rename that
   one as well, so you end up with `Wovenfate\wovenfate-app` containing
   `package.json` directly).
4. Update the path everywhere in this file if you chose different
   names than above.

Renaming folders doesn't break `.git` or `node_modules` — Windows
handles that fine, no need to reinstall or re-clone anything.

---

## After Claude sends a new zip

1. Extract it somewhere **fresh** (not directly into your project) —
   e.g. Desktop, as a new folder each time.
2. Find the folder with `package.json` directly in it:
   ```
   dir /s /b package.json
   ```
3. From that exact extracted folder, copy the changes into your real project:
   ```powershell
   robocopy . "C:\Users\Liam\Documents\Claude - Wovenfate\wovenfate-app" /E /XD node_modules
   ```
4. Confirm it runs:
   ```
   npm run dev
   ```

## Push a working update to GitHub → Vercel

```
git add .
git commit -m "describe the change here"
git push
```
Vercel auto-redeploys within ~1 minute. Check the Deployments tab for "Ready."

## Re-seed the database (needed whenever story *content* changes)

```
node supabase/seed.js
```
Should print one line per title. Not needed for UI-only/code-only changes.

## Redeploy an Edge Function (needed only when Claude changes a `.ts` file under `supabase/functions/`)

```
supabase functions deploy create-checkout-session
```
or
```
supabase functions deploy stripe-webhook
```

## Common hiccups

- **"running scripts is disabled"** → use Command Prompt instead of
  PowerShell, or run: `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`
- **`npm run dev` says it can't find `package.json`** → you're in the
  wrong folder. `cd` to the one with `package.json` directly inside it.
- **Git asks for username/password and rejects it** → GitHub needs a
  Personal Access Token instead of a password, or just let it open the
  browser login flow (`git push` alone usually triggers this).
- **Landing page looks broken/empty on wide desktop browser** →
  expected. This is a mobile-first app — judge layout at phone width
  (resize the window narrow, or Chrome DevTools → device toolbar,
  Ctrl+Shift+M) or just test on your actual phone.
