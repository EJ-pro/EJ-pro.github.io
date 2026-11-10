import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { cases, type Block, type CaseStudy as Case } from "@/data/cases";
import { featured } from "@/data/portfolio";
import CaseToc from "./CaseToc";
import ScrollTop from "./ScrollTop";
import { ArrowUpRight, Check, ToolChip } from "./ui";

function BlockView({ b }: { b: Block }) {
  switch (b.t) {
    case "p":
      return <p className="cs-p">{b.text}</p>;
    case "quote":
      return (
        <figure className="cs-quote">
          <span className="cs-quote-who mono">user</span>
          <blockquote>{b.text}</blockquote>
        </figure>
      );
    case "list":
      return (
        <ul className="cs-list">
          {b.items.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      );
    case "chips":
      return (
        <ul className="cs-chips">
          {b.items.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      );
    case "chain":
      return (
        <ol className="cs-chain mono" aria-label="흐름">
          {b.items.map((x, i) => (
            <Fragment key={x}>
              {i > 0 && <li className="cs-chain-arrow" aria-hidden="true">→</li>}
              <li className="cs-chain-node">{x}</li>
            </Fragment>
          ))}
        </ol>
      );
    case "note":
      return (
        <p className="cs-note">
          {b.before}
          <strong>{b.strong}</strong>
          {b.after}
        </p>
      );
    case "formula":
      return (
        <div className="cs-formula mono">
          <span>{b.label}</span>
          <span className="cs-formula-eq">=</span>
          <strong>{b.expr}</strong>
        </div>
      );
    case "cards":
      return (
        <ul className={`cs-cards n${Math.min(b.items.length, 4)}`}>
          {b.items.map((c) => (
            <li key={c.title} className={c.tag ? "is-picked" : undefined}>
              {c.tag && <span className="cs-card-tag mono">{c.tag}</span>}
              <strong>{c.title}</strong>
              {c.text && <span className="cs-card-text">{c.text}</span>}
              {c.rows && (
                <dl>
                  {c.rows.map((r) => (
                    <div key={r.k}>
                      <dt>{r.k}</dt>
                      <dd>{r.v}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </li>
          ))}
        </ul>
      );
    case "flow":
      return (
        <ol className="cs-flow">
          {b.items.map((f, i) => (
            <li key={f.title}>
              <span className="cs-flow-dot" aria-hidden="true">
                <Check size={13} color="#fff" width={2.6} />
              </span>
              <span className="cs-flow-tag mono">{f.tag ?? String(i + 1).padStart(2, "0")}</span>
              <strong>{f.title}</strong>
              {f.text && <span className="cs-flow-text">{f.text}</span>}
            </li>
          ))}
        </ol>
      );
    case "stats":
      return (
        <ul className="cs-stats">
          {b.items.map((s) => (
            <li key={s.label}>
              <span className="cs-stat-label mono">{s.label}</span>
              <strong>{s.value}</strong>
              {s.note && <span className="cs-stat-note">{s.note}</span>}
            </li>
          ))}
        </ul>
      );
    case "compare":
      return (
        <figure className="cs-compare">
          {b.pairs.map((p, i) => (
            <div key={i} className="cs-compare-row">
              <div className="cs-compare-cell">
                <span className="mono">{p.before.label}</span>
                <strong>{p.before.value}</strong>
              </div>
              <span className="cs-compare-arrow" aria-hidden="true">→</span>
              <div className="cs-compare-cell is-after">
                <span className="mono">{p.after.label}</span>
                <strong>{p.after.value}</strong>
              </div>
            </div>
          ))}
          {b.caption && <figcaption>{b.caption}</figcaption>}
        </figure>
      );
  }
}

export default function CaseStudy({ c }: { c: Case }) {
  const others = cases.filter((x) => x.slug !== c.slug);
  const ask = featured.find((f) => f.slug === c.slug)?.ask;

  return (
    <>
      <ScrollTop id={c.slug} />
      <header className="case-bar">
        <div className="case-bar-inner">
          <Link href="/#trace" className="case-back">
            <span aria-hidden="true">←</span> 이재희 포트폴리오
          </Link>
          <span className="case-bar-file mono">{c.slug}/report.md</span>
          <a className="case-repo" href={c.repo} target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight size={13} />
          </a>
        </div>
      </header>

      <main>
        <section className="case-hero">
          <div className="case-wrap case-hero-grid">
            <div className="case-hero-copy">
              {ask && (
                <p className="case-ask">
                  <span className="mono">user</span>
                  {ask}
                </p>
              )}
              <ToolChip call={`open_report(project="${c.slug}")`} phase={2} result="불러옴" tone="dark" />
              <ul className="case-tags mono">
                {c.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <h1>{c.name}</h1>
              <p className="case-tagline">{c.tagline}</p>
              <dl className="case-meta">
                {c.meta.map((m) => (
                  <div key={m.label}>
                    <dt className="mono">{m.label}</dt>
                    <dd>{m.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <figure className="case-shot">
              <div className="window-bar">
                <span />
                <span />
                <span />
                <em className="mono">{c.slug}.png</em>
              </div>
              <div className={`case-shot-img fit-${c.fit}`}>
                <Image src={c.image} alt={c.imageAlt} fill sizes="(max-width: 900px) 100vw, 560px" priority />
              </div>
            </figure>
          </div>
        </section>

        <div className="case-wrap case-body">
          <CaseToc items={c.sections.map(({ id, title }) => ({ id, title }))} />
          <article className="case-article">
            {c.sections.map((s, i) => (
              <section key={s.id} id={s.id} className="cs-section">
                <p className="cs-step mono">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  step {i + 1} / {c.sections.length}
                </p>
                <h2>{s.title}</h2>
                {s.lead && <p className="cs-lead">{s.lead}</p>}
                <div className="cs-blocks">
                  {s.blocks.map((b, j) => (
                    <BlockView key={j} b={b} />
                  ))}
                </div>
              </section>
            ))}
          </article>
        </div>

        <section className="case-next">
          <div className="case-wrap">
            <p className="case-next-head mono">다른 대화 이어 보기</p>
            <ul className="case-next-list">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/projects/${o.slug}/`}>
                    <span className="mono">{o.tags[0]}</span>
                    <strong>{o.name}</strong>
                    <span className="case-next-desc">{o.tagline}</span>
                    <span className="case-next-go">
                      보고서 열기 <span aria-hidden="true">→</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/#trace" className="case-home">
              포트폴리오로 돌아가기
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
