"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitcher } from "./language-switcher";
import type { Dictionary } from "@/lib/i18n";
import { localeHref, type Locale } from "@/lib/i18n/config";
import styles from "./nav.module.css";

const GITHUB_URL = "https://github.com/sapphirethunderbird";
const LINKEDIN_URL = "https://www.linkedin.com/in/scarlett-whisnant";
const RESUME_URL =
  "https://docs.google.com/document/d/1VQLnA20SjJ2zwGae5b6UOHvJxHQMNTHD-JCWbyE0wBM/view?usp=sharing";

/** Copy arrives as props rather than via `getDictionary` so the client bundle
 *  carries only the nav's own strings, not every locale's whole dictionary. */
export function Nav({
  locale,
  nav,
  theme,
}: {
  locale: Locale;
  nav: Dictionary["nav"];
  theme: Dictionary["theme"];
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const href = (path: string) => localeHref(path, locale);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const close = () => {
    // Release the scroll lock before Link navigates, or the anchor scroll
    // is swallowed while body is still overflow:hidden.
    document.body.style.overflow = "";
    setMenuOpen(false);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.side} data-side="left">
        <Link
          className={styles.homeDot}
          href={href("/#top")}
          aria-label={nav.home}
          onClick={close}
        >
          <span className={styles.homeDotFace}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/scarlett.jpeg" alt={nav.home} width={40} height={40} className={styles.homeDotImg} />
          </span>
        </Link>
      </div>
      <div className={styles.side} data-side="right">
        <a className={styles.ghPill} href={GITHUB_URL} target="_blank" rel="noopener">
          {nav.github}
        </a>
        <a className={styles.ghPill} href={LINKEDIN_URL} target="_blank" rel="noopener">
          {nav.linkedin}
        </a>
        <a className={styles.ghPill} href={RESUME_URL} target="_blank" rel="noopener">
          {nav.resume}
        </a>
      </div>

      <div className={styles.pill}>
        <Link className={styles.brand} href={href("/#top")} onClick={close}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo/full-color.svg" alt="" aria-hidden="true" className={styles.logoLight} width={22} height={22} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo/mono-orange.svg" alt="" aria-hidden="true" className={styles.logoDark} width={22} height={22} />
          <span>{nav.brand}</span>
        </Link>
        <div className={styles.pillLang}>
          <LanguageSwitcher locale={locale} label={nav.language.label} />
        </div>
        <ThemeToggle copy={theme} />
        <button
          type="button"
          className={styles.menuBtn}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={nav.openMenu}
          aria-expanded={menuOpen}
        >
          <span>{nav.menu}</span>
          <span className={styles.burger} aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>

      {menuOpen && (
        <div className={styles.sheet}>
          <div className={styles.sheetTop}>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={close}
              aria-label={nav.closeMenu}
            >
              ×
            </button>
          </div>
          <div className={styles.sheetBody}>
            <div className="eyebrow" style={{ marginBottom: 22 }}>
              {nav.navigate}
            </div>
            {nav.items.map((item) => (
              <Link
                key={item.n}
                href={href(item.href)}
                className={styles.item}
                onClick={close}
              >
                <span className={styles.itemN}>{item.n}</span>
                <span className={styles.itemLabel}>{item.label}</span>
                <span className={styles.itemDesc}>{item.desc}</span>
              </Link>
            ))}
            <div className={styles.sheetFoot}>
              <LanguageSwitcher locale={locale} label={nav.language.label} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
