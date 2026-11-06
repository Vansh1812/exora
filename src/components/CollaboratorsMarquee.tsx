import React from 'react';
import { EVENT_CONFIG } from '../eventConfig';

export const CollaboratorsMarquee: React.FC = () => {
  const doubleList = [...EVENT_CONFIG.collaborators, ...EVENT_CONFIG.collaborators];

  return (
    <section id="sponsors" className="py-14 border-b border-[#1f2e26] bg-[#090d0b] overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-6">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#c9a227] uppercase">
          <span className="text-[#52635a]">//</span>
          <span>COLLABORATORS & PATRONS</span>
          <span className="text-[#33473c]">·</span>
          <span className="text-[#52635a]">ECOSYSTEM INFRASTRUCTURE</span>
        </div>
      </div>

      {/* Infinite Marquee Track (Reference: image_63b7ae22.png) */}
      <div className="relative w-full overflow-hidden">
        {/* Left & Right gradient fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#090d0b] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#090d0b] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex items-center gap-6 sm:gap-10 py-2">
          {doubleList.map((collab, idx) => (
            <div
              key={idx}
              className="px-6 py-3.5 border border-[#1f2e26] hover:border-[#2f4a3a] bg-[#0c110e] rounded-xl flex items-center gap-3 shrink-0 transition-colors group cursor-default"
            >
              <div className="w-2 h-2 rounded-full bg-[#2f4a3a] group-hover:bg-[#c9a227] transition-colors" />
              <div>
                <div className="font-display font-bold text-sm sm:text-base text-[#e2e8e5] group-hover:text-[#c9a227] transition-colors tracking-tight whitespace-nowrap">
                  {collab.name}
                </div>
                <div className="text-[10px] font-mono text-[#52635a] whitespace-nowrap">
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
