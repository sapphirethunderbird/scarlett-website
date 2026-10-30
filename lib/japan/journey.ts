import type { StaticImageData } from "next/image";
import type { Locale } from "@/lib/i18n/config";
import { JOURNEY_COPY_JA } from "./ja";

/**
 * The journey's content — chapters of one continuous scroll through Japan.
 *
 * Photos: when a real photo exists, drop it in content/japan/images/ and
 * static-import it here (next/image then gets intrinsic size + blur for
 * free). Until then a photo may carry only `gradientKey` — the page renders
 * a deterministic brand-gradient placeholder so the journey is walkable now.
 *
 * `depth` is a parallax factor from -1 (drifts up as you scroll) to 1
 * (drifts down); 0 or undefined sits still. Applied only in browsers with
 * CSS scroll-driven animations AND motion allowed.
 *
 * NOTE: chapter text is a placeholder draft awaiting Scarlett's real
 * memories — the shape is what to keep: short beats, not travelogue.
 */

export interface JourneyPhoto {
  image?: StaticImageData;
  /** Placeholder art key until a real photo lands. */
  gradientKey?: string;
  alt: string;
  caption?: string;
  depth?: number;
}

export interface JourneyChapter {
  /** Anchor slug. */
  id: string;
  /** e.g. "Chapter 01". */
  kicker: string;
  title: string;
  date?: string;
  /** Story beats — one paragraph per entry. */
  body: string[];
  photos: JourneyPhoto[];
  layout: "full-bleed" | "split" | "stack" | "polaroids";
  accent?: "signal" | "depth";
}

export const JOURNEY: JourneyChapter[] = [
  {
    id: "tokyo",
    kicker: "Chapter 01",
    title: "Arrival, in a language I didn't have",
    date: "age eleven",
    layout: "full-bleed",
    accent: "signal",
    body: [
      "Coming Soon",
    ],
    photos: [
      {
        gradientKey: "tokyo-station-arrival",
        alt: "",
        caption: "Coming Soon",
        depth: -0.5,
      },
    ],
  },
  {
    id: "school",
    kicker: "Chapter 02",
    title: "Fluency is a place you commute to",
    date: "the school years",
    layout: "stack",
    accent: "depth",
    body: [
      "Coming Soon",
    ],
    photos: [
      {
        gradientKey: "school-notebooks",
        alt: "A desk with kanji practice sheets",
        caption: "Coming Soon",
        depth: 0.4,
      },
      {
        gradientKey: "school-hallway",
        alt: "",
        caption: "Coming Soon",
        depth: -0.4,
      },
    ],
  },
  {
    id: "yamaguchi",
    kicker: "Chapter 03",
    title: "Home is a small station",
    date: "Yamaguchi, now",
    layout: "split",
    accent: "signal",
    body: [
      "Coming Soon",
    ],
    photos: [
      {
        gradientKey: "ube-coast",
        alt: "The Seto Inland Sea at the end of a coastal road",
        caption: "Coming Soon",
        depth: -0.6,
      },
      {
        gradientKey: "yamaguchi-station",
        alt: "A quiet regional train platform at dusk",
        caption: "Coming Soon",
        depth: 0.3,
      },
    ],
  },
  {
    id: "kyoto",
    kicker: "Chapter 04",
    title: "The postcards are real",
    date: "trips between semesters",
    layout: "polaroids",
    accent: "depth",
    body: [
      "Coming Soon",
    ],
    photos: [
      {
        gradientKey: "kyoto-dawn",
        alt: "Vermilion torii gates in early morning light",
        caption: "Coming Soon",
        depth: -0.3,
      },
      {
        gradientKey: "miyajima-tide",
        alt: "The great torii at Miyajima at high tide",
        caption: "miyajima, tide coming in",
        depth: 0.5,
      },
      {
        gradientKey: "train-window",
        alt: "A blurred sea view from a train window",
        caption: "Coming Soon",
        depth: -0.5,
      },
    ],
  },
  {
    id: "next",
    kicker: "Chapter 05",
    title: "The next platform",
    date: "ongoing",
    layout: "full-bleed",
    accent: "signal",
    body: [
      "Coming Soon",
    ],
    photos: [
      {
        gradientKey: "night-train",
        alt: "A platform at night, one train waiting",
        caption: "to be continued",
        depth: -0.4,
      },
    ],
  },
];

/* ---- localization ------------------------------------------------------- */

const JOURNEY_COPY: Partial<
  Record<Locale, Record<string, import("./ja").JourneyCopy>>
> = { ja: JOURNEY_COPY_JA };

/**
 * The journey in `locale`. English is the source above; a locale supplies only
 * text, so layout, parallax and placeholder art stay single-sourced and a
 * missing chapter or field falls back to the English rather than vanishing.
 */
export function getJourney(locale: Locale): JourneyChapter[] {
  const copy = locale === "en" ? undefined : JOURNEY_COPY[locale];
  if (!copy) return JOURNEY;

  return JOURNEY.map((chapter) => {
    const t = copy[chapter.id];
    if (!t) return chapter;
    return {
      ...chapter,
      kicker: t.kicker ?? chapter.kicker,
      title: t.title ?? chapter.title,
      date: t.date ?? chapter.date,
      body: t.body ?? chapter.body,
      photos: chapter.photos.map((photo, i) => ({
        ...photo,
        alt: t.photos?.[i]?.alt ?? photo.alt,
        caption: t.photos?.[i]?.caption ?? photo.caption,
      })),
    };
  });
}
