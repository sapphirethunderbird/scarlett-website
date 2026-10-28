import { RevealObserver } from "@/components/reveal-observer";
import { Hero } from "@/components/home/hero";
import { About } from "@/components/home/about";
import { Work } from "@/components/home/work";
import { AskWidget } from "@/components/home/ask-widget";
import { Contact } from "@/components/home/contact";
import { getDictionary, resolveLocale } from "@/lib/i18n";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = resolveLocale((await params).locale);
  const d = getDictionary(locale);

  return (
    <>
      <RevealObserver />
      <Hero copy={d.home.hero} />
      <About locale={locale} copy={d.home.about} />
      <Work
        locale={locale}
        copy={d.home.work}
        caseStudyLabel={d.projects.caseStudy}
      />
      <AskWidget copy={d.home.ask} />
      <Contact
        locale={locale}
        copy={d.home.contact}
        form={d.contactForm}
        links={{
          github: d.nav.github,
          linkedin: d.nav.linkedin,
          resume: d.nav.resume,
        }}
      />
    </>
  );
}
