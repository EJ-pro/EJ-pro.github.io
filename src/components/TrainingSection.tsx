"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { awards, checkpoints, type Checkpoint } from "@/data/portfolio";
import { useReducedMotion, useSeenOnce, useToolPhase } from "@/lib/motion";
import { ToolChip } from "./ui";

const PER_YEAR = Array.from(new Set(awards.map((a) => a.year))).map((y) => ({ year: y, count: awards.filter((a) => a.year === y).length }));
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

/** 업데이트 내역: 스크롤하면 가로로 흘러가는 타임라인과 수상 */
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
  // 연도 막대를 누르면 그 연도를 보여주고, 타임라인이 다음 체크포인트로 넘어가면 다시 따라간다
  const [picked, setPicked] = useState<{ year: number; at: number } | null>(null);
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
      const view = track.parentElement;
      setTravel(Math.max(0, track.scrollWidth - (view ? view.clientWidth : window.innerWidth)));
      // 고정 헤더 아래에 붙어 있는 동안만 진행한다
      const header = document.querySelector<HTMLElement>(".site-header")?.offsetHeight ?? 0;
      const rect = pin.getBoundingClientRect();
      const span = pin.offsetHeight - (window.innerHeight - header);
      setProgress(span > 0 ? Math.min(1, Math.max(0, (header - rect.top) / span)) : 0);
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
  const litUntil = Math.min(last, Math.round(shownProgress * last + 0.35)); // 지나간 체크포인트까지 점이 켜진다
  const timelineYear = Number(checkpoints[litUntil].period.slice(0, 4));
  const year = picked && picked.at === litUntil ? picked.year : timelineYear;
  const yearAwards = awards.filter((a) => a.year === year);

  return (
    <section id="training" ref={ref} className="section section-fog training" aria-labelledby="training-title">
      <div
        ref={pinRef}
        className={`ckpt-pin${pinned ? " is-pinned" : ""}`}
        style={pinned ? { height: `calc(100vh + ${travel}px)` } : undefined}
      >
        <div className="ckpt-stage">
          <div className="ckpt-head">
            <ToolChip call='get_changelog(model="이재희")' phase={phase} result={`${checkpoints.length}개`} />
            <h2 id="training-title" className="h2">이재희 AI 업데이트 내역</h2>
            <p className="lead">2019년부터 지금까지 이재희 AI가 업데이트되어 온 과정과, 그 과정에서 받은 상 {awards.length}건입니다.</p>
          </div>
          <aside ref={awardsRef} className="rewards" aria-labelledby="rewards-title">
            <div className="rewards-top">
              <h3 id="rewards-title">
                수상 <span className="mono">{awards.length}</span>건
              </h3>
              {pinned && (
                <span className="mono rewards-counter" aria-hidden="true">
                  {String(litUntil + 1).padStart(2, "0")} / {String(checkpoints.length).padStart(2, "0")}
                </span>
              )}
            </div>
            <div className="reward-bars" role="group" aria-label="연도별 수상">
              {PER_YEAR.map((y, i) => (
                <button
                  key={y.year}
                  type="button"
                  className={`reward-bar${y.year === year ? " is-active" : ""}`}
                  aria-pressed={y.year === year}
                  onClick={() => setPicked({ year: y.year, at: litUntil })}
                >
                  <span className="mono">{y.year}</span>
                  <span className="reward-track" aria-hidden="true">
                    <span style={{ width: barsOn ? `${(y.count / MAX_PER_YEAR) * 100}%` : "0%", transitionDelay: `${i * 120}ms` }} />
                  </span>
                  <span className="reward-count">{y.count}건</span>
                </button>
              ))}
            </div>
            <div className="reward-list" aria-live="polite">
              <p className="reward-list-head">
                <span className="mono">{year}</span>
                {yearAwards.length > 0 ? ` 수상 ${yearAwards.length}건` : ""}
              </p>
              {yearAwards.length > 0 ? (
                <ul key={year}>
                  {yearAwards.map((a, i) => (
                    <li key={a.title} className={`reward-item row-in${a.top ? " is-top" : ""}`} style={{ animationDelay: `${i * 40}ms` }}>
                      <span className="reward-prize">{a.prize}</span>
                      <span className="reward-item-text">
                        <strong>{a.title}</strong>
                        <span>{a.org}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="reward-empty">이 시기에는 수상 기록이 없습니다. 연도를 눌러 다른 해의 수상을 볼 수 있습니다.</p>
              )}
            </div>
          </aside>

          <div className="ckpt-view">
            <ol
              ref={trackRef}
              className="ckpts"
              aria-label="업데이트 내역"
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
      </div>
    </section>
  );
}
