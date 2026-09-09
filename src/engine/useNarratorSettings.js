import { useState, useCallback } from 'react';

const STORAGE_KEY = 'emberbound-narrator-settings';

// Voice choices are saved by name, not index — the same voice can sit
// at a different index depending on browser/OS/what's installed, so an
// index saved today could point at a completely different voice next
// session. Name is the one thing that's stable enough to look back up.
function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function persist(settings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Private browsing or storage disabled — narration still works,
    // it just won't remember preferences between sessions.
  }
}

export function useNarratorSettings() {
  const [settings, setSettings] = useState(loadSettings);

  const update = useCallback((patch) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      persist(next);
      return next;
    });
  }, []);

  return [settings, update];
}
