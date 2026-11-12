
import React, { useState } from 'react';
import { EVENT_CONFIG } from '../eventConfig';
import { useReveal } from '../hooks/useReveal';
import { ChevronDown, Sparkles } from 'lucide-react';

export const ExoraFAQ: React.FC = () => {
  const { ref, revealClass } = useReveal<HTMLDivElement>();

  const [openId, setOpenId] = useState<string | null>(
  EVENT_CONFIG.faqs[0]?.id ?? null
);

  const toggle = (id: string) => {
  setOpenId((prev) => (prev === id ? null : id));
};

  return (
    <section
      id="faq"
      className="pt-4 pb-12 sm:pt-6 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative overflow-hidden"
    >
      <div ref={ref} className={`max-w-4xl mx-auto ${revealClass}`}>

        {/* Section Header */}
        <div className="mb-5 sm:mb-7 text-center md:text-left">
          <div className="inline-flex items-center gap-3 mb-3 px-5 py-2.5 rounded-full bg-[#120a2e]/80 border border-[#8b5cf6]/50 text-sm sm:text-base font-display font-semibold tracking-[0.16em] text-[#ffd2a8] uppercase backdrop-blur-md shadow-[0_0_20px_rgba(139,92,246,0.16)]">
            
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
        <div className="glass-pass-card rounded-[28px] p-3 sm:p-8 md:p-10 relative overflow-hidden transition-all duration-300 border border-white/15">

          

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
              const isOpen = openId === faq.id;

              return (
                <div key={faq.id} className="py-1">

                  <button
                    type="button"
                    onClick={() => toggle(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full py-4 sm:py-6 text-left flex items-center justify-between gap-4 group focus:outline-none focus-visible:text-[#ffc58a] transition-colors duration-200 cursor-pointer min-h-[56px]"
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
        <p className="mt-4 sm:mt-7 text-center text-xs sm:text-sm font-sans font-medium text-[#a99fcf] tracking-wide leading-relaxed">
          Still have questions? Explore the event details and get ready for
          24 hours of innovation.
        </p>

      </div>
    </section>
  );
};
