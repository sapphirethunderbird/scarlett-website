import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

export type ArticleMeta = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  /** Human-readable estimate, e.g. "4 min read". */
  readingTime: string;
  /** Optional project this piece is a retrospective of. */
  project?: string;
  projectHref?: string;
  /** Optional cover image path under `public/` (e.g. "/articles/foo.jpg"). */
  image?: string;
  imageAlt?: string;
  /** Marks a piece for the featured rail on the writing index. */
  featured?: boolean;
  /** Language of this piece. Inferred from a `-jp` filename suffix. */
  lang: "en" | "ja";
  /** Slug of the piece this is a translation of. Translations stay off the index. */
  translationOf?: string;
};

export type Article = ArticleMeta & {
  /** Raw markdown body (frontmatter stripped). */
  content: string;
};

/** Files ending in `-jp` are Japanese; if the un-suffixed file exists, they're
 *  a translation of it. Frontmatter `lang` / `translationOf` override both. */
function resolveLanguage(
  slug: string,
  data: Record<string, unknown>,
): Pick<ArticleMeta, "lang" | "translationOf"> {
  const isJp = slug.endsWith("-jp");
  const lang = data.lang ? (String(data.lang) as "en" | "ja") : isJp ? "ja" : "en";

  if (data.translationOf) {
    return { lang, translationOf: String(data.translationOf) };
  }
  if (isJp) {
    const base = slug.slice(0, -"-jp".length);
    if (fs.existsSync(path.join(ARTICLES_DIR, `${base}.md`))) {
      return { lang, translationOf: base };
    }
  }
  return { lang };
}

function readArticleFile(filename: string): Article {
  const slug = filename.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(ARTICLES_DIR, filename), "utf8");
  const { data, content } = matter(raw);

  return {
    ...resolveLanguage(slug, data),
    slug,
    title: String(data.title ?? slug),
    summary: String(data.summary ?? ""),
    date: String(data.date ?? ""),
    readingTime: readingTime(content).text,
    project: data.project ? String(data.project) : undefined,
    projectHref: data.projectHref ? String(data.projectHref) : undefined,
    image: data.image ? String(data.image) : undefined,
    imageAlt: data.imageAlt ? String(data.imageAlt) : undefined,
    featured: Boolean(data.featured),
    content,
  };
}

/** All articles, newest first. Reads `content/articles/*.md` at build time. */
export function getAllArticles(): Article[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(readArticleFile)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Articles that get their own row on the writing index: everything except
 *  translations, which are reached from their original instead. */
export function getListedArticles(): Article[] {
  return getAllArticles().filter((a) => !a.translationOf);
}

/** Featured articles (frontmatter `featured: true`), newest first.
 *  Falls back to the single newest article so the rail is never empty. */
export function getFeaturedArticles(): Article[] {
  const listed = getListedArticles();
  const flagged = listed.filter((a) => a.featured);
  return flagged.length ? flagged : listed.slice(0, 1);
}

/** The other-language version of `slug`, or `null`. Resolves in both directions:
 *  a translation points at its original, an original is found by its translation. */
export function getCounterpart(slug: string): ArticleMeta | null {
  const all = getAllArticles();
  const self = all.find((a) => a.slug === slug);
  if (!self) return null;

  const counterpart = self.translationOf
    ? all.find((a) => a.slug === self.translationOf)
    : all.find((a) => a.translationOf === slug);
  if (!counterpart) return null;

  const { content: _body, ...meta } = counterpart;
  return meta;
}

/** A single article by slug, or `null` if it doesn't exist. */
export function getArticleBySlug(slug: string): Article | null {
  const filename = `${slug}.md`;
  if (!fs.existsSync(path.join(ARTICLES_DIR, filename))) return null;
  return readArticleFile(filename);
}

/** Lightweight date formatter for display, e.g. "Jun 29, 2026". */
export function formatArticleDate(date: string, lang: "en" | "ja" = "en"): string {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString(lang === "ja" ? "ja-JP" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
