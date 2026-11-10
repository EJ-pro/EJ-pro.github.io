"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { featured, profile, type FeaturedProject } from "@/data/portfolio";
import { useCounter, useReducedMotion, useSeenOnce, useToolPhase } from "@/lib/motion";
import { Check, Spinner, ToolChip } from "./ui";

type Status = "queued" | "running" | "done";

/** 대화 한 편: 질문 → 요약 답변 → 툴 호출이 차례로 완료 → 결과. key가 바뀌면 처음부터 다시 재생된다 */
function Run({ project, play, reduced }: { project: FeaturedProject; play: boolean; reduced: boolean }) {
  const total = project.steps.length + 2; // 요약 1 + 단계들 + 결과 1
  const ticked = useCounter(play && !reduced, total, 720, 1, 350);
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
          <a className="agent-link" href={project.href} target="_blank" rel="noreferrer">
            개발 내용 보기
          </a>
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

  return (
    <section id="trace" ref={ref} className="section trace" aria-labelledby="trace-title">
      <div className="wrap trace-head">
        <ToolChip call="trace_runs(featured=true)" phase={phase} result={`${featured.length}건`} tone="dark" />
        <h2 id="trace-title" className="h2 trace-title">대표 프로젝트 실행 과정</h2>
        <p className="trace-lead">대화를 고르면 이재희 AI가 프로젝트를 처음부터 다시 실행해 보여드립니다.</p>
      </div>

      <div className="wrap">
        <div className="agent-window">
          <div className="agent-tabs" role="tablist" aria-label="대표 프로젝트">
            {featured.map((f, i) => (
              <button
                key={f.name}
                type="button"
                role="tab"
                id={`run-tab-${i}`}
                aria-selected={i === active}
                aria-controls="run-panel"
                className="agent-tab"
                onClick={() => setActive(i)}
              >
                <span className="agent-tab-dot" aria-hidden="true" />
                {f.name}
              </button>
            ))}
          </div>
          <div id="run-panel" role="tabpanel" aria-labelledby={`run-tab-${active}`}>
            <Run key={active} project={featured[active]} play={phase >= 2} reduced={reduced} />
          </div>
        </div>
      </div>
    </section>
  );
}
