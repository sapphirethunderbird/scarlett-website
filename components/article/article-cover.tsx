import Image from "next/image";
import type { Article } from "@/lib/articles";
import { gradientFor } from "@/lib/cover-gradient";
import styles from "./article-cover.module.css";

/**
 * Cover artwork for an article card. Renders the article's `image` if one is set,
 * otherwise a deterministic on-brand gradient keyed off the slug so every piece has
 * a distinct-but-stable look — and the index never looks empty before real art exists.
 *
 * `card` and `thumb` crop to a fixed 16/10 so the index stays an even grid. `hero`
 * instead follows the picture's own proportions, since the featured slot is the one
 * place a portrait cover should stay a portrait.
 */

const VARIANT_CLASS = {
  hero: styles.hero,
  card: styles.card,
  thumb: styles.thumb,
} as const;

const VARIANT_SIZES = {
  hero: "(max-width: 720px) 100vw, 40vw",
  card: "(max-width: 720px) 100vw, 50vw",
  thumb: "200px",
} as const;

export function ArticleCover({
  article,
  variant = "card",
}: {
  article: Pick<
    Article,
    "slug" | "title" | "image" | "imageAlt" | "imageWidth" | "imageHeight"
  >;
  variant?: "hero" | "card" | "thumb";
}) {
  const className = `${styles.cover} ${VARIANT_CLASS[variant]}`;
  const alt = article.imageAlt ?? article.title;

  // Featured covers size to the image itself. Needs the intrinsic dimensions
  // `lib/articles` reads at build time; without them, fall through to the crop.
  if (
    variant === "hero" &&
    article.image &&
    article.imageWidth &&
    article.imageHeight
  ) {
    return (
      <div className={`${styles.cover} ${styles.heroFit}`}>
        <Image
          src={article.image}
          alt={alt}
          width={article.imageWidth}
          height={article.imageHeight}
          sizes={VARIANT_SIZES.hero}
          className={styles.heroImg}
          priority
        />
      </div>
    );
  }

  if (article.image) {
    return (
      <div className={className}>
        <Image
          src={article.image}
          alt={alt}
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
      aria-label={alt}
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
