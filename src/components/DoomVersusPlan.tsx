import React, { useState, useRef, useEffect, memo } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { ArrowRight, ArrowLeftRight, CheckCircle2, XCircle, Globe, Terminal, Award } from 'lucide-react';
import { EVENT_CONFIG } from '../eventConfig';

interface ImpactSectionProps {
  onOpenRegisterModal?: () => void;
}

interface ComparisonPair {
  id: string;
  before: string;
  withExora: string;
}

const COMPARISON_PAIRS: ComparisonPair[] = [
  {
    id: 'pair-1',
    before: 'Brittle API wrappers abandoned in 48 hours',
    withExora: 'Live demo + code walkthrough, sustained product trajectory',
  },
  {
    id: 'pair-2',
    before: '200-slide keynotes, no terminal time',
    withExora: 'Hands-on architectural builds, code open from minute one',
  },
  {
    id: 'pair-3',
    before: 'Participation certificates nobody reads',
    withExora: 'Verifiable credentials tied to shipped repositories',
  },
  {
    id: 'pair-4',
    before: 'Sponsor swag forgotten by Monday',
    withExora: '1:1 lead mentor review and a main-stage showcase slot',
  },
];

const BEYOND_THE_VENUE_POINTS = [
  {
    icon: Globe,
    title: 'Open Source Archive',
    description: 'Every project repository is cataloged in the GDG public registry for sustained community contribution and ongoing releases.',
  },
  {
    icon: Terminal,
    title: 'Direct Industry Referrals',
    description: 'High-performing builder squads are fast-tracked into engineering interviews and talent pools at partner tech studios.',
  },
  {
    icon: Award,
    title: 'Post-Event Incubation',
    description: 'Continuous access to mentor office hours, cloud credits, and dev chapter infrastructure to launch real products.',
  },
];

const BEFORE_CHIP_LABEL = 'BEFORE EXORA // THE USUAL PARADE';
const AFTER_CHIP_LABEL = 'WITH EXORA // CODE THAT ENDURES';
const STATUS_LEFT_LINE = 'CONVENTIONAL ILLUSION // WE LEAVE THIS BEHIND';
const STATUS_RIGHT_LINE = 'STATUS: EXORA 2.0 ORBITAL TRAJECTORY VERIFIED';

const BEFORE_PANEL_HEADING = 'The Usual Parade';
const AFTER_PANEL_HEADING = 'Code That Endures';

interface ComparisonRowProps {
  text: string;
  index: number;
  hasEntered: boolean;
  isReduced: boolean;
}

const BeforeRow: React.FC<ComparisonRowProps> = memo(({ text, index, hasEntered, isReduced }) => {
  const rowDelayStyle: React.CSSProperties | undefined = isReduced
    ? undefined
    : { transitionDelay: `${160 + index * 80}ms` };

  return (
    <li
      style={rowDelayStyle}
      className={`py-3.5 border-b border-white/[0.06] last:border-b-0 flex items-start gap-3 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
        hasEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      }`}
    >
      <XCircle className="w-[18px] h-[18px] text-[#ff7a8a] shrink-0 mt-[3px]" aria-hidden="true" />
      <span className="min-w-0 flex-1 text-sm sm:text-base font-sans text-[#d4cde0]/80 leading-relaxed break-words">
        <span className="sr-only">Before: </span>
        {text}
      </span>
    </li>
  );
});
BeforeRow.displayName = 'BeforeRow';

const WithExoraRow: React.FC<ComparisonRowProps> = memo(({ text, index, hasEntered, isReduced }) => {
  const rowDelayStyle: React.CSSProperties | undefined = isReduced
    ? undefined
    : { transitionDelay: `${160 + index * 80}ms` };

  return (
    <li
      style={rowDelayStyle}
      className={`py-3.5 border-b border-white/[0.08] last:border-b-0 flex items-start gap-3 md:flex-row-reverse md:text-right transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
        hasEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      }`}
    >
      <CheckCircle2 className="w-[18px] h-[18px] text-[#6ee7f9] shrink-0 mt-[3px]" aria-hidden="true" />
      <span className="min-w-0 flex-1 text-sm sm:text-base font-sans font-medium text-white leading-relaxed break-words">
        <span className="sr-only">With Exora: </span>
        {text}
      </span>
    </li>
  );
});
WithExoraRow.displayName = 'WithExoraRow';

const SwapHandleVisual: React.FC<{ isPulsing: boolean }> = memo(({ isPulsing }) => (
  <div className="relative flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
    {/* One-shot soft glow pulse halo (animates opacity and transform only) */}
    <span
      className={`absolute -inset-3 rounded-full transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
        isPulsing ? 'opacity-100 scale-125' : 'opacity-0 scale-90'
      }`}
      style={{
        background:
          'radial-gradient(circle, rgba(255, 197, 138, 0.45) 0%, rgba(224, 77, 255, 0.25) 50%, transparent 75%)',
      }}
    />
    <div
      className={`relative w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#120a2e] border border-[#ffc58a]/50 flex items-center justify-center shadow-[0_0_18px_rgba(255,197,138,0.22)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
        isPulsing ? 'scale-110' : 'scale-100'
      }`}
    >
      <ArrowLeftRight className="w-4 h-4 text-[#ffc58a]" aria-hidden="true" />
    </div>
  </div>
));
SwapHandleVisual.displayName = 'SwapHandleVisual';

export const DoomVersusPlan: React.FC<ImpactSectionProps> = () => {
  const isReduced = useReducedMotion();
  const splitRef = useRef<HTMLDivElement>(null);
  const [hasEntered, setHasEntered] = useState<boolean>(isReduced);
  const [swapPulsing, setSwapPulsing] = useState<boolean>(false);

  useEffect(() => {
    if (isReduced) {
      setHasEntered(true);
      setSwapPulsing(false);
      return;
    }

    const el = splitRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setHasEntered(true);
      return;
    }

    let pulseStartTimer: number | undefined;
    let pulseEndTimer: number | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.unobserve(entry.target);

          pulseStartTimer = window.setTimeout(() => {
            setSwapPulsing(true);
          }, 420);

          pulseEndTimer = window.setTimeout(() => {
            setSwapPulsing(false);
          }, 960);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (pulseStartTimer) window.clearTimeout(pulseStartTimer);
      if (pulseEndTimer) window.clearTimeout(pulseEndTimer);
    };
  }, [isReduced]);

  return (
    <section
      id="impact"
      className="pt-4 pb-12 sm:pt-6 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-6 sm:mb-8 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2.5 text-sm sm:text-base font-display font-semibold tracking-[0.16em] text-[#ffc58a] uppercase mb-3">
            <span>THE PARADIGM SHIFT</span>
            <span className="text-[#a99fcf]">·</span>
            <span className="text-[#6ee7f9]">BEFORE VS WITH EXORA</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-white tracking-[0.05em] uppercase leading-tight">
            Before vs With Exora
          </h2>
          <p className="mt-3 text-sm sm:text-base font-sans font-medium text-[#c5bddf] max-w-2xl leading-[1.8]">
            See how conventional hackathon illusions transform inside Exora 2.0&apos;s production-grade engineering crucible across worlds.
          </p>
        </div>

        {/* =========================================================================
            1. STATIC TWO-PANEL SPLIT CONTAINER (50/50 Subgrid >= 768px, Stacked < 768px)
            ========================================================================= */}
        <div
          ref={splitRef}
          className="relative rounded-[28px] border border-white/[0.14] overflow-hidden shadow-[0_24px_60px_-15px_rgba(5,3,15,0.9),0_0_40px_rgba(139,92,246,0.14)] grid grid-cols-1 md:grid-cols-2 md:grid-rows-[auto_auto_auto_auto_auto_auto_auto]"
        >
          {/* LEFT PANEL (BEFORE EXORA — dim, desaturated coral accents, left-aligned) */}
          <div
            className={`md:col-start-1 md:row-start-1 md:row-span-7 grid grid-cols-1 md:grid-rows-subgrid p-5 sm:p-8 md:pr-11 bg-[linear-gradient(180deg,rgba(24,13,26,0.9)_0%,rgba(12,6,18,0.96)_100%)] text-left transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
              hasEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {/* Row 1: Chip Label */}
            <div className="mb-3 flex justify-start">
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#180a0a]/90 border border-[#f87171]/35 font-display text-xs font-medium tracking-wider text-[#ff9b9b] uppercase leading-snug">
                {BEFORE_CHIP_LABEL}
              </span>
            </div>

            {/* Row 2: Panel Heading */}
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#ede8f6] uppercase tracking-wide pb-4 mb-1 border-b border-white/10">
              {BEFORE_PANEL_HEADING}
            </h3>

            {/* Rows 3-6: Four Matched Pairs List */}
            <ul
              className="md:row-span-4 grid grid-cols-1 md:grid-rows-subgrid list-none p-0 m-0"
              aria-label="Conventional hackathon challenges before Exora"
            >
              {COMPARISON_PAIRS.map((pair, idx) => (
                <BeforeRow
                  key={pair.id}
                  text={pair.before}
                  index={idx}
                  hasEntered={hasEntered}
                  isReduced={isReduced}
                />
              ))}
            </ul>

            {/* Row 7: Status Line */}
            <div className="pt-5 font-mono text-xs sm:text-[13px] tracking-[0.12em] text-[#c5bddf]/90 uppercase break-words">
              {STATUS_LEFT_LINE}
            </div>
          </div>

          {/* MOBILE HORIZONTAL DIVIDER (< 768px only) */}
          <div
            className="md:hidden relative flex items-center justify-center py-0 bg-[#120a2e]"
            aria-hidden="true"
          >
            <div className="w-full h-[2px] bg-gradient-to-r from-[#a99fcf]/50 via-[#e04dff]/75 to-[#ffc58a]/90" />
            <div className="absolute inset-0 flex items-center justify-center">
              <SwapHandleVisual isPulsing={swapPulsing} />
            </div>
          </div>

          {/* DESKTOP CENTER VERTICAL DIVIDER (>= 768px only, purely decorative) */}
          <div
            className="hidden md:flex pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 z-20 flex-col items-center justify-center"
            aria-hidden="true"
          >
            <div className="w-[2px] h-full bg-gradient-to-b from-[#a99fcf]/50 via-[#e04dff]/75 to-[#ffc58a]/90" />
            <div className="absolute top-1/2 -translate-y-1/2">
              <SwapHandleVisual isPulsing={swapPulsing} />
            </div>
          </div>

          {/* RIGHT PANEL (WITH EXORA — glowing violet & peach, cyan checks, left on phone / right on >= 768px) */}
          <div
            className={`relative md:col-start-2 md:row-start-1 md:row-span-7 grid grid-cols-1 md:grid-rows-subgrid p-5 sm:p-8 md:pl-11 bg-[linear-gradient(180deg,rgba(28,14,68,0.94)_0%,rgba(12,6,32,0.97)_100%)] text-left md:text-right transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
              hasEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {/* Ambient Violet-to-Peach Glow (absolute, out of grid flow) */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 90% 70% at 80% 35%, rgba(255, 197, 138, 0.13) 0%, rgba(139, 92, 246, 0.16) 45%, transparent 80%)',
              }}
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] opacity-85"
              style={{
                background: 'linear-gradient(90deg, #8b5cf6 0%, #e04dff 50%, #ffc58a 100%)',
              }}
              aria-hidden="true"
            />

            {/* Row 1: Chip Label */}
            <div className="relative z-10 mb-3 flex justify-start md:justify-end">
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#120a2e] border border-[#ffc58a]/40 font-display text-xs font-medium tracking-wider text-[#ffc58a] uppercase leading-snug shadow-[0_0_15px_rgba(255,197,138,0.18)]">
                {AFTER_CHIP_LABEL}
              </span>
            </div>

            {/* Row 2: Panel Heading */}
            <h3 className="relative z-10 font-display text-2xl sm:text-3xl font-semibold text-white uppercase tracking-wide pb-4 mb-1 border-b border-white/10">
              {AFTER_PANEL_HEADING}
            </h3>

            {/* Rows 3-6: Four Matched Pairs List */}
            <ul
              className="relative z-10 md:row-span-4 grid grid-cols-1 md:grid-rows-subgrid list-none p-0 m-0"
              aria-label="Production engineering outcomes with Exora 2.0"
            >
              {COMPARISON_PAIRS.map((pair, idx) => (
                <WithExoraRow
                  key={pair.id}
                  text={pair.withExora}
                  index={idx}
                  hasEntered={hasEntered}
                  isReduced={isReduced}
                />
              ))}
            </ul>

            {/* Row 7: Status Line */}
            <div className="relative z-10 pt-5 font-mono text-xs sm:text-[13px] tracking-[0.12em] text-[#6ee7f9] font-semibold uppercase break-words">
              {STATUS_RIGHT_LINE}
            </div>
          </div>
        </div>

        {/* =========================================================================
            2. STAT STRIP BELOW THE CARD
            ========================================================================= */}
        <div className="mt-6 sm:mt-8 border border-white/10 bg-[#120a2e]/60 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-lg">
          <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2 text-center text-sm sm:text-base font-display tracking-[0.12em] text-[#c5bddf] select-none uppercase">
            <span className="text-[#f4f0ff] font-medium">24 HOURS</span>
            <span className="text-white/20 hidden sm:inline">//</span>
            <span className="text-[#f4f0ff] font-medium">12+ MENTORS</span>
            <span className="text-white/20 hidden sm:inline">//</span>
            <span className="text-[#6ee7f9] font-medium">5 ORBITS</span>
            <span className="text-white/20 hidden sm:inline">//</span>
            <span className="text-[#f4f0ff] font-medium">40+ SQUADS</span>
            <span className="text-white/20 hidden sm:inline">//</span>
            <span className="text-[#ffc58a] font-medium">PRIZE POOL ₹2,00,000+</span>
          </div>
        </div>

        {/* =========================================================================
            3. "BEYOND THE VENUE" ROW (3 Community-Impact Points)
            ========================================================================= */}
        <div className="mt-6 pt-6 sm:mt-8 sm:pt-8 border-t border-white/10">
          <div className="flex items-center gap-2 text-sm font-display tracking-[0.16em] text-[#ffd2a8] uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffc58a]" />
            <span>BEYOND THE VENUE // 3 LASTING IMPACT CHANNELS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {BEYOND_THE_VENUE_POINTS.map((pt, idx) => {
              const IconComp = pt.icon;
              return (
                <div
                  key={idx}
                  className="glass-pass-card p-5 rounded-2xl group transition-all"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#120a2e] border border-[#8b5cf6]/40 flex items-center justify-center text-[#ffc58a] mb-3 group-hover:scale-105 transition-transform shadow-[0_0_10px_rgba(255,197,138,0.2)]">
                    <IconComp className="w-4 h-4 text-[#ffc58a]" />
                  </div>
                  <h4 className="font-display text-lg font-semibold text-white mb-2 uppercase tracking-wide leading-snug">
                    {pt.title}
                  </h4>
                  <p className="text-sm font-sans text-[#c5bddf] leading-relaxed">
                    {pt.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            4. CLOSING LINE & "RESERVE YOUR ORBIT" CTA
            ========================================================================= */}
        <div className="mt-8 sm:mt-12 text-center flex flex-col items-center justify-center p-5 sm:p-8 bg-gradient-to-b from-[#120a2e]/90 to-[#0a051d]/90 border border-white/10 rounded-3xl shadow-[0_0_40px_rgba(139,92,246,0.15)]">
          <p className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-6 tracking-wide leading-tight uppercase">
            Most hackathons end on Sunday. <span className="text-[#ffd2a8]">We build into orbit.</span>
          </p>

          <a
            href={EVENT_CONFIG.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-orbital"
          >
            <span>Reserve Your Orbit</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>
    </section>
  );
};
