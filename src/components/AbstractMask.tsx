import React from 'react';

interface AbstractMaskProps {
  eyeOffset?: { x: number; y: number };
  className?: string;
  onEyeClick?: () => void;
}

/**
 * Original Abstract Mask Silhouette (Inspired by Latverian Sovereign Iron & Cloak aesthetics)
 * Pure custom vector SVG — entirely original geometric art, zero copyrighted assets.
 */
export const AbstractMask: React.FC<AbstractMaskProps> = ({
  eyeOffset = { x: 0, y: 0 },
  className = '',
  onEyeClick,
}) => {
  return (
    <div className={`relative pointer-events-none select-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 600 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
      >
        <defs>
          {/* Intense Radial Glow for Optical Sensor Core */}
          <radialGradient id="sensorGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="25%" stopColor="#ffe66d" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#c9a227" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#2f4a3a" stopOpacity="0" />
          </radialGradient>

          {/* SVG Glow Filter for Eyes */}
          <filter id="eyeGlowFilter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Eye Slit Clip Paths so moving pupils stay contained inside optical housing */}
          <clipPath id="leftEyeSlitClip">
            <polygon points="214,324 286,324 276,351 224,351" />
          </clipPath>
          <clipPath id="rightEyeSlitClip">
            <polygon points="314,324 386,324 376,351 324,351" />
          </clipPath>

          {/* Emerald / Oxidized Steel Gradient */}
          <linearGradient id="cowlGrad" x1="300" y1="0" x2="300" y2="700" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1e3328" />
            <stop offset="40%" stopColor="#14211a" />
            <stop offset="100%" stopColor="#0b0d0c" />
          </linearGradient>

          <linearGradient id="plateSteel" x1="150" y1="180" x2="450" y2="550" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#31463b" />
            <stop offset="50%" stopColor="#1e2c24" />
            <stop offset="100%" stopColor="#121a15" />
          </linearGradient>

          <linearGradient id="highlightEdge" x1="200" y1="200" x2="400" y2="500" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4f725d" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#213127" stopOpacity="0.15" />
          </linearGradient>

          {/* Visor Deep Shadow */}
          <radialGradient id="visorRecess" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#030504" />
            <stop offset="100%" stopColor="#080d0a" />
          </radialGradient>
        </defs>

        {/* Outer Hood / Cloak Drape Silhouette */}
        <path
          d="M300 30
             C210 30 110 110 80 230
             C50 350 40 500 30 680
             C120 660 210 650 300 655
             C390 650 480 660 570 680
             C560 500 550 350 520 230
             C490 110 390 30 300 30Z"
          fill="url(#cowlGrad)"
          stroke="#2f4a3a"
          strokeWidth="1.5"
          opacity="0.85"
        />

        {/* Hood Crest Ridge / Arch */}
        <path
          d="M300 30 L300 240 M240 100 L300 240 L360 100"
          stroke="#3f5d4c"
          strokeWidth="1.2"
          strokeDasharray="4 4"
          opacity="0.55"
        />

        {/* Main Iron Faceplate Base */}
        <polygon
          points="200,210 400,210 435,320 420,470 380,560 300,600 220,560 180,470 165,320"
          fill="url(#plateSteel)"
          stroke="#476555"
          strokeWidth="2"
        />

        {/* Forehead Brow Armor Plate */}
        <polygon
          points="210,218 390,218 415,280 300,310 185,280"
          fill="#1b2821"
          stroke="#5a7e6c"
          strokeWidth="1.5"
        />

        {/* Crown Rivet Nodes */}
        <circle cx="230" cy="235" r="3" fill="#7ba08b" />
        <circle cx="300" cy="230" r="3.5" fill="#c9a227" opacity="0.9" />
        <circle cx="370" cy="235" r="3" fill="#7ba08b" />

        {/* Central Brow Crest Line */}
        <path d="M300 220 L300 310" stroke="#3f5a4b" strokeWidth="2" />

        {/* Deep Visor Eye Socket Recess */}
        <polygon
          points="195,310 405,310 395,370 300,395 205,370"
          fill="url(#visorRecess)"
          stroke="#1b2820"
          strokeWidth="2"
        />

        {/* =========================================================================
            DYNAMIC GLOWING OPTICAL EYES (Interactive Parallax Tracking + Ambient Motion)
            ========================================================================= */}
        <g id="optical-eyes-system" className="animate-eye-ignite">
          {/* Left Eye Assembly */}
          <g clipPath="url(#leftEyeSlitClip)">
            <rect x="210" y="320" width="80" height="35" fill="#040605" />
            <g
              transform={`translate(${eyeOffset.x}, ${eyeOffset.y})`}
              style={{
                transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
                transformBox: 'fill-box',
              }}
            >
              {/* Outer Golden Corona */}
              <ellipse cx="250" cy="337" rx="18" ry="6.5" fill="url(#sensorGlow)" filter="url(#eyeGlowFilter)" />
              {/* Core Amber Iris */}
              <ellipse cx="250" cy="337" rx="11" ry="4" fill="#c9a227" />
              {/* Pinpoint White Specular Spark */}
              <ellipse cx="250" cy="337" rx="5.5" ry="1.8" fill="#ffffff" />
              {/* Crosshair Horizontal Target Line */}
              <line x1="237" y1="337" x2="263" y2="337" stroke="#ffffff" strokeWidth="0.8" opacity="0.8" />
            </g>
          </g>

          {/* Right Eye Assembly */}
          <g clipPath="url(#rightEyeSlitClip)">
            <rect x="310" y="320" width="80" height="35" fill="#040605" />
            <g
              transform={`translate(${eyeOffset.x}, ${eyeOffset.y})`}
              style={{
                transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
                transformBox: 'fill-box',
              }}
            >
              {/* Outer Golden Corona */}
              <ellipse cx="350" cy="337" rx="18" ry="6.5" fill="url(#sensorGlow)" filter="url(#eyeGlowFilter)" />
              {/* Core Amber Iris */}
              <ellipse cx="350" cy="337" rx="11" ry="4" fill="#c9a227" />
              {/* Pinpoint White Specular Spark */}
              <ellipse cx="350" cy="337" rx="5.5" ry="1.8" fill="#ffffff" />
              {/* Crosshair Horizontal Target Line */}
              <line x1="337" y1="337" x2="363" y2="337" stroke="#ffffff" strokeWidth="0.8" opacity="0.8" />
            </g>
          </g>
        </g>

        {/* Optical Sensor Housing Frames (Beveled Slit Borders) */}
        <polygon
          points="215,325 285,325 275,350 225,350"
          fill="none"
          stroke="#3f5a4a"
          strokeWidth="1.5"
        />
        <polygon
          points="315,325 385,325 375,350 325,350"
          fill="none"
          stroke="#3f5a4a"
          strokeWidth="1.5"
        />

        {/* Interactive Click Hitbox for Eyes (Easter Egg trigger) */}
        <rect
          x="210"
          y="318"
          width="180"
          height="40"
          fill="transparent"
          className="cursor-pointer pointer-events-auto"
          onClick={onEyeClick}
          aria-label="Target Dr. Doom Visor"
        />

        {/* Angular Nose Bridge & Cheeks */}
        <polygon
          points="290,340 310,340 320,440 300,465 280,440"
          fill="#1f2d25"
          stroke="#3f5a4b"
          strokeWidth="1.5"
        />

        {/* Left Cheek Plate */}
        <polygon
          points="185,360 270,365 260,460 195,450"
          fill="#17231c"
          stroke="#2f4639"
          strokeWidth="1"
        />

        {/* Right Cheek Plate */}
        <polygon
          points="415,360 330,365 340,460 405,450"
          fill="#17231c"
          stroke="#2f4639"
          strokeWidth="1"
        />

        {/* Mouth Ventilation Grills / Slits */}
        <g stroke="#395243" strokeWidth="2.5" strokeLinecap="round" opacity="0.85">
          <line x1="260" y1="480" x2="340" y2="480" />
          <line x1="265" y1="495" x2="335" y2="495" />
          <line x1="270" y1="510" x2="330" y2="510" />
          <line x1="278" y1="525" x2="322" y2="525" />
          <line x1="288" y1="540" x2="312" y2="540" />
        </g>

        {/* Vertical Jaw Seam */}
        <line x1="300" y1="465" x2="300" y2="585" stroke="#16221b" strokeWidth="2" />

        {/* Jaw Armor Rivets */}
        <circle cx="215" cy="460" r="2.5" fill="#698776" />
        <circle cx="385" cy="460" r="2.5" fill="#698776" />
        <circle cx="240" cy="545" r="2.5" fill="#698776" />
        <circle cx="360" cy="545" r="2.5" fill="#698776" />

        {/* Steel Plate Chamfer Light Reflection */}
        <path
          d="M170 320 L205 215 L300 215"
          stroke="url(#highlightEdge)"
          strokeWidth="2"
        />
        <path
          d="M430 320 L395 215 L300 215"
          stroke="url(#highlightEdge)"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};
