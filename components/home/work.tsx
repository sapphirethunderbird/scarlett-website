import Link from "next/link";
import { FEATURED_PROJECTS } from "@/lib/projects";
import { ProjectCard } from "./project-card";
import styles from "./work.module.css";

export function Work() {
  return (
    <section id="work">
      <div className="sec-head reveal">
        <span className="eyebrow">02: work</span>
        <h2>Built, broken, rebuilt</h2>
      </div>
      <div className={styles.projects}>
        {FEATURED_PROJECTS.map((p) => (
          <ProjectCard key={p.idx} project={p} />
        ))}
      </div>
      <div className={`${styles.allLink} reveal`}>
        <Link href="/projects">All projects →</Link>
      </div>
    </section>
  );
}
