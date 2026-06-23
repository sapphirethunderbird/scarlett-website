import styles from "./about.module.css";

export function About() {
  return (
    <section id="about">
      <div className="sec-head reveal">
        <span className="eyebrow">01 — who</span>
        <h2>The person behind the build</h2>
      </div>
      <div className={styles.grid}>
        <div className={`${styles.col} reveal`}>
          <p className={styles.pull}>
            I&apos;m not the person who&apos;s sure. I&apos;m the person who
            tries when it matters, even when it looks hopeless, and then I make
            it mine.
          </p>
          <div className={styles.beliefs}>
            <div className={styles.belief}>
              <span>→</span> Talk to people. Don&apos;t assume.
            </div>
            <div className={styles.belief}>
              <span>→</span> Agency shouldn&apos;t require a technical background.
            </div>
            <div className={styles.belief}>
              <span>→</span> It&apos;s never the user&apos;s fault. Fix it.
            </div>
          </div>
        </div>
        <div className={`${styles.col} reveal`}>
          <p className={styles.body}>
            I moved to Japan at eleven with no Japanese, went through public
            school entirely in Japanese, and got into a national university the
            domestic way, no exchange-student lane.{" "}
            <b>I get fluent fast in systems that weren&apos;t built for me.</b>
          </p>
          <p className={styles.body}>
            That&apos;s the through-line in everything I make: human
            communication, institutional failure, and AI as a tool for handing
            people back some agency. I build the model and the interface. When
            my understanding deepens, I go back and rebuild my earlier work
            instead of hiding it.
          </p>
          <p className={styles.body}>
            Off the screen, I run. I started from genuinely terrible. The
            dreaded PE distance run was my nemesis, but I picked it up anyway
            because it felt impossible. Training through a knee injury toward a
            5K now, a marathon eventually. Same move as everything else here:{" "}
            <b>pick the hard thing, start from zero, make it mine.</b>
          </p>
        </div>
      </div>
    </section>
  );
}
