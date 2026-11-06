import React, { useState, useEffect, useRef } from 'react';
import { EVENT_CONFIG } from '../eventConfig';
import { useCountdown } from '../hooks/useCountdown';
import { useMouseParallax } from '../hooks/useMouseParallax';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { AbstractMask } from './AbstractMask';

interface HeroProps {
  onOpenRegisterModal: () => void;
  onTriggerEasterEgg?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRegisterModal, onTriggerEasterEgg }) => {
  const countdown = useCountdown(EVENT_CONFIG.targetDate);
  const eyeOffset = useMouseParallax();
  const heroRef = useRef<HTMLElement>(null);
  const isReduced = useReducedMotion();

  // Eye click counter for easter egg
  const [eyeClicks, setEyeClicks] = useState(0);

  // Register button hover label toggle ("REGISTER NOW" -> "SEAL YOUR FATE")
  const [registerHovered, setRegisterHovered] = useState(false);

  // Previous digits tracking for tick flip animation
  const [prevSecs, setPrevSecs] = useState(countdown.seconds);
  const [secTick, setSecTick] = useState(false);

  useEffect(() => {
    if (countdown.seconds !== prevSecs) {
      setPrevSecs(countdown.seconds);
      setSecTick(true);
      const timer = setTimeout(() => setSecTick(false), 160);
      return () => clearTimeout(timer);
    }
  }, [countdown.seconds, prevSecs]);

  const handleEyeClick = () => {
    const newCount = eyeClicks + 1;
    setEyeClicks(newCount);
    if (newCount >= 3) {
      if (onTriggerEasterEgg) onTriggerEasterEgg();
      setEyeClicks(0);
    }
  };

  const handleScrollToTimeline = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const timeline = document.querySelector('#timeline');
    if (timeline) {
      timeline.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Track scroll specifically for the Hero section (0 on page load, scaling up and fading as user scrolls out)
  const [heroScroll, setHeroScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const height = heroRef.current?.offsetHeight || 800;
      setHeroScroll(Math.min(1, Math.max(0, scrollY / height)));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // On scroll: mask scales up slightly and fades (camera pushing through it)
  // At scroll 0, Dr. Doom's mask is richly visible at 0.82 opacity with glowing interactive eyes
  const maskScale = isReduced ? 1 : 1 + heroScroll * 0.45;
  const maskOpacity = isReduced ? 0.85 : Math.max(0.08, 0.82 - heroScroll * 0.75);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[96vh] flex flex-col items-center justify-center text-center overflow-hidden pt-16 pb-20 px-4 sm:px-6 lg:px-8"
    >
      {/* Laser Crosshairs passing through the center */}
      <div
        className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-30"
        aria-hidden="true"
      >
        <div className="absolute w-[200%] h-[1px] laser-crosshair-green rotate-[-24deg] transform origin-center" />
        <div className="absolute w-[200%] h-[1px] laser-crosshair-gold rotate-[24deg] transform origin-center" />
        <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-[#2f4a3a]/40 to-transparent" />
      </div>

      {/* Abstract Mask Silhouette with Scroll Push-Through + Eye Tracking Parallax */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-75 ease-[cubic-bezier(0.16,1,0.3,1)] -translate-y-6 sm:-translate-y-12"
        style={{
          transform: `scale(${maskScale}) translateY(${heroScroll * -40}px)`,
          opacity: maskOpacity,
        }}
      >
        <AbstractMask
          eyeOffset={eyeOffset}
          onEyeClick={handleEyeClick}
          className="w-[520px] sm:w-[680px] lg:w-[800px]"
        />
      </div>

      {/* Radial Atmosphere Glow */}
      <div
        className="absolute w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full pointer-events-none blur-[150px] opacity-25 bg-[#2f4a3a]"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Top Header Stamp & Coordinates */}
        <div className="inline-flex items-center gap-2 mb-6 text-xs sm:text-sm font-mono tracking-[0.25em] text-[#c9a227] uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c9a227] animate-pulse" />
          <span>{EVENT_CONFIG.dateFullString}</span>
        </div>

        {/* Primary Title with Redaction Removal Bar Reveal */}
        <div className="relative inline-block mb-1">
          <div className="redaction-bar" />
          <h1 className="font-display text-6xl sm:text-8xl md:text-9xl font-extrabold tracking-tight text-[#e2e8e5] leading-none select-none">
            {EVENT_CONFIG.eventName}
          </h1>
        </div>

        {/* Hollow Outline Secondary Headline with Redaction Removal Bar */}
        <div className="relative inline-block mb-8">
          <div className="redaction-bar" style={{ animationDelay: '150ms' }} />
          <div className="font-display text-4xl sm:text-6xl md:text-8xl font-black tracking-tight text-stroke-hollow uppercase select-none -mt-2 sm:-mt-5">
            {EVENT_CONFIG.eventTaglineMain}
          </div>
        </div>

        {/* Tagline / Subtitle */}
        <p className="font-display text-base sm:text-xl text-[#c9a227]/90 max-w-2xl mb-3 leading-snug">
          "{EVENT_CONFIG.tagline}"
        </p>
        <p className="text-xs sm:text-base font-mono text-[#8e9e96] max-w-xl mb-8 leading-relaxed">
          {EVENT_CONFIG.heroSynopsis}
        </p>

        {/* DOOM CLOCK — High precision countdown with Enhanced Shadow & Glow */}
        <div className="relative w-full max-w-md mb-9 group">
          {/* Ambient Multi-Layer Underglow Shadow behind the countdown box */}
          <div
            className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-[#2f4a3a]/50 via-[#c9a227]/30 to-[#2f4a3a]/50 blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
            aria-hidden="true"
          />

          <div className="w-full border border-[#2f4a3a]/80 bg-[#0c100e]/95 p-4 sm:p-5 rounded-xl rivet-corner backdrop-blur-md doom-clock-container relative overflow-hidden">
            {/* Top metallic specular reflection line */}
            <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-[#c9a227]/40 to-transparent pointer-events-none" />

            <div className="flex items-center justify-between mb-3 border-b border-[#1f2e26] pb-2 text-[11px] font-mono">
              <span className="text-[#c9a227] font-bold uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#c9a227] shadow-[0_0_8px_#c9a227]" />
                DOOM CLOCK // CHRONO METRIC
              </span>
              <span className="text-[#52635a] font-semibold">
                {countdown.isExpired ? 'EVENT COMMENCED' : 'COUNTDOWN ACTIVE'}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2.5 text-center">
              {/* Days */}
              <div className="bg-[#121915]/95 border border-[#1f2e26] py-3 rounded-lg doom-digit-box transition-all hover:border-[#2f4a3a]">
                <div className="text-xl sm:text-2xl font-mono font-bold text-[#e2e8e5] tabular-nums drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {countdown.days}
                </div>
                <div className="text-[9px] font-mono tracking-widest text-[#52635a] uppercase mt-0.5">DAYS</div>
              </div>
              {/* Hours */}
              <div className="bg-[#121915]/95 border border-[#1f2e26] py-3 rounded-lg doom-digit-box transition-all hover:border-[#2f4a3a]">
                <div className="text-xl sm:text-2xl font-mono font-bold text-[#e2e8e5] tabular-nums drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {countdown.hours}
                </div>
                <div className="text-[9px] font-mono tracking-widest text-[#52635a] uppercase mt-0.5">HOURS</div>
              </div>
              {/* Minutes */}
              <div className="bg-[#121915]/95 border border-[#1f2e26] py-3 rounded-lg doom-digit-box transition-all hover:border-[#2f4a3a]">
                <div className="text-xl sm:text-2xl font-mono font-bold text-[#e2e8e5] tabular-nums drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {countdown.minutes}
                </div>
                <div className="text-[9px] font-mono tracking-widest text-[#52635a] uppercase mt-0.5">MINS</div>
              </div>
              {/* Seconds (With Tick Flip, Glow Pulse & Gold Shadow Glow) */}
              <div className="bg-[#121915]/95 border border-[#2f4a3a] py-3 rounded-lg doom-digit-box-active transition-all">
                <div
                  className={`text-xl sm:text-2xl font-mono font-bold text-[#c9a227] tabular-nums animate-seconds-pulse drop-shadow-[0_0_8px_rgba(201,162,39,0.5)] ${
                    secTick ? 'animate-digit-tick' : ''
                  }`}
                >
                  {countdown.seconds}
                </div>
                <div className="text-[9px] font-mono tracking-widest text-[#c9a227]/80 uppercase mt-0.5">SECS</div>
              </div>
            </div>
          </div>
        </div>

        {/* 2 CTA Pill Buttons with Metallic Sheen and Dynamic Label Change */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            type="button"
            onClick={onOpenRegisterModal}
            onMouseEnter={() => setRegisterHovered(true)}
            onMouseLeave={() => setRegisterHovered(false)}
            className="button-metallic-sheen w-full sm:w-auto px-8 py-3.5 rounded-full text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-[#0b0d0c] bg-[#c9a227] hover:bg-[#ddb435] shadow-[0_0_25px_rgba(201,162,39,0.35)] transition-all active:scale-95 whitespace-nowrap"
          >
            {registerHovered ? 'SEAL YOUR FATE ↗' : 'REGISTER NOW'}
          </button>

          <a
            href="#timeline"
            onClick={handleScrollToTimeline}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs sm:text-sm font-mono font-semibold uppercase tracking-wider text-[#e2e8e5] border border-[#2f4a3a] hover:border-[#c9a227] hover:text-[#c9a227] bg-[#121915]/60 hover:bg-[#121915] transition-all active:scale-95 whitespace-nowrap"
          >
            VIEW SCHEDULE
          </a>
        </div>
      </div>
    </section>
  );
};
