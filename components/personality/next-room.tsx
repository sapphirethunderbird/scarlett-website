import Link from "next/link";
import styles from "./next-room.module.css";

/**
 * The section reads as one connected exhibit: every room ends with a door to
 * the next one, cycling music → running → japan → back to the hub.
 */

type Room = "music" | "running" | "japan";

const NEXT: Record<Room, { href: string; label: string; tease: string }> = {
  music: {
    href: "/personality/running",
    label: "running",
    tease: "the kilometers that clear my head",
  },
  running: {
    href: "/personality/japan",
    label: "japan",
    tease: "a country learned by train",
  },
  japan: {
    href: "/personality",
    label: "back to the hub",
    tease: "three doorways, seen from outside",
  },
};

export function NextRoom({ current }: { current: Room }) {
  const next = NEXT[current];
  return (
    <div className={styles.nextRoom}>
      <span className="eyebrow">next room</span>
      <Link href={next.href} className={styles.link}>
        <span className={styles.label}>{next.label}</span>
        <span className={styles.tease}>{next.tease}</span>
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
      </Link>
    </div>
  );
}
