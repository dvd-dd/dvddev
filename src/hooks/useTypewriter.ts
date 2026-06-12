"use client";

import { useEffect, useState } from "react";

export type TypewriterPair = { title: string; description: string };

interface Options {
  pairs: TypewriterPair[];
  typeMsPerChar?: number;
  deleteMsPerChar?: number;
  holdMs?: number;
  enabled?: boolean;
}

type Phase = "typing" | "holding" | "deleting";

/**
 * Paired typewriter cycler — types both fields in lockstep to the
 * length of the longer string, holds, deletes, then advances to a
 * different random pair. Caller controls run-vs-pause via the
 * `enabled` flag (typically wired to a viewport `useInView()`).
 *
 * Both fields share one `charCount` so the *display* logic uses
 * `string.slice(0, charCount)` — the shorter field naturally saturates
 * at its own length during typing and starts visibly shrinking when
 * `charCount` drops below that length during the delete pass. That
 * reads as the form being cleared bottom-up, same texture as a human
 * cursor revising a draft.
 */
export function useTypewriter({
  pairs,
  typeMsPerChar = 35,
  deleteMsPerChar = 18,
  holdMs = 1500,
  enabled = true,
}: Options) {
  const [pairIdx, setPairIdx] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");

  // Reset cycle when the underlying pairs change (locale swap).
  useEffect(() => {
    setPairIdx(0);
    setCharCount(0);
    setPhase("typing");
  }, [pairs]);

  useEffect(() => {
    if (!enabled || pairs.length === 0) return;
    const pair = pairs[pairIdx];
    if (!pair) return;
    const longest = Math.max(pair.title.length, pair.description.length);

    let timer: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (charCount < longest) {
        const jitter = (Math.random() - 0.5) * 20;
        timer = setTimeout(
          () => setCharCount((c) => c + 1),
          Math.max(10, typeMsPerChar + jitter),
        );
      } else {
        setPhase("holding");
      }
    } else if (phase === "holding") {
      timer = setTimeout(() => setPhase("deleting"), holdMs);
    } else if (phase === "deleting") {
      if (charCount > 0) {
        timer = setTimeout(() => setCharCount((c) => c - 1), deleteMsPerChar);
      } else {
        let next = pairIdx;
        if (pairs.length > 1) {
          do {
            next = Math.floor(Math.random() * pairs.length);
          } while (next === pairIdx);
        }
        setPairIdx(next);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timer);
  }, [
    phase,
    charCount,
    pairIdx,
    pairs,
    typeMsPerChar,
    deleteMsPerChar,
    holdMs,
    enabled,
  ]);

  const pair = pairs[pairIdx] ?? { title: "", description: "" };
  return {
    title: pair.title.slice(0, charCount),
    description: pair.description.slice(0, charCount),
    phase,
    pairIdx,
  };
}
