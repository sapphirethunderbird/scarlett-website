import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import styles from "./footer.module.css";

export function Footer({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  return (
    <footer className={styles.footer}>
      © {new Date().getFullYear()} {d.meta.siteName} · {d.footer.tagline}
    </footer>
  );
}
