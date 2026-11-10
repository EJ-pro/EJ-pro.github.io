"use client";

import { useEffect, useState } from "react";
import { contextWindow, profile, stages } from "@/data/portfolio";

type TokenState = "ok" | "low" | "empty";

/** 고정 헤더: 섹션 메뉴, 지금 보고 있는 단계, 스크롤만큼 줄어드는 남은 토큰 */
export function Header() {
  const [stage, setStage] = useState(0);
  const [used, setUsed] = useState(0); // 0~1, 페이지를 얼마나 내려왔는지

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const line = window.innerHeight * 0.45;
      let current = 0;
      stages.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) current = i;
      });
      setStage(current);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setUsed(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const tokenState: TokenState = used >= 0.995 ? "empty" : used >= contextWindow.lowAt ? "low" : "ok";
  const left = tokenState === "empty" ? 0 : Math.round((1 - used) * contextWindow.limit);

  const activeId = stages[stage].id;
  const navItems = stages.filter((s) => s.nav);
  const sideItems = navItems.filter((s) => s.side !== false);

  return (
    <>
    <header className="site-header">
      <div className="site-header-bar">
        <a href="#top" className="brand">
          <strong>{profile.name}</strong>
        </a>
        {/* 좁은 화면에서만 보이는 헤더 메뉴. 넓은 화면에서는 오른쪽 사이드 내비를 쓴다 */}
        <nav className="site-nav" aria-label="섹션 메뉴">
          {navItems.map((s) => (
            <a key={s.id} href={`#${s.id}`} aria-current={s.id === activeId ? "location" : undefined}>
              {s.nav}
            </a>
          ))}
        </nav>
        <div className="header-meta">
          <p className="stage" aria-live="polite">
            <span className="stage-dot pulse" aria-hidden="true" />
            <span className="stage-num">
              {stage + 1}/{stages.length}
            </span>
            <span>{stages[stage].status}</span>
          </p>
          <p className={`tokens is-${tokenState}`} aria-hidden="true">
            <span className="tokens-dot" />
            <span className="tokens-label">{tokenState === "empty" ? "토큰 소진" : "남은 토큰"}</span>
            <span className="tokens-num">{left.toLocaleString("en-US")}</span>
            <span className="tokens-max">/ {contextWindow.limitLabel}</span>
          </p>
        </div>
      </div>
      <div className="progress-track" aria-hidden="true">
        <div className={`progress is-${tokenState}`} style={{ transform: `scaleX(${used})` }} />
      </div>
    </header>

    {/* 화면 오른쪽에 따라다니는 사이드 내비: 지금 섹션은 막대로, 올리면 이름이 펼쳐진다 */}
    <nav className="side-nav" aria-label="섹션 바로가기">
      <ol>
        {sideItems.map((s) => {
          const on = s.id === activeId;
          return (
            <li key={s.id}>
              <a href={`#${s.id}`} className={on ? "is-active" : undefined} aria-current={on ? "location" : undefined}>
                <span className="side-nav-label">{s.nav}</span>
                <span className="side-nav-mark" aria-hidden="true" />
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
    </>
  );
}
