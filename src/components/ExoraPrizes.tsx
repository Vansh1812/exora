
import React from 'react';
import { EVENT_CONFIG } from '../eventConfig';
import { useReveal } from '../hooks/useReveal';
import { Sparkles, Trophy, Award, Gift, ArrowRight } from 'lucide-react';

export const ExoraPrizes: React.FC = () => {
  const { ref, revealClass } = useReveal<HTMLDivElement>();

  return (
    <section
      id="rewards"
      className="pt-4 pb-12 sm:pt-6 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative overflow-hidden"
    >
      <div ref={ref} className={`max-w-6xl mx-auto ${revealClass}`}>

        {/* Section Header */}
        <div className="mb-5 sm:mb-7 text-center md:text-left">
          <div className="inline-flex items-center gap-3 mb-3 px-5 py-2.5 rounded-full bg-[#120a2e]/80 border border-[#8b5cf6]/50 text-sm sm:text-base font-display font-semibold tracking-[0.16em] text-[#ffd2a8] uppercase backdrop-blur-md shadow-[0_0_20px_rgba(139,92,246,0.16)]">
            
            <span>BOUNTIES // MERIT POOL · ₹2,00,000 REWARDS</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-[#f4f0ff] tracking-[0.06em] uppercase leading-tight">
            PRIZE <span className="text-[#ffc58a]">POOL</span>
          </h2>

          <p className="text-sm sm:text-base font-sans font-medium text-[#c5bddf] max-w-2xl mt-4 leading-relaxed">
            Compete for exciting cash prizes, certificates of merit, and
            opportunities to take your ideas further. Outstanding teams will
            earn recognition for their innovation and execution.
          </p>
        </div>

        {/* Prize Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 items-stretch mb-8 sm:mb-12">

          {/* Second Prize */}
          <div className="order-2 md:order-1 glass-pass-card rounded-[28px] p-5 sm:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 border border-white/15 hover:border-[#6ee7f9]/40 hover:-translate-y-1 group">

            <div
              className="absolute top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#120a2e] border border-[#6ee7f9]/60 flex items-center justify-center shadow-[0_0_12px_#6ee7f9] z-20"
              aria-hidden="true"
            >
              <Award className="w-3.5 h-3.5 text-[#6ee7f9]" />
            </div>

            <div
              className="absolute bottom-0 left-0 right-0 h-[2px] opacity-75"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, #6ee7f9 50%, #8b5cf6 100%)',
              }}
              aria-hidden="true"
            />

            <div className="relative z-10 pt-3">
              <span className="text-xs font-mono font-medium tracking-[0.16em] text-[#6ee7f9] uppercase block mb-2">
                FIRST RUNNER-UP
              </span>

              <div className="text-4xl sm:text-5xl font-display font-semibold text-[#6ee7f9] tabular-nums mb-4 tracking-wide">
                ₹9,000
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#f4f0ff] uppercase tracking-wide mb-3">
                2ND PRIZE
              </h3>

              <p className="text-sm sm:text-base font-sans font-medium text-[#c5bddf] leading-relaxed">
                Awarded to the first runner-up squad for exceptional project
                craftsmanship and strong technical execution.
              </p>
            </div>

            <div className="pt-4 mt-7 border-t border-white/10 text-xs font-mono font-medium tracking-wider text-[#bdb3dc]">
              EXORA 2.0 FIRST RUNNER-UP
            </div>
          </div>

          {/* First Prize */}
          <div className="order-1 md:order-2 glass-pass-card rounded-[28px] p-5 sm:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 border-2 border-[#ffc58a]/60 shadow-[0_0_35px_rgba(255,197,138,0.18)] hover:shadow-[0_15px_45px_rgba(255,197,138,0.3)] hover:-translate-y-1.5 group">

            <div
              className="absolute top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#120a2e] border border-[#ffc58a] flex items-center justify-center shadow-[0_0_14px_#ffc58a] z-20"
              aria-hidden="true"
            >
              <Trophy className="w-3.5 h-3.5 text-[#ffc58a] animate-pulse" />
            </div>

            <div
              className="absolute bottom-0 left-0 right-0 h-[2px] opacity-90"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, #ffc58a 50%, #ff9a3c 100%)',
              }}
              aria-hidden="true"
            />

            <div className="relative z-10 pt-3 text-center">
              <span className="inline-block px-3 py-1.5 rounded-full bg-[#ffc58a]/15 border border-[#ffc58a]/40 text-xs font-display font-medium uppercase tracking-wider text-[#ffc58a] mb-3">
                TOP REWARD // GRAND CHAMPIONS
              </span>

              <div className="text-5xl sm:text-6xl font-display font-semibold text-[#ffc58a] tabular-nums mb-4 tracking-wide">
                ₹15,000
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#f4f0ff] uppercase tracking-wide mb-3">
                1ST PRIZE
              </h3>

              <p className="text-sm sm:text-base font-sans font-medium text-[#e2dcef] leading-relaxed">
                Awarded to the grand winning squad for outstanding innovation,
                systems engineering, and live jury pitch defense.
              </p>
            </div>

            <div className="pt-4 mt-7 border-t border-white/10 text-center text-xs sm:text-sm font-mono font-semibold tracking-wider text-[#ffc58a]">
              EXORA 2.0 OVERALL CHAMPIONS
            </div>
          </div>

          {/* Third Prize */}
          <div className="order-3 glass-pass-card rounded-[28px] p-5 sm:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 border border-white/15 hover:border-[#e04dff]/40 hover:-translate-y-1 group">

            <div
              className="absolute top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#120a2e] border border-[#e04dff]/60 flex items-center justify-center shadow-[0_0_12px_#e04dff] z-20"
              aria-hidden="true"
            >
              <Award className="w-3.5 h-3.5 text-[#e04dff]" />
            </div>

            <div
              className="absolute bottom-0 left-0 right-0 h-[2px] opacity-75"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, #e04dff 50%, #ff6f91 100%)',
              }}
              aria-hidden="true"
            />

            <div className="relative z-10 pt-3">
              <span className="text-xs font-mono font-medium tracking-[0.16em] text-[#e04dff] uppercase block mb-2">
                SECOND RUNNER-UP
              </span>

              <div className="text-4xl sm:text-5xl font-display font-semibold text-[#e04dff] tabular-nums mb-4 tracking-wide">
                ₹6,000
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#f4f0ff] uppercase tracking-wide mb-3">
                3RD PRIZE
              </h3>

              <p className="text-sm sm:text-base font-sans font-medium text-[#c5bddf] leading-relaxed">
                Awarded to the second runner-up squad for an innovative
                solution and impressive problem-solving approach.
              </p>
            </div>

            <div className="pt-4 mt-7 border-t border-white/10 text-xs font-mono font-medium tracking-wider text-[#bdb3dc]">
              EXORA 2.0 SECOND RUNNER-UP
            </div>
          </div>
        </div>

        {/* Certificates and Registration */}
        <div className="glass-pass-card rounded-[28px] p-5 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 relative overflow-hidden border border-white/15 hover:border-[#ffc58a]/30 transition-all duration-300">

          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#120a2e] border border-[#ffc58a]/40 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(255,197,138,0.2)]">
              <Gift className="w-6 h-6 text-[#ffc58a]" />
            </div>

            <div>
              <h3 className="font-display text-lg sm:text-xl font-semibold text-[#f4f0ff] uppercase tracking-wide leading-snug">
                Certificates of Merit & Participation
              </h3>

              <p className="text-sm sm:text-base font-sans font-medium text-[#c5bddf] mt-2 leading-relaxed max-w-2xl">
                Every shortlisted participant receives verified credentials
                from Google Developer Groups & Thoughtworks.
              </p>
            </div>
          </div>

          <a
            href={EVENT_CONFIG.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-orbital shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 text-sm sm:text-base font-semibold"
          >
            <span>Reserve Your Orbit</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};