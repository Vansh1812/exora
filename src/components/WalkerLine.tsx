import React from 'react';

interface WalkerLineProps {
  /**
   * Progress of the walker across the line (0 = start of straight path, 1 = reaching the magenta planet).
   * Default is 0.4 (matching the position in the Figma reference).
   */
  progress?: number;
  className?: string;
  showMoons?: boolean;
}

/**
 * Signature Component: The Walker Line ("The Walk Between Worlds")
 * Pixel-perfect match to Figma reference image (image_e6c68e98.png):
 * - Left: Glowing peach planet with emergent harmonic double-sine thread waves
 * - Line: Thin gradient line transitioning from golden thread into pink-magenta
 * - Walker: The exact cyan glowing traveler in full mid-stride walking towards the destination
 * - Right: 3D shaded magenta-violet planet with 2 orbiting spherical moons
 */
export const WalkerLine: React.FC<WalkerLineProps> = ({
  progress = 0.4,
  className = '',
  showMoons = true,
}) => {
  const clamped = Math.max(0, Math.min(1, progress));

  // In viewBox 0 0 960 160:
  // Left Peach Planet center: (95, 80), radius = 28
  // Waves start at (123, 80) and converge at (460, 80)
  // Straight walking line starts at x = 460, ends at x = 825, y = 80
  const straightStartX = 460;
  const straightEndX = 818;
  const lineY = 80;
  const walkerX = straightStartX + clamped * (straightEndX - straightStartX);

  return (
    <div className={`relative w-full select-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 960 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible drop-shadow-[0_4px_30px_rgba(224,77,255,0.28)]"
      >
        <defs>
          {/* Peach Planet Radial Gradient (with 3D sphere illumination) */}
          <radialGradient id="peachPlanetGrad" cx="38%" cy="38%" r="62%">
            <stop offset="0%" stopColor="#fff8f0" />
            <stop offset="25%" stopColor="#ffc58a" />
            <stop offset="70%" stopColor="#ff9a3c" />
            <stop offset="100%" stopColor="#d96b14" />
          </radialGradient>

          {/* Magenta Planet Radial Gradient */}
          <radialGradient id="magentaPlanetGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffe4ff" />
            <stop offset="30%" stopColor="#e04dff" />
            <stop offset="70%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#3b0764" />
          </radialGradient>

          {/* Moon Gradient */}
          <radialGradient id="moonGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffd8ff" />
            <stop offset="45%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#581c87" />
          </radialGradient>

          {/* Straight Line Gradient: Golden Peach to Pink to Magenta */}
          <linearGradient id="walkLineGrad" x1={straightStartX} y1={lineY} x2={straightEndX} y2={lineY} gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffc58a" />
            <stop offset="40%" stopColor="#ff9a3c" />
            <stop offset="70%" stopColor="#ff6f91" />
            <stop offset="100%" stopColor="#e04dff" />
          </linearGradient>

          {/* Wave Thread Gradients */}
          <linearGradient id="waveGrad1" x1="123" y1="80" x2="460" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffc58a" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#ffe699" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ffc58a" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="waveGrad2" x1="123" y1="80" x2="460" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ff9a3c" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ffc58a" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#ff9a3c" stopOpacity="0.9" />
          </linearGradient>

          {/* Luminous Cyan Glow for Walker */}
          <filter id="cyanGlowFigma" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.2" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="4.5" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Atmosphere Radial Glow Filter */}
          <filter id="planetAtmosphere" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* =========================================================================
            1. Left Glowing Peach Planet with Ambient Halos
            ========================================================================= */}
        <g id="figma-peach-planet">
          {/* Broad soft atmospheric glow */}
          <circle cx="95" cy="80" r="42" fill="#ffc58a" opacity="0.22" filter="url(#planetAtmosphere)" />
          {/* Secondary warm corona */}
          <circle cx="95" cy="80" r="32" fill="#ff9a3c" opacity="0.35" />
          {/* Main planet sphere */}
          <circle cx="95" cy="80" r="28" fill="url(#peachPlanetGrad)" />
          {/* Specular curved rim highlight */}
          <circle cx="93" cy="78" r="26" stroke="#ffffff" strokeWidth="1" opacity="0.45" fill="none" />
        </g>

        {/* =========================================================================
            2. Intertwined Harmonic Golden Thread Waves (Matching Figma Exactly)
            Emerging from right rim of peach planet (x=123) and converging into line at (x=460)
            ========================================================================= */}
        <g id="figma-golden-waves">
          {/* Wave Upper Strand */}
          <path
            d="M 123 80 C 180 54, 230 106, 290 80 C 350 54, 400 95, 460 80"
            stroke="url(#waveGrad1)"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
          />
          {/* Wave Lower Strand (crossing over) */}
          <path
            d="M 123 80 C 180 106, 230 54, 290 80 C 350 106, 400 65, 460 80"
            stroke="url(#waveGrad2)"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
          />
          {/* Subtle central harmonic harmonic line */}
          <path
            d="M 123 80 C 200 74, 270 86, 350 78 L 460 80"
            stroke="#ffc58a"
            strokeWidth="1"
            opacity="0.55"
            fill="none"
          />
        </g>

        {/* =========================================================================
            3. The Straight Gradient Walker Line
            Fading from Golden Peach into Pink into Magenta
            ========================================================================= */}
        <g id="figma-straight-line">
          {/* Soft outer line neon glow */}
          <line
            x1={straightStartX}
            y1={lineY}
            x2={straightEndX}
            y2={lineY}
            stroke="url(#walkLineGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.3"
          />
          {/* Crisp core gradient line */}
          <line
            x1={straightStartX}
            y1={lineY}
            x2={straightEndX}
            y2={lineY}
            stroke="url(#walkLineGrad)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </g>

        {/* =========================================================================
            4. The Cyan Walking Figure ("The Traveler")
            Silhouette matching image_e6c68e98.png:
            - Upright walking silhouette in athletic forward stride
            - Left foot planted on line, right leg trailing mid-stride
            - Arms swinging naturally in stride
            - Glowing in neon cyan (#6ee7f9)
            ========================================================================= */}
        <g
          id="figma-cyan-traveler"
          transform={`translate(${walkerX}, ${lineY})`}
          className="transition-transform duration-100 ease-out"
        >
          {/* Luminous contact glow on the line */}
          <ellipse cx="2" cy="0" rx="12" ry="2.4" fill="#6ee7f9" opacity="0.75" filter="url(#cyanGlowFigma)" />

          {/* Stride Figure (approx 28px tall, precisely scaled) */}
          <g filter="url(#cyanGlowFigma)">
            {/* Head */}
            <circle cx="2" cy="-26" r="2.8" fill="#6ee7f9" />
            
            {/* Neck */}
            <rect x="1" y="-23.2" width="1.8" height="2" rx="0.6" fill="#6ee7f9" />

            {/* Torso & upper body (slight forward lean) */}
            <path
              d="M -0.5 -21.5 C -0.5 -22, 4.5 -22, 4.5 -21.5 L 3.8 -11.5 C 3.8 -11.5, 1 -11, -1.2 -11.5 Z"
              fill="#6ee7f9"
            />

            {/* Front Arm (swinging forward into stride) */}
            <path
              d="M 3.8 -20.5 L 7.5 -15.5 L 9.2 -11 L 8 -10.6 L 6.2 -14.8 L 2.8 -19.2 Z"
              fill="#6ee7f9"
            />

            {/* Back Arm (swinging backward) */}
            <path
              d="M -0.2 -20.5 L -3.8 -16 L -5.2 -12 L -4 -11.6 L -2.8 -15.2 L 0.5 -19.2 Z"
              fill="#6ee7f9"
            />

            {/* Front Leg (stepping forward to the right, knee slightly bent, foot planted on line) */}
            <path
              d="M 2.2 -11.5 L 6.2 -5 L 8.5 -0.5 L 10.8 0 L 7.5 0 L 4.5 -4.8 L 0.8 -11.5 Z"
              fill="#6ee7f9"
            />

            {/* Back Leg (trailing backward to the left, knee bent, foot lifted in mid-stride) */}
            <path
              d="M -1.2 -11.5 L -4.8 -5.5 L -8.2 -1.2 L -9.5 -2.2 L -6.2 -6.2 L -2.5 -11.5 Z"
              fill="#6ee7f9"
            />
          </g>
        </g>

        {/* =========================================================================
            5. Right Magenta Planet with 2 Moons (Matching image_e6c68e98.png)
            ========================================================================= */}
        <g id="figma-magenta-planet">
          {/* Atmospheric outer glow */}
          <circle cx="855" cy="80" r="54" fill="#e04dff" opacity="0.22" filter="url(#planetAtmosphere)" />
          {/* Main sphere with 3D gradient */}
          <circle cx="855" cy="80" r="36" fill="url(#magentaPlanetGrad)" />
          {/* Crescent specular highlight on upper edge */}
          <circle cx="852" cy="77" r="33" stroke="#ffd8ff" strokeWidth="1.2" opacity="0.55" fill="none" />

          {showMoons && (
            <>
              {/* Moon 1: At the lower-left of the planet (matches Figma screenshot) */}
              <g id="figma-moon-lower-left">
                <circle cx="806" cy="115" r="7.5" fill="url(#moonGrad)" filter="drop-shadow(0 0 6px #e04dff)" />
                <circle cx="804" cy="113" r="6.5" stroke="#ffe4ff" strokeWidth="0.6" opacity="0.5" fill="none" />
              </g>

              {/* Moon 2: At the upper-right of the planet (matches Figma screenshot) */}
              <g id="figma-moon-upper-right">
                <circle cx="902" cy="46" r="4.5" fill="url(#moonGrad)" filter="drop-shadow(0 0 4px #c084fc)" />
              </g>
            </>
          )}
        </g>
      </svg>
    </div>
  );
};
