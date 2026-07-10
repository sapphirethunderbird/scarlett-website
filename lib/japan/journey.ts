import type { StaticImageData } from "next/image";

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
      "The first thing Japan gave me was noise I couldn't parse. Departure boards, station jingles, a hundred conversations — all of it data, none of it signal. I was eleven, and everything I knew how to say fit on one flashcard.",
      "What I remember isn't fear. It's the moment I understood that every sign in that station meant something to everyone but me — and deciding, somewhere between the ticket gate and the platform, that it was going to mean something to me too.",
    ],
    photos: [
      {
        gradientKey: "tokyo-station-arrival",
        alt: "A crowded station concourse, departure boards overhead",
        caption: "everything here is legible now. it wasn't.",
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
      "Public school, entirely in Japanese, no exchange-student lane. I learned kanji the way you learn a city — by getting lost in it daily and being slightly less lost each week.",
      "The classroom taught me grammar. The hallways taught me everything else: how a joke lands, when silence is polite, and that belonging is mostly showing up again the next day.",
      "Years later this became my through-line: I get fluent fast in systems that weren't built for me. It started here, with a pencil and a vocabulary quiz I failed magnificently.",
    ],
    photos: [
      {
        gradientKey: "school-notebooks",
        alt: "A desk with kanji practice sheets",
        caption: "repetition, the honest kind",
        depth: 0.4,
      },
      {
        gradientKey: "school-hallway",
        alt: "An empty school hallway in afternoon light",
        caption: "where the real curriculum was",
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
      "Yamaguchi isn't on most itineraries, which is exactly the point. It's where I got into a national university the domestic way, where my running shoes know the coastal road, and where the sea shows up at the end of streets like it's checking on you.",
      "Tourists collect Japan's landmarks. Living here, you collect its ordinary miracles instead: the bakery that knows your order, the last train's specific loneliness, festival lanterns over a river you cross every day anyway.",
    ],
    photos: [
      {
        gradientKey: "ube-coast",
        alt: "The Seto Inland Sea at the end of a coastal road",
        caption: "the coastal loop, km 3 of 5",
        depth: -0.6,
      },
      {
        gradientKey: "yamaguchi-station",
        alt: "A quiet regional train platform at dusk",
        caption: "two cars, one conductor, zero hurry",
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
      "Sometimes you go be a tourist in your own country anyway. Kyoto at six a.m. before the crowds, Miyajima when the tide swallows the torii's feet, Hiroshima making you quiet for the rest of the day.",
      "The famous places earn it. But the train there is half the point — bento on your knees, someone's grandmother narrating the mountains, the specific joy of a window seat facing the sea.",
    ],
    photos: [
      {
        gradientKey: "kyoto-dawn",
        alt: "Vermilion torii gates in early morning light",
        caption: "kyoto, before the crowds",
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
        caption: "the ride there, also the point",
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
      "The map isn't finished. There's a sleeper train I haven't taken, a northern island I've only seen in other people's photos, and a marathon somewhere with my name on the bib.",
      "This page will grow the way the journey did: one platform at a time.",
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
