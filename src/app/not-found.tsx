import Link from "next/link";

export default function NotFound() {
  return (
    <main className="shell">
      <section className="hero">
        <p className="eyebrow">404</p>
        <h1>페이지를 찾을 수 없습니다.</h1>
        <div className="actions">
          <Link className="primary" href="/">처음으로 돌아가기</Link>
        </div>
      </section>
    </main>
  );
}
