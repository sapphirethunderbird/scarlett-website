# Japanese copy — passages that want your ear

Everything on the site is translated and live under `/ja`. The mechanical
strings (buttons, labels, metadata) are safe to leave alone. What follows is
the subset where the Japanese is a *judgement call* rather than a translation —
your voice, your ear, your call. Each entry gives the file, the English, what I
wrote, and why I flagged it.

Edit the Japanese strings in place; nothing else has to change.

---

## 1. The hero headline — `lib/i18n/dictionaries/ja.ts` → `home.hero`

| | |
|---|---|
| EN | "Why does this problem / still exist?" |
| JA | 「なぜこの問題は / まだ残るのか？」 |

My first draft was 「この問題は、なぜ / まだ残っているのか？」 — truer to the
English, but it wrapped onto three lines on a phone and orphaned 「か？」.
I shortened it to fit two lines. **If you prefer the longer phrasing, say so
and I'll size the Japanese h1 down instead of cutting words.**

## 2. The lede — `home.hero.ledeBefore` / `ledeStrong` / `ledeAfter`

| | |
|---|---|
| EN | "I build technology **from model to interface** for the people existing systems forgot to design for." |
| JA | 「既存の仕組みが設計し忘れた人たちのために、**モデルからインターフェースまで**つくっています。」 |

Japanese word order forces the "for the people…" clause to the *front*, so the
bolded phrase lands in the middle rather than early. It reads naturally, but
the emphasis sits differently than in English. 「設計し忘れた」 is my choice for
"forgot to design for" — slightly literary. 「見落としてきた」 would be plainer.

## 3. The thesis line — `about.chapters.japan.p2Strong`

| | |
|---|---|
| EN | "I get fluent fast in systems that weren't built for me." |
| JA | 「自分向けにつくられていない仕組みの中で、一気に流暢になる。」 |

This is the sentence the whole site hangs on, and it appears twice (here and in
`home.about.pull`). 「一気に」 carries the "fast"; 「仕組み」 covers both "system"
and "institution". Worth reading aloud.

## 4. 「つくる」 vs 「作る」 vs 「創る」 — everywhere

I used **hiragana つくる** throughout for "build / make". It's the warmest and
least industrial of the three, and it matches the site's voice in English. If
you'd rather have 作る (plainer) or 制作する (more professional), it's a
find-and-replace and I'll do it.

## 5. Formality register — everywhere

Prose is **ですます調**; headings, eyebrows and nav labels are bare noun phrases.
That's the normal convention for a Japanese portfolio aimed at employers. If
you want the prose in **だ・である調** to match the bluntness of the English
("I'm not the person who's sure"), that's a different site personality — tell
me and I'll switch the whole thing.

## 6. The "proof:" lines — `lib/projects/ja.ts`

I kept the literal English token `proof:` at the head of each one rather than
translating it to 「証明:」 or 「根拠:」, because it reads as a design element
(like the `/01` indices and the `01: who` eyebrows) rather than as prose. The
sentences after it are fully Japanese. Say the word if you want the token
translated too.

Specific ones to check:

- **Shirabase** — 「使いにくい画面を作り直すだけで終わらせず、自分からフィードバックを取りに行き、価値を足す。」
- **Voice-SCaNN** — 「間違ったものを磨くより、正しいものをつくり直したい。」
- **DXPBL** — 「関係者と深い関係を築き、絆創膏のような解決策で満足しない。」 — 「絆創膏のような」 is a literal rendering of "band-aid solution". It's understood in Japanese but not idiomatic; 「その場しのぎの」 is the natural equivalent and loses the image. Your call.
- **AAC app** — 「人に話を聞く。ユーザーのせいであることは決してない。」
- **Bandit** — 「自分の知識を、他の人が理解して学べる形に翻訳する。」

## 7. Role and status vocabulary — `lib/projects/ja.ts`

These are the terms a Japanese recruiter will scan first, so they should be the
words *you'd* use:

| EN | JA |
|---|---|
| solo · deployed | 個人 · 公開中 |
| team · press release | チーム · プレスリリース |
| open source | オープンソース |
| writeup | 記録 |
| Team: I drove the pivot | チーム: 方針転換を主導 |
| Solo: concept to mvp | 個人: 構想からMVPまで |

「方針転換」 is the safe word for "pivot". 「ピボット」 in katakana is also used
in Japanese startup contexts and might read as more current.

## 8. The "Now" section — `about.chapters.now.p1`

"Forward deployed/solutions engineering, product design" became
「フォワードデプロイド／ソリューションエンジニアリング、プロダクトデザイン」.
Transliterated, because these job titles mostly aren't localized in Japan —
but you know the Japanese job market better than I do, and if you're targeting
Japanese employers there may be a conventional term you'd rather use.

## 9. The personality rooms — `personality.*`

The most voice-heavy writing on the site, and the hardest to carry over:

- **Hub manifesto** — 「コードは話の三分の一くらいです。…」 The English "because I
  can't help myself" became 「そして性分として」. Drier than the original.
- **Running intro** — 「ランニングは私の生活でインターフェースがない部分なので、つくりました。」
- **Running caption** — 「抜ける方法は、走るのをやめることだけです。」
- **Japan intro** — 「日本を訪れたのではなく、11歳のときに日本が私に起きました。」
  "It happened to me" is unusual phrasing in Japanese too, which I think is
  right — it's unusual in English. But it's the kind of line a native reader
  will either love or trip over.

## 10. The Japan chapters — `lib/japan/ja.ts`

Translated from the English placeholder draft, so this is **a translation of
text you were already planning to replace**. When you write your real
memories, write them in both languages rather than having me translate — this
is the one section where translation is the wrong tool.

## 11. The assistant's suggested questions — `home.ask.chips`

These are what a Japanese visitor will click first. They currently mirror the
English. Note the backend chat API will answer in whatever language it's
prompted in — worth checking that its system prompt handles Japanese, since
that's outside this repo.

---

## Not translated, on purpose

- **Project titles** (Shirabase, Voice-SCaNN, DXPBL, The Groove) — product names.
- **Stack tags** (Next.js, PyTorch, Figma Make) — read as English in Japanese tech writing anyway.
- **The numbered eyebrows** (`01: who`, `02: work`, `03: ask`) — design elements, not prose.
- **`準備中`** in the DXPBL / AAC / Burnout Predictor case studies — these mirror
  the English "Coming Soon" placeholders. They're unwritten in both languages,
  not untranslated.
