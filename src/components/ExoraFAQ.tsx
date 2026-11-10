import React, { useState } from 'react';
import { EVENT_CONFIG } from '../eventConfig';
import { useReveal } from '../hooks/useReveal';
import { ChevronDown, Sparkles } from 'lucide-react';

/**
 * Frequently Asked Questions Section ("Intel & Clarifications")
 * Redesigned with Orbital Walk design technique:
 * - Large signature glass pass card with centered top diamond sparkle
 * - Hairline clean dividers with smooth expandable accordion
 * - Trench typography and peach/violet accent hover states
 */
export const ExoraFAQ: React.FC = () => {
  const { ref, revealClass } = useReveal<HTMLDivElement>();
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    [EVENT_CONFIG.faqs[0].id]: true,
  });

  const toggle = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="faq" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative overflow-hidden">
      <div ref={ref} className={`max-w-4xl mx-auto ${revealClass}`}>
        {/* Section Header */}
        <div className="mb-10 sm:mb-12 text-center md:text-left">
          <div className="inline-flex items-center gap-2 mb-2 px-3.5 py-1 rounded-full bg-[#120a2e]/80 border border-[#8b5cf6]/40 text-xs font-display tracking-[0.2em] text-[#ffc58a] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#ffc58a]" />
            <span>INTEL // OPERATIONAL CLARIFICATIONS</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl font-normal text-[#f4f0ff] tracking-[0.08em] uppercase">
            FREQUENTLY ASKED
          </h2>

          <p className="text-xs sm:text-sm font-sans text-[#a99fcf] max-w-2xl mt-2 leading-relaxed">
            Everything you need to know about eligibility, PPT submissions, team sizes, and the offline finale.
          </p>
        </div>

        {/* Large Glass Pass Card Accordion Container */}
        <div className="glass-pass-card rounded-[28px] p-6 sm:p-9 md:p-10 relative overflow-hidden transition-all border border-white/14">
          {/* Centered Top Diamond Sparkle */}
          <div
            className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#120a2e] border border-[#ffc58a]/60 flex items-center justify-center shadow-[0_0_12px_#ffc58a] z-20"
            aria-hidden="true"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#ffc58a] animate-pulse" />
          </div>

          {/* Bottom Gradient Glow */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[2px] opacity-75"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, #8b5cf6 30%, #ffc58a 70%, #ff9a3c 100%)',
            }}
            aria-hidden="true"
          />

          {/* Hairline Accordion List */}
          <div className="divide-y divide-white/10 relative z-10">
            {EVENT_CONFIG.faqs.map((faq) => {
              const isOpen = !!openIds[faq.id];
              return (
                <div key={faq.id} className="py-1">
                  <button
                    type="button"
                    onClick={() => toggle(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full py-4 sm:py-5 text-left flex items-center justify-between gap-4 group focus:outline-none focus-visible:text-[#ffc58a] transition-colors cursor-pointer min-h-[48px]"
                  >
                    <span className="font-display font-normal text-base sm:text-lg text-[#f4f0ff] group-hover:text-[#ffc58a] transition-colors tracking-wide uppercase">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#a99fcf] group-hover:text-[#ffc58a] transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-[#ffc58a]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="pb-5 pt-1 text-xs sm:text-sm font-sans text-[#a99fcf] leading-relaxed max-w-3xl animate-[fadeInUp_180ms_ease-out]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
