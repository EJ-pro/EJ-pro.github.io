/**
 * 대표 프로젝트 상세 페이지(실행 보고서) 내용.
 * 섹션마다 블록을 쌓아 그리며, 블록 종류별 모양은 CaseStudy 컴포넌트가 정한다.
 */

export type Block =
  | { t: "p"; text: string }
  | { t: "quote"; text: string }
  | { t: "list"; items: string[] }
  | { t: "chips"; items: string[] }
  | { t: "chain"; items: string[] }
  | { t: "note"; before?: string; strong: string; after?: string }
  | { t: "formula"; label: string; expr: string }
  | { t: "cards"; items: { tag?: string; title: string; text?: string; rows?: { k: string; v: string }[] }[] }
  | { t: "flow"; items: { tag?: string; title: string; text?: string }[] }
  | { t: "stats"; items: { label: string; value: string; note?: string }[] }
  | { t: "compare"; pairs: { before: { label: string; value: string }; after: { label: string; value: string } }[]; caption?: string };

export type CaseSection = { id: string; title: string; lead?: string; blocks: Block[] };

export type CaseStudy = {
  slug: string;
  name: string;
  tags: string[];
  tagline: string;
  description: string;
  repo: string;
  /** 운영 중인 사이트 주소 */
  live?: string;
  image: string;
  imageAlt: string;
  fit: "cover" | "contain";
  meta: { label: string; value: string }[];
  sections: CaseSection[];
};

export const cases: CaseStudy[] = [
  {
    slug: "bobbeori",
    name: "밥벌이",
    tags: ["AI Agent", "RAG", "MCP", "2026"],
    tagline: "하나의 대화에 섞인 조회, 추천, 데이터 변경을 실행 정책별로 분리한 Multi-Agent 식생활 서비스",
    description: "밥벌이 프로젝트의 Multi-Agent 실행 구조, 평가, 보호장치, 배포 과정을 정리한 실행 보고서입니다.",
    repo: "https://github.com/SKNETWORKS-FAMILY-AICAMP/SKN27-FINAL-1Team",
    image: "/images/projects/bobbeori-agents.jpg",
    imageAlt: "밥벌이 Multi-Agent 시스템 구조",
    fit: "contain",
    meta: [
      { label: "기간", value: "2026.06 – 2026.08" },
      { label: "팀", value: "5인 팀, 팀장" },
      { label: "주요 기여", value: "Agent 구조, 평가, 배포" },
    ],
    sections: [
      {
        id: "role",
        title: "프로젝트에서 맡은 역할",
        lead: "팀장으로서 기능 분담을 넘어 데이터 구조, Agent 실행 흐름, 배포 방식까지 팀원들과 함께 검토했습니다.",
        blocks: [
          { t: "p", text: "Supervisor와 Domain Agent의 역할, 읽기·쓰기 실행 정책, Agent 평가와 Trace 분석, AWS CDK 기반 인프라와 CI/CD 구성을 중심으로 담당했습니다." },
          {
            t: "cards",
            items: [
              { title: "Agent", text: "Supervisor 실행 흐름과 Domain 책임 분리" },
              { title: "Evaluation", text: "228개 동일 문항, Langfuse Trace 분석" },
              { title: "Safety", text: "Write 확인, 멱등성, 소유권 조건" },
              { title: "Infra", text: "AWS CDK, ECS Fargate, CI/CD, Smoke Test" },
            ],
          },
        ],
      },
      {
        id: "why",
        title: "Single Agent 대신 Multi-Agent를 선택한 이유",
        lead: "한 문장 안에 조회, 추천, 데이터 변경이 함께 있고, 각각 다른 실행 정책이 필요했습니다.",
        blocks: [
          { t: "quote", text: "냉장고 재료로 저녁 메뉴를 추천하고, 부족한 재료는 장보기에 추가한 뒤 일정도 등록해줘." },
          { t: "p", text: "이 요청은 냉장고 조회, 레시피 추천, 부족 재료 계산, 장보기 데이터 변경, 일정 등록이 순서대로 이어져야 합니다. Single Agent에 Tool을 계속 추가하면 구현은 빠르지만 Tool 선택 오류와 Task 누락, 읽기·쓰기 정책의 혼재가 발생했습니다." },
          {
            t: "cards",
            items: [
              { title: "Single Agent + 많은 Tool", rows: [{ k: "장점", v: "빠른 초기 구현과 단순한 구조" }, { k: "한계", v: "Tool 증가에 따른 선택 오류와 복합 요청의 Task 누락" }] },
              { title: "기능별 Agent 분리", rows: [{ k: "장점", v: "Inventory, Recipe, Shopping, Calendar의 명확한 책임 범위" }, { k: "한계", v: "Agent 간 실행 순서와 작업 의존성을 판단할 주체 필요" }] },
              { tag: "선택", title: "Supervisor + Domain Agent", rows: [{ k: "장점", v: "작업 분해와 병렬·순차·확인 후 실행의 개별 제어" }, { k: "한계", v: "Agent 상태와 결과 전달 규칙의 추가 설계" }] },
            ],
          },
          { t: "note", before: "Agent를 나눈 것이 아니라, ", strong: "서로 다른 실행 정책이 필요한 업무를 나누었습니다." },
        ],
      },
      {
        id: "flow",
        title: "의존 관계에 따른 실행 흐름 제어",
        blocks: [
          {
            t: "flow",
            items: [
              { tag: "01", title: "Supervisor가 요청을 Task로 분해", text: "사용자 요청에서 필요한 Domain과 작업을 분리" },
              { tag: "02", title: "독립 조회는 병렬 실행", text: "서로 결과에 의존하지 않는 작업을 동시에 실행" },
              { tag: "03", title: "의존 작업은 순차 실행", text: "이전 결과가 필요한 작업의 의존성을 반영" },
              { tag: "04", title: "Write는 사용자 확인 후 실행", text: "재료 삭제, 일정 등록 같은 작업의 즉시 실행을 차단" },
            ],
          },
        ],
      },
      {
        id: "trace",
        title: "최종 답변만으로 찾기 어려운 오류",
        lead: "'일정 등록 실패'라는 같은 결과 뒤에 서로 다른 원인이 있었습니다.",
        blocks: [
          { t: "list", items: ["Supervisor가 Calendar Task를 만들지 않은 경우", "Calendar 요청이 Inventory Agent로 전달된 경우", "Tool Argument 변환이나 날짜 해석에 실패한 경우", "복합 요청 중 일부 Task가 누락된 경우"] },
          { t: "chain", items: ["User Query", "Intent", "Agent", "Tool", "Arguments", "Result"] },
          { t: "p", text: "Langfuse Trace로 전체 흐름을 연결해 실패 단계를 특정하고, 같은 평가 문항으로 다시 검증했습니다." },
          { t: "compare", pairs: [{ before: { label: "개선 전", value: "73.9" }, after: { label: "개선 후", value: "86.0" } }], caption: "228개 동일 평가 문항 기준" },
        ],
      },
      {
        id: "safety",
        title: "AI의 오작동을 전제로 둔 보호장치",
        lead: "정확도를 높이는 일과 잘못된 실행의 피해를 줄이는 일은 서로 다른 문제였습니다.",
        blocks: [
          {
            t: "cards",
            items: [
              { title: "사용자 확인", text: "Write Action 실행 전에 변경 내용을 먼저 보여줌" },
              { title: "Intent 상태 분리", text: "조회와 데이터 변경 작업의 실행 경로를 분리" },
              { title: "Idempotency Key", text: "재시도 과정에서 장보기·일정이 중복 생성되지 않게 방지" },
              { title: "Ownership Condition", text: "user_id 조건으로 다른 사용자 데이터 변경을 차단" },
            ],
          },
        ],
      },
      {
        id: "deploy",
        title: "배포 전후 검증 흐름",
        blocks: [
          {
            t: "flow",
            items: [
              { tag: "배포 전", title: "Frontend Build, Backend pytest, CDK synth" },
              { tag: "배포", title: "GitHub Actions, ECS Fargate, AWS CDK" },
              { tag: "배포 후", title: "www·api·mcp Smoke Test, Agent Regression Test 237개" },
            ],
          },
          { t: "p", text: "컨테이너 기반 Backend와 MCP를 따로 운영하기 위해 ECS Fargate를 선택했고, 재현 가능한 배포 환경을 위해 인프라를 AWS CDK로 관리했습니다." },
        ],
      },
      {
        id: "cicd",
        title: "CI/CD를 배포 차단선으로 설계",
        lead: "잘못된 변경이 운영 환경까지 도달하지 못하도록 단계별 통과 조건을 두었습니다.",
        blocks: [
          { t: "p", text: "병합 전에는 애플리케이션과 인프라 정의를 검증하고, 배포 후에는 실제 도메인 기준으로 서비스 응답을 다시 확인합니다." },
          {
            t: "flow",
            items: [
              { tag: "01", title: "Application Check", text: "Frontend Build, Backend pytest" },
              { tag: "02", title: "Infrastructure Check", text: "AWS CDK synth로 인프라 정의 검증" },
              { tag: "03", title: "Post-deploy Check", text: "www·api·mcp 엔드포인트 Smoke Test" },
              { tag: "04", title: "Regression Check", text: "237개 테스트로 주요 기능 회귀 확인" },
            ],
          },
          { t: "note", before: "자동화의 기준은 빠른 배포보다 ", strong: "검증되지 않은 변경의 차단", after: "이었습니다." },
        ],
      },
      {
        id: "retro",
        title: "회고",
        lead: "Agent 품질은 모델 하나가 아니라 실행 구조 전체에서 결정됩니다.",
        blocks: [
          { t: "p", text: "데이터 구조, Retrieval, Tool 스키마, 실행 순서, 보호장치, 평가와 Trace가 함께 설계돼야 실제 서비스에서 사용할 수 있었습니다. 다시 만든다면 평가셋을 개발 후반이 아니라 Agent 실행 규칙을 설계하는 시점부터 함께 만들겠습니다." },
        ],
      },
    ],
  },
  {
    slug: "hybrid-rag",
    name: "너로 정했다! LLM",
    tags: ["Hybrid RAG", "Data Pipeline", "2026"],
    tagline: "서로 다른 검색 방식의 실패 패턴을 보완하고, 포켓몬 데이터에 근거해 답하는 AI 플랫폼",
    description: "포켓몬 데이터를 PostgreSQL, pgvector, Neo4j에 연결하고 서로 다른 검색 실패를 보완한 Hybrid RAG 프로젝트의 실행 보고서입니다.",
    repo: "https://github.com/SKNETWORKS-FAMILY-AICAMP/SKN27-3rd-3TEAM",
    image: "/images/projects/pokemon-team-builder.jpg",
    imageAlt: "너로 정했다! LLM 팀 빌더 화면",
    fit: "cover",
    meta: [
      { label: "기간", value: "2026.04.30 – 2026.05.15" },
      { label: "팀", value: "5인 팀 프로젝트" },
      { label: "주요 기여", value: "데이터 파이프라인, 프론트엔드, 배포" },
    ],
    sections: [
      {
        id: "role",
        title: "프로젝트에서 맡은 역할",
        lead: "원본 데이터 수집부터 사용자가 마주하는 화면과 배포 환경까지 연결했습니다.",
        blocks: [
          { t: "p", text: "직접 담당한 범위는 PokeAPI 데이터 수집·정제 파이프라인, Streamlit 기반 주요 화면, GitHub OAuth, Chrome 확장 프로그램, Railway 배포입니다. 팀이 함께 설계한 RAG·Graph 검색 구조를 서비스 기능에서 쓸 수 있도록 데이터와 화면 양쪽의 기반을 만들었습니다." },
          {
            t: "cards",
            items: [
              { title: "Data Pipeline", text: "PokeAPI 수집, JSON/DB 스키마 정제, 적재 자동화" },
              { title: "Frontend", text: "도감, 로그인, 마이페이지, 랜딩 UI" },
              { title: "Extension", text: "Manifest V3 기반 AI Chrome 확장" },
              { title: "Deployment", text: "Docker 환경 구성, Railway 서비스 배포" },
            ],
          },
        ],
      },
      {
        id: "storage",
        title: "데이터 접근 방식에 맞춘 저장 구조",
        lead: "같은 포켓몬 데이터라도 어떤 질문에 쓰이느냐에 따라 접근 방식이 달랐습니다.",
        blocks: [
          {
            t: "cards",
            items: [
              { tag: "운영 데이터", title: "PostgreSQL", text: "포켓몬 기본 정보, 사용자, 게임 기록처럼 정확한 조회와 CRUD가 필요한 데이터" },
              { tag: "의미 검색", title: "pgvector", text: "도감 설명을 1536차원 임베딩으로 저장하고 자연어 의미에 가까운 문서를 탐색" },
              { tag: "관계 탐색", title: "Neo4j", text: "포켓몬, 타입, 진화, 기술 관계를 따라가며 상성과 진화 경로를 계산" },
            ],
          },
          { t: "note", before: "DB를 기술별로 나눈 것이 아니라, ", strong: "데이터의 접근 패턴에 따라 역할을 나누었습니다." },
        ],
      },
      {
        id: "hybrid",
        title: "Vector Search만으로 부족했던 검색",
        lead: "의미는 비슷하지만 필요한 문서가 빠지고, 고유명사와 부분 일치에 약했습니다.",
        blocks: [
          {
            t: "cards",
            items: [
              { title: "Vector · MMR", rows: [{ k: "역할", v: "질문의 의미와 유사한 도감 설명 탐색" }, { k: "약점", v: "고유명사와 정확한 용어 누락 가능" }] },
              { title: "BM25", rows: [{ k: "역할", v: "단어 빈도 기반 키워드 검색" }, { k: "약점", v: "표현이 달라지면 의미 관계 파악에 한계" }] },
              { title: "pg_trgm", rows: [{ k: "역할", v: "부분 문자열과 유사 문자열 보완" }, { k: "약점", v: "문맥보다 문자열 형태에 의존" }] },
            ],
          },
          { t: "chain", items: ["Vector", "BM25", "pg_trgm", "RRF", "통합 검색 순위"] },
          { t: "p", text: "한 가지 검색 방식을 계속 튜닝하기보다, 각 방식이 놓치는 결과를 다른 채널이 보완하도록 세 결과를 결합했습니다." },
        ],
      },
      {
        id: "rrf",
        title: "점수 대신 순위를 합친 이유",
        lead: "Cosine similarity, BM25 score, trigram similarity는 점수 체계가 서로 달랐습니다.",
        blocks: [
          {
            t: "stats",
            items: [
              { label: "Vector", value: "0.82", note: "cosine similarity" },
              { label: "BM25", value: "7.41", note: "BM25 score" },
              { label: "pg_trgm", value: "0.37", note: "string similarity" },
            ],
          },
          { t: "p", text: "점수를 그대로 더하면 검색기마다 다른 범위와 분포가 결과를 왜곡합니다. RRF는 점수의 절대값이 아니라 각 결과의 순위를 쓰기 때문에, 억지스러운 정규화 없이 결과를 결합할 수 있었습니다." },
          { t: "formula", label: "RRF score(d)", expr: "Σ 1 / (60 + rankᵢ(d))" },
        ],
      },
      {
        id: "graph",
        title: "관계 계산이 먼저인 Graph-guided RAG",
        lead: "팀 빌더에서는 챗봇의 3-way 검색과 별도로 Neo4j에서 pgvector로 이어지는 순차 구조를 적용했습니다.",
        blocks: [
          {
            t: "flow",
            items: [
              { tag: "01", title: "Neo4j", text: "5마리의 약점, 저항, 기술 커버리지 계산" },
              { tag: "02", title: "pgvector MMR", text: "Graph 결과로 검색어를 만들고 설명 근거 탐색" },
              { tag: "03", title: "Hybrid Score", text: "계산 근거와 의미 근거 결합" },
            ],
          },
          { t: "p", text: "상성 계산을 LLM 추론에 맡기지 않고 Graph 결과를 먼저 쓴 뒤, Vector 문서가 추천 이유와 설명을 보강하도록 구성했습니다. Graph만 쓸 때보다 팀 타입 커버리지가 18% 높아졌습니다." },
        ],
      },
      {
        id: "eval",
        title: "느낌이 아닌 평가 결과로 비교",
        lead: "10개 고정 질문과 RAGAS 지표로 검색·생성 구조의 변경 전후를 확인했습니다.",
        blocks: [
          {
            t: "compare",
            pairs: [
              { before: { label: "Baseline 평균", value: "0.816" }, after: { label: "Best 평균", value: "0.886" } },
              { before: { label: "Context Recall", value: "0.70" }, after: { label: "Context Recall", value: "0.90" } },
            ],
          },
          { t: "p", text: "3-way RRF, Neo4j fallback, 진화 조건 보완을 적용한 Phase 4-B v2가 가장 높은 평균과 Recall을 기록했습니다. 반면 Self-RAG는 추가 검색이 관련 없는 정보까지 끌어오며 Faithfulness가 0.938에서 0.769로 떨어져 롤백했습니다." },
          { t: "p", text: "검색 고도화와 RAGAS 평가는 팀이 함께 진행했습니다." },
        ],
      },
      {
        id: "render",
        title: "대량 렌더링 병목 개선",
        lead: "전국 도감 데이터를 한 번에 그리면서 브라우저에 과부하가 생겼습니다.",
        blocks: [
          {
            t: "flow",
            items: [
              { tag: "Before", title: "전체 데이터 동시 렌더링", text: "초기 진입 지연, 스크롤 성능 저하" },
              { tag: "After", title: "50개 단위 청킹", text: "초기 렌더 범위 축소, 무한 스크롤 연결" },
            ],
          },
          { t: "p", text: "Streamlit의 재실행 방식과 iframe 구조를 고려해 데이터 노출 범위를 줄이고, IntersectionObserver가 더 보기 동작을 호출하도록 구성했습니다." },
        ],
      },
      {
        id: "retro",
        title: "회고",
        lead: "검색 구조의 선택은 데이터 특성과 실패 사례에서 시작됩니다.",
        blocks: [
          { t: "p", text: "Vector, Keyword, Graph는 서로 대체 관계가 아니라 각각 다른 질문을 잘 처리하는 도구였습니다. 데이터 수집부터 화면까지 연결하면서, 좋은 RAG는 검색 알고리즘뿐 아니라 정제된 데이터, 재현 가능한 평가셋, 사용자가 기다리지 않는 인터페이스가 함께 갖춰져야 한다는 점을 배웠습니다." },
        ],
      },
    ],
  },
  {
    slug: "kkbox",
    name: "KKBOX Churn Prevention",
    tags: ["Machine Learning", "Business Action", "2026"],
    tagline: "누가 이탈할지 예측하는 모델을 넘어, 왜 이탈하는지와 무엇을 해야 하는지까지 연결한 서비스",
    description: "이탈 예측을 사용자별 원인 분석, 리텐션 액션, ROI 시뮬레이션으로 연결한 KKBOX 프로젝트의 실행 보고서입니다.",
    repo: "https://github.com/SKNETWORKS-FAMILY-AICAMP/SKN27-2nd-3TEAM",
    image: "/images/projects/kkbox-roi.jpg",
    imageAlt: "KKBOX 마케팅 성과 시뮬레이터 화면",
    fit: "cover",
    meta: [
      { label: "기간", value: "2026.03.26 – 2026.04.02" },
      { label: "팀", value: "5인 팀 프로젝트" },
      { label: "주요 기여", value: "이탈 원인 분석 모델, 프론트엔드" },
    ],
    sections: [
      {
        id: "role",
        title: "프로젝트에서 맡은 역할",
        lead: "모델의 예측값을 사용자별 이탈 사유로 바꾸고 서비스 화면까지 전달했습니다.",
        blocks: [
          { t: "p", text: "XGBoost의 Feature Contribution을 이용한 이탈 원인 분석 파이프라인과 Streamlit 프론트엔드를 담당했습니다. 예측 결과와 사용자 데이터를 연결해 고위험 고객별 원인과 카테고리를 만들고, Action Board와 시뮬레이터에서 쓸 수 있는 형태로 구성했습니다." },
          {
            t: "cards",
            items: [
              { title: "Attribution Model", text: "사용자별 양의 기여도 상위 3개 피처 추출" },
              { title: "Reason Mapping", text: "모델 피처를 결제·활동·이용 습관 원인으로 변환" },
              { title: "Data Connection", text: "예측 결과와 고객 데이터를 화면 데이터로 연결" },
              { title: "Frontend", text: "Action Board, ROI Simulator 시각화" },
            ],
          },
        ],
      },
      {
        id: "action",
        title: "예측만으로는 결정할 수 없던 액션",
        lead: "Churn probability 0.87, 그래서 운영자는 무엇을 해야 할까요?",
        blocks: [
          {
            t: "flow",
            items: [
              { tag: "01", title: "Prediction", text: "누가 이탈할 가능성이 높은가" },
              { tag: "02", title: "Explanation", text: "어떤 행동이 위험을 높였는가" },
              { tag: "03", title: "Action", text: "누구에게 어떤 개입이 필요한가" },
              { tag: "04", title: "ROI", text: "개입 비용보다 기대 수익이 큰가" },
            ],
          },
          { t: "p", text: "모델 점수만 보여주는 대시보드가 아니라, 예측을 설명하고 대응 우선순위를 정할 수 있는 흐름을 목표로 잡았습니다." },
        ],
      },
      {
        id: "reason",
        title: "전체 경향이 아닌 사용자별 원인 분석",
        lead: "Global Feature Importance만으로는 개별 고객의 이탈 이유를 설명하기 어려웠습니다.",
        blocks: [
          {
            t: "flow",
            items: [
              { tag: "Input", title: "고객별 행동·결제 피처", text: "자동 갱신, 취소, 결제 공백, 활동일, 청취량" },
              { tag: "Model", title: "XGBoost pred_contribs", text: "각 피처가 이탈 방향에 미친 기여도 계산" },
              { tag: "Output", title: "상위 3개 이탈 원인", text: "양의 기여도 기준으로 뽑은 뒤 한글 사유와 카테고리로 변환" },
            ],
          },
          { t: "chips", items: ["결제 및 구독", "활동 및 참여", "콘텐츠 이용 습관", "사용자 프로필"] },
          { t: "p", text: "같은 이탈 확률을 가진 고객도 원인이 다르면 필요한 액션이 달라집니다. 원본 피처명을 운영자가 이해할 수 있는 사유와 범주로 다시 분류했습니다." },
        ],
      },
      {
        id: "cost",
        title: "성능 차이보다 운영 비용으로 본 오류",
        lead: "유지 고객을 이탈 고객으로 잘못 분류하면 불필요한 쿠폰 비용이 생깁니다.",
        blocks: [
          {
            t: "cards",
            items: [
              { title: "XGBoost", rows: [{ k: "평균 성능", v: "0.9045" }, { k: "False Positive", v: "1,379" }, { k: "True Positive", v: "6,754" }] },
              { title: "Stacking", rows: [{ k: "평균 성능", v: "0.9054" }, { k: "False Positive", v: "1,189" }, { k: "True Positive", v: "6,621" }] },
            ],
          },
          { t: "p", text: "Stacking은 XGBoost보다 평균 성능이 0.0009 높았지만 구조는 더 복잡했습니다. 대신 유지 고객을 이탈로 잘못 판단한 False Positive가 190건 줄어, 모델 차이를 점수가 아닌 마케팅 비용 관점에서도 비교할 수 있었습니다." },
          { t: "note", before: "False Positive를 모델 오류가 아니라 ", strong: "불필요한 리텐션 비용", after: "으로 해석했습니다." },
        ],
      },
      {
        id: "board",
        title: "고위험 고객을 행동 목록으로 전환",
        lead: "예측 확률, 만료 임박 여부, 이탈 원인을 한 화면에서 확인하는 Action Board를 만들었습니다.",
        blocks: [
          {
            t: "cards",
            items: [
              { title: "Risk Filter", text: "이탈 확률과 구독 만료일로 대응 대상 선별" },
              { title: "Reason Filter", text: "결제·활동·콘텐츠 원인별 고객 분류" },
              { title: "Priority List", text: "고위험 고객과 권장 액션을 운영 목록으로 제공" },
            ],
          },
          { t: "p", text: "전체 고객 통계와 개별 고객 분석을 분리해, 운영자가 현황을 확인한 뒤 실제 대응 대상까지 내려갈 수 있도록 구성했습니다." },
        ],
      },
      {
        id: "roi",
        title: "리텐션 전략의 ROI 시뮬레이션",
        lead: "할인 쿠폰과 무료 연장 중 어떤 전략이 나은지 조건을 바꿔 비교합니다.",
        blocks: [
          {
            t: "flow",
            items: [
              { tag: "Input", title: "할인율, 가입 기간, 대상 고객" },
              { tag: "Estimate", title: "예상 방어 성공률, 잔존 고객" },
              { tag: "Compare", title: "캠페인 비용, 3개월 누적 수익" },
            ],
          },
          { t: "p", text: "시뮬레이터는 실제 캠페인 실적이 아니라 가격 민감도와 월별 추가 이탈률 등 코드에 정의한 가정을 기반으로 한 비교 도구입니다. 결과값 자체보다 같은 조건에서 전략별 비용과 기대 수익을 비교하는 데 초점을 맞췄습니다." },
        ],
      },
      {
        id: "scope",
        title: "대용량 데이터의 현실적인 범위 설정",
        lead: "30GB가 넘는 원본 로그를 짧은 프로젝트 기간 안에 전부 학습하기는 어려웠습니다.",
        blocks: [
          {
            t: "stats",
            items: [
              { label: "User Logs", value: "약 30.5GB", note: "약 3억 9천만 행" },
              { label: "Transactions", value: "약 1.7GB", note: "약 2,150만 행" },
              { label: "Training Set", value: "100,000명", note: "활동 기록이 있는 균형 데이터" },
            ],
          },
          { t: "p", text: "전체 데이터를 다 처리한 것처럼 과장하지 않고, 결측이 없고 활동 기록이 있는 사용자 10만 명을 골라 이탈·유지 비율을 1:1로 구성했습니다. 따라서 성능 수치는 이 균형 표본 안에서 해석해야 합니다." },
        ],
      },
      {
        id: "retro",
        title: "회고",
        lead: "좋은 예측보다 사용 가능한 예측을 만드는 과정이었습니다.",
        blocks: [
          { t: "p", text: "모델 성능을 높이는 것만으로는 운영자가 다음 행동을 결정하기 어려웠습니다. 사용자별 원인과 대응 목록, 비용 비교 화면까지 연결하면서 ML 결과는 설명과 업무 흐름 속에 들어갈 때 비로소 서비스 가치가 생긴다는 점을 배웠습니다. 다시 진행한다면 실제 캠페인 결과를 수집해 시뮬레이터의 가정값을 검증하고, 불균형 원본 분포에서도 모델 성능과 비용을 다시 평가하겠습니다." },
        ],
      },
    ],
  },
];

export const getCase = (slug: string) => cases.find((c) => c.slug === slug);
