import type { Metadata } from "next";
import Link from "next/link";
import { RevealObserver } from "@/components/reveal-observer";
import { TRACKS } from "@/lib/music/tracks";
import { resolveTracks } from "@/lib/music/itunes";
import { getJourney, type JourneyChapter } from "@/lib/japan/journey";
import { gradientFor } from "@/lib/cover-gradient";
import { fill, getDictionary, resolveLocale } from "@/lib/i18n";
import { OG_LOCALE, languageAlternates, localeHref } from "@/lib/i18n/config";
import styles from "./personality.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const meta = getDictionary(locale).meta.personality;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: localeHref("/personality", locale),
      languages: languageAlternates("/personality"),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      locale: OG_LOCALE[locale],
    },
  };
}

// Each doorway leaks live data from its room (SQLite, iTunes cache), so
// render per request; every read degrades gracefully to static art.
export const dynamic = "force-dynamic";

export default async function PersonalityHub({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = resolveLocale((await params).locale);
  const d = getDictionary(locale).personality.hub;
  const journey = getJourney(locale);
  const tracks = await resolveTracks(TRACKS.slice(0, 3));
  const artworks = tracks.map((t) => ({
    url: t.artworkUrl,
    key: `${t.artist}-${t.title}`,
  }));
  const doorways = [
    {
      idx: "/01",
      href: "/personality/music",
      ...d.rooms.music,
      tease: fill(d.rooms.music.tease, { count: TRACKS.length }),
      visual: <CoverFanVisual artworks={artworks} />,
    },
    {
      idx: "/02",
      href: "/personality/running",
      ...d.rooms.running,
      visual: <GrooveRingsVisual />,
    },
    {
      idx: "/03",
      href: "/personality/japan",
      ...d.rooms.japan,
      tease: fill(d.rooms.japan.tease, { count: journey.length }),
      visual: <FilmStripVisual journey={journey} />,
    },
  ];

  return (
    <>
      <RevealObserver />
      <section id="off-screen">
        <div className="sec-head reveal">
          <span className="eyebrow">{d.eyebrow}</span>
          <h2>{d.heading}</h2>
        </div>

        <p className={`${styles.manifesto} reveal`}>{d.manifesto}</p>

        <div className={styles.doorways}>
          {doorways.map((door) => (
            <Link
              key={door.idx}
              href={localeHref(door.href, locale)}
              className={`${styles.card} reveal`}
            >
              <div className={styles.visual} aria-hidden="true">
                {door.visual}
              </div>
              <div className={styles.cardBody}>
                <div className={styles.idx}>{door.idx}</div>
                <h3 className={styles.cardTitle}>{door.title}</h3>
                <div className={styles.proof}>{door.proof}</div>
                <p className={styles.body}>{door.body}</p>
                <span className={styles.tease}>{door.tease}</span>
                <span className={styles.enter}>
                  {d.enter} <span aria-hidden="true">→</span>
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

function FilmStripVisual({ journey }: { journey: JourneyChapter[] }) {
  const frames = journey.slice(0, 3).map(
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
