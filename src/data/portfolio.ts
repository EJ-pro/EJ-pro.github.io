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
  handoff: "작업 공간을 열어뒀어요. 아래로 내려오시면 차례로 보여드릴게요.",
};

/** 스크롤 전체를 대화 하나의 컨텍스트로 보고, 내려갈수록 토큰을 소모한다 */
export const contextWindow = {
  limit: 128_000,
  limitLabel: "128K",
  lowAt: 0.85,
};

export type Stage = { id: string; nav?: string; status: string };

export const stages: Stage[] = [
  { id: "hello", status: "대화 시작" },
  { id: "context", nav: "프로필", status: "컨텍스트 불러오는 중" },
  { id: "trace", nav: "대표 프로젝트", status: "추론 과정 재생 중" },
  { id: "evals", nav: "경험", status: "평가 돌리는 중" },
  { id: "tools", nav: "기술", status: "도구 불러오는 중" },
  { id: "search", nav: "전체 프로젝트", status: "프로젝트 검색 중" },
  { id: "contact", nav: "연락", status: "응답 작성 중" },
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
    { kind: "blank" },
    { kind: "h", text: "## 지나온 길" },
    { kind: "li", text: "Java로 Android 앱을 만들며 개발 시작" },
    { kind: "li", text: "모바일 앱 2개 기획부터 스토어 출시까지" },
    { kind: "li", text: "2026 SK네트웍스 Family AI 캠프 27기" },
    { kind: "blank" },
    { kind: "h", text: "## 잘하는 일" },
    { kind: "li", text: "Multi-Agent 설계와 Hybrid RAG" },
    { kind: "li", text: "RAGAS 평가, MCP Tool 제작, AWS 배포" },
    { kind: "blank" },
    { kind: "kv", key: "원칙: ", text: "만들고 끝내지 않고, 평가와 배포로 확인한다" },
  ] satisfies PromptLine[],
};

export type FeaturedProject = {
  name: string;
  image: string;
  fit: "cover" | "contain";
  alt: string;
  meta: string;
  summary: string;
  stack: string;
  href: string;
  steps: { title: string; detail: string }[];
};

export const featured: FeaturedProject[] = [
  {
    name: "밥벌이",
    image: "/images/projects/bobbeori-agents.jpg",
    fit: "contain",
    alt: "밥벌이 Multi-Agent 아키텍처 다이어그램",
    meta: "2026.06 – 2026.08, 팀 프로젝트 팀장",
    summary: "복합 요청을 작업 단위로 나누고, 의존 관계에 따라 실행 순서를 제어한 Multi-Agent 식생활 서비스",
    stack: "LangGraph / MCP / FastAPI / PostgreSQL / Neo4j / AWS",
    href: "https://github.com/EJ-pro",
    steps: [
      { title: "요청 받기", detail: "ChatGPT, Claude 같은 MCP 클라이언트나 웹·앱에서 요청이 들어와요" },
      { title: "Supervisor가 작업 분해", detail: "복합 요청을 도메인별 작업으로 나누고 의존 관계를 파악해요" },
      { title: "독립 조회는 병렬 실행", detail: "재고, 장보기, 레시피 Agent가 동시에 정보를 모아요" },
      { title: "의존 작업은 순차 실행", detail: "앞 단계 결과가 필요한 작업은 순서를 지켜 실행해요" },
      { title: "변경 전 사용자 확인", detail: "데이터를 쓰기 전에는 미리보기를 보여주고 확인을 받아요" },
    ],
  },
  {
    name: "너로 정했다! LLM",
    image: "/images/projects/pokemon-team-builder.jpg",
    fit: "cover",
    alt: "너로 정했다! LLM 팀 빌더 화면",
    meta: "2026.04.30 – 05.15, 5인 팀 데이터 파이프라인·프론트엔드",
    summary: "서로 다른 검색 방식의 약점을 보완하도록 BM25, pg_trgm, Vector 결과를 RRF로 결합한 Hybrid RAG",
    stack: "Python / PostgreSQL / pgvector / Neo4j / RRF / RAGAS",
    href: "https://github.com/EJ-pro",
    steps: [
      { title: "데이터 수집과 정제", detail: "외부 API에서 정형·비정형 데이터를 모아 정리해요" },
      { title: "저장소 적재", detail: "PostgreSQL·pgvector와 Neo4j에 나눠 담아요" },
      { title: "세 방식으로 동시 검색", detail: "BM25, pg_trgm, Vector 검색을 함께 돌려요" },
      { title: "RRF로 결과 결합", detail: "각 방식의 순위를 합쳐 한쪽의 실패를 다른 쪽이 메워요" },
      { title: "RAGAS로 품질 검증", detail: "고정 평가셋으로 적용 전후 검색 품질을 비교해요" },
    ],
  },
  {
    name: "KKBOX Churn Prevention",
    image: "/images/projects/kkbox-roi.jpg",
    fit: "cover",
    alt: "KKBOX 마케팅 성과 시뮬레이터 화면",
    meta: "2026.03.26 – 04.02, 5인 팀 원인 분석 모델·프론트엔드",
    summary: "이탈 확률 예측에서 멈추지 않고 사용자별 원인, 대응 액션, 예상 수익까지 연결한 의사결정 지원 서비스",
    stack: "XGBoost / LightGBM / CatBoost / SHAP / Streamlit",
    href: "https://github.com/EJ-pro",
    steps: [
      { title: "이탈 확률 예측", detail: "XGBoost, LightGBM, CatBoost로 고객별 이탈 가능성을 계산해요" },
      { title: "사용자별 원인 추출", detail: "Feature Contribution으로 왜 떠나려 하는지 찾아요" },
      { title: "고위험 고객 Action Board", detail: "누구에게 무엇을 해야 할지 한눈에 정리해요" },
      { title: "ROI 시뮬레이션", detail: "할인, 무료 연장 같은 전략별 예상 수익을 비교해요" },
    ],
  },
];

export type EvalCase = { title: string; desc: string; tags: string[] };

export const evals: EvalCase[] = [
  {
    title: "Multi-Agent 실행 흐름 설계",
    desc: "Supervisor와 도메인 Agent를 나누고, 작업 의존성에 따라 병렬·순차 실행을 정해요. 쓰기 작업 전에는 사용자 확인을 거쳐요.",
    tags: ["LangGraph", "Multi-Agent"],
  },
  {
    title: "RAGAS로 검색 품질 평가",
    desc: "고정 평가 데이터셋으로 검색 구조를 비교하고, Hybrid Retrieval 적용 전후 품질을 검증했어요.",
    tags: ["RAGAS", "Hybrid RAG"],
  },
  {
    title: "MCP 서버와 Tool 제작",
    desc: "냉장고, 장보기, 일정 기능을 MCP Tool로 연결하고 조회와 변경의 실행 정책을 분리했어요.",
    tags: ["MCP", "Tool Use"],
  },
  {
    title: "AWS 배포와 운영",
    desc: "ECS Fargate와 EC2에 AI 서비스를 배포하고 도메인, HTTPS, Nginx까지 구성했어요.",
    tags: ["AWS", "Docker"],
  },
  {
    title: "CI/CD와 배포 전후 검증",
    desc: "GitHub Actions로 빌드, 테스트, CDK 검증을 돌리고 배포 후 Smoke Test를 자동화했어요.",
    tags: ["GitHub Actions", "AWS CDK"],
  },
  {
    title: "Android 앱 기획과 출시",
    desc: "Java 기반 모바일 앱 두 개를 기획부터 스토어 출시까지 했고, 출시 뒤에도 계속 고쳐왔어요.",
    tags: ["Java", "Android"],
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
  category: ProjectCategory;
  label: string;
  description: string;
  href: string;
};

export const projects: Project[] = [
  { name: "밥벌이", category: "ai", label: "AI 서비스", description: "복합 요청의 의존 관계와 실행 정책을 제어하는 Multi-Agent 식생활 서비스", href: "https://github.com/EJ-pro" },
  { name: "GitGraph · ChatFolio", category: "ai", label: "개발 도구", description: "AST로 코드 의존성을 추출하고 GraphRAG로 분석과 README 생성을 돕는 개발 도구", href: "https://github.com/EJ-pro/GitGraph" },
  { name: "HELBOTIN", category: "ai", label: "AI 서비스", description: "운동 데이터 기반 RAG 상담과 개인화 루틴을 제공하는 헬스케어 서비스", href: "https://github.com/SKNETWORKS-FAMILY-AICAMP/SKN27-4th-4team" },
  { name: "너로 정했다! LLM", category: "ai", label: "Hybrid RAG", description: "Vector, BM25, pg_trgm과 Graph 탐색을 결합한 포켓몬 AI 플랫폼", href: "https://github.com/EJ-pro" },
  { name: "KKBOX Churn Prevention", category: "ai", label: "머신러닝", description: "이탈 예측을 사용자별 원인, 대응 액션, ROI 비교로 연결한 의사결정 서비스", href: "https://github.com/EJ-pro" },
  { name: "밥벌이 Android", category: "android", label: "Android", description: "요리 영상을 구조화된 레시피로 바꾸고 현재 조리 단계를 기억하는 앱", href: "https://github.com/EJ-pro/bobbeori-android" },
  { name: "Pokemon RAG Database Pipeline", category: "ai", label: "데이터 파이프라인", description: "PokeAPI의 정형·비정형 데이터를 수집해 RAG 지식베이스로 적재하는 파이프라인", href: "https://github.com/EJ-pro/Pokemon_DB_Collection" },
  { name: "SmartPot", category: "android", label: "Android 비전", description: "CameraX와 픽셀 분석으로 식물 상태를 진단하는 반려식물 관리 앱", href: "https://github.com/EJ-pro/smartpot" },
  { name: "Walky", category: "android", label: "Android", description: "사람과 반려동물의 산책을 기록하는 위치 기반 산책 커뮤니티", href: "https://github.com/EJ-pro/Walky" },
  { name: "E-Card", category: "etc", label: "웹", description: "레벨 테스트와 주제별 콘텐츠, 퀴즈를 제공하는 영어 학습 웹 앱", href: "https://github.com/EJ-pro/Project-4" },
  { name: "TikTok AR Filter", category: "etc", label: "AR", description: "TikTok Effect House로 만든 인터랙티브 AR 필터", href: "https://github.com/EJ-pro/TikTok_AR_Filter" },
];

export const projectFilters: { id: "all" | ProjectCategory; label: string }[] = [
  { id: "all", label: "전체" },
  { id: "ai", label: "AI와 데이터" },
  { id: "android", label: "Android" },
  { id: "etc", label: "웹과 AR" },
];

export const screenshots = [
  { name: "HELBOTIN", label: "AI 서비스", image: "/images/projects/helbotin-chat.jpg", fit: "cover", alt: "HELBOTIN 상담 채팅 화면", href: "https://github.com/SKNETWORKS-FAMILY-AICAMP/SKN27-4th-4team" },
  { name: "너로 정했다! LLM", label: "Hybrid RAG", image: "/images/projects/pokemon-team-builder.jpg", fit: "cover", alt: "너로 정했다! LLM 팀 빌더 화면", href: "https://github.com/EJ-pro" },
  { name: "KKBOX Churn Prevention", label: "머신러닝", image: "/images/projects/kkbox-roi.jpg", fit: "cover", alt: "KKBOX 마케팅 성과 시뮬레이터 화면", href: "https://github.com/EJ-pro" },
  { name: "밥벌이", label: "AI 서비스", image: "/images/projects/bobbeori-agents.jpg", fit: "contain", alt: "밥벌이 Multi-Agent 아키텍처 다이어그램", href: "https://github.com/EJ-pro" },
] as const;

export const search = {
  query: "이재희가 만든 프로젝트 전부 찾아줘",
};

export const contact = {
  ask: "함께 일해보고 싶어요",
  reply: "반가워요. 포지션 제안이나 함께할 프로젝트 이야기라면 언제든 좋아요.",
};
