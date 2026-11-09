"use client";

import Image from "next/image";
import { useRef } from "react";
import { featured } from "@/data/portfolio";
import { useReducedMotion, useSeenOnce, useToolPhase } from "@/lib/motion";
import { ToolChip } from "./ui";

const pad = (n: number) => String(n).padStart(2, "0");

/** 3. 추론 과정: 스크린샷은 고정, 스크롤하면 실행 단계가 차례로 켜진다 */
export function TraceSection() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const seen = useSeenOnce(ref, 0.05);
  const tool = useToolPhase(seen && !reduced);
  const phase = reduced ? 3 : tool;

  return (
    <section id="trace" ref={ref} className="section trace" aria-labelledby="trace-title">
      <div className="wrap trace-head">
        <ToolChip call="trace_runs(featured=true)" phase={phase} result={`${featured.length}건`} tone="dark" />
        <h2 id="trace-title" className="h2 trace-title">대표 프로젝트를 실행 순서대로 따라가 보세요</h2>
      </div>

      {featured.map((f, i) => (
        <article key={f.name} className="wrap run" aria-label={f.name}>
          <div className="run-media">
            <div className="run-name">
              <span className="mono">{pad(i + 1)}</span>
              <h3>{f.name}</h3>
            </div>
            <div className="shot-frame">
              <div className="window-bar window-bar-sm">
                <span /><span /><span />
              </div>
              <div className="shot-view">
                <Image src={f.image} alt={f.alt} width={1400} height={875} style={{ objectFit: f.fit }} />
                <span className="scan" aria-hidden="true" />
              </div>
            </div>
            <p className="run-meta">{f.meta}</p>
            <p className="run-stack mono">{f.stack}</p>
          </div>

          <div className="run-body">
            <p className="run-summary">{f.summary}</p>
            <ol className="steps" aria-label={`${f.name} 실행 단계`}>
              <span className="rail" aria-hidden="true" />
              <span className="rail rail-fill" aria-hidden="true" />
              {f.steps.map((s, j) => (
                <li key={s.title} className="step step-lit">
                  <span className="step-num num">{pad(j + 1)}</span>
                  <span className="step-text">
                    <strong>{s.title}</strong>
                    <span>{s.detail}</span>
                  </span>
                </li>
              ))}
            </ol>
            <a className="btn-amber" href={f.href} target="_blank" rel="noreferrer">
              개발 내용 보기
            </a>
          </div>
        </article>
      ))}
    </section>
  );
}
