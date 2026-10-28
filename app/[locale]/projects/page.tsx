import type { Metadata } from "next";
import Link from "next/link";
import { RevealObserver } from "@/components/reveal-observer";
import { ProjectCard } from "@/components/home/project-card";
import { getProjects, projectLinks } from "@/lib/projects";
import { getDictionary, resolveLocale } from "@/lib/i18n";
import { OG_LOCALE, languageAlternates, localeHref } from "@/lib/i18n/config";
import workStyles from "@/components/home/work.module.css";
import styles from "./projects.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const meta = getDictionary(locale).meta.projects;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: localeHref("/projects", locale),
      languages: languageAlternates("/projects"),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      locale: OG_LOCALE[locale],
    },
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = resolveLocale((await params).locale);
  const d = getDictionary(locale).projects;
  const { featured, other } = getProjects(locale);

  return (
    <>
      <RevealObserver />
      <section id="projects">
        <div className="sec-head reveal">
          <span className="eyebrow">{d.eyebrow}</span>
          <h2>{d.heading}</h2>
        </div>

        <div className={workStyles.projects}>
          {featured.map((p) => (
            <ProjectCard
              key={p.idx}
              project={p}
              locale={locale}
              caseStudyLabel={d.caseStudy}
            />
          ))}
        </div>

        {other.length > 0 ? (
          <div className={styles.more}>
            <span className={`eyebrow ${styles.moreHead} reveal`}>
              {d.otherHead}
            </span>
            <div className={styles.list}>
              {other.map((p) => {
                const allLinks = projectLinks(p);
                const href = localeHref(`/projects/${p.slug}`, locale);
                return (
                  <div key={p.idx} className={`${styles.row} reveal`}>
                    <div className={styles.meta}>
                      <span className={styles.idx}>{p.idx}</span>
                      <span className={styles.status}>{p.status}</span>
                    </div>
                    <div>
                      <h3 className={styles.title}>
                        {p.detail ? (
                          <Link href={href} className={styles.titleLink}>
                            {p.title}
                          </Link>
                        ) : (
                          p.title
                        )}
                      </h3>
                      {p.proof ? <div className={styles.proof}>{p.proof}</div> : null}
                      <p className={styles.body}>{p.body}</p>
                      <div className={styles.stack}>
                        {p.stack.map((t) => (
                          <span key={t} className={styles.tag}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className={styles.links}>
                      {p.detail ? <Link href={href}>{d.caseStudy}</Link> : null}
                      {allLinks.map((l) =>
                        l.internal ? (
                          <Link key={l.href} href={localeHref(l.href, locale)}>
                            {l.label}
                          </Link>
                        ) : (
                          <a
                            key={l.href}
                            href={l.href}
                            target="_blank"
                            rel="noopener"
                          >
                            {l.label}
                          </a>
                        ),
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </section>
    </>
  );
}
