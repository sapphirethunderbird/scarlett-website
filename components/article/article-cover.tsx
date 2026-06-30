import Image from "next/image";
import type { Article } from "@/lib/articles";
import styles from "./article-cover.module.css";

/**
 * Cover artwork for an article card. Renders the article's `image` if one is set,
 * otherwise a deterministic on-brand gradient keyed off the slug so every piece has
 * a distinct-but-stable look — and the index never looks empty before real art exists.
 *
 * The gradient is the one place we reach for raw brand colors instead of semantic
 * tokens (it is intentional artwork, not chrome). It is theme-independent by design.
 */

/** Tiny deterministic string hash → unsigned 32-bit int. */
function hashSlug(slug: string): number {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Brand-palette gradient derived from the slug. */
function gradientFor(slug: string): string {
  const h = hashSlug(slug);
  const angle = h % 360;
  // Two anchor positions for the radial accents, stable per slug.
  const x1 = 15 + (h % 40);
  const y1 = 10 + ((h >> 3) % 35);
  const x2 = 60 + ((h >> 6) % 35);
  const y2 = 55 + ((h >> 9) % 35);
  return [
    `radial-gradient(60% 60% at ${x1}% ${y1}%, rgba(232, 84, 26, 0.55), transparent 70%)`,
    `radial-gradient(55% 65% at ${x2}% ${y2}%, rgba(26, 58, 143, 0.6), transparent 70%)`,
    `linear-gradient(${angle}deg, #0e1320, #080b14)`,
  ].join(", ");
}

export function ArticleCover({
  article,
  variant = "card",
}: {
  article: Pick<Article, "slug" | "title" | "image" | "imageAlt">;
  variant?: "hero" | "card";
}) {
  const className = `${styles.cover} ${variant === "hero" ? styles.hero : styles.card}`;

  if (article.image) {
    return (
      <div className={className}>
        <Image
          src={article.image}
          alt={article.imageAlt ?? article.title}
          fill
          sizes={variant === "hero" ? "100vw" : "(max-width: 720px) 100vw, 50vw"}
          className={styles.img}
        />
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{ backgroundImage: gradientFor(article.slug) }}
      role="img"
      aria-label={article.imageAlt ?? article.title}
    >
      <span className={styles.fallbackTitle} aria-hidden="true">
        {article.title}
      </span>
    </div>
  );
}
