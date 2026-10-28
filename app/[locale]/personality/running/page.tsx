import type { Metadata } from "next";
import { RevealObserver } from "@/components/reveal-observer";
import { NextRoom } from "@/components/personality/next-room";
import { TheGroove } from "@/components/personality/running/the-groove";
import { getDictionary, resolveLocale } from "@/lib/i18n";
import { OG_LOCALE, languageAlternates, localeHref } from "@/lib/i18n/config";
import styles from "./running.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const meta = getDictionary(locale).meta.running;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: localeHref("/personality/running", locale),
      languages: languageAlternates("/personality/running"),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      locale: OG_LOCALE[locale],
    },
  };
}

export default async function RunningPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = resolveLocale((await params).locale);
  const dict = getDictionary(locale);
  const d = dict.personality.running;

  // The intro names the game mid-sentence; splitting on the title keeps it
  // emphasised without hard-coding English word order.
  const [introBefore, ...introRest] = d.intro.split(d.introEm);
  const introAfter = introRest.join(d.introEm);

  return (
    <>
      <RevealObserver />
      <section id="running">
        <div className="sec-head reveal">
          <span className="eyebrow">{d.eyebrow}</span>
          <h2>{d.heading}</h2>
        </div>

        <p className={`${styles.intro} reveal`}>
          {introBefore}
          {introRest.length > 0 ? <em>{d.introEm}</em> : null}
          {introAfter}
        </p>

        <div className="reveal">
          <TheGroove copy={dict.groove} />
        </div>

        <p className={`${styles.caption} reveal`}>{d.caption}</p>

        <NextRoom
          current="running"
          locale={locale}
          copy={dict.personality.nextRoom}
        />
      </section>
    </>
  );
}
