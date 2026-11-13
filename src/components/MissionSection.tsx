import React from 'react';
import { EVENT_CONFIG } from '../eventConfig';
import { useReveal } from '../hooks/useReveal';
import { Sparkles, Lightbulb, Cpu, Rocket, Users } from 'lucide-react';

/**
 * The Build Section ("About")
 * Redesigned with unified Orbital Walk design language:
 * - Simple, textual, and editorial (removed nested cluttered boxes)
 * - Signature 28px radius glass pass card with centered diamond sparkle & bottom gradient glow
 * - Asymmetric manifesto layout with pull-quote and inline stat metrics
 * - 4 Pillars presented as an elegant textual list with celestial icons
 * - Clean 6-parameter evaluation matrix with mono headers
 */
export const MissionSection: React.FC = () => {
  const { ref, revealClass } = useReveal<HTMLDivElement>();

  return (
    <section
      id="mission"
      className="pt-6 pb-12 sm:pt-8 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative overflow-hidden"
    >
      <div ref={ref} className={`max-w-6xl mx-auto ${revealClass}`}>
        {/* Section Header */}
        <div className="mb-6 sm:mb-8 text-center md:text-left">
          <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-[#180d35]/90 border border-[#b18aff]/50 text-xs sm:text-sm font-display font-semibold tracking-[0.16em] text-[#ffd09f] uppercase shadow-[0_0_18px_rgba(177,138,255,0.12)]">
            <span>THE BUILD // ARCHITECTURAL CRUCIBLE</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl font-semibold text-white tracking-[0.08em] uppercase drop-shadow-[0_0_18px_rgba(224,77,255,0.2)]">
            THE BUILD
          </h2>

          <div className="font-display text-lg sm:text-xl font-semibold text-[#8beaff] tracking-wider uppercase mt-2">
            A Crucible Between Worlds
          </div>
        </div>

        {/* =========================================================================
            CARD 1: MAIN MANIFESTO & 4 PILLARS (Unified Signature Glass Pass Card)
            ========================================================================= */}
        <div className="glass-pass-card rounded-[28px] p-6 sm:p-10 relative overflow-hidden transition-all border border-white/14 mb-8">
          
          {/* Bottom Gradient Glow */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[2px] opacity-75"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, #8b5cf6 30%, #ffc58a 70%, #ff9a3c 100%)',
            }}
            aria-hidden="true"
          />

          {/* 2-Column Asymmetric Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
            {/* Left Column (5 cols): Manifesto Pull-Quote & Textual Stats */}
            <div className="lg:col-span-5 space-y-6">
              <blockquote className="p-6 sm:p-7 rounded-2xl bg-[#100a24]/90 border-l-[3px] border-l-[#ffc58a] border border-[#b99be8]/20 shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
                <p className="font-sans font-light text-base sm:text-lg text-[#f4f0ff] leading-relaxed italic">
                  &ldquo;We don&apos;t build fragile prototypes that get abandoned by Monday. We walk the line between imagination and production engineering — turning raw concepts into resilient, enduring architectures.&rdquo;
                </p>
              </blockquote>

              <p className="font-sans text-sm sm:text-base text-[#c5bddf] leading-relaxed">
                Exora 2.0 is an innovation-driven hackathon hosted by{' '}
                <strong className="text-[#f4f0ff] font-medium">{EVENT_CONFIG.collegeName}</strong> with our grand finale hosted at{' '}
                <span className="text-[#ffc58a] font-medium">{EVENT_CONFIG.venue}</span> on{' '}
                <span className="text-[#ffc58a] font-medium">{EVENT_CONFIG.dateDisplay}</span>. Over 24 hours, student builders journey across three phases and five specialized orbits.
              </p>

              {/* Clean Inline Fact Metrics (Textual, No Clunky Boxes) */}
              <div className="pt-4 border-t border-white/10 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <div className="rounded-xl bg-white/[0.035] border border-white/10 p-3 min-w-0 overflow-hidden">
                  <span className="text-[10px] font-mono tracking-widest text-[#a99fcf] font-semibold uppercase block truncate">
                    SPRINT DURATION
                  </span>
                  <span className="text-xl sm:text-2xl font-display font-semibold text-[#ffd09f] block mt-1 truncate">
                    24 HOURS
                  </span>
                  <span className="text-xs font-sans text-[#c5bddf] truncate block">Continuous Build</span>
                </div>

                <div className="rounded-xl bg-white/[0.035] border border-white/10 p-3 min-w-0 overflow-hidden">
                  <span className="text-[10px] font-mono tracking-widest text-[#a99fcf] font-semibold uppercase block truncate">
                    JOURNEY FORMAT
                  </span>
                  <span className="text-lg sm:text-2xl font-display font-semibold text-[#8beaff] block mt-1 truncate">
                    3 PHASES
                  </span>
                  <span className="text-xs font-sans text-[#c5bddf] truncate block">Online to Finale</span>
                </div>

                <div className="rounded-xl bg-white/[0.035] border border-white/10 p-3 min-w-0 overflow-hidden">
                  <span className="text-[10px] font-mono tracking-widest text-[#a99fcf] font-semibold uppercase block truncate">
                    VENUE ACCESS
                  </span>
                  <span className="text-xs xs:text-sm sm:text-lg md:text-xl font-display font-semibold text-[#ed9aff] block mt-1 tracking-tight sm:tracking-normal truncate">
                    THOUGHTWORKS
                  </span>
                  <span className="text-xs font-sans text-[#cfbddf] truncate block">HQ Gurugram</span>
                </div>

                <div className="rounded-xl bg-white/[0.035] border border-white/10 p-3 min-w-0 overflow-hidden">
                  <span className="text-[10px] font-mono tracking-widest text-[#a99fcf] font-semibold uppercase block truncate">
                    ENROLLMENT
                  </span>
                  <span className="text-lg sm:text-2xl font-display font-semibold text-white block mt-1 truncate">
                    100% FREE
                  </span>
                  <span className="text-xs font-sans text-[#c5bddf] truncate block">Merit Selection</span>
                </div>
              </div>
            </div>

            {/* Right Column (7 cols): The 4 Pillars as a Clean Textual List */}
            <div className="lg:col-span-7 space-y-4">
              <div className="text-sm font-display font-semibold tracking-[0.16em] text-[#ffd09f] uppercase flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffc58a]" />
                <span>CORE FOUNDATIONAL PILLARS</span>
              </div>

              {/* Pillar 1 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#05030f]/50 border border-white/5 hover:border-white/20 transition-all flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#120a2e] border border-[#ffc58a]/40 flex items-center justify-center text-[#ffc58a] shrink-0 shadow-[0_0_12px_rgba(255,197,138,0.2)]">
                  <Lightbulb className="w-5 h-5 text-[#ffc58a]" />
                </div>
                <div>
                  <h3 className="font-display text-base sm:text-lg font-semibold text-[#ffffff] uppercase tracking-wide mb-2">
                    Planetary Innovation
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-[#c5bddf] leading-[1.8]">
                    Identify and solve fundamental challenges through unconventional architectures and novel multi-agent or hardware paradigms.
                  </p>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#05030f]/50 border border-white/5 hover:border-white/20 transition-all flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#120a2e] border border-[#6ee7f9]/40 flex items-center justify-center text-[#6ee7f9] shrink-0 shadow-[0_0_12px_rgba(110,231,249,0.2)]">
                  <Cpu className="w-5 h-5 text-[#6ee7f9]" />
                </div>
                <div>
                  <h3 className="font-display text-base sm:text-lg font-semibold text-[#ffffff] uppercase tracking-wide mb-2">
                    Production Mastery
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-[#c5bddf] leading-relaxed">
                    Terminal open from minute one. Build real, deployable, resilient systems with test coverage and end-to-end telemetry.
                  </p>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#05030f]/50 border border-white/5 hover:border-white/20 transition-all flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#120a2e] border border-[#e04dff]/40 flex items-center justify-center text-[#e04dff] shrink-0 shadow-[0_0_12px_rgba(224,77,255,0.2)]">
                  <Rocket className="w-5 h-5 text-[#e04dff]" />
                </div>
                <div>
                  <h3 className="font-display text-base sm:text-lg font-semibold text-[#ffffff] uppercase tracking-wide mb-2">
                    Startup Trajectory & Venture Velocity
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-[#c5bddf] leading-relaxed">
                    Validate product-market fit, refine unit economics, and transition straight from Sunday demo to incubator pipelines.
                  </p>
                </div>
              </div>

              {/* Pillar 4 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#05030f]/50 border border-white/5 hover:border-white/20 transition-all flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#120a2e] border border-[#8b5cf6]/40 flex items-center justify-center text-[#ffc58a] shrink-0 shadow-[0_0_12px_rgba(139,92,246,0.2)]">
                  <Users className="w-5 h-5 text-[#ffc58a]" />
                </div>
                <div>
                  <h3 className="font-display text-base sm:text-lg font-semibold text-[#ffffff] uppercase tracking-wide mb-2">
                    Cosmic Alliance & Industry Guidance
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-[#c5bddf] leading-relaxed">
                    Collaborate directly with Thoughtworks engineering directors, Google Developer Groups leads, and seasoned founders who review code 1:1.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            CARD 2: FINAL JUDGING PARAMETERS (Clean 6-Point Evaluation Matrix)
            ========================================================================= */}
        <div className="glass-pass-card rounded-[28px] p-6 pt-8 sm:p-9 relative overflow-hidden transition-all border border-white/14">
    
          {/* Bottom Gradient Glow */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[2px] opacity-75"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, #6ee7f9 40%, #8b5cf6 80%, transparent 100%)',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 mb-6 border-b border-white/10">
              <div>
                <span className="text-xs sm:text-sm font-mono font-semibold tracking-[0.16em] uppercase text-[#8beaff] block mb-2">
                  EVALUATION STANDARDS // 6 CORE DIMENSIONS
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white uppercase tracking-wide">
                  Final Judging Parameters
                </h3>
              </div>
              <span className="text-sm font-sans text-[#c5bddf] font-medium">
                Executive jury scoring @ Thoughtworks Gurugram
              </span>
            </div>

            {/* Clean 3x2 Textual Parameter Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {EVENT_CONFIG.judgingCriteria.map((crit, idx) => (
                <div
                  key={crit.id}
                  className="p-4 rounded-xl bg-[#05030f]/40 border border-white/5 hover:border-white/20 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-mono font-semibold tracking-wider text-[#ffd09f] uppercase">
                      CRITERION 0{idx + 1}
                    </span>
                    <span className="text-xs font-display font-semibold tracking-wide text-[#c5bddf] uppercase">
                      {crit.category}
                    </span>
                  </div>
                  <h4 className="font-display text-lg font-semibold text-white uppercase tracking-wide mb-2">
                    {crit.name}
                  </h4>
                  <p className="text-sm sm:text-base font-sans text-[#c5bddf] leading-relaxed">
                    {crit.descriptor}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
