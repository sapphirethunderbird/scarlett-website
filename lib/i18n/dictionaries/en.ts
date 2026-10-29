/**
 * English copy for the whole site. This object is also the *type* every other
 * locale must satisfy (see `dictionaries/ja.ts`), so adding a key here and
 * forgetting it elsewhere is a build error rather than a silent English leak.
 */
export const en = {
  meta: {
    siteTitle:
      "Scarlett Whisnant | Bilingual EN/JA developer building human-centered AI",
    siteName: "Scarlett Whisnant",
    siteDescription:
      "Bilingual builder of AI tools, from model to interface, for the people existing systems forgot to design for.",
    titleSuffix: "Scarlett Whisnant",
    about: {
      title: "About | Scarlett Whisnant",
      description:
        "The long version: moving to Japan at eleven with zero Japanese, a national university the domestic way, and why I build technology for the people existing systems forgot.",
      ogDescription:
        "The long version: Japan at eleven, a national university the domestic way, and why I build for the people existing systems forgot.",
    },
    projects: {
      title: "Projects | Scarlett Whisnant",
      description:
        "The full build log: featured work plus the smaller builds, experiments, and writeups around it.",
    },
    blog: {
      title: "Writing | Scarlett Whisnant",
      description:
        "Long-form retrospectives on what I built, broke, and rebuilt.",
    },
    personality: {
      title: "Off-screen | Scarlett Whisnant",
      description:
        "The parts that you never got to see: the music keeps me going, the kilometers that clear my head, my adventures through Japan.",
    },
    music: {
      title: "Music | Scarlett Whisnant",
      description:
        "A Cover Flow tribute to the old iTunes UI with the songs I keep coming back to, each with thirty-second previews.",
    },
    running: {
      title: "The Groove | Scarlett Whisnant",
      description:
        "A running game where you are the needle: hold to run, cut the record, and you only see the side you made once you let go.",
    },
    japan: {
      title: "Japan | Scarlett Whisnant",
      description:
        "Coming Soon",
    },
  },

  nav: {
    home: "Home",
    brand: "Scarlett Whisnant",
    menu: "menu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    navigate: "navigate",
    github: "GitHub ↗",
    linkedin: "LinkedIn ↗",
    resume: "Resume ↗",
    items: [
      { n: "01", label: "About", href: "/about", desc: "The person behind the build" },
      { n: "02", label: "Projects", href: "/projects", desc: "See what else I've done" },
      { n: "03", label: "Writing", href: "/blog", desc: "Essays & project retrospects" },
      { n: "04", label: "Off-screen", href: "/personality", desc: "Behind the scenes" },
      { n: "05", label: "Ask", href: "/#ask", desc: "Ask the site about me" },
      { n: "06", label: "Contact", href: "/#contact", desc: "Let's talk" },
    ],
    language: {
      label: "Language",
      /** Shown in the switcher for the language you'd be moving to. */
      switchTo: "View in 日本語",
    },
  },

  theme: {
    toLight: "Switch to light theme",
    toDark: "Switch to dark theme",
    light: "Light",
    dark: "Dark",
  },

  footer: {
    tagline: "built from model to interface",
  },

  home: {
    hero: {
      eyebrow: "Bilingual builder · EN / 日本語 · Japan",
      h1Line1: "Why does this problem",
      h1Line2: "still exist?",
      ledeBefore: "I build technology ",
      ledeStrong: "from model to interface",
      ledeAfter:
        " for the people existing systems forgot to design for.",
      name: "Scarlett Whisnant",
      who: "Design, AI, and the questions people would rather avoid.",
      cta: "Get in touch",
      photoAlt: "Scarlett Whisnant",
    },
    about: {
      eyebrow: "01: who",
      heading: "The person behind the build",
      pull:
        "I moved to Japan at eleven with no Japanese and got fluent fast in a system that wasn't built for me. Now I build technology for the people existing systems forgot to design for.",
      link: "Read my story →",
    },
    work: {
      eyebrow: "02: work",
      heading: "Built, broken, rebuilt",
      allLink: "All projects →",
    },
    ask: {
      eyebrow: "03: ask",
      heading: "Ask the site about me",
      status:
        "live assistant · answers questions about my work and the way I think",
      greeting:
        "Hi! I'm an AI that answers questions about Scarlett's work and the way she thinks. Recruiter, curious, or just poking around? Ask me anything.",
      thinking: "thinking…",
      placeholder: "Type a question…",
      inputLabel: "Ask a question",
      send: "Ask",
      chips: [
        "What kind of roles is she after?",
        "Tell me about the Voice-SCaNN pivot.",
        "What are her strengths?",
        "What makes her different?",
      ],
      fallback:
        "The live assistant runs through a small backend that isn't connected on this deployment yet. Everything else on the site is real — and so is the assistant when it's wired up. Reach me on GitHub in the meantime.",
      note:
        "This assistant is itself one of the projects, an LLM with a system prompt written in Scarlett's voice.",
    },
    contact: {
      heading: "Let's talk.",
      sub:
        "Looking for an early-career role where technical depth meets human-facing work. US citizen, no sponsorship needed.",
    },
  },

  contactForm: {
    name: "Name",
    email: "Email",
    message: "Message",
    company: "Company",
    send: "Send message",
    sending: "Sending…",
    success: "Thanks — your message is on its way. I'll be in touch.",
    genericError: "Something went wrong. Please try again.",
  },

  contactApi: {
    invalidRequest: "Invalid request.",
    missingName: "Please add your name.",
    invalidEmail: "Please enter a valid email address.",
    messageLength: "Message should be between 10 and 5000 characters.",
    notConfigured: "The contact form isn't set up yet. Please reach out on GitHub.",
    sendFailed: "Couldn't send your message. Please try again.",
  },

  about: {
    eyebrow: "about — the long version",
    title: "The person behind the build",
    pull:
      "I'm not the person who's sure. I'm the person who tries when it matters, even when it looks hopeless, and then I make it mine.",
    pullAfter:
      "That sentence is the shortest honest version of my story. The longer one starts on the other side of the Pacific, in a classroom where I couldn't read the board.",
    chapters: {
      japan: {
        label: "Japan",
        p1:
          "I moved to Japan at eleven, in 2016, with zero Japanese. Not conversational-but-rusty zero, actual zero. I went into Japanese public school anyway: every class, every test, every hallway conversation in a language I was learning in real time, in a system with no lane for someone like me.",
        p2Before: "It was the first time I learned the move that now defines everything I do: ",
        p2Strong: "I get fluent fast in systems that weren't built for me.",
        p2After:
          " Not because I'm fearless, but because staying lost was the only alternative on offer.",
      },
      university: {
        label: "University",
        p1:
          "I got into a national university the domestic way, the same entrance path as everyone who grew up here. No exchange-student lane, no international-admissions side door. I'm now at Yamaguchi University in the Faculty of Global and Science Studies, graduating March 2027, fully bilingual in English and Japanese.",
        p2:
          "Doing school in a second language teaches you something no curriculum does: what it feels like to be capable and still locked out, when the barrier isn't your ability but the interface between you and the institution.",
      },
      why: {
        label: "Why I build",
        p1:
          "That experience is the through-line in everything I make: human communication, institutional failure, and AI as a tool for handing people back some agency. I build both the front and back ends of the systems I make, and I test them with the people they're actually for.",
        p2:
          "A burnout predictor with a vision model I trained myself, a course-feedback system my team pivoted under deadline that earned a university press release, an AAC communication app tested with the people it's actually for.",
        p3Before:
          "When my understanding deepens, I go back and rebuild my earlier work in the open instead of hiding it. The mixed results taught me more than the wins: ",
        p3Strong: "listen more before building more.",
        p3Link: "see the build log →",
      },
      believe: {
        label: "What I believe",
        beliefs: [
          "Talk to people. Don't assume.",
          "Agency shouldn't require a technical background.",
          "It's never the user's fault. Fix it.",
        ],
      },
      offScreen: {
        label: "Off the screen",
        p1Before:
          "I run. I started from genuinely terrible. The dreaded PE distance run was my nemesis, and picked it up anyway because it felt impossible. Now I'm training through scorching heat toward a 5K, a marathon eventually. Same move as everything else here: ",
        p1Strong: "pick the hard thing, start from zero, make it mine.",
        p1Link: "the rest lives off-screen →",
      },
      now: {
        label: "Now",
        p1:
          "I'm headed toward early-career roles that blend technical depth with human-facing work. Forward deployed/solutions engineering, product design, or something similar. I'm a US citizen, so no visa sponsorship is needed for US roles.",
        p2Before: "If any of this sounds like someone you want on your team, ",
        p2Link: "get in touch →",
      },
    },
  },

  projects: {
    eyebrow: "projects",
    heading: "The full build log",
    otherHead: "other projects",
    caseStudy: "Case study →",
    stack: "stack",
    project: "project",
    allProjects: "all projects",
    prev: "← previous",
    next: "next →",
  },

  blog: {
    eyebrow: "writing",
    heading: "Built, broken, rebuilt - in long form",
    empty: "Nothing published yet. Soon.",
    moreHead: "more writing",
  },

  article: {
    eyebrow: "writing",
    partOf: "part of",
    allWriting: "← all writing",
  },

  personality: {
    hub: {
      eyebrow: "off-screen",
      heading: "The parts that don't ship",
      manifesto:
        "Code is maybe a third of the story. This wing of the site holds the rest, and because I can't help myself, each room is also a build: an exhibit about me, engineered like everything else here.",
      enter: "enter",
      rooms: {
        music: {
          title: "Music",
          proof: "a tribute to the iTunes UI I never got to experience",
          body:
            "Cover Flow, resurrected, album art tilting in 3D, a click away from a thirty-second preview. The songs are mine; the interface is a love letter.",
          /** `{count}` is the number of curated tracks. */
          tease: "{count} tracks on the shelf",
        },
        running: {
          title: "Running",
          proof: "a game about the habit that keeps this site shipping",
          body:
            "You are the needle. Hold to run, cut a mark with every footfall, and watch it sweep under before you can look. You only see the side you made once you let go.",
          tease: "canvas, web audio, no assets",
        },
        japan: {
          title: "Japan",
          proof: "a country that takes a lifetime to explore, told by scroll",
          body:
            "Not a camera roll. One continuous journey through the places that rearranged me, chapter by chapter, as far as you're willing to scroll.",
          /** `{count}` is the number of journey chapters. */
          tease: "{count} stops down the line",
        },
      },
    },
    nextRoom: {
      eyebrow: "next room",
      music: { label: "music", tease: "a love letter to an old interface" },
      running: { label: "running", tease: "a game where you are the needle" },
      japan: { label: "japan", tease: "a country learned by train" },
      hub: { label: "back to the hub", tease: "three doorways, seen from outside" },
    },
    music: {
      eyebrow: "off-screen / music",
      heading: "Cover Flow, resurrected",
      intro:
        "Back before my time, when you wanted to listen to something, you flipped through albums. This is my tribute to the old iTunes UI that I never got to experience. Rebuilt from scratch in CSS 3D, wired to Apple's old iTunes Search API for the artwork and thirty-second previews. Here's a small portion of my music taste.",
      credit:
        "artwork & previews via the iTunes Search API · nothing is tracked, nothing is stored",
    },
    running: {
      eyebrow: "off-screen / running",
      heading: "You are the needle",
      intro:
        "Running is the part of my life with no interface, so I built one. The Groove puts you inside a record: hold to run, and every footfall cuts a mark into the floor ahead of you, then sweeps under before you can look at it. Speed spends breath, distance buys back the shimmer, and the canyon narrows the whole way in, exactly like the grooves on a record do. Sound on: everything you hear is the run itself, played back.",
      introEm: "The Groove",
      caption:
        "Canvas, Web Audio, no assets. The last eight notes lock into a loop that never ends on its own — the only way out is to stop running.",
    },
    japan: {
      eyebrow: "off-screen / japan",
      heading: "A country learned by train",
      intro:
        "I didn't visit Japan; it happened to me, starting at age eleven. So this isn't a photo grid or an itinerary. It's the line I've been riding since, told stop by stop. Scroll to board. The thin line at the top of the screen is how far down the track you are.",
    },
  },

  coverFlow: {
    prevCover: "Previous cover",
    nextCover: "Next cover",
    pausePreview: "Pause preview",
    playPreview: "Play 30 second preview",
    carouselLabel:
      "Album covers. Use left and right arrow keys to browse, Enter to play a preview.",
    hint: "← → to flip · enter to play · drag works too · sound on",
    idlePrompt: "click the center cover to play a 30s preview",
    noticeUnavailable: "preview unavailable - Apple's CDN said no",
    noticeNoPreview: "no preview available for this one",
    colName: "name",
    colArtist: "artist",
    colAlbum: "album",
    colTime: "time",
    /** `{title}` / `{artist}` interpolate the track. */
    playTrack: "Play preview of {title} by {artist}",
    pauseTrack: "Pause preview of {title} by {artist}",
    playRow: "Play {title} by {artist}",
    pauseRow: "Pause {title} by {artist}",
  },

  groove: {
    frameLabel: "The Groove, a running game. Hold to run.",
    title: "The Groove",
    titleBody:
      "You are the needle. Hold to run — every footfall cuts a mark into the floor ahead of you, and it sweeps under before you can look. Speed heats the canyon and spends breath; distance brings the shimmer back. Ease down to a walk for a drink or a yogurt — nothing gets picked up at a sprint.",
    soundOn: "sound on",
    start: "Start running",
    again: "Cut another side",
    holdToRun: "HOLD TO RUN",
    /** Canvas HUD. Kept short — these are drawn into a fixed-width readout. */
    hud: {
      breath: "BREATH",
      /** `{n}` is the lap number. */
      lap: "LAP {n}",
      /** `{n}` is whole metres. */
      metres: "{n} M",
      /** `{n}` is a percentage. */
      shimmer: "SHIMMER {n}%",
      outOfBreath: "out of breath. walk it back.",
      letGo: "let go",
      /** `{n}` is a count of footfalls. */
      steps: "{n} STEPS",
      /** `{n}` is a count of laps. */
      laps: "{n} LAPS",
      revealLine1: "You were never in a canyon",
      revealLine2: "You cut your own path",
    },
  },
};

/** Structural shape every locale must provide. Deliberately *not* `as const`:
 *  the other dictionaries need the same keys, not the same strings. */
export type Dictionary = typeof en;
