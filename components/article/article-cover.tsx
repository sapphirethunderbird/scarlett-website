import Image from "next/image";
import type { Article } from "@/lib/articles";
import { gradientFor } from "@/lib/cover-gradient";
import styles from "./article-cover.module.css";

/**
 * Cover artwork for an article card. Renders the article's `image` if one is set,
 * otherwise a deterministic on-brand gradient keyed off the slug so every piece has
 * a distinct-but-stable look — and the index never looks empty before real art exists.
 */

const VARIANT_CLASS = {
  hero: styles.hero,
  card: styles.card,
  thumb: styles.thumb,
} as const;

const VARIANT_SIZES = {
  hero: "100vw",
  card: "(max-width: 720px) 100vw, 50vw",
  thumb: "200px",
} as const;

export function ArticleCover({
  article,
  variant = "card",
}: {
  article: Pick<Article, "slug" | "title" | "image" | "imageAlt">;
  variant?: "hero" | "card" | "thumb";
}) {
  const className = `${styles.cover} ${VARIANT_CLASS[variant]}`;

  if (article.image) {
    return (
      <div className={className}>
        <Image
          src={article.image}
          alt={article.imageAlt ?? article.title}
          fill
          sizes={VARIANT_SIZES[variant]}
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
      {/* At thumbnail size the title overlay is illegible clutter, so it is omitted. */}
      {variant === "thumb" ? null : (
        <span className={styles.fallbackTitle} aria-hidden="true">
          {article.title}
        </span>
      )}
    </div>
  );
}
