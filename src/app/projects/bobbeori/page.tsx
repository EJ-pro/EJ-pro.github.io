import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "밥벌이 · Multi-Agent 식생활 서비스",
  description: "밥벌이 프로젝트의 Multi-Agent 실행 구조, 평가, 보호장치, 배포 과정을 정리한 케이스 스터디입니다.",
};

const decisions = [
  {
    title: "Single Agent + 많은 Tool",
    good: "빠른 초기 구현과 단순한 구조",
    limit: "Tool 증가에 따른 선택 오류와 복합 요청의 Task 누락",
  },
  {
    title: "기능별 Agent 분리",
    good: "Inventory, Recipe, Shopping, Calendar의 명확한 책임 범위",
    limit: "Agent 간 실행 순서와 작업 의존성을 판단할 주체 필요",
  },
  {
    title: "Supervisor + Domain Agent",
    good: "작업 분해와 병렬·순차·확인 후 실행의 개별 제어",
    limit: "Agent 상태와 결과 전달 규칙의 추가 설계",
  },
];

export default function BobbeoriPage() {
  return (
    <main className="case-page">
      <header className="case-nav case-width">
        <Link href="/">← 이재희 포트폴리오</Link>
        <a href="https://github.com/SKNETWORKS-FAMILY-AICAMP/SKN27-FINAL-1Team" target="_blank" rel="noreferrer">GitHub ↗</a>
      </header>

      <section className="case-hero case-width">
        <p className="case-kicker">AI Agent · RAG · MCP · 2026</p>
        <h1>밥벌이</h1>
        <p className="case-subtitle">하나의 대화에 섞인 조회·추천·데이터 변경을<br />실행 정책별로 분리한 Multi-Agent 식생활 서비스</p>
        <div className="case-info">
          <div><span>기간</span><strong>2026.06 – 2026.08</strong></div>
          <div><span>팀</span><strong>5인 팀 · 팀장</strong></div>
          <div><span>주요 기여</span><strong>Agent Architecture · Evaluation · Deployment</strong></div>
        </div>
      </section>

      <div className="case-cover case-width">
        <Image src="/images/projects/bobbeori-agents.png" alt="밥벌이 Multi-Agent 시스템 구조" fill priority sizes="(max-width: 900px) 100vw, 1100px" />
      </div>

      <section className="case-section case-width">
        <aside><span>01</span><h2>프로젝트에서<br />맡은 역할</h2></aside>
        <div className="case-content">
          <p className="case-lead">팀장으로서 기능 분담을 넘어 데이터 구조, Agent 실행 흐름, 배포 방식까지 팀원들과 공동 검토</p>
          <p>Supervisor와 Domain Agent의 역할, 읽기·쓰기 실행 정책, Agent 평가와 Trace 분석, AWS CDK 기반 인프라와 CI/CD 구성을 중심으로 담당했습니다.</p>
          <div className="responsibility-grid">
            <div><strong>Agent</strong><span>Supervisor 실행 흐름·Domain 책임 분리</span></div>
            <div><strong>Evaluation</strong><span>228개 동일 문항·Langfuse Trace 분석</span></div>
            <div><strong>Safety</strong><span>Write 확인·멱등성·소유권 조건</span></div>
            <div><strong>Infra</strong><span>AWS CDK·ECS Fargate·CI/CD·Smoke Test</span></div>
          </div>
        </div>
      </section>

      <section className="case-section tinted">
        <div className="case-width case-section-inner">
          <aside><span>02</span><h2>Single Agent 대신<br />Multi-Agent를 선택한 이유</h2></aside>
          <div className="case-content">
            <p className="case-lead">한 문장 안에 함께 존재하는 조회·추천·데이터 변경과 서로 다른 실행 정책</p>
            <blockquote>“냉장고 재료로 저녁 메뉴를 추천하고, 부족한 재료는 장보기에 추가한 뒤 일정도 등록해줘.”</blockquote>
            <p>이 요청은 냉장고 조회, 레시피 추천, 부족 재료 계산, 장보기 데이터 변경, 일정 등록이 순서대로 이어져야 합니다. Single Agent에 Tool을 계속 추가하면 구현은 빠르지만 Tool 선택 오류와 Task 누락, 읽기·쓰기 정책의 혼재가 발생했습니다.</p>
            <div className="decision-list">
              {decisions.map((item) => <article key={item.title}><h3>{item.title}</h3><p><span>장점</span>{item.good}</p><p><span>한계</span>{item.limit}</p></article>)}
            </div>
            <p className="decision-line">Agent를 나눈 것이 아니라, <strong>서로 다른 실행 정책이 필요한 업무를 나누었습니다.</strong></p>
          </div>
        </div>
      </section>

      <section className="case-section case-width">
        <aside><span>03</span><h2>의존 관계에 따른<br />실행 흐름 제어</h2></aside>
        <div className="case-content">
          <div className="flow-list">
            <div><span>01</span><strong>Supervisor가 요청을 Task로 분해</strong><p>사용자 요청에서 필요한 Domain과 작업 분리</p></div>
            <div><span>02</span><strong>독립 조회는 병렬 실행</strong><p>상호 결과 의존성이 없는 작업의 동시 실행</p></div>
            <div><span>03</span><strong>의존 작업은 순차 실행</strong><p>이전 결과가 필요한 작업의 의존성 반영</p></div>
            <div><span>04</span><strong>Write는 사용자 확인 후 실행</strong><p>재료 삭제·일정 등록 등 Side Effect 작업의 즉시 실행 차단</p></div>
          </div>
        </div>
      </section>

      <section className="case-section dark">
        <div className="case-width case-section-inner">
          <aside><span>04</span><h2>최종 답변만으로<br />찾기 어려운 오류</h2></aside>
          <div className="case-content">
            <p className="case-lead">“일정 등록 실패”라는 동일한 결과 뒤에 존재하는 서로 다른 원인</p>
            <ul className="failure-list"><li>Supervisor가 Calendar Task를 만들지 않은 경우</li><li>Calendar 요청이 Inventory Agent로 전달된 경우</li><li>Tool Argument 변환이나 날짜 해석에 실패한 경우</li><li>복합 요청 중 일부 Task가 누락된 경우</li></ul>
            <div className="trace-flow"><span>User Query</span><i>→</i><span>Intent</span><i>→</i><span>Agent</span><i>→</i><span>Tool</span><i>→</i><span>Arguments</span><i>→</i><span>Result</span></div>
            <p>Langfuse Trace로 전체 흐름을 연결해 실패 단계를 특정하고, 동일한 평가 문항으로 재검증했습니다.</p>
            <div className="score-change"><div><span>개선 전</span><strong>73.9</strong></div><i>→</i><div><span>개선 후</span><strong>86.0</strong></div><p>228개 동일 평가 문항</p></div>
          </div>
        </div>
      </section>

      <section className="case-section case-width">
        <aside><span>05</span><h2>AI의 오작동을<br />전제로 둔 보호장치</h2></aside>
        <div className="case-content">
          <p className="case-lead">정확도 개선과 잘못된 실행의 피해 최소화는 서로 다른 문제</p>
          <div className="guard-grid"><div><strong>사용자 확인</strong><p>Write Action 실행 전 변경 내용 제시</p></div><div><strong>Intent 상태 분리</strong><p>조회와 데이터 변경 작업의 실행 경로 분리</p></div><div><strong>Idempotency Key</strong><p>재시도 과정의 중복 장보기·일정 생성 방지</p></div><div><strong>Ownership Condition</strong><p>user_id 조건을 통한 다른 사용자 데이터 변경 차단</p></div></div>
        </div>
      </section>

      <section className="case-section tinted">
        <div className="case-width case-section-inner">
          <aside><span>06</span><h2>배포 전후<br />검증 흐름</h2></aside>
          <div className="case-content">
            <div className="pipeline"><div><span>배포 전</span><strong>Frontend Build</strong><strong>Backend pytest</strong><strong>CDK synth</strong></div><i>→</i><div><span>배포</span><strong>GitHub Actions</strong><strong>ECS Fargate</strong><strong>AWS CDK</strong></div><i>→</i><div><span>배포 후</span><strong>www · api · mcp Smoke Test</strong><strong>Agent Regression Test</strong><strong>237 Tests</strong></div></div>
            <p>컨테이너 기반 Backend와 MCP의 독립 운영을 위한 ECS Fargate 선택 · 재현 가능한 배포 환경을 위한 AWS CDK 관리</p>
          </div>
        </div>
      </section>

      <section className="case-section case-width cicd-section">
        <aside><span>07</span><h2>CI/CD를<br />배포 차단선으로 설계</h2></aside>
        <div className="case-content">
          <p className="case-lead">잘못된 변경이 운영 환경까지 도달하지 못하도록 구성한 단계별 통과 조건</p>
          <p>병합 전 애플리케이션과 인프라 정의 검증 · 배포 후 실제 도메인 기준 서비스 응답 재확인</p>
          <div className="cicd-grid">
            <div><span>01</span><strong>Application Check</strong><p>Frontend Build · Backend pytest</p></div>
            <div><span>02</span><strong>Infrastructure Check</strong><p>AWS CDK synth로 인프라 정의 검증</p></div>
            <div><span>03</span><strong>Post-deploy Check</strong><p>www · api · mcp 엔드포인트 Smoke Test</p></div>
            <div><span>04</span><strong>Regression Check</strong><p>237개 테스트로 주요 기능 회귀 확인</p></div>
          </div>
          <p className="cicd-conclusion">자동화의 기준: 빠른 배포보다 <strong>검증되지 않은 변경의 차단</strong></p>
        </div>
      </section>

      <section className="case-section case-width reflection">
        <aside><span>08</span><h2>회고</h2></aside>
        <div className="case-content"><p className="case-lead">Agent 품질은 모델 하나가 아니라 실행 구조 전체에서 결정</p><p>데이터 구조, Retrieval, Tool 스키마, 실행 순서, 보호장치, 평가와 Trace가 함께 설계돼야 실제 서비스에서 사용할 수 있었습니다. 다시 만든다면 평가셋을 개발 후반이 아니라 Agent 실행 규칙을 설계하는 시점부터 함께 만들 것입니다.</p><div className="case-links"><a href="https://github.com/SKNETWORKS-FAMILY-AICAMP/SKN27-FINAL-1Team" target="_blank" rel="noreferrer">GitHub Repository ↗</a><Link href="/">다른 프로젝트 보기 →</Link></div></div>
      </section>
    </main>
  );
}
