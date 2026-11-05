export default function Home() {
  return (
    <main className="shell">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="이재희 포트폴리오 처음으로">
          JH
        </a>
        <nav aria-label="주요 메뉴">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="https://github.com/EJ-pro">GitHub</a>
        </nav>
      </header>

      <section id="top" className="hero">
        <p className="eyebrow">AI AGENT · RAG ENGINEER</p>
        <h1>
          AI가 답하는 기능을 넘어,
          <br />
          평가하고 운영할 수 있는 시스템을 만듭니다.
        </h1>
        <p className="intro">
          RAG와 Multi-Agent를 실제 서비스 기능과 연결하고, 실행 과정과 실패 원인을
          추적하며 변경 결과를 같은 조건에서 검증합니다.
        </p>
        <div className="actions">
          <a className="primary" href="#work">프로젝트 보기</a>
          <a className="secondary" href="https://github.com/EJ-pro">GitHub</a>
        </div>
      </section>

      <section id="work" className="placeholder-section">
        <p className="section-label">SELECTED WORK</p>
        <h2>프로젝트 케이스 스터디를 정리하고 있습니다.</h2>
        <p>
          밥벌이, Graph-guided Hybrid RAG, HELBOTIN, KKBOX의 문제 정의·기술적
          의사결정·검증 결과를 순차적으로 공개할 예정입니다.
        </p>
      </section>

      <footer id="about">
        <span>이재희 · AI Agent / RAG Engineer</span>
        <a href="mailto:devejpro@gmail.com">devejpro@gmail.com</a>
      </footer>
    </main>
  );
}
