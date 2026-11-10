import React from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  showSparkle?: boolean;
}

/**
 * Signature Component: Glass Pass Card
 * - 24px corner radius
 * - Dark violet gradient fill (#120a2e)
 * - 1px rgba(255, 255, 255, 0.14) crisp border
 * - Violet-to-orange ambient glow along the bottom edge
 * - Centered 4-point diamond sparkle SVG on top that gently pulses
 */
export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  showSparkle = true,
  ...props
}) => {
  return (
    <div
      className={`glass-pass-card relative p-6 sm:p-8 ${className}`}
      {...props}
    >
      {/* Top Diamond Sparkle centered on the card */}
      {showSparkle && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
          aria-hidden="true"
        >
          <div className="diamond-sparkle w-6 h-6 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* 4-Point Diamond Sparkle */}
              <path
                d="M12 2 C12 6.5 14.5 9 19 12 C14.5 15 12 17.5 12 22 C12 17.5 9.5 15 5 12 C9.5 9 12 6.5 12 2 Z"
                fill="url(#sparkleGrad)"
              />
              <defs>
                <linearGradient id="sparkleGrad" x1="5" y1="2" x2="19" y2="22" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="40%" stopColor="#ffc58a" />
                  <stop offset="100%" stopColor="#e04dff" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      )}

      {/* Subtle bottom edge gradient glow line */}
      <div
        className="absolute inset-x-8 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#8b5cf6] via-[#ff9a3c] to-transparent opacity-75 pointer-events-none"
        aria-hidden="true"
      />

      {/* Card Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
