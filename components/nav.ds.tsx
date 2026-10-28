"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";
// Design-sync previews render prop-free, so this variant pins the English copy
// rather than taking a locale.
import { en } from "@/lib/i18n/dictionaries/en";
import styles from "./nav.module.css";

const LINKS = [
  { href: "/#about", label: "about" },
  { href: "/#work", label: "work" },
  { href: "/blog", label: "writing" },
  { href: "/personality", label: "off-screen" },
  { href: "/#ask", label: "ask" },
  { href: "/#contact", label: "contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <a className={styles.brand} href="/#top" aria-label="Home">
        <img src="/logo/full-color.svg" alt="" aria-hidden="true" className={styles.logoLight} width={26} height={26} />
        <img src="/logo/mono-orange.svg" alt="" aria-hidden="true" className={styles.logoDark} width={26} height={26} />
        <span>Scarlett Whisnant</span>
      </a>
      <div className={styles.right}>
        <div className={styles.links}>
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </div>
        <ThemeToggle copy={en.theme} />
      </div>
    </nav>
  );
}
