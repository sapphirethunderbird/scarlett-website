"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import styles from "./nav.module.css";

const ITEMS = [
  { n: "01", label: "About", href: "/#about", desc: "The person behind the build" },
  { n: "02", label: "Work", href: "/#work", desc: "Built, broken, rebuilt" },
  { n: "03", label: "Ask", href: "/#ask", desc: "Ask the site about me" },
  { n: "04", label: "Contact", href: "/#contact", desc: "Let's talk" },
  { n: "05", label: "Writing", href: "/blog", desc: "Essays & project retrospects" },
  { n: "06", label: "Off-screen", href: "/personality", desc: "Running, Japan, life beyond the code" },
];

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

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
        <Link className={styles.homeDot} href="/#top" aria-label="Home" onClick={close}>
          <span className={styles.homeDotFace}>
            <svg width="40" height="40" viewBox="0 0 30 30" aria-hidden="true">
              <circle cx="15" cy="12" r="4.4" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" />
              <path d="M6.5 25 a8.5 7 0 0 1 17 0" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" />
            </svg>
          </span>
        </Link>
      </div>
      <div className={styles.side} data-side="right">
        <a
          className={styles.ghPill}
          href="https://github.com/sapphirethunderbird"
          target="_blank"
          rel="noopener"
        >
          GitHub ↗
        </a>
      </div>

      <div className={styles.pill}>
        <Link className={styles.brand} href="/#top" onClick={close}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo/full-color.svg" alt="" aria-hidden="true" className={styles.logoLight} width={22} height={22} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo/mono-orange.svg" alt="" aria-hidden="true" className={styles.logoDark} width={22} height={22} />
          <span>Scarlett Whisnant</span>
        </Link>
        <ThemeToggle />
        <button
          type="button"
          className={styles.menuBtn}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
        >
          <span>menu</span>
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
              aria-label="Close menu"
            >
              ×
            </button>
          </div>
          <div className={styles.sheetBody}>
            <div className="eyebrow" style={{ marginBottom: 22 }}>
              navigate
            </div>
            {ITEMS.map((item) => (
              <Link key={item.n} href={item.href} className={styles.item} onClick={close}>
                <span className={styles.itemN}>{item.n}</span>
                <span className={styles.itemLabel}>{item.label}</span>
                <span className={styles.itemDesc}>{item.desc}</span>
              </Link>
            ))}
            <div className={styles.sheetFoot}>EN / 日本語 · Japan</div>
          </div>
        </div>
      )}
    </nav>
  );
}
