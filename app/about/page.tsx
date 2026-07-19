import type { Metadata } from "next";
import Link from "next/link";
import { RevealObserver } from "@/components/reveal-observer";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About | Scarlett Whisnant",
  description:
    "The long version: moving to Japan at eleven with zero Japanese, a national university the domestic way, and why I build technology for the people existing systems forgot.",
  openGraph: {
    title: "About | Scarlett Whisnant",
    description:
      "The long version: Japan at eleven, a national university the domestic way, and why I build for the people existing systems forgot.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <RevealObserver />
      <section id="story">
        <div className="sec-head reveal">
          <span className="eyebrow">about — the long version</span>
          <h1 className={styles.title}>The person behind the build</h1>
        </div>

        <article className={styles.story}>
          <div className={`${styles.chapter} reveal`}>
            <p className={styles.pull}>
              I&apos;m not the person who&apos;s sure. I&apos;m the person who
              tries when it matters, even when it looks hopeless, and then I
              make it mine.
            </p>
            <p className={styles.body}>
              That sentence is the shortest honest version of my story. The
              longer one starts on the other side of the Pacific, in a
              classroom where I couldn&apos;t read the board.
            </p>
          </div>

          <div className={`${styles.chapter} reveal`}>
            <h2 className={styles.marker}>
              <span className={styles.markerNum}>01</span>
              <span className={styles.markerLabel}>Japan</span>
            </h2>
            <p className={styles.body}>
              I moved to Japan at eleven, in 2016, with zero Japanese. Not
              conversational-but-rusty zero, actual zero. I went into Japanese
              public school anyway: every class, every test, every hallway
              conversation in a language I was learning in real time, in a
              system with no lane for someone like me.
            </p>
            <p className={styles.body}>
              It was the first time I learned the move that now defines
              everything I do: <b>I get fluent fast in systems that
              weren&apos;t built for me.</b>{" "}Not because I&apos;m fearless,
              but because staying lost was the only alternative on offer.
            </p>
          </div>

          <div className={`${styles.chapter} reveal`}>
            <h2 className={styles.marker}>
              <span className={styles.markerNum}>02</span>
              <span className={styles.markerLabel}>University</span>
            </h2>
            <p className={styles.body}>
              I got into a national university the domestic way, the same
              entrance path as everyone who grew up here. No exchange-student
              lane, no international-admissions side door. I&apos;m now at
              Yamaguchi University in the Faculty of Global and Science
              Studies, graduating March 2027, fully bilingual in English and
              Japanese.
            </p>
            <p className={styles.body}>
              Doing school in a second language teaches you something no
              curriculum does: what it feels like to be capable and still
              locked out, when the barrier isn&apos;t your ability but the
              interface between you and the institution.
            </p>
          </div>

          <div className={`${styles.chapter} reveal`}>
            <h2 className={styles.marker}>
              <span className={styles.markerNum}>03</span>
              <span className={styles.markerLabel}>Why I build</span>
            </h2>
            <p className={styles.body}>
              That experience is the through-line in everything I make: human
              communication, institutional failure, and AI as a tool for
              handing people back some agency. I build both the front and back ends 
              of the systems I make, and I test them with the people they&apos;re actually for.
            </p>
            <p className={styles.body}>
              A burnout predictor with a vision model I trained
              myself, a course-feedback system my team pivoted under deadline
              that earned a university press release, an AAC communication app
              tested with the people it&apos;s actually for.
            </p>
            <p className={styles.body}>
              When my understanding deepens, I go back and rebuild my earlier
              work in the open instead of hiding it. The mixed results taught
              me more than the wins: <b>listen more before building more.</b>{" "}
              <Link href="/projects" className={styles.link}>
                see the build log →
              </Link>
            </p>
          </div>

          <div className={`${styles.chapter} reveal`}>
            <h2 className={styles.marker}>
              <span className={styles.markerNum}>04</span>
              <span className={styles.markerLabel}>What I believe</span>
            </h2>
            <div className={styles.beliefs}>
              <div className={styles.belief}>
                <span>→</span> Talk to people. Don&apos;t assume.
              </div>
              <div className={styles.belief}>
                <span>→</span> Agency shouldn&apos;t require a technical
                background.
              </div>
              <div className={styles.belief}>
                <span>→</span> It&apos;s never the user&apos;s fault. Fix it.
              </div>
            </div>
          </div>

          <div className={`${styles.chapter} reveal`}>
            <h2 className={styles.marker}>
              <span className={styles.markerNum}>05</span>
              <span className={styles.markerLabel}>Off the screen</span>
            </h2>
            <p className={styles.body}>
              I run. I started from genuinely terrible. The dreaded PE
              distance run was my nemesis, and picked it up anyway because it
              felt impossible. Now I&apos;m training through scorching heat
              toward a 5K, a marathon eventually. Same move as everything else
              here: <b>pick the hard thing, start from zero, make it mine.</b>{" "}
              <Link href="/personality" className={styles.link}>
                the rest lives off-screen →
              </Link>
            </p>
          </div>

          <div className={`${styles.chapter} reveal`}>
            <h2 className={styles.marker}>
              <span className={styles.markerNum}>06</span>
              <span className={styles.markerLabel}>Now</span>
            </h2>
            <p className={styles.body}>
              I&apos;m headed toward early-career roles that blend technical
              depth with human-facing work. Solutions Engineering, Technical
              Account Management, AI implementation, Developer Relations, AI
              product. I&apos;m a US citizen, so no visa sponsorship is needed
              for US roles.
            </p>
            <p className={styles.body}>
              If any of this sounds like someone you want on your team,{" "}
              <Link href="/#contact" className={styles.link}>
                get in touch →
              </Link>
            </p>
          </div>
        </article>
      </section>
    </>
  );
}
