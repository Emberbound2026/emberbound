// Run once, after the schema is applied and your .env has the Supabase
// credentials: `node supabase/seed.js`
//
// This is intentionally a plain Node script, not part of the app bundle —
// it's a migration tool, not something that runs at request time.

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { emberCourt } from '../src/data/stories/ember-court.js';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // NOT the anon key — this needs write access, run locally only, never ship this key to the client
if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Set VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (service role, not anon) before running.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seed() {
  const { error: titleError } = await supabase.from('titles').upsert({
    id: 'ember-court',
    name: 'The Ember Court',
    tagline: 'A branching romantasy — choose how the story unfolds.',
    heat_level: 'fade-to-black',
    start_node: emberCourt.startNode,
    price_cents: 299,
    is_published: true,
  });
  if (titleError) throw titleError;

  const nodeRows = Object.entries(emberCourt.nodes).map(([nodeId, node]) => ({
    title_id: 'ember-court',
    node_id: nodeId,
    chapter: node.chapter || null,
    text: node.text,
    is_ending: !!node.ending,
    ending_tag: node.tag || null,
    choices: node.choices || [],
  }));

  const { error: nodesError } = await supabase.from('nodes').upsert(nodeRows);
  if (nodesError) throw nodesError;

  console.log(`Seeded 1 title and ${nodeRows.length} nodes.`);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
