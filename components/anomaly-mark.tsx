import styles from "./anomaly-mark.module.css";

/** Small 3×3 mark for the nav brand: 8 squares + the 9th cell as a crescent. */
export function BrandMark() {
  return (
    <svg className={styles.brand} viewBox="0 0 30 30" aria-hidden="true">
      <rect x="0" y="0" width="8" height="8" />
      <rect x="11" y="0" width="8" height="8" />
      <rect x="22" y="0" width="8" height="8" />
      <rect x="0" y="11" width="8" height="8" />
      <rect x="11" y="11" width="8" height="8" />
      <rect x="22" y="11" width="8" height="8" />
      <rect x="0" y="22" width="8" height="8" />
      <rect x="11" y="22" width="8" height="8" />
      <path className={styles.anomalyCell} d="M22 22 a8 8 0 1 0 8 8 a6 6 0 1 1 -8 -8 Z" />
    </svg>
  );
}

/** Large hero mark: 8 cells fade in, the 9th becomes the signal crescent with a slow halo. */
export function HeroMark() {
  const cells = [
    [20, 20],
    [115, 20],
    [210, 20],
    [20, 115],
    [115, 115],
    [210, 115],
    [20, 210],
    [115, 210],
  ];
  return (
    <div className={styles.big} aria-hidden="true">
      <svg viewBox="0 0 300 300">
        {cells.map(([x, y], i) => (
          <rect
            key={`${x}-${y}`}
            className={`${styles.cell} ${styles.f}`}
            x={x}
            y={y}
            width="70"
            height="70"
            rx="4"
            style={{ animationDelay: `${0.05 + i * 0.08}s` }}
          />
        ))}
        {/* the 9th cell: the anomaly, a crescent */}
        <g transform="translate(245,245)">
          <g className={styles.crescent}>
            <circle className={styles.halo} r="46" />
            <circle className={styles.ring} r="35" />
            <circle className={styles.cut} cx="-13" cy="-11" r="30" />
          </g>
        </g>
      </svg>
    </div>
  );
}
