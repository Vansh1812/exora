import React, { useState, useRef, useEffect } from 'react';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useReveal } from '../hooks/useReveal';
import { Sliders, Sparkles, AlertTriangle, ArrowRight, CheckCircle2, XCircle, Globe, Terminal, Award } from 'lucide-react';
import { EVENT_CONFIG } from '../eventConfig';

interface DoomVersusPlanProps {
  onOpenRegisterModal?: () => void;
}

interface ComparisonPair {
  id: string;
  doom: string;
  ours: string;
}

const COMPARISON_PAIRS: ComparisonPair[] = [
  {
    id: 'pair-1',
    doom: 'Brittle API wrappers abandoned in 48 hours',
    ours: 'Live demo + code walkthrough, keep building after the event',
  },
  {
    id: 'pair-2',
    doom: '200-slide keynotes, no terminal time',
    ours: 'Hands-on workshops, terminal open from minute one',
  },
  {
    id: 'pair-3',
    doom: 'Participation certificates nobody reads',
    ours: 'Certificates tied to your project with GitHub links',
  },
  {
    id: 'pair-4',
    doom: 'Sponsor swag forgotten by Monday',
    ours: '1:1 mentor review and a showcase slot',
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

export const DoomVersusPlan: React.FC<DoomVersusPlanProps> = ({ onOpenRegisterModal }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useScrollProgress(containerRef);
  const isReduced = useReducedMotion();
  const { ref: revealRef, revealClass } = useReveal<HTMLDivElement>();

  // Slider position (0 to 100). Defaults to 50% or scroll progress
  const [sliderPos, setSliderPos] = useState(50);
  const [isManualOverride, setIsManualOverride] = useState(false);

  useEffect(() => {
    if (!isManualOverride && !isReduced) {
      // Map scroll progress smoothly to 20% to 80%
      const mapped = Math.min(85, Math.max(15, (scrollProgress - 0.2) * (100 / 0.6)));
      setSliderPos(Math.round(mapped));
    }
  }, [scrollProgress, isManualOverride, isReduced]);

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
      className="py-24 px-4 sm:px-6 lg:px-8 border-b border-[#1f2e26] relative overflow-hidden"
    >
      <div ref={revealRef} className={`max-w-6xl mx-auto ${revealClass}`}>
        {/* Section Header */}
        <div className="mb-10 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono tracking-widest text-[#c9a227] uppercase mb-2">
            <span className="text-[#52635a]">//</span>
            <span>THE PARADIGM SHIFT</span>
            <span className="text-[#33473c]">·</span>
            <span className="text-[#52635a]">DOOM'S WORLD VS OUR PLAN</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-[#e2e8e5] tracking-tight uppercase">
            Doom's World vs Our Plan
          </h2>
          <p className="mt-2 text-xs sm:text-sm font-mono text-[#8e9e96] max-w-2xl">
            Inspect the direct contrast between conventional hackathon illusions and Exora 2.0's production-grade engineering crucible.
          </p>
        </div>

        {/* Accessible Keyboard Slider Control (Desktop) */}
        <div className="hidden md:flex mb-6 flex-wrap items-center justify-between gap-4 p-3 bg-[#0c100e] border border-[#1f2e26] rounded-xl text-xs font-mono">
          <div className="flex items-center gap-2 text-[#8e9e96]">
            <Sliders className="w-4 h-4 text-[#c9a227]" />
            <span>
              REALITY DIVIDER // <strong className="text-[#c9a227]">{sliderPos}% OURS</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <label htmlFor="wipe-slider" className="text-[#52635a] text-[11px] uppercase">
              Use Left/Right Arrows:
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
              className="accent-[#c9a227] cursor-pointer h-1.5 w-32 sm:w-48 bg-[#1f2e26] rounded-lg"
            />
          </div>
        </div>

        {/* =========================================================================
            DESKTOP: Visual Comparison Split Box with Clipping Mask
            ========================================================================= */}
        <div className="hidden md:block relative min-h-[480px] border border-[#2f4a3a] rounded-2xl overflow-hidden rivet-corner shadow-2xl">
          {/* Base Layer: OUR WORLD (Right Side - Green, Warm, Active) */}
          <div className="absolute inset-0 bg-[#0c1611] p-8 sm:p-10 flex flex-col justify-between">
            <div className="max-w-md ml-auto text-right space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#4ade80] uppercase bg-[#14231a] border border-[#4ade80]/30 px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-[#4ade80]" />
                <span>WHAT WE DEMAND // CODE THAT ENDURES</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#f1f5f9]">
                Shipped Systems & Real Mastery
              </h3>
              <div className="space-y-4 text-xs sm:text-sm font-mono text-[#f1f5f9] text-right">
                {COMPARISON_PAIRS.map((pair) => (
                  <div key={pair.id} className="flex items-center justify-end gap-2.5">
                    <span className="leading-snug">{pair.ours}</span>
                    <span className="text-[#4ade80] font-bold text-base shrink-0">✓</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 text-right text-[11px] font-mono text-[#4ade80] tracking-wider">
              STATUS: EXORA 2.0 PROTOCOL VERIFIED
            </div>
          </div>

          {/* Top Layer: DOOM'S WORLD (Left Side - Desaturated, High Contrast, ✗ items) with clip-path */}
          <div
            className="absolute inset-0 bg-[#090b0a] p-8 sm:p-10 flex flex-col justify-between transition-all duration-75"
            style={{
              clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
            }}
          >
            <div className="max-w-md space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#f87171] uppercase bg-[#1a1111] border border-[#f87171]/40 px-3 py-1 rounded-full">
                <AlertTriangle className="w-3.5 h-3.5 text-[#f87171]" />
                <span>DOOM CONDEMNS // THE USUAL CIRCUS</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#f87171]/90">
                Fragile Toys & Hollow Illusions
              </h3>
              {/* High contrast text (#cbd5e1 on #090b0a = 12.8:1, well above WCAG AA 4.5:1) */}
              <div className="space-y-4 text-xs sm:text-sm font-mono text-[#cbd5e1]">
                {COMPARISON_PAIRS.map((pair) => (
                  <div key={pair.id} className="flex items-center gap-2.5">
                    <span className="text-[#f87171] font-bold text-base shrink-0">✗</span>
                    <span className="leading-snug">{pair.doom}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 text-[11px] font-mono text-[#94a3b8] tracking-wider">
              CRITIQUE // CONVENTIONAL HACKATHON CONDEMNATION
            </div>
          </div>

          {/* Interactive Dividing Line */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-[#c9a227] shadow-[0_0_14px_#c9a227] z-30 pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            {/* Center Handle Badge */}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#0b0d0c] border-2 border-[#c9a227] flex items-center justify-center shadow-lg">
              <span className="text-[10px] font-mono text-[#c9a227] font-bold">⇄</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            MOBILE: Stacked Panels with ✗/✓ Pairs Kept Together
            ========================================================================= */}
        <div className="md:hidden space-y-4">
          <div className="p-4 bg-[#0a0f0d] border border-[#2f4a3a] rounded-xl flex items-center justify-between text-xs font-mono">
            <span className="text-[#c9a227] font-bold flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-[#c9a227]" />
              THE PARADIGM SHIFT
            </span>
            <span className="text-[#52635a]">4 MATCHED PAIRS</span>
          </div>

          <div className="space-y-3">
            {COMPARISON_PAIRS.map((pair, idx) => (
              <div
                key={pair.id}
                className="bg-[#0b0e0c] border border-[#1f2e26] rounded-xl p-4 space-y-3 rivet-corner"
              >
                <div className="text-[10px] font-mono text-[#52635a] uppercase tracking-wider flex items-center justify-between border-b border-[#17221b] pb-1.5">
                  <span>STANDARD 0{idx + 1}</span>
                  <span className="text-[#c9a227]">REALITY TEST</span>
                </div>

                {/* Left ✗ Item (Conventional) - WCAG AA High Contrast #cbd5e1 on dark */}
                <div className="flex items-start gap-2.5 bg-[#140e0e]/80 border border-[#f87171]/25 p-2.5 rounded-lg">
                  <XCircle className="w-4 h-4 text-[#f87171] shrink-0 mt-0.5" />
                  <div className="text-xs font-mono text-[#cbd5e1] leading-snug">
                    <span className="text-[10px] uppercase font-bold text-[#f87171] block mb-0.5">
                      Conventional:
                    </span>
                    {pair.doom}
                  </div>
                </div>

                {/* Right ✓ Item (Our Plan) */}
                <div className="flex items-start gap-2.5 bg-[#0f1f16]/80 border border-[#4ade80]/30 p-2.5 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-[#4ade80] shrink-0 mt-0.5" />
                  <div className="text-xs font-mono text-[#f1f5f9] leading-snug">
                    <span className="text-[10px] uppercase font-bold text-[#4ade80] block mb-0.5">
                      Exora 2.0 Plan:
                    </span>
                    {pair.ours}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================================
            2. STAT STRIP BELOW THE CARD (Mono Font)
            ========================================================================= */}
        <div className="mt-8 border border-[#1f2e26] bg-[#0c110e] rounded-xl p-4 sm:p-5 rivet-corner shadow-lg">
          <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2 text-center text-xs sm:text-sm font-mono tracking-wider text-[#8e9e96] select-none">
            <span className="text-[#e2e8e5] font-bold">24 HOURS</span>
            <span className="text-[#2f4a3a] hidden sm:inline">//</span>
            <span className="text-[#e2e8e5] font-bold">12+ MENTORS</span>
            <span className="text-[#2f4a3a] hidden sm:inline">//</span>
            <span className="text-[#4ade80] font-bold">5 TRACKS</span>
            <span className="text-[#2f4a3a] hidden sm:inline">//</span>
            <span className="text-[#e2e8e5] font-bold">40+ TEAMS</span>
            <span className="text-[#2f4a3a] hidden sm:inline">//</span>
            <span className="text-[#c9a227] font-bold">PRIZE POOL ₹25,000+</span>
          </div>
        </div>

        {/* =========================================================================
            3. "BEYOND THE VENUE" ROW (3 Community-Impact Points)
            ========================================================================= */}
        <div className="mt-8 pt-8 border-t border-[#1a2920]">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#c9a227] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c9a227]" />
            <span>BEYOND THE VENUE // 3 LASTING IMPACT CHANNELS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {BEYOND_THE_VENUE_POINTS.map((pt, idx) => {
              const IconComp = pt.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#0b100d] border border-[#1f2e26] hover:border-[#2f4a3a] p-5 rounded-xl transition-all group rivet-corner"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#142019] border border-[#2f4a3a] flex items-center justify-center text-[#c9a227] mb-3 group-hover:scale-105 transition-transform">
                    <IconComp className="w-4 h-4 text-[#c9a227]" />
                  </div>
                  <h4 className="font-display text-base font-bold text-[#e2e8e5] mb-1.5">
                    {pt.title}
                  </h4>
                  <p className="text-xs font-mono text-[#8e9e96] leading-relaxed">
                    {pt.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            4. CLOSING LINE & GOLD "CLAIM YOUR SEAT" CTA
            ========================================================================= */}
        <div className="mt-12 text-center flex flex-col items-center justify-center p-8 bg-gradient-to-b from-[#0c120f] to-[#070a08] border border-[#2f4a3a]/60 rounded-2xl rivet-corner">
          <p className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-[#e2e8e5] mb-6 tracking-tight">
            "Doom promises spectacle. <span className="text-[#c9a227]">We ship working code.</span>"
          </p>

          <a
            href={EVENT_CONFIG.registrationUrl}
            onClick={handleRegisterClick}
            className="button-metallic-sheen inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-[#0b0d0c] bg-[#c9a227] hover:bg-[#ddb435] shadow-[0_0_25px_rgba(201,162,39,0.35)] transition-all active:scale-95 cursor-pointer"
          >
            <span>Claim Your Seat</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
