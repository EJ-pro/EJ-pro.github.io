"use client";

import { useEffect, useRef, useState } from "react";
import { contact, contextWindow, profile } from "@/data/portfolio";
import { REPLAY_EVENT, useCounter, useReducedMotion, useSeenOnce } from "@/lib/motion";
import { TypingDots } from "./ui";

/** 7. 응답: 첫 대화처럼 다시 대화가 재생되고 연락 입력창이 나온다 */
export function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const seen = useSeenOnce(ref, 0.3);
  const [step, setStep] = useState(0);
  const typed = useCounter(step >= 3, contact.reply.length, 32);

  useEffect(() => {
    if (!seen || reduced) return;
    const timers = [setTimeout(() => setStep(1), 300), setTimeout(() => setStep(2), 1000), setTimeout(() => setStep(3), 1900)];
    return () => timers.forEach(clearTimeout);
  }, [seen, reduced]);

  const restart = () => {
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    window.dispatchEvent(new Event(REPLAY_EVENT));
  };

  const chars = reduced ? contact.reply.length : typed;
  const replyDone = chars >= contact.reply.length;
  const s = reduced ? 4 : replyDone && step >= 3 ? 4 : step;

  return (
    <section id="contact" ref={ref} className="section contact" aria-labelledby="contact-title">
      <div className="contact-thread">
        {s >= 1 && <p className="bubble-user pop">{contact.ask}</p>}
        {s === 2 && <TypingDots />}
        {s >= 3 && (
          <div className="answer pop">
            <div className="speaker">
              <span>{profile.name}</span>
            </div>
            <h2 id="contact-title" className="contact-title" aria-label={contact.reply}>
              <span aria-hidden="true">{contact.reply.slice(0, chars)}</span>
              <span className="caret" aria-hidden="true" />
            </h2>
          </div>
        )}
        {s >= 4 && (
          <form className="contact-form pop" action={`mailto:${profile.email}`} method="get">
            <div className="composer composer-raised">
              <label htmlFor="ask" className="sr-only">
                {profile.name}에게 보낼 메시지
              </label>
              <input id="ask" name="body" type="text" placeholder={`${profile.name}에게 메시지 보내기`} />
              <button type="submit" className="send-btn" aria-label="메일로 보내기">
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 14V4M4.5 8.5L9 4l4.5 4.5" />
                </svg>
              </button>
            </div>
            <div className="pill-row pill-row-center">
              <a className="pill-soft" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
              <a className="pill-soft" href={profile.github} target="_blank" rel="noreferrer">
                GitHub {profile.githubHandle}
              </a>
            </div>
            <p className="fineprint">{profile.name}도 실수할 수 있습니다. 중요한 내용은 GitHub에서 확인해 주세요.</p>
          </form>
        )}
      </div>
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-end">
              <h2>대화가 끝났습니다</h2>
              <p>{contextWindow.limit.toLocaleString("en-US")} 토큰을 모두 사용했습니다. 처음부터 다시 보시려면 새 대화를 시작해 주세요.</p>
            </div>
            <div className="footer-actions">
              <button type="button" className="btn-restart" onClick={restart}>
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 8a5.5 5.5 0 1 0 1.7-4" />
                  <path d="M2.5 2.5v3h3" />
                </svg>
                새 대화 시작하기
              </button>
              <a className="footer-link" href={profile.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a className="footer-link" href={`mailto:${profile.email}`}>
                메일
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 {profile.name}</span>
            <span>Next.js로 만들고 GitHub Pages에 배포했습니다</span>
          </div>
        </div>
      </footer>
    </section>
  );
}
