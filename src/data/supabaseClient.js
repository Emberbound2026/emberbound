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

/**
 * Returns the set of title_ids this user has any saved progress on —
 * used purely to decide whether a catalog card says "Start Reading" or
 * "Continue Reading". A Set, not a map, since we only need membership.
 */
export async function fetchInProgressTitleIds(userId) {
  if (!userId) return new Set();
  const { data, error } = await supabase
    .from('reading_progress')
    .select('title_id')
    .eq('user_id', userId);
  if (error) throw error;
  return new Set(data.map((row) => row.title_id));
}

/**
 * Returns the set of title_ids this user has purchased — used to work
 * out whether they already own the full library, so the bundle promo
 * doesn't keep advertising itself to someone who's already bought
 * everything.
 */
export async function fetchPurchasedTitleIds(userId) {
  if (!userId) return new Set();
  const { data, error } = await supabase
    .from('purchases')
    .select('title_id')
    .eq('user_id', userId);
  if (error) throw error;
  return new Set(data.map((row) => row.title_id));
}
