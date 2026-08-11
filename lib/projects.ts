export type ProjectLink = { href: string; label: string; internal?: boolean };

type ProjectBase = {
  idx: string;
  title: string;
  body: string;
  stack: string[];
  status: string;
  proof?: string;
  links?: ProjectLink[];
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
  },
  {
    idx: "/02",
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
  },
  {
    idx: "/03",
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
  },
];

export const OTHER_PROJECTS: OtherProject[] = [
  {
    idx: "/04",
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
  },
  {
    idx: "/05",
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
  },
  {
    idx: "/06",
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
  },
];
