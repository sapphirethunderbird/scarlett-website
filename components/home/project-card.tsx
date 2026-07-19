import Link from "next/link";
import type { Project } from "@/lib/projects";
import styles from "./work.module.css";

export function ProjectCard({ project: p }: { project: Project }) {
  return (
    <article className={`${styles.card} reveal`}>
      <div className={styles.idx}>{p.idx}</div>
      <div>
        <h3 className={styles.title}>{p.title}</h3>
        {p.featured ? <div className={styles.proof}>{p.proof}</div> : null}
        <p className={styles.body}>{p.body}</p>
        <div className={styles.stack}>
          {p.stack.map((t) => (
            <span key={t} className={styles.tag}>
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className={styles.meta}>
        <span className={styles.status}>{p.status}</span>
        <br />
        {p.link ? (
          <a href={p.link.href} target="_blank" rel="noopener">
            {p.link.label}
          </a>
        ) : null}
        {p.links?.map((l) =>
          l.internal ? (
            <Link key={l.href} href={l.href} className={styles.extraLink}>
              {l.label}
            </Link>
          ) : (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener"
              className={styles.extraLink}
            >
              {l.label}
            </a>
          ),
        )}
      </div>
    </article>
  );
}
