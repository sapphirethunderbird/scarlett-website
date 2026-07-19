import type { Metadata } from "next";
import { RevealObserver } from "@/components/reveal-observer";
import { ProjectCard } from "@/components/home/project-card";
import { FEATURED_PROJECTS, OTHER_PROJECTS } from "@/lib/projects";
import workStyles from "@/components/home/work.module.css";
import styles from "./projects.module.css";

export const metadata: Metadata = {
  title: "Projects | Scarlett Whisnant",
  description:
    "The full build log: featured work plus the smaller builds, experiments, and writeups around it.",
};

export default function ProjectsPage() {
  return (
    <>
      <RevealObserver />
      <section id="projects">
        <div className="sec-head reveal">
          <span className="eyebrow">projects</span>
          <h2>The full build log</h2>
        </div>

        <div className={workStyles.projects}>
          {FEATURED_PROJECTS.map((p) => (
            <ProjectCard key={p.idx} project={p} />
          ))}
        </div>

        {OTHER_PROJECTS.length > 0 ? (
          <div className={styles.more}>
            <span className={`eyebrow ${styles.moreHead} reveal`}>
              other projects
            </span>
            <div className={styles.list}>
              {OTHER_PROJECTS.map((p) => {
                const inner = (
                  <>
                    <div className={styles.meta}>
                      <span className={styles.idx}>{p.idx}</span>
                      <span className={styles.status}>{p.status}</span>
                    </div>
                    <div>
                      <h3 className={styles.title}>{p.title}</h3>
                      <p className={styles.body}>{p.body}</p>
                      <div className={styles.stack}>
                        {p.stack.map((t) => (
                          <span key={t} className={styles.tag}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className={styles.arrow} aria-hidden="true">
                      →
                    </div>
                  </>
                );
                return p.link ? (
                  <a
                    key={p.idx}
                    href={p.link.href}
                    target="_blank"
                    rel="noopener"
                    className={`${styles.row} reveal`}
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={p.idx} className={`${styles.row} reveal`}>
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </section>
    </>
  );
}
