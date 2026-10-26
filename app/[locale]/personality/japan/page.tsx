import type { Metadata } from "next";
import { RevealObserver } from "@/components/reveal-observer";
import { NextRoom } from "@/components/personality/next-room";
import { Chapter } from "@/components/personality/japan/chapter";
import { JourneyProgress } from "@/components/personality/japan/journey-progress";
import { getJourney } from "@/lib/japan/journey";
import { getDictionary, resolveLocale } from "@/lib/i18n";
import { OG_LOCALE, languageAlternates, localeHref } from "@/lib/i18n/config";
import styles from "./japan.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const meta = getDictionary(locale).meta.japan;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: localeHref("/personality/japan", locale),
      languages: languageAlternates("/personality/japan"),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      locale: OG_LOCALE[locale],
    },
  };
}

export default async function JapanPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = resolveLocale((await params).locale);
  const dict = getDictionary(locale);
  const d = dict.personality.japan;
  const journey = getJourney(locale);

  return (
    <>
      <RevealObserver />
      <JourneyProgress />
      <section id="japan">
        <div className="sec-head reveal">
          <span className="eyebrow">{d.eyebrow}</span>
          <h2>{d.heading}</h2>
        </div>

        <p className={`${styles.intro} reveal`}>{d.intro}</p>

        <div className={styles.chapters}>
          {journey.map((chapter, i) => (
            <Chapter key={chapter.id} chapter={chapter} index={i} />
          ))}
        </div>

        <NextRoom
          current="japan"
          locale={locale}
          copy={dict.personality.nextRoom}
        />
      </section>
    </>
  );
}
