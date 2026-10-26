import Link from "next/link";
import type { Dictionary } from "@/lib/i18n";
import { localeHref, type Locale } from "@/lib/i18n/config";
import styles from "./about.module.css";

export function About({
  locale,
  copy,
}: {
  locale: Locale;
  copy: Dictionary["home"]["about"];
}) {
  return (
    <section id="about">
      <div className="sec-head reveal">
        <span className="eyebrow">{copy.eyebrow}</span>
        <h2>{copy.heading}</h2>
      </div>
      <div className="reveal">
        <p className={styles.pull}>{copy.pull}</p>
        <Link href={localeHref("/about", locale)} className={styles.storyLink}>
          {copy.link}
        </Link>
      </div>
    </section>
  );
}
