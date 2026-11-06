import React from 'react';

interface GlyphProps {
  className?: string;
  accent?: string;
}

/**
 * OP-01 // VAULT — Precision Security Shield Glyph (< 1 KB)
 */
export const VaultShieldGlyph: React.FC<GlyphProps> = ({ className = "w-6 h-6", accent }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke={accent || "currentColor"}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 2L4 6v6c0 5.5 3.5 10 8 11 4.5-1 8-5.5 8-11V6l-8-4z" />
    <path d="M12 9v4" strokeWidth="2" />
    <circle cx="12" cy="15" r="1.25" fill={accent || "currentColor"} />
    <path d="M9 11h6" opacity="0.6" strokeDasharray="1 2" />
  </svg>
);

/**
 * OP-02 // PULSE — Cardiac Wave & Biometric Heart Glyph (< 1 KB)
 */
export const PulseHeartGlyph: React.FC<GlyphProps> = ({ className = "w-6 h-6", accent }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke={accent || "currentColor"}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" opacity="0.5" />
    <path d="M4 13h3l2-4l3 8l2-6l2 2h4" strokeWidth="1.75" />
  </svg>
);

/**
 * OP-03 // LEDGER — Linked Cryptographic Blockchain Blocks Glyph (< 1 KB)
 */
export const LedgerBlocksGlyph: React.FC<GlyphProps> = ({ className = "w-6 h-6", accent }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke={accent || "currentColor"}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="4" width="7" height="7" rx="1.5" />
    <rect x="14" y="13" width="7" height="7" rx="1.5" />
    <path d="M10 7.5h2.5a2 2 0 0 1 2 2v3.5" strokeWidth="1.75" />
    <path d="M17.5 13V9.5a2 2 0 0 0-2-2H10" opacity="0.5" strokeDasharray="2 2" />
    <circle cx="6.5" cy="7.5" r="1" fill={accent || "currentColor"} />
    <circle cx="17.5" cy="16.5" r="1" fill={accent || "currentColor"} />
  </svg>
);

/**
 * OP-04 // IRONWORKS — Industrial Precision Cog & Spoke Glyph (< 1 KB)
 */
export const IronworksGearGlyph: React.FC<GlyphProps> = ({ className = "w-6 h-6", accent }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke={accent || "currentColor"}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

/**
 * OP-05 // WILDCARD — Kinetic Nova Spark Glyph (< 1 KB)
 */
export const WildcardSparkGlyph: React.FC<GlyphProps> = ({ className = "w-6 h-6", accent }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke={accent || "currentColor"}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2z" />
    <circle cx="12" cy="12" r="1.5" fill={accent || "currentColor"} />
    <path d="M4.5 4.5l2 2m11 11l2 2m-13 0l2-2m11-11l-2 2" strokeWidth="1.25" opacity="0.6" />
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
      return <VaultShieldGlyph className={className} accent={accent} />;
    case 'pulse':
      return <PulseHeartGlyph className={className} accent={accent} />;
    case 'ledger':
      return <LedgerBlocksGlyph className={className} accent={accent} />;
    case 'ironworks':
      return <IronworksGearGlyph className={className} accent={accent} />;
    case 'wildcard':
      return <WildcardSparkGlyph className={className} accent={accent} />;
    default:
      return null;
  }
};
