import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";
import { formatArticleDate } from "@/lib/articles";
import styles from "./article-layout.module.css";

/**
 * Reusable shell for any article. Renders the header (eyebrow meta, title, optional
 * project backlink) and wraps the rendered markdown in a `.prose` container so every
 * piece is styled identically. `children` is the compiled markdown body.
 */
export function ArticleLayout({
  meta,
  children,
}: {
  meta: ArticleMeta;
  children: React.ReactNode;
}) {
  return (
    <article className={styles.article}>
      <header className={`${styles.head} reveal`}>
        <p className="eyebrow">
          writing — {formatArticleDate(meta.date)} · {meta.readingTime}
        </p>
        <h1 className={styles.title}>{meta.title}</h1>
        {meta.summary ? <p className={styles.summary}>{meta.summary}</p> : null}
        {meta.project ? (
          <p className={styles.project}>
            part of{" "}
            {meta.projectHref ? (
              <a href={meta.projectHref} target="_blank" rel="noopener">
                {meta.project} →
              </a>
            ) : (
              meta.project
            )}
          </p>
        ) : null}
      </header>

      <div className={`${styles.prose} reveal`}>{children}</div>

      <footer className={styles.foot}>
        <Link href="/blog">← all writing</Link>
      </footer>
    </article>
  );
}
