const featuredCases = [
  {
    number: "01",
    name: "밥벌이",
    meta: "2026.06 — 2026.08 · 팀 프로젝트 · 팀장",
    summary: "복합 요청을 작업 단위로 분해하고, 의존 관계에 따라 실행 순서를 제어한 Multi-Agent 식생활 서비스",
    description: "Supervisor와 도메인 Agent로 책임 분리 · 독립 조회 병렬 처리 · 의존 작업 순차 실행 · 데이터 변경 전 사용자 확인",
    stack: "LangGraph · MCP · FastAPI · PostgreSQL · Neo4j · AWS · CI/CD",
    href: "/projects/bobbeori",
    imageLabel: "밥벌이 서비스 화면",
    external: false,
  },
  {
    number: "02",
    name: "너로 정했다! LLM",
    meta: "2026.04.30 — 2026.05.15 · 5인 팀 · Data Pipeline·Frontend",
    summary: "서로 다른 검색 방식의 실패 패턴을 보완하도록 BM25·pg_trgm·Vector 결과를 RRF로 결합한 Hybrid RAG",
    description: "외부 API 데이터 수집·정제 · PostgreSQL·pgvector와 Neo4j 적재 · 고정 평가셋과 RAGAS 기반 검색 품질 비교",
    stack: "Python · PostgreSQL · pgvector · Neo4j · RRF · RAGAS",
    href: "/projects/hybrid-rag",
    imageLabel: "Hybrid RAG 검색·평가 화면",
    external: false,
  },
  {
    number: "03",
    name: "KKBOX Churn Prevention",
    meta: "2026.03.26 — 2026.04.02 · 5인 팀 · 원인 분석 모델·Frontend",
    summary: "이탈 확률을 예측하는 데서 멈추지 않고 사용자별 원인, 대응 액션, 예상 수익까지 연결한 의사결정 지원 서비스",
    description: "XGBoost Feature Contribution 기반 사용자별 이탈 원인 추출 · 고위험 고객 Action Board · 리텐션 전략별 ROI Simulator 구현",
    stack: "Python · XGBoost · LightGBM · CatBoost · Streamlit · SHAP Contribution",
    href: "/projects/kkbox",
    imageLabel: "KKBOX Action Board·ROI 화면",
    external: false,
  },
];
type SkillItem = { name: string; icon?: string; image?: string };
const experienceItems = [
  {
    title: "Multi-Agent 실행 흐름 설계",
    description: "Supervisor와 도메인 Agent 분리 · 작업 의존성에 따른 병렬·순차 실행 · Write 작업 전 사용자 확인",
    keywords: ["LangGraph", "Multi-Agent"],
  },
  {
    title: "RAGAS 기반 검색 품질 평가",
    description: "고정 평가 데이터셋으로 검색 구조 비교 · Hybrid Retrieval 적용 전후의 품질을 RAGAS 지표로 검증",
    keywords: ["RAGAS", "Hybrid RAG"],
  },
  {
    title: "MCP 서버와 Tool 제작",
    description: "냉장고·장보기·일정 기능을 MCP Tool로 연결 · 조회와 데이터 변경 작업의 실행 정책 분리",
    keywords: ["MCP", "Tool Use"],
  },
  {
    title: "AWS 서비스 배포와 운영",
    description: "ECS Fargate와 EC2에 AI 서비스 배포 · 도메인·HTTPS·Nginx를 포함한 운영 환경 구성",
    keywords: ["AWS", "Docker"],
  },
  {
    title: "CI/CD와 배포 전후 검증",
    description: "GitHub Actions로 빌드·테스트·CDK 검증 · 배포 후 서비스별 Smoke Test 자동화",
    keywords: ["GitHub Actions", "AWS CDK"],
  },
  {
    title: "Android 앱 기획·출시",
    description: "Java 기반 모바일 앱 2개 기획·개발·스토어 출시 · 출시 이후 기능 개선과 유지보수",
    keywords: ["Java", "Android"],
  },
];
const skillGroups: { title: string; skills: SkillItem[] }[] = [
  {
    title: "AI · LLM",
    skills: [
      { name: "Python", image: "python" },
      { name: "LangChain" },
      { name: "LangGraph" },
      { name: "RAGAS" },
    ],
  },
  {
    title: "Backend · Data",
    skills: [
      { name: "FastAPI", icon: "devicon-fastapi-plain colored" },
      { name: "Django REST", icon: "devicon-django-plain colored" },
      { name: "PostgreSQL", icon: "devicon-postgresql-plain colored" },
      { name: "Neo4j", icon: "devicon-neo4j-plain colored" },
    ],
  },
  {
    title: "Infra · Operations",
    skills: [
      { name: "AWS", icon: "devicon-amazonwebservices-plain-wordmark colored" },
      { name: "Docker", icon: "devicon-docker-plain colored" },
      { name: "GitHub Actions", icon: "devicon-githubactions-plain colored" },
      { name: "Nginx", icon: "devicon-nginx-original colored" },
    ],
  },
  {
    title: "Client · Tools",
    skills: [
      { name: "React", icon: "devicon-react-original colored" },
      { name: "Next.js", icon: "devicon-nextjs-plain" },
      { name: "Android", icon: "devicon-android-plain colored" },
      { name: "Git", icon: "devicon-git-plain colored" },
    ],
  },
];
const projectItems = [
  {
    name: "밥벌이",
    category: "AI SERVICE",
    description: "복합 요청의 의존 관계와 실행 정책을 제어하는 Multi-Agent 식생활 서비스",
    tech: "LangGraph · MCP · FastAPI · AWS",
    href: "/projects/bobbeori",
  },
  {
    name: "GitGraph · ChatFolio",
    category: "AI DEVELOPER TOOL",
    description: "AST로 코드 의존성을 추출하고 GraphRAG로 분석·README 생성을 지원하는 개발 도구",
    tech: "Tree-sitter · LangGraph · Hybrid RAG · React",
    href: "https://github.com/EJ-pro/GitGraph",
  },
  {
    name: "HELBOTIN",
    category: "AI SERVICE",
    description: "운동 데이터 기반 RAG 상담과 개인화 루틴을 제공하는 헬스케어 서비스",
    tech: "Django REST · pgvector · Neo4j · AWS EC2",
    href: "https://github.com/SKNETWORKS-FAMILY-AICAMP/SKN27-4th-4team",
  },
  {
    name: "너로 정했다! LLM",
    category: "HYBRID RAG",
    description: "Vector·BM25·pg_trgm과 Graph 탐색을 결합한 포켓몬 AI 플랫폼",
    tech: "PostgreSQL · pgvector · Neo4j · RAGAS",
    href: "/projects/hybrid-rag",
  },
  {
    name: "KKBOX Churn Prevention",
    category: "MACHINE LEARNING",
    description: "이탈 예측을 사용자별 원인·대응 액션·ROI 비교로 연결한 의사결정 서비스",
    tech: "XGBoost · LightGBM · CatBoost · Streamlit",
    href: "/projects/kkbox",
  },
  {
    name: "밥벌이 Android",
    category: "ANDROID",
    description: "요리 영상을 구조화된 레시피로 바꾸고 현재 조리 단계를 기억하는 Android 앱",
    tech: "Kotlin · Jetpack Compose · Supabase",
    href: "https://github.com/EJ-pro/bobbeori-android",
  },
  {
    name: "Pokemon RAG Database Pipeline",
    category: "DATA PIPELINE",
    description: "PokeAPI의 정형·비정형 데이터를 수집해 RAG 지식베이스로 적재하는 파이프라인",
    tech: "Python · PostgreSQL · pgvector · Docker",
    href: "https://github.com/EJ-pro/Pokemon_DB_Collection",
  },
  {
    name: "SmartPot",
    category: "ANDROID · CV",
    description: "CameraX와 픽셀 분석으로 식물 상태를 진단하는 AI·IoT 반려식물 관리 앱",
    tech: "Kotlin · CameraX · ML Kit · MVVM",
    href: "https://github.com/EJ-pro/smartpot",
  },
  {
    name: "Walky",
    category: "ANDROID",
    description: "위치 기반 산책 커뮤니티와 사람·반려동물의 산책 기록을 위한 Android 프로젝트",
    tech: "Kotlin · Android",
    href: "https://github.com/EJ-pro/Walky",
  },
  {
    name: "E-Card",
    category: "WEB",
    description: "레벨 테스트와 주제별 콘텐츠, 퀴즈를 제공하는 영어 학습 웹 애플리케이션",
    tech: "React · React Router · JavaScript",
    href: "https://github.com/EJ-pro/Project-4",
  },
  {
    name: "TikTok AR Filter",
    category: "AR",
    description: "TikTok Effect House를 활용한 인터랙티브 AR 필터 제작 프로젝트",
    tech: "Effect House · AR",
    href: "https://github.com/EJ-pro/TikTok_AR_Filter",
  },
];

export default function Home() {
  return (
    <main className="sky-page" id="top">
      <header className="sky-header">
        <a className="sky-logo" href="#top">이재희</a>
        <nav aria-label="주요 메뉴"><a href="#top">홈</a><a href="#cases">프로젝트</a><a href="#experience">경험</a><a href="#about">소개</a></nav>
      </header>

      <div className="sky-shell">
        <aside className="profile-panel">
          <div className="profile-avatar" aria-label="이재희 이니셜">JH</div>
          <h1>이재희</h1>
          <p className="profile-handle">@EJ-pro</p>
          <dl>
            <div><dt>직무</dt><dd>AI Engineer</dd></div>
            <div><dt>관심</dt><dd>AI Agent · RAG</dd></div>
          </dl>
          <div className="profile-links"><a href="https://github.com/EJ-pro" target="_blank" rel="noreferrer">GitHub ↗</a><a href="mailto:devejpro@gmail.com">Email ↗</a></div>
        </aside>

        <div className="sky-content">
          <section className="sky-intro">
            <span className="sparkle">✦</span>
            <p>Java로 Android 개발을 시작해 AI 분야까지 공부해왔습니다.</p>
            <h2>RAG와 Multi-Agent를 만들고,<br />AWS 배포까지 경험을 이어가고 있습니다.</h2>
          </section>

          <section className="sky-section" id="cases">
            <header className="sky-section-header"><h2>대표 프로젝트</h2><a href="#projects">전체 프로젝트 →</a></header>
            <div className="selected-project-list">
              {featuredCases.map((item) => (
                <article className={`selected-project selected-project-${item.number}`} key={item.number}>
                  <div className="selected-project-copy">
                    <div className="selected-project-heading">
                      <h3>{item.number}. {item.name}</h3>
                      <p className="selected-project-meta">{item.meta}</p>
                    </div>
                    <strong>{item.summary}</strong>
                    <p className="selected-project-description">{item.description}</p>
                    <div className="selected-project-footer">
                      <p className="selected-project-stack">{item.stack}</p>
                      <a href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noreferrer" : undefined}>개발 내용 보기 ↗</a>
                    </div>
                  </div>
                  <a className="selected-project-media-link" href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noreferrer" : undefined} aria-label={`${item.name} 개발 내용 보기`}>
                    <div className={`selected-project-media selected-project-media-${item.number}`}>
                      <div className="project-preview-window">
                        <div className="project-preview-bar"><span /><span /><span /></div>
                        <div className="project-preview-body">
                          <span>PROJECT {item.number}</span>
                          <strong>{item.imageLabel}</strong>
                        </div>
                      </div>
                    </div>
                  </a>
                </article>
              ))}
            </div>
          </section>

          <section className="glass-panel" id="experience">
            <header className="panel-header"><h2>주요 개발 경험</h2></header>
            <div className="compact-list">
              {experienceItems.map((item, index) => (
                <article key={item.title}>
                  <span>{String(index + 1).padStart(2,"0")}</span>
                  <div><h3>{item.title}</h3><p>{item.description}</p></div>
                  <ul>{item.keywords.map((keyword) => <li key={keyword}>{keyword}</li>)}</ul>
                </article>
              ))}
            </div>
          </section>

          <section className="glass-panel">
            <header className="panel-header"><h2>기술과 도구</h2></header>
            <div className="sky-skill-grid">
              {skillGroups.map((group) => (
                <article key={group.title}>
                  <h3>{group.title}</h3>
                  <ul>
                    {group.skills.map((skill) => (
                      <li key={skill.name}>
                        {skill.image
                          ? <span className={`skill-image skill-image-${skill.image}`} aria-hidden="true" />
                          : skill.icon
                            ? <i className={skill.icon} aria-hidden="true" />
                            : <span className="skill-icon-empty" aria-hidden="true" />}
                        <span>{skill.name}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="glass-panel" id="projects">
            <header className="panel-header project-list-header"><h2>전체 프로젝트</h2><a href="https://github.com/EJ-pro?tab=repositories" target="_blank" rel="noreferrer">GitHub에서 보기 ↗</a></header>
            <div className="sky-project-list">
              {projectItems.map((item,index) => (
                <article key={item.name}>
                  <span>{String(index + 1).padStart(2,"0")}</span>
                  <div className="project-name"><p>{item.category}</p><h3>{item.name}</h3></div>
                  <p className="project-summary">{item.description}</p>
                  <p className="project-tech">{item.tech}</p>
                  <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined} aria-label={`${item.name} 보기`}>↗</a>
                </article>
              ))}
            </div>
          </section>

          <section className="about-grid" id="about">
            <article className="glass-panel"><header className="panel-header"><h2>소개</h2></header><div className="about-copy"><h3>일하는 방식</h3><p>문제를 정의하고 기술을 선택하고 결과를 검증하는 방식을 설명합니다.</p><h3>협업 경험</h3><p>팀에서 맡은 책임과 커뮤니케이션 방식을 설명합니다.</p></div></article>
            <article className="glass-panel"><header className="panel-header"><h2>이력과 활동</h2></header><div className="history-list"><div><span>2026</span><p>SK네트웍스 Family AI 캠프 27기</p></div><div><span>20XX</span><p>자격 · 수상</p></div><div><span>20XX</span><p>기타 활동</p></div></div></article>
          </section>

          <section className="sky-contact"><div><h2>함께 이야기해요.</h2><p>지원 가능한 직무 또는 연락 안내</p></div><div><a href="#">email@example.com ↗</a><a href="#">GitHub ↗</a><a href="#">기술 블로그 ↗</a><a href="#">스토어 ↗</a></div></section>
        </div>
      </div>
      <footer className="sky-footer"><span>© 2026 YOUR NAME</span></footer>
    </main>
  );
}
