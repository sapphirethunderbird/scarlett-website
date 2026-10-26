import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";
import { formatArticleDate } from "@/lib/articles";
import type { Dictionary } from "@/lib/i18n";
import { LOCALE_NAME, localeHref, type Locale } from "@/lib/i18n/config";
import styles from "./article-layout.module.css";

/**
 * Reusable shell for any article. Renders the header (eyebrow meta, title, optional
 * project backlink, optional link to the other-language version) and wraps the rendered
 * markdown in a `.prose` container so every piece is styled identically. `children` is
 * the compiled markdown body.
 *
 * Chrome copy comes from `locale` (the part of the site you're browsing); the body
 * and its `lang` attribute come from `meta.lang` (the language the piece is written
 * in). Those differ when a piece exists in only one language.
 */
export function ArticleLayout({
  meta,
  counterpart,
  locale,
  copy,
  children,
}: {
  meta: ArticleMeta;
  /** The same piece in the other language, if one exists. */
  counterpart?: Pick<ArticleMeta, "slug" | "lang"> | null;
  locale: Locale;
  copy: Dictionary["article"];
  children: React.ReactNode;
}) {
  return (
    <article className={styles.article} lang={meta.lang}>
      <header className={`${styles.head} reveal`}>
        <p className="eyebrow">
          {copy.eyebrow} — {formatArticleDate(meta.date, meta.lang)} ·{" "}
          {meta.readingTime}
        </p>
        <h1 className={styles.title}>{meta.title}</h1>
        {meta.summary ? <p className={styles.summary}>{meta.summary}</p> : null}
        {meta.project ? (
          <p className={styles.project}>
            {copy.partOf}{" "}
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
            {/* The counterpart lives in its own language's part of the site, so
                the chrome switches with the prose rather than lagging behind. */}
            <Link
              href={localeHref(`/blog/${counterpart.slug}`, counterpart.lang)}
              lang={counterpart.lang}
              hrefLang={counterpart.lang}
            >
              {counterpart.lang === "ja"
                ? "日本語で読む →"
                : "← Read in English"}
            </Link>
          </p>
        ) : null}
      </header>

      <div className={`${styles.prose} reveal`}>{children}</div>

      <footer className={styles.foot}>
        <Link href={localeHref("/blog", locale)}>{copy.allWriting}</Link>
      </footer>
    </article>
  );
}
