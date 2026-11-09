"use client";

import { useRef, useState } from "react";
import { awards, checkpoints, type Checkpoint } from "@/data/portfolio";
import { useReducedMotion, useSeenOnce, useToolPhase } from "@/lib/motion";
import { ToolChip } from "./ui";

const YEARS = Array.from(new Set(awards.map((a) => a.year)));
const PER_YEAR = YEARS.map((y) => ({ year: y, count: awards.filter((a) => a.year === y).length }));
const MAX_PER_YEAR = Math.max(...PER_YEAR.map((y) => y.count));

function CheckpointItem({ cp, open, onToggle, index }: { cp: Checkpoint; open: boolean; onToggle: () => void; index: number }) {
  const hasDetail = Boolean(cp.items?.length || cp.note);
  const detailId = `ckpt-detail-${index}`;
  return (
    <li className={`ckpt ckpt-lit${cp.ongoing ? " is-ongoing" : ""}`}>
      <span className="ckpt-period mono">{cp.period}</span>
      <span className="ckpt-dot" aria-hidden="true" />
      <div className="ckpt-card">
        <div className="ckpt-title">
          <h3>{cp.title}</h3>
          {cp.ongoing && <span className="ckpt-live">학습 중</span>}
        </div>
        <p className="ckpt-summary">{cp.summary}</p>
        {cp.subs && (
          <ul className="ckpt-subs">
            {cp.subs.map((s) => (
              <li key={s.title}>
                <strong>{s.title}</strong>
                <span>{s.desc}</span>
              </li>
            ))}
          </ul>
        )}
        {hasDetail && (
          <>
            <button type="button" className="ckpt-toggle" aria-expanded={open} aria-controls={detailId} onClick={onToggle}>
              {open ? "접기" : "자세히 보기"}
              <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 4.5L6 7.5l3-3" />
              </svg>
            </button>
            {open && (
              <div id={detailId} className="ckpt-detail pop">
                {cp.items && (
                  <ul>
                    {cp.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                )}
                {cp.note && <p>{cp.note}</p>}
              </div>
            )}
          </>
        )}
      </div>
    </li>
  );
}

/** 학습 기록: 체크포인트 타임라인과 수상 */
export function TrainingSection() {
  const ref = useRef<HTMLElement>(null);
  const awardsRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const seen = useSeenOnce(ref, 0.05);
  const awardsSeen = useSeenOnce(awardsRef, 0.2);
  const tool = useToolPhase(seen && !reduced);
  const phase = reduced ? 3 : tool;
  const barsOn = reduced || awardsSeen;
  const [open, setOpen] = useState<Set<number>>(() => new Set());

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <section id="training" ref={ref} className="section section-fog" aria-labelledby="training-title">
      <div className="wrap training">
        <div className="training-head">
          <ToolChip call='load_checkpoints(model="이재희")' phase={phase} result={`${checkpoints.length}개`} />
          <h2 id="training-title" className="h2">이재희 AI 학습 기록</h2>
          <p className="lead">2019년 컴퓨터공학 전공부터 지금까지 거쳐 온 학습 단계와, 그 과정에서 받은 상입니다.</p>
        </div>

        <ol className="ckpts" aria-label="학습 체크포인트">
          <span className="ckpt-rail" aria-hidden="true" />
          <span className="ckpt-rail ckpt-rail-fill" aria-hidden="true" />
          {checkpoints.map((cp, i) => (
            <CheckpointItem key={cp.title} cp={cp} index={i} open={open.has(i)} onToggle={() => toggle(i)} />
          ))}
        </ol>

        <div ref={awardsRef} className="rewards" aria-labelledby="rewards-title">
          <div className="rewards-head">
            <div>
              <h3 id="rewards-title">
                수상 <span className="mono">{awards.length}</span>건
              </h3>
              <p>프로젝트 개발, 창업 활동, 캡스톤디자인과 AI 교육과정에서 받은 상입니다.</p>
            </div>
            <dl className="reward-bars">
              {PER_YEAR.map((y, i) => (
                <div key={y.year} className="reward-bar">
                  <dt className="mono">{y.year}</dt>
                  <dd>
                    <span className="reward-track" aria-hidden="true">
                      <span style={{ width: barsOn ? `${(y.count / MAX_PER_YEAR) * 100}%` : "0%", transitionDelay: `${i * 120}ms` }} />
                    </span>
                    <span className="reward-count">{y.count}건</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {YEARS.map((year) => (
            <div key={year} className="reward-year">
              <h4 className="mono">{year}</h4>
              <ul className="reward-grid">
                {awards
                  .filter((a) => a.year === year)
                  .map((a) => (
                    <li key={a.title} className={`reward-card${a.top ? " is-top" : ""}`}>
                      <span className="reward-prize">{a.prize}</span>
                      <strong>{a.title}</strong>
                      <span className="reward-org">{a.org}</span>
                      <span className="reward-note">{a.note}</span>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
