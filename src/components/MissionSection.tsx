import React, { useState, useEffect } from 'react';
import { EVENT_CONFIG } from '../eventConfig';
import { useReveal } from '../hooks/useReveal';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { Lightbulb, Cpu, Rocket, Users, Target } from 'lucide-react';

export const MissionSection: React.FC = () => {
  const { ref, revealClass, isRevealed } = useReveal<HTMLDivElement>();
  const isReduced = useReducedMotion();
  const [shaking, setShaking] = useState(false);
  const [stampsActive, setStampsActive] = useState(false);
  const [hasGlitched, setHasGlitched] = useState(false);

  useEffect(() => {
    if (isRevealed && !stampsActive) {
      setStampsActive(true);
      setHasGlitched(true);

      // Trigger micro shake (~150ms) on first stamp hit
      if (!isReduced) {
        setShaking(true);
        const timer = setTimeout(() => setShaking(false), 150);
        return () => clearTimeout(timer);
      }
    }
  }, [isRevealed, stampsActive, isReduced]);

  return (
    <section
      id="mission"
      className={`py-24 px-4 sm:px-6 lg:px-8 border-b border-[#1f2e26] relative ${
        shaking ? 'animate-screen-shake' : ''
      }`}
    >
      <div ref={ref} className={`max-w-6xl mx-auto ${revealClass}`}>
        {/* Kicker with RGB Glitch on entry */}
        <div
          className={`mb-4 flex items-center gap-2 text-xs font-mono tracking-widest text-[#c9a227] uppercase ${
            hasGlitched ? 'animate-glitch' : ''
          }`}
        >
          <span className="text-[#52635a]">//</span>
          <span>THE MISSION</span>
          <span className="text-[#33473c]">·</span>
          <span className="text-[#52635a]">CLASSIFIED DOSSIER BRIEFING</span>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-16">
          {/* Left Column (5 cols): Steel Plate Slide-in */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-[#e2e8e5] tracking-tight leading-tight">
                {EVENT_CONFIG.eventName}:
              </h2>
              <div className="font-display text-3xl sm:text-4xl font-black tracking-tight text-stroke-hollow uppercase">
                {EVENT_CONFIG.eventTaglineMain}
              </div>
            </div>

            <p className="font-mono text-sm sm:text-base text-[#8e9e96] leading-relaxed">
              Exora 2.0 is a premier 24-hour hackathon hosted by{' '}
              <strong className="text-[#e2e8e5] font-semibold">{EVENT_CONFIG.collegeName}</strong> at{' '}
              <span className="text-[#c9a227] font-semibold">{EVENT_CONFIG.venue}</span> on{' '}
              <span className="text-[#c9a227] font-semibold">{EVENT_CONFIG.dateDisplay}</span>. It is an innovation-driven crucible designed to bridge the chasm between academic theory and battle-tested production engineering.
            </p>

            <div className="pt-2 text-xs font-mono text-[#52635a] border-l-2 border-[#2f4a3a] pl-3">
              "Others plead for technological scraps. Latveria commands sovereign architecture."
            </div>

            {/* Hairline Divider and Stamped Stats */}
            <div className="pt-6 border-t border-[#1f2e26] grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div
                className={`transition-all duration-300 ${
                  stampsActive ? 'animate-stamp-hit' : 'opacity-0'
                }`}
                style={{ animationDelay: '0ms' }}
              >
                <div className="text-2xl sm:text-3xl font-mono font-bold text-[#c9a227] tabular-nums">
                  1,500+
                </div>
                <div className="text-[10px] font-mono tracking-widest text-[#52635a] uppercase mt-1">
                  DEVELOPERS
                </div>
              </div>

              <div
                className={`transition-all duration-300 ${
                  stampsActive ? 'animate-stamp-hit' : 'opacity-0'
                }`}
                style={{ animationDelay: '100ms' }}
              >
                <div className="text-2xl sm:text-3xl font-mono font-bold text-[#4ade80] tabular-nums">
                  28
                </div>
                <div className="text-[10px] font-mono tracking-widest text-[#52635a] uppercase mt-1">
                  NOV 2026
                </div>
              </div>

              <div
                className={`transition-all duration-300 ${
                  stampsActive ? 'animate-stamp-hit' : 'opacity-0'
                }`}
                style={{ animationDelay: '200ms' }}
              >
                <div className="text-2xl sm:text-3xl font-mono font-bold text-[#e2e8e5] tracking-wider">
                  FREE
                </div>
                <div className="text-[10px] font-mono tracking-widest text-[#52635a] uppercase mt-1">
                  ENTRY
                </div>
              </div>

              <div
                className={`transition-all duration-300 ${
                  stampsActive ? 'animate-stamp-hit' : 'opacity-0'
                }`}
                style={{ animationDelay: '300ms' }}
              >
                <div className="text-2xl sm:text-3xl font-mono font-bold text-[#c9a227] tracking-wider">
                  ₹25K+
                </div>
                <div className="text-[10px] font-mono tracking-widest text-[#52635a] uppercase mt-1">
                  BOUNTY
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Asymmetric Bento Grid of 4 Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Card 1: Innovation & Problem Solving */}
            <div className="border border-[#1f2e26] bg-[#0c100e] hover:border-[#2f4a3a] p-6 rounded-2xl rivet-corner shadow-xl transition-all group flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#141e18] border border-[#2f4a3a] flex items-center justify-center text-[#c9a227] mb-5 group-hover:scale-105 transition-transform">
                  <Lightbulb className="w-5 h-5 text-[#c9a227]" />
                </div>
                <h3 className="font-display font-bold text-base sm:text-lg text-[#e2e8e5] mb-2 tracking-tight">
                  INNOVATION & PROBLEM SOLVING
                </h3>
                <p className="text-xs sm:text-sm font-mono text-[#8e9e96] leading-relaxed">
                  Identify and tackle real-world challenges through unconventional thinking and novel approaches.
                </p>
              </div>
            </div>

            {/* Card 2: Technical Excellence */}
            <div className="border border-[#1f2e26] bg-[#0c100e] hover:border-[#2f4a3a] p-6 rounded-2xl rivet-corner shadow-xl transition-all group flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#141e18] border border-[#2f4a3a] flex items-center justify-center text-[#4ade80] mb-5 group-hover:scale-105 transition-transform">
                  <Cpu className="w-5 h-5 text-[#4ade80]" />
                </div>
                <h3 className="font-display font-bold text-base sm:text-lg text-[#e2e8e5] mb-2 tracking-tight">
                  TECHNICAL EXCELLENCE
                </h3>
                <p className="text-xs sm:text-sm font-mono text-[#8e9e96] leading-relaxed">
                  Focus on hands-on project development and modern product thinking.
                </p>
              </div>
            </div>

            {/* Card 3: Startup Fundamentals */}
            <div className="sm:col-span-2 border border-[#1f2e26] bg-[#0c100e] hover:border-[#2f4a3a] p-6 rounded-2xl rivet-corner shadow-xl transition-all group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#141e18] border border-[#2f4a3a] flex items-center justify-center text-[#38bdf8] shrink-0 group-hover:scale-105 transition-transform">
                  <Rocket className="w-5 h-5 text-[#38bdf8]" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-[#e2e8e5] mb-1 tracking-tight">
                    STARTUP FUNDAMENTALS
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-[#8e9e96] leading-relaxed">
                    Mastering idea validation, market fit, and scalable business models.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4: Community Alliance */}
            <div className="sm:col-span-2 border border-[#2f4a3a] bg-[#101713] p-6 rounded-2xl rivet-corner shadow-xl transition-all group">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#1a2b22] border border-[#4ade80]/40 flex items-center justify-center text-[#c9a227] shrink-0 group-hover:scale-105 transition-transform">
                  <Users className="w-5 h-5 text-[#c9a227]" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-[#e2e8e5] mb-1 tracking-tight">
                    COMMUNITY ALLIANCE
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-[#8e9e96] leading-relaxed">
                    Fostering interdisciplinary collaboration across Google Developer Groups, Thoughtworks mentors, and student builders.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Judging Parameters (Scoring Matrix) */}
        <div className="border border-[#2f4a3a] bg-[#0c100e] p-6 sm:p-8 rounded-2xl rivet-corner">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-[#c9a227]" />
            <span className="text-[10px] font-mono text-[#c9a227] uppercase tracking-widest">
              SCORING MATRIX // EVALUATION STANDARDS
            </span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#e2e8e5] mb-2">
            Final Judging Parameters
          </h3>
          <p className="text-xs font-mono text-[#8e9e96] mb-6">
            The executive jury evaluates completed builds at Thoughtworks Technologies across 6 core criteria:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {EVENT_CONFIG.judgingCriteria.map((crit, idx) => (
              <div
                key={crit.id}
                className="p-4 bg-[#080b09] border border-[#1b2b22] hover:border-[#2f4a3a] rounded-xl transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-mono text-[#52635a] uppercase tracking-widest">
                    CRITERION 0{idx + 1} // {crit.category}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#2f4a3a] group-hover:bg-[#c9a227] transition-colors" />
                </div>
                <h4 className="font-display font-bold text-base text-[#e2e8e5] mb-1">
                  {crit.name}
                </h4>
                <p className="text-xs font-mono text-[#8e9e96]">
                  {crit.descriptor}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
