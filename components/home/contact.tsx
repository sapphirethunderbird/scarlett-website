import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import { ContactForm } from "./contact-form";
import styles from "./contact.module.css";

export function Contact({
  locale,
  copy,
  form,
  links,
}: {
  locale: Locale;
  copy: Dictionary["home"]["contact"];
  form: Dictionary["contactForm"];
  links: Pick<Dictionary["nav"], "github" | "linkedin" | "resume">;
}) {
  return (
    <section id="contact" className={styles.contact}>
      <h2 className={styles.h2}>{copy.heading}</h2>
      <p className={styles.sub}>{copy.sub}</p>
      <div className={styles.links}>
        <a href="https://github.com/sapphirethunderbird" target="_blank" rel="noopener">
          {links.github}
        </a>
        <a href="https://linkedin.com/in/scarlett-whisnant" target="_blank" rel="noopener">
          {links.linkedin}
        </a>
        <a
          href="https://docs.google.com/document/d/1VQLnA20SjJ2zwGae5b6UOHvJxHQMNTHD-JCWbyE0wBM/view?usp=sharing"
          target="_blank"
          rel="noopener"
        >
          {links.resume}
        </a>
      </div>
      <ContactForm locale={locale} copy={form} />
    </section>
  );
}
