import { en, type Dictionary } from "./dictionaries/en";
import { ja } from "./dictionaries/ja";
import { DEFAULT_LOCALE, isLocale, type Locale } from "./config";

const DICTIONARIES: Record<Locale, Dictionary> = { en, ja };

/** Copy for a locale. Unknown values fall back to the default locale. */
export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale] ?? DICTIONARIES[DEFAULT_LOCALE];
}

/** Resolve the `[locale]` route param, falling back rather than 404-ing. */
export function resolveLocale(value: string | undefined): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

/** Fill `{name}` placeholders in a dictionary string. */
export function fill(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

export type { Dictionary };
export * from "./config";
