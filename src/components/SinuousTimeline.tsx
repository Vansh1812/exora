import React, { useRef, useState, useEffect } from 'react';
import { EVENT_CONFIG } from '../eventConfig';
import { useReveal } from '../hooks/useReveal';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useTypewriter } from '../hooks/useTypewriter';
import { Clock, CheckCircle2 } from 'lucide-react';

export const SinuousTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useScrollProgress(containerRef);
  const isReduced = useReducedMotion();
  const { ref: revealRef, revealClass, isRevealed } = useReveal<HTMLDivElement>();
  const [hasGlitched, setHasGlitched] = useState(false);

  useEffect(() => {
    if (isRevealed) {
      setHasGlitched(true);
    }
  }, [isRevealed]);

  // Calculate current active node based on scroll progress (0 to 1 across the timeline)
  const totalItems = EVENT_CONFIG.timeline.length;
  const activeIndex = Math.min(
    totalItems - 1,
    Math.max(0, Math.floor(scrollProgress * totalItems))
  );

  return (
    <section
      id="timeline"
      ref={containerRef}
      className="py-24 px-4 sm:px-6 lg:px-8 border-b border-[#1f2e26] relative overflow-hidden"
    >
      <div ref={revealRef} className={`max-w-5xl mx-auto ${revealClass}`}>
        {/* Section Header with RGB-split glitch */}
        <div className="mb-14 text-center md:text-left">
          <div
            className={`flex items-center justify-center md:justify-start gap-2 text-xs font-mono tracking-widest text-[#c9a227] uppercase mb-2 ${
              hasGlitched ? 'animate-glitch' : ''
            }`}
          >
            <span className="text-[#52635a]">//</span>
            <span>THE PATH</span>
            <span className="text-[#33473c]">·</span>
            <span className="text-[#52635a]">CHRONOLOGICAL ENGAGEMENT & PROTOCOLS</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-[#e2e8e5] tracking-tight uppercase">
            EVENT TIMELINE
          </h2>

          <div className="text-xs sm:text-sm font-mono tracking-wider text-[#52635a] uppercase mt-2">
            THREE PHASES // 28 NOV 2026 // THOUGHTWORKS TECHNOLOGIES, GURUGRAM
          </div>
        </div>

        {/* Timeline Structure with Scroll-Drawn SVG Line */}
        <div className="relative">
          {/* Vertical Drawing SVG Line on Desktop (stroke-dashoffset tied to scroll progress) */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none" aria-hidden="true">
            <svg
              className="w-full h-full timeline-curve-glow"
              viewBox="0 0 1000 1200"
              fill="none"
              preserveAspectRatio="none"
            >
              {/* Background Path Guideline */}
              <path
                d="M 320 80
                   C 500 80, 500 240, 680 240
                   C 500 240, 500 420, 320 420
                   C 500 420, 500 600, 680 600
                   C 500 600, 500 780, 320 780
                   C 500 780, 500 960, 680 960"
                stroke="#1f2e26"
                strokeWidth="2.5"
                strokeDasharray="6 4"
              />
              {/* Dynamic Drawn Path */}
              <path
                d="M 320 80
                   C 500 80, 500 240, 680 240
                   C 500 240, 500 420, 320 420
                   C 500 420, 500 600, 680 600
                   C 500 600, 500 780, 320 780
                   C 500 780, 500 960, 680 960"
                stroke="#c9a227"
                strokeWidth="3"
                pathLength="100"
                strokeDasharray="100"
                strokeDashoffset={isReduced ? 0 : Math.max(0, 100 - scrollProgress * 120)}
                style={{
                  transition: 'stroke-dashoffset 0.1s linear',
                }}
              />
            </svg>
          </div>

          {/* Vertical Track on Mobile */}
          <div
            className="lg:hidden absolute left-4 top-4 bottom-4 w-[2px] bg-[#1f2e26]"
            aria-hidden="true"
          >
            <div
              className="w-full bg-[#c9a227] transition-all duration-100"
              style={{
                height: isReduced ? '100%' : `${Math.min(100, scrollProgress * 120)}%`,
              }}
            />
          </div>

          {/* Timeline Cards */}
          <div className="space-y-8 sm:space-y-12">
            {EVENT_CONFIG.timeline.map((item, idx) => {
              const isLeft = item.side === 'left';
              const isCurrent = idx === activeIndex;
              const isPast = idx < activeIndex;

              return (
                <TimelineNodeCard
                  key={item.id}
                  item={item}
                  isLeft={isLeft}
                  isCurrent={isCurrent}
                  isPast={isPast}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

interface TimelineNodeCardProps {
  item: typeof EVENT_CONFIG.timeline[0];
  isLeft: boolean;
  isCurrent: boolean;
  isPast: boolean;
}

const TimelineNodeCard: React.FC<TimelineNodeCardProps> = ({
  item,
  isLeft,
  isCurrent,
  isPast,
}) => {
  // Typewriter effect for "T-00:00 // Briefing" header when node lights up
  const typeTarget = `${item.marker || 'T-00:00'} // ${item.phase || 'MISSION'}`;
  const typedHeader = useTypewriter({
    text: typeTarget,
    speed: 25,
    active: isCurrent || isPast,
  });

  return (
    <div
      className={`relative flex flex-col ${
        isLeft ? 'lg:items-start' : 'lg:items-end'
      } pl-10 lg:pl-0 transition-opacity duration-300 ${
        isPast ? 'opacity-65 hover:opacity-100' : isCurrent ? 'opacity-100' : 'opacity-40'
      }`}
    >
      {/* Mobile Rivet Node */}
      <div
        className={`lg:hidden absolute left-[9px] top-6 w-3.5 h-3.5 rounded-full bg-[#0b0d0c] border-2 flex items-center justify-center transition-colors ${
          isCurrent ? 'border-[#c9a227] shadow-[0_0_8px_#c9a227]' : 'border-[#2f4a3a]'
        }`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            isCurrent ? 'bg-[#c9a227]' : isPast ? 'bg-[#4ade80]' : 'bg-[#1f2e26]'
          }`}
        />
      </div>

      {/* Card Body */}
      <div
        className={`w-full lg:w-[46%] border p-6 rounded-2xl shadow-xl transition-all duration-200 group relative ${
          isCurrent
            ? 'border-[#c9a227] bg-[#101713] shadow-[0_0_25px_rgba(201,162,39,0.18)] scale-[1.01]'
            : 'border-[#2f4a3a]/70 hover:border-[#c9a227] bg-[#0c110e]/95'
        }`}
      >
        {/* Typed Header Bar */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Clock
              className={`w-3.5 h-3.5 ${isCurrent ? 'text-[#c9a227]' : 'text-[#4ade80]'}`}
            />
            <span className="text-xs sm:text-sm font-mono font-bold text-[#c9a227] tracking-wider">
              {item.time}
            </span>
          </div>

          <span className="font-mono text-[10px] text-[#4ade80] tracking-widest uppercase">
            {typedHeader}
          </span>
        </div>

        {/* Title & Optional Status Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <h3 className="font-display font-bold text-lg sm:text-xl text-[#e2e8e5] tracking-tight">
            {item.title}
          </h3>
          {item.highlightBadge && (
            <span
              className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                item.highlightBadge.includes('ELIMINATORY') || item.highlightBadge.includes('DEADLINE')
                  ? 'border-[#f87171]/60 text-[#f87171] bg-[#2a1313]'
                  : 'border-[#c9a227]/60 text-[#c9a227] bg-[#1a231b]'
              }`}
            >
              {item.highlightBadge}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm font-mono text-[#8e9e96] leading-relaxed mb-3">
          {item.description}
        </p>

        {/* Deliverable badge */}
        {item.deliverable && (
          <div className="pt-2 border-t border-[#1b2b22] flex items-center gap-2 text-[11px] font-mono text-[#52635a]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#2f4a3a]" />
            <span>OPERATIONAL SPEC: {item.deliverable}</span>
          </div>
        )}
      </div>
    </div>
  );
};
