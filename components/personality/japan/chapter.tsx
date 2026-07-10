import Image from "next/image";
import { gradientFor } from "@/lib/cover-gradient";
import type { JourneyChapter, JourneyPhoto } from "@/lib/japan/journey";
import styles from "./chapter.module.css";

/**
 * One chapter of the scroll journey. A sticky rail keeps the chapter number
 * and date traveling alongside as you read; photos take one of four layout
 * variants. Parallax (`--depth`) only activates in browsers with CSS
 * scroll-driven animations and motion allowed — the base layer is the
 * site-wide `.reveal` fade, which is the complete experience on its own.
 */

const LAYOUT_CLASS: Record<JourneyChapter["layout"], string> = {
  "full-bleed": styles.layoutFullBleed,
  split: styles.layoutSplit,
  stack: styles.layoutStack,
  polaroids: styles.layoutPolaroids,
};

export function Chapter({
  chapter,
  index,
}: {
  chapter: JourneyChapter;
  index: number;
}) {
  const accentClass =
    chapter.accent === "depth" ? styles.accentDepth : styles.accentSignal;

  return (
    <article
      id={chapter.id}
      className={`${styles.chapter} ${accentClass} ${LAYOUT_CLASS[chapter.layout]}`}
      aria-labelledby={`${chapter.id}-title`}
    >
      <div className={styles.rail}>
        <div className={`${styles.railInner} reveal`}>
          <span className={styles.kicker}>{chapter.kicker}</span>
          {chapter.date ? (
            <span className={styles.date}>{chapter.date}</span>
          ) : null}
          <span className={styles.railLine} aria-hidden="true" />
          <span className={styles.stationMark} aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className={styles.content}>
        <h3 id={`${chapter.id}-title`} className={`${styles.title} reveal`}>
          {chapter.title}
        </h3>
        <div className={styles.body}>
          {chapter.body.map((p, i) => (
            <p key={i} className="reveal">
              {p}
            </p>
          ))}
        </div>
        <div className={styles.photos}>
          {chapter.photos.map((photo, i) => (
            <PhotoView key={i} photo={photo} variant={chapter.layout} />
          ))}
        </div>
      </div>
    </article>
  );
}

function PhotoView({
  photo,
  variant,
}: {
  photo: JourneyPhoto;
  variant: JourneyChapter["layout"];
}) {
  const frame = (
    <>
      {photo.image ? (
        <Image
          src={photo.image}
          alt={photo.alt}
          placeholder="blur"
          sizes={variant === "full-bleed" ? "100vw" : "(max-width: 720px) 100vw, 50vw"}
          className={styles.photoImg}
        />
      ) : (
        <span
          className={styles.photoPlaceholder}
          style={{
            backgroundImage: gradientFor(photo.gradientKey ?? photo.alt),
          }}
          role="img"
          aria-label={photo.alt}
        />
      )}
      {photo.caption ? (
        <span className={styles.caption}>{photo.caption}</span>
      ) : null}
    </>
  );

  return (
    <figure
      className={`${styles.photo} ${styles.parallax} reveal`}
      style={{ "--depth": photo.depth ?? 0 } as React.CSSProperties}
    >
      {frame}
    </figure>
  );
}
