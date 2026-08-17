import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";
import { formatArticleDate } from "@/lib/articles";
import styles from "./article-layout.module.css";

/**
 * Reusable shell for any article. Renders the header (eyebrow meta, title, optional
 * project backlink, optional link to the other-language version) and wraps the rendered
 * markdown in a `.prose` container so every piece is styled identically. `children` is
 * the compiled markdown body.
 */
export function ArticleLayout({
  meta,
  counterpart,
  children,
}: {
  meta: ArticleMeta;
  /** The same piece in the other language, if one exists. */
  counterpart?: Pick<ArticleMeta, "slug" | "lang"> | null;
  children: React.ReactNode;
}) {
  const ja = meta.lang === "ja";

  return (
    <article className={styles.article} lang={ja ? "ja" : undefined}>
      <header className={`${styles.head} reveal`}>
        <p className="eyebrow">
          {ja ? "記事" : "writing"} — {formatArticleDate(meta.date, meta.lang)} ·{" "}
          {meta.readingTime}
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
        {counterpart ? (
          <p className={styles.langSwitch}>
            {counterpart.lang === "ja" ? (
              <Link href={`/blog/${counterpart.slug}`} lang="ja" hrefLang="ja">
                日本語で読む →
              </Link>
            ) : (
              <Link href={`/blog/${counterpart.slug}`} lang="en" hrefLang="en">
                ← Read in English
              </Link>
            )}
          </p>
        ) : null}
      </header>

      <div className={`${styles.prose} reveal`}>{children}</div>

      <footer className={styles.foot}>
        <Link href="/blog">{ja ? "← 記事一覧" : "← all writing"}</Link>
      </footer>
    </article>
  );
}
