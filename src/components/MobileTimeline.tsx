import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { Sparkles, ChevronDown, Award, Trophy } from 'lucide-react';

interface FinaleScheduleItem {
  marker: string;
  title: string;
  time: string;
  detail: string;
  isEliminatory?: boolean;
}

const FINALE_SCHEDULE: FinaleScheduleItem[] = [
  {
    marker: '08:00 AM',
    title: 'Hall Open & Check-In',
    time: '08:00–09:00 AM',
    detail: 'Hall doors open (8 AM–5 PM); finalist check-in by 9:00 AM',
    isEliminatory: false,
  },
  {
    marker: '09:00 AM',
    title: 'Round 1 Mentoring [Eliminatory]',
    time: '09:00–10:00 AM',
    detail: 'First mentoring round (9–10 AM) is eliminatory; qualifying teams advance',
    isEliminatory: true,
  },
  {
    marker: '10:00 AM',
    title: 'Sprint & Refinement',
    time: '10:00 AM–12:00 PM',
    detail: 'Shortlisted squads iterate on prototype & code architecture',
    isEliminatory: false,
  },
  {
    marker: '12:00 PM',
    title: 'Round 2 Mentoring',
    time: '12:00–02:00 PM',
    detail: 'Second mentoring round for qualified squads & pitch prep',
    isEliminatory: false,
  },
  {
    marker: '02:00 PM',
    title: 'Final Judging Round',
    time: '02:00–04:30 PM',
    detail: 'Selected finalist teams pitch live demos to executive jury',
    isEliminatory: false,
  },
  {
    marker: '05:00 PM',
    title: 'Results & Award Ceremony',
    time: '05:00 PM',
    detail: 'Final winners declared & bounty conferral by 5:00 PM',
    isEliminatory: false,
  },
];

interface MobileTimelineProps {
  isSectionVisible?: boolean;
}

/**
 * Mobile-Only Timeline Layout (<= 767px):
 * - Normal document flow layout with <li> rows (zero absolute cards, zero card overflow clipping).
 * - Left 56px gutter holds planet node anchors and walker.
 * - Dynamic measured SVG S-curve generated between measured anchor positions using ResizeObserver.
 * - Cards start at 72px (width calc(100% - 72px), min 240px).
 * - Header with line 1 mono, line 2 title, line 3 venue, line 4 date/time, and 24px top-right diamond.
 * - Smooth CSS grid accordion (grid-template-rows 0fr -> 1fr) with local open state.
 * - Finale schedule stacked cleanly without truncation or duplicated time columns.
 */
export const MobileTimeline: React.FC<MobileTimelineProps> = ({ isSectionVisible = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const isReduced = useReducedMotion();

  // Local card expansion states (tap/enter only, collapsed by default)
  const [openCards, setOpenCards] = useState<{ [key: string]: boolean }>({
    'phase-1': false,
    'phase-2': false,
    'phase-3': false,
  });

  const toggleCard = (id: string) => {
    setOpenCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Measured anchor positions and container height
  const anchorRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [nodeY, setNodeY] = useState<number[]>([40, 220, 420]);
  const [containerHeight, setContainerHeight] = useState<number>(600);
  const [totalLength, setTotalLength] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Measure positions dynamically
  const updateMeasurements = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newY: number[] = [];

    anchorRefs.current.forEach((el) => {
      if (el) {
        const rect = el.getBoundingClientRect();
        const centerY = rect.top - containerRect.top + rect.height / 2;
        newY.push(centerY);
      }
    });

    if (newY.length === 3) {
      setNodeY(newY);
      setContainerHeight(containerRect.height);
    }
  }, []);

  // Set up ResizeObserver on container and all cards so expanding/collapsing recalculates path
  useEffect(() => {
    updateMeasurements();

    if (typeof ResizeObserver === 'undefined') return;

    const ro = new ResizeObserver(() => {
      updateMeasurements();
    });

    if (containerRef.current) ro.observe(containerRef.current);
    cardRefs.current.forEach((card) => {
      if (card) ro.observe(card);
    });

    window.addEventListener('resize', updateMeasurements);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateMeasurements);
    };
  }, [updateMeasurements]);

  // Cubic Bezier S-curve through measured points with gentle +/-14px amplitude in 56px gutter
  const pathD = useMemo(() => {
    const xMid = 28;
    const [y1, y2, y3] = nodeY;
    const startY = Math.max(0, y1 - 24);
    const endY = y3 + 30;

    const dy1 = y2 - y1;
    const dy2 = y3 - y2;

    return (
      `M ${xMid} ${startY} ` +
      `L ${xMid} ${y1} ` +
      `C ${xMid + 14} ${y1 + dy1 * 0.35}, ${xMid - 14} ${y1 + dy1 * 0.65}, ${xMid} ${y2} ` +
      `C ${xMid + 14} ${y2 + dy2 * 0.35}, ${xMid - 14} ${y2 + dy2 * 0.65}, ${xMid} ${y3} ` +
      `C ${xMid + 10} ${y3 + 15}, ${xMid} ${endY}, ${xMid} ${endY}`
    );
  }, [nodeY]);

  // Recalculate path length whenever pathD changes
  useEffect(() => {
    if (pathRef.current) {
      const len = pathRef.current.getTotalLength();
      setTotalLength(len);
    }
  }, [pathD]);

  // Scroll progress listener
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const vh = window.innerHeight;
        const startOffset = vh * 0.75;
        const totalDist = rect.height + vh * 0.3;
        const currentDist = startOffset - rect.top;
        const progress = Math.max(0, Math.min(1, currentDist / totalDist));
        setScrollProgress(progress);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  // Walker coordinates along path
  const currentProgress = isReduced ? 0.88 : scrollProgress;
  const drawnDistance = isReduced ? totalLength : currentProgress * totalLength;

  const walkerData = useMemo(() => {
    if (!pathRef.current || totalLength === 0) {
      return { x: 28, y: nodeY[0], angle: 90, trail: [] as { x: number; y: number; opacity: number }[] };
    }

    const currentDist = currentProgress * totalLength;
    const p = pathRef.current.getPointAtLength(currentDist);
    const pPrev = pathRef.current.getPointAtLength(Math.max(0, currentDist - 2));
    const pNext = pathRef.current.getPointAtLength(Math.min(totalLength, currentDist + 2));
    const angle = Math.atan2(pNext.y - pPrev.y, pNext.x - pPrev.x) * (180 / Math.PI);

    const trail: { x: number; y: number; opacity: number }[] = [];
    if (!isReduced) {
      for (let i = 1; i <= 5; i++) {
        const trailDist = Math.max(0, currentDist - i * 14);
        const trailPt = pathRef.current.getPointAtLength(trailDist);
        trail.push({ x: trailPt.x, y: trailPt.y, opacity: (6 - i) / 7 });
      }
    }

    return { x: p.x, y: p.y, angle, trail };
  }, [totalLength, currentProgress, isReduced, nodeY]);

  // Planet nodes activation thresholds
  const isNode1Lit = isReduced || currentProgress >= 0.08;
  const isNode2Lit = isReduced || currentProgress >= 0.44;
  const isNode3Lit = isReduced || currentProgress >= 0.78;

  const activeStepIndex = useMemo(() => {
    if (isReduced) return 2;
    if (currentProgress < 0.35) return 0;
    if (currentProgress < 0.72) return 1;
    return 2;
  }, [currentProgress, isReduced]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-full pb-20 select-none"
      aria-label="The Walk chronological mobile sequence"
    >
      {/* =========================================================================
          BACKGROUND MEASURED SVG S-CURVE IN THE LEFT 56PX GUTTER
          ========================================================================= */}
      <svg
        className="absolute top-0 left-0 w-[56px] pointer-events-none z-0 overflow-visible"
        style={{ height: containerHeight > 0 ? `${containerHeight}px` : '100%' }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="mobileOrbitalPathGrad" x1="28" y1="0" x2="28" y2="100%" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffc58a" />
            <stop offset="35%" stopColor="#ff9a3c" />
            <stop offset="65%" stopColor="#c084fc" />
            <stop offset="85%" stopColor="#e04dff" />
            <stop offset="100%" stopColor="#6ee7f9" />
          </linearGradient>

          <radialGradient id="mPhase1PlanetGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fff8f0" />
            <stop offset="30%" stopColor="#ffc58a" />
            <stop offset="70%" stopColor="#ff9a3c" />
            <stop offset="100%" stopColor="#c25700" />
          </radialGradient>

          <radialGradient id="mPhase2PlanetGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#f3e8ff" />
            <stop offset="35%" stopColor="#c084fc" />
            <stop offset="75%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#4c1d95" />
          </radialGradient>

          <radialGradient id="mFinalePlanetGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffe4ff" />
            <stop offset="30%" stopColor="#e04dff" />
            <stop offset="70%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#2e0854" />
          </radialGradient>

          <radialGradient id="mMoonGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffd8ff" />
            <stop offset="50%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#581c87" />
          </radialGradient>
        </defs>

        {/* Faint Dashed Path Ahead */}
        <path
          d={pathD}
          stroke="url(#mobileOrbitalPathGrad)"
          strokeWidth="3.5"
          strokeDasharray="5 5"
          strokeLinecap="round"
          opacity="0.3"
        />

        {/* Hidden measurement path */}
        <path ref={pathRef} d={pathD} fill="none" stroke="none" />

        {/* Glow Stroke along Drawn Distance */}
        {totalLength > 0 && (
          <path
            d={pathD}
            stroke="url(#mobileOrbitalPathGrad)"
            strokeWidth="10"
            strokeLinecap="round"
            opacity="0.2"
            strokeDasharray={`${drawnDistance} ${totalLength}`}
            style={{ transition: isReduced ? 'none' : 'stroke-dasharray 0.08s linear' }}
          />
        )}

        {/* Solid Drawn Progress Path */}
        {totalLength > 0 && (
          <path
            d={pathD}
            stroke="url(#mobileOrbitalPathGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray={`${drawnDistance} ${totalLength}`}
            style={{ transition: isReduced ? 'none' : 'stroke-dasharray 0.08s linear' }}
          />
        )}

        {/* Cyan Walker and Fading Trail */}
        {totalLength > 0 && (
          <g id="mobile-walker-system">
            {walkerData.trail.map((pt, tIdx) => (
              <circle
                key={tIdx}
                cx={pt.x}
                cy={pt.y}
                r={2 - tIdx * 0.25}
                fill="#6ee7f9"
                opacity={pt.opacity * 0.75}
              />
            ))}

            <g
              transform={`translate(${walkerData.x}, ${walkerData.y}) rotate(${walkerData.angle - 90})`}
              style={{
                willChange: 'transform',
                transition: isReduced ? 'none' : 'transform 0.05s linear',
              }}
            >
              <ellipse cx="0" cy="0" rx="9" ry="3.5" fill="#6ee7f9" opacity="0.65" />
              {/* Silhouette figure */}
              <circle cx="1" cy="-15" r="2" fill="#6ee7f9" />
              <path d="M -0.5 -13 C -0.5 -13.5, 2.5 -13.5, 2.5 -13 L 2 -7 L -0.5 -7 Z" fill="#6ee7f9" />
              <path d="M 1.5 -7 L 3.5 -3 L 5 0 L 3 0 L 2 -3 L 0.5 -7 Z" fill="#6ee7f9" />
              <path d="M -0.5 -7 L -2.5 -3.5 L -4 -1 L -5 -1.5 L -3 -4 L -1 -7 Z" fill="#6ee7f9" />
            </g>
          </g>
        )}
      </svg>

      {/* =========================================================================
          ORDERED LIST OF ROWS (Normal document flow, no position: absolute on cards)
          ========================================================================= */}
      <ol className="relative list-none m-0 p-0 space-y-10">
        {/* =======================================================================
            ROW 1: PHASE 1 (ONLINE IDEA & PPT SCREENING)
            ======================================================================= */}
        <li
          aria-current={activeStepIndex === 0 ? 'step' : undefined}
          className="flex items-start relative z-10"
        >
          {/* Left Gutter: 56px wide with Node Anchor */}
          <div className="w-[56px] shrink-0 flex justify-center pt-2 relative">
            <div
              ref={(el) => {
                anchorRefs.current[0] = el;
              }}
              className="w-12 h-12 flex items-center justify-center relative transition-transform duration-300"
              style={{
                transform: `scale(${isNode1Lit ? 1 : 0.88})`,
                opacity: isNode1Lit ? 1 : 0.45,
              }}
            >
              {/* Corona Glow */}
              <div className="absolute inset-0 rounded-full bg-[#ffc58a] opacity-25 blur-[6px]" />
              {/* Planet Sphere */}
              <div
                className="w-8 h-8 rounded-full border border-white/40 shadow-[0_0_12px_rgba(255,197,138,0.5)] relative"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #fff8f0 0%, #ffc58a 35%, #ff9a3c 70%, #c25700 100%)',
                }}
              >
                {/* Orbiting Moon if active */}
                {activeStepIndex === 0 && !isReduced && isSectionVisible && (
                  <div className="absolute -inset-2 rounded-full border border-white/20 animate-spin [animation-duration:6s]">
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#ffd8ff] shadow-[0_0_4px_#c084fc]" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Card Column: Starts at 72px from container left */}
          <div
            ref={(el) => {
              cardRefs.current[0] = el;
            }}
            className="ml-4 flex-1 min-w-[240px] max-w-[calc(100%-72px)]"
          >
            <div className="glass-pass-card rounded-[24px] p-5 relative overflow-hidden transition-all duration-300 border border-white/14 bg-gradient-to-br from-[#160a33] via-[#100727] to-[#0a041a] shadow-[0_12px_32px_rgba(0,0,0,0.4)]">
              {/* Diamond Top-Right Icon: exactly 24px, never overlapping text */}
              <div
                className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#120a2e] border border-[#ffc58a]/70 flex items-center justify-center shadow-[0_0_10px_rgba(255,197,138,0.4)] pointer-events-none z-10"
                aria-hidden="true"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#ffd09f] animate-pulse" />
              </div>

              {/* Bottom Glow Accent */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] opacity-75 pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, #ffc58a 40%, #ff9a3c 80%, transparent 100%)',
                }}
                aria-hidden="true"
              />

              {/* Card Header as Toggle Button */}
              <button
                type="button"
                onClick={() => toggleCard('phase-1')}
                aria-expanded={openCards['phase-1']}
                className="w-full text-left pr-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffc58a] rounded-xl"
              >
                {/* Line 1: Mono Label */}
                <span className="text-xs font-mono font-semibold tracking-[0.14em] uppercase text-[#ffd09f] block">
                  PHASE 01 // ONLINE
                </span>

                {/* Line 2: Title */}
                <div className="flex items-center justify-between gap-2 mt-1">
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-white uppercase tracking-wide leading-snug">
                    Idea & PPT Screening
                  </h3>
                  <ChevronDown
                    className={`w-4 h-4 text-[#ffd09f] shrink-0 transition-transform duration-200 ${
                      openCards['phase-1'] ? 'rotate-180' : ''
                    }`}
                  />
                </div>

                {/* Line 3: Venue / Subtitle */}
                <div className="text-sm font-sans text-[#c5bddf] mt-0.5 break-words">
                  Squad Assembly & Qualification
                </div>

                {/* Line 4: Date/Time on its own line in peach mono */}
                <span className="text-xs font-mono font-medium text-[#ffd09f] tracking-wider mt-1.5 block">
                  8–22 Nov 2026
                </span>
              </button>

              {/* Smooth Grid Accordion */}
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  openCards['phase-1'] ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden min-h-0 pt-3 border-t border-white/10 mt-3 space-y-2.5">
                  <p className="text-xs font-sans text-[#c5bddf] leading-relaxed">
                    Squad registration and mandatory project PPT submission. Top 40–50 squads advance to the 24-hour hackathon.
                  </p>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffc58a]/15 border border-[#ffc58a]/40 text-[#ffc58a]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffc58a]" />
                    <span className="font-display text-[10px] font-semibold uppercase tracking-wider">
                      PPT Submission Mandatory
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>

        {/* =======================================================================
            ROW 2: PHASE 2 (24-HOUR BUILD SPRINT)
            ======================================================================= */}
        <li
          aria-current={activeStepIndex === 1 ? 'step' : undefined}
          className="flex items-start relative z-10"
        >
          {/* Left Gutter: 56px wide with Node Anchor */}
          <div className="w-[56px] shrink-0 flex justify-center pt-2 relative">
            <div
              ref={(el) => {
                anchorRefs.current[1] = el;
              }}
              className="w-12 h-12 flex items-center justify-center relative transition-transform duration-300"
              style={{
                transform: `scale(${isNode2Lit ? 1 : 0.88})`,
                opacity: isNode2Lit ? 1 : 0.45,
              }}
            >
              {/* Corona Glow */}
              <div className="absolute inset-0 rounded-full bg-[#8b5cf6] opacity-30 blur-[6px]" />
              {/* Planet Sphere with Angled Ring */}
              <div
                className="w-9 h-9 rounded-full border border-white/40 shadow-[0_0_14px_rgba(192,132,252,0.5)] relative flex items-center justify-center"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #f3e8ff 0%, #c084fc 35%, #8b5cf6 75%, #4c1d95 100%)',
                }}
              >
                {/* Orbital Ring */}
                <div className="absolute w-12 h-4 rounded-full border border-[#c084fc] -rotate-12 opacity-75 pointer-events-none" />

                {/* Orbiting Moon if active */}
                {activeStepIndex === 1 && !isReduced && isSectionVisible && (
                  <div className="absolute -inset-2.5 rounded-full border border-white/20 animate-spin [animation-duration:6s]">
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#c084fc] shadow-[0_0_4px_#c084fc]" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Card Column: Starts at 72px from container left */}
          <div
            ref={(el) => {
              cardRefs.current[1] = el;
            }}
            className="ml-4 flex-1 min-w-[240px] max-w-[calc(100%-72px)]"
          >
            <div className="glass-pass-card rounded-[24px] p-5 relative overflow-hidden transition-all duration-300 border border-white/14 bg-gradient-to-br from-[#160a33] via-[#100727] to-[#0a041a] shadow-[0_12px_32px_rgba(0,0,0,0.4)]">
              {/* Diamond Top-Right Icon: exactly 24px, never overlapping text */}
              <div
                className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#120a2e] border border-[#c084fc]/70 flex items-center justify-center shadow-[0_0_10px_rgba(192,132,252,0.4)] pointer-events-none z-10"
                aria-hidden="true"
              >
                <Award className="w-3.5 h-3.5 text-[#c084fc] animate-pulse" />
              </div>

              {/* Bottom Glow Accent */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] opacity-75 pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, #c084fc 40%, #8b5cf6 80%, transparent 100%)',
                }}
                aria-hidden="true"
              />

              {/* Card Header as Toggle Button */}
              <button
                type="button"
                onClick={() => toggleCard('phase-2')}
                aria-expanded={openCards['phase-2']}
                className="w-full text-left pr-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c084fc] rounded-xl"
              >
                {/* Line 1: Mono Label */}
                <span className="text-xs font-mono font-semibold tracking-[0.14em] uppercase text-[#c084fc] block">
                  PHASE 02 // 24H SPRINT
                </span>

                {/* Line 2: Title */}
                <div className="flex items-center justify-between gap-2 mt-1">
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-white uppercase tracking-wide leading-snug">
                    24-Hour Build
                  </h3>
                  <ChevronDown
                    className={`w-4 h-4 text-[#c084fc] shrink-0 transition-transform duration-200 ${
                      openCards['phase-2'] ? 'rotate-180' : ''
                    }`}
                  />
                </div>

                {/* Line 3: Venue / Subtitle */}
                <div className="text-sm font-sans text-[#c5bddf] mt-0.5 break-words">
                  Virtual Sprint & Architectural Mentorship
                </div>

                {/* Line 4: Date/Time on its own line in peach mono */}
                <span className="text-xs font-mono font-medium text-[#ffd09f] tracking-wider mt-1.5 block">
                  27 Nov 2026
                </span>
              </button>

              {/* Smooth Grid Accordion */}
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  openCards['phase-2'] ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden min-h-0 pt-3 border-t border-white/10 mt-3 space-y-2.5">
                  <p className="text-xs font-sans text-[#c5bddf] leading-relaxed">
                    Non-eliminatory online build sprint. Squads receive architectural mentorship after 4:00 PM to refine project prototypes.
                  </p>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8b5cf6]/15 border border-[#8b5cf6]/40 text-[#c084fc]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]" />
                    <span className="font-display text-[10px] font-semibold uppercase tracking-wider">
                      Zero Eliminations Round
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>

        {/* =======================================================================
            ROW 3: PHASE 3 (THE GRAND FINALE AT THOUGHTWORKS)
            ======================================================================= */}
        <li
          aria-current={activeStepIndex === 2 ? 'step' : undefined}
          className="flex items-start relative z-10"
        >
          {/* Left Gutter: 56px wide with Node Anchor */}
          <div className="w-[56px] shrink-0 flex justify-center pt-2 relative">
            <div
              ref={(el) => {
                anchorRefs.current[2] = el;
              }}
              className="w-12 h-12 flex items-center justify-center relative transition-transform duration-300"
              style={{
                transform: `scale(${isNode3Lit ? 1 : 0.88})`,
                opacity: isNode3Lit ? 1 : 0.45,
              }}
            >
              {/* Sunrise Glow Corona */}
              <div className="absolute inset-0 rounded-full bg-[#e04dff] opacity-35 blur-[8px]" />
              {/* Grand Planet Sphere with Rings */}
              <div
                className="w-10 h-10 rounded-full border border-white/40 shadow-[0_0_18px_rgba(224,77,255,0.6)] relative flex items-center justify-center"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #ffe4ff 0%, #e04dff 35%, #8b5cf6 70%, #2e0854 100%)',
                }}
              >
                {/* Dual Crossing Rings */}
                <div className="absolute w-14 h-4 rounded-full border border-[#ffd8ff] -rotate-20 opacity-80 pointer-events-none" />
                <div className="absolute w-12 h-3.5 rounded-full border border-[#ffc58a] rotate-25 opacity-70 pointer-events-none" />

                {/* Orbiting Moon if active */}
                {activeStepIndex === 2 && !isReduced && isSectionVisible && (
                  <div className="absolute -inset-3 rounded-full border border-white/20 animate-spin [animation-duration:7s]">
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#6ee7f9] shadow-[0_0_5px_#6ee7f9]" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Card Column: Starts at 72px from container left */}
          <div
            ref={(el) => {
              cardRefs.current[2] = el;
            }}
            className="ml-4 flex-1 min-w-[240px] max-w-[calc(100%-72px)]"
          >
            <div className="glass-pass-card rounded-[24px] p-5 relative overflow-hidden transition-all duration-300 border-2 border-[#6ee7f9]/40 bg-gradient-to-br from-[#180a38] via-[#10072a] to-[#0a041c] shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
              {/* Diamond Top-Right Icon: exactly 24px, never overlapping text */}
              <div
                className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#120a2e] border border-[#6ee7f9]/80 flex items-center justify-center shadow-[0_0_12px_rgba(110,231,249,0.5)] pointer-events-none z-10"
                aria-hidden="true"
              >
                <Trophy className="w-3.5 h-3.5 text-[#6ee7f9] animate-pulse" />
              </div>

              {/* Bottom Glow Accent */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] opacity-90 pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, #6ee7f9 35%, #e04dff 70%, #ffc58a 100%)',
                }}
                aria-hidden="true"
              />

              {/* Card Header as Toggle Button */}
              <button
                type="button"
                onClick={() => toggleCard('phase-3')}
                aria-expanded={openCards['phase-3']}
                className="w-full text-left pr-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6ee7f9] rounded-xl"
              >
                {/* Line 1: Mono Label */}
                <span className="text-xs font-mono font-semibold tracking-[0.14em] uppercase text-[#6ee7f9] block">
                  PHASE 03 // OFFLINE
                </span>

                {/* Line 2: Title */}
                <div className="flex items-center justify-between gap-2 mt-1">
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-white uppercase tracking-wide leading-snug">
                    The Grand Finale
                  </h3>
                  <ChevronDown
                    className={`w-4 h-4 text-[#6ee7f9] shrink-0 transition-transform duration-200 ${
                      openCards['phase-3'] ? 'rotate-180' : ''
                    }`}
                  />
                </div>

                {/* Line 3: Venue */}
                <div className="text-sm font-sans text-[#c5bddf] mt-0.5 break-words">
                  Thoughtworks Technologies, Gurugram
                </div>

                {/* Line 4: Date/Time on its own line in peach mono */}
                <span className="text-xs font-mono font-medium text-[#ffd09f] tracking-wider mt-1.5 block">
                  28 Nov 2026 · 8:00 AM–5:00 PM
                </span>
              </button>

              {/* Smooth Grid Accordion */}
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  openCards['phase-3'] ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden min-h-0 pt-4 border-t border-white/10 mt-3 space-y-3">
                  {/* Itinerary Header */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-display font-semibold uppercase tracking-[0.14em] text-[#ffd09f]">
                      OFFLINE FINALE ITINERARY
                    </span>
                    <span className="text-[11px] font-sans font-medium text-[#8beaff]">
                      08:00 AM – 05:00 PM
                    </span>
                  </div>

                  {/* Stacked Schedule List */}
                  <div className="space-y-2.5">
                    {FINALE_SCHEDULE.map((item, sIdx) => (
                      <div
                        key={sIdx}
                        className="group p-3 rounded-xl border transition-all duration-200 cursor-pointer bg-[#05030f]/60 border-white/8 hover:-translate-y-0.5 hover:bg-[#6ee7f9]/10 hover:border-[#6ee7f9]/40 hover:shadow-[0_0_14px_rgba(110,231,249,0.15)] active:scale-[0.99]"
                      >
                        {/* Top Line: Dot + Time Label */}
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="w-2 h-2 rounded-full shrink-0 bg-[#6ee7f9] shadow-[0_0_8px_#6ee7f9] group-hover:bg-[#ffc58a] group-hover:shadow-[0_0_10px_#ffc58a] transition-all duration-200" />
                          <span className="text-xs font-mono font-medium text-[#ffd09f] tracking-wide group-hover:text-white transition-colors">
                            {item.time}
                          </span>
                        </div>

                        {/* Title Stacked */}
                        <div className="text-sm font-display font-semibold text-white group-hover:text-[#8beaff] transition-colors uppercase tracking-wide leading-snug pl-4">
                          {item.title}
                        </div>

                        {/* Detail Stacked */}
                        <p className="text-xs font-sans text-[#c5bddf] leading-relaxed mt-1 pl-4 break-words">
                          {item.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ol>
    </div>
  );
};
