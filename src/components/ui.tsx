"use client";

export function Spinner({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg className={`spin ${className}`} aria-hidden="true" width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M8 2a6 6 0 1 0 6 6" />
    </svg>
  );
}

export function Check({ size = 16, color = "currentColor", width = 2 }: { size?: number; color?: string; width?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8.5l3.2 3L13 4.5" />
    </svg>
  );
}

export function ArrowUpRight({ size = 14 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 10l6-6M5 4h5v5" />
    </svg>
  );
}

export function TypingDots() {
  return (
    <div className="typing pop" role="status" aria-label="답변 작성 중">
      <span className="dot" />
      <span className="dot" />
      <span className="dot" />
    </div>
  );
}

type ChipTone = "light" | "dark" | "onAccent";

/** 섹션 머리에 붙는 툴 호출 칩. phase: 0 대기, 1 실행 중, 2 이상 완료 */
export function ToolChip({ call, phase, result, tone = "light" }: { call: string; phase: number; result: string; tone?: ChipTone }) {
  const label = phase === 0 ? "대기" : phase === 1 ? "실행 중" : result;
  return (
    <div className={`chip chip-${tone}`}>
      {phase === 0 && <span className="chip-queued" aria-hidden="true" />}
      {phase === 1 && <Spinner />}
      {phase >= 2 && <Check color={tone === "light" ? "#0F7A5C" : tone === "dark" ? "#6EE7B7" : "#FFE07A"} />}
      <span>{call}</span>
      <span className="chip-badge">{label}</span>
    </div>
  );
}
