import styles from "./hero.module.css";

export function Hero() {
  return (
    <header className={styles.header}>
      <div className={styles.grid}>
        <div className={styles.hero}>
          <div className="eyebrow">Bilingual builder · EN / 日本語 · Japan</div>
          <h1 className={styles.h1}>
            Why does this problem
            <br />
            still exist?
          </h1>
          <p className={styles.lede}>
            I build technology <b>from model to interface</b> for the people
            existing systems forgot to design for.
          </p>
          <p className={styles.who}>
            Scarlett Whisnant
            <br />
            Design, AI, and the questions people would rather avoid.
          </p>
          <a href="#contact-form" className={styles.cta}>
            Get in touch
          </a>
        </div>
        <div className={styles.markWrap}>
          <div className={styles.photoWrap}>
            <div className={styles.halo} />
            <div className={styles.photoRing}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/scarlett.jpeg"
                alt="Scarlett Whisnant"
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
