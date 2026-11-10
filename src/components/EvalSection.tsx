"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { evals, type EvalCase } from "@/data/portfolio";
import { useCounter, useReducedMotion, useSeenOnce, useToolPhase } from "@/lib/motion";
import { Check, Spinner, ToolChip } from "./ui";

type Status = "queued" | "running" | "done";
const pad = (n: number) => String(n).padStart(2, "0");
const VERDICT: Record<Status, string> = { queued: "대기", running: "평가 중", done: "통과" };

function EvalCard({ item, index, status, onOpen }: { item: EvalCase; index: number; status: Status; onOpen: (i: number) => void }) {
  return (
    <li className={`eval-card is-${status}`}>
      <div className="eval-card-top">
        <span className="mono eval-num">평가 {pad(index + 1)}</span>
        <span className="verdict">
          {status === "running" && <Spinner size={12} />}
          {status === "done" && <Check size={12} width={2.4} />}
          {VERDICT[status]}
        </span>
      </div>
      <strong className="eval-title">{item.title}</strong>
      <span className="eval-desc">{item.desc}</span>
      <span className="tag-row">
        {item.tags.map((t) => (
          <span key={t} className="tag">
            {t}
          </span>
        ))}
      </span>
      {status === "running" && (
        <span className="runbar-track" aria-hidden="true">
          <span className="runbar" />
        </span>
      )}
      {status === "done" && (
        <button type="button" className="eval-open pop" data-eval-open={index} onClick={() => onOpen(index)}>
          자세히 보기
          <span aria-hidden="true">→</span>
        </button>
      )}
    </li>
  );
}

/** 카드 하나를 크게 펼쳐 보는 집중 화면 */
function EvalFocus({ index, onClose, onMove }: { index: number; onClose: () => void; onMove: (d: number) => void }) {
  const item = evals[index];
  const ev = item.evidence;
  const backRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    backRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onMove(1);
      if (e.key === "ArrowLeft") onMove(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onMove]);

  return (
    <div className="eval-focus" role="region" aria-label={`평가 ${pad(index + 1)} 상세`}>
      <div className="eval-focus-bar">
        <button ref={backRef} type="button" className="eval-focus-back" onClick={onClose}>
          <span aria-hidden="true">←</span> 전체 평가 보기
        </button>
        <div className="eval-focus-nav">
          <span className="mono">
            {pad(index + 1)} / {pad(evals.length)}
          </span>
          <button type="button" aria-label="이전 평가" onClick={() => onMove(-1)}>
            ‹
          </button>
          <button type="button" aria-label="다음 평가" onClick={() => onMove(1)}>
            ›
          </button>
        </div>
      </div>

      <div key={index} className="eval-focus-body">
        <div className="eval-focus-main">
          <span className="eval-focus-badge mono">
            <Check size={13} width={2.6} />
            평가 {pad(index + 1)} 통과
          </span>
          <h3>{item.title}</h3>
          <p className="eval-focus-desc">{item.desc}</p>
          <span className="eval-focus-tags">
            {item.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </span>
          <div className="eval-focus-metric">
            <span className="mono">{ev.metric.label}</span>
            <strong>{ev.metric.value}</strong>
          </div>
        </div>

        <div className="eval-focus-side">
          <p className="eval-focus-label mono">근거 · {ev.project}</p>
          <ol className="eval-focus-points">
            {ev.points.map((pt, k) => (
              <li key={pt} style={{ animationDelay: `${260 + k * 120}ms` }}>
                <span className="mono">{pad(k + 1)}</span>
                {pt}
              </li>
            ))}
          </ol>
          {ev.slug && (
            <Link className="eval-focus-link" href={`/projects/${ev.slug}/`}>
              {ev.project} 상세 페이지 보기 <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

/** 4. 평가: 가운데 콘솔에서 평가가 돌고, 양옆 카드가 하나씩 통과한다 */
export function EvalSection() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const seen = useSeenOnce(ref);
  const tool = useToolPhase(seen && !reduced);
  const ticked = useCounter(tool >= 2, evals.length, 820);

  const phase = reduced ? 3 : tool;
  const current = reduced ? evals.length : tool >= 2 ? ticked : -1;
  const statusOf = (i: number): Status => (i < current ? "done" : i === current ? "running" : "queued");
  const passed = Math.max(0, Math.min(current, evals.length));

  const cards = evals.map((item, index) => ({ item, index, status: statusOf(index) }));
  const left = cards.filter((c) => c.index % 2 === 0);
  const right = cards.filter((c) => c.index % 2 === 1);
  const log = cards.filter((c) => c.status !== "queued");
  const boardRef = useRef<HTMLDivElement>(null);
  const [focus, setFocus] = useState<number | null>(null);
  const lastRef = useRef(0);
  const [visited, setVisited] = useState(false);

  const toBoard = (smooth: boolean) =>
    requestAnimationFrame(() => {
      const el = boardRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      if (top < 70 || top > window.innerHeight * 0.4) el.scrollIntoView({ behavior: smooth && !reduced ? "smooth" : "auto", block: "start" });
    });
  const openFocus = (i: number) => {
    lastRef.current = i;
    setVisited(true);
    setFocus(i);
    toBoard(true);
  };
  const closeFocus = useCallback(() => {
    setFocus(null);
    requestAnimationFrame(() => {
      const btn = document.querySelector<HTMLButtonElement>(`[data-eval-open="${lastRef.current}"]`);
      btn?.focus({ preventScroll: true });
      btn?.closest("li")?.scrollIntoView({ behavior: "auto", block: "center" });
    });
  }, []);
  const moveFocus = useCallback((d: number) => {
    setFocus((f) => {
      if (f === null) return f;
      const n = (f + d + evals.length) % evals.length;
      lastRef.current = n;
      return n;
    });
  }, []);

  return (
    <section id="evals" ref={ref} className="section section-fog" aria-labelledby="evals-title">
      <div className="wrap evals">
        <div className="evals-head">
          <ToolChip call='run_evals(suite="experience")' phase={phase} result={`${evals.length}건`} />
          <h2 id="evals-title" className="h2">이재희 AI 실력 검증</h2>
          <p className="lead">실제 프로젝트에서 반복해서 맡아온 여섯 가지 일로 평가합니다.</p>
        </div>

        <div ref={boardRef} className="evals-stage">
        {focus !== null ? (
          <EvalFocus index={focus} onClose={closeFocus} onMove={moveFocus} />
        ) : (
        <div className={`evals-board${visited ? " board-in" : ""}`}>
          <ul className="eval-col" aria-label="평가 항목 1, 3, 5">
            {left.map((c) => (
              <EvalCard key={c.index} {...c} onOpen={openFocus} />
            ))}
          </ul>

          <div className="console">
            <div className="window-bar">
              <span /><span /><span />
              <em>eval_runner</em>
            </div>
            <div className="console-score">
              <p role="img" aria-label={`${passed}/${evals.length} 통과`}>
                <span className="score-big" aria-hidden="true">{passed}</span>
                <span className="score-of" aria-hidden="true">/{evals.length}</span>
                <span className="score-label" aria-hidden="true">통과</span>
              </p>
              <div className="segments" aria-hidden="true">
                {cards.map((c) => (
                  <span key={c.index} className={`seg is-${c.status}`} />
                ))}
              </div>
            </div>
            <ol className="console-log" aria-live="polite" aria-label="평가 로그">
              <li className="log-cmd">$ run_evals --suite experience</li>
              {log.map((c) => (
                <li key={c.index} className={`log-line row-in is-${c.status}`}>
                  <span className="log-mark">{c.status === "done" ? "✓" : "›"}</span>
                  <span>
                    평가 {pad(c.index + 1)} {c.item.title}
                    {c.status === "running" && <span className="caret-y caret-sm" aria-hidden="true" />}
                  </span>
                </li>
              ))}
              {passed >= evals.length && <li className="log-done row-in">{evals.length} passed, 0 failed</li>}
            </ol>
          </div>

          <ul className="eval-col" aria-label="평가 항목 2, 4, 6">
            {right.map((c) => (
              <EvalCard key={c.index} {...c} onOpen={openFocus} />
            ))}
          </ul>
        </div>
        )}
        </div>

      </div>
    </section>
  );
}
