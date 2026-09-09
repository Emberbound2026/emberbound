-- Emberbound — initial schema
-- Run this in the Supabase SQL editor (Project → SQL Editor → New query).

-- ─── Titles ──────────────────────────────────────────────────────────
-- One row per story. Matches the { name, description } shape you'd show
-- in a catalog/library screen.
create table titles (
  id text primary key,              -- e.g. 'ember-court' — used in URLs
  name text not null,
  tagline text,
  cover_image_url text,
  heat_level text default 'fade-to-black',
  start_node text not null,         -- e.g. 'n1'
  price_cents int default 299,      -- per-title unlock price
  is_published boolean default false,
  created_at timestamptz default now()
);

-- ─── Nodes ───────────────────────────────────────────────────────────
-- One row per story node (chapter/scene). This is the JSON content that
-- was hardcoded in ember-court.js — moving it here is what makes multi-
-- title support and future editing possible without a code deploy.
create table nodes (
  title_id text references titles(id) on delete cascade,
  node_id text not null,            -- e.g. 'n1', 'n2a'
  chapter text,
  text text not null,
  is_ending boolean default false,
  ending_tag text,
  choices jsonb default '[]',       -- [{ label, next, setFlag?, branchOn? }]
  primary key (title_id, node_id)
);

-- ─── Users' reading progress ────────────────────────────────────────
-- Ties to Supabase Auth's built-in auth.users table.
create table reading_progress (
  user_id uuid references auth.users(id) on delete cascade,
  title_id text references titles(id) on delete cascade,
  current_node_id text not null,
  flags jsonb default '{}',
  path_taken jsonb default '[]',
  updated_at timestamptz default now(),
  primary key (user_id, title_id)
);

-- ─── Purchases ───────────────────────────────────────────────────────
-- One row per unlock. `platform` and `receipt` matter once StoreKit/Play
-- Billing are wired in (Week 7) — for the web/Stripe path, `receipt`
-- holds the Stripe payment intent ID instead.
create table purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  title_id text references titles(id) on delete cascade,
  platform text not null,           -- 'stripe' | 'app_store' | 'play_store'
  receipt text,
  purchased_at timestamptz default now(),
  unique (user_id, title_id)
);

-- ─── Row Level Security ─────────────────────────────────────────────
-- Titles/nodes are public read (it's a content catalog); progress and
-- purchases are private to the owning user.
alter table titles enable row level security;
alter table nodes enable row level security;
alter table reading_progress enable row level security;
alter table purchases enable row level security;

create policy "Published titles are publicly readable"
  on titles for select using (is_published = true);

create policy "Nodes are publicly readable"
  on nodes for select using (true);

create policy "Users manage their own progress"
  on reading_progress for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users read their own purchases"
  on purchases for select
  using (auth.uid() = user_id);
-- Note: inserts into `purchases` should go through a server-side function
-- (Supabase Edge Function) that verifies the receipt first — never let the
-- client insert its own purchase row directly, or anyone could unlock
-- content for free by calling the API. Flagging this now so it's not
-- retrofitted after the paywall is already live.
