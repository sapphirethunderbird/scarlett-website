"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LOCALES,
  LOCALE_SHORT,
  localeHref,
  stripLocale,
  type Locale,
} from "@/lib/i18n/config";
import styles from "./language-switcher.module.css";

/**
 * Switches locale while staying on the same page. The current pathname is
 * stripped back to its canonical English form and re-prefixed for the target
 * locale, so /ja/projects/shirabase ↔ /projects/shirabase.
 *
 * Rendered as a segmented control rather than a toggle: both languages are
 * always visible and labelled, which matters when a reader cannot read the
 * language the site currently happens to be in.
 */
export function LanguageSwitcher({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const pathname = usePathname();
  const basePath = stripLocale(pathname ?? "/");

  return (
    <div className={styles.switcher} role="group" aria-label={label}>
      {LOCALES.map((target) =>
        target === locale ? (
          <span key={target} className={styles.current} aria-current="true">
            {LOCALE_SHORT[target]}
          </span>
        ) : (
          <Link
            key={target}
            href={localeHref(basePath, target)}
            className={styles.option}
            lang={target}
            hrefLang={target}
          >
            {LOCALE_SHORT[target]}
          </Link>
        ),
      )}
    </div>
  );
}
