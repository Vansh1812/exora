import React, { useState, useEffect } from 'react';
import { EVENT_CONFIG } from '../eventConfig';
import { useReveal } from '../hooks/useReveal';
import { ChevronDown } from 'lucide-react';

export const ExoraFAQ: React.FC = () => {
  const { ref, revealClass, isRevealed } = useReveal<HTMLDivElement>();
  const [hasGlitched, setHasGlitched] = useState(false);
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    [EVENT_CONFIG.faqs[0].id]: true,
  });

  useEffect(() => {
    if (isRevealed) {
      setHasGlitched(true);
    }
  }, [isRevealed]);

  const toggle = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-[#1f2e26] relative">
      <div ref={ref} className={`max-w-4xl mx-auto ${revealClass}`}>
        {/* Section Header with RGB Glitch */}
        <div className="mb-12">
          <div
            className={`flex items-center gap-2 text-xs font-mono tracking-widest text-[#c9a227] uppercase mb-2 ${
              hasGlitched ? 'animate-glitch' : ''
            }`}
          >
            <span className="text-[#52635a]">//</span>
            <span>INTEL</span>
            <span className="text-[#33473c]">·</span>
            <span className="text-[#52635a]">OPERATIONAL CLARIFICATIONS</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-[#e2e8e5] tracking-tight uppercase">
            FREQUENTLY ASKED
          </h2>
        </div>

        {/* Minimalist Hairline Accordion List */}
        <div className="divide-y divide-[#1f2e26] border-y border-[#1f2e26]">
          {EVENT_CONFIG.faqs.map((faq) => {
            const isOpen = !!openIds[faq.id];
            return (
              <div key={faq.id} className="py-2">
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full py-5 text-left flex items-center justify-between gap-4 group focus:outline-none"
                >
                  <span className="font-display font-semibold text-base sm:text-lg text-[#e2e8e5] group-hover:text-[#c9a227] transition-colors">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#52635a] group-hover:text-[#c9a227] transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#c9a227]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="pb-6 text-xs sm:text-sm font-mono text-[#8e9e96] leading-relaxed max-w-3xl">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
