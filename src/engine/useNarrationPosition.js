const STORAGE_KEY = 'wovenfate-narration-position';

// Segment position is per-device by the same reasoning as voice choice
// (see useNarratorSettings) — it's tied to this device's specific text
// segmentation/playback, not something meaningful to sync cross-device.

function loadAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveAll(all) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    // Private browsing or storage disabled — narration still works,
    // it just always starts from the top of the chapter.
  }
}

export function getSavedPosition(key) {
  return loadAll()[key] ?? 0;
}

export function saveSavedPosition(key, index) {
  const all = loadAll();
  all[key] = index;
  saveAll(all);
}

export function clearSavedPosition(key) {
  const all = loadAll();
  delete all[key];
  saveAll(all);
}
