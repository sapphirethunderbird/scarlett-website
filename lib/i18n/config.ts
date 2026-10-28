/**
 * Locale configuration for the bilingual site.
 *
 * English lives at the bare paths it always has ("/", "/about", "/projects/…")
 * so every link already out in the world keeps working. Japanese lives under
 * "/ja". Rewrites in `next.config.mjs` map the bare paths onto the "/en" segment so a
 * single `app/[locale]` tree serves both.
 */

export const LOCALES = ["en", "ja"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** The `/ja` style prefix a locale's URLs carry. English carries none. */
export const LOCALE_PREFIX: Record<Locale, string> = {
  en: "",
  ja: "/ja",
};

/** `lang` / `hreflang` attribute values. */
export const HTML_LANG: Record<Locale, string> = {
  en: "en",
  ja: "ja",
};

/** OpenGraph locale codes. */
export const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  ja: "ja_JP",
};

/** What the switcher calls each language — always in that language. */
export const LOCALE_NAME: Record<Locale, string> = {
  en: "English",
  ja: "日本語",
};

/** Short form for the nav pill. */
export const LOCALE_SHORT: Record<Locale, string> = {
  en: "EN",
  ja: "日本語",
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

/**
 * A locale-correct href for an app-internal path.
 *
 * `path` is always written in its English, prefix-free form ("/about",
 * "/#contact", "/projects/shirabase"); this adds the locale prefix. Hashes and
 * query strings survive, and external or protocol-relative hrefs pass through
 * untouched so the same helper is safe to use on any link.
 */
export function localeHref(path: string, locale: Locale): string {
  if (/^([a-z]+:|\/\/)/i.test(path) || path.startsWith("#")) return path;

  const prefix = LOCALE_PREFIX[locale];
  if (!prefix) return path;
  // "/" would otherwise become "/ja/", which redirects.
  if (path === "/") return prefix;
  return `${prefix}${path}`;
}

/** Strip any locale prefix, giving the canonical English path. */
export function stripLocale(pathname: string): string {
  for (const locale of LOCALES) {
    const prefix = LOCALE_PREFIX[locale];
    if (!prefix) continue;
    if (pathname === prefix) return "/";
    if (pathname.startsWith(`${prefix}/`)) return pathname.slice(prefix.length);
  }
  // Direct hits on the rewrite target ("/en/about") normalize too.
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice("/en".length);
  return pathname;
}

/** `alternates.languages` for a page's metadata, keyed by hreflang. */
export function languageAlternates(path: string): Record<string, string> {
  return Object.fromEntries(
    LOCALES.map((locale) => [HTML_LANG[locale], localeHref(path, locale)]),
  );
}
