import type { Metadata } from "next";
import { RevealObserver } from "@/components/reveal-observer";
import { NextRoom } from "@/components/personality/next-room";
import { TheGroove } from "@/components/personality/running/the-groove";
import styles from "./running.module.css";

export const metadata: Metadata = {
  title: "The Groove | Scarlett Whisnant",
  description:
    "A running game where you are the needle: hold to run, cut the record, and you only see the side you made once you let go.",
};

export default function RunningPage() {
  return (
    <>
      <RevealObserver />
      <section id="running">
        <div className="sec-head reveal">
          <span className="eyebrow">off-screen / running</span>
          <h2>You are the needle</h2>
        </div>

        <p className={`${styles.intro} reveal`}>
          Running is the part of my life with no interface, so I built one.
          <em> The Groove</em> puts you inside a record: hold to run, and every
          footfall cuts a mark into the floor ahead of you, then sweeps under
          before you can look at it.
          Speed spends breath, distance buys back the shimmer, and the canyon
          narrows the whole way in, exactly like the grooves on a record do.
          Sound on: everything you hear is the run itself, played back.
        </p>

        <div className="reveal">
          <TheGroove />
        </div>

        <p className={`${styles.caption} reveal`}>
          Canvas, Web Audio, no assets. The last eight notes lock into a loop
          that never ends on its own &mdash; the only way out is to stop
          running.
        </p>

        <NextRoom current="running" />
      </section>
    </>
  );
}
