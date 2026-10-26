import Link from "next/link";
import type { Dictionary } from "@/lib/i18n";
import { localeHref, type Locale } from "@/lib/i18n/config";
import styles from "./next-room.module.css";

/**
 * The section reads as one connected exhibit: every room ends with a door to
 * the next one, cycling music → running → japan → back to the hub.
 */

type Room = "music" | "running" | "japan";

/** Which room each room hands you to, and the dictionary key that names it. */
const NEXT: Record<Room, { href: string; key: "running" | "japan" | "hub" }> = {
  music: { href: "/personality/running", key: "running" },
  running: { href: "/personality/japan", key: "japan" },
  japan: { href: "/personality", key: "hub" },
};

export function NextRoom({
  current,
  locale,
  copy,
}: {
  current: Room;
  locale: Locale;
  copy: Dictionary["personality"]["nextRoom"];
}) {
  const next = NEXT[current];
  const { label, tease } = copy[next.key];

  return (
    <div className={styles.nextRoom}>
      <span className="eyebrow">{copy.eyebrow}</span>
      <Link href={localeHref(next.href, locale)} className={styles.link}>
        <span className={styles.label}>{label}</span>
        <span className={styles.tease}>{tease}</span>
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
      </Link>
    </div>
  );
}
