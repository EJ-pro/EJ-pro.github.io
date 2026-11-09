"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { awards, checkpoints, type Checkpoint } from "@/data/portfolio";
import { useReducedMotion, useSeenOnce, useToolPhase } from "@/lib/motion";
import { ToolChip } from "./ui";

const YEARS = Array.from(new Set(awards.map((a) => a.year)));
const PER_YEAR = YEARS.map((y) => ({ year: y, count: awards.filter((a) => a.year === y).length }));
const MAX_PER_YEAR = Math.max(...PER_YEAR.map((y) => y.count));

function CheckpointItem({ cp, open, onToggle, index, lit }: { cp: Checkpoint; open: boolean; onToggle: () => void; index: number; lit: boolean }) {
  const hasDetail = Boolean(cp.items?.length || cp.note);
  const detailId = `ckpt-detail-${index}`;
  return (
    <li className={`ckpt${lit ? " is-lit" : ""}${cp.ongoing ? " is-ongoing" : ""}`}>
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

const NARROW_QUERY = "(max-width: 760px)";
function subscribeNarrow(onChange: () => void) {
  const media = window.matchMedia(NARROW_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

/** 학습 기록: 스크롤하면 가로로 흘러가는 체크포인트 타임라인과 수상 */
export function TrainingSection() {
  const ref = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const awardsRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const narrow = useSyncExternalStore(subscribeNarrow, () => window.matchMedia(NARROW_QUERY).matches, () => false);
  const seen = useSeenOnce(ref, 0.05);
  const awardsSeen = useSeenOnce(awardsRef, 0.2);
  const tool = useToolPhase(seen && !reduced);
  const phase = reduced ? 3 : tool;
  const barsOn = reduced || awardsSeen;
  const [open, setOpen] = useState<Set<number>>(() => new Set());
  const [travel, setTravel] = useState(0); // 카드 줄이 옆으로 움직일 거리(px)
  const [progress, setProgress] = useState(0); // 0~1
  // 폰이나 움직임 줄이기에서는 고정하지 않고 손으로 넘기는 슬라이드로 둔다
  const pinned = !narrow && !reduced;

  useEffect(() => {
    if (!pinned) return;
    const track = trackRef.current;
    const pin = pinRef.current;
    if (!track || !pin) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      setTravel(Math.max(0, track.scrollWidth - window.innerWidth));
      const rect = pin.getBoundingClientRect();
      const span = pin.offsetHeight - window.innerHeight;
      setProgress(span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 0);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    const ro = new ResizeObserver(schedule);
    ro.observe(track);
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pinned]);

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const last = checkpoints.length - 1;
  const shownProgress = pinned ? progress : 1;
  const litUntil = Math.round(shownProgress * last + 0.35); // 지나간 체크포인트까지 점이 켜진다

  return (
    <section id="training" ref={ref} className="section section-fog training" aria-labelledby="training-title">
      <div className="wrap training-head">
        <ToolChip call='load_checkpoints(model="이재희")' phase={phase} result={`${checkpoints.length}개`} />
        <h2 id="training-title" className="h2">이재희 AI 학습 기록</h2>
        <p className="lead">2019년 컴퓨터공학 전공부터 지금까지 거쳐 온 학습 단계와, 그 과정에서 받은 상입니다.</p>
      </div>

      <div
        ref={pinRef}
        className={`ckpt-pin${pinned ? " is-pinned" : ""}`}
        style={pinned ? { height: `calc(100vh + ${travel}px)` } : undefined}
      >
        <div className="ckpt-stage">
          <div className="ckpt-meter wrap" aria-hidden="true">
            <span>이재희 AI 학습 기록</span>
            <span className="mono">
              {String(Math.min(litUntil, last) + 1).padStart(2, "0")} / {String(checkpoints.length).padStart(2, "0")}
            </span>
          </div>
          <ol
            ref={trackRef}
            className="ckpts"
            aria-label="학습 체크포인트"
            style={pinned ? { transform: `translate3d(${-shownProgress * travel}px, 0, 0)` } : undefined}
          >
            <span className="ckpt-rail" aria-hidden="true" />
            <span className="ckpt-rail ckpt-rail-fill" aria-hidden="true" style={{ transform: `scaleX(${shownProgress})` }} />
            {checkpoints.map((cp, i) => (
              <CheckpointItem key={cp.title} cp={cp} index={i} lit={i <= litUntil} open={open.has(i)} onToggle={() => toggle(i)} />
            ))}
          </ol>
        </div>
      </div>

      <div className="wrap">
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
