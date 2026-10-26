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
import { getDictionary, resolveLocale } from "@/lib/i18n";
import { OG_LOCALE, languageAlternates, localeHref } from "@/lib/i18n/config";
import styles from "./project.module.css";

// Slugs are locale-independent, so one list covers both locales; the `[locale]`
// segment's own generateStaticParams supplies the other half of each pair.
export function generateStaticParams() {
  return ALL_PROJECTS.filter((p) => p.detail).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);
  const project = getProjectBySlug(slug, locale);
  if (!project) return {};

  const description = project.detail?.tagline ?? project.body.trim();
  const path = `/projects/${project.slug}`;
  return {
    title: `${project.title} | ${getDictionary(locale).meta.titleSuffix}`,
    description,
    alternates: {
      canonical: localeHref(path, locale),
      languages: languageAlternates(path),
    },
    openGraph: {
      title: project.title,
      description,
      type: "article",
      locale: OG_LOCALE[locale],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);
  const d = getDictionary(locale).projects;
  const project = getProjectBySlug(slug, locale);
  // Projects without long-form content have nothing to show here; the index
  // keeps its card and links out directly.
  if (!project?.detail) notFound();

  const { detail } = project;
  const { prev, next } = getProjectNeighbors(slug, locale);
  const links = projectLinks(project);

  return (
    <>
      <RevealObserver />
      <section>
        <article className={styles.project}>
          <header className={`${styles.head} reveal`}>
            <p className="eyebrow">
              {d.project} {project.idx} · {project.status}
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
                    <Link key={l.href} href={localeHref(l.href, locale)}>
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
            <span className="eyebrow">{d.stack}</span>
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
                <Link href={localeHref(`/projects/${prev.slug}`, locale)}>
                  <span className={styles.neighborLabel}>{d.prev}</span>
                  <span className={styles.neighborTitle}>{prev.title}</span>
                </Link>
              ) : null}
            </div>
            <Link className={styles.backAll} href={localeHref("/projects", locale)}>
              {d.allProjects}
            </Link>
            <div className={styles.neighbor} data-side="next">
              {next?.detail ? (
                <Link href={localeHref(`/projects/${next.slug}`, locale)}>
                  <span className={styles.neighborLabel}>{d.next}</span>
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
