import type { Metadata } from "next";
import { Syne, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://scarlettwhisnant.com"),
  title: "Scarlett Whisnant | Bilingual EN/JA developer building human-centered AI",
  description:
    "Bilingual builder of AI tools, from model to interface, for the people existing systems forgot to design for.",
  openGraph: {
    title: "Scarlett Whisnant",
    description:
      "Bilingual builder of AI tools, from model to interface, for the people existing systems forgot to design for.",
    type: "website",
  },
};

// §3.1 No-flash inline script: apply theme before first paint.
// Default dark; respect OS on first visit; manual toggle persists to localStorage.
const noFlashScript = `(function(){try{var s=localStorage.getItem('theme');var sys=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';document.documentElement.setAttribute('data-theme',s||sys);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${syne.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body>
        <Nav />
        <div className="wrap" id="top">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
