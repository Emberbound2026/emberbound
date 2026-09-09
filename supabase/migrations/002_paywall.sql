-- Run this in Supabase SQL Editor — adds what schema.sql didn't have yet
-- when you first ran it (paywall support).

alter table nodes add column if not exists is_locked boolean default false;

-- Nothing else needed here — seed.js re-run (upsert) will populate
-- is_locked correctly once ember-court.js has the `locked: true` flags.
