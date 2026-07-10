#!/usr/bin/env node
/**
 * Seed the runs DB with ~3 months of plausible 5K-training data so the
 * dashboard has something honest-looking to render before real data lands.
 *
 *   npm run seed:runs            # no-op if real (non-seed) rows exist
 *   npm run seed:runs -- --reset # wipe seed rows first, then reseed
 *
 * All rows carry source='seed' so a future real import can coexist and the
 * page can badge the data as sample.
 */
import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

const file =
  process.env.RUNS_DB_PATH ?? path.join(process.cwd(), "data", "runs.db");
fs.mkdirSync(path.dirname(file), { recursive: true });
const db = new Database(file);
db.pragma("journal_mode = WAL");
db.exec(`
CREATE TABLE IF NOT EXISTS runs (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  date        TEXT    NOT NULL,
  distance_m  INTEGER NOT NULL,
  duration_s  INTEGER NOT NULL,
  route       TEXT,
  notes       TEXT,
  effort      INTEGER CHECK (effort BETWEEN 1 AND 5),
  shoe        TEXT,
  source      TEXT    NOT NULL DEFAULT 'manual',
  external_id TEXT UNIQUE,
  created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_runs_date ON runs(date);
`);

if (process.argv.includes("--reset")) {
  const { changes } = db.prepare("DELETE FROM runs WHERE source='seed'").run();
  console.log(`Removed ${changes} seed rows.`);
}

const real = db
  .prepare("SELECT COUNT(*) AS n FROM runs WHERE source <> 'seed'")
  .get().n;
if (real > 0) {
  console.log(`Found ${real} real runs — refusing to mix in sample data.`);
  process.exit(0);
}
const seeded = db
  .prepare("SELECT COUNT(*) AS n FROM runs WHERE source='seed'")
  .get().n;
if (seeded > 0) {
  console.log(`Already seeded (${seeded} rows). Use --reset to reseed.`);
  process.exit(0);
}

// Deterministic PRNG so reruns produce the same plausible log.
function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(20260710);
const pick = (arr) => arr[Math.floor(rand() * arr.length)];

const ROUTES = [
  "Ube coastal loop",
  "riverside out-and-back",
  "campus perimeter",
  "shrine hill repeats",
  "station-to-station",
];
const NOTES = [
  null,
  null,
  null,
  "knee behaved today",
  "negative split, barely",
  "humid. everything was soup",
  "new playlist carried the last km",
  "easy pace, hard to keep easy",
  null,
  "cut short — knee said no",
];

// ~12 weeks of 5K training: 2–3 runs/week, mostly 3–6 km, pace slowly
// improving from ~7:40/km toward ~6:40/km, one longer weekend run.
const insert = db.prepare(`
  INSERT INTO runs (date, distance_m, duration_s, route, notes, effort, shoe, source)
  VALUES (@date, @distance_m, @duration_s, @route, @notes, @effort, 'Pegasus 41', 'seed')
`);

const today = new Date();
const rows = [];
for (let week = 11; week >= 0; week--) {
  const runsThisWeek = rand() < 0.35 ? 2 : 3;
  const days = [...new Set([1 + Math.floor(rand() * 2), 3 + Math.floor(rand() * 2), 6])]
    .slice(0, runsThisWeek);
  for (const day of days) {
    const d = new Date(today);
    d.setDate(today.getDate() - week * 7 - (6 - day));
    if (d > today) continue;
    const progress = (11 - week) / 11; // 0 → 1 over the block
    const isLong = day === 6;
    const km = isLong
      ? 5 + progress * 3 + rand() * 1.2 // long run grows 5 → 8 km
      : 3 + rand() * 2.2; // easy days 3–5.2 km
    const paceSec = 460 - progress * 60 + (rand() - 0.5) * 40; // ~7:40 → ~6:40
    const distanceM = Math.round(km * 1000);
    rows.push({
      date: d.toISOString().slice(0, 10),
      distance_m: distanceM,
      duration_s: Math.round((distanceM / 1000) * paceSec),
      route: pick(ROUTES),
      notes: pick(NOTES),
      effort: isLong ? 3 + Math.floor(rand() * 2) : 2 + Math.floor(rand() * 2),
    });
  }
}

const insertAll = db.transaction((all) => {
  for (const r of all) insert.run(r);
});
insertAll(rows);
console.log(`Seeded ${rows.length} sample runs into ${file}`);
