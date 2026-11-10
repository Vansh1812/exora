import React from 'react';
import { EVENT_CONFIG } from '../eventConfig';
import { useReveal } from '../hooks/useReveal';
import { Sparkles, Trophy, Award, Gift, ArrowRight } from 'lucide-react';

/**
 * Prize Rewards Section ("The Pool")
 * Completely re-themed with Orbital Walk design technique:
 * - Signature glass pass cards with centered top diamond sparkles and bottom gradient glows
 * - Clean cosmic typography with peach/cyan/magenta highlights
 * - Direct Unstop registration link with no intermediate form
 */
export const ExoraPrizes: React.FC = () => {
  const { ref, revealClass } = useReveal<HTMLDivElement>();

  return (
    <section id="rewards" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative overflow-hidden">
      <div ref={ref} className={`max-w-6xl mx-auto ${revealClass}`}>
        {/* Section Header */}
        <div className="mb-10 sm:mb-12 text-center md:text-left">
          <div className="inline-flex items-center gap-2 mb-2 px-3.5 py-1 rounded-full bg-[#120a2e]/80 border border-[#8b5cf6]/40 text-xs font-display tracking-[0.2em] text-[#ffc58a] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#ffc58a]" />
            <span>BOUNTIES // MERIT POOL · ₹25,000+ REWARDS</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl font-normal text-[#f4f0ff] tracking-[0.08em] uppercase">
            PRIZE POOL
          </h2>

          <p className="text-xs sm:text-sm font-sans text-[#a99fcf] max-w-2xl mt-2 leading-relaxed">
            Direct cash bounties, certificates of merit, and startup acceleration awarded to top finalist squads.
          </p>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch mb-10">
          {/* Card 1: 2nd Prize (First Runner-Up) */}
          <div className="glass-pass-card rounded-[28px] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 border border-white/14 hover:-translate-y-1 group">
            {/* Centered Top Diamond Sparkle */}
            <div
              className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#120a2e] border border-[#6ee7f9]/60 flex items-center justify-center shadow-[0_0_12px_#6ee7f9] z-20"
              aria-hidden="true"
            >
              <Award className="w-3.5 h-3.5 text-[#6ee7f9]" />
            </div>

            {/* Bottom Glow */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[2px] opacity-75"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, #6ee7f9 50%, #8b5cf6 100%)',
              }}
              aria-hidden="true"
            />

            <div className="relative z-10 pt-2">
              <span className="text-[10px] font-mono tracking-widest text-[#6ee7f9] uppercase block mb-1">
                FIRST RUNNER-UP //
              </span>
              <div className="text-4xl sm:text-5xl font-display font-medium text-[#6ee7f9] tabular-nums mb-3 tracking-wide">
                ₹9,000
              </div>
              <h3 className="font-display text-lg sm:text-xl text-[#f4f0ff] uppercase tracking-wide mb-2">
                2ND PRIZE
              </h3>
              <p className="text-xs sm:text-sm font-sans text-[#a99fcf] leading-relaxed">
                Awarded to the first runner-up squad for exceptional project craftsmanship and strong technical execution.
              </p>
            </div>

            <div className="pt-4 mt-6 border-t border-white/10 text-[11px] font-mono text-[#a99fcf]">
              CASH BOUNTY + CITATION
            </div>
          </div>

          {/* Card 2: 1st Prize (Champions - Elevated with Top Reward Badge) */}
          <div className="glass-pass-card rounded-[28px] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 border-2 border-[#ffc58a]/60 shadow-[0_0_35px_rgba(255,197,138,0.18)] hover:shadow-[0_15px_45px_rgba(255,197,138,0.3)] hover:-translate-y-1.5 group">
            {/* Centered Top Diamond Sparkle */}
            <div
              className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#120a2e] border border-[#ffc58a] flex items-center justify-center shadow-[0_0_14px_#ffc58a] z-20"
              aria-hidden="true"
            >
              <Trophy className="w-3.5 h-3.5 text-[#ffc58a] animate-pulse" />
            </div>

            {/* Bottom Glow */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[2px] opacity-90"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, #ffc58a 50%, #ff9a3c 100%)',
              }}
              aria-hidden="true"
            />

            <div className="relative z-10 pt-2 text-center">
              <span className="inline-block px-3 py-1 rounded-full bg-[#ffc58a]/15 border border-[#ffc58a]/40 text-[10px] font-display uppercase tracking-widest text-[#ffc58a] mb-2">
                TOP REWARD // GRAND CHAMPIONS
              </span>
              <div className="text-5xl sm:text-6xl font-display font-medium text-[#ffc58a] tabular-nums mb-3 tracking-wide">
                ₹15,000
              </div>
              <h3 className="font-display text-xl sm:text-2xl text-[#f4f0ff] uppercase tracking-wide mb-2">
                1ST PRIZE
              </h3>
              <p className="text-xs sm:text-sm font-sans text-[#f4f0ff]/90 leading-relaxed">
                Awarded to the grand winning squad for outstanding innovation, systems engineering, and live jury pitch defense.
              </p>
            </div>

            <div className="pt-4 mt-6 border-t border-white/10 text-center text-xs font-mono text-[#ffc58a] font-medium">
              EXORA 2.0 OVERALL CHAMPIONS
            </div>
          </div>

          {/* Card 3: 3rd Prize (Second Runner-Up) */}
          <div className="glass-pass-card rounded-[28px] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 border border-white/14 hover:-translate-y-1 group">
            {/* Centered Top Diamond Sparkle */}
            <div
              className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#120a2e] border border-[#e04dff]/60 flex items-center justify-center shadow-[0_0_12px_#e04dff] z-20"
              aria-hidden="true"
            >
              <Award className="w-3.5 h-3.5 text-[#e04dff]" />
            </div>

            {/* Bottom Glow */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[2px] opacity-75"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, #e04dff 50%, #ff6f91 100%)',
              }}
              aria-hidden="true"
            />

            <div className="relative z-10 pt-2">
              <span className="text-[10px] font-mono tracking-widest text-[#e04dff] uppercase block mb-1">
                SECOND RUNNER-UP //
              </span>
              <div className="text-4xl sm:text-5xl font-display font-medium text-[#e04dff] tabular-nums mb-3 tracking-wide">
                ₹6,000
              </div>
              <h3 className="font-display text-lg sm:text-xl text-[#f4f0ff] uppercase tracking-wide mb-2">
                3RD PRIZE
              </h3>
              <p className="text-xs sm:text-sm font-sans text-[#a99fcf] leading-relaxed">
                Awarded to the second runner-up squad for an innovative solution and impressive problem-solving approach.
              </p>
            </div>

            <div className="pt-4 mt-6 border-t border-white/10 text-[11px] font-mono text-[#a99fcf]">
              CASH BOUNTY + CITATION
            </div>
          </div>
        </div>

        {/* Special Bounties & Certificates Strip */}
        <div className="glass-pass-card rounded-[28px] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden border border-white/14">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-[#120a2e] border border-[#ffc58a]/40 flex items-center justify-center text-[#ffc58a] shrink-0 shadow-[0_0_15px_rgba(255,197,138,0.2)]">
              <Gift className="w-5 h-5 text-[#ffc58a]" />
            </div>
            <div>
              <div className="font-display text-base text-[#f4f0ff] uppercase tracking-wide">
                Certificates of Merit & Participation
              </div>
              <p className="text-xs sm:text-sm font-sans text-[#a99fcf] mt-0.5">
                Every shortlisted participant receives verified credentials from Google Developer Groups & Thoughtworks.
              </p>
            </div>
          </div>

          <a
            href={EVENT_CONFIG.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-orbital shrink-0"
          >
            <span>Reserve Your Orbit</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>
    </section>
  );
};
