"use client";

import { useRef } from "react";
import { context, profile, type PromptLine } from "@/data/portfolio";
import { useCounter, useReducedMotion, useSeenOnce, useToolPhase } from "@/lib/motion";
import { ToolChip } from "./ui";

const lineText = (l: PromptLine) =>
  l.kind === "blank" ? "" : l.kind === "li" ? `- ${l.text}` : l.kind === "kv" ? l.key + l.text : l.text;
const lineLength = (l: PromptLine) => (l.kind === "blank" ? 1 : lineText(l).length);
const TOTAL = context.prompt.reduce((n, l) => n + lineLength(l), 0);
const FULL_TEXT = context.prompt.map(lineText).join("\n");

type ShownLine = { kind: PromptLine["kind"]; pre: string; key: string; text: string; cursor: boolean };

/** 타이핑된 글자 수만큼 줄마다 보이는 부분을 나눈다. 커서는 지금 쓰는 줄(끝나면 마지막 줄)에 둔다. */
function buildLines(chars: number): ShownLine[] {
  const out: ShownLine[] = [];
  let remain = chars;
  let cursorPlaced = false;
  for (let i = 0; i < context.prompt.length; i++) {
    const l = context.prompt[i];
    const len = lineLength(l);
    const take = Math.max(0, Math.min(remain, len));
    remain -= len;
    const visible = l.kind === "blank" ? "" : lineText(l).slice(0, take);
    const preLen = l.kind === "li" ? 2 : 0;
    const keyLen = l.kind === "kv" ? l.key.length : 0;
    const cursor = !cursorPlaced && (take < len || i === context.prompt.length - 1);
    if (cursor) cursorPlaced = true;
    out.push({
      kind: l.kind,
      pre: visible.slice(0, preLen),
      key: visible.slice(preLen, preLen + keyLen),
      text: visible.slice(preLen + keyLen),
      cursor,
    });
  }
  return out;
}

/** 2. 컨텍스트: 이름과 system_prompt.md가 타이핑되는 편집기 */
export function ContextSection() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const seen = useSeenOnce(ref);
  const tool = useToolPhase(seen && !reduced);
  const typed = useCounter(tool >= 2, TOTAL, 18, 2);

  const phase = reduced ? 3 : tool;
  const chars = reduced ? TOTAL : typed;
  const pct = Math.round((chars / TOTAL) * 100);

  const lines = buildLines(chars);

  return (
    <section id="context" ref={ref} className="section section-white" aria-labelledby="context-title">
      <div className="wrap context-grid">
        <div className="context-intro">
          <ToolChip call='load_context("system_prompt.md")' phase={phase} result="불러옴" />
          <h2 id="context-title" className="name reveal">
            {profile.name}
          </h2>
          <div className="name-bar grow-x" aria-hidden="true" />
          <p className="tagline">{context.tagline}</p>
          <div className="pill-row">
            <a className="pill-link" href={profile.github} target="_blank" rel="noreferrer">
              GitHub {profile.githubHandle}
            </a>
            <a className="pill-link" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <a className="pill-link pill-resume" href={profile.resume} download={profile.resumeName}>
              이력서 PDF 받기
            </a>
          </div>
        </div>

        <div className="editor">
          <div className="window-bar">
            <span /><span /><span />
            <em>system_prompt.md</em>
          </div>
          <div className="editor-body" role="img" aria-label={FULL_TEXT}>
            {lines.map((l, i) => (
              <div key={i} className="editor-line" aria-hidden="true">
                <span className="editor-num">{i + 1}</span>
                <span className="editor-text">
                  <span className="md-pre">{l.pre}</span>
                  <span className="md-key">{l.key}</span>
                  <span className={l.kind === "h" ? "md-head" : undefined}>{l.text}</span>
                  {l.cursor && <span className="caret-y" />}
                </span>
              </div>
            ))}
          </div>
          <div className="editor-foot">
            <span>컨텍스트</span>
            <span className="meter" aria-hidden="true">
              <span style={{ width: `${pct}%` }} />
            </span>
            <span className="mono">{pct}%</span>
          </div>
        </div>
      </div>
    </section>
  );
}
