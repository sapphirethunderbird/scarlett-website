import type { Metadata } from "next";
import { RevealObserver } from "@/components/reveal-observer";
import { NextRoom } from "@/components/personality/next-room";
import { CoverFlow } from "@/components/personality/music/cover-flow";
import { TRACKS } from "@/lib/music/tracks";
import { resolveTracks } from "@/lib/music/itunes";
import { getDictionary, resolveLocale } from "@/lib/i18n";
import { OG_LOCALE, languageAlternates, localeHref } from "@/lib/i18n/config";
import styles from "./music.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const meta = getDictionary(locale).meta.music;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: localeHref("/personality/music", locale),
      languages: languageAlternates("/personality/music"),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      locale: OG_LOCALE[locale],
    },
  };
}

// Re-resolve artwork/preview URLs daily; Apple rotates its CDN links, so
// they must never be baked in at build time forever.
export const revalidate = 86400;

export default async function MusicPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = resolveLocale((await params).locale);
  const dict = getDictionary(locale);
  const d = dict.personality.music;
  const tracks = await resolveTracks(TRACKS);

  return (
    <>
      <RevealObserver />
      <section id="music">
        <div className="sec-head reveal">
          <span className="eyebrow">{d.eyebrow}</span>
          <h2>{d.heading}</h2>
        </div>

        <p className={`${styles.intro} reveal`}>{d.intro}</p>

        <div className="reveal">
          <CoverFlow tracks={tracks} copy={dict.coverFlow} />
        </div>

        <p className={styles.credit}>{d.credit}</p>

        <NextRoom
          current="music"
          locale={locale}
          copy={dict.personality.nextRoom}
        />
      </section>
    </>
  );
}
