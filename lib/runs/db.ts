import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import type DatabaseType from "better-sqlite3";

/**
 * Lazy singleton over a local SQLite file. Reads happen synchronously in
 * server components — no API route, which matters here: Caddy proxies all
 * /api/* (except /api/contact) to a different backend entirely.
 *
 * The DB path comes from RUNS_DB_PATH; prod points it OUTSIDE the release
 * dir (/var/lib/scarlett-web/runs.db) so data persists across deploys.
 * Dev defaults to ./data/runs.db (gitignored).
 *
 * Any failure to load the native module or open the file degrades to null —
 * the page renders its designed empty state instead of a 500, mirroring the
 * missing-config guard in /api/contact.
 */

const require = createRequire(import.meta.url);

let db: DatabaseType.Database | null = null;
let failed = false;

const SCHEMA = `
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
`;

export function runsDbPath(): string {
  return (
    process.env.RUNS_DB_PATH ?? path.join(process.cwd(), "data", "runs.db")
  );
}

export function getDb(): DatabaseType.Database | null {
  if (failed) return null;
  if (db) return db;
  try {
    const Database = require("better-sqlite3") as typeof DatabaseType;
    const file = runsDbPath();
    fs.mkdirSync(path.dirname(file), { recursive: true });
    db = new Database(file);
    db.pragma("journal_mode = WAL");
    db.exec(SCHEMA);
    return db;
  } catch (err) {
    console.error("[runs] database unavailable:", err);
    failed = true;
    return null;
  }
}
