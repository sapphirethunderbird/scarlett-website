import styles from "./journey-progress.module.css";

/**
 * A 2px line along the top of the viewport tracking scroll progress — the
 * journey's "how far down the line are we". Pure CSS via
 * `animation-timeline: scroll(root)`; browsers without scroll-driven
 * animations simply don't show it (the base experience needs no chrome).
 */
export function JourneyProgress() {
  return <div className={styles.progress} aria-hidden="true" />;
}
