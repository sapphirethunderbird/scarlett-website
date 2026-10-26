import type { Metadata } from "next";
import Link from "next/link";
import { RevealObserver } from "@/components/reveal-observer";
import { ArticleCover } from "@/components/article/article-cover";
import {
  getArticlesForLocale,
  getFeaturedArticles,
  formatArticleDate,
  type Article,
} from "@/lib/articles";
import { getDictionary, resolveLocale } from "@/lib/i18n";
import {
  LOCALE_NAME,
  OG_LOCALE,
  languageAlternates,
  localeHref,
  type Locale,
} from "@/lib/i18n/config";
import styles from "./blog.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const meta = getDictionary(locale).meta.blog;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: localeHref("/blog", locale),
      languages: languageAlternates("/blog"),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      locale: OG_LOCALE[locale],
    },
  };
}

export default async function BlogIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = resolveLocale((await params).locale);
  const d = getDictionary(locale).blog;
  const articles = getArticlesForLocale(locale);
  const featured = getFeaturedArticles(locale);
  const featuredSlugs = new Set(featured.map((a) => a.slug));
  const rest = articles.filter((a) => !featuredSlugs.has(a.slug));

  const [lead, ...moreFeatured] = featured;

  return (
    <>
      <RevealObserver />
      <section id="writing">
        <div className="sec-head reveal">
          <span className="eyebrow">{d.eyebrow}</span>
          <h2>{d.heading}</h2>
        </div>

        {articles.length === 0 ? (
          <p className={styles.empty}>{d.empty}</p>
        ) : (
          <>
            {lead ? (
              <div className={styles.featured}>
                <FeaturedCard article={lead} variant="hero" locale={locale} />
                {moreFeatured.length > 0 ? (
                  <div className={styles.featuredGrid}>
                    {moreFeatured.map((a) => (
                      <FeaturedCard
                        key={a.slug}
                        article={a}
                        variant="card"
                        locale={locale}
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}

            {rest.length > 0 ? (
              <div className={styles.more}>
                <span className={`eyebrow ${styles.moreHead} reveal`}>
                  {d.moreHead}
                </span>
                <div className={styles.list}>
                  {rest.map((a) => (
                    <Link
                      key={a.slug}
                      href={localeHref(`/blog/${a.slug}`, a.lang)}
                      className={`${styles.row} reveal`}
                      hrefLang={a.lang}
                    >
                      <div className={styles.rowAside}>
                        <ArticleCover article={a} variant="thumb" />
                        <div className={styles.meta}>
                          {formatArticleDate(a.date, a.lang)} · {a.readingTime}
                        </div>
                      </div>
                      <div>
                        <h3 className={styles.title} lang={a.lang}>
                          {a.title}
                        </h3>
                        {a.summary ? (
                          <p className={styles.summary} lang={a.lang}>
                            {a.summary}
                          </p>
                        ) : null}
                        {a.project ? (
                          <span className={styles.tag}>{a.project}</span>
                        ) : null}
                        <LanguageTag articleLang={a.lang} locale={locale} />
                      </div>
                      <div className={styles.arrow} aria-hidden="true">
                        →
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </>
        )}
      </section>
    </>
  );
}

/** Marks a row whose piece isn't available in the locale being browsed, so the
 *  language it *is* in is visible before the click. */
function LanguageTag({
  articleLang,
  locale,
}: {
  articleLang: Locale;
  locale: Locale;
}) {
  if (articleLang === locale) return null;
  return (
    <span className={styles.tag} lang={articleLang}>
      {LOCALE_NAME[articleLang]}
    </span>
  );
}

function FeaturedCard({
  article,
  variant,
  locale,
}: {
  article: Article;
  variant: "hero" | "card";
  locale: Locale;
}) {
  return (
    <Link
      href={localeHref(`/blog/${article.slug}`, article.lang)}
      hrefLang={article.lang}
      className={`${styles.card} ${variant === "hero" ? styles.cardHero : ""} reveal`}
    >
      <ArticleCover article={article} variant={variant} />
      <div className={styles.cardBody}>
        <div className={styles.meta}>
          {formatArticleDate(article.date, article.lang)} · {article.readingTime}
        </div>
        <h3 className={styles.cardTitle} lang={article.lang}>
          {article.title}
        </h3>
        {article.summary ? (
          <p className={styles.summary} lang={article.lang}>
            {article.summary}
          </p>
        ) : null}
        {article.project ? (
          <span className={styles.tag}>{article.project}</span>
        ) : null}
        <LanguageTag articleLang={article.lang} locale={locale} />
      </div>
    </Link>
  );
}
