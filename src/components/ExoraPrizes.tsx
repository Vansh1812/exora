import React, { useState, useEffect } from 'react';
import { EVENT_CONFIG } from '../eventConfig';
import { useReveal } from '../hooks/useReveal';
import { Gift } from 'lucide-react';

export const ExoraPrizes: React.FC = () => {
  const { ref, revealClass, isRevealed } = useReveal<HTMLDivElement>();
  const [hasGlitched, setHasGlitched] = useState(false);

  useEffect(() => {
    if (isRevealed) {
      setHasGlitched(true);
    }
  }, [isRevealed]);

  return (
    <section id="rewards" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-[#1f2e26] relative">
      <div ref={ref} className={`max-w-6xl mx-auto ${revealClass}`}>
        {/* Section Header with RGB Glitch */}
        <div className="mb-12">
          <div
            className={`flex items-center gap-2 text-xs font-mono tracking-widest text-[#c9a227] uppercase mb-2 ${
              hasGlitched ? 'animate-glitch' : ''
            }`}
          >
            <span className="text-[#52635a]">//</span>
            <span>THE POOL</span>
            <span className="text-[#33473c]">·</span>
            <span className="text-[#52635a]">₹25,000+ CUMULATIVE REWARDS</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-[#e2e8e5] tracking-tight uppercase">
            PRIZE REWARDS
          </h2>
        </div>

        {/* 3-Card Grid Matching image_63b7ae22.png */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch mb-12">
          {/* Card 1: Technical Excellence (Left) */}
          <div className="border border-[#1f2e26] bg-[#0c100e] hover:border-[#2f4a3a] p-6 sm:p-8 rounded-2xl rivet-corner shadow-xl flex flex-col justify-between transition-all group">
            <div>
              <div className="text-4xl sm:text-5xl font-mono font-extrabold text-[#4ade80] tabular-nums mb-4 tracking-tight">
                ₹7,500
              </div>
              <h3 className="font-display font-bold text-base sm:text-lg text-[#e2e8e5] mb-2 tracking-tight uppercase">
                TECHNICAL EXCELLENCE
              </h3>
              <p className="text-xs sm:text-sm font-mono text-[#8e9e96] leading-relaxed">
                Best overall engineering, system resilience, and build quality.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#1b2b22] text-[11px] font-mono text-[#52635a]">
              DIRECT CASH CITATION + RUNNER-UP COMMENDATION
            </div>
          </div>

          {/* Card 2: The Grand Unveil (Center - Elevated with TOP REWARD badge) */}
          <div className="border-2 border-[#c9a227] bg-[#101713] p-6 sm:p-8 rounded-2xl rivet-corner shadow-[0_0_35px_rgba(201,162,39,0.2)] flex flex-col justify-between transition-all relative">
            <div>
              <div className="text-center mb-3">
                <span className="inline-block text-[10px] font-mono font-bold tracking-[0.2em] text-[#c9a227] uppercase">
                  TOP REWARD
                </span>
              </div>

              <div className="text-5xl sm:text-6xl font-mono font-black text-[#c9a227] tabular-nums mb-4 text-center tracking-tight">
                ₹11,000
              </div>

              <h3 className="font-display font-bold text-lg sm:text-xl text-[#e2e8e5] mb-2 tracking-tight uppercase text-center">
                THE GRAND UNVEIL
              </h3>

              <p className="text-xs sm:text-sm font-mono text-[#e2e8e5]/90 leading-relaxed text-center">
                Most innovative and impactful project built during the 24-hour hackathon. Awarded to the sovereign champion squad.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-[#2f4a3a] text-center text-xs font-mono text-[#c9a227] font-semibold">
              THE SOVEREIGN TROPHY + STARTUP INCUBATION SEAT
            </div>
          </div>

          {/* Card 3: Future Tech Award (Right) */}
          <div className="border border-[#1f2e26] bg-[#0c100e] hover:border-[#2f4a3a] p-6 sm:p-8 rounded-2xl rivet-corner shadow-xl flex flex-col justify-between transition-all group">
            <div>
              <div className="text-4xl sm:text-5xl font-mono font-extrabold text-[#38bdf8] tabular-nums mb-4 tracking-tight">
                ₹4,800
              </div>
              <h3 className="font-display font-bold text-base sm:text-lg text-[#e2e8e5] mb-2 tracking-tight uppercase">
                FUTURE TECH AWARD
              </h3>
              <p className="text-xs sm:text-sm font-mono text-[#8e9e96] leading-relaxed">
                Best use of emerging technologies & industrial design.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#1b2b22] text-[11px] font-mono text-[#52635a]">
              DIRECT CASH CITATION + DEVELOPER SUITE
            </div>
          </div>
        </div>

        {/* Special Bounties Strip */}
        <div className="border border-[#1f2e26] bg-[#090d0b] p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Gift className="w-5 h-5 text-[#c9a227] shrink-0" />
            <div>
              <div className="font-mono text-xs font-bold text-[#e2e8e5] uppercase">
                ADDITIONAL SPECIAL COMMENDATIONS & BOUNTIES
              </div>
              <div className="text-[11px] font-mono text-[#52635a]">
                All-Women Squad Award (₹3,000) · Best Hardware Prototype (₹3,000) · Hard-Copy Framed Certificates for Top 40
              </div>
            </div>
          </div>

          <a
            href={EVENT_CONFIG.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="button-metallic-sheen px-6 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-[#0b0d0c] bg-[#c9a227] hover:bg-[#ddb435] transition-all whitespace-nowrap"
          >
            Claim Your Contention
          </a>
        </div>
      </div>
    </section>
  );
};
