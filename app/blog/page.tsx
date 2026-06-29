import type { Metadata } from "next";
import Link from "next/link";
import { RevealObserver } from "@/components/reveal-observer";
import { getAllArticles, formatArticleDate } from "@/lib/articles";
import styles from "./blog.module.css";

export const metadata: Metadata = {
  title: "Writing — Scarlett Whisnant",
  description:
    "Long-form retrospectives on what I built, broke, and rebuilt.",
};

export default function BlogIndex() {
  const articles = getAllArticles();

  return (
    <>
      <RevealObserver />
      <section id="writing">
        <div className="sec-head reveal">
          <span className="eyebrow">writing</span>
          <h2>Built, broken, rebuilt — in long form</h2>
        </div>

        {articles.length === 0 ? (
          <p className={styles.empty}>Nothing published yet. Soon.</p>
        ) : (
          <div className={styles.list}>
            {articles.map((a) => (
              <Link key={a.slug} href={`/blog/${a.slug}`} className={`${styles.row} reveal`}>
                <div className={styles.meta}>
                  {formatArticleDate(a.date)} · {a.readingTime}
                </div>
                <div>
                  <h3 className={styles.title}>{a.title}</h3>
                  {a.summary ? <p className={styles.summary}>{a.summary}</p> : null}
                  {a.project ? (
                    <span className={styles.tag}>{a.project}</span>
                  ) : null}
                </div>
                <div className={styles.arrow} aria-hidden="true">
                  →
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
