/**
 * Classified Hackathon Operations (Tracks) Data
 * Strictly adheres to OP-01 through OP-05 code names and accents
 */

export interface TrackData {
  id: string;
  codeName: string;
  title: string;
  accent: string;
  glyph: 'vault' | 'pulse' | 'ledger' | 'ironworks' | 'wildcard';
  brief: string;
  threatLevel: number; // 1 to 5
  problemStatements: string[];
  trackPerk?: string;
}

export const TRACKS_DATA: TrackData[] = [
  {
    id: "op-01",
    codeName: "OP-01 // VAULT",
    title: "FinTech & Cybersecurity",
    accent: "#7CFF6B",
    glyph: "vault",
    brief: "Secure sovereign treasuries and annihilate fiscal infiltrators before they pierce the perimeter.",
    threatLevel: 4,
    problemStatements: [
      "Real-time UPI fraud pattern interception and synthetic identity detection engine.",
      "Zero-knowledge cryptographic credential verification for decentralized banking APIs.",
      "Local-first privacy-preserving anomaly detection for cross-border student transactions."
    ],
    trackPerk: "Fast-Track Security Review & Dedicated Infrastructure Mentorship"
  },
  {
    id: "op-02",
    codeName: "OP-02 // PULSE",
    title: "HealthTech & Social Impact",
    accent: "#FF6B6B",
    glyph: "pulse",
    brief: "Subjugate biological decay; construct resilient diagnostic shields for vulnerable mortal populations.",
    threatLevel: 3,
    problemStatements: [
      "Edge-deployed triage diagnostics for remote primary healthcare clinics lacking connectivity.",
      "Privacy-preserving predictive outbreak telemetry using federated edge learning.",
      "Accessible multi-lingual cognitive therapy assistant for underserved community centers."
    ],
    trackPerk: "Clinical Validation Guidance & Social Impact Grant Evaluation"
  },
  {
    id: "op-03",
    codeName: "OP-03 // LEDGER",
    title: "Blockchain & Web3",
    accent: "#8B7CFF",
    glyph: "ledger",
    brief: "Dismantle fragile centralized monopolies with immutable, cryptographic sovereign consensus protocols.",
    threatLevel: 5,
    problemStatements: [
      "Transparent academic micro-credentialing and anti-tamper degree verification ledger.",
      "Decentralized disaster relief fund dispersion protocol with automated milestones.",
      "Zero-gas micro-patronage network empowering local open-source and hardware builders."
    ],
    trackPerk: "Web3 Gas Grants & Smart Contract Security Audit Sponsorship"
  },
  {
    id: "op-04",
    codeName: "OP-04 // IRONWORKS",
    title: "Physical AI, Robotics & IoT",
    accent: "#FFB020",
    glyph: "ironworks",
    brief: "Fuse silicon intellect with unyielding physical machinery to automate absolute operational dominance.",
    threatLevel: 4,
    problemStatements: [
      "Autonomous indoor drone routing and hazard detection for automated warehouses.",
      "Edge computer vision sensory module for preventative industrial machinery fault alerts.",
      "Smart agricultural micro-irrigation controller powered by low-power LoRaWAN nodes."
    ],
    trackPerk: "Hardware Testbench Access & Embedded Silicon Prototyping Kits"
  },
  {
    id: "op-05",
    codeName: "OP-05 // WILDCARD",
    title: "Open Innovation",
    accent: "#5EEAD4",
    glyph: "wildcard",
    brief: "Unleash untamed radical experiments that defy conventional taxonomy and shatter existing boundaries.",
    threatLevel: 5,
    problemStatements: [
      "Multi-agent collaborative code synthesis engine for legacy mainframe migrations.",
      "Distributed peer-to-peer mesh communications grid during urban infrastructure blackouts.",
      "Adaptive tactile learning interfaces translating complex spatial science for visually impaired youth."
    ],
    trackPerk: "Wildcard Jury Bounty & Venture Incubation Seed Consideration"
  }
];
