"use client";

import Link from "next/link";
import { useRef, useState, type CSSProperties } from "react";
import { evals, type EvalCase } from "@/data/portfolio";
import { useCounter, useReducedMotion, useSeenOnce, useToolPhase } from "@/lib/motion";
import { Check, Spinner, ToolChip } from "./ui";

type Status = "queued" | "running" | "done";
const pad = (n: number) => String(n).padStart(2, "0");
const VERDICT: Record<Status, string> = { queued: "대기", running: "평가 중", done: "통과" };

function EvalCard({ item, index, status }: { item: EvalCase; index: number; status: Status }) {
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
    </li>
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
  const [open, setOpen] = useState(false);

  return (
    <section id="evals" ref={ref} className="section section-fog" aria-labelledby="evals-title">
      <div className="wrap evals">
        <div className="evals-head">
          <ToolChip call='run_evals(suite="experience")' phase={phase} result={`${evals.length}건`} />
          <h2 id="evals-title" className="h2">이재희 AI 실력 검증</h2>
          <p className="lead">실제 프로젝트에서 반복해서 맡아온 여섯 가지 일로 평가합니다.</p>
        </div>

        <div className="evals-board">
          <ul className="eval-col" aria-label="평가 항목 1, 3, 5">
            {left.map((c) => (
              <EvalCard key={c.index} {...c} />
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
              <EvalCard key={c.index} {...c} />
            ))}
          </ul>
        </div>

        <div className="eval-more-wrap">
          <button
            type="button"
            className={`eval-more-btn${open ? " is-open" : ""}`}
            aria-expanded={open}
            aria-controls="eval-report"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="mono eval-more-cmd">{open ? "$ close_report" : "$ open_report --verbose"}</span>
            {open ? "평가 근거 접기" : "평가 근거 자세히 보기"}
            <svg className="eval-more-chev" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div id="eval-report" className={`eval-more${open ? " is-open" : ""}`} inert={!open}>
            <div className="eval-more-inner">
              <div className="eval-report">
                <div className="window-bar">
                  <span /><span /><span />
                  <em>eval_report.md · {evals.length}건 모두 통과</em>
                </div>
                <ol className="eval-rows">
                  {evals.map((e, i) => (
                    <li key={e.title} className="eval-row" style={{ "--i": i } as CSSProperties}>
                      <div className="eval-row-head">
                        <span className="eval-row-num mono">
                          <Check size={12} width={2.6} />
                          평가 {pad(i + 1)}
                        </span>
                        <strong>{e.title}</strong>
                        <span className="eval-row-src">
                          근거 · {e.evidence.slug ? <Link href={`/projects/${e.evidence.slug}/`}>{e.evidence.project} 보고서 →</Link> : e.evidence.project}
                        </span>
                      </div>
                      <ul className="eval-row-points">
                        {e.evidence.points.map((pt) => (
                          <li key={pt}>{pt}</li>
                        ))}
                      </ul>
                      <div className="eval-row-metric">
                        <span className="mono">{e.evidence.metric.label}</span>
                        <strong>{e.evidence.metric.value}</strong>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
