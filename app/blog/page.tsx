import type { Metadata } from "next";
import Link from "next/link";
import { RevealObserver } from "@/components/reveal-observer";
import { ArticleCover } from "@/components/article/article-cover";
import {
  getListedArticles,
  getFeaturedArticles,
  formatArticleDate,
  type Article,
} from "@/lib/articles";
import styles from "./blog.module.css";

export const metadata: Metadata = {
  title: "Writing | Scarlett Whisnant",
  description: "Long-form retrospectives on what I built, broke, and rebuilt.",
};

export default function BlogIndex() {
  const articles = getListedArticles();
  const featured = getFeaturedArticles();
  const featuredSlugs = new Set(featured.map((a) => a.slug));
  const rest = articles.filter((a) => !featuredSlugs.has(a.slug));

  const [lead, ...moreFeatured] = featured;

  return (
    <>
      <RevealObserver />
      <section id="writing">
        <div className="sec-head reveal">
          <span className="eyebrow">writing</span>
          <h2>Built, broken, rebuilt - in long form</h2>
        </div>

        {articles.length === 0 ? (
          <p className={styles.empty}>Nothing published yet. Soon.</p>
        ) : (
          <>
            {lead ? (
              <div className={styles.featured}>
                <FeaturedCard article={lead} variant="hero" />
                {moreFeatured.length > 0 ? (
                  <div className={styles.featuredGrid}>
                    {moreFeatured.map((a) => (
                      <FeaturedCard key={a.slug} article={a} variant="card" />
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}

            {rest.length > 0 ? (
              <div className={styles.more}>
                <span className={`eyebrow ${styles.moreHead} reveal`}>
                  more writing
                </span>
                <div className={styles.list}>
                  {rest.map((a) => (
                    <Link
                      key={a.slug}
                      href={`/blog/${a.slug}`}
                      className={`${styles.row} reveal`}
                    >
                      <div className={styles.meta}>
                        {formatArticleDate(a.date, a.lang)} · {a.readingTime}
                      </div>
                      <div>
                        <h3 className={styles.title}>{a.title}</h3>
                        {a.summary ? (
                          <p className={styles.summary}>{a.summary}</p>
                        ) : null}
                        {a.project ? (
                          <span className={styles.tag}>{a.project}</span>
                        ) : null}
                        {a.lang === "ja" ? (
                          <span className={styles.tag} lang="ja">
                            日本語
                          </span>
                        ) : null}
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

function FeaturedCard({
  article,
  variant,
}: {
  article: Article;
  variant: "hero" | "card";
}) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className={`${styles.card} ${variant === "hero" ? styles.cardHero : ""} reveal`}
    >
      <ArticleCover article={article} variant={variant} />
      <div className={styles.cardBody}>
        <div className={styles.meta}>
          {formatArticleDate(article.date, article.lang)} · {article.readingTime}
        </div>
        <h3 className={styles.cardTitle}>{article.title}</h3>
        {article.summary ? (
          <p className={styles.summary}>{article.summary}</p>
        ) : null}
        {article.project ? (
          <span className={styles.tag}>{article.project}</span>
        ) : null}
        {article.lang === "ja" ? (
          <span className={styles.tag} lang="ja">
            日本語
          </span>
        ) : null}
      </div>
    </Link>
  );
}
