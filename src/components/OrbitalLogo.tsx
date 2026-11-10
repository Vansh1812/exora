import React from 'react';

interface OrbitalLogoProps {
  className?: string;
  showWordmark?: boolean;
  wordmarkClassName?: string;
}

/**
 * Minimal Orbital Logo Mark
 * - Thin circle (planet) with lavender stroke
 * - 4-point diamond sparkle on its upper right in peach
 * - Stylized "EXORA 2.0" wordmark in wide techno display font
 */
export const OrbitalLogo: React.FC<OrbitalLogoProps> = ({
  className = 'w-8 h-8',
  showWordmark = true,
  wordmarkClassName = 'text-sm sm:text-base',
}) => {
  return (
    <div className="flex items-center gap-2.5 select-none group">
      {/* Orbital Icon: Planet + Sparkle */}
      <div className={`relative shrink-0 flex items-center justify-center ${className}`}>
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_12px_rgba(224,77,255,0.4)]"
          aria-label="EXORA Orbital Insignia"
        >
          {/* Subtle Outer Glow */}
          <circle cx="17" cy="19" r="11" stroke="#8b5cf6" strokeWidth="1" opacity="0.35" />

          {/* Planet Circle with Lavender Stroke */}
          <circle
            cx="17"
            cy="19"
            r="11"
            stroke="url(#logoLavenderGrad)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Internal diagonal ring arc */}
          <path
            d="M 8 22 C 11 25, 23 25, 26 22"
            stroke="#a99fcf"
            strokeWidth="0.9"
            strokeDasharray="2 3"
            opacity="0.5"
          />

          {/* 4-Point Diamond Sparkle on Upper-Right (Peach) */}
          <g className="diamond-sparkle" style={{ transformOrigin: '27px 9px' }}>
            <path
              d="M 27 3 C 27 6.5, 29 8.5, 32.5 8.5 C 29 8.5, 27 10.5, 27 14 C 27 10.5, 25 8.5, 21.5 8.5 C 25 8.5, 27 6.5, 27 3 Z"
              fill="url(#logoPeachGrad)"
              filter="drop-shadow(0 0 4px #ffc58a)"
            />
          </g>

          <defs>
            <linearGradient id="logoLavenderGrad" x1="6" y1="8" x2="28" y2="30" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffd8ff" />
              <stop offset="50%" stopColor="#a99fcf" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <linearGradient id="logoPeachGrad" x1="21" y1="3" x2="33" y2="14" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#ffc58a" />
              <stop offset="100%" stopColor="#ff9a3c" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Wordmark */}
      {showWordmark && (
        <span
          className={`font-display font-normal uppercase tracking-[0.14em] text-[#f4f0ff] group-hover:text-[#ffc58a] transition-colors whitespace-nowrap ${wordmarkClassName}`}
        >
          EXORA <span className="text-[#6ee7f9] text-[0.8em] font-light">2.0</span>
        </span>
      )}
    </div>
  );
};
