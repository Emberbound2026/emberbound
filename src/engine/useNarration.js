import { useState, useEffect, useRef, useCallback } from 'react';

const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;

/**
 * Splits a chapter's text into narrator / her / his segments by pulling out
 * quoted dialogue and guessing the speaker from nearby pronouns.
 *
 * This is a heuristic, not authored speaker-tagging — it works well given
 * how consistently the prose attributes dialogue ("you say" / "he says"),
 * but an unusual sentence could occasionally misfire. The real fix, once
 * content moves to Supabase, is tagging speaker per line at authoring time
 * rather than guessing it at read time — worth doing before this scales
 * past the flagship title.
 */
function segmentNode(node) {
  const segments = [];
  const paragraphs = node.text.trim().split('\n\n');

  paragraphs.forEach((para) => {
    const clean = para.replace(/\*/g, '');
    const quoteRegex = /"([^"]+)"/g;
    let lastIndex = 0;
    let match;
    while ((match = quoteRegex.exec(clean)) !== null) {
      const before = clean.slice(lastIndex, match.index);
      if (before.trim()) segments.push({ speaker: 'narrator', text: before });

      const after = clean.slice(match.index + match[0].length, match.index + match[0].length + 80).toLowerCase();
      const beforeCtx = clean.slice(Math.max(0, match.index - 80), match.index).toLowerCase();
      const ctx = after + ' ' + beforeCtx;
      const hasHe = /\b(he|his|him)\b/.test(ctx);
      const hasYou = /\b(you|your)\b/.test(ctx);
      const speaker = hasHe && !hasYou ? 'his' : hasYou && !hasHe ? 'her' : hasHe ? 'his' : 'her';

      segments.push({ speaker, text: match[1] });
      lastIndex = match.index + match[0].length;
    }
    const rest = clean.slice(lastIndex);
    if (rest.trim()) segments.push({ speaker: 'narrator', text: rest });
  });

  if (node.choices && node.choices.length) {
    const options = node.choices.map((c) => c.label).join('. Or, ');
    segments.push({ speaker: 'narrator', text: `What do you choose? ${options}.` });
  }
  return segments;
}

export function useNarration() {
  const [voices, setVoices] = useState([]);
  const [narratorVoice, setNarratorVoice] = useState(0);
  const [herVoice, setHerVoice] = useState(0);
  const [hisVoice, setHisVoice] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const queueRef = useRef([]);
  const onQueueEmptyRef = useRef(null);

  useEffect(() => {
    if (!synth) return;
    const load = () => {
      const rawList = synth.getVoices();
      if (!rawList.length) return;

      // English-only, alphabetised — a raw system voice list is often
      // 40+ entries (every installed language), which makes for an
      // unusable picker. Content is English-only, so nothing else is
      // relevant here. Falls back to the full list only on the rare
      // device with no English voices at all.
      const englishOnly = rawList.filter((v) => v.lang && v.lang.toLowerCase().startsWith('en'));
      const list = (englishOnly.length ? englishOnly : rawList)
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name));
      setVoices(list);

      const enVoices = list.map((v, i) => ({ v, i }));
      const gbVoices = enVoices.filter((o) => o.v.lang === 'en-GB');
      const findFirst = (arr, pattern, exclude) => arr.find((o) => pattern.test(o.v.name) && o.i !== exclude);

      const narrator = findFirst(gbVoices, /male|daniel|arthur|george|oliver/i) || gbVoices[0] || enVoices[0] || { i: 0 };
      const his = findFirst(enVoices, /male|daniel|arthur|george|oliver|fred|aaron/i, narrator.i)
        || findFirst(gbVoices, /male/i, narrator.i) || narrator;
      const her = findFirst(enVoices, /female|samantha|serena|karen|victoria|susan|zira|fiona/i, narrator.i)
        || enVoices.find((o) => o.i !== narrator.i && o.i !== his.i) || enVoices[0] || narrator;

      setNarratorVoice(narrator.i >= 0 ? narrator.i : 0);
      setHisVoice(his.i >= 0 ? his.i : 0);
      setHerVoice(her.i >= 0 ? her.i : 0);
    };
    load();
    synth.onvoiceschanged = load;
  }, []);

  const voiceAndPitchFor = useCallback((speaker) => {
    if (speaker === 'his') return { voice: voices[hisVoice], pitch: 0.8, rate: 0.97 };
    if (speaker === 'her') return { voice: voices[herVoice], pitch: 1.05, rate: 1.0 };
    return { voice: voices[narratorVoice], pitch: 0.85, rate: 0.95 };
  }, [voices, hisVoice, herVoice, narratorVoice]);

  const speakNext = useCallback(() => {
    if (!queueRef.current.length) {
      setIsSpeaking(false);
      if (onQueueEmptyRef.current) onQueueEmptyRef.current();
      return;
    }
    const seg = queueRef.current.shift();
    const utter = new SpeechSynthesisUtterance(seg.text.replace(/\n+/g, ' ').trim());
    const { voice, pitch, rate } = voiceAndPitchFor(seg.speaker);
    if (voice) utter.voice = voice;
    utter.pitch = pitch;
    utter.rate = rate;
    utter.onend = speakNext;
    utter.onerror = speakNext;
    synth.speak(utter);
  }, [voiceAndPitchFor]);

  const speakNode = useCallback((node, onDone) => {
    if (!synth) return;
    synth.cancel();
    queueRef.current = segmentNode(node);
    onQueueEmptyRef.current = onDone || null;
    setIsSpeaking(true);
    setIsPaused(false);
    speakNext();
  }, [speakNext]);

  const stop = useCallback(() => {
    if (synth) synth.cancel();
    queueRef.current = [];
    setIsSpeaking(false);
    setIsPaused(false);
  }, []);

  const pause = useCallback(() => {
    if (!synth) return;
    synth.pause();
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    if (!synth) return;
    synth.resume();
    setIsPaused(false);
  }, []);

  return {
    supported: !!synth,
    voices, narratorVoice, herVoice, hisVoice,
    setNarratorVoice, setHerVoice, setHisVoice,
    isSpeaking, isPaused, speakNode, stop, pause, resume,
  };
}
