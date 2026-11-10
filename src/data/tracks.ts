/**
 * Orbital Tracks Data ("Choose Your Orbit")
 * Strictly adheres to ORBIT 01 through ORBIT 05 code names, celestial glyphs, and exact hex tokens
 */

export interface TrackData {
  id: string;
  codeName: string;
  title: string;
  accent: string;
  glyph: 'vault' | 'pulse' | 'ledger' | 'ironworks' | 'wildcard';
  brief: string;
  difficulty: number; // 1 to 5 stars
  problemStatements: string[];
  trackPerk?: string;
  isWideStrip?: boolean;
}

export const TRACKS_DATA: TrackData[] = [
  {
    id: "orbit-01",
    codeName: "ORBIT 01 // SENTINEL",
    title: "FinTech & Cybersecurity",
    accent: "#5b7cff",
    glyph: "vault",
    brief: "Construct unbreachable fiscal fortresses and zero-trust verification engines that safeguard economic frontiers.",
    difficulty: 4,
    problemStatements: [
      "Real-time UPI fraud pattern interception and synthetic identity detection engine.",
      "Zero-knowledge cryptographic credential verification for decentralized banking APIs.",
      "Local-first privacy-preserving anomaly detection for cross-border student transactions."
    ],
    trackPerk: "Fast-Track Security Review & Dedicated Infrastructure Mentorship"
  },
  {
    id: "orbit-02",
    codeName: "ORBIT 02 // VITALIS",
    title: "HealthTech & Social Impact",
    accent: "#ff6f91",
    glyph: "pulse",
    brief: "Bridge the planetary healthcare divide with edge diagnostics and resilient community life-support systems.",
    difficulty: 3,
    problemStatements: [
      "Edge-deployed triage diagnostics for remote primary healthcare clinics lacking connectivity.",
      "Privacy-preserving predictive outbreak telemetry using federated edge learning.",
      "Accessible multi-lingual cognitive therapy assistant for underserved community centers."
    ],
    trackPerk: "Clinical Validation Guidance & Social Impact Grant Evaluation"
  },
  {
    id: "orbit-03",
    codeName: "ORBIT 03 // CONSENSUS",
    title: "Blockchain & Web3",
    accent: "#8b5cf6",
    glyph: "ledger",
    brief: "Forge immutable decentralized protocols and peer-to-peer coordination networks that return agency to builders.",
    difficulty: 5,
    problemStatements: [
      "Transparent academic micro-credentialing and anti-tamper degree verification ledger.",
      "Decentralized disaster relief fund dispersion protocol with automated milestones.",
      "Zero-gas micro-patronage network empowering local open-source and hardware builders."
    ],
    trackPerk: "Web3 Gas Grants & Smart Contract Security Audit Sponsorship"
  },
  {
    id: "orbit-04",
    codeName: "ORBIT 04 // KINETIC",
    title: "Physical AI, Robotics & IoT",
    accent: "#ffc58a",
    glyph: "ironworks",
    brief: "Fuse spatial intelligence with embedded silicon and robotic hardware to automate the physical world.",
    difficulty: 4,
    problemStatements: [
      "Autonomous indoor drone routing and hazard detection for automated warehouses.",
      "Edge computer vision sensory module for preventative industrial machinery fault alerts.",
      "Smart agricultural micro-irrigation controller powered by low-power LoRaWAN nodes."
    ],
    trackPerk: "Hardware Testbench Access & Embedded Silicon Prototyping Kits"
  },
  {
    id: "orbit-05",
    codeName: "ORBIT 05 // HORIZON",
    title: "Open Innovation",
    accent: "#6ee7f9",
    glyph: "wildcard",
    brief: "Launch radical experiments that transcend established categories and chart uncharted technological territory.",
    difficulty: 5,
    problemStatements: [
      "Multi-agent collaborative code synthesis engine for legacy architecture migrations.",
      "Distributed peer-to-peer mesh communications grid during urban infrastructure blackouts.",
      "Adaptive tactile learning interfaces translating complex spatial science for visually impaired youth."
    ],
    trackPerk: "Wildcard Jury Bounty & Venture Incubation Seed Consideration",
    isWideStrip: true
  }
];
