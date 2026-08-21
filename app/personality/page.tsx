import type { Metadata } from "next";
import Link from "next/link";
import { RevealObserver } from "@/components/reveal-observer";
import { TRACKS } from "@/lib/music/tracks";
import { resolveTracks } from "@/lib/music/itunes";
import { JOURNEY } from "@/lib/japan/journey";
import { gradientFor } from "@/lib/cover-gradient";
import styles from "./personality.module.css";

export const metadata: Metadata = {
  title: "Off-screen | Scarlett Whisnant",
  description:
    "The parts that you never got to see: the music keeps me going, the kilometers that clear my head, my adventures through Japan.",
};

// Each doorway leaks live data from its room (SQLite, iTunes cache), so
// render per request; every read degrades gracefully to static art.
export const dynamic = "force-dynamic";

export default async function PersonalityHub() {
  const tracks = await resolveTracks(TRACKS.slice(0, 3));
  const artworks = tracks.map((t) => ({
    url: t.artworkUrl,
    key: `${t.artist}-${t.title}`,
  }));
  const doorways = [
    {
      idx: "/01",
      href: "/personality/music",
      title: "Music",
      proof: "a tribute to the iTunes UI I never got to experience",
      body: "Cover Flow, resurrected, album art tilting in 3D, a click away from a thirty-second preview. The songs are mine; the interface is a love letter.",
      tease: `${TRACKS.length} tracks on the shelf`,
      visual: <CoverFanVisual artworks={artworks} />,
    },
    {
      idx: "/02",
      href: "/personality/running",
      title: "Running",
      proof: "a game about the habit that keeps this site shipping",
      body: "You are the needle. Hold to run, cut a mark with every footfall, and watch it sweep under before you can look. You only see the side you made once you let go.",
      tease: "canvas, web audio, no assets",
      visual: <GrooveRingsVisual />,
    },
    {
      idx: "/03",
      href: "/personality/japan",
      title: "Japan",
      proof: "a country that takes a lifetime to explore, told by scroll",
      body: "Not a camera roll. One continuous journey through the places that rearranged me, chapter by chapter, as far as you're willing to scroll.",
      tease: `${JOURNEY.length} stops down the line`,
      visual: <FilmStripVisual />,
    },
  ];

  return (
    <>
      <RevealObserver />
      <section id="off-screen">
        <div className="sec-head reveal">
          <span className="eyebrow">off-screen</span>
          <h2>The parts that don&apos;t ship</h2>
        </div>

        <p className={`${styles.manifesto} reveal`}>
          Code is maybe a third of the story. This wing of the site holds the
          rest, and because I can&apos;t help myself, each room is also a
          build: an exhibit about me, engineered like everything else here.
        </p>

        <div className={styles.doorways}>
          {doorways.map((d) => (
            <Link key={d.idx} href={d.href} className={`${styles.card} reveal`}>
              <div className={styles.visual} aria-hidden="true">
                {d.visual}
              </div>
              <div className={styles.cardBody}>
                <div className={styles.idx}>{d.idx}</div>
                <h3 className={styles.cardTitle}>{d.title}</h3>
                <div className={styles.proof}>{d.proof}</div>
                <p className={styles.body}>{d.body}</p>
                <span className={styles.tease}>{d.tease}</span>
                <span className={styles.enter}>
                  enter <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

/* ---- doorway visuals: each leaks live data from its room ---------------- */

function CoverFanVisual({
  artworks,
}: {
  artworks: { url: string | null; key: string }[];
}) {
  const positions = [styles.fanLeft, styles.fanCenter, styles.fanRight];
  // Center the first (favorite) cover, fan the rest to the sides.
  const order = [1, 0, 2];
  return (
    <div className={styles.coverFan}>
      {order.map((trackIdx, posIdx) => {
        const art = artworks[trackIdx];
        return (
          <span
            key={posIdx}
            className={`${styles.fanCover} ${positions[posIdx]}`}
            style={
              art?.url
                ? undefined
                : { backgroundImage: gradientFor(art?.key ?? `fan-${posIdx}`) }
            }
          >
            {art?.url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={art.url}
                alt=""
                loading="lazy"
                width={300}
                height={300}
              />
            ) : null}
          </span>
        );
      })}
    </div>
  );
}

function GrooveRingsVisual() {
  // Concentric cuts tightening toward the label: the shape the game reveals.
  const radii = [30, 25.5, 21.5, 18, 15, 12.5, 10.5];
  return (
    <svg
      className={styles.grooveRings}
      viewBox="0 0 120 68"
      preserveAspectRatio="xMidYMid meet"
    >
      {radii.map((r, i) => (
        <circle
          key={r}
          cx="60"
          cy="34"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={i === radii.length - 1 ? 2.2 : 1}
          opacity={0.35 + (i / radii.length) * 0.55}
        />
      ))}
      <circle cx="60" cy="34" r="3.4" fill="currentColor" />
    </svg>
  );
}

function FilmStripVisual() {
  const frames = JOURNEY.slice(0, 3).map(
    (ch) => ch.photos[0]?.gradientKey ?? ch.id,
  );
  return (
    <div className={styles.filmStrip}>
      {frames.map((key) => (
        <span
          key={key}
          className={styles.filmFrame}
          style={{ backgroundImage: gradientFor(key) }}
        />
      ))}
    </div>
  );
}
