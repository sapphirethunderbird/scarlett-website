import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { RevealObserver } from "@/components/reveal-observer";
import { ArticleLayout } from "@/components/article/article-layout";
import { getAllArticles, getArticleBySlug, getCounterpart } from "@/lib/articles";
import { getDictionary, resolveLocale } from "@/lib/i18n";
import { HTML_LANG, OG_LOCALE, localeHref } from "@/lib/i18n/config";

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);
  const article = getArticleBySlug(slug);
  if (!article) return {};

  const counterpart = getCounterpart(slug);
  const languages: Record<string, string> = {
    [HTML_LANG[article.lang]]: localeHref(`/blog/${article.slug}`, article.lang),
  };
  if (counterpart) {
    languages[HTML_LANG[counterpart.lang]] = localeHref(
      `/blog/${counterpart.slug}`,
      counterpart.lang,
    );
  }

  return {
    title: `${article.title} | ${getDictionary(locale).meta.titleSuffix}`,
    description: article.summary,
    alternates: {
      // A piece is canonical in the part of the site that matches the language
      // it is written in, so the same text isn't indexed twice.
      canonical: localeHref(`/blog/${article.slug}`, article.lang),
      languages,
    },
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      locale: OG_LOCALE[article.lang],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const { content } = await compileMDX({
    source: article.content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypePrettyCode,
            { theme: "github-dark-dimmed", keepBackground: false },
          ],
        ],
      },
    },
  });

  const { content: _body, ...meta } = article;

  return (
    <>
      <RevealObserver />
      <section>
        <ArticleLayout
          meta={meta}
          counterpart={getCounterpart(slug)}
          locale={locale}
          copy={getDictionary(locale).article}
        >
          {content}
        </ArticleLayout>
      </section>
    </>
  );
}
