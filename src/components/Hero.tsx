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
    const timeline = document.querySelector('#timeline') as HTMLElement | null;
    if (timeline) {
      const navHeader = document.querySelector('header');
      const navHeight = navHeader ? navHeader.getBoundingClientRect().height : 56;
      const topOffset = navHeight + 28;
      const currentScroll = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      const targetY = Math.max(0, timeline.getBoundingClientRect().top + currentScroll - topOffset);
      window.scrollTo({
        top: targetY,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center text-center overflow-visiblemin-h-[110svh] sm:min-h-0 pt-8 sm:pt-14 pb-8 sm:pb-10 px-4 sm:px-6 lg:px-8"
    >
      {/* Background Ambient Celestial Glow (unclipped so background remains uniform behind navbar) */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[500px] sm:h-[700px] rounded-full pointer-events-none blur-[140px] opacity-25 bg-gradient-to-b from-[#8b5cf6] via-[#e04dff] to-[#ff9a3c]"
        aria-hidden="true"
      />

      {/* Main Content Container - Fills the viewport window with colossal typography */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center justify-center flex-1 w-full pt-0 pb-1">
        {/* 1. Date & Venue Top Kicker Pill */}
        <div className="inline-flex items-center justify-center gap-2 mb-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#120a2e]/85 border border-[#ffc58a]/25 text-[11px] sm:text-sm font-display font-semibold tracking-[0.12em] uppercase text-[#ffe0bd] backdrop-blur-md shadow-[0_0_20px_rgba(255,154,60,0.12)] max-w-full">
          <span className="w-2 h-2 rounded-full bg-[#ffc58a] shadow-[0_0_8px_#ffc58a] shrink-0" />
          <span>28 NOVEMBER 2026 // THOUGHTWORKS TECHNOLOGIES, GURUGRAM</span>
        </div>

        {/* 2. Signature Walker Line (Celestial signature from Figma) */}
        <div className="w-full max-w-2xl px-2 sm:px-6 my-1">
          <WalkerLine progress={0.42} showMoons={true} />
        </div>

        {/* 3. Colossal Two-Line Title Occupying the Viewport Window */}
        <h1 className="flex flex-col items-center justify-center text-center select-none my-1 sm:my-2 w-full">
          {/* Line 1: Solid "EXORA 2.0" */}
          <span className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] xl:text-[9rem] font-normal tracking-[0.04em] text-[#f4f0ff] uppercase leading-none drop-shadow-[0_4px_35px_rgba(224,77,255,0.35)]">
            EXORA <span className="text-[#6ee7f9] font-light">2.0</span>
          </span>

          {/* Line 2: Giant Outlined Glowing Neon "UNVEIL THE BUILD" (Matching image_d7274707.png) */}
          <span
            style={{
              WebkitTextStroke: 'clamp(1.5px, 0.28vw, 2.5px) #e04dff',
              color: 'transparent',
              textShadow: '0 0 30px rgba(224, 77, 255, 0.65), 0 0 60px rgba(255, 154, 60, 0.35)',
            }}
            className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light uppercase tracking-[0.10em] leading-none mt-2 sm:mt-3"
          >
            UNVEIL THE BUILD
          </span>
        </h1>

        {/* 4. Cosmic Theme One-Liner (Replaced generic technical text with theme) */}
        <p className="font-sans text-sm sm:text-base md:text-lg text-[#d5cbea] max-w-2xl mx-auto mt-1 mb-4 leading-relaxed font-normal tracking-wide px-2">
          The Walk Between Worlds · A 24-Hour Orbital Crucible by Google Developer Groups
        </p>

        {/* 5. Two Prominent Celestial CTAs Centered */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-3 sm:mb-4 w-full sm:w-auto px-4">
          <a
            href={EVENT_CONFIG.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-orbital text-base sm:text-lg py-3.5 sm:py-4 px-8 sm:px-10 min-h-[52px] sm:min-h-[56px] shadow-[0_4px_30px_rgba(255,154,60,0.5)] w-full sm:w-auto font-semibold tracking-[0.06em]"
          >
            <span>RESERVE YOUR ORBIT</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1.5" />
          </a>

          <a
            href="#timeline"
            onClick={handleScrollToTimeline}
            className="btn-secondary-orbital text-base sm:text-lg py-3.5 sm:py-4 px-8 sm:px-10 min-h-[52px] sm:min-h-[56px] w-full sm:w-auto font-semibold tracking-[0.06em] border border-[#c4a8f5]/50"
          >
            VIEW SCHEDULE
          </a>
        </div>
      </div>
    </section>
  );
};
