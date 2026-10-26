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
      "日本が最初にくれたのは、解析できない音でした。発車標、駅のメロディ、百の会話。全部データで、どれも信号ではない。11歳で、言えることばは暗記カード1枚に収まる量でした。",
      "覚えているのは恐怖ではありません。あの駅のすべての表示が、自分以外の全員には意味を持っているのだと理解した瞬間です。そして改札とホームのあいだのどこかで、これを自分にも意味のあるものにすると決めました。",
    ],
    photos: [
      {
        alt: "混み合った駅のコンコース、頭上に発車標",
        caption: "ここの全部が、いまは読める。当時は読めなかった。",
      },
    ],
  },
  school: {
    kicker: "第02章",
    title: "流暢さは、通って着く場所",
    date: "学校の年月",
    body: [
      "公立学校、全部日本語、留学生枠なし。漢字は街を覚えるのと同じやり方で覚えました。毎日その中で迷い、週ごとに少しだけ迷わなくなる。",
      "教室が教えてくれたのは文法です。それ以外のすべては廊下が教えてくれました。冗談がどう着地するか、沈黙がいつ礼儀になるか、そして居場所はだいたい、翌日もまた来ることでできている、ということ。",
      "何年もあとに、これが私の通奏低音になりました。自分向けにつくられていない仕組みの中で、一気に流暢になる。始まりはここ、鉛筆と、見事に落とした単語テストでした。",
    ],
    photos: [
      { alt: "漢字の練習プリントが広がる机", caption: "反復、正直なほうの" },
      { alt: "午後の光が差す、人のいない校舎の廊下", caption: "本当のカリキュラムがあった場所" },
    ],
  },
  yamaguchi: {
    kicker: "第03章",
    title: "家は小さな駅",
    date: "山口、いま",
    body: [
      "山口はたいていの旅程に入りません。それがまさに要点です。ここで国立大学に一般入試で入り、ランニングシューズが海沿いの道を覚え、通りの突き当たりに海が、様子を見にきたような顔で現れます。",
      "観光客は日本の名所を集めます。住んでいると、代わりに日常の奇跡が集まります。注文を覚えているパン屋、終電のあの特定の寂しさ、どうせ毎日渡る川にかかる祭りの提灯。",
    ],
    photos: [
      { alt: "海沿いの道の先に広がる瀬戸内海", caption: "海沿いの周回、5kmのうち3km地点" },
      { alt: "夕暮れの静かなローカル線のホーム", caption: "2両、車掌1人、急ぎゼロ" },
    ],
  },
  kyoto: {
    kicker: "第04章",
    title: "絵はがきは本物だった",
    date: "学期の合間の旅",
    body: [
      "ときには、自分の住む国で観光客をやりにも行きます。人の来る前の朝6時の京都、鳥居の足を潮が飲み込む宮島、その日の残りをずっと静かにさせる広島。",
      "有名な場所は、ちゃんとその名に値します。でも、そこへ向かう電車が半分くらい本題です。膝にのせた弁当、誰かのおばあさんが実況する山並み、海側の窓際という特定の幸福。",
    ],
    photos: [
      { alt: "朝の光の中に並ぶ朱色の鳥居", caption: "京都、人の来る前" },
      { alt: "満潮の宮島の大鳥居", caption: "宮島、潮が満ちてくる" },
      { alt: "電車の窓から流れていく海", caption: "そこへ行く道も、本題" },
    ],
  },
  next: {
    kicker: "第05章",
    title: "次のホーム",
    date: "進行中",
    body: [
      "地図はまだ終わっていません。乗っていない寝台列車があり、他の人の写真でしか見ていない北の島があり、どこかに私の名前のゼッケンがついたマラソンがあります。",
      "このページは旅と同じように伸びていきます。ホーム一つずつ。",
    ],
    photos: [{ alt: "夜のホーム、1本の電車が待っている", caption: "つづく" }],
  },
};
