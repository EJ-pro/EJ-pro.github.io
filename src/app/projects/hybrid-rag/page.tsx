import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "너로 정했다! LLM · Hybrid RAG",
  description: "포켓몬 데이터를 PostgreSQL, pgvector, Neo4j에 연결하고 서로 다른 검색 실패를 보완한 Hybrid RAG 프로젝트입니다.",
};

const retrievals = [
  { name: "Vector · MMR", role: "질문의 의미와 유사한 도감 설명 탐색", weakness: "고유명사와 정확한 용어 누락 가능" },
  { name: "BM25", role: "단어 빈도 기반 키워드 검색", weakness: "표현이 달라지면 의미 관계 파악에 한계" },
  { name: "pg_trgm", role: "부분 문자열과 유사 문자열 보완", weakness: "문맥보다 문자열 형태에 의존" },
];

export default function HybridRagPage() {
  return (
    <main className="case-page hybrid-case">
      <header className="case-nav case-width">
        <Link href="/">← 이재희 포트폴리오</Link>
        <a href="https://github.com/SKNETWORKS-FAMILY-AICAMP/SKN27-3rd-3TEAM" target="_blank" rel="noreferrer">GitHub ↗</a>
      </header>

      <section className="case-hero case-width">
        <p className="case-kicker">HYBRID RAG · DATA PIPELINE · 2026</p>
        <h1>너로 정했다! LLM</h1>
        <p className="case-subtitle">서로 다른 검색 방식의 실패 패턴을 보완하고,<br />포켓몬 데이터에 근거해 답하는 AI 플랫폼</p>
        <div className="case-info">
          <div><span>기간</span><strong>2026.04.30 – 2026.05.15</strong></div>
          <div><span>팀</span><strong>5인 팀 프로젝트</strong></div>
          <div><span>주요 기여</span><strong>Data Pipeline · Frontend · Deployment</strong></div>
        </div>
      </section>

      <div className="case-cover case-width hybrid-cover">
        <Image src="/images/projects/pokemon-team-builder.png" alt="너로 정했다 LLM 팀 빌더 화면" fill priority sizes="(max-width: 900px) 100vw, 1100px" />
      </div>

      <section className="case-section case-width">
        <aside><span>01</span><h2>프로젝트에서<br />맡은 역할</h2></aside>
        <div className="case-content">
          <p className="case-lead">원본 데이터 수집부터 사용자가 마주하는 화면과 배포 환경까지 연결</p>
          <p>이재희의 직접 담당 범위는 PokeAPI 데이터 수집·정제 파이프라인, Streamlit 기반 주요 화면, GitHub OAuth, Chrome 확장 프로그램, Railway 배포입니다. 팀이 함께 설계한 RAG·Graph 검색 구조가 서비스 기능에서 사용할 수 있도록 데이터와 화면 양쪽의 기반을 구성했습니다.</p>
          <div className="responsibility-grid">
            <div><strong>Data Pipeline</strong><span>PokeAPI 수집 · JSON/DB 스키마 정제 · 적재 자동화</span></div>
            <div><strong>Frontend</strong><span>도감 · 로그인 · 마이페이지 · 랜딩 UI</span></div>
            <div><strong>Extension</strong><span>Manifest V3 기반 AI Chrome 확장</span></div>
            <div><strong>Deployment</strong><span>Docker 환경 구성 · Railway 서비스 배포</span></div>
          </div>
        </div>
      </section>

      <section className="case-section tinted">
        <div className="case-width case-section-inner">
          <aside><span>02</span><h2>데이터의 접근 방식에<br />맞춘 저장 구조</h2></aside>
          <div className="case-content">
            <p className="case-lead">같은 포켓몬 데이터라도 필요한 질문에 따라 달라지는 접근 방식</p>
            <div className="storage-split">
              <article><span>OPERATING DATA</span><h3>PostgreSQL</h3><p>포켓몬 기본 정보, 사용자, 게임 기록처럼 정확한 조회와 CRUD가 필요한 데이터</p></article>
              <article><span>SEMANTIC SEARCH</span><h3>pgvector</h3><p>도감 설명을 1536차원 임베딩으로 저장하고 자연어 의미에 가까운 문서 탐색</p></article>
              <article><span>RELATION SEARCH</span><h3>Neo4j</h3><p>포켓몬·타입·진화·기술 관계를 따라가며 상성과 진화 경로 계산</p></article>
            </div>
            <p className="decision-line">DB를 기술별로 나눈 것이 아니라, <strong>데이터의 접근 패턴에 따라 역할을 나누었습니다.</strong></p>
          </div>
        </div>
      </section>

      <section className="case-section case-width">
        <aside><span>03</span><h2>Vector Search만으로<br />부족했던 검색</h2></aside>
        <div className="case-content">
          <p className="case-lead">의미는 비슷하지만 필요한 문서가 빠지고, 고유명사와 부분 일치에 약했던 단일 검색</p>
          <div className="retrieval-table">
            {retrievals.map((item) => <article key={item.name}><h3>{item.name}</h3><p>{item.role}</p><span>{item.weakness}</span></article>)}
          </div>
          <div className="retrieval-fusion" aria-label="Hybrid retrieval 흐름">
            <div><span>Vector</span><span>BM25</span><span>pg_trgm</span></div><i>↓</i><strong>RRF</strong><i>↓</i><p>통합 검색 순위</p>
          </div>
          <p>한 가지 검색 방식을 계속 튜닝하기보다 각 방식이 놓치는 결과를 다른 채널이 보완하도록 3개의 결과를 결합했습니다.</p>
        </div>
      </section>

      <section className="case-section dark">
        <div className="case-width case-section-inner">
          <aside><span>04</span><h2>점수 대신 순위를<br />합친 이유</h2></aside>
          <div className="case-content">
            <p className="case-lead">Cosine similarity, BM25 score, trigram similarity의 서로 다른 점수 체계</p>
            <div className="rank-example">
              <div><span>Vector</span><strong>0.82</strong><small>cosine similarity</small></div>
              <div><span>BM25</span><strong>7.41</strong><small>BM25 score</small></div>
              <div><span>pg_trgm</span><strong>0.37</strong><small>string similarity</small></div>
            </div>
            <p>Raw score를 직접 더하면 검색기마다 다른 범위와 분포가 결과에 영향을 줍니다. RRF는 점수의 절대값이 아니라 각 검색 결과의 순위를 사용하므로 별도의 억지스러운 정규화 없이 결과를 결합할 수 있었습니다.</p>
            <div className="rrf-formula"><span>RRF score(d)</span><strong>Σ 1 / (60 + rankᵢ(d))</strong></div>
          </div>
        </div>
      </section>

      <section className="case-section case-width">
        <aside><span>05</span><h2>관계 계산이 먼저인<br />Graph-guided RAG</h2></aside>
        <div className="case-content">
          <p className="case-lead">팀 빌더에서는 챗봇의 3-way 검색과 별도로 Neo4j → pgvector 순차 구조 적용</p>
          <div className="graph-flow">
            <div><span>01</span><strong>Neo4j</strong><p>5마리의 약점·저항·기술 커버리지 계산</p></div>
            <i>→</i>
            <div><span>02</span><strong>pgvector MMR</strong><p>Graph 결과로 검색어를 만들고 설명 근거 탐색</p></div>
            <i>→</i>
            <div><span>03</span><strong>Hybrid Score</strong><p>계산 근거와 시맨틱 근거 결합</p></div>
          </div>
          <p>상성 계산을 LLM 추론에 맡기지 않고 Graph 결과를 우선 사용한 뒤, Vector 문서가 추천 이유와 설명을 보강하도록 구성했습니다. Graph-only 대비 팀 타입 커버리지는 18% 향상됐습니다.</p>
        </div>
      </section>

      <section className="case-section tinted">
        <div className="case-width case-section-inner">
          <aside><span>06</span><h2>느낌이 아닌<br />평가 결과로 비교</h2></aside>
          <div className="case-content">
            <p className="case-lead">10개 고정 질문과 RAGAS 지표로 검색·생성 구조의 변경 전후 확인</p>
            <div className="ragas-score">
              <div><span>Baseline Average</span><strong>0.816</strong></div><i>→</i><div><span>Best Average</span><strong>0.886</strong></div>
              <div><span>Context Recall</span><strong>0.70</strong></div><i>→</i><div><span>Context Recall</span><strong>0.90</strong></div>
            </div>
            <p>3-way RRF, Neo4j fallback, 진화 조건 보완을 적용한 Phase 4-B v2가 가장 높은 평균과 Recall을 기록했습니다. 반면 Self-RAG는 추가 검색이 관련 없는 정보까지 끌어오며 Faithfulness가 0.938에서 0.769로 하락해 롤백했습니다.</p>
            <p className="evaluation-note">검색 고도화와 RAGAS 평가는 팀 공동으로 진행했습니다.</p>
          </div>
        </div>
      </section>

      <section className="case-section case-width">
        <aside><span>07</span><h2>대량 렌더링<br />병목 개선</h2></aside>
        <div className="case-content">
          <p className="case-lead">전국 도감 데이터를 한 번에 그리면서 발생한 브라우저 과부하</p>
          <div className="render-change"><div><span>BEFORE</span><strong>전체 데이터 동시 렌더링</strong><p>초기 진입 지연 · 스크롤 성능 저하</p></div><i>→</i><div><span>AFTER</span><strong>50개 단위 청킹</strong><p>초기 렌더 범위 축소 · 무한 스크롤 연결</p></div></div>
          <p>Streamlit의 재실행 방식과 iframe 구조를 고려해 데이터 노출 범위를 줄이고, IntersectionObserver가 더 보기 동작을 호출하도록 구성했습니다.</p>
        </div>
      </section>

      <section className="case-section case-width reflection">
        <aside><span>08</span><h2>회고</h2></aside>
        <div className="case-content">
          <p className="case-lead">검색 구조의 선택은 데이터 특성과 실패 사례에서 시작</p>
          <p>Vector, Keyword, Graph는 서로 대체 관계가 아니라 각각 다른 질문을 잘 처리하는 도구였습니다. 데이터 수집부터 화면까지 연결하면서 좋은 RAG는 검색 알고리즘뿐 아니라 정제된 데이터, 재현 가능한 평가셋, 사용자가 기다리지 않는 인터페이스가 함께 갖춰져야 한다는 점을 배웠습니다.</p>
          <div className="case-links"><a href="https://github.com/SKNETWORKS-FAMILY-AICAMP/SKN27-3rd-3TEAM" target="_blank" rel="noreferrer">GitHub Repository ↗</a><Link href="/">다른 프로젝트 보기 →</Link></div>
        </div>
      </section>
    </main>
  );
}
