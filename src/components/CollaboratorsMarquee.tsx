import React from 'react';
import { EVENT_CONFIG } from '../eventConfig';
import { Sparkles } from 'lucide-react';

export const CollaboratorsMarquee: React.FC = () => {
  const doubleList = [...EVENT_CONFIG.collaborators, ...EVENT_CONFIG.collaborators];

  return (
    <section id="sponsors" className="py-16 border-b border-white/10 bg-transparent overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#120a2e]/80 border border-[#8b5cf6]/40 text-xs font-display tracking-[0.2em] text-[#ffc58a] uppercase backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#ffc58a]" />
          <span>COLLABORATORS & PATRONS // ECOSYSTEM INFRASTRUCTURE</span>
        </div>
      </div>

      {/* Infinite Horizontal Sliding Marquee Track with CSS Mask (No Black Background Overlays) */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div className="animate-marquee flex items-center gap-5 sm:gap-8 py-2">
          {doubleList.map((collab, idx) => (
            <div
              key={idx}
              className="glass-pass-card px-6 py-4 rounded-2xl flex items-center gap-3.5 shrink-0 transition-all group cursor-default hover:-translate-y-0.5 border border-white/10 hover:border-[#8b5cf6]/60"
            >
              {/* Luminous Brand Accent Dot */}
              <div className="w-2.5 h-2.5 rounded-full bg-[#6ee7f9] shadow-[0_0_8px_#6ee7f9] group-hover:bg-[#ffc58a] group-hover:shadow-[0_0_10px_#ffc58a] transition-colors" />

              <div>
                <div className="font-display text-sm sm:text-base font-normal text-[#f4f0ff] group-hover:text-[#ffc58a] transition-colors tracking-wide uppercase whitespace-nowrap">
                  {collab.name}
                </div>
                <div className="text-[11px] font-sans text-[#a99fcf] whitespace-nowrap">
                  {collab.tagline}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
