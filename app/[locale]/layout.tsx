import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Syne, Inter, JetBrains_Mono, Noto_Sans_JP } from "next/font/google";
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
// Latin faces above carry no CJK glyphs, so Japanese falls through to this one
// per character (see the html[lang="ja"] stacks in globals.css). Not preloaded:
// the subset is large and only one locale needs it.
const notoSansJP = Noto_Sans_JP({
  weight: ["400", "500", "700"],
  variable: "--font-noto-jp",
  display: "swap",
  preload: false,
});

const FONT_VARS = [
  syne.variable,
  inter.variable,
  jetbrainsMono.variable,
  notoSansJP.variable,
].join(" ");

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
