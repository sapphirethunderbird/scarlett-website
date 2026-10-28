import type { Metadata } from "next";
import Link from "next/link";
import { RevealObserver } from "@/components/reveal-observer";
import { getDictionary, resolveLocale } from "@/lib/i18n";
import {
  OG_LOCALE,
  languageAlternates,
  localeHref,
} from "@/lib/i18n/config";
import styles from "./about.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const { about } = getDictionary(locale).meta;

  return {
    title: about.title,
    description: about.description,
    alternates: {
      canonical: localeHref("/about", locale),
      languages: languageAlternates("/about"),
    },
    openGraph: {
      title: about.title,
      description: about.ogDescription,
      type: "website",
      locale: OG_LOCALE[locale],
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = resolveLocale((await params).locale);
  const d = getDictionary(locale).about;
  const c = d.chapters;

  return (
    <>
      <RevealObserver />
      <section id="story">
        <div className="sec-head reveal">
          <span className="eyebrow">{d.eyebrow}</span>
          <h1 className={styles.title}>{d.title}</h1>
        </div>

        <article className={styles.story}>
          <div className={`${styles.chapter} reveal`}>
            <p className={styles.pull}>{d.pull}</p>
            <p className={styles.body}>{d.pullAfter}</p>
          </div>

          <div className={`${styles.chapter} reveal`}>
            <Marker num="01" label={c.japan.label} />
            <p className={styles.body}>{c.japan.p1}</p>
            <p className={styles.body}>
              {c.japan.p2Before}
              <b>{c.japan.p2Strong}</b>{" "}
              {c.japan.p2After}
            </p>
          </div>

          <div className={`${styles.chapter} reveal`}>
            <Marker num="02" label={c.university.label} />
            <p className={styles.body}>{c.university.p1}</p>
            <p className={styles.body}>{c.university.p2}</p>
          </div>

          <div className={`${styles.chapter} reveal`}>
            <Marker num="03" label={c.why.label} />
            <p className={styles.body}>{c.why.p1}</p>
            <p className={styles.body}>{c.why.p2}</p>
            <p className={styles.body}>
              {c.why.p3Before}
              <b>{c.why.p3Strong}</b>{" "}
              <Link href={localeHref("/projects", locale)} className={styles.link}>
                {c.why.p3Link}
              </Link>
            </p>
          </div>

          <div className={`${styles.chapter} reveal`}>
            <Marker num="04" label={c.believe.label} />
            <div className={styles.beliefs}>
              {c.believe.beliefs.map((belief) => (
                <div key={belief} className={styles.belief}>
                  <span>→</span> {belief}
                </div>
              ))}
            </div>
          </div>

          <div className={`${styles.chapter} reveal`}>
            <Marker num="05" label={c.offScreen.label} />
            <p className={styles.body}>
              {c.offScreen.p1Before}
              <b>{c.offScreen.p1Strong}</b>{" "}
              <Link href={localeHref("/personality", locale)} className={styles.link}>
                {c.offScreen.p1Link}
              </Link>
            </p>
          </div>

          <div className={`${styles.chapter} reveal`}>
            <Marker num="06" label={c.now.label} />
            <p className={styles.body}>{c.now.p1}</p>
            <p className={styles.body}>
              {c.now.p2Before}
              <Link href={localeHref("/#contact", locale)} className={styles.link}>
                {c.now.p2Link}
              </Link>
            </p>
          </div>
        </article>
      </section>
    </>
  );
}

function Marker({ num, label }: { num: string; label: string }) {
  return (
    <h2 className={styles.marker}>
      <span className={styles.markerNum}>{num}</span>
      <span className={styles.markerLabel}>{label}</span>
    </h2>
  );
}
