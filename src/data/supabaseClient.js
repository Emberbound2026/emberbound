import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Fetches a title and reassembles its nodes into the { startNode, nodes }
 * shape the engine expects — this is the only place that needs to know
 * the data comes from Supabase rather than a hardcoded file.
 */
export async function fetchTitle(titleId) {
  const { data: title, error: titleError } = await supabase
    .from('titles')
    .select('*')
    .eq('id', titleId)
    .single();
  if (titleError) throw titleError;

  const { data: nodeRows, error: nodesError } = await supabase
    .from('nodes')
    .select('*')
    .eq('title_id', titleId);
  if (nodesError) throw nodesError;

  const nodes = {};
  nodeRows.forEach((row) => {
    nodes[row.node_id] = {
      chapter: row.chapter,
      text: row.text,
      ending: row.is_ending,
      locked: row.is_locked,
      tag: row.ending_tag,
      choices: row.choices,
    };
  });

  return { title, story: { startNode: title.start_node, nodes } };
}

export async function fetchCatalog() {
  const { data, error } = await supabase
    .from('titles')
    .select('id, name, tagline, cover_image_url, price_cents')
    .eq('is_published', true);
  if (error) throw error;
  return data;
}
