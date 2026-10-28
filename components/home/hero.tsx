import type { Dictionary } from "@/lib/i18n";
import styles from "./hero.module.css";

export function Hero({ copy }: { copy: Dictionary["home"]["hero"] }) {
  return (
    <header className={styles.header}>
      <div className={styles.grid}>
        <div className={styles.hero}>
          <div className="eyebrow">{copy.eyebrow}</div>
          <h1 className={styles.h1}>
            {copy.h1Line1}
            <br />
            {copy.h1Line2}
          </h1>
          <p className={styles.lede}>
            {copy.ledeBefore}
            <b>{copy.ledeStrong}</b>
            {copy.ledeAfter}
          </p>
          <p className={styles.who}>
            {copy.name}
            <br />
            {copy.who}
          </p>
          <a href="#contact-form" className={styles.cta}>
            {copy.cta}
          </a>
        </div>
        <div className={styles.markWrap}>
          <div className={styles.photoWrap}>
            <div className={styles.halo} />
            <div className={styles.photoRing}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/scarlett.jpeg"
                alt={copy.photoAlt}
                className={styles.photo}
                width={340}
                height={340}
              />
            </div>
            <div className={styles.badge}>
              <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="9" fill="none" stroke="var(--accent)" strokeWidth="2.2" />
                <circle cx="15.5" cy="9.5" r="7.6" fill="var(--bg)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
