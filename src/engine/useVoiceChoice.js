import { useRef, useState, useCallback } from 'react';

const SpeechRecognitionCtor =
  typeof window !== 'undefined' ? window.SpeechRecognition || window.webkitSpeechRecognition : null;

const ORDINAL_WORDS = [
  ['one', 'first', '1'],
  ['two', 'second', '2'],
  ['three', 'third', '3'],
  ['four', 'fourth', '4'],
];

function matchChoice(transcript, choices) {
  const t = transcript.toLowerCase();
  for (let i = 0; i < choices.length; i++) {
    if (ORDINAL_WORDS[i]?.some((w) => t.includes(w))) return i;
  }
  let bestIndex = -1;
  let bestScore = 0;
  choices.forEach((choice, i) => {
    const words = choice.label.toLowerCase().split(/\W+/).filter((w) => w.length > 3);
    const score = words.filter((w) => t.includes(w)).length;
    if (score > bestScore) { bestScore = score; bestIndex = i; }
  });
  return bestIndex >= 0 ? bestIndex : null;
}

/**
 * NOTE: this is the Web Speech API, which does not support recognition on
 * Safari (iOS or macOS) at all — only synthesis (narration) works there.
 * Chrome (Android/desktop) is the only reliable target for this hook today.
 * The native app (Week 7 of the plan) replaces this with iOS's own Speech
 * framework / Android's SpeechRecognizer, which removes this gap entirely.
 */
export function useVoiceChoice() {
  const recognizerRef = useRef(null);
  const [status, setStatus] = useState('');
  const [supported] = useState(() => {
    if (!window.isSecureContext) return false;
    if (!SpeechRecognitionCtor) return false;
    return true;
  });

  const unsupportedReason = !window.isSecureContext
    ? 'Needs HTTPS hosting to access the microphone'
    : !SpeechRecognitionCtor
    ? 'This browser doesn\u2019t support voice recognition (notably Safari) — try Chrome'
    : null;

  const listenForChoice = useCallback((choices, onChosen) => {
    if (!supported || !choices?.length) return;
    if (!recognizerRef.current) {
      recognizerRef.current = new SpeechRecognitionCtor();
      recognizerRef.current.lang = 'en-GB';
      recognizerRef.current.interimResults = false;
      recognizerRef.current.maxAlternatives = 3;
    }
    const recognizer = recognizerRef.current;
    setStatus('Listening… say "option one" or "option two"');

    recognizer.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const index = matchChoice(transcript, choices);
      if (index !== null) {
        setStatus(`Heard: "${transcript}" \u2192 choosing option ${index + 1}`);
        onChosen(index);
      } else {
        setStatus(`Didn't catch that — try "option one" or "option two"`);
      }
    };
    recognizer.onerror = (event) => {
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        setStatus('Microphone permission was blocked — check your browser\u2019s site settings');
      } else if (event.error === 'no-speech') {
        setStatus('Didn\u2019t hear anything — try again');
      } else if (event.error === 'network') {
        setStatus('Voice recognition needs an internet connection');
      } else {
        setStatus(`Voice control error: ${event.error} — try again or tap a choice`);
      }
    };
    recognizer.onend = () => setStatus((s) => (s.startsWith('Listening') ? '' : s));

    try { recognizer.start(); } catch { /* already running */ }
  }, [supported]);

  return { supported, unsupportedReason, status, listenForChoice };
}
