import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RevealObserver } from "@/components/reveal-observer";
import {
  ALL_PROJECTS,
  getProjectBySlug,
  getProjectNeighbors,
  projectLinks,
} from "@/lib/projects";
import styles from "./project.module.css";

export function generateStaticParams() {
  return ALL_PROJECTS.filter((p) => p.detail).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const description = project.detail?.tagline ?? project.body.trim();
  return {
    title: `${project.title} | Scarlett Whisnant`,
    description,
    openGraph: { title: project.title, description, type: "article" },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  // Projects without long-form content have nothing to show here; the index
  // keeps its card and links out directly.
  if (!project?.detail) notFound();

  const { detail } = project;
  const { prev, next } = getProjectNeighbors(slug);
  const links = projectLinks(project);

  return (
    <>
      <RevealObserver />
      <section>
        <article className={styles.project}>
          <header className={`${styles.head} reveal`}>
            <p className="eyebrow">
              project {project.idx} · {project.status}
            </p>
            <h1 className={styles.title}>{project.title}</h1>
            <p className={styles.tagline}>{detail.tagline}</p>
            {project.proof ? (
              <p className={styles.proof}>{project.proof}</p>
            ) : null}
            {links.length > 0 ? (
              <div className={styles.headLinks}>
                {links.map((l) =>
                  l.internal ? (
                    <Link key={l.href} href={l.href}>
                      {l.label}
                    </Link>
                  ) : (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener">
                      {l.label}
                    </a>
                  ),
                )}
              </div>
            ) : null}
          </header>

          <dl className={`${styles.facts} reveal`}>
            {detail.facts.map((f) => (
              <div key={f.label} className={styles.fact}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>

          {detail.outcomes && detail.outcomes.length > 0 ? (
            <ul
              className={`${styles.outcomes} reveal`}
              data-count={detail.outcomes.length}
            >
              {detail.outcomes.map((o) => (
                <li key={o.label} className={styles.outcome}>
                  <span className={styles.outcomeValue}>{o.value}</span>
                  <span className={styles.outcomeLabel}>{o.label}</span>
                </li>
              ))}
            </ul>
          ) : null}

          <div className={styles.body}>
            {detail.sections.map((s) => (
              <section key={s.heading} className={`${styles.block} reveal`}>
                <h2 className={styles.heading}>{s.heading}</h2>
                {s.body.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </section>
            ))}
          </div>

          <div className={`${styles.stack} reveal`}>
            <span className="eyebrow">stack</span>
            <div className={styles.tags}>
              {project.stack.map((t) => (
                <span key={t} className={styles.tag}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          <footer className={styles.foot}>
            <div className={styles.neighbor} data-side="prev">
              {prev?.detail ? (
                <Link href={`/projects/${prev.slug}`}>
                  <span className={styles.neighborLabel}>← previous</span>
                  <span className={styles.neighborTitle}>{prev.title}</span>
                </Link>
              ) : null}
            </div>
            <Link className={styles.backAll} href="/projects">
              all projects
            </Link>
            <div className={styles.neighbor} data-side="next">
              {next?.detail ? (
                <Link href={`/projects/${next.slug}`}>
                  <span className={styles.neighborLabel}>next →</span>
                  <span className={styles.neighborTitle}>{next.title}</span>
                </Link>
              ) : null}
            </div>
          </footer>
        </article>
      </section>
    </>
  );
}
