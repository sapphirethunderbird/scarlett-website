import Link from "next/link";
import styles from "./work.module.css";

type ProjectLink = { href: string; label: string; internal?: boolean };

type Project = {
  idx: string;
  title: string;
  proof: string;
  body: string;
  stack: string[];
  status: string;
  link: ProjectLink;
  links?: ProjectLink[];
};

const PROJECTS: Project[] = [
  {
    idx: "/01",
    title: "Burnout Predictor",
    proof: "proof: I build AI from model to interface, and rebuild as I learn",
    body: "A local-first desktop app that reads facial expression from a live camera feed in real time and nudges you to step away when stress reads high. I trained the model, wired the pipeline, and built the GUI. I also rebuilt it after I caught a weight-loading bug by logging per-frame confidence. The rebuild is where I prove the growth rather than paper over it.",
    stack: ["Python", "PyTorch", "MobileNetV2", "FER2013", "OpenCV", "tkinter"],
    status: "solo · open source",
    link: {
      href: "https://github.com/sapphirethunderbird/burnout_predictor",
      label: "GitHub →",
    },
    links: [
      {
        href: "/blog/burnout-predictor-in-retrospect",
        label: "Read the retrospect →",
        internal: true,
      },
    ],
  },
  {
    idx: "/02",
    title: "Voice-SCaNN",
    proof: "proof: I'd rather rebuild the right thing than polish the wrong one",
    body: "A generative-AI course-feedback system for my university's faculty. Sixty days, a confident wrong assumption, and one week left when user testing told us we'd solved the surface, not the problem. I pushed the team to pivot to a system that actually surfaces honest feedback for students, professors, and admins. It shipped, earned an official university press release, and a professor is presenting the work at a conference.",
    stack: ["Generative AI", "Service design", "User research", "Figma Make"],
    status: "team · press release",
    link: {
      href: "https://www.yamaguchi-u.ac.jp/gss/news/blog/2026/01/19/57/index.html",
      label: "Press release →",
    },
  },
  {
    idx: "/03",
    title: "AAC Communication App",
    proof: "proof: talk to people; it's never the user's fault",
    body: "An open-source web app for people with developmental disabilities, customizable cards plus freehand drawing, with text-to-speech. I tested it with autistic users and the results were genuinely mixed: some loved drawing, others said it wasn't for them. That's the point of the project. The honest takeaway I'm carrying forward: listen more before building more.",
    stack: ["Next.js", "TypeScript", "React", "Web Speech API"],
    status: "open source",
    link: {
      href: "https://github.com/sapphirethunderbird/kakehashi",
      label: "GitHub →",
    },
  },
];

export function Work() {
  return (
    <section id="work">
      <div className="sec-head reveal">
        <span className="eyebrow">02: work</span>
        <h2>Built, broken, rebuilt</h2>
      </div>
      <div className={styles.projects}>
        {PROJECTS.map((p) => (
          <article key={p.idx} className={`${styles.card} reveal`}>
            <div className={styles.idx}>{p.idx}</div>
            <div>
              <h3 className={styles.title}>{p.title}</h3>
              <div className={styles.proof}>{p.proof}</div>
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
              <a href={p.link.href} target="_blank" rel="noopener">
                {p.link.label}
              </a>
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
        ))}
      </div>
    </section>
  );
}
