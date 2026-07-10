import type { Metadata } from "next";
import { RevealObserver } from "@/components/reveal-observer";
import { NextRoom } from "@/components/personality/next-room";
import { CoverFlow } from "@/components/personality/music/cover-flow";
import { TRACKS } from "@/lib/music/tracks";
import { resolveTracks } from "@/lib/music/itunes";
import styles from "./music.module.css";

export const metadata: Metadata = {
  title: "Music | Scarlett Whisnant",
  description:
    "A Cover Flow tribute to the old iTunes UI with the songs I keep coming back to, each with thirty-second previews.",
};

// Re-resolve artwork/preview URLs daily; Apple rotates its CDN links, so
// they must never be baked in at build time forever.
export const revalidate = 86400;

export default async function MusicPage() {
  const tracks = await resolveTracks(TRACKS);

  return (
    <>
      <RevealObserver />
      <section id="music">
        <div className="sec-head reveal">
          <span className="eyebrow">off-screen / music</span>
          <h2>Cover Flow, resurrected</h2>
        </div>

        <p className={`${styles.intro} reveal`}>
          Back before my time, when you wanted to listen to something, you
          flipped through albums. This is my tribute to the old iTunes UI that I
          never got to experience. Rebuilt from scratch in CSS 3D, wired to
          Apple&apos;s old iTunes Search API for the artwork and thirty-second
          previews. Here's a small portion of my music taste.
        </p>

        <div className="reveal">
          <CoverFlow tracks={tracks} />
        </div>

        <p className={styles.credit}>
          artwork &amp; previews via the iTunes Search API · nothing is tracked,
          nothing is stored
        </p>

        <NextRoom current="music" />
      </section>
    </>
  );
}
