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
};

export type Article = ArticleMeta & {
  /** Raw markdown body (frontmatter stripped). */
  content: string;
};

function readArticleFile(filename: string): Article {
  const slug = filename.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(ARTICLES_DIR, filename), "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: String(data.title ?? slug),
    summary: String(data.summary ?? ""),
    date: String(data.date ?? ""),
    readingTime: readingTime(content).text,
    project: data.project ? String(data.project) : undefined,
    projectHref: data.projectHref ? String(data.projectHref) : undefined,
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

/** A single article by slug, or `null` if it doesn't exist. */
export function getArticleBySlug(slug: string): Article | null {
  const filename = `${slug}.md`;
  if (!fs.existsSync(path.join(ARTICLES_DIR, filename))) return null;
  return readArticleFile(filename);
}

/** Lightweight date formatter for display, e.g. "Jun 29, 2026". */
export function formatArticleDate(date: string): string {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
