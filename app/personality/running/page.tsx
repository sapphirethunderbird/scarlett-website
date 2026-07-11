import type { Metadata } from "next";
import { RevealObserver } from "@/components/reveal-observer";
import { NextRoom } from "@/components/personality/next-room";
import { MileageChart } from "@/components/personality/running/mileage-chart";
import { getRunStats } from "@/lib/runs/queries";
import {
  formatDuration,
  formatKm,
  formatPace,
  formatRunDate,
} from "@/lib/runs/format";
import type { Run, RunStats } from "@/lib/runs/types";
import styles from "./running.module.css";

export const metadata: Metadata = {
  title: "Running | Scarlett Whisnant",
  description:
    "Kilometers on record: distance, pace, and stubbornness, straight from a database.",
};

// The data changes outside of builds (SQLite on the server), so render per request.
export const dynamic = "force-dynamic";

export default function RunningPage() {
  const stats = getRunStats();
  const hasRuns = stats !== null && stats.totalRuns > 0;

  return (
    <>
      <RevealObserver />
      <section id="running">
        <div className="sec-head reveal">
          <span className="eyebrow">off-screen / running</span>
          <h2>Kilometers on record</h2>
        </div>

        <p className={`${styles.intro} reveal`}>
          I started from genuinely terrible, so I keep receipts. Every run on
          this page is a row in a SQLite database on this server, read straight
          into the page. Schema, seed, and chart all part of the build. Pace is
          never stored; it&apos;s derived, like confidence.
        </p>

        {hasRuns ? (
          <Dashboard stats={stats} />
        ) : (
          <div className={`${styles.empty} reveal`}>
            <p className={styles.emptyLead}>
              The table exists. The rows are coming.
            </p>
            <p className={styles.emptyBody}>
              A knee is being negotiated with. Until the log starts filling,
              this is the honest state of the database:{" "}
              <code>SELECT COUNT(*) FROM runs; → 0</code>
            </p>
          </div>
        )}

        <NextRoom current="running" />
      </section>
    </>
  );
}

function Dashboard({ stats }: { stats: RunStats }) {
  const { records } = stats;
  return (
    <>
      {stats.sampleData ? (
        <p className={`${styles.sampleBadge} reveal`}>
          sample data, the schema is real, the log starts with the next run
        </p>
      ) : null}

      <div className={`${styles.statGrid} reveal`}>
        <div className={styles.stat}>
          <span className={styles.statValue}>{formatKm(stats.totalKm)}</span>
          <span className={styles.statLabel}>kilometers logged</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{stats.totalRuns}</span>
          <span className={styles.statLabel}>runs</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>
            {stats.totalHours.toFixed(1)}
          </span>
          <span className={styles.statLabel}>hours on feet</span>
        </div>
      </div>

      <div className="reveal">
        <MileageChart weekly={stats.weekly} />
      </div>

      <div className={`${styles.records} reveal`}>
        {records.longest ? (
          <RecordCard
            label="longest run"
            value={`${formatKm(records.longest.distanceM / 1000)} km`}
            detail={`${formatRunDate(records.longest.date)}${records.longest.route ? ` · ${records.longest.route}` : ""}`}
          />
        ) : null}
        {records.bestPace ? (
          <RecordCard
            label="best pace"
            value={formatPace(records.bestPace)}
            detail={`over ${formatKm(records.bestPace.distanceM / 1000)} km · ${formatRunDate(records.bestPace.date)}`}
          />
        ) : null}
        {records.biggestWeek ? (
          <RecordCard
            label="biggest week"
            value={`${formatKm(records.biggestWeek.km)} km`}
            detail={`week of ${formatRunDate(records.biggestWeek.weekStart)}`}
          />
        ) : null}
      </div>

      <div className={`${styles.recent} reveal`}>
        <span className={`eyebrow ${styles.recentHead}`}>recent runs</span>
        <ol className={styles.runList}>
          {stats.recent.map((r) => (
            <RunRow key={r.id} run={r} />
          ))}
        </ol>
      </div>
    </>
  );
}

function RecordCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className={styles.recordCard}>
      <span className={styles.recordLabel}>{label}</span>
      <span className={styles.recordValue}>{value}</span>
      <span className={styles.recordDetail}>{detail}</span>
    </div>
  );
}

function RunRow({ run }: { run: Run }) {
  return (
    <li className={styles.runRow}>
      <span className={styles.runDate}>{formatRunDate(run.date)}</span>
      <span className={styles.runDistance}>
        {formatKm(run.distanceM / 1000)} km
      </span>
      <span className={styles.runPace}>{formatPace(run)}</span>
      <span className={styles.runDuration}>
        {formatDuration(run.durationS)}
      </span>
      <span
        className={styles.runEffort}
        aria-label={run.effort ? `effort ${run.effort} of 5` : undefined}
      >
        {run.effort
          ? Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className={i < run.effort! ? styles.dotOn : styles.dotOff}
                aria-hidden="true"
              />
            ))
          : null}
      </span>
      <span className={styles.runRoute}>
        {run.route}
        {run.notes ? (
          <span className={styles.runNotes}> - {run.notes}</span>
        ) : null}
      </span>
    </li>
  );
}
