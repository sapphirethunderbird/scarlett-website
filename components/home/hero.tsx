import { HeroMark } from "@/components/anomaly-mark";
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
          <HeroMark />
        </div>
      </div>
    </header>
  );
}
