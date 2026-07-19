import Link from "next/link";
import styles from "./about.module.css";

export function About() {
  return (
    <section id="about">
      <div className="sec-head reveal">
        <span className="eyebrow">01: who</span>
        <h2>The person behind the build</h2>
      </div>
      <div className="reveal">
        <p className={styles.pull}>
          I moved to Japan at eleven with no Japanese and got fluent fast in a
          system that wasn&apos;t built for me. Now I build technology for the
          people existing systems forgot to design for.
        </p>
        <Link href="/about" className={styles.storyLink}>
          Read my story →
        </Link>
      </div>
    </section>
  );
}
