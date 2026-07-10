import { getDb } from "./db";
import type { Run, RunStats, WeekBucket } from "./types";

interface RunRow {
  id: number;
  date: string;
  distance_m: number;
  duration_s: number;
  route: string | null;
  notes: string | null;
  effort: number | null;
  shoe: string | null;
  source: string;
}

function toRun(r: RunRow): Run {
  return {
    id: r.id,
    date: r.date,
    distanceM: r.distance_m,
    durationS: r.duration_s,
    route: r.route,
    notes: r.notes,
    effort: r.effort,
    shoe: r.shoe,
  };
}

/** ISO date of the Monday of the week containing `d` (local time). */
function mondayOf(d: Date): string {
  const day = (d.getDay() + 6) % 7; // Mon=0 … Sun=6
  const monday = new Date(d);
  monday.setDate(d.getDate() - day);
  const y = monday.getFullYear();
  const m = String(monday.getMonth() + 1).padStart(2, "0");
  const dd = String(monday.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}

/**
 * All dashboard numbers in one pass. Returns null only when the DB itself is
 * unavailable; an empty table yields zeroed stats (the designed empty state).
 * The dataset is a personal run log — aggregating in JS is simpler than SQL
 * window functions and never a bottleneck at this size.
 */
export function getRunStats(): RunStats | null {
  const db = getDb();
  if (!db) return null;

  const rows = db
    .prepare("SELECT * FROM runs ORDER BY date DESC, id DESC")
    .all() as RunRow[];
  const runs = rows.map(toRun);

  const totalM = runs.reduce((s, r) => s + r.distanceM, 0);
  const totalS = runs.reduce((s, r) => s + r.durationS, 0);

  // Trailing 12 ISO weeks, zero-filled, oldest first.
  const weekKm = new Map<string, number>();
  for (const r of runs) {
    const wk = mondayOf(new Date(`${r.date}T12:00:00`));
    weekKm.set(wk, (weekKm.get(wk) ?? 0) + r.distanceM / 1000);
  }
  const weekly: WeekBucket[] = [];
  const now = new Date();
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i * 7);
    const weekStart = mondayOf(d);
    weekly.push({ weekStart, km: weekKm.get(weekStart) ?? 0 });
  }

  let longest: Run | null = null;
  let bestPace: Run | null = null;
  for (const r of runs) {
    if (!longest || r.distanceM > longest.distanceM) longest = r;
    if (r.distanceM >= 1000) {
      if (
        !bestPace ||
        r.durationS / r.distanceM < bestPace.durationS / bestPace.distanceM
      ) {
        bestPace = r;
      }
    }
  }
  let biggestWeek: WeekBucket | null = null;
  for (const [weekStart, km] of weekKm) {
    if (!biggestWeek || km > biggestWeek.km) biggestWeek = { weekStart, km };
  }

  return {
    totalKm: totalM / 1000,
    totalRuns: runs.length,
    totalHours: totalS / 3600,
    weekly,
    records: { longest, bestPace, biggestWeek },
    recent: runs.slice(0, 10),
    sampleData: rows.length > 0 && rows.every((r) => r.source === "seed"),
  };
}
