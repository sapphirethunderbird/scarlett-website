import type { Dictionary } from "./en";

/**
 * Japanese copy. Keyed identically to `en` — TypeScript fails the build if a
 * key drifts. Prose is ですます調; headings and eyebrows stay as short noun
 * phrases, matching the English rhythm rather than its grammar.
 */
export const ja: Dictionary = {
  meta: {
    siteTitle:
      "Scarlett Whisnant（スカーレット・ウィズナント）| 人間中心のAIをつくる英日バイリンガル開発者",
    siteName: "Scarlett Whisnant",
    siteDescription:
      "既存の仕組みが設計し忘れた人たちのために、モデルからインターフェースまで一貫してAIをつくる英日バイリンガルのビルダー。",
    titleSuffix: "Scarlett Whisnant",
    about: {
      title: "自己紹介 | Scarlett Whisnant",
      description:
        "長い版。11歳で日本語ゼロのまま来日し、国立大学を日本人と同じ入試で受け、既存の仕組みに取り残された人のために技術をつくるようになるまで。",
      ogDescription:
        "長い版。11歳で来日し、国立大学を日本人と同じ入試で受け、取り残された人のためにつくる理由。",
    },
    projects: {
      title: "プロジェクト | Scarlett Whisnant",
      description:
        "ビルドログの全部。主要なプロジェクトと、その周りにある小さな実験や記録まで。",
    },
    blog: {
      title: "書いたもの | Scarlett Whisnant",
      description: "つくって、壊して、つくり直したことの長文の振り返り。",
    },
    personality: {
      title: "画面の外 | Scarlett Whisnant",
      description:
        "まだ見せていなかった部分。前に進ませてくれる曲、頭をほどいてくれる距離、日本をめぐった記録（準備中）。",
    },
    music: {
      title: "音楽 | Scarlett Whisnant",
      description:
        "昔のiTunesのUIへのオマージュとしてつくったCover Flow。何度も戻ってくる曲を、30秒の試聴つきで。"
    },
    running: {
      title: "The Groove | Scarlett Whisnant",
      description:
        "あなたが針になるランニングゲーム。押し続けて走り、レコードに溝を刻む。自分が刻んだ面は、手を離してはじめて見える。",
    },
    japan: {
      title: "日本 | Scarlett Whisnant",
      description:
        "電車で覚えた国の話を、スクロールで。私をつくり変えた場所をひと続きの旅としてたどります。",
    },
  },

  nav: {
    home: "ホーム",
    brand: "Scarlett Whisnant",
    menu: "メニュー",
    openMenu: "メニューを開く",
    closeMenu: "メニューを閉じる",
    navigate: "ナビゲーション",
    github: "GitHub ↗",
    linkedin: "LinkedIn ↗",
    resume: "履歴書 ↗",
    items: [
      { n: "01", label: "自己紹介", href: "/about", desc: "つくっている人間の話" },
      { n: "02", label: "プロジェクト", href: "/projects", desc: "これまでにつくったもの" },
      { n: "03", label: "書いたもの", href: "/blog", desc: "エッセイと振り返り" },
      { n: "04", label: "画面の外", href: "/personality", desc: "舞台裏のほう" },
      { n: "05", label: "聞く", href: "/#ask", desc: "このサイトに私のことを聞く" },
      { n: "06", label: "連絡", href: "/#contact", desc: "話しましょう" },
    ],
    language: {
      label: "言語",
      switchTo: "View in English",
    },
  },

  theme: {
    toLight: "ライトテーマに切り替える",
    toDark: "ダークテーマに切り替える",
    light: "ライト",
    dark: "ダーク",
  },

  footer: {
    tagline: "モデルからインターフェースまで",
  },

  home: {
    hero: {
      eyebrow: "バイリンガル・ビルダー · EN / 日本語 · 日本",
      h1Line1: "なぜこの問題は",
      h1Line2: "まだ残るのか？",
      ledeBefore: "既存の仕組みが設計し忘れた人たちのために、",
      ledeStrong: "モデルからインターフェースまで",
      ledeAfter: "つくっています。",
      name: "Scarlett Whisnant",
      who: "デザイン、AI、そしてみんなが避けたがる問い。",
      cta: "連絡する",
      photoAlt: "Scarlett Whisnant",
    },
    about: {
      eyebrow: "01: who",
      heading: "つくっている人間の話",
      pull:
        "11歳で日本語ゼロのまま日本に来て、自分向けにつくられていない仕組みの中で一気に話せるようになりました。いまは、既存の仕組みが設計し忘れた人たちのために技術をつくっています。",
      link: "詳しく読む →",
    },
    work: {
      eyebrow: "02: work",
      heading: "つくって、壊して、つくり直す",
      allLink: "すべてのプロジェクト →",
    },
    ask: {
      eyebrow: "03: ask",
      heading: "このサイトに私のことを聞く",
      status: "ライブアシスタント · 私の仕事と考え方について答えます",
      greeting:
        "こんにちは。Scarlettの仕事と考え方について答えるAIです。採用担当の方でも、ただの興味でも、気になることを何でも聞いてください。",
      thinking: "考えています…",
      placeholder: "質問を入力…",
      inputLabel: "質問する",
      send: "送信",
      chips: [
        "どんな職種を探していますか？",
        "Voice-SCaNNの方針転換について教えてください。",
        "強みは何ですか？",
        "他の人と何が違いますか？",
      ],
      fallback:
        "このアシスタントは小さなバックエンド経由で動きますが、この環境ではまだ接続されていません。サイトの他の部分はすべて本物で、つながればアシスタントも本物です。それまではGitHubからご連絡ください。",
      note:
        "このアシスタント自体もプロジェクトの一つで、Scarlettの声で書いたシステムプロンプトを与えたLLMです。",
    },
    contact: {
      heading: "話しましょう。",
      sub:
        "技術的な深さと人と向き合う仕事が交わる、キャリア初期のポジションを探しています。米国市民のため、米国内の就労にビザのスポンサーは不要です。",
    },
  },

  contactForm: {
    name: "お名前",
    email: "メールアドレス",
    message: "メッセージ",
    company: "会社名",
    send: "送信する",
    sending: "送信中…",
    success: "ありがとうございます。メッセージは送信されました。追ってご連絡します。",
    genericError: "問題が発生しました。もう一度お試しください。",
  },

  contactApi: {
    invalidRequest: "リクエストが不正です。",
    missingName: "お名前を入力してください。",
    invalidEmail: "有効なメールアドレスを入力してください。",
    messageLength: "メッセージは10〜5000文字で入力してください。",
    notConfigured:
      "お問い合わせフォームはまだ設定されていません。GitHubからご連絡ください。",
    sendFailed: "メッセージを送信できませんでした。もう一度お試しください。",
  },

  about: {
    eyebrow: "自己紹介 — 長い版",
    title: "つくっている人間の話",
    pull:
      "私は確信がある人間ではありません。大事なときに、望みが薄く見えても手を出してみて、そこから自分のものにしていく人間です。",
    pullAfter:
      "この一文が、私の話のいちばん短くて正直な版です。長い版は太平洋の向こう側、黒板が読めない教室から始まります。",
    chapters: {
      japan: {
        label: "日本",
        p1:
          "2016年、11歳で日本に来ました。日本語はゼロ。「会話はできるけど鈍っている」ゼロではなく、本当にゼロです。それでも日本の公立学校に入りました。授業も、テストも、廊下での会話も、全部その場で覚えている言語で。私のような生徒向けのレーンは、その仕組みにありませんでした。",
        p2Before: "いま私がしていることすべてを決めた動き方を、最初に覚えたのがここです。",
        p2Strong: "自分向けにつくられていない仕組みの中で、一気に流暢になる。",
        p2After:
          "怖くなかったからではありません。迷ったままでいる以外の選択肢が、それしかなかったからです。",
      },
      university: {
        label: "大学",
        p1:
          "国立大学に、日本で育った人と同じ一般入試で入りました。留学生枠も、国際入試の横道もなしです。いまは山口大学の国際総合科学部に在籍し、2027年3月卒業予定。英語と日本語の完全なバイリンガルです。",
        p2:
          "第二言語で学校をやると、どのカリキュラムも教えてくれないことが分かります。能力はあるのに締め出されている感覚です。壁になっているのは自分の力ではなく、自分と制度のあいだにあるインターフェースのほうなのだと。",
      },
      why: {
        label: "つくる理由",
        p1:
          "その経験が、私がつくるものすべてに通っている線です。人のコミュニケーション、制度の失敗、そして人に主体性を返す道具としてのAI。つくるものはフロントもバックも自分で書き、実際に使う人たちと一緒に試します。",
        p2:
          "自分で学習させた画像モデルを使ったバーンアウト予測アプリ、締め切り直前にチームで方針転換して大学のプレスリリースにつながった授業フィードバックの仕組み、当事者と一緒にテストしたAAC（意思伝達）アプリ。",
        p3Before:
          "理解が深まったら、前につくったものを隠すのではなく、公開のまま戻ってつくり直します。うまくいった結果より、評価が割れた結果のほうが多くを教えてくれました。",
        p3Strong: "つくる前に、もっと聞く。",
        p3Link: "ビルドログを見る →",
      },
      believe: {
        label: "信じていること",
        beliefs: [
          "人に話を聞く。決めつけない。",
          "主体性に技術的な素養を必要としてはいけない。",
          "ユーザーのせいであることは決してない。直すべきはこちら。",
        ],
      },
      offScreen: {
        label: "画面の外で",
        p1Before:
          "走っています。本当に下手なところから始めました。体育の長距離走は天敵で、それでも、無理そうだからこそ手を出しました。いまは猛暑の中で5Kに向けて練習中、いずれはマラソンへ。ここにある他のすべてと同じ動き方です。",
        p1Strong: "難しいほうを選び、ゼロから始め、自分のものにする。",
        p1Link: "残りは画面の外に →",
      },
      now: {
        label: "いま",
        p1:
          "技術的な深さと人と向き合う仕事が混ざる、キャリア初期のポジションを目指しています。フォワードデプロイド／ソリューションエンジニアリング、プロダクトデザイン、あるいはその近くの仕事です。米国市民なので、米国内の就労にビザのスポンサーは必要ありません。",
        p2Before: "ここまでの話がチームに必要な人物像に重なったら、",
        p2Link: "連絡してください →",
      },
    },
  },

  projects: {
    eyebrow: "プロジェクト",
    heading: "ビルドログの全部",
    otherHead: "その他のプロジェクト",
    caseStudy: "ケーススタディ →",
    stack: "技術",
    project: "プロジェクト",
    allProjects: "すべてのプロジェクト",
    prev: "← 前へ",
    next: "次へ →",
  },

  blog: {
    eyebrow: "書いたもの",
    heading: "つくって、壊して、つくり直す — 長文版",
    empty: "まだ公開していません。近いうちに。",
    moreHead: "ほかの記事",
  },

  article: {
    eyebrow: "記事",
    partOf: "関連プロジェクト:",
    allWriting: "← 記事一覧",
  },

  personality: {
    hub: {
      eyebrow: "画面の外",
      heading: "出荷されない部分",
      manifesto:
        "コードは話の三分の一くらいです。このサイトのこの一画には残りが入っています。そして性分として、どの部屋も結局ひとつの制作物になりました。私についての展示を、ここの他のものと同じように設計してあります。",
      enter: "入る",
      rooms: {
        music: {
          title: "音楽",
          proof: "体験できなかったiTunesのUIへのオマージュ",
          body:
            "Cover Flowの復活。ジャケットが3Dで傾き、クリックひとつで30秒の試聴が始まります。曲は私のもの、インターフェースはラブレターです。",
          tease: "棚に{count}曲",
        },
        running: {
          title: "ランニング",
          proof: "このサイトが動き続ける理由になっている習慣のゲーム",
          body:
            "あなたが針です。押し続けて走り、一歩ごとに溝を刻み、見る前に足元へ流れていくのを眺める。自分が刻んだ面は、手を離してはじめて見えます。",
          tease: "canvas、Web Audio、素材ゼロ",
        },
        japan: {
          title: "日本",
          proof: "一生かけても回りきれない国を、スクロールで",
          body:
            "カメラロールではありません。私をつくり変えた場所をひと続きの旅として、章ごとに、スクロールする気がある限り先まで。",
          tease: "この路線に{count}駅",
        },
      },
    },
    nextRoom: {
      eyebrow: "次の部屋",
      music: { label: "音楽", tease: "古いインターフェースへのラブレター" },
      running: { label: "ランニング", tease: "あなたが針になるゲーム" },
      japan: { label: "日本", tease: "電車で覚えた国" },
      hub: { label: "ハブに戻る", tease: "外から見た三つの入口" },
    },
    music: {
      eyebrow: "画面の外 / 音楽",
      heading: "Cover Flow、復活",
      intro:
        "私が生まれる前、何か聴きたいときはアルバムをめくっていました。これは、体験できなかった昔のiTunesのUIへのオマージュです。CSS 3Dでゼロから組み直し、ジャケットと30秒の試聴はAppleの古いiTunes Search APIにつないでいます。私の音楽の趣味の、ほんの一部です。",
      credit:
        "ジャケットと試聴はiTunes Search API経由 · 追跡も保存もしていません",
    },
    running: {
      eyebrow: "画面の外 / ランニング",
      heading: "あなたが針になる",
      intro:
        "ランニングは私の生活でインターフェースがない部分なので、つくりました。The Grooveはあなたをレコードの内側に置きます。押し続けて走ると、一歩ごとに目の前の床へ溝が刻まれ、見る前に足元へ流れていきます。速度は息を使い、距離はきらめきを取り戻し、谷は進むほど狭くなります。レコードの溝とまったく同じように。音を出してください。聞こえるものはすべて、その走りそのものの再生です。",
      introEm: "The Groove",
      caption:
        "Canvas、Web Audio、素材ゼロ。最後の8音はひとりでは終わらないループに入ります。抜ける方法は、走るのをやめることだけです。",
    },
    japan: {
      eyebrow: "画面の外 / 日本",
      heading: "電車で覚えた国",
      intro:
        "日本を訪れたのではなく、11歳のときに日本が私に起きました。だからこれは写真のグリッドでも旅程表でもありません。あれから乗り続けている路線の話を、駅ごとに。スクロールで乗車してください。画面の上の細い線が、いまどこまで来たかです。",
    },
  },

  coverFlow: {
    prevCover: "前のジャケット",
    nextCover: "次のジャケット",
    pausePreview: "試聴を一時停止",
    playPreview: "30秒の試聴を再生",
    carouselLabel:
      "アルバムジャケット。左右の矢印キーで送り、Enterで試聴できます。",
    hint: "← → でめくる · Enterで再生 · ドラッグも可 · 音を出して",
    idlePrompt: "中央のジャケットをクリックで30秒試聴",
    noticeUnavailable: "試聴できません - AppleのCDNに断られました",
    noticeNoPreview: "この曲の試聴はありません",
    colName: "曲名",
    colArtist: "アーティスト",
    colAlbum: "アルバム",
    colTime: "時間",
    playTrack: "{artist}の{title}を試聴",
    pauseTrack: "{artist}の{title}の試聴を一時停止",
    playRow: "{artist}の{title}を再生",
    pauseRow: "{artist}の{title}を一時停止",
  },

  groove: {
    frameLabel: "The Groove、ランニングゲーム。押し続けて走ります。",
    title: "The Groove",
    titleBody:
      "あなたが針です。押し続けて走ると、一歩ごとに目の前の床へ溝が刻まれ、見る前に足元へ流れていきます。速度は谷を熱くして息を使い、距離はきらめきを戻します。給水やヨーグルトは歩くくらいまで落として。全力疾走では何も拾えません。",
    soundOn: "音を出して",
    start: "走り出す",
    again: "もう一面刻む",
    holdToRun: "押し続けて走る",
    hud: {
      breath: "息",
      lap: "{n}周目",
      metres: "{n} M",
      shimmer: "きらめき {n}%",
      outOfBreath: "息が上がった。歩いて戻して。",
      letGo: "手を離す",
      steps: "{n} 歩",
      laps: "{n} 周",
      revealLine1: "谷の中にいたのではない",
      revealLine2: "自分で道を刻んでいた",
    },
  },
};
