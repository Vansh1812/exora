import React from 'react';
import { EVENT_CONFIG } from '../eventConfig';
import { WalkerLine } from './WalkerLine';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenRegisterModal?: () => void;
  onTriggerEasterEgg?: () => void;
}

/**
 * Orbital Walk Hero Section ("Unveil The Build")
 * Bold, colossal typographic layout inspired by image_d7274707.png:
 * - Clean date/venue top kicker pill
 * - Signature Walker Line between peach and magenta planet
 * - Massive two-tiered title occupying the viewport:
 *   1. Solid white & cyan "EXORA 2.0"
 *   2. Colossal hollow outline glowing neon "UNVEIL THE BUILD"
 * - Clean celestial theme one-liner ("The Walk Between Worlds")
 * - Two centered prominent CTAs: "RESERVE YOUR ORBIT" & "VIEW SCHEDULE"
 * - Wave divider at the base
 */
export const Hero: React.FC<HeroProps> = () => {
  const handleScrollToTimeline = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const timeline = document.querySelector('#timeline');
    if (timeline) {
      timeline.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[96vh] flex flex-col items-center justify-between text-center overflow-hidden pt-10 sm:pt-14 pb-0 px-4 sm:px-6 lg:px-8"
    >
      {/* Background Ambient Celestial Glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[500px] sm:h-[700px] rounded-full pointer-events-none blur-[140px] opacity-25 bg-gradient-to-b from-[#8b5cf6] via-[#e04dff] to-[#ff9a3c]"
        aria-hidden="true"
      />

      {/* Main Content Container - Fills the viewport window with colossal typography */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center justify-center flex-1 w-full py-6 sm:py-8">
        {/* 1. Date & Venue Top Kicker Pill */}
        <div className="inline-flex items-center gap-2 mb-3 sm:mb-4 px-4 py-1.5 rounded-full bg-[#120a2e]/70 border border-white/10 text-[11px] sm:text-xs font-display tracking-[0.18em] uppercase text-[#ffc58a] backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#ffc58a] shadow-[0_0_8px_#ffc58a]" />
          <span>28 NOVEMBER 2026 // THOUGHTWORKS TECHNOLOGIES, GURUGRAM</span>
        </div>

        {/* 2. Signature Walker Line (Celestial signature from Figma) */}
        <div className="w-full max-w-2xl px-2 sm:px-6 my-2 sm:my-3">
          <WalkerLine progress={0.42} showMoons={true} />
        </div>

        {/* 3. Colossal Two-Line Title Occupying the Viewport Window */}
        <h1 className="flex flex-col items-center justify-center text-center select-none my-2 sm:my-3 w-full">
          {/* Line 1: Solid "EXORA 2.0" */}
          <span className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[11.5rem] font-normal tracking-[0.06em] text-[#f4f0ff] uppercase leading-none drop-shadow-[0_4px_35px_rgba(224,77,255,0.35)]">
            EXORA <span className="text-[#6ee7f9] font-light">2.0</span>
          </span>

          {/* Line 2: Giant Outlined Glowing Neon "UNVEIL THE BUILD" (Matching image_d7274707.png) */}
          <span
            style={{
              WebkitTextStroke: 'clamp(1.5px, 0.28vw, 2.5px) #e04dff',
              color: 'transparent',
              textShadow: '0 0 30px rgba(224, 77, 255, 0.65), 0 0 60px rgba(255, 154, 60, 0.35)',
            }}
            className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light uppercase tracking-[0.14em] leading-none mt-2 sm:mt-4"
          >
            UNVEIL THE BUILD
          </span>
        </h1>

        {/* 4. Cosmic Theme One-Liner (Replaced generic technical text with theme) */}
        <p className="font-sans text-sm sm:text-base md:text-lg text-[#a99fcf] max-w-xl mx-auto mt-4 sm:mt-5 mb-8 sm:mb-10 leading-relaxed font-light">
          The Walk Between Worlds · A 24-Hour Orbital Crucible by Google Developer Groups
        </p>

        {/* 5. Two Prominent Celestial CTAs Centered */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-6">
          <a
            href={EVENT_CONFIG.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-orbital text-sm sm:text-base py-3.5 sm:py-4 px-8 sm:px-10 min-h-[52px] sm:min-h-[56px] shadow-[0_4px_30px_rgba(255,154,60,0.5)] w-full sm:w-auto font-medium"
          >
            <span>RESERVE YOUR ORBIT</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1.5" />
          </a>

          <a
            href="#timeline"
            onClick={handleScrollToTimeline}
            className="btn-secondary-orbital text-sm sm:text-base py-3.5 sm:py-4 px-8 sm:px-10 min-h-[52px] sm:min-h-[56px] w-full sm:w-auto"
          >
            VIEW SCHEDULE
          </a>
        </div>
      </div>

      {/* 6. Signature Wave Divider (Bottom of Hero) */}
      <div className="relative w-full overflow-hidden leading-none z-10 -mb-[1px]" aria-hidden="true">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-16 sm:h-24 md:h-28 text-transparent preserve-3d"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="heroWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.45" />
              <stop offset="35%" stopColor="#e04dff" stopOpacity="0.55" />
              <stop offset="70%" stopColor="#ff9a3c" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ff6f91" stopOpacity="0.45" />
            </linearGradient>
            <linearGradient id="heroWaveGradSolid" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#120a2e" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#0d0722" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#05030f" stopOpacity="0.95" />
            </linearGradient>
          </defs>

          {/* Background glowing translucent crest */}
          <path
            d="M 0 60 C 320 110, 640 10, 960 70 C 1200 110, 1360 40, 1440 50 L 1440 120 L 0 120 Z"
            fill="url(#heroWaveGrad)"
          />
          {/* Foreground wave curve */}
          <path
            d="M 0 80 C 360 30, 720 115, 1080 60 C 1260 35, 1380 75, 1440 85 L 1440 120 L 0 120 Z"
            fill="url(#heroWaveGradSolid)"
          />
        </svg>
      </div>
    </section>
  );
};
