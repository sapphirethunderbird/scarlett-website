export interface Run {
  id: number;
  /** ISO 'YYYY-MM-DD'. */
  date: string;
  /** Meters — integer math, exact pace. */
  distanceM: number;
  /** Seconds. */
  durationS: number;
  route: string | null;
  notes: string | null;
  /** Perceived effort 1–5. */
  effort: number | null;
  shoe: string | null;
}

export interface WeekBucket {
  /** ISO date of the week's Monday. */
  weekStart: string;
  km: number;
}

export interface RunStats {
  totalKm: number;
  totalRuns: number;
  totalHours: number;
  /** Trailing 12 ISO weeks, zero-filled, oldest first. */
  weekly: WeekBucket[];
  records: {
    longest: Run | null;
    /** Fastest pace among runs of at least 1 km. */
    bestPace: Run | null;
    biggestWeek: WeekBucket | null;
  };
  /** Most recent runs, newest first. */
  recent: Run[];
  /** True when every row is seeded sample data (badge it honestly). */
  sampleData: boolean;
}
