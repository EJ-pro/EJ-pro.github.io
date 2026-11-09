import { ContactSection } from "@/components/ContactSection";
import { ContextSection } from "@/components/ContextSection";
import { EvalSection } from "@/components/EvalSection";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { SearchSection } from "@/components/SearchSection";
import { ToolsSection } from "@/components/ToolsSection";
import { TrainingSection } from "@/components/TrainingSection";
import { TraceSection } from "@/components/TraceSection";

/*
 * 페이지 전체가 AI 하나가 질문을 받고 답을 완성해 가는 과정이다.
 * 대화 시작 → 컨텍스트 → 학습 기록 → 추론 과정 → 평가 → 도구 → 검색 → 응답
 */
export default function Home() {
  return (
    <div id="top" className="page">
      <Header />
      <main>
        <Hero />
        <ContextSection />
        <TrainingSection />
        <TraceSection />
        <EvalSection />
        <ToolsSection />
        <SearchSection />
        <ContactSection />
      </main>
    </div>
  );
}
