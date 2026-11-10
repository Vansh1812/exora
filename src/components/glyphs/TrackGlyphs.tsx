import React from 'react';

interface GlyphProps {
  className?: string;
  accent?: string;
}

/**
 * ORBIT 01 // SENTINEL — Planet with Protective Equatorial Orbital Shield Ring (#5b7cff)
 */
export const SentinelOrbitGlyph: React.FC<GlyphProps> = ({ className = "w-6 h-6", accent = "#5b7cff" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke={accent}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {/* Central Planet Sphere */}
    <circle cx="12" cy="12" r="5" fill={`${accent}22`} />
    {/* Elliptical Angled Shield Ring */}
    <ellipse cx="12" cy="12" rx="9.5" ry="3.5" transform="rotate(-25 12 12)" strokeDasharray="3 2" />
    {/* Center Core Spark */}
    <circle cx="12" cy="12" r="1.5" fill={accent} />
  </svg>
);

/**
 * ORBIT 02 // VITALIS — Planet with Concentric Biometric Pulse Rings (#ff6f91)
 */
export const VitalisOrbitGlyph: React.FC<GlyphProps> = ({ className = "w-6 h-6", accent = "#ff6f91" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke={accent}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {/* Center Life Core */}
    <circle cx="12" cy="12" r="4" fill={`${accent}25`} />
    {/* Vital Harmonic Pulse Line crossing through */}
    <path d="M 3 12 H 7 L 9 9 L 12 16 L 15 8 L 17 12 H 21" strokeWidth="1.4" opacity="0.9" />
    {/* Radiating atmospheric aura */}
    <circle cx="12" cy="12" r="8.5" strokeDasharray="2 3" opacity="0.6" />
  </svg>
);

/**
 * ORBIT 03 // CONSENSUS — Planet with Cryptographic Orbital Hex Nodes (#8b5cf6)
 */
export const ConsensusOrbitGlyph: React.FC<GlyphProps> = ({ className = "w-6 h-6", accent = "#8b5cf6" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke={accent}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {/* Central Genesis Planet */}
    <circle cx="12" cy="12" r="4.5" fill={`${accent}30`} />
    {/* Hexagonal Orbit Ring */}
    <path d="M 12 3 L 19.5 7.5 V 16.5 L 12 21 L 4.5 16.5 V 7.5 Z" strokeDasharray="2 2" opacity="0.7" />
    {/* Orbital Satellite Nodes */}
    <circle cx="12" cy="3" r="1.5" fill={accent} />
    <circle cx="19.5" cy="16.5" r="1.5" fill={accent} />
    <circle cx="4.5" cy="16.5" r="1.5" fill={accent} />
  </svg>
);

/**
 * ORBIT 04 // KINETIC — Saturn Gyroscopic Dual Ring Planet (#ffc58a)
 * Directly inspired by the poster reference!
 */
export const KineticOrbitGlyph: React.FC<GlyphProps> = ({ className = "w-6 h-6", accent = "#ffc58a" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke={accent}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {/* Planet Body */}
    <circle cx="12" cy="12" r="5" fill={`${accent}25`} />
    {/* Gyroscopic Ring 1 */}
    <ellipse cx="12" cy="12" rx="9" ry="3.2" transform="rotate(-30 12 12)" />
    {/* Gyroscopic Ring 2 (crossing angle) */}
    <ellipse cx="12" cy="12" rx="9" ry="3.2" transform="rotate(35 12 12)" opacity="0.65" strokeDasharray="3 1.5" />
    {/* Tiny orbiting moon */}
    <circle cx="19" cy="6" r="1.2" fill={accent} />
  </svg>
);

/**
 * ORBIT 05 // HORIZON — Radiant 8-Point Diamond Nova Star (#6ee7f9)
 */
export const HorizonOrbitGlyph: React.FC<GlyphProps> = ({ className = "w-6 h-6", accent = "#6ee7f9" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke={accent}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {/* 4-Point Primary Diamond */}
    <path
      d="M 12 2 C 12 7, 14 9.5, 22 12 C 14 14.5, 12 17, 12 22 C 12 17, 10 14.5, 2 12 C 10 9.5, 12 7, 12 2 Z"
      fill={`${accent}25`}
    />
    {/* Secondary 4-Point Diagonal Ray */}
    <path d="M 6.5 6.5 L 17.5 17.5 M 17.5 6.5 L 6.5 17.5" strokeWidth="1" opacity="0.6" />
    {/* Core Starlight */}
    <circle cx="12" cy="12" r="1.6" fill={accent} />
  </svg>
);

/**
 * Glyph resolver map helper
 */
export const TrackGlyph: React.FC<{
  type: 'vault' | 'pulse' | 'ledger' | 'ironworks' | 'wildcard';
  className?: string;
  accent?: string;
}> = ({ type, className, accent }) => {
  switch (type) {
    case 'vault':
      return <SentinelOrbitGlyph className={className} accent={accent} />;
    case 'pulse':
      return <VitalisOrbitGlyph className={className} accent={accent} />;
    case 'ledger':
      return <ConsensusOrbitGlyph className={className} accent={accent} />;
    case 'ironworks':
      return <KineticOrbitGlyph className={className} accent={accent} />;
    case 'wildcard':
      return <HorizonOrbitGlyph className={className} accent={accent} />;
    default:
      return null;
  }
};
