import type { Metadata } from "next";
import { RevealObserver } from "@/components/reveal-observer";
import { NextRoom } from "@/components/personality/next-room";
import { Chapter } from "@/components/personality/japan/chapter";
import { JourneyProgress } from "@/components/personality/japan/journey-progress";
import { JOURNEY } from "@/lib/japan/journey";
import styles from "./japan.module.css";

export const metadata: Metadata = {
  title: "Japan | Scarlett Whisnant",
  description:
    "A country learned by train, told by scroll. One continuous journey through the places that rearranged me.",
};

export default function JapanPage() {
  return (
    <>
      <RevealObserver />
      <JourneyProgress />
      <section id="japan">
        <div className="sec-head reveal">
          <span className="eyebrow">off-screen / japan</span>
          <h2>A country learned by train</h2>
        </div>

        <p className={`${styles.intro} reveal`}>
          I didn&apos;t visit Japan; it happened to me, starting at age eleven.
          So this isn&apos;t a photo grid or an itinerary. It&apos;s the line
          I&apos;ve been riding since, told stop by stop. Scroll to board. The
          thin line at the top of the screen is how far down the track you are.
        </p>

        <div className={styles.chapters}>
          {JOURNEY.map((chapter, i) => (
            <Chapter key={chapter.id} chapter={chapter} index={i} />
          ))}
        </div>

        <NextRoom current="japan" />
      </section>
    </>
  );
}
