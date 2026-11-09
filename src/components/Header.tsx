"use client";

import { useEffect, useState } from "react";
import { profile, stages } from "@/data/portfolio";
import { Avatar } from "./ui";

/** 고정 헤더: 섹션 메뉴, 지금 보고 있는 단계, 스크롤 진행 막대 */
export function Header() {
  const [stage, setStage] = useState(0);

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

  return (
    <header className="site-header">
      <div className="site-header-bar">
        <a href="#top" className="brand">
          <Avatar size={30} />
          <strong>{profile.name}</strong>
        </a>
        <nav className="site-nav" aria-label="섹션 메뉴">
          {stages
            .filter((s) => s.nav)
            .map((s) => (
              <a key={s.id} href={`#${s.id}`}>
                {s.nav}
              </a>
            ))}
        </nav>
        <p className="stage" aria-live="polite">
          <span className="stage-dot pulse" aria-hidden="true" />
          <span className="stage-num">
            {stage + 1}/{stages.length}
          </span>
          <span>{stages[stage].status}</span>
        </p>
      </div>
      <div className="progress-track" aria-hidden="true">
        <div className="progress" />
      </div>
    </header>
  );
}
