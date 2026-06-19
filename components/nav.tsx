"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";
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
      <Link className={styles.brand} href="/#top" aria-label="Home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo/full-color.svg" alt="" aria-hidden="true" className={styles.logoLight} width={26} height={26} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo/mono-orange.svg" alt="" aria-hidden="true" className={styles.logoDark} width={26} height={26} />
        <span>Scarlett Whisnant</span>
      </Link>
      <div className={styles.right}>
        <div className={styles.links}>
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
}
