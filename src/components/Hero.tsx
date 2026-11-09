"use client";

import { useEffect, useState } from "react";
import { hero, profile } from "@/data/portfolio";
import { useReducedMotion } from "@/lib/motion";
import { Check, Spinner, TypingDots } from "./ui";

/*
 * 첫 대화 타임라인 (ms)
 * 1 인사 → 2 입력 중 → 3 소개 스트리밍 → 4 포트폴리오 안내 → 5 툴 실행 → 6 완료 → 7 아래로 안내
 */
const TIMELINE: [number, number][] = [
  [400, 1],
  [1100, 2],
  [2100, 3],
  [5200, 4],
  [5900, 5],
  [7300, 6],
  [7800, 7],
];
const FINAL_STEP = 7;

function Conversation({ reduced, onReplay }: { reduced: boolean; onReplay: () => void }) {
  const [step, setStep] = useState(0);
  const [chars, setChars] = useState(0);
  const full = hero.statement.length;

  useEffect(() => {
    if (reduced) return;
    const timers = TIMELINE.map(([ms, s]) => setTimeout(() => setStep(s), ms));
    let stream: ReturnType<typeof setInterval> | undefined;
    timers.push(
      setTimeout(() => {
        stream = setInterval(() => {
          setChars((c) => {
            const next = Math.min(c + 1, full);
            if (next >= full && stream) clearInterval(stream);
            return next;
          });
        }, 34);
      }, 2100),
    );
    return () => {
      timers.forEach(clearTimeout);
      if (stream) clearInterval(stream);
    };
  }, [reduced, full]);

  const s = reduced ? FINAL_STEP : step;
  const shown = reduced ? full : chars;

  return (
    <>
      <div className="hero-thread">
        <p className="hero-start">새 대화가 시작됐어요</p>
        {s >= 1 && <p className="bubble-user pop">{hero.opening}</p>}
        {s === 2 && <TypingDots />}
        {s >= 3 && (
          <div className="answer pop">
            <div className="speaker">
              <span>{profile.name}</span>
            </div>
            <h1 className="hero-title" aria-label={hero.statement}>
              <span aria-hidden="true">{hero.statement.slice(0, shown)}</span>
              <span className="caret" aria-hidden="true" />
            </h1>
          </div>
        )}
        {s >= 4 && <p className="bubble-user pop">{hero.closing}</p>}
        {s >= 5 && (
          <div className="tool-row pop">
            {s === 5 ? <Spinner /> : <Check color="#0F7A5C" />}
            <span>{hero.tool}</span>
            <span className="chip-badge">{s >= 6 ? "준비됨" : "여는 중"}</span>
          </div>
        )}
      </div>
      <div className="hero-composer">
        <div className="composer">
          <span className="composer-placeholder">{profile.name}에게 메시지 보내기</span>
          <button type="button" className="ghost-btn" onClick={onReplay}>
            대화 다시 재생
          </button>
        </div>
      </div>
      <div className="hero-handoff">
        {s >= 7 && (
          <div className="hero-handoff-inner pop">
            <p>{hero.handoff}</p>
            <a href="#context" className="nudge round-btn" aria-label="프로필로 내려가기">
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 4v10M4.5 9.5L9 14l4.5-4.5" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </>
  );
}

export function Hero() {
  const reduced = useReducedMotion();
  const [run, setRun] = useState(0);

  return (
    <section id="hello" className="hero" aria-label="첫 대화">
      {/* key가 바뀌면 대화가 처음부터 다시 재생된다 */}
      <Conversation key={run} reduced={reduced} onReplay={() => setRun((r) => r + 1)} />
    </section>
  );
}
