// Run once, after the schema is applied and your .env.local has the
// Supabase credentials: `node supabase/seed.js`
//
// Re-running this is safe (upserts) — use it whenever you add a new
// title or edit existing story content.

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { emberCourt } from '../src/data/stories/ember-court.js';
import { bindingOath } from '../src/data/stories/binding-oath.js';
import { saltAndDrowning } from '../src/data/stories/salt-and-drowning.js';
import { wardensHeir } from '../src/data/stories/wardens-heir.js';
import { ashbound } from '../src/data/stories/ashbound.js';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Set VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (service role, not anon) before running.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Add any new title here — this is the only place a new title needs to
// be registered for seeding. Everything else (engine, paywall, landing
// page catalog) reads from the database, not from this list.
const titles = [
  {
    id: 'ember-court',
    name: 'The Ember Court',
    tagline: 'A former lover, now bound to a dying fae court, calls in a debt neither of you understood the weight of.',
    price_cents: 299,
    story: emberCourt,
  },
  {
    id: 'binding-oath',
    name: 'The Binding Oath',
    tagline: 'A rogue mage and the dragon-blooded knight hunting her are magically bound together — neither can go further than a mile from the other.',
    price_cents: 299,
    story: bindingOath,
  },
  {
    id: 'salt-and-drowning',
    name: 'Court of Salt and Drowning',
    tagline: 'A healer bargains with the exiled prince of a sea-fae court to save her sister — and finds the price is more than she came prepared to pay.',
    price_cents: 299,
    story: saltAndDrowning,
  },
  {
    id: 'wardens-heir',
    name: "The Last Warden's Heir",
    tagline: 'She inherits a centuries-old bond to the demon her bloodline was founded to guard against — and he isn\u2019t what three hundred years of stories promised.',
    price_cents: 299,
    story: wardensHeir,
  },
  {
    id: 'ashbound',
    name: 'Ashbound',
    tagline: 'An arranged marriage is the only thing standing between two warring dragon-shifter houses and the war that started it all reigniting.',
    price_cents: 299,
    story: ashbound,
  },
];

async function seed() {
  for (const title of titles) {
    const { error: titleError } = await supabase.from('titles').upsert({
      id: title.id,
      name: title.name,
      tagline: title.tagline,
      heat_level: 'fade-to-black',
      start_node: title.story.startNode,
      price_cents: title.price_cents,
      is_published: true,
    });
    if (titleError) throw titleError;

    const nodeRows = Object.entries(title.story.nodes).map(([nodeId, node]) => ({
      title_id: title.id,
      node_id: nodeId,
      chapter: node.chapter || null,
      text: node.text,
      is_ending: !!node.ending,
      is_locked: !!node.locked,
      ending_tag: node.tag || null,
      choices: node.choices || [],
    }));

    const { error: nodesError } = await supabase.from('nodes').upsert(nodeRows);
    if (nodesError) throw nodesError;

    console.log(`Seeded "${title.name}" — ${nodeRows.length} nodes.`);
  }
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
