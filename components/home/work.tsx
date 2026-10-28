import Link from "next/link";
import { getProjects } from "@/lib/projects";
import type { Dictionary } from "@/lib/i18n";
import { localeHref, type Locale } from "@/lib/i18n/config";
import { ProjectCard } from "./project-card";
import styles from "./work.module.css";

export function Work({
  locale,
  copy,
  caseStudyLabel,
}: {
  locale: Locale;
  copy: Dictionary["home"]["work"];
  caseStudyLabel: string;
}) {
  const { featured } = getProjects(locale);

  return (
    <section id="work">
      <div className="sec-head reveal">
        <span className="eyebrow">{copy.eyebrow}</span>
        <h2>{copy.heading}</h2>
      </div>
      <div className={styles.projects}>
        {featured.map((p) => (
          <ProjectCard
            key={p.idx}
            project={p}
            locale={locale}
            caseStudyLabel={caseStudyLabel}
          />
        ))}
      </div>
      <div className={`${styles.allLink} reveal`}>
        <Link href={localeHref("/projects", locale)}>{copy.allLink}</Link>
      </div>
    </section>
  );
}
