import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Syne, Inter, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { getDictionary, resolveLocale } from "@/lib/i18n";
import {
  HTML_LANG,
  LOCALES,
  OG_LOCALE,
  isLocale,
  languageAlternates,
  localeHref,
} from "@/lib/i18n/config";

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});
// Latin faces above carry no CJK glyphs, so Japanese falls through to Noto Sans
// JP per character (see the html[lang="ja"] stacks in globals.css). It's loaded
// from Google's stylesheet at runtime, Japanese pages only — not next/font:
// Google sometimes serves its ~120 CJK subsets as /l/font?kit=…&skey=… URLs,
// whose "&" breaks Turbopack's font import, so the server build fails at random.
const NOTO_SANS_JP_CSS =
  "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap";

const FONT_VARS = [syne.variable, inter.variable, jetbrainsMono.variable].join(
  " ",
);

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const d = getDictionary(locale);

  return {
    metadataBase: new URL("https://scarlettwhisnant.com"),
    title: d.meta.siteTitle,
    description: d.meta.siteDescription,
    alternates: {
      canonical: localeHref("/", locale),
      languages: languageAlternates("/"),
    },
    openGraph: {
      title: d.meta.siteName,
      description: d.meta.siteDescription,
      type: "website",
      locale: OG_LOCALE[locale],
    },
  };
}

// §3.1 No-flash inline script: apply theme before first paint.
// Default dark; respect OS on first visit; manual toggle persists to localStorage.
const noFlashScript = `(function(){try{var s=localStorage.getItem('theme');var sys=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';document.documentElement.setAttribute('data-theme',s||sys);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  // Only the known locales are routes; anything else is a bad URL, not English.
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const d = getDictionary(locale);

  return (
    <html
      lang={HTML_LANG[locale]}
      data-theme="dark"
      className={FONT_VARS}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
        {locale === "ja" && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin="anonymous"
            />
            <link rel="stylesheet" href={NOTO_SANS_JP_CSS} />
          </>
        )}
      </head>
      <body>
        <Nav locale={locale} nav={d.nav} theme={d.theme} />
        <div className="wrap" id="top">
          {children}
          <Footer locale={locale} />
        </div>
      </body>
    </html>
  );
}
