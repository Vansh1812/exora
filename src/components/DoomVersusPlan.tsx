import React, { useState, useRef, useEffect } from 'react';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useReveal } from '../hooks/useReveal';
import { Sliders, Sparkles, AlertTriangle, ArrowRight, CheckCircle2, XCircle, Globe, Terminal, Award } from 'lucide-react';
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

export const DoomVersusPlan: React.FC<ImpactSectionProps> = ({ onOpenRegisterModal }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const splitBoxRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useScrollProgress(containerRef);
  const isReduced = useReducedMotion();
  const { ref: revealRef, revealClass } = useReveal<HTMLDivElement>();

  // Slider position (0 to 100). Defaults to 50%
  const [sliderPos, setSliderPos] = useState(50);
  const [isManualOverride, setIsManualOverride] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!isManualOverride && !isReduced && !isDragging) {
      const mapped = Math.min(85, Math.max(15, (scrollProgress - 0.2) * (100 / 0.6)));
      setSliderPos(Math.round(mapped));
    }
  }, [scrollProgress, isManualOverride, isReduced, isDragging]);

  const updateSliderFromClientX = (clientX: number) => {
    if (!splitBoxRef.current) return;
    const rect = splitBoxRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
    setSliderPos(Math.round(pct));
    setIsManualOverride(true);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateSliderFromClientX(e.clientX);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      updateSliderFromClientX(e.clientX);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      setIsDragging(true);
      updateSliderFromClientX(e.touches[0].clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      updateSliderFromClientX(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    setIsManualOverride(true);
    if (e.key === 'ArrowLeft') {
      setSliderPos((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      setSliderPos((prev) => Math.min(100, prev + 5));
    }
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsManualOverride(true);
    setSliderPos(Number(e.target.value));
  };

  const handleRegisterClick = (e: React.MouseEvent) => {
    if (onOpenRegisterModal) {
      e.preventDefault();
      onOpenRegisterModal();
    }
  };

  return (
    <section
      id="impact"
      ref={containerRef}
      className="py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative overflow-hidden"
    >
      <div ref={revealRef} className={`max-w-6xl mx-auto ${revealClass}`}>
        {/* Section Header */}
        <div className="mb-10 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-display tracking-[0.2em] text-[#ffc58a] uppercase mb-2">
            <span>THE PARADIGM SHIFT</span>
            <span className="text-[#a99fcf]">·</span>
            <span className="text-[#6ee7f9]">BEFORE VS WITH EXORA</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-white tracking-[0.04em] uppercase leading-tight">
            Before vs With Exora
          </h2>
          <p className="mt-3 text-sm sm:text-base font-sans font-medium text-[#c5bddf] max-w-2xl leading-[1.8]">
            Drag the divider to compare conventional hackathon illusions with Exora 2.0&apos;s production-grade engineering crucible across worlds.
          </p>
        </div>

        {/* Accessible Keyboard & Draggable Status Bar */}
        <div className="hidden md:flex mb-6 flex-wrap items-center justify-between gap-4 p-3.5 bg-[#120a2e]/60 border border-white/10 rounded-2xl text-sm font-display">
          <div className="flex items-center gap-2 text-[#a99fcf]">
            <Sliders className="w-4 h-4 text-[#ffc58a]" />
            <span>
              REALITY DIVIDER // <strong className="text-[#6ee7f9]">{sliderPos}% WITH EXORA</strong> (Drag anywhere or use arrows)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <label htmlFor="wipe-slider" className="text-[#a99fcf] text-[11px] uppercase tracking-wider">
              Slider:
            </label>
            <input
              id="wipe-slider"
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={handleRangeChange}
              onKeyDown={handleKeyDown}
              aria-label="Compare conventional hackathons with our plan"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={sliderPos}
              className="accent-[#ff9a3c] cursor-pointer h-1.5 w-32 sm:w-48 bg-[#05030f] rounded-lg"
            />
          </div>
        </div>

        {/* =========================================================================
            DESKTOP: Draggable Comparison Split Box with Clipping Mask
            ========================================================================= */}
        <div
          ref={splitBoxRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="hidden md:block relative min-h-[490px] border border-white/15 rounded-3xl overflow-hidden shadow-2xl cursor-ew-resize select-none"
        >
          {/* Base Layer: WITH EXORA (Right Side - Violet & Peach Glow) */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#120a2e] via-[#1a0e3f] to-[#0d0624] p-8 sm:p-10 flex flex-col justify-between pointer-events-none">
            <div className="max-w-md ml-auto text-right space-y-5">
              <div className="inline-flex items-center gap-2 text-sm font-display font-medium tracking-wider text-[#ffc58a] uppercase bg-[#120a2e] border border-[#ffc58a]/40 px-3.5 py-1 rounded-full shadow-[0_0_15px_rgba(255,197,138,0.2)]">
                <Sparkles className="w-3.5 h-3.5 text-[#ffc58a]" />
                <span>WITH EXORA // CODE THAT ENDURES</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white uppercase tracking-wide leading-tight">
                Shipped Systems & Real Mastery
              </h3>
              <div className="space-y-5 text-xs sm:text-sm font-sans text-[#f4f0ff]/95 text-right">
                {COMPARISON_PAIRS.map((pair) => (
                  <div key={pair.id} className="flex items-center justify-end gap-2.5">
                    <span className="text-sm sm:text-base leading-relaxed">{pair.withExora}</span>
                    <span className="text-[#6ee7f9] font-bold text-base shrink-0">✓</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 text-right text-xs font-display text-[#6ee7f9] tracking-widest uppercase">
              STATUS: EXORA 2.0 ORBITAL TRAJECTORY VERIFIED
            </div>
          </div>

          {/* Top Layer: BEFORE EXORA (Left Side - Dim, Desaturated, High Contrast, ✗ items) with clip-path */}
          <div
            className="absolute inset-0 bg-[#07050e] p-8 sm:p-10 flex flex-col justify-between transition-all duration-75 pointer-events-none"
            style={{
              clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
            }}
          >
            <div className="max-w-md space-y-5">
              <div className="inline-flex items-center gap-2 text-sm font-display font-medium tracking-wider text-[#ff8585] uppercase bg-[#180a0a] border border-[#f87171]/40 px-3.5 py-1 rounded-full">
                <AlertTriangle className="w-3.5 h-3.5 text-[#f87171]" />
                <span>BEFORE EXORA // THE USUAL PARADE</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#ff8585] uppercase tracking-wide leading-tight">
                Fragile Toys & Hollow Illusions
              </h3>
              <div className="space-y-5 text-xs sm:text-sm font-sans text-[#cbd5e1]">
                {COMPARISON_PAIRS.map((pair) => (
                  <div key={pair.id} className="flex items-center gap-2.5">
                    <span className="text-[#f87171] font-bold text-base shrink-0">✗</span>
                    <span className="text-sm sm:text-base leading-relaxed">{pair.before}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 text-xs font-display text-[#a99fcf]/90 tracking-widest uppercase">
              CONVENTIONAL ILLUSION // WE LEAVE THIS BEHIND
            </div>
          </div>

          {/* Interactive Dividing Line with Draggable Handle */}
          <div
            className="absolute top-0 bottom-0 w-[2.5px] bg-gradient-to-b from-[#ffc58a] via-[#e04dff] to-[#6ee7f9] shadow-[0_0_16px_#ff9a3c] z-30 pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            {/* Center Handle Badge with pulsing glow */}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#120a2e] border-2 border-[#ffc58a] flex items-center justify-center shadow-[0_0_16px_#ff9a3c]">
              <span className="text-xs font-display text-[#ffc58a] font-bold">⇄</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            MOBILE: Stacked Panels with ✗/✓ Pairs Kept Together
            ========================================================================= */}
        <div className="md:hidden space-y-4">
          <div className="p-4 bg-[#120a2e]/60 border border-white/10 rounded-2xl flex items-center justify-between text-sm font-display">
            <span className="text-[#ffc58a] font-medium flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-[#ffc58a]" />
              THE PARADIGM SHIFT
            </span>
            <span className="text-[#a99fcf]">4 MATCHED PAIRS</span>
          </div>

          <div className="space-y-3">
            {COMPARISON_PAIRS.map((pair, idx) => (
              <div
                key={pair.id}
                className="glass-pass-card rounded-2xl p-4 space-y-3"
              >
                <div className="text-xs font-display text-[#a99fcf] uppercase tracking-wider flex items-center justify-between border-b border-white/5 pb-1.5">
                  <span>ORBIT 0{idx + 1}</span>
                  <span className="text-[#ffc58a]">REALITY CHECK</span>
                </div>

                {/* Left ✗ Item (Conventional) */}
                <div className="flex items-start gap-2.5 bg-[#180808]/80 border border-[#f87171]/25 p-3 rounded-xl">
                  <XCircle className="w-4 h-4 text-[#f87171] shrink-0 mt-0.5" />
                  <div className="text-sm font-sans text-[#dbe3ee] leading-relaxed">
                    <span className="text-xs uppercase font-display text-[#f87171] block mb-0.5">
                      Conventional:
                    </span>
                    {pair.before}
                  </div>
                </div>

                {/* Right ✓ Item (With Exora) */}
                <div className="flex items-start gap-2.5 bg-[#190c38]/80 border border-[#8b5cf6]/30 p-3 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-[#6ee7f9] shrink-0 mt-0.5" />
                  <div className="text-sm font-sans text-white leading-relaxed">
                    <span className="text-xs uppercase font-display text-[#6ee7f9] block mb-0.5">
                      With Exora 2.0:
                    </span>
                    {pair.withExora}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================================
            2. STAT STRIP BELOW THE CARD
            ========================================================================= */}
        <div className="mt-8 border border-white/10 bg-[#120a2e]/60 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-lg">
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
        <div className="mt-8 pt-8 border-t border-white/10">
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
        <div className="mt-12 text-center flex flex-col items-center justify-center p-8 bg-gradient-to-b from-[#120a2e]/90 to-[#0a051d]/90 border border-white/10 rounded-3xl shadow-[0_0_40px_rgba(139,92,246,0.15)]">
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
