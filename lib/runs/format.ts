import type { Run } from "./types";

/** 5.2 → "5.2", 12 → "12" — one decimal only when it earns its place. */
export function formatKm(km: number): string {
  return km >= 100 ? String(Math.round(km)) : km.toFixed(1).replace(/\.0$/, "");
}

/** Seconds-per-km → "6:24 /km". */
export function formatPace(run: Pick<Run, "distanceM" | "durationS">): string {
  if (run.distanceM <= 0) return "—";
  const secPerKm = run.durationS / (run.distanceM / 1000);
  const m = Math.floor(secPerKm / 60);
  const s = Math.round(secPerKm % 60);
  return `${m}:${String(s).padStart(2, "0")} /km`;
}

/** Seconds → "42:10" or "1:03:22". */
export function formatDuration(durationS: number): string {
  const h = Math.floor(durationS / 3600);
  const m = Math.floor((durationS % 3600) / 60);
  const s = Math.round(durationS % 60);
  return h > 0
    ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
    : `${m}:${String(s).padStart(2, "0")}`;
}

/** '2026-07-08' → 'Jul 8'. */
export function formatRunDate(date: string): string {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
