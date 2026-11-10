/**
 * EXORA 2.0: THREE PHASES. ONE INNOVATION JOURNEY.
 * Document Source: GDG Exora 2.0 Event Flow (Google Developer Groups)
 * Theme: Dr. Doom Latverian classified dossier aesthetic + Exora precision structure.
 */

export interface ScheduleItem {
  id: string;
  time: string;
  marker?: string;
  title: string;
  phase?: string;
  description: string;
  deliverable?: string;
  side: 'left' | 'right';
  highlightBadge?: string;
}

export interface EventPhase {
  id: string;
  phaseNumber: number;
  title: string;
  subtitle: string;
  dateRange: string;
  mode: 'Online' | 'Offline';
  duration?: string;
  objective: string;
  bulletPoints: string[];
  keyMilestones: string;
  outcome: string;
  isEliminatory: boolean;
  statusBadge: string;
}

export interface MentoringRound {
  id: string;
  roundName: string;
  phase: string;
  date: string;
  mode: 'Online' | 'Offline';
  timing: string;
  purpose: string;
  roundType: 'Non-eliminatory' | 'ELIMINATORY';
  highlight: string;
}

export interface JudgingCriterion {
  id: string;
  name: string;
  descriptor: string;
  category: string;
}

export interface BentoPillar {
  id: string;
  title: string;
  description: string;
  iconName: 'lightbulb' | 'cpu' | 'rocket' | 'users';
  isWide?: boolean;
}

export interface PrizeCard {
  id: string;
  rankBadge?: string;
  amount: string;
  title: string;
  description: string;
  isTopReward?: boolean;
  accentColor?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface Collaborator {
  name: string;
  tagline: string;
  category?: string;
}

export interface OrganizerContact {
  name: string;
  role: string;
  email: string;
  handle: string;
  phone?: string;
}

export const EVENT_CONFIG = {
  // Primary Identifiers
  eventName: "EXORA 2.0",
  eventTaglineMain: "UNVEIL THE BUILD",
  taglineSecondary: "BUILD. INNOVATE. EXORA.",
  tagline: "Where technical creativity meets entrepreneurial thinking.",
  collegeName: "Google Developer Groups",
  collegeFullName: "Google Developer Groups (GDG)",
  collaborationWith: "Hosted in partnership with Thoughtworks Technologies",
  dossierCode: "DOSSIER-EXORA-2026-V2",
  clearanceRequired: "RESTRICTED MERIT // REGISTERED OPERATIVES",

  // Dates & Logistics (Main Event on 28 November 2026)
  dateDisplay: "28 NOVEMBER 2026",
  dateFullString: "28 NOVEMBER 2026 // THOUGHTWORKS TECHNOLOGIES, GURUGRAM",
  timeDisplay: "24-HOUR HACKATHON // 28 NOVEMBER 2026",
  targetDate: "2026-11-28T09:00:00+05:30", // Countdown to 28 November 2026
  registrationOpensDate: "8 November 2026",
  registrationClosesDate: "22 November 2026",
  pptDeadlineDate: "22 November 2026",
  phase1ResultsDate: "25 November 2026",
  phase2Date: "27 November 2026",
  grandFinaleDate: "28 November 2026",
  venue: "Thoughtworks Technologies, Gurugram",
  venueAddress: "Building 14, Tower B, DLF Cyber City, Sector 25, Gurugram, Haryana 122002",
  registrationUrl: "https://unstop.com/o/iPHpWUc?lb=bjos6kym&utm_medium=Share&utm_source=ubfxqrcy86969&utm_campaign=Online_coding_challenge",
  unstopUrl: "https://unstop.com/o/iPHpWUc?lb=bjos6kym&utm_medium=Share&utm_source=ubfxqrcy86969&utm_campaign=Online_coding_challenge",

  // Hero Synopsis
  heroSynopsis: "A premier 24-hour hackathon hosted by Google Developer Groups at Thoughtworks Technologies, Gurugram. Where technical creativity meets entrepreneurial thinking.",

  // Quick Stats
  stats: [
    { value: "1,500+", label: "DEVELOPERS", subtext: "Aspirants pan-India" },
    { value: "28", label: "NOV 2026", subtext: "Thoughtworks Gurugram" },
    { value: "FREE", label: "REGISTRATION", subtext: "Closes 22 Nov • PPT Mandatory" },
    { value: "₹25,000+", label: "PRIZE POOL", subtext: "Direct cash rewards & grants" }
  ],

  // 01. Event at a Glance Table (From PDF Page 1)
  eventAtAGlance: [
    { label: "REGISTRATION OPENS", value: "8 November 2026", detail: "Team enrollment window opens" },
    { label: "REGISTRATION CLOSES", value: "22 November 2026", detail: "Portal lock at midnight" },
    { label: "PPT SUBMISSION DEADLINE", value: "22 November 2026", detail: "Mandatory for Phase 1 screening" },
    { label: "PHASE 1 RESULTS", value: "25 November 2026", detail: "Shortlisted teams announced" },
    { label: "PHASE 2 (HACKATHON KICKOFF)", value: "27 November 2026", detail: "24-Hour Hackathon • Non-eliminatory" },
    { label: "GRAND FINALE (OFFLINE)", value: "28 November 2026", detail: "Thoughtworks Gurugram • Demos & Awards" }
  ],

  // 02, 03, 05. The Three Core Phases (From PDF Pages 1, 2, 3)
  phases: [
    {
      id: "phase-1",
      phaseNumber: 1,
      title: "Phase 1 – Idea Submission & PPT Screening",
      subtitle: "Screening & Squad Qualification",
      dateRange: "8–22 November 2026",
      mode: "Online",
      duration: "14 Days Submission Window",
      objective: "Identify promising ideas and shortlist top teams for the hackathon.",
      bulletPoints: [
        "8–22 November: Team registration window open.",
        "22 November: Deadline to submit the project idea PPT. PPT submission is mandatory for screening.",
        "25 November: Results declared for teams shortlisted from Phase 1.",
        "The screening panel rigorously evaluates all submitted ideas.",
        "Approximately 40–50 top teams will be shortlisted."
      ],
      keyMilestones: "22 NOV • PPT submission closes | 25 NOV • Phase 1 shortlist announced",
      outcome: "Only shortlisted teams proceed to Phase 2.",
      isEliminatory: true,
      statusBadge: "MANDATORY PPT SCREENING"
    },
    {
      id: "phase-2",
      phaseNumber: 2,
      title: "Phase 2 – 24-Hour Hackathon",
      subtitle: "Implementation & Non-Eliminatory Mentoring",
      dateRange: "27 November 2026",
      mode: "Online",
      duration: "24 Hours",
      objective: "Enable shortlisted teams to develop and improve their proposed solutions.",
      bulletPoints: [
        "Teams work collaboratively on implementing their project ideas.",
        "One mentoring round takes place after 4:00 PM.",
        "Mentors provide technical guidance, help teams overcome challenges, and share feedback.",
        "NON-ELIMINATORY ROUND: No teams are eliminated during Phase 2.",
        "Every shortlisted team participating in the hackathon remains eligible to proceed to Phase 3, irrespective of its performance in this round."
      ],
      keyMilestones: "27 NOV • 24H Sprint Begins | 26 NOV AFTER 4:00 PM • First Mentoring Round",
      outcome: "Every participating team advances to the Grand Finale at Thoughtworks.",
      isEliminatory: false,
      statusBadge: "NON-ELIMINATORY ROUND"
    },
    {
      id: "phase-3",
      phaseNumber: 3,
      title: "Phase 3 – Offline Hackathon: Grand Finale",
      subtitle: "In-Person Crucible, Mentoring & Final Judging",
      dateRange: "28 November 2026",
      mode: "Offline",
      duration: "09:00 AM – 05:00 PM IST",
      objective: "Shortlisted teams come together in person to refine, demonstrate, and present their solutions to the judging panel.",
      bulletPoints: [
        "VENUE: Thoughtworks Technologies, Gurugram.",
        "9:00 AM – 12:00 PM: Second Mentoring Round (ELIMINATORY). Assigned mentors review project progress, suggest improvements, and help teams refine solutions.",
        "CRITICAL: The second mentoring round is the eliminatory round.",
        "12:00 PM – 5:00 PM: Final Judging Round. Teams present their completed projects to the judging panel.",
        "Judges evaluate solutions across 6 parameters and determine the final winners."
      ],
      keyMilestones: "28 NOV 9:00 AM • Eliminatory Mentoring | 28 NOV 12:00 PM • Final Judging",
      outcome: "Final winners determined through the offline judging round.",
      isEliminatory: true,
      statusBadge: "OFFLINE CRUCIBLE & AWARDS"
    }
  ] as EventPhase[],

  // 04. Mentoring Structure (From PDF Page 2)
  mentoringStructure: [
    {
      id: "mentor-round-1",
      roundName: "FIRST MENTORING ROUND",
      phase: "Phase 2 (Online Hackathon)",
      date: "27 November 2026",
      mode: "Online",
      timing: "After 4:00 PM IST",
      purpose: "Technical guidance and architectural feedback during active project development.",
      roundType: "Non-eliminatory",
      highlight: "Guaranteed passage: zero eliminations in Phase 2."
    },
    {
      id: "mentor-round-2",
      roundName: "SECOND MENTORING ROUND",
      phase: "Phase 3 (Grand Finale at Thoughtworks)",
      date: "28 November 2026",
      mode: "Offline",
      timing: "9:00 AM – 12:00 PM IST",
      purpose: "Progress review and final project refinement before formal jury presentations.",
      roundType: "ELIMINATORY",
      highlight: "SECOND MENTORING ROUND = ELIMINATORY ROUND."
    }
  ] as MentoringRound[],

  // 06. Final Judging Parameters (From PDF Page 3)
  judgingCriteria: [
    {
      id: "crit-1",
      name: "INNOVATION",
      descriptor: "Originality and creative problem articulation.",
      category: "CREATIVE THRESHOLD"
    },
    {
      id: "crit-2",
      name: "PROBLEM SOLVING",
      descriptor: "Relevance of the chosen challenge and novel approach.",
      category: "STRATEGIC IMPACT"
    },
    {
      id: "crit-3",
      name: "TECHNICAL IMPLEMENTATION",
      descriptor: "Quality of execution, code architecture, and craftsmanship.",
      category: "ENGINEERING DEPTH"
    },
    {
      id: "crit-4",
      name: "FEASIBILITY",
      descriptor: "Practicality, real-world operational viability, and scale.",
      category: "VIABILITY"
    },
    {
      id: "crit-5",
      name: "IMPACT",
      descriptor: "Potential transformative value and measurable outcomes.",
      category: "MISSION VALUE"
    },
    {
      id: "crit-6",
      name: "PRESENTATION",
      descriptor: "Clarity of demonstration, communication, and defense.",
      category: "STAGE DEFENSE"
    }
  ] as JudgingCriterion[],

  // 07. Important Notes for Participants (From PDF Page 3)
  importantNotes: [
    "PPT submission is mandatory for Phase 1 screening; deadline: 22 November 2026.",
    "Phase 1 shortlisted-team results will be declared on 25 November 2026.",
    "Only the top 40–50 shortlisted teams proceed from Phase 1 to Phase 2.",
    "Phase 2 on 27 November (24-Hour Hackathon) is strictly non-eliminatory.",
    "The second mentoring round on 28 November (9:00 AM–12:00 PM) is the eliminatory round.",
    "Final winners are determined through the offline judging round at Thoughtworks Technologies, Gurugram on 28 November."
  ],

  // Section 1: The Mission — 4 Bento Pillars (image_866a6ac6.png)
  missionPillars: [
    {
      id: "pillar-innovation",
      title: "INNOVATION & PROBLEM SOLVING",
      description: "Identify and tackle real-world challenges through unconventional thinking and novel approaches.",
      iconName: "lightbulb",
      isWide: false
    },
    {
      id: "pillar-tech",
      title: "TECHNICAL EXCELLENCE",
      description: "Focus on hands-on project development and modern product thinking.",
      iconName: "cpu",
      isWide: false
    },
    {
      id: "pillar-startup",
      title: "STARTUP FUNDAMENTALS",
      description: "Mastering idea validation, market fit, and scalable business models.",
      iconName: "rocket",
      isWide: false
    },
    {
      id: "pillar-community",
      title: "COMMUNITY ALLIANCE",
      description: "Fostering interdisciplinary collaboration and deep networking across student builders, mentors, and industry veterans.",
      iconName: "users",
      isWide: true
    }
  ] as BentoPillar[],

  // Section 2: Chronological Timeline Path (Curved SVG Journey)
  timeline: [
    {
      id: "time-1",
      time: "08 NOV 2026",
      marker: "PHASE 1",
      title: "REGISTRATION OPENS",
      phase: "SQUAD ENROLLMENT",
      description: "Portal opens for all developer teams. Registration is 100% free and open to student builders pan-India.",
      deliverable: "Team formation (2 to 4 members) & portal onboarding",
      side: "left",
      highlightBadge: "NOW OPEN"
    },
    {
      id: "time-2",
      time: "22 NOV 2026",
      marker: "DEADLINE",
      title: "PPT SUBMISSION DEADLINE",
      phase: "MANDATORY SCREENING",
      description: "Deadline to submit the project idea presentation deck. PPT submission is strictly mandatory for Phase 1 screening.",
      deliverable: "Max 8-slide deck detailing problem, architecture & prototype",
      side: "right",
      highlightBadge: "CRITICAL DEADLINE"
    },
    {
      id: "time-3",
      time: "25 NOV 2026",
      marker: "SHORTLIST",
      title: "PHASE 1 RESULTS DECLARED",
      phase: "SHORTLIST ANNOUNCED",
      description: "The screening panel evaluates all project proposals. Shortlisted teams advance to Phase 2.",
      deliverable: "Official shortlist announcement & hacker credentials issued",
      side: "left",
      highlightBadge: "MERIT SHORTLIST"
    },
    {
      id: "time-4",
      time: "27 NOV 2026",
      marker: "PHASE 2",
      title: "24-HOUR HACKATHON SPRINTS",
      phase: "ROUND 1 MENTORING",
      description: "Teams work collaboratively around the clock to build their prototypes. Mentoring begins after 4:00 PM for technical guidance and feedback.",
      deliverable: "Working code repository & live prototype deployment",
      side: "right",
      highlightBadge: "24H HACKATHON"
    },
    {
      id: "time-5",
      time: "28 NOV // 09:00 AM",
      marker: "PHASE 3",
      title: "OFFLINE MENTORING & REFINEMENT",
      phase: "THOUGHTWORKS GURUGRAM",
      description: "Shortlisted teams assemble offline at Thoughtworks Technologies, Gurugram. Assigned mentors review progress, suggest improvements, and guide final preparations.",
      deliverable: "Mentor sign-off, feedback implementation & jury readiness",
      side: "left",
      highlightBadge: "GRAND FINALE"
    },
    {
      id: "time-6",
      time: "28 NOV // 12:00 PM",
      marker: "FINALE",
      title: "FINAL JUDGING ROUND & ASCENSION",
      phase: "THE GRAND UNVEIL",
      description: "12:00 PM – 5:00 PM: Teams present their completed projects to the executive judging panel across the 6 criteria to determine the final champions.",
      deliverable: "Live stage demonstration, jury scoring & bounty conferral",
      side: "right",
      highlightBadge: "GRAND FINALE"
    }
  ] as ScheduleItem[],

  // Section 3: Collaborators Marquee
  collaborators: [
    { name: "Google Developer Groups", tagline: "Global Ecosystem" },
    { name: "Thoughtworks Technologies", tagline: "Grand Finale Venue Partner" },
    { name: "Google for Developers", tagline: "Platform Patron" },
    { name: "GitHub Education", tagline: "Developer Infrastructure" },
    { name: "JetBrains", tagline: "Professional Tooling" },
    { name: ".xyz Domains", tagline: "Web Infrastructure" },
    { name: "Unstop", tagline: "Registration Partner" },
    { name: "GDG On Campus ABESEC", tagline: "Organizing Chapter" }
  ] as Collaborator[],

  // Section 4: Prize Rewards — 3 Cards with Top Reward
  prizes: [
    {
      id: "prize-tech",
      amount: "₹7,500",
      title: "TECHNICAL EXCELLENCE",
      description: "Best overall engineering, system resilience, and code quality.",
      isTopReward: false
    },
    {
      id: "prize-grand",
      rankBadge: "TOP REWARD",
      amount: "₹11,000",
      title: "THE GRAND UNVEIL",
      description: "Most innovative and impactful project built during the 24-hour hackathon.",
      isTopReward: true
    },
    {
      id: "prize-future",
      amount: "₹4,800",
      title: "FUTURE TECH AWARD",
      description: "Best use of emerging technologies & industrial cyber-physical design.",
      isTopReward: false
    }
  ] as PrizeCard[],

  specialBounties: [
    { label: "ALL-WOMEN SQUAD CITATION", reward: "₹3,000 + Swag Fortress", desc: "Recognizing outstanding technical innovation by women engineers." },
    { label: "BEST HARDWARE / AI PROTOTYPE", reward: "₹3,000 + Silicon Dev Kit", desc: "For the most resilient embedded hardware or agentic AI prototype." },
    { label: "ALL SHORTLISTED TEAMS", reward: "Hard-Copy Framed Certificates", desc: "Official certificate of merit for all qualifying finalist squads." }
  ],

  // Section 5: FAQs
  faqs: [
    {
      id: "faq-1",
      question: "What is the three-phase structure of Exora 2.0?",
      answer: "Exora 2.0 runs in three distinct stages: Phase 1 (Idea Submission & PPT Screening from 8–22 Nov), Phase 2 (24-Hour Hackathon commencing 27 Nov with mentoring), and Phase 3 (Grand Finale & judging on 28 Nov at Thoughtworks Technologies, Gurugram)."
    },
    {
      id: "faq-2",
      question: "Is PPT submission mandatory for screening?",
      answer: "Yes, submitting the project idea PPT is strictly mandatory. The submission deadline is 22 November 2026. The screening panel evaluates all submitted decks to determine the shortlisted teams advancing to Phase 2, announced on 25 November."
    },
    {
      id: "faq-3",
      question: "Can my team get eliminated during the 24-Hour Hackathon?",
      answer: "No. The Phase 2 24-hour hackathon (27 November 2026) is strictly a non-eliminatory round! Every shortlisted team participating in the hackathon remains fully eligible to proceed to Phase 3, irrespective of its performance in Phase 2."
    },
    {
      id: "faq-4",
      question: "What happens during the Mentoring Rounds?",
      answer: "Round 1 takes place online on 27 November after 4:00 PM for active technical feedback. Round 2 takes place offline on 28 November morning at Thoughtworks Technologies, Gurugram for progress review and final project refinement before stage presentations."
    },
    {
      id: "faq-5",
      question: "Where is the Grand Finale held and who attends?",
      answer: "Phase 3 (Grand Finale) is hosted offline at Thoughtworks Technologies in Gurugram on 28 November 2026. Shortlisted teams attend in person to refine, demonstrate, and defend their completed solutions before the executive jury."
    },
    {
      id: "faq-6",
      question: "What are the final judging parameters?",
      answer: "The jury scores teams across 6 core criteria: Innovation (originality & creativity), Problem Solving (relevance & approach), Technical Implementation (quality of execution), Feasibility (practicality & viability), Impact (potential value & outcomes), and Presentation (clarity of demonstration)."
    }
  ] as FAQItem[],

  // Organizers (for TransmissionForm & Comms)
  organizers: [
    {
      name: "Lead Organiser",
      role: "Community Lead · Google Developer Groups",
      email: "gdg.exora@gmail.com",
      handle: "@gdg_exora",
      phone: "+91 98765 43210"
    },
    {
      name: "Technical Directorate",
      role: "Lead Systems Architect & Judge Liaison",
      email: "tech@thoughtworks-exora.xyz",
      handle: "@tech_exora",
      phone: "+91 98765 43211"
    },
    {
      name: "Operations Directorate",
      role: "Venue Coordinator · Thoughtworks Gurugram",
      email: "ops@thoughtworks-exora.xyz",
      handle: "@ops_exora",
      phone: "+91 98765 43212"
    }
  ] as OrganizerContact[],

  contactEmail: "dsc@abes.ac.in",
  contactLocation: "Thoughtworks Technologies, Gurugram",
  footerQuote: "“Build. Innovate. Exora. Turn your ideas into impactful solutions!”",

  socialLinks: [
    { label: "UNSTOP", url: "https://unstop.com/hackathons/exora-20-unveil-the-build-abes-engineering-college-1799143" },
    { label: "COMMUNITY", url: "https://developers.google.com/community/gdg" },
    { label: "INSTAGRAM", url: "https://www.instagram.com/gdg.abesec" },
    { label: "LINKEDIN", url: "https://www.linkedin.com/company/gdg-abesec/" },
    { label: "DISCORD", url: "https://discord.gg/gdgabesec" }
  ]
};
