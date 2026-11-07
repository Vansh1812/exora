import React from 'react';

interface GdgLogoMarkProps {
  className?: string;
  size?: number;
}

/**
 * Pixel-perfect Google Developer Groups (GDG) `< >` Brackets Insignia
 * Handcrafted vector matching the official GDG branding and user-supplied reference:
 * - Left `<` bracket: Red (#EA4335) upper pill, Blue (#4285F4) lower pill
 * - Right `>` bracket: Green (#34A853) upper pill, Yellow (#FBBC05) lower pill
 * - Finished with crisp dark stroke borders for high contrast on dark themes.
 */
export const GdgLogoMark: React.FC<GdgLogoMarkProps> = ({
  className = 'w-10 h-7 sm:w-11 sm:h-8',
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 68 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]"
        aria-label="Google Developer Groups"
      >
        {/* Left Bracket `<` (Apex pointing left, opening right) */}
        <g id="gdg-left-bracket">
          {/* Red Upper Arm (Ascending slash `/`, slants from left apex up-right) */}
          <g transform="translate(18, 19) rotate(45)">
            <rect
              x="-5.2"
              y="-13.68"
              width="10.4"
              height="27.36"
              rx="5.2"
              fill="#EA4335"
              stroke="#0d120f"
              strokeWidth="2.8"
              strokeLinejoin="round"
            />
          </g>

          {/* Blue Lower Arm (Descending backslash `\`, slants from left apex down-right; top cap forms smooth blue apex) */}
          <g transform="translate(18, 31) rotate(-45)">
            <rect
              x="-5.2"
              y="-13.68"
              width="10.4"
              height="27.36"
              rx="5.2"
              fill="#4285F4"
              stroke="#0d120f"
              strokeWidth="2.8"
              strokeLinejoin="round"
            />
          </g>
        </g>

        {/* Right Bracket `>` (Apex pointing right, opening left) */}
        <g id="gdg-right-bracket">
          {/* Yellow Lower Arm (Ascending slash `/`, slants from bottom-left up-right to apex) */}
          <g transform="translate(50, 31) rotate(45)">
            <rect
              x="-5.2"
              y="-13.68"
              width="10.4"
              height="27.36"
              rx="5.2"
              fill="#FBBC05"
              stroke="#0d120f"
              strokeWidth="2.8"
              strokeLinejoin="round"
            />
          </g>

          {/* Green Upper Arm (Descending backslash `\`, slants from top-left down-right to apex; bottom cap forms smooth green apex) */}
          <g transform="translate(50, 19) rotate(-45)">
            <rect
              x="-5.2"
              y="-13.68"
              width="10.4"
              height="27.36"
              rx="5.2"
              fill="#34A853"
              stroke="#0d120f"
              strokeWidth="2.8"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};
