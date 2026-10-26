import type { Locale } from "@/lib/i18n/config";
import { PROJECT_COPY } from "./projects/copy";

export type ProjectLink = { href: string; label: string; internal?: boolean };

/**
 * Project data is single-sourced: slugs, indices, hrefs, and the stack tags
 * live here once, in English, and `lib/projects/ja.ts` supplies only the prose
 * for each slug. `getProjects(locale)` merges the two, so a new project needs
 * no structural duplication and a missing Japanese entry degrades to English
 * rather than breaking the page.
 */

/** A short fact shown in the rail at the top of a project page. */
export type ProjectFact = { label: string; value: string };

/** One narrative block of a case study. */
export type ProjectSection = { heading: string; body: string[] };

/** The long-form portfolio content for a project, rendered at /projects/<slug>. */
export type ProjectDetail = {
  /** One line that frames the whole project, shown under the title. */
  tagline: string;
  facts: ProjectFact[];
  /** Headline results, rendered as tiles. Keep to four or fewer. */
  outcomes?: ProjectFact[];
  sections: ProjectSection[];
};

type ProjectBase = {
  idx: string;
  /** URL segment for the project page. */
  slug: string;
  title: string;
  body: string;
  stack: string[];
  status: string;
  proof?: string;
  links?: ProjectLink[];
  detail?: ProjectDetail;
};

export type FeaturedProject = ProjectBase & {
  featured: true;
  proof: string;
  link: ProjectLink;
};

// link is optional so non-repo entries (volunteer work, talks) fit here too.
export type OtherProject = ProjectBase & {
  featured: false;
  link?: ProjectLink;
};

export type Project = FeaturedProject | OtherProject;

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    idx: "/01",
    slug: "shirabase",
    featured: true,
    title: "Shirabase",
    proof: "proof: Instead of simply redesigning a clunky interface, I proactively seek feedback and add value.",
    body: "A web app that transforms unstructured syllabi into actionable, market-ready skills. After trying to redesign the course management system, I asked for feedback from students and professors. I then shifted my focus from simple course management to creating new value from already existing syllabi. Syllabus data is analyzed locally in the browser. Currently deployed to Vercel with analytics integrated. ",
    stack: ["Claude Code", "Trajective Informatics (通態情報学)", "Vercel", "Analytics", "Next.js", "TypeScript", "React"],
    status: "solo · deployed",
    link: {
      href: "https://github.com/sapphirethunderbird/shirabase",
      label: "GitHub →",
    },
    links: [
      {
        href: "https://trajective-informatics-app.vercel.app/",
        label: "Deployment →",
      },
    ],
    detail: {
      tagline:
        "Turning the syllabus nobody reads into a skills map students can actually act on.",
      facts: [
        { label: "role", value: "Solo: concept to mvp" },
        { label: "status", value: "Deployed on Vercel" },
        { label: "scope", value: "Syllabus parsing, skill extraction, UI" },
      ],
      outcomes: [
        { label: "deployment", value: "Live" },
        { label: "data handling", value: "Local-first" },
        { label: "usage", value: "Instrumented" },
      ],
      sections: [
        {
          heading: "The job I thought I had",
          body: [
            "I started out meaning to redesign my university's course management system. It was clunky, the information architecture fought the user, and a redesign was the obvious deliverable. That framing lasted exactly as long as it took me to ask someone else about it.",
          ],
        },
        {
          heading: "What the feedback changed",
          body: [
            "I talked to students and professors instead of going straight to Figma. What came back was not \"this interface is hard to use.\" It was that the system holds information nobody gets value from. Syllabi are written once, filed, and never read again; even though they already describe, in detail, what a student will be able to do by the end of a course.",
            "So I stopped redesigning the container and started working on what was inside it. The question became: can the syllabus that already exists be turned into something a student can put on a job application?",
          ],
        },
        {
          heading: "How it works",
          body: [
            "Shirabase takes unstructured syllabus text and extracts the concrete, market-readable skills buried in it, then presents them as something actionable rather than administrative.",
            "The analysis runs locally in the browser. That was a deliberate constraint: course material and a student's academic record are not data I want to hold, and a tool that uploads nothing is a tool that is much easier for an institution to say yes to.",
            "It is deployed on Vercel with analytics wired in, so I can see what people actually do with it rather than guessing.",
          ],
        },
        {
          heading: "What I took from it",
          body: [
            "The useful lesson was not technical. The brief I was given described a symptom, and the redesign everyone expected would have shipped a prettier version of a thing nobody needed. Asking first cost me a few conversations and changed the entire project.",
          ],
        },
      ],
    },
  },
  {
    idx: "/02",
    slug: "voice-scann",
    featured: true,
    title: "Voice-SCaNN",
    proof: "proof: I'd rather rebuild the right thing than polish the wrong one.",
    body: "A generative-AI course-feedback system for my university's faculty. Sixty days, a confident wrong assumption, and one week left when user testing told us we'd solved the surface, not the problem. I pushed the team to pivot to a system that actually surfaces honest feedback for students, professors, and admins. It shipped, earned an official university press release, and a professor is presenting the work at a conference.",
    stack: ["Generative AI", "Service design", "Stakeholder Mapping", "User research", "Figma Make"],
    status: "team · press release",
    link: {
      href: "https://www.yamaguchi-u.ac.jp/gss/news/blog/2026/01/19/57/index.html",
      label: "Press release →",
    },
    detail: {
      tagline:
        "A generative-AI feedback system for faculty that had to be rebuilt in its final week to be worth shipping.",
      facts: [
        { label: "role", value: "Team: I drove the pivot" },
        { label: "timeline", value: "60 days" },
        { label: "users", value: "Students, professors, administrators" },
      ],
      outcomes: [
        { label: "project length", value: "60 days" },
        { label: "time left at pivot", value: "1 week" },
        { label: "recognition", value: "University press release" },
        { label: "afterlife", value: "Conference presentation" },
      ],
      sections: [
        {
          heading: "The brief",
          body: [
            "We had 60 days, a wrong assumption, and one week to fix it.",
            "Our team had less than 60 days to design a generative AI powered solution for the admins at the Faculty of Global and Science Studies. We started with the wrong assumption, which we realized a week before the deadline. We then pivoted to making a more holistic system that encourages feedback and course improvement.",
          ],
        },
        {
          heading: "The assumption we were confident about",
          body: [
            "We decided early on that the problem was that the number of steps needed to achieve a specific task rendered the entire registration system inadequate for the needs of the faculty and needed to be redesigned urgently. We thought that if we just fixed the user experience to be more intuitive and efficient, it would deliver value. We built toward that for most of the project, and we were dangerously confident about it.",
          ],
        },
        {
          heading: "The week it fell apart",
          body: [
            "After conducting user testing with faculty admins, we found that the faculty really didn't find our updated system to be very useful. It had handy features and all, but it didn't really change their lives. It was the easy solution that barely scraped the surface of the real problem.",
            " This is when we literally went back to the drawing board and mapped out our stakeholders and their needs.",
            "Admins, staff, and students are all frustrated with the underlying systems that are in place for class administration. In order to resolve these issues, we need to address the concerns of all three, and not just redesign the broken UI.",

            "Students want their courses to have their voices heard when it comes to course feedback. Professors want to have constructive feedback for their courses without being emotionally attacked. Admins want an environment where both students and professors are satisfied and can grow. However with the current system, students' true feelings seldom become analyzable data, they tend to be concealed within students' conversations with each other. This leads to a system that lacks the necessary feedback for course improvement.",
          ],
        },
        {
          heading: "The Solution",
          body: [
            "We designed a feedback system that targets all 3 major stakeholders, creating a system that encourages feedback from students, helps professors understand where students get stuck without hurting them emotionally.",
            "We defined stakeholder value as the following. Admins want admins, professors, and students to all form closer bonds, resulting in a system that goes beyond feedback and creates trust. Students want to feel that their voices are heard and for class to become a pleasant experience. Professors want to be empowered with knowledge of how students respond to their courses, resulting in better communication and more fulfillment in their work.",
            "The proof of concept was made using NotebookLM as the database for student feedback as well as the means of outputting the feedback in a meaningful way. The main prototype was made collaboratively using Figma Make. We had a working prototype finished by the end of the week and presented it the following week.",
          ],
        },
        {
          heading: "The Afterlife",
          body: [
            "Despite our extremely tight deadline, as a team we were able to get second place out of all of the presentations. Our project was introduced by our professor at a design conference a few months later.",
          ],
        },
      ],
    },
  },
  {
    idx: "/03",
    slug: "dxpbl",
    featured: true,
    title: "DXPBL",
    proof: "proof: I build close relationships with clients, and don't settle for band-aid solutions.",
    body: "A data-driven, community centered design for an aging community of 84 people (39 households) in rural Yamaguchi through building close relationships and empathy. I drove the pivot from a transportation app to bringing the community together to solve their own problems autonomously. Community engagement doubled, and we implemented a sustainable system for data management. Our team won Best DXPBL Award (2026).",
    stack: ["DXPBL", "Community Design", "Stakeholder Mapping", "Fieldwork", "Empathy", "Human Centered Design"],
    status: "team · press release",
    link: {
      href: "https://ds.cc.yamaguchi-u.ac.jp/~dxjinzai/news/1634/index.html",
      label: "Press release →",
    },
    detail: {
      tagline:
        "Designing with a village of 84 people in rural Yamaguchi, and deciding not to build them an app.",
      facts: [
        { label: "role", value: "Team: I drove the pivot" },
        { label: "community", value: "84 residents, 39 households" },
        { label: "place", value: "Sakate Settlement, Ato" },
        { label: "method", value: "Fieldwork, data, relationships" },
      ],
      outcomes: [
        { label: "residents", value: "84" },
        { label: "households", value: "39" },
        { label: "engagement", value: "2×" },
        { label: "award 2026", value: "Best DXPBL" },
      ],
      sections: [
        {
          heading: "The community",
          body: [
            "Eighty-four people across thirty-nine households, in an aging rural community in Yamaguchi. Small enough that every household matters statistically, and small enough that you can know people rather than survey them.",
          ],
        },
        {
          heading: "Why the transportation app was the wrong answer",
          body: [
            "Coming Soon",
          ],
        },
        {
          heading: "What we did instead",
          body: [
            "Coming Soon",
          ],
        },
        {
          heading: "Outcome",
          body: [
            "Coming Soon",
          ],
        },
      ],
    },
  },
];

export const OTHER_PROJECTS: OtherProject[] = [
  {
    idx: "/04",
    slug: "aac-communication-app",
    featured: false,
    title: "AAC Communication App",
    proof: "proof: Talk to people; it's never the user's fault.",
    body: "An open-source web app for people with developmental disabilities, customizable cards plus freehand drawing, with text-to-speech. I tested it with autistic users and the results were genuinely mixed: some loved drawing, others said it wasn't for them. That's the point of the project. The honest takeaway I'm carrying forward: listen more before building more.",
    stack: ["Next.js", "TypeScript", "React", "Web Speech API"],
    status: "open source",
    links: [
      {
        href: "https://github.com/sapphirethunderbird/kakehashi",
        label: "GitHub →",
      },
      {
        href: "https://yamaguchi-henkaku.jp/project/2025-6",
        label: "Official Page →",
      }
    ],
    detail: {
      tagline:
        "Communication cards, freehand drawing, and speech. Also got test results that honestly said it isn't for everyone.",
      facts: [
        { label: "role", value: "Solo: concept, user-testing" },
        { label: "status", value: "Open source" },
        { label: "users", value: "People with developmental disabilities" },
      ],
      sections: [
        {
          heading: "What it is",
          body: [
            "Coming Soon",
            "Coming Soon",
          ],
        },
        {
          heading: "Testing it with the people it was for",
          body: [
            "Coming Soon",
            "Coming Soon",
          ],
        },
        {
          heading: "What I'm carrying forward",
          body: [
            "Coming Soon",
          ],
        },
      ],
    },
  },
  {
    idx: "/05",
    slug: "burnout-predictor",
    featured: false,
    title: "Burnout Predictor",
    proof: "proof: I build AI from model to interface, and rebuild as I learn.",
    body: "A local-first desktop app that reads facial expression from a live camera feed in real time and nudges you to step away when stress reads high. I trained the model, wired the pipeline, and built the GUI. I also rebuilt it after I caught a weight-loading bug by logging per-frame confidence. The rebuild is where I prove the growth rather than paper over it.",
    stack: ["Python", "PyTorch", "MobileNetV2", "FER2013", "OpenCV", "tkinter"],
    status: "solo · open source",
    links: [
      {
      href: "https://github.com/sapphirethunderbird/burnout_predictor",
      label: "GitHub →",
      },
      {
        href: "/blog/burnout-predictor-in-retrospect",
        label: "Read the retrospect →",
        internal: true,
      },
    ],
    detail: {
      tagline:
        "Real-time facial expression on a local camera feed, model to GUI — then rebuilt after a bug I found in my own pipeline.",
      facts: [
        { label: "role", value: "Solo: model, pipeline, GUI" },
        { label: "model", value: "MobileNetV2 on FER2013" },
        { label: "status", value: "Open source, rebuilt" },
      ],
      sections: [
        {
          heading: "The idea",
          body: [
            "Coming Soon",
          ],
        },
        {
          heading: "Model to interface",
          body: [
            "Coming Soon",
            "Coming Soon",
          ],
        },
        {
          heading: "The bug, and the rebuild",
          body: [
            "Coming Soon",
            "Coming Soon",
          ],
        },
        {
          heading: "Read more",
          body: [
            "I wrote the whole thing up, including what the logs actually showed, in a full retrospective.",
          ],
        },
      ],
    },
  },
  {
    idx: "/06",
    slug: "bandit-writeup",
    featured: false,
    title: "OverTheWire Bandit Writeup",
    proof: "proof: I translate my knowlege into a form that others can understand and learn from.",
    body: "A level-by-level writeup of the OverTheWire Bandit wargame. Documenting the process of learning Linux and security fundamentals.",
    stack: ["Shell", "Linux", "Security"],
    status: "writeup",
    link: {
      href: "https://github.com/sapphirethunderbird/OverTheWire-Bandit-Writeup",
      label: "GitHub →",
    },
    detail: {
      tagline:
        "Every level of the OverTheWire Bandit wargame, documented so the next person can learn it rather than just clear it.",
      facts: [
        { label: "role", value: "Solo" },
        { label: "format", value: "Level-by-level writeup" },
        { label: "topics", value: "Linux, shell, security fundamentals" },
      ],
      sections: [
        {
          heading: "Why write it down",
          body: [
            "Coming Soon",
            "Coming Soon",
          ],
        },
        {
          heading: "What's in it",
          body: [
            "Coming Soon",
          ],
        },
      ],
    },
  },
];

/** Featured first, then the rest — the order used for project-to-project navigation. */
export const ALL_PROJECTS: Project[] = [...FEATURED_PROJECTS, ...OTHER_PROJECTS];

/* ---- localization ------------------------------------------------------- */

/**
 * The translatable half of a project. Everything omitted falls back to the
 * English above, so a half-finished translation still renders a whole page.
 *
 * `linkLabels` is keyed by href rather than position: reordering or adding a
 * link can't silently mislabel another one.
 */
export type ProjectCopy = {
  title?: string;
  proof?: string;
  body?: string;
  status?: string;
  linkLabels?: Record<string, string>;
  detail?: Partial<ProjectDetail>;
};

function localizeLink(link: ProjectLink, copy: ProjectCopy | undefined): ProjectLink {
  const label = copy?.linkLabels?.[link.href];
  return label ? { ...link, label } : link;
}

function localize<T extends Project>(project: T, copy: ProjectCopy | undefined): T {
  if (!copy) return project;

  const detail: ProjectDetail | undefined = project.detail
    ? {
        tagline: copy.detail?.tagline ?? project.detail.tagline,
        facts: copy.detail?.facts ?? project.detail.facts,
        outcomes: copy.detail?.outcomes ?? project.detail.outcomes,
        sections: copy.detail?.sections ?? project.detail.sections,
      }
    : undefined;

  return {
    ...project,
    title: copy.title ?? project.title,
    proof: copy.proof ?? project.proof,
    body: copy.body ?? project.body,
    status: copy.status ?? project.status,
    ...(project.link ? { link: localizeLink(project.link, copy) } : {}),
    ...(project.links
      ? { links: project.links.map((l) => localizeLink(l, copy)) }
      : {}),
    ...(detail ? { detail } : {}),
  };
}

/** Every project in `locale`, split the way the pages consume them. */
export function getProjects(locale: Locale): {
  featured: FeaturedProject[];
  other: OtherProject[];
  all: Project[];
} {
  const copy = locale === "en" ? undefined : PROJECT_COPY[locale];
  const featured = FEATURED_PROJECTS.map((p) => localize(p, copy?.[p.slug]));
  const other = OTHER_PROJECTS.map((p) => localize(p, copy?.[p.slug]));
  return { featured, other, all: [...featured, ...other] };
}

export function getProjectBySlug(
  slug: string,
  locale: Locale = "en",
): Project | undefined {
  return getProjects(locale).all.find((p) => p.slug === slug);
}

/** The projects either side of `slug`, in display order, for the page footer. */
export function getProjectNeighbors(
  slug: string,
  locale: Locale = "en",
): { prev?: Project; next?: Project } {
  const all = getProjects(locale).all;
  const i = all.findIndex((p) => p.slug === slug);
  if (i === -1) return {};
  return { prev: all[i - 1], next: all[i + 1] };
}

/** Every link on a project, with the primary `link` first. */
export function projectLinks(p: Project): ProjectLink[] {
  return [...(p.link ? [p.link] : []), ...(p.links ?? [])];
}
