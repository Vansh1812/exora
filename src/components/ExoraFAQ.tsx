
import React, { useState } from 'react';
import { EVENT_CONFIG } from '../eventConfig';
import { useReveal } from '../hooks/useReveal';
import { ChevronDown, Sparkles } from 'lucide-react';

export const ExoraFAQ: React.FC = () => {
  const { ref, revealClass } = useReveal<HTMLDivElement>();

  const [openIds, setOpenIds] = useState<Record<string, boolean>>(() => ({
    [EVENT_CONFIG.faqs[0].id]: true,
  }));

  const toggle = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section
      id="faq"
      className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative overflow-hidden"
    >
      <div ref={ref} className={`max-w-4xl mx-auto ${revealClass}`}>

        {/* Section Header */}
        <div className="mb-12 sm:mb-14 text-center md:text-left">
          <div className="inline-flex items-center gap-2.5 mb-3 px-4 py-2 rounded-full bg-[#120a2e]/80 border border-[#8b5cf6]/40 text-xs sm:text-sm font-display font-medium tracking-[0.16em] text-[#ffd2a8] uppercase backdrop-blur-md shadow-[0_0_18px_rgba(139,92,246,0.12)]">
            <Sparkles className="w-4 h-4 text-[#ffc58a]" />
            <span>INTEL // OPERATIONAL CLARIFICATIONS</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-[#f4f0ff] tracking-[0.05em] uppercase leading-tight">
            FREQUENTLY <span className="text-[#ffc58a]">ASKED</span>
          </h2>

          <p className="text-sm sm:text-base font-sans font-medium text-[#c5bddf] max-w-2xl mt-4 leading-relaxed">
            Everything you need to know about eligibility, PPT submissions,
            team sizes, and the offline finale. Find the answers before
            beginning your Exora 2.0 journey.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="glass-pass-card rounded-[28px] p-5 sm:p-8 md:p-10 relative overflow-hidden transition-all duration-300 border border-white/15">

          {/* Centered Top Sparkle */}
          <div
            className="absolute top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#120a2e] border border-[#ffc58a]/60 flex items-center justify-center shadow-[0_0_12px_#ffc58a] z-20"
            aria-hidden="true"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#ffc58a] animate-pulse" />
          </div>

          {/* Bottom Gradient Glow */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[2px] opacity-75"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, #8b5cf6 30%, #ffc58a 70%, #ff9a3c 100%)',
            }}
            aria-hidden="true"
          />

          {/* Accordion Questions */}
          <div className="divide-y divide-white/10 relative z-10">
            {EVENT_CONFIG.faqs.map((faq) => {
              const isOpen = !!openIds[faq.id];

              return (
                <div key={faq.id} className="py-1">

                  <button
                    type="button"
                    onClick={() => toggle(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full py-5 sm:py-6 text-left flex items-center justify-between gap-4 group focus:outline-none focus-visible:text-[#ffc58a] transition-colors duration-200 cursor-pointer min-h-[56px]"
                  >
                    <span className="font-display font-medium text-base sm:text-lg md:text-xl text-[#f4f0ff] group-hover:text-[#ffd2a8] transition-colors tracking-wide leading-snug uppercase">
                      {faq.question}
                    </span>

                    <ChevronDown
                      className={`w-5 h-5 text-[#bdb3dc] group-hover:text-[#ffc58a] transition-all duration-300 shrink-0 ${
                        isOpen ? 'rotate-180 text-[#ffc58a]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="pb-6 pt-1 pr-6 sm:pr-10 text-sm sm:text-base font-sans font-medium text-[#c5bddf] leading-[1.8] max-w-3xl animate-[fadeInUp_180ms_ease-out]">
                      {faq.answer}
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </div>

        {/* Closing Note */}
        <p className="mt-7 text-center text-xs sm:text-sm font-sans font-medium text-[#a99fcf] tracking-wide leading-relaxed">
          Still have questions? Explore the event details and get ready for
          24 hours of innovation.
        </p>

      </div>
    </section>
  );
};
