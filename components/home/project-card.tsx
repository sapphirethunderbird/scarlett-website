import Link from "next/link";
import type { Project } from "@/lib/projects";
import { localeHref, type Locale } from "@/lib/i18n/config";
import styles from "./work.module.css";

export function ProjectCard({
  project: p,
  locale,
  caseStudyLabel,
}: {
  project: Project;
  locale: Locale;
  caseStudyLabel: string;
}) {
  const href = localeHref(`/projects/${p.slug}`, locale);

  return (
    <article className={`${styles.card} reveal`}>
      <div className={styles.idx}>{p.idx}</div>
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
      <div className={styles.meta}>
        <span className={styles.status}>{p.status}</span>
        <br />
        {p.detail ? (
          <Link href={href} className={styles.caseLink}>
            {caseStudyLabel}
          </Link>
        ) : null}
        {p.link ? (
          <a href={p.link.href} target="_blank" rel="noopener" className={styles.extraLink}>
            {p.link.label}
          </a>
        ) : null}
        {p.links?.map((l) =>
          l.internal ? (
            <Link
              key={l.href}
              href={localeHref(l.href, locale)}
              className={styles.extraLink}
            >
              {l.label}
            </Link>
          ) : (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener"
              className={styles.extraLink}
            >
              {l.label}
            </a>
          ),
        )}
      </div>
    </article>
  );
}
