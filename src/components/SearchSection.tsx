"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useRef, useState, type ReactNode } from "react";
import { profile, projectFilters, projects, search, type Project, type ProjectCategory } from "@/data/portfolio";
import { useCounter, useReducedMotion, useSeenOnce, useToolPhase } from "@/lib/motion";
import { ArrowUpRight, ToolChip } from "./ui";

type FilterId = (typeof projectFilters)[number]["id"];
const pad = (n: number) => String(n).padStart(2, "0");

const GROUPS: { id: ProjectCategory; label: string }[] = [
  { id: "ai", label: "AI 서비스와 데이터 프로젝트" },
  { id: "android", label: "Android 앱" },
  { id: "etc", label: "웹과 AR 프로젝트" },
];
/** 답변 문장에 붙는 출처 번호(1부터, 전체 목록 순서) */
/** 사진 자리 글자: 한글 이름은 첫 글자, 영문은 두 단어 머리글자(한 단어면 앞 두 글자) */
function initials(name: string) {
  if (/^[가-힣]/.test(name)) return name[0];
  const words = name.split(/[^A-Za-z0-9]+/).filter(Boolean);
  return words.length >= 2 ? (words[0][0] + words[1][0]).toUpperCase() : name.slice(0, 2);
}
const citesOf = (cat: ProjectCategory) => projects.map((p, i) => ({ p, n: i + 1 })).filter((x) => x.p.category === cat).map((x) => x.n);

function Thumb({ project, index }: { project: Project; index: number }) {
  if (project.image) {
    return (
      <span className="src-thumb">
        <Image className="denoise" src={project.image} alt="" width={700} height={438} style={{ objectFit: project.fit ?? "cover", animationDelay: `${index * 70}ms` }} />
        <span className="grain" aria-hidden="true" style={{ animationDelay: `${index * 70}ms` }} />
      </span>
    );
  }
  // 사진이 오기 전까지 분야 색과 이름 글자로 자리를 채운다
  return (
    <span className={`src-thumb src-ph is-${project.category}`} aria-hidden="true">
      <span>{initials(project.name)}</span>
    </span>
  );
}

/** 6. 전체 프로젝트: 질문에 출처를 단 AI 답변처럼 보여준다 */
export function SearchSection() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const seen = useSeenOnce(ref);
  const tool = useToolPhase(seen && !reduced);
  const typed = useCounter(tool >= 2, search.query.length, 55);
  const queryDone = typed >= search.query.length;
  const streamed = useCounter(queryDone, projects.length, 80, 1, 500);
  const [filter, setFilter] = useState<FilterId>("all");
  const [flash, setFlash] = useState<{ n: number; key: number } | null>(null);

  const phase = reduced ? 3 : tool;
  const chars = reduced ? search.query.length : typed;
  const rows = reduced ? projects.length : streamed;
  const answered = reduced || queryDone;

  const cards = projects
    .map((p, i) => ({ p, n: i + 1 }))
    .slice(0, rows)
    .filter((x) => filter === "all" || x.p.category === filter);

  const cite = (n: number) => {
    const cat = projects[n - 1].category;
    if (filter !== "all" && filter !== cat) setFilter("all");
    setFlash((f) => ({ n, key: (f?.key ?? 0) + 1 }));
    requestAnimationFrame(() =>
      document.getElementById(`src-${n}`)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" }),
    );
  };

  return (
    <section id="search" ref={ref} className="section section-white" aria-labelledby="search-title">
      <div className="wrap search">
        <ToolChip call='search(index="EJ-pro/projects")' phase={phase} result={`${projects.length}건`} />
        <div className="search-head">
          <h2 id="search-title" className="h2">지금까지 만든 프로젝트</h2>
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

        {answered && (
          <div className="answer search-answer pop">
            <div className="speaker">
              <span>{profile.name}</span>
            </div>
            <p>
              총 {projects.length}개의 프로젝트를 찾았습니다.{" "}
              {GROUPS.map((g, gi) => {
                const ns = citesOf(g.id);
                return (
                  <Fragment key={g.id}>
                    {g.label} {ns.length}개
                    {ns.map((n) => (
                      <button key={n} type="button" className="cite" onClick={() => cite(n)} aria-label={`출처 ${n}: ${projects[n - 1].name}`}>
                        {n}
                      </button>
                    ))}
                    {gi === 0 ? "로 가장 많고, " : gi === GROUPS.length - 1 ? "입니다." : ", "}
                  </Fragment>
                );
              })}
            </p>
          </div>
        )}

        <div className="src-bar">
          <p className="src-title">출처{rows > 0 ? ` ${cards.length}` : ""}</p>
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
        </div>

        <ul className="src-grid">
          {cards.map(({ p, n }, i) => (
            <li
              key={`${p.name}-${n === flash?.n ? flash.key : 0}`}
              id={`src-${n}`}
              className={`src-card row-in${n === flash?.n ? " is-flash" : ""}`}
              style={{ animationDelay: filter === "all" ? "0ms" : `${i * 50}ms` }}
            >
              <CardLink project={p}>
                <Thumb project={p} index={i} />
                <span className="src-body">
                  <span className="src-meta">
                    <span className="src-num mono">{pad(n)}</span>
                    <span>{p.label}</span>
                  </span>
                  <strong>{p.name}</strong>
                  <span className="src-desc">{p.description}</span>
                  <span className="src-go">
                    {p.detail ? "상세 보기" : "GitHub에서 보기"}
                    {p.detail ? <span aria-hidden="true">→</span> : <ArrowUpRight size={13} />}
                  </span>
                </span>
              </CardLink>
              {p.live && (
                <a className="src-live" href={p.live} target="_blank" rel="noreferrer">
                  <span className="src-live-dot" aria-hidden="true" />
                  사이트 열기
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** 상세 페이지가 있으면 사이트 안으로, 없으면 GitHub로 */
function CardLink({ project, children }: { project: Project; children: ReactNode }) {
  if (project.detail)
    return (
      <Link className="src-main" href={`/projects/${project.detail}/`}>
        {children}
      </Link>
    );
  return (
    <a className="src-main" href={project.href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}
