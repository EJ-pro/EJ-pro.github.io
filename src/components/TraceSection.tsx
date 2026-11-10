"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { featured, profile, type FeaturedProject } from "@/data/portfolio";
import { useCounter, useReducedMotion, useSeenOnce, useToolPhase } from "@/lib/motion";
import { Check, Spinner, ToolChip } from "./ui";

type Status = "queued" | "running" | "done";

const TICK = 720;
const LEAD = 350;
/** 대화 한 편이 끝까지 재생되는 시간(ms) */
const runMs = (p: FeaturedProject) => LEAD + (p.steps.length + 2) * TICK;
const pad = (n: number) => String(n).padStart(2, "0");

/** 대화 한 편: 질문 → 요약 답변 → 툴 호출이 차례로 완료 → 결과. key가 바뀌면 처음부터 다시 재생된다 */
function Run({ project, play, reduced, onNext }: { project: FeaturedProject; play: boolean; reduced: boolean; onNext?: () => void }) {
  const total = project.steps.length + 2; // 요약 1 + 단계들 + 결과 1
  const ticked = useCounter(play && !reduced, total, TICK, 1, LEAD);
  const t = reduced ? total : ticked;
  const statusOf = (i: number): Status => (t > i + 1 ? "done" : t === i + 1 ? "running" : "queued");
  const doneCount = project.steps.filter((_, i) => statusOf(i) === "done").length;
  const finished = t >= total;

  return (
    <div className="agent-body">
      <div className="agent-chat">
        <p className="bubble-user pop">{project.ask}</p>

        <div className="answer">
          <div className="speaker">
            <span>{profile.name}</span>
          </div>
          {t >= 1 ? (
            <p className="agent-summary pop">{project.summary}</p>
          ) : (
            <div className="typing pop" role="status" aria-label="답변 작성 중">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </div>
          )}
        </div>

        <ol className="agent-tools" aria-label={`${project.name} 실행 단계`}>
          {project.steps.map((s, i) => {
            const st = statusOf(i);
            return (
              <li key={s.tool} className={`agent-tool is-${st}`}>
                <span className="agent-tool-icon" aria-hidden="true">
                  {st === "running" && <Spinner size={14} />}
                  {st === "done" && <Check size={14} width={2.4} />}
                </span>
                <span className="agent-tool-body">
                  <span className="agent-tool-head">
                    <code>{s.tool}()</code>
                    <strong>{s.title}</strong>
                  </span>
                  <span className="agent-tool-detail">{s.detail}</span>
                </span>
              </li>
            );
          })}
        </ol>

        <div className={`agent-result${finished ? " is-done" : ""}`} aria-live="polite">
          <span className="mono">
            {doneCount}/{project.steps.length} 단계 {finished ? "완료" : "실행 중"}
          </span>
          <span className="agent-actions">
            {finished && onNext && (
              <button type="button" className="agent-next pop" onClick={onNext}>
                다음 대화
              </button>
            )}
            <a className="agent-link" href={project.href} target="_blank" rel="noreferrer">
              개발 내용 보기
            </a>
          </span>
        </div>
      </div>

      <div className="agent-artifact">
        <div className="artifact-bar">
          <span className="mono">{project.slug}.png</span>
          <span className="artifact-tag">결과물</span>
        </div>
        <div className="artifact-shot">
          <Image className="denoise" src={project.image} alt={project.alt} width={1400} height={875} style={{ objectFit: project.fit }} />
          <span className="grain" aria-hidden="true" />
        </div>
        <dl className="artifact-meta">
          <div>
            <dt>기간과 역할</dt>
            <dd>{project.meta}</dd>
          </div>
          <div>
            <dt>기술 스택</dt>
            <dd className="artifact-stack">
              {project.stack.split(" / ").map((t) => (
                <span key={t}>{t}</span>
              ))}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

/** 3. 대표 프로젝트: AI 채팅 앱처럼, 탭(대화)마다 프로젝트를 실행해 보여준다 */
export function TraceSection() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const seen = useSeenOnce(ref, 0.2);
  const tool = useToolPhase(seen && !reduced);
  const phase = reduced ? 3 : tool;
  const [active, setActive] = useState(0);
  const [visited, setVisited] = useState<Set<number>>(() => new Set([0]));
  // 처음엔 대화가 끝나면 다음 대화로 자동으로 넘어가고, 방문자가 직접 고르면 멈춘다
  const [auto, setAuto] = useState(true);
  const last = featured.length - 1;
  const tabsRef = useRef<HTMLDivElement>(null);

  // 폰처럼 카드 줄이 옆으로 넘어갈 때 지금 대화 카드가 보이도록 옮긴다
  useEffect(() => {
    const row = tabsRef.current;
    const tab = row?.children[active] as HTMLElement | undefined;
    if (row && tab && row.scrollWidth > row.clientWidth) {
      row.scrollTo({ left: tab.offsetLeft - 10, behavior: reduced ? "auto" : "smooth" });
    }
  }, [active, reduced]);

  const go = (i: number, byUser: boolean) => {
    if (byUser) setAuto(false);
    setActive(i);
    setVisited((v) => new Set(v).add(i));
  };

  useEffect(() => {
    if (!auto || reduced || phase < 2 || active >= last) return;
    const id = setTimeout(() => go(active + 1, false), runMs(featured[active]) + 2600);
    return () => clearTimeout(id);
  }, [auto, reduced, phase, active, last]);

  return (
    <section id="trace" ref={ref} className="section trace" aria-labelledby="trace-title">
      <div className="wrap trace-head">
        <ToolChip call="trace_runs(featured=true)" phase={phase} result={`${featured.length}건`} tone="dark" />
        <h2 id="trace-title" className="h2 trace-title">대표 프로젝트 실행 과정</h2>
        <p className="trace-lead">대화 {featured.length}개를 차례로 실행합니다. 원하는 대화를 눌러 바로 볼 수도 있습니다.</p>
      </div>

      <div className="wrap">
        <div className="agent-window">
          <div ref={tabsRef} className="agent-tabs" role="tablist" aria-label="대표 프로젝트">
            {featured.map((f, i) => {
              const isActive = i === active;
              const bar = isActive
                ? reduced
                  ? "is-full"
                  : "is-running"
                : visited.has(i)
                  ? "is-full"
                  : "";
              return (
                <button
                  key={f.name}
                  type="button"
                  role="tab"
                  id={`run-tab-${i}`}
                  aria-selected={isActive}
                  aria-controls="run-panel"
                  className="agent-tab"
                  onClick={() => go(i, true)}
                >
                  <span className="agent-tab-index mono">대화 {pad(i + 1)}</span>
                  <strong>{f.name}</strong>
                  <span className="agent-tab-tagline">{f.tagline}</span>
                  <span className="agent-tab-bar" aria-hidden="true">
                    <span
                      key={isActive ? `run-${active}` : "idle"}
                      className={bar}
                      style={{ "--run": `${runMs(f)}ms`, animationPlayState: phase >= 2 ? "running" : "paused" } as CSSProperties}
                    />
                  </span>
                </button>
              );
            })}
          </div>
          <div id="run-panel" role="tabpanel" aria-labelledby={`run-tab-${active}`}>
            <Run key={active} project={featured[active]} play={phase >= 2} reduced={reduced} onNext={active < last ? () => go(active + 1, true) : undefined} />
          </div>
        </div>
      </div>
    </section>
  );
}
