"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
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
        {s >= 4 && <ContactChat />}
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

type Phase = "message" | "email" | "sending" | "sent" | "error";
type Line = { who: "user" | "bot"; text: string };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** 하단 입력창: 메시지 → 답장 받을 이메일 → 전송. 결과를 대화로 보여준다 */
function ContactChat() {
  const [phase, setPhase] = useState<Phase>("message");
  const [lines, setLines] = useState<Line[]>([]);
  const [draft, setDraft] = useState("");
  const [message, setMessage] = useState("");
  const [invalid, setInvalid] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const trapRef = useRef<HTMLInputElement>(null);

  const say = (who: Line["who"], text: string) => setLines((l) => [...l, { who, text }]);

  const send = async (email: string) => {
    setPhase("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: contact.formKey,
          subject: "[포트폴리오] 새 메시지가 도착했습니다",
          from_name: "이재희 포트폴리오",
          email,
          replyto: email,
          message,
          botcheck: trapRef.current?.checked ?? false,
        }),
      });
      const data = (await res.json()) as { success?: boolean };
      if (!res.ok || !data.success) throw new Error("send failed");
      say("bot", contact.sent(email));
      setPhase("sent");
    } catch {
      say("bot", contact.failed);
      setPhase("error");
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    if (phase === "message") {
      say("user", text);
      setMessage(text);
      setDraft("");
      setPhase("email");
      setTimeout(() => say("bot", contact.askEmail), 450);
    } else if (phase === "email") {
      if (!EMAIL_RE.test(text)) {
        setInvalid(true);
        return;
      }
      setInvalid(false);
      say("user", text);
      setDraft("");
      void send(text);
    }
    inputRef.current?.focus();
  };

  const reset = () => {
    setLines([]);
    setMessage("");
    setDraft("");
    setPhase("message");
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const locked = phase === "sending" || phase === "sent" || phase === "error";
  const placeholder = phase === "email" ? "답장 받을 이메일 주소" : `${profile.name}에게 메시지 보내기`;

  return (
    <div className="contact-form pop">
      {lines.length > 0 && (
        <div className="contact-log" aria-live="polite">
          {lines.map((l, i) =>
            l.who === "user" ? (
              <p key={i} className="bubble-user pop">
                {l.text}
              </p>
            ) : (
              <p key={i} className={`bubble-bot pop${phase === "error" && i === lines.length - 1 ? " is-error" : ""}`}>
                {l.text}
              </p>
            ),
          )}
          {phase === "sending" && <TypingDots />}
          {phase === "sent" && (
            <button type="button" className="ghost-btn contact-again pop" onClick={reset}>
              새 메시지 쓰기
            </button>
          )}
          {phase === "error" && (
            <div className="contact-again-row pop">
              <a className="pill-soft" href={`mailto:${profile.email}?body=${encodeURIComponent(message)}`}>
                메일로 보내기
              </a>
              <button type="button" className="ghost-btn" onClick={reset}>
                다시 쓰기
              </button>
            </div>
          )}
        </div>
      )}

      {!locked && (
        <form onSubmit={onSubmit} noValidate>
          <div className={`composer composer-raised${invalid ? " is-invalid" : ""}`}>
            <label htmlFor="ask" className="sr-only">
              {placeholder}
            </label>
            <input
              ref={inputRef}
              id="ask"
              name={phase === "email" ? "email" : "message"}
              type={phase === "email" ? "email" : "text"}
              autoComplete={phase === "email" ? "email" : "off"}
              maxLength={phase === "email" ? 120 : 2000}
              value={draft}
              onChange={(e) => {
                setDraft(e.target.value);
                if (invalid) setInvalid(false);
              }}
              placeholder={placeholder}
              aria-invalid={invalid || undefined}
              aria-describedby={invalid ? "ask-error" : undefined}
            />
            <input ref={trapRef} type="checkbox" name="botcheck" className="sr-only" tabIndex={-1} aria-hidden="true" />
            <button type="submit" className="send-btn" aria-label={phase === "email" ? "보내기" : "다음"} disabled={!draft.trim()}>
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 14V4M4.5 8.5L9 4l4.5 4.5" />
              </svg>
            </button>
          </div>
          {invalid && (
            <p id="ask-error" className="contact-error">
              이메일 주소 형식을 확인해 주세요.
            </p>
          )}
        </form>
      )}

      <div className="pill-row pill-row-center">
        <a className="pill-soft" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <a className="pill-soft" href={profile.github} target="_blank" rel="noreferrer">
          GitHub {profile.githubHandle}
        </a>
      </div>
      <p className="fineprint">보낸 메시지는 {profile.name}의 메일로 바로 전달됩니다.</p>
    </div>
  );
}
