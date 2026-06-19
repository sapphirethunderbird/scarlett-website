"use client";

import { useEffect, useState } from "react";
import styles from "./theme-toggle.module.css";

type Theme = "dark" | "light";

function current(): Theme {
  if (typeof document === "undefined") return "dark";
  return (document.documentElement.getAttribute("data-theme") as Theme) || "dark";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  // Sync with whatever the no-FOUC script applied before paint.
  useEffect(() => {
    setTheme(current());
  }, []);

  function toggle() {
    const next: Theme = current() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      // Only write on explicit toggle — first-visit users keep following the OS.
      localStorage.setItem("theme", next);
    } catch {
      /* storage may be unavailable; the in-memory switch still applies */
    }
    setTheme(next);
  }

  // The anomaly crescent doubles as the day/night, threshold/void duality (§3.2).
  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggle}
      aria-label={
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      }
      title={theme === "dark" ? "Light" : "Dark"}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <circle cx="12" cy="12" r="9" className={styles.ring} />
        <circle cx="16" cy="9" r="7.5" className={styles.cut} />
      </svg>
    </button>
  );
}
