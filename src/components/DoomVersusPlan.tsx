import React, { useState, useRef, useEffect } from 'react';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useReveal } from '../hooks/useReveal';
import { Sliders, Sparkles, AlertTriangle } from 'lucide-react';

export const DoomVersusPlan: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useScrollProgress(containerRef);
  const isReduced = useReducedMotion();
  const { ref: revealRef, revealClass } = useReveal<HTMLDivElement>();

  // Slider position (0 to 100). Defaults to 50% or scroll progress
  const [sliderPos, setSliderPos] = useState(50);
  const [isManualOverride, setIsManualOverride] = useState(false);

  useEffect(() => {
    if (!isManualOverride && !isReduced) {
      // Map scroll progress (0.2 to 0.8) smoothly to 15% to 85%
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
            Scroll or adjust the slider handle to inspect the disparity between conventional hackathon illusions and Exora 2.0's sovereign architecture.
          </p>
        </div>

        {/* Accessible Keyboard Slider Control */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 p-3 bg-[#0c100e] border border-[#1f2e26] rounded-xl text-xs font-mono">
          <div className="flex items-center gap-2 text-[#8e9e96]">
            <Sliders className="w-4 h-4 text-[#c9a227]" />
            <span>Interactive Divider Position: <strong className="text-[#c9a227]">{sliderPos}%</strong></span>
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
              aria-label="Divider comparison slider position"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={sliderPos}
              className="accent-[#c9a227] cursor-pointer h-1.5 w-32 sm:w-48 bg-[#1f2e26] rounded-lg"
            />
          </div>
        </div>

        {/* Visual Comparison Split Box with Clipping Mask */}
        <div className="relative min-h-[460px] border border-[#2f4a3a] rounded-2xl overflow-hidden rivet-corner shadow-2xl">
          {/* Base Layer: OUR WORLD (Right Side - Green, Warm, Active) */}
          <div className="absolute inset-0 bg-[#0d1611] p-6 sm:p-10 flex flex-col justify-between">
            <div className="max-w-md ml-auto text-right space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#4ade80] uppercase bg-[#14231a] border border-[#4ade80]/30 px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-[#4ade80]" />
                <span>OUR SOVEREIGN PLAN</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#e2e8e5]">
                Production-Hardened Systems & Living Guild
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm font-mono text-[#e2e8e5]/90 text-right">
                <li>✓ Full terminal immersion & architecture defense</li>
                <li>✓ Deterministic local models, memory isolation, & test suites</li>
                <li>✓ Continuous open-source grants & direct referrals</li>
                <li>✓ Concrete artifacts running on your own hardware</li>
              </ul>
            </div>

            <div className="mt-8 text-right text-[11px] font-mono text-[#4ade80]">
              STATUS: EXORA 2.0 PROTOCOL VERIFIED
            </div>
          </div>

          {/* Top Layer: DOOM'S WORLD (Left Side - Desaturated, Cracked, Dim) with clip-path */}
          <div
            className="absolute inset-0 bg-[#080908] p-6 sm:p-10 flex flex-col justify-between grayscale contrast-125 transition-all duration-75"
            style={{
              clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
            }}
          >
            <div className="max-w-md space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#f87171] uppercase bg-[#1a1111] border border-[#f87171]/40 px-3 py-1 rounded-full">
                <AlertTriangle className="w-3.5 h-3.5 text-[#f87171]" />
                <span>CONVENTIONAL HACKATHON ILLUSIONS</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#8e9e96]">
                Fragile Wrappers & Rotten Codebases
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm font-mono text-[#8e9e96]">
                <li>✗ Brittle API wrappers abandoned within 48 hours of judging</li>
                <li>✗ Passive 200-slide keynote lectures with zero terminal debugging</li>
                <li>✗ Vague networking & participation certs discarded by employers</li>
                <li>✗ Ephemeral sponsor swag over lasting engineering capability</li>
              </ul>
            </div>

            <div className="mt-8 text-[11px] font-mono text-[#52635a]">
              CRITIQUE // DOOM CONDEMNATION REPORT
            </div>
          </div>

          {/* Interactive Draggable Dividing Line */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-[#c9a227] shadow-[0_0_12px_#c9a227] z-30 pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            {/* Center Handle Badge */}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#0b0d0c] border-2 border-[#c9a227] flex items-center justify-center shadow-lg">
              <span className="text-[10px] font-mono text-[#c9a227] font-bold">⇄</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
