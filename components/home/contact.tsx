import { ContactForm } from "./contact-form";
import styles from "./contact.module.css";

export function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <h2 className={styles.h2}>Let&apos;s talk.</h2>
      <p className={styles.sub}>
        Looking for an early-career role where technical depth meets human-facing
        work. US citizen, no sponsorship needed.
      </p>
      <div className={styles.links}>
        <a
          href="https://github.com/sapphirethunderbird"
          target="_blank"
          rel="noopener"
        >
          GitHub ↗
        </a>
        <a
          href="https://linkedin.com/in/scarlett-whisnant"
          target="_blank"
          rel="noopener"
        >
          LinkedIn ↗
        </a>
      </div>
      <ContactForm />
    </section>
  );
}
