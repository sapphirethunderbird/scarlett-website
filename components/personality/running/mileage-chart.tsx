import type { WeekBucket } from "@/lib/runs/types";
import { formatKm } from "@/lib/runs/format";
import styles from "./mileage-chart.module.css";

/**
 * Hand-rolled inline-SVG bar chart: trailing 12 weeks of mileage.
 * Single series in the accent hue; current week gets the hover tint plus a
 * direct label (as does the peak); every bar carries a <title> for
 * hover/assistive tech. Axes stay recessive — a baseline and one max label.
 */

const W = 520;
const H = 170;
const PLOT_TOP = 22;
const PLOT_BOTTOM = H - 26;
const BAR_W = 26;

/** Bar with only its data-end (top) rounded, anchored flat on the baseline. */
function barPath(x: number, y: number, w: number, h: number, r: number): string {
  const rr = Math.min(r, h, w / 2);
  return [
    `M${x},${y + h}`,
    `V${y + rr}`,
    `Q${x},${y} ${x + rr},${y}`,
    `H${x + w - rr}`,
    `Q${x + w},${y} ${x + w},${y + rr}`,
    `V${y + h}`,
    "Z",
  ].join(" ");
}

function weekLabel(weekStart: string): string {
  return new Date(`${weekStart}T12:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function MileageChart({ weekly }: { weekly: WeekBucket[] }) {
  const maxKm = Math.max(5, Math.ceil(Math.max(...weekly.map((w) => w.km)) / 5) * 5);
  const plotH = PLOT_BOTTOM - PLOT_TOP;
  const slot = W / weekly.length;
  const peakIdx = weekly.reduce(
    (best, w, i) => (w.km > weekly[best].km ? i : best),
    0,
  );
  const currentIdx = weekly.length - 1;

  return (
    <figure className={styles.figure}>
      <figcaption className={styles.caption}>
        <span className="eyebrow">weekly mileage</span>
        <span className={styles.captionRange}>last 12 weeks · km</span>
      </figcaption>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className={styles.chart}
        role="img"
        aria-label={`Weekly mileage for the last 12 weeks, peaking at ${formatKm(weekly[peakIdx].km)} kilometers in the week of ${weekLabel(weekly[peakIdx].weekStart)}.`}
      >
        {/* recessive scale hint: max line + label */}
        <line
          x1="0"
          x2={W}
          y1={PLOT_TOP}
          y2={PLOT_TOP}
          className={styles.gridline}
        />
        <text x="0" y={PLOT_TOP - 8} className={styles.axisText}>
          {maxKm} km
        </text>

        {weekly.map((w, i) => {
          const h = Math.max(w.km > 0 ? 3 : 2, (w.km / maxKm) * plotH);
          const x = i * slot + (slot - BAR_W) / 2;
          const y = PLOT_BOTTOM - h;
          const isCurrent = i === currentIdx;
          const labeled = i === peakIdx || isCurrent;
          return (
            <g key={w.weekStart}>
              <path
                d={barPath(x, y, BAR_W, h, 4)}
                className={
                  w.km === 0
                    ? styles.barEmpty
                    : isCurrent
                      ? styles.barCurrent
                      : styles.bar
                }
              >
                <title>{`week of ${weekLabel(w.weekStart)} — ${formatKm(w.km)} km`}</title>
              </path>
              {labeled && w.km > 0 ? (
                <text
                  x={x + BAR_W / 2}
                  y={y - 6}
                  textAnchor="middle"
                  className={styles.barLabel}
                >
                  {formatKm(w.km)}
                </text>
              ) : null}
              {i % 2 === 0 ? (
                <text
                  x={i * slot + slot / 2}
                  y={H - 8}
                  textAnchor="middle"
                  className={styles.axisText}
                >
                  {weekLabel(w.weekStart)}
                </text>
              ) : null}
            </g>
          );
        })}
        <line
          x1="0"
          x2={W}
          y1={PLOT_BOTTOM}
          y2={PLOT_BOTTOM}
          className={styles.baseline}
        />
      </svg>
    </figure>
  );
}
