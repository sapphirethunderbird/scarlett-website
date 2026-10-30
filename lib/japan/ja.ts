import type { JourneyChapter } from "./journey";

/**
 * Japanese text for the journey, keyed by chapter id. Structure (layout,
 * accent, parallax depth, gradient keys) stays in `journey.ts`; a chapter or
 * field missing here falls back to the English.
 *
 * `photos` is positional — it matches the English `photos` array index for
 * index — because a placeholder photo has no stable key of its own yet.
 *
 * NOTE: like the English, this is a placeholder draft awaiting Scarlett's real
 * memories. Short beats, not travelogue.
 */
export type JourneyCopy = Partial<
  Pick<JourneyChapter, "kicker" | "title" | "date" | "body">
> & {
  photos?: { alt?: string; caption?: string }[];
};

export const JOURNEY_COPY_JA: Record<string, JourneyCopy> = {
  tokyo: {
    kicker: "第01章",
    title: "持っていない言語の中への到着",
    date: "11歳",
    body: [
      "準備中",
    ],
    photos: [
      {
        alt: "混み合った駅のコンコース、頭上に発車標",
        caption: "準備中",
      },
    ],
  },
  school: {
    kicker: "第02章",
    title: "流暢さは、通って着く場所",
    date: "学校の年月",
    body: [
      "準備中",
    ],
    photos: [
      { alt: "", caption: "準備中" },
      { alt: "", caption: "準備中" },
    ],
  },
  yamaguchi: {
    kicker: "第03章",
    title: "家は小さな駅",
    date: "山口、いま",
    body: [
      "準備中。",
    ],
    photos: [
      { alt: "", caption: "準備中" },
      { alt: "", caption: "準備中" },
    ],
  },
  kyoto: {
    kicker: "第04章",
    title: "絵はがきは本物だった",
    date: "学期の合間の旅",
    body: [
      "準備中",
    ],
    photos: [
      { alt: "", caption: "準備中" },
      { alt: "", caption: "準備中" },
      { alt: "", caption: "準備中" },
    ],
  },
  next: {
    kicker: "第05章",
    title: "次のホーム",
    date: "進行中",
    body: [
      "準備中",
    ],
    photos: [{ alt: "夜のホーム、1本の電車が待っている", caption: "つづく" }],
  },
};
