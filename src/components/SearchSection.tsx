"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { profile, projectFilters, projects, screenshots, search } from "@/data/portfolio";
import { useCounter, useReducedMotion, useSeenOnce, useToolPhase } from "@/lib/motion";
import { ArrowUpRight, TokenText, ToolChip } from "./ui";

type FilterId = (typeof projectFilters)[number]["id"];
const pad = (n: number) => String(n).padStart(2, "0");

/** 6. 검색: 질의가 타이핑되고, 결과가 차례로 나온다. 분야 필터로 좁혀 볼 수 있다. */
export function SearchSection() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const seen = useSeenOnce(ref);
  const tool = useToolPhase(seen && !reduced);
  const typed = useCounter(tool >= 2, search.query.length, 55);
  const queryDone = typed >= search.query.length;
  const streamed = useCounter(queryDone, projects.length, 85, 1, 300);
  const [filter, setFilter] = useState<FilterId>("all");

  const phase = reduced ? 3 : tool;
  const chars = reduced ? search.query.length : typed;
  const rows = reduced ? projects.length : streamed;

  const results = projects
    .slice(0, rows)
    .filter((p) => filter === "all" || p.category === filter);

  return (
    <section id="search" ref={ref} className="section section-white" aria-labelledby="search-title">
      <div className="wrap search">
        <ToolChip call='search(index="EJ-pro/projects")' phase={phase} result={`${projects.length}건`} />
        <div className="search-head">
          <TokenText id="search-title" className="h2" text="지금까지 만든 것들을 찾아봤어요" on={phase >= 2} />
          <a className="text-link" href={profile.repositories} target="_blank" rel="noreferrer">
            GitHub 저장소 전체 보기
          </a>
        </div>

        <div className="search-box">
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#586074" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="9" cy="9" r="6" />
            <path d="M13.5 13.5L17 17" />
          </svg>
          <span className="search-query">
            {search.query.slice(0, chars)}
            {chars < search.query.length && <span className="caret" aria-hidden="true" />}
          </span>
        </div>

        {rows > 0 && (
          <div className="shots">
            <h3>화면으로 먼저 보기</h3>
            <div className="shot-grid">
              {screenshots.map((s, i) => (
                <a key={s.name} className="shot" href={s.href} target="_blank" rel="noreferrer">
                  <span className="shot-img">
                    <Image className="denoise" src={s.image} alt={s.alt} width={700} height={525} style={{ objectFit: s.fit, animationDelay: `${i * 180}ms` }} />
                    <span className="grain" aria-hidden="true" style={{ animationDelay: `${i * 180}ms` }} />
                  </span>
                  <span className="shot-caption">
                    <strong>{s.name}</strong>
                    <span>{s.label}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="filters" role="group" aria-label="분야 필터">
          {projectFilters.map((f) => {
            const count = projects.filter((p) => f.id === "all" || p.category === f.id).length;
            return (
              <button key={f.id} type="button" className="filter" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
                {f.label} {count}
              </button>
            );
          })}
        </div>

        <ul className="results">
          {results.map((p, i) => (
            <li key={p.name} className="row-in" style={{ animationDelay: filter === "all" ? "0ms" : `${i * 60}ms` }}>
              <a className="res" href={p.href} target="_blank" rel="noreferrer">
                <span className="mono res-rank">{pad(i + 1)}</span>
                <span className="res-main">
                  <strong>{p.name}</strong>
                  <span>{p.description}</span>
                </span>
                <span className="res-cat">{p.label}</span>
                <span className="res-arrow">
                  <ArrowUpRight size={16} />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
