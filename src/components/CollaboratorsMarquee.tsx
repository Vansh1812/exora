
import React from 'react';
import { Sparkles } from 'lucide-react';

const SPONSORS = [
  { name: 'OSCode', tagline: 'Official Sponsor' },
  { name: 'Unstop', tagline: 'Official Sponsor' },
  { name: 'n8n', tagline: 'Official Sponsor' },
  { name: 'Adaptation AI', tagline: 'Official Sponsor' },
  { name: 'Fetch.ai', tagline: 'Official Sponsor' },
  { name: 'ASI: One', tagline: 'Official Sponsor' },
];

export const CollaboratorsMarquee: React.FC = () => {
  const doubleList = [...SPONSORS, ...SPONSORS];

  return (
    <section
      id="sponsors"
      className="py-10 sm:py-24 border-b border-white/10 bg-transparent overflow-hidden relative"
    >
      {/* Section Heading */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-6 sm:mb-10 text-center">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#120a2e]/80 border border-[#8b5cf6]/40 text-xs sm:text-sm font-display font-medium tracking-[0.16em] text-[#ffd2a8] uppercase backdrop-blur-md shadow-[0_0_18px_rgba(139,92,246,0.12)]">
          <span>POWERED BY OUR SPONSORS</span>
        </div>

        <h2 className="mt-5 font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-wide uppercase leading-tight">
          Our <span className="text-[#ffc58a]">Sponsors</span>
        </h2>

        <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base font-sans font-medium text-[#c5bddf] leading-relaxed">
          The partners supporting innovation, empowering builders, and helping
          bring the Exora 2.0 experience to life.
        </p>
      </div>

      {/* Infinite Sponsors Marquee */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
        aria-label="Exora 2.0 sponsors"
      >
        <div className="animate-marquee flex w-max items-center gap-4 sm:gap-6 py-2 sm:py-4">
          {doubleList.map((sponsor, idx) => (
            <div
              key={`${sponsor.name}-${idx}`}
              aria-hidden={idx >= SPONSORS.length}
              className="glass-pass-card min-w-[190px] sm:min-w-[220px] px-6 sm:px-7 py-5 sm:py-6 rounded-2xl flex items-center gap-4 shrink-0 transition-all duration-100 ease-in-out group cursor-default border border-white/10 hover:border-[#ffc58a]/50 hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(255,197,138,0.12)]"
            >
              {/* Luminous Brand Accent */}
              <div className="w-3 h-3 rounded-full shrink-0 bg-[#6ee7f9] shadow-[0_0_10px_#6ee7f9] group-hover:bg-[#ffc58a] group-hover:shadow-[0_0_12px_#ffc58a] transition-all duration-300" />

              <div className="min-w-0">
                <h3 className="font-display text-base sm:text-lg font-semibold text-white group-hover:text-[#ffd2a8] transition-colors tracking-wide whitespace-nowrap">
                  {sponsor.name}
                </h3>

                <p className="mt-1 text-xs sm:text-sm font-sans font-medium text-[#bdb3dc] whitespace-nowrap">
                  {sponsor.tagline}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Supporting Footer Text */}
      <p className="mt-4 sm:mt-7 text-center px-4 text-xs sm:text-sm font-sans text-[#a99fcf] tracking-wide">
        Together, building the next generation of innovation.
      </p>
    </section>
  );
};
