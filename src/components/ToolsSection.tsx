"use client";

import { useRef } from "react";
import { toolkits } from "@/data/portfolio";
import { useCounter, useReducedMotion, useSeenOnce, useToolPhase } from "@/lib/motion";
import { ToolChip } from "./ui";

const TOTAL = toolkits.reduce((n, k) => n + k.tools.length, 0);

/** 5. Tool: 이재희 AI에 연결된 Tool 카드가 한 줄씩 "연결됨"으로 바뀐다 */
export function ToolsSection() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const seen = useSeenOnce(ref);
  const tool = useToolPhase(seen && !reduced);
  const connected = useCounter(tool >= 2, TOTAL, 110);

  const phase = reduced ? 3 : tool;
  const on = reduced ? TOTAL : connected;
  const kits = toolkits.length;

  return (
    <section id="tools" ref={ref} className="section tools" aria-labelledby="tools-title">
      <div className="wrap">
        <div className="tools-head">
          <div className="tools-head-text">
            <ToolChip call='list_tools(agent="이재희")' phase={phase} result={`${TOTAL}개`} tone="onAccent" />
            <h2 id="tools-title" className="h2">이재희 AI에 연결된 Tool</h2>
          </div>
          <p className="tools-count" aria-live="polite">
            <span className="mono">
              {on}/{TOTAL}
            </span>
            <span>연결됨</span>
          </p>
        </div>

        <div className="toolkits">
          {toolkits.map((kit, ki) => (
            <div key={kit.label} className="toolkit">
              <h3>{kit.label}</h3>
              <ul>
                {kit.tools.map((t, ti) => {
                  // 각 열의 첫 줄부터 가로로 한 줄씩 켜진다
                  const isOn = ti * kits + ki < on;
                  return (
                    <li key={t.name} className={`tool-card${isOn ? " is-on" : ""}`}>
                      <span className="tool-card-top">
                        <strong>{t.name}</strong>
                        <span className="tool-dot" aria-hidden="true" />
                      </span>
                      <span className="tool-use">{t.use}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
