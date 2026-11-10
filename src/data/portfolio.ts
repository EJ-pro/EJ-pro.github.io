export const profile = {
  name: "이재희",
  role: "AI Engineer",
  github: "https://github.com/EJ-pro",
  githubHandle: "@EJ-pro",
  repositories: "https://github.com/EJ-pro?tab=repositories",
  email: "devejpro@gmail.com",
};

export const hero = {
  /** 오른쪽 말풍선 → 왼쪽 큰 글씨(스트리밍) → 오른쪽 말풍선 순으로 나오는 자기소개 세 마디 */
  opening: "안녕하세요, AI 엔지니어 이재희입니다.",
  statement: "AI Agent와 RAG를 만들고, 배포와 평가까지 직접 이어가고 있습니다.",
  closing: "지금부터 제 포트폴리오를 소개해드리겠습니다.",
  tool: 'open_portfolio(owner="EJ-pro")',
  handoff: "작업 공간을 열었습니다. 아래로 내려오시면 차례로 보여드리겠습니다.",
};

/** 스크롤 전체를 대화 하나의 컨텍스트로 보고, 내려갈수록 토큰을 소모한다 */
export const contextWindow = {
  limit: 128_000,
  limitLabel: "128K",
  lowAt: 0.85,
};

export type Stage = { id: string; nav?: string; status: string; /** false면 오른쪽 사이드 내비에서 뺀다 */ side?: boolean };

export const stages: Stage[] = [
  { id: "hello", status: "대화 시작" },
  { id: "context", nav: "프로필", status: "컨텍스트 불러오는 중" },
  { id: "trace", nav: "대표 프로젝트", status: "추론 과정 재생 중" },
  { id: "evals", nav: "역량", status: "평가 돌리는 중" },
  { id: "tools", nav: "기술", status: "Tool 연결하는 중" },
  { id: "search", nav: "전체 프로젝트", status: "프로젝트 검색 중" },
  { id: "training", nav: "경험", status: "경험 불러오는 중" },
  { id: "contact", nav: "연락", status: "응답 작성 중", side: false },
];

export type PromptLine =
  | { kind: "blank" }
  | { kind: "h"; text: string }
  | { kind: "kv"; key: string; text: string }
  | { kind: "li"; text: string };

export const context = {
  tagline: "문제를 Agent와 검색 구조로 풀고, 평가와 배포로 끝까지 확인하는 AI Engineer",
  prompt: [
    { kind: "h", text: "# 당신은 이재희입니다" },
    { kind: "blank" },
    { kind: "kv", key: "역할: ", text: "AI Engineer" },
    { kind: "kv", key: "관심: ", text: "AI Agent, RAG, 검색 품질 평가" },
    { kind: "kv", key: "학력: ", text: "목원대학교 컴퓨터공학과 학사" },
    { kind: "blank" },
    { kind: "h", text: "## 잘하는 일" },
    { kind: "li", text: "Multi-Agent 설계와 Hybrid RAG" },
    { kind: "li", text: "RAGAS 평가, MCP Tool 제작, AWS 배포" },
    { kind: "blank" },
    { kind: "kv", key: "원칙: ", text: "만들고 끝내지 않고, 평가와 배포로 확인한다" },
  ] satisfies PromptLine[],
};

export type Checkpoint = {
  period: string;
  title: string;
  summary: string;
  items?: string[];
  subs?: { title: string; desc: string }[];
  note?: string;
  ongoing?: boolean;
};

/** 경험: 시기별 활동과 프로젝트 */
export const checkpoints: Checkpoint[] = [
  {
    period: "2019 — 2025",
    title: "컴퓨터공학 전공",
    summary: "목원대학교 컴퓨터공학과에서 소프트웨어 개발의 기초를 공부했습니다. Java를 활용한 Android 개발로 프로젝트 경험을 시작했으며, 학사 학위를 취득했습니다.",
    items: ["목원대학교 컴퓨터공학과", "학사 졸업", "학점 3.76 / 4.5"],
  },
  {
    period: "2023.09 — 2025.03",
    title: "창업동아리 PEN CREATOR",
    summary: "팀장으로 활동하며 아이디어 기획부터 제품 개발, 경진대회 참여까지 프로젝트 전반을 이끌었습니다.",
    items: ["팀 아이디어 구체화 및 일정 관리", "Android 애플리케이션 개발", "교내외 창업·프로젝트 경진대회 참가", "팀원 간 역할 조율 및 결과물 발표"],
  },
  {
    period: "2023.11",
    title: "SmartPot",
    summary: "CameraX와 ML Kit를 활용한 반려 식물 관리 Android 애플리케이션을 개발했습니다.",
    items: ["CameraX 기반 카메라 기능 구현", "ML Kit를 활용한 이미지 인식 기능 적용", "Android 서비스 기획 및 UI 구현"],
  },
  {
    period: "2024",
    title: "웹·AR 프로젝트",
    summary: "모바일 개발에서 경험 범위를 넓혀 웹 서비스와 AR 콘텐츠를 제작했습니다.",
    subs: [
      { title: "E-Card", desc: "영어 단어 학습을 위한 웹 서비스를 개발했습니다." },
      { title: "TikTok AR Filter", desc: "TikTok Effect House를 활용해 사용자 반응형 AR 필터를 제작했습니다." },
    ],
  },
  {
    period: "2023 — 2025",
    title: "Android 앱 기획·출시",
    summary: "Java 기반 모바일 앱 2개를 직접 기획하고 개발해 애플리케이션 스토어에 출시했습니다. 출시 이후에도 기능 개선과 유지보수를 이어갔습니다.",
    items: ["서비스 아이디어 기획", "Android 애플리케이션 개발", "스토어 배포", "사용자 흐름 점검", "출시 이후 기능 개선 및 유지보수"],
  },
  {
    period: "2026.02 — 2026.08",
    title: "SK네트웍스 Family AI 캠프",
    summary: "머신러닝과 딥러닝을 시작으로 RAG, Multi-Agent, MCP, AWS 배포까지 AI 서비스 개발 전반을 학습하고 프로젝트에 적용했습니다.",
    items: ["Python 기반 데이터 분석", "머신러닝·딥러닝 모델 개발", "RAG 및 검색 시스템 설계", "LangGraph 기반 Multi-Agent 구현", "MCP Server와 Tool 개발", "AWS 기반 서비스 배포", "GitHub Actions 기반 CI/CD 구성"],
  },
  {
    period: "2026.03 — 2026.04",
    title: "KKBOX Churn Prevention",
    summary: "고객의 이탈 여부를 예측하는 데서 끝내지 않고, 이탈 원인과 대응 전략을 운영자가 확인할 수 있는 의사결정 지원 서비스를 개발했습니다.",
    items: ["XGBoost, LightGBM, CatBoost 모델 비교", "사용자별 Feature Contribution 분석", "고객별 이탈 원인 분류", "고위험 고객 Action Board 구현", "리텐션 전략별 ROI Simulator 구현", "모델 성능과 운영 복잡도를 함께 고려한 모델 선택"],
  },
  {
    period: "2026.04 — 2026.05",
    title: "너로 정했다! LLM",
    summary: "서로 다른 검색 방식의 실패 패턴을 보완하는 Hybrid RAG 기반 포켓몬 AI 플랫폼을 개발했습니다.",
    items: ["외부 API 데이터 수집 및 정제", "PostgreSQL·pgvector와 Neo4j 데이터 적재", "BM25·pg_trgm·Vector Search 결합", "Reciprocal Rank Fusion 기반 검색 결과 병합", "고정 평가 데이터셋 구축", "RAGAS 기반 검색 품질 비교", "Graph-only 방식 대비 검색 Coverage 개선"],
  },
  {
    period: "2026.04 — 2026.07",
    title: "GitGraph · ChatFolio",
    summary: "GitHub 저장소의 코드 구조를 분석하고 프로젝트 문서를 생성하는 AI 개발자 도구를 제작했습니다.",
    items: ["AST 기반 코드 구조 분석", "코드 관계 데이터 그래프화", "GraphRAG 기반 프로젝트 탐색", "저장소 분석 결과 시각화", "AI 기반 프로젝트 문서 생성"],
  },
  {
    period: "2026.05 — 2026.06",
    title: "HELBOTIN",
    summary: "약 920종의 운동 데이터를 기반으로 답변하는 개인 맞춤형 RAG 운동 서비스를 개발했습니다.",
    items: ["pgvector 기반 운동 정보 의미 검색", "Neo4j 기반 운동·근육·장비 관계 탐색", "RAG 기반 운동 상담 기능 구현", "AWS 운영 환경 구성", "Production 환경의 SSE Streaming 장애 해결"],
    note: "운영 환경에서 토큰이 한 번에 출력되는 문제를 요청 경로별로 분석했습니다. Backend Streaming이 정상임을 확인한 뒤 Browser, Host Nginx, Container, Django 순서로 범위를 좁혀 EC2 Host Nginx의 proxy_buffering을 원인으로 특정했습니다.",
  },
  {
    period: "2026.06 — 2026.08",
    title: "밥벌이",
    summary: "팀장으로 참여해 냉장고, 레시피, 장보기, 일정을 하나의 대화에서 처리하는 Multi-Agent 식생활 서비스를 개발했습니다.",
    items: ["Supervisor와 Domain Agent 책임 분리", "LangGraph 기반 실행 흐름 설계", "독립 작업 병렬 실행", "의존 작업 순차 실행", "MCP Server와 Tool 개발", "PostgreSQL과 Neo4j 역할 분리", "데이터 변경 작업 전 사용자 확인 구조 적용", "Langfuse 기반 Agent 실행 추적", "RAGAS 및 고정 평가 문항 기반 품질 검증", "AWS ECS Fargate 기반 서비스 배포", "AWS CDK 기반 Infrastructure as Code 적용", "GitHub Actions 기반 CI/CD 구축", "배포 전 테스트와 배포 후 Smoke Test 구성"],
    note: "팀장으로서 특정 기능에만 참여하기보다 설계, 구현, 품질 평가, 배포 과정에서 팀원들과 주요 문제를 함께 논의하고 해결했습니다.",
  },
  {
    period: "2026.10 —",
    title: "밥벌이 Android",
    summary: "기존 밥벌이 서비스를 모바일 환경으로 확장하는 Android 애플리케이션을 개발하고 있습니다.",
    items: ["Jetpack Compose 기반 UI 구성", "Supabase 연동", "모바일 환경에 맞춘 사용자 흐름 설계", "요리 단계 안내 기능 구현"],
    ongoing: true,
  },
];

export type Award = { year: number; title: string; prize: string; org: string; note: string; top?: boolean };

/** 수상 14건. top은 최우수상·대상처럼 강조할 상 */
export const awards: Award[] = [
  { year: 2023, title: "캡스톤디자인 창업 Boot-up 메이커톤", prize: "최우수상", org: "목원대학교", note: "창업 아이디어 기획 및 프로토타입 제작", top: true },
  { year: 2023, title: "제7회 대전 스타트업 스쿨", prize: "우수상", org: "대전창조경제혁신센터", note: "창업 아이디어 구체화 및 발표" },
  { year: 2023, title: "TikTok EFFECT HOUSE AR 필터 메이커톤", prize: "특별상", org: "한국디지털콘텐츠학회", note: "TikTok Effect House를 활용한 AR 필터 제작" },
  { year: 2024, title: "진로 포트폴리오 경진대회", prize: "최우수상", org: "목원대학교", note: "개발 프로젝트와 진로 경험을 포트폴리오로 구성", top: true },
  { year: 2024, title: "스타트업 코리아 투자위크 아이디어 경진대회", prize: "우수상", org: "한남대학교 LINC 3.0 사업단", note: "창업 아이디어 기획 및 사업화 방향 발표" },
  { year: 2024, title: "글로벌 스타트업스쿨 캠프", prize: "Leadership", org: "한남대학교 창업중심대학 사업단", note: "팀 프로젝트 리딩 및 해외시장 진출 전략 발표" },
  { year: 2024, title: "모빌리티 드론코딩 경진대회", prize: "최우수상", org: "목원대학교", note: "모빌리티·드론 소프트웨어 프로젝트", top: true },
  { year: 2024, title: "대전 대학생 공공기술 창업 아이디어 경진대회", prize: "우수상", org: "대전창조경제혁신센터", note: "공공기술을 활용한 창업 아이디어 기획" },
  { year: 2024, title: "융합캡스톤디자인 논문 경진대회", prize: "우수상", org: "한국프로젝트경영학회", note: "캡스톤디자인 프로젝트 결과 논문화 및 발표" },
  { year: 2024, title: "산학협력 융합캡스톤디자인 성과발표 경진대회", prize: "대상협회장상", org: "대전권대학연합 산학협력협의체", note: "산학협력 프로젝트 성과 발표", top: true },
  { year: 2024, title: "산학협력 캡스톤디자인 논문 경진대회", prize: "우수상", org: "한국콘텐츠학회", note: "캡스톤디자인 프로젝트 논문 작성 및 발표" },
  { year: 2024, title: "목원대학교 PEN 혁신창업가상", prize: "혁신창업가상", org: "목원대학교 총장", note: "창업동아리 PEN CREATOR 운영 및 프로젝트 성과" },
  { year: 2025, title: "인력양성 성과공유회 캡스톤디자인", prize: "실용가치상", org: "목원대학교", note: "실제 활용 가능성을 고려한 캡스톤디자인 프로젝트" },
  { year: 2026, title: "SK네트웍스 Family AI 캠프 프로젝트", prize: "프로젝트 우수상", org: "플레이데이터경영교육원", note: "AI 식생활 서비스 밥벌이 개발, 5인 팀 프로젝트 팀장" },
];

export type FeaturedProject = {
  name: string;
  /** 대화에서 방문자가 묻는 질문 */
  ask: string;
  /** 결과물 패널에 보이는 파일 이름 */
  slug: string;
  /** 대화 카드에 보이는 한 줄 설명 */
  tagline: string;
  image: string;
  fit: "cover" | "contain";
  alt: string;
  meta: string;
  summary: string;
  stack: string;
  href: string;
  /** 운영 중인 사이트 주소 */
  live?: string;
  steps: { tool: string; title: string; detail: string }[];
};

export const featured: FeaturedProject[] = [
  {
    name: "밥벌이",
    ask: "밥벌이는 어떤 프로젝트인가요?",
    slug: "bobbeori",
    tagline: "Multi-Agent 식생활 서비스",
    image: "/images/projects/bobbeori-agents.jpg",
    fit: "contain",
    alt: "밥벌이 Multi-Agent 아키텍처 다이어그램",
    meta: "2026.06 – 2026.08, 팀 프로젝트 팀장",
    summary: "복합 요청을 작업 단위로 나누고, 의존 관계에 따라 실행 순서를 제어한 Multi-Agent 식생활 서비스",
    stack: "LangGraph / MCP / FastAPI / PostgreSQL / Neo4j / AWS",
    href: "https://github.com/SKNETWORKS-FAMILY-AICAMP/SKN27-FINAL-1Team",
    steps: [
      { tool: "receive_request", title: "요청 받기", detail: "ChatGPT, Claude 같은 MCP 클라이언트나 웹·앱에서 요청이 들어옵니다" },
      { tool: "supervisor.plan", title: "Supervisor가 작업 분해", detail: "복합 요청을 도메인별 작업으로 나누고 의존 관계를 파악합니다" },
      { tool: "run_parallel", title: "독립 조회는 병렬 실행", detail: "재고, 장보기, 레시피 Agent가 동시에 정보를 모읍니다" },
      { tool: "run_sequential", title: "의존 작업은 순차 실행", detail: "앞 단계 결과가 필요한 작업은 순서를 지켜 실행합니다" },
      { tool: "confirm_write", title: "변경 전 사용자 확인", detail: "데이터를 쓰기 전에는 미리보기를 보여주고 확인을 받습니다" },
    ],
  },
  {
    name: "너로 정했다! LLM",
    ask: "너로 정했다! LLM은 어떤 프로젝트인가요?",
    slug: "hybrid-rag",
    tagline: "Hybrid RAG 포켓몬 AI 플랫폼",
    image: "/images/projects/pokemon-team-builder.jpg",
    fit: "cover",
    alt: "너로 정했다! LLM 팀 빌더 화면",
    meta: "2026.04.30 – 05.15, 5인 팀 데이터 파이프라인·프론트엔드",
    summary: "서로 다른 검색 방식의 약점을 보완하도록 BM25, pg_trgm, Vector 결과를 RRF로 결합한 Hybrid RAG",
    stack: "Python / PostgreSQL / pgvector / Neo4j / RRF / RAGAS",
    href: "https://github.com/SKNETWORKS-FAMILY-AICAMP/SKN27-3rd-3TEAM",
    live: "https://pokemon-hybrid-rag.streamlit.app/",
    steps: [
      { tool: "collect_sources", title: "데이터 수집과 정제", detail: "외부 API에서 정형·비정형 데이터를 모아 정리합니다" },
      { tool: "load_stores", title: "저장소 적재", detail: "PostgreSQL·pgvector와 Neo4j에 나눠 담습니다" },
      { tool: "hybrid_search", title: "세 방식으로 동시 검색", detail: "BM25, pg_trgm, Vector 검색을 함께 실행합니다" },
      { tool: "rrf_merge", title: "RRF로 결과 결합", detail: "각 방식의 순위를 합쳐 한쪽의 실패를 다른 쪽이 보완합니다" },
      { tool: "ragas_eval", title: "RAGAS로 품질 검증", detail: "고정 평가셋으로 적용 전후 검색 품질을 비교합니다" },
    ],
  },
  {
    name: "KKBOX Churn Prevention",
    ask: "KKBOX Churn Prevention은 어떤 프로젝트인가요?",
    slug: "kkbox",
    tagline: "이탈 방지 의사결정 지원 서비스",
    image: "/images/projects/kkbox-roi.jpg",
    fit: "cover",
    alt: "KKBOX 마케팅 성과 시뮬레이터 화면",
    meta: "2026.03.26 – 04.02, 5인 팀 원인 분석 모델·프론트엔드",
    summary: "이탈 확률 예측에서 멈추지 않고 사용자별 원인, 대응 액션, 예상 수익까지 연결한 의사결정 지원 서비스",
    stack: "XGBoost / LightGBM / CatBoost / SHAP / Streamlit",
    href: "https://github.com/SKNETWORKS-FAMILY-AICAMP/SKN27-2nd-3TEAM",
    live: "https://kkbox-churn.streamlit.app/",
    steps: [
      { tool: "predict_churn", title: "이탈 확률 예측", detail: "XGBoost, LightGBM, CatBoost로 고객별 이탈 가능성을 계산합니다" },
      { tool: "explain_contribution", title: "사용자별 원인 추출", detail: "Feature Contribution으로 왜 떠나려 하는지 찾습니다" },
      { tool: "build_action_board", title: "고위험 고객 Action Board", detail: "누구에게 무엇을 해야 할지 한눈에 정리합니다" },
      { tool: "simulate_roi", title: "ROI 시뮬레이션", detail: "할인, 무료 연장 같은 전략별 예상 수익을 비교합니다" },
    ],
  },
];

export type EvalEvidence = {
  /** 근거가 된 프로젝트 */
  project: string;
  /** 상세 페이지 slug (있을 때만 링크) */
  slug?: string;
  points: string[];
  metric: { label: string; value: string };
};

export type EvalCase = { title: string; desc: string; tags: string[]; evidence: EvalEvidence };

export const evals: EvalCase[] = [
  {
    title: "Multi-Agent 실행 흐름 설계",
    desc: "Supervisor와 도메인 Agent를 나누고, 작업 의존성에 따라 병렬·순차 실행을 결정했습니다. 쓰기 작업 전에는 사용자 확인을 거치도록 했습니다.",
    tags: ["LangGraph", "Multi-Agent"],
    evidence: { project: "밥벌이", slug: "bobbeori", points: ["Supervisor가 요청을 Task로 나누고 Inventory, Recipe, Shopping, Calendar Agent에 배분", "서로 의존하지 않는 조회는 병렬로, 앞 결과가 필요한 작업은 순차로 실행", "Langfuse Trace로 Intent부터 Tool 결과까지 이어 실패 단계를 특정"], metric: { label: "228개 평가 문항", value: "73.9 → 86.0" } },
  },
  {
    title: "RAGAS로 검색 품질 평가",
    desc: "고정 평가 데이터셋으로 검색 구조를 비교하고, Hybrid Retrieval 적용 전후 품질을 검증했습니다.",
    tags: ["RAGAS", "Hybrid RAG"],
    evidence: { project: "너로 정했다! LLM", slug: "hybrid-rag", points: ["10개 고정 질문과 RAGAS 지표로 검색 구조의 변경 전후를 비교", "Vector, BM25, pg_trgm 결과를 RRF로 결합해 Context Recall 0.70 → 0.90", "Self-RAG는 Faithfulness가 0.938 → 0.769로 떨어져 롤백"], metric: { label: "RAGAS 평균", value: "0.816 → 0.886" } },
  },
  {
    title: "MCP 서버와 Tool 제작",
    desc: "냉장고, 장보기, 일정 기능을 MCP Tool로 연결하고 조회와 변경의 실행 정책을 분리했습니다.",
    tags: ["MCP", "Tool Use"],
    evidence: { project: "밥벌이", slug: "bobbeori", points: ["냉장고, 장보기, 일정 기능을 MCP Tool로 제공", "조회와 데이터 변경의 실행 경로를 나누고, 변경 전에는 사용자 확인", "Idempotency Key로 재시도 중복을 막고 user_id 조건으로 소유권 확인"], metric: { label: "쓰기 보호장치", value: "4종" } },
  },
  {
    title: "AWS 배포와 운영",
    desc: "ECS Fargate와 EC2에 AI 서비스를 배포하고 도메인, HTTPS, Nginx까지 구성했습니다.",
    tags: ["AWS", "Docker"],
    evidence: { project: "밥벌이", slug: "bobbeori", points: ["밥벌이: ECS Fargate에서 Backend와 MCP를 따로 운영하고 인프라를 AWS CDK로 관리", "HELBOTIN: EC2 운영 환경에서 SSE 응답이 한 번에 출력되는 장애 발생", "Browser, Nginx, Container, Django 순서로 범위를 좁혀 Nginx proxy_buffering을 원인으로 특정"], metric: { label: "운영 환경", value: "ECS · EC2" } },
  },
  {
    title: "CI/CD와 배포 전후 검증",
    desc: "GitHub Actions로 빌드, 테스트, CDK 검증을 돌리고 배포 후 Smoke Test를 자동화했습니다.",
    tags: ["GitHub Actions", "AWS CDK"],
    evidence: { project: "밥벌이", slug: "bobbeori", points: ["배포 전 Frontend Build, Backend pytest, CDK synth를 통과해야 병합", "배포 후 www, api, mcp 엔드포인트 Smoke Test", "Agent Regression Test로 주요 기능의 회귀 여부 확인"], metric: { label: "회귀 테스트", value: "237개" } },
  },
  {
    title: "Android 앱 기획과 출시",
    desc: "Java 기반 모바일 앱 두 개를 기획부터 스토어 출시까지 했고, 출시 이후에도 꾸준히 개선해 왔습니다.",
    tags: ["Java", "Android"],
    evidence: { project: "개인 Android 앱", points: ["Java 기반 앱 두 개를 아이디어 기획부터 스토어 배포까지 직접 진행", "출시 이후 사용자 흐름을 점검하며 기능 개선과 유지보수", "CameraX와 ML Kit로 반려 식물 관리 앱 SmartPot 개발"], metric: { label: "스토어 출시", value: "2개" } },
  },
];

export type Toolkit = { label: string; tools: { name: string; use: string }[] };

export const toolkits: Toolkit[] = [
  {
    label: "AI와 LLM",
    tools: [
      { name: "Python", use: "데이터 수집부터 모델링까지 기본 언어" },
      { name: "LangChain", use: "LLM 호출과 체인 구성" },
      { name: "LangGraph", use: "밥벌이 Multi-Agent 실행 흐름" },
      { name: "RAGAS", use: "Hybrid RAG 검색 품질 평가" },
    ],
  },
  {
    label: "백엔드와 데이터",
    tools: [
      { name: "FastAPI", use: "밥벌이 API 서버" },
      { name: "Django REST", use: "HELBOTIN 백엔드" },
      { name: "PostgreSQL", use: "서비스 DB와 pgvector 벡터 검색" },
      { name: "Neo4j", use: "그래프 탐색과 지식 그래프" },
    ],
  },
  {
    label: "인프라와 운영",
    tools: [
      { name: "AWS", use: "ECS Fargate와 EC2 배포" },
      { name: "Docker", use: "서비스 컨테이너화" },
      { name: "GitHub Actions", use: "빌드, 테스트, 배포 자동화" },
      { name: "Nginx", use: "리버스 프록시와 HTTPS" },
    ],
  },
  {
    label: "클라이언트와 도구",
    tools: [
      { name: "React", use: "웹 프론트엔드" },
      { name: "Next.js", use: "지금 보고 계신 이 포트폴리오" },
      { name: "Android", use: "Java·Kotlin 앱 기획과 출시" },
      { name: "Git", use: "협업과 버전 관리" },
    ],
  },
];

export type ProjectCategory = "ai" | "android" | "etc";

export type Project = {
  name: string;
  /** 사진. 없으면 분야 색과 이름 글자로 자리를 채운다 */
  image?: string;
  fit?: "cover" | "contain";
  category: ProjectCategory;
  label: string;
  description: string;
  href: string;
  /** 상세 페이지가 있으면 그 slug */
  detail?: string;
  /** 운영 중인 사이트 주소 */
  live?: string;
};

export const projects: Project[] = [
  { name: "밥벌이", image: "/images/projects/bobbeori-agents.jpg", fit: "contain", category: "ai", label: "AI 서비스", description: "복합 요청의 의존 관계와 실행 정책을 제어하는 Multi-Agent 식생활 서비스", href: "https://github.com/SKNETWORKS-FAMILY-AICAMP/SKN27-FINAL-1Team", detail: "bobbeori" },
  { name: "GitGraph · ChatFolio", category: "ai", label: "개발 도구", description: "AST로 코드 의존성을 추출하고 GraphRAG로 분석과 README 생성을 돕는 개발 도구", href: "https://github.com/EJ-pro/GitGraph" },
  { name: "HELBOTIN", image: "/images/projects/helbotin-chat.jpg", fit: "cover", category: "ai", label: "AI 서비스", description: "운동 데이터 기반 RAG 상담과 개인화 루틴을 제공하는 헬스케어 서비스", href: "https://github.com/SKNETWORKS-FAMILY-AICAMP/SKN27-4th-4team", live: "https://helbotin.netlify.app/" },
  { name: "너로 정했다! LLM", image: "/images/projects/pokemon-team-builder.jpg", fit: "cover", category: "ai", label: "Hybrid RAG", description: "Vector, BM25, pg_trgm과 Graph 탐색을 결합한 포켓몬 AI 플랫폼", href: "https://github.com/SKNETWORKS-FAMILY-AICAMP/SKN27-3rd-3TEAM", detail: "hybrid-rag", live: "https://pokemon-hybrid-rag.streamlit.app/" },
  { name: "KKBOX Churn Prevention", image: "/images/projects/kkbox-roi.jpg", fit: "cover", category: "ai", label: "머신러닝", description: "이탈 예측을 사용자별 원인, 대응 액션, ROI 비교로 연결한 의사결정 서비스", href: "https://github.com/SKNETWORKS-FAMILY-AICAMP/SKN27-2nd-3TEAM", detail: "kkbox", live: "https://kkbox-churn.streamlit.app/" },
  { name: "밥벌이 Android", category: "android", label: "Android", description: "요리 영상을 구조화된 레시피로 바꾸고 현재 조리 단계를 기억하는 앱", href: "https://github.com/EJ-pro/bobbeori-android", live: "https://play.google.com/store/apps/details?id=com.bobbeori.bobbeori_app&hl=ko" },
  { name: "Pokemon RAG Database Pipeline", category: "ai", label: "데이터 파이프라인", description: "PokeAPI의 정형·비정형 데이터를 수집해 RAG 지식베이스로 적재하는 파이프라인", href: "https://github.com/EJ-pro/Pokemon_DB_Collection" },
  { name: "SmartPot", category: "android", label: "Android 비전", description: "CameraX와 픽셀 분석으로 식물 상태를 진단하는 반려식물 관리 앱", href: "https://github.com/EJ-pro/smartpot" },
  { name: "Walky", category: "android", label: "Android", description: "사람과 반려동물의 산책을 기록하는 위치 기반 산책 커뮤니티", href: "https://github.com/EJ-pro/Walky", live: "https://play.google.com/store/apps/details?id=com.walkmate.walky&hl=ko" },
  { name: "E-Card", category: "etc", label: "웹", description: "레벨 테스트와 주제별 콘텐츠, 퀴즈를 제공하는 영어 학습 웹 앱", href: "https://github.com/EJ-pro/Project-4" },
  { name: "TikTok AR Filter", category: "etc", label: "AR", description: "TikTok Effect House로 만든 인터랙티브 AR 필터", href: "https://github.com/EJ-pro/TikTok_AR_Filter" },
];

export const projectFilters: { id: "all" | ProjectCategory; label: string }[] = [
  { id: "all", label: "전체" },
  { id: "ai", label: "AI와 데이터" },
  { id: "android", label: "Android" },
  { id: "etc", label: "웹과 AR" },
];

export const search = {
  query: "이재희가 만든 프로젝트 전부 찾아줘",
};

export const contact = {
  ask: "함께 일하고 싶습니다",
  reply: "반갑습니다. 포지션 제안이나 함께할 프로젝트 이야기라면 언제든 환영합니다.",
};

/** 사이트 버튼 문구. 스토어 주소면 스토어로 안내한다 */
export const liveLabel = (url: string) => (url.includes("play.google.com") ? "Play 스토어" : "사이트 열기");
