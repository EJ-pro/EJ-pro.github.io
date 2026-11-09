"use client";

import { useEffect, useState, useSyncExternalStore, type CSSProperties, type RefObject } from "react";

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReduced(onChange: () => void) {
  const media = window.matchMedia(REDUCED_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

/** 사용자가 움직임 줄이기를 켰는지. 서버 렌더에서는 false로 둔다. */
export function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false,
  );
}

/** 요소가 처음 화면에 들어오면 true가 되고, 그 뒤로는 그대로 유지된다. */
export function useSeenOnce(ref: RefObject<Element | null>, threshold = 0.18) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, seen, threshold]);
  return seen;
}

/**
 * 섹션 머리의 툴 호출 칩 단계.
 * 0 대기 → 1 실행 중 → 2 완료(섹션 애니메이션 시작) → 3 정리됨
 */
export function useToolPhase(started: boolean) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (!started) return;
    const timers = [
      setTimeout(() => setPhase(1), 0),
      setTimeout(() => setPhase(2), 900),
      setTimeout(() => setPhase(3), 2600),
    ];
    return () => timers.forEach(clearTimeout);
  }, [started]);
  return phase;
}

/** active가 되면 0부터 total까지 interval마다 step씩 센다. */
export function useCounter(active: boolean, total: number, interval: number, step = 1, delay = 0) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let id: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      id = setInterval(() => {
        setCount((c) => {
          const next = Math.min(c + step, total);
          if (next >= total && id) clearInterval(id);
          return next;
        });
      }, interval);
    }, delay);
    return () => {
      clearTimeout(start);
      if (id) clearInterval(id);
    };
  }, [active, total, interval, step, delay]);
  return count;
}

const LIGHT_TINTS = ["rgba(52,70,232,0.18)", "rgba(255,181,71,0.42)", "rgba(15,122,92,0.20)", "rgba(180,35,90,0.18)"];
const DARK_TINTS = ["rgba(255,201,77,0.42)", "rgba(150,170,255,0.42)", "rgba(110,231,183,0.36)", "rgba(255,150,195,0.38)"];

/** 문장을 BPE 비슷한 토큰으로 자르고, 켜졌을 때 색이 물결치듯 지나가는 스타일을 붙인다. */
export function tokenize(text: string, on: boolean, dark = false) {
  const tints = dark ? DARK_TINTS : LIGHT_TINTS;
  const tokens: string[] = [];
  text.split(" ").forEach((word, wi) => {
    const pieces: string[] = [];
    if (/^[\x00-\x7F]+$/.test(word)) pieces.push(word);
    else for (let k = 0; k < word.length; k += 2) pieces.push(word.slice(k, k + 2));
    pieces.forEach((p, pi) => tokens.push((wi > 0 && pi === 0 ? " " : "") + p));
  });
  return tokens.map((t, i) => ({
    text: t,
    style: on
      ? ({ "--tint": tints[i % 4], animation: `tokwave 1.6s ease-out ${i * 55}ms both` } as CSSProperties)
      : undefined,
  }));
}
