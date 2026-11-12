import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { useReveal } from '../hooks/useReveal';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { MobileTimeline } from './MobileTimeline';
import { Sparkles, ChevronDown } from 'lucide-react';

interface TrailPoint {
  x: number;
  y: number;
  opacity: number;
}

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

/**
 * Signature Single-Canvas Curved Orbital Timeline ("The Walk")
 * - Exactly 900 x 1400 fixed aspect ratio canvas that scales proportionally on phone and laptop
 * - Single continuous S-curve path with cubic Beziers
 * - Percentage-positioned glass pass cards attached to planet nodes
 * - Cyan walker moves along path via path.getPointAtLength with fading trail
 * - Content is semantic <ol> / <li> list with aria-current="step"
 * - Full static fallback under prefers-reduced-motion
 */
export const SinuousTimeline: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const isReduced = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const { ref: revealRef, revealClass } = useReveal<HTMLDivElement>();

  const [totalLength, setTotalLength] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [ticksPath, setTicksPath] = useState<string>('');
  const [isSectionVisible, setIsSectionVisible] = useState<boolean>(true);

  // Expanded card state: Phase 1 & 2 toggleable; Finale opens automatically upon arrival or click
  const [expandedCards, setExpandedCards] = useState<{ [key: string]: boolean }>({
    'phase-1': false,
    'phase-2': false,
    'phase-3': false,
  });

  // Smooth S-Curve SVG Path Coordinates (viewBox 0 0 900 1400)
  // Perfectly passes through Node 1 (180, 240), Node 2 (720, 680), and Finale Node 3 (180, 1140)
  const pathD = useMemo(
    () =>
      'M 180 120 ' +
      'C 180 200, 180 240, 180 240 ' +
      'C 180 440, 720 480, 720 680 ' +
      'C 720 880, 180 940, 180 1140 ' +
      'C 180 1240, 320 1320, 450 1340',
    []
  );

  // Measure path length and build ticks with callback ref & effect
  const measurePath = useCallback((pathEl: SVGPathElement | null) => {
    if (!pathEl) return;
    pathRef.current = pathEl;
    try {
      const len = pathEl.getTotalLength();
      if (len > 0) {
        setTotalLength(len);

        // Build orbital tick marks along the path once as a single path string
        let ticks = '';
        const step = 26;
        for (let d = 30; d < len - 30; d += step) {
          const p = pathEl.getPointAtLength(d);
          const pPrev = pathEl.getPointAtLength(Math.max(0, d - 2));
          const pNext = pathEl.getPointAtLength(Math.min(len, d + 2));
          const dx = pNext.x - pPrev.x;
          const dy = pNext.y - pPrev.y;
          const dist = Math.hypot(dx, dy) || 1;
          const nx = -dy / dist;
          const ny = dx / dist;
          const tickHalf = 4.5;
          ticks += `M ${p.x - nx * tickHalf} ${p.y - ny * tickHalf} L ${p.x + nx * tickHalf} ${p.y + ny * tickHalf} `;
        }
        setTicksPath(ticks);
      }
    } catch {
      // SVG not yet attached
    }
  }, []);

  // Ensure path is measured whenever desktop layout is active or breakpoint changes
  useEffect(() => {
    if (!isMobile && pathRef.current) {
      measurePath(pathRef.current);
    }
  }, [pathD, isMobile, measurePath]);

  // Pause animations when section is off-screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // rAF-throttled scroll progress listener computed from the canvas's bounding rect
  useEffect(() => {
    if (typeof window === 'undefined' || isMobile) return;

    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (!canvasRef.current) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const vh = window.innerHeight;
        // Progress starts when canvas top enters the viewport and finishes near bottom
        const startOffset = vh * 0.8;
        const totalDist = rect.height + vh * 0.4;
        const currentDist = startOffset - rect.top;
        const progress = Math.max(0, Math.min(1, currentDist / totalDist));
        setScrollProgress(progress);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  // Walker position and rotation along the path
  const walkerData = useMemo(() => {
    if (!pathRef.current || totalLength === 0) {
      return {
        x: 180,
        y: 120,
        angle: 90,
        trail: [] as TrailPoint[],
        progress: 0,
      };
    }

    const currentProgress = isReduced ? 0.88 : scrollProgress;
    const currentDist = currentProgress * totalLength;
    const p = pathRef.current.getPointAtLength(currentDist);
    const pPrev = pathRef.current.getPointAtLength(Math.max(0, currentDist - 2));
    const pNext = pathRef.current.getPointAtLength(Math.min(totalLength, currentDist + 2));
    const angle = Math.atan2(pNext.y - pPrev.y, pNext.x - pPrev.x) * (180 / Math.PI);

    // Short fading trail of 5 to 6 tiny cyan dots
    const trail: TrailPoint[] = [];
    if (!isReduced) {
      for (let i = 1; i <= 6; i++) {
        const trailDist = Math.max(0, currentDist - i * 16);
        const trailPt = pathRef.current.getPointAtLength(trailDist);
        trail.push({ x: trailPt.x, y: trailPt.y, opacity: (7 - i) / 8 });
      }
    }

    return {
      x: p.x,
      y: p.y,
      angle,
      trail,
      progress: currentProgress,
    };
  }, [totalLength, scrollProgress, isReduced]);

  // Planet nodes activation thresholds (when walker reaches them)
  const isNode1Lit = isReduced || walkerData.progress >= 0.08;
  const isNode2Lit = isReduced || walkerData.progress >= 0.44;
  const isNode3Lit = isReduced || walkerData.progress >= 0.78;

  // Active step determining which planet has the orbiting moon
  const activeStepIndex = useMemo(() => {
    if (isReduced) return 2;
    if (walkerData.progress < 0.35) return 0;
    if (walkerData.progress < 0.72) return 1;
    return 2;
  }, [walkerData.progress, isReduced]);

  // Automatically expand the Finale card when the walker arrives
  useEffect(() => {
    if (isNode3Lit) {
      setExpandedCards((prev) => (prev['phase-3'] ? prev : { ...prev, 'phase-3': true }));
    }
  }, [isNode3Lit]);

  const toggleCard = useCallback((id: string) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  // Stroke-dash calculations for progressive path illumination
  const drawnDistance = isReduced ? totalLength : walkerData.progress * totalLength;

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative overflow-hidden"
    >
      <div ref={revealRef} className={`max-w-5xl mx-auto ${revealClass}`}>
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 text-center md:text-left">
          <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-[#180d35]/90 border border-[#b18aff]/50 text-xs sm:text-sm font-display font-semibold tracking-[0.16em] text-[#ffd09f] uppercase shadow-[0_0_18px_rgba(177,138,255,0.12)]">
            <Sparkles className="w-4 h-4 text-[#ffd09f]" />
            <span>THE WALK // CHRONOLOGICAL SEQUENCE</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl font-semibold text-white tracking-[0.08em] uppercase drop-shadow-[0_0_18px_rgba(224,77,255,0.2)]">
            THE WALK
          </h2>

          <p className="text-sm sm:text-base font-sans text-[#c5bddf] max-w-2xl mt-3 leading-[1.8]">
            Three Phases. One unbroken journey from qualification to the offline grand finale at Thoughtworks Technologies, Gurugram.
          </p>
        </div>

        {/* =========================================================================
            RESPONSIVE BRANCH: Mobile Flow Layout (<= 767px) vs Desktop Canvas (>= 768px)
            ========================================================================= */}
        {isMobile ? (
          <MobileTimeline isSectionVisible={isSectionVisible} />
        ) : (
          <div
            ref={canvasRef}
            style={{
              containerType: 'inline-size',
              aspectRatio: '900 / 1400',
              width: '100%',
              maxWidth: '900px',
            }}
            className="relative mx-auto select-none"
          >
          {/* =====================================================================
              1. THE SVG LAYER (viewBox 0 0 900 1400)
              Draws path, ticks, planets, connector lines, and walker
              ===================================================================== */}
          <svg
            viewBox="0 0 900 1400"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
            aria-hidden="true"
          >
            <defs>
              {/* Path Gradient: Peach to Pink to Magenta to Violet */}
              <linearGradient id="orbitalPathGrad" x1="180" y1="120" x2="450" y2="1340" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffc58a" />
                <stop offset="30%" stopColor="#ff9a3c" />
                <stop offset="60%" stopColor="#ff6f91" />
                <stop offset="85%" stopColor="#e04dff" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>

              {/* Planet Radial Gradients */}
              <radialGradient id="phase1PlanetGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#fff8f0" />
                <stop offset="30%" stopColor="#ffc58a" />
                <stop offset="70%" stopColor="#ff9a3c" />
                <stop offset="100%" stopColor="#c25700" />
              </radialGradient>

              <radialGradient id="phase2PlanetGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#f3e8ff" />
                <stop offset="35%" stopColor="#c084fc" />
                <stop offset="75%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#4c1d95" />
              </radialGradient>
                  
              <radialGradient id="finalePlanetGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#ffe4ff" />
                <stop offset="30%" stopColor="#e04dff" />
                <stop offset="70%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#2e0854" />
              </radialGradient>

              <radialGradient id="moonGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#ffd8ff" />
                <stop offset="50%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#581c87" />
              </radialGradient>
            </defs>

            {/* Dotted Connector Lines from Nodes to Cards */}
            <line x1="180" y1="240" x2="306" y2="240" stroke="#ffc58a" strokeWidth="1.5" strokeDasharray="3 3" opacity={isNode1Lit ? 0.7 : 0.25} />
            <line x1="510" y1="680" x2="720" y2="680" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="3 3" opacity={isNode2Lit ? 0.7 : 0.25} />
            <line x1="180" y1="1140" x2="306" y2="1140" stroke="#e04dff" strokeWidth="1.5" strokeDasharray="3 3" opacity={isNode3Lit ? 0.7 : 0.25} />

            {/* Path Layer 1: Faint Dashed Path (Remaining Journey) */}
            <path
              d={pathD}
              stroke="url(#orbitalPathGrad)"
              strokeWidth="4"
              strokeDasharray="6 6"
              strokeLinecap="round"
              opacity="0.32"
            />

            {/* Orbit-Ruler Ticks along the path */}
            {ticksPath && (
              <path
                d={ticksPath}
                stroke="#ffc58a"
                strokeWidth="1.2"
                opacity="0.35"
              />
            )}

            {/* Hidden measurement path with callback ref */}
            <path ref={measurePath} d={pathD} fill="none" stroke="none" />

            {/* Path Layer 2A: Duplicated Wider Luminous Glow Stroke */}
            {totalLength > 0 && (
              <path
                d={pathD}
                stroke="url(#orbitalPathGrad)"
                strokeWidth="20"
                strokeLinecap="round"
                opacity="0.32"
                strokeDasharray={`${drawnDistance} ${totalLength}`}
                style={{
                  transition: isReduced ? 'none' : 'stroke-dasharray 0.08s linear',
                  filter: 'drop-shadow(0 0 10px rgba(224, 77, 255, 0.5)) drop-shadow(0 0 20px rgba(255, 154, 60, 0.4))',
                }}
              />
            )}

            {/* Path Layer 2B: Mid-glow beam */}
            {totalLength > 0 && (
              <path
                d={pathD}
                stroke="url(#orbitalPathGrad)"
                strokeWidth="8"
                strokeLinecap="round"
                opacity="0.55"
                strokeDasharray={`${drawnDistance} ${totalLength}`}
                style={{
                  transition: isReduced ? 'none' : 'stroke-dasharray 0.08s linear',
                }}
              />
            )}

            {/* Path Layer 2C: Solid Drawn Progress Path up to Walker */}
            {totalLength > 0 && (
              <path
                d={pathD}
                stroke="url(#orbitalPathGrad)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${drawnDistance} ${totalLength}`}
                style={{
                  transition: isReduced ? 'none' : 'stroke-dasharray 0.08s linear',
                }}
              />
            )}

            {/* ===================================================================
                NODE 1: PHASE 1 PLANET (Left, 180, 240)
                =================================================================== */}
            <g
              id="node-phase-1"
              className="transition-transform duration-500 ease-out"
              style={{
                transform: `scale(${isNode1Lit ? 1 : 0.9})`,
                transformOrigin: '180px 240px',
                opacity: isNode1Lit ? 1 : 0.45,
              }}
            >
              {/* Luminous corona halo */}
              <circle cx="180" cy="240" r="32" fill="#ffc58a" opacity={isNode1Lit ? 0.25 : 0.08} />
              {/* Planet sphere */}
              <circle cx="180" cy="240" r="22" fill="url(#phase1PlanetGrad)" />
              {/* Specular highlight rim */}
              <circle cx="178" cy="238" r="20" stroke="#ffffff" strokeWidth="0.8" opacity="0.5" />

              {/* Active orbiting moon */}
              {activeStepIndex === 0 && !isReduced && isSectionVisible && (
                <g style={{ transformOrigin: '180px 240px' }} className="orbit-moon-1">
                  <circle cx="180" cy="208" r="3.5" fill="url(#moonGrad)" />
                </g>
              )}
            </g>

            {/* ===================================================================
                NODE 2: PHASE 2 PLANET WITH MOON (Right, 720, 680)
                =================================================================== */}
            <g
              id="node-phase-2"
              className="transition-transform duration-500 ease-out"
              style={{
                transform: `scale(${isNode2Lit ? 1 : 0.9})`,
                transformOrigin: '720px 680px',
                opacity: isNode2Lit ? 1 : 0.45,
              }}
            >
              {/* Luminous corona halo */}
              <circle cx="720" cy="680" r="38" fill="#8b5cf6" opacity={isNode2Lit ? 0.28 : 0.08} />
              {/* Orbital ring */}
              <ellipse
                cx="720"
                cy="680"
                rx="36"
                ry="12"
                stroke="#c084fc"
                strokeWidth="1.2"
                transform="rotate(-20 720 680)"
                opacity={isNode2Lit ? 0.75 : 0.25}
              />
              {/* Planet sphere */}
              <circle cx="720" cy="680" r="26" fill="url(#phase2PlanetGrad)" />
              {/* Specular rim */}
              <circle cx="718" cy="678" r="24" stroke="#ffffff" strokeWidth="0.8" opacity="0.45" />

              {/* Active orbiting moon */}
              {activeStepIndex === 1 && !isReduced && isSectionVisible && (
                <g style={{ transformOrigin: '720px 680px' }} className="orbit-moon-1">
                  <circle cx="720" cy="642" r="4.5" fill="url(#moonGrad)" />
                </g>
              )}
            </g>

            {/* ===================================================================
                NODE 3: FINALE PLANET (Largest, Left, 180, 1140)
                Magenta-violet with 2 orbit rings & sunrise glow
                =================================================================== */}
            <g
              id="node-phase-3"
              className="transition-transform duration-500 ease-out"
              style={{
                transform: `scale(${isNode3Lit ? 1 : 0.9})`,
                transformOrigin: '180px 1140px',
                opacity: isNode3Lit ? 1 : 0.45,
              }}
            >
              {/* Sunrise Glow Corona */}
              <circle cx="180" cy="1140" r="54" fill="#e04dff" opacity={isNode3Lit ? 0.32 : 0.08} />
              <circle cx="180" cy="1140" r="42" fill="#ffc58a" opacity={isNode3Lit ? 0.24 : 0.06} />

              {/* Orbit Ring 1 */}
              <ellipse
                cx="180"
                cy="1140"
                rx="52"
                ry="16"
                stroke="#ffd8ff"
                strokeWidth="1.5"
                transform="rotate(-25 180 1140)"
                opacity={isNode3Lit ? 0.8 : 0.25}
              />
              {/* Orbit Ring 2 (Crossing) */}
              <ellipse
                cx="180"
                cy="1140"
                rx="46"
                ry="14"
                stroke="#ffc58a"
                strokeWidth="1.2"
                transform="rotate(30 180 1140)"
                opacity={isNode3Lit ? 0.7 : 0.2}
              />

              {/* Main Planet Sphere */}
              <circle cx="180" cy="1140" r="36" fill="url(#finalePlanetGrad)" />
              {/* Rim highlight */}
              <circle cx="178" cy="1137" r="34" stroke="#ffffff" strokeWidth="1" opacity="0.5" />

              {/* Moon 1 */}
              <circle cx="138" cy="1165" r="5" fill="url(#moonGrad)" opacity={isNode3Lit ? 0.9 : 0.3} />
              {/* Moon 2 */}
              <circle cx="225" cy="1115" r="3.5" fill="url(#moonGrad)" opacity={isNode3Lit ? 0.8 : 0.3} />

              {/* Active orbiting moon */}
              {activeStepIndex === 2 && !isReduced && isSectionVisible && (
                <g style={{ transformOrigin: '180px 1140px' }} className="orbit-moon-2">
                  <circle cx="180" cy="1086" r="4" fill="#6ee7f9" />
                </g>
              )}
            </g>

            {/* ===================================================================
                THE CYAN WALKER (Moving with Transform Only)
                =================================================================== */}
            {totalLength > 0 && (
              <g id="orbital-walker-system">
                {/* Short Fading Trail of 5 to 6 Luminous Cyan Dots */}
                {walkerData.trail.map((pt, tIdx) => (
                  <circle
                    key={tIdx}
                    cx={pt.x}
                    cy={pt.y}
                    r={3 - tIdx * 0.35}
                    fill="#6ee7f9"
                    opacity={pt.opacity * 0.85}
                    style={{
                      filter: 'drop-shadow(0 0 6px rgba(110, 231, 249, 0.8))',
                    }}
                  />
                ))}

                {/* The Walker Figure positioned at path.getPointAtLength, rotated slightly along tangent */}
                <g
                  transform={`translate(${walkerData.x}, ${walkerData.y}) rotate(${walkerData.angle - 90})`}
                  style={{
                    willChange: 'transform',
                    transition: isReduced ? 'none' : 'transform 0.05s linear',
                  }}
                >
                  {/* Radiant footstep aura on the line */}
                  <ellipse cx="0" cy="0" rx="16" ry="6" fill="#6ee7f9" opacity="0.7" style={{ filter: 'drop-shadow(0 0 10px #6ee7f9)' }} />
                  <ellipse cx="0" cy="0" rx="8" ry="3" fill="#ffffff" opacity="0.9" />

                  {/* Cyan Traveler Silhouette (approx 26px tall) */}
                  <g transform="translate(0, 0)" style={{ filter: 'drop-shadow(0 0 8px #6ee7f9)' }}>
                    {/* Head */}
                    <circle cx="1.5" cy="-21" r="2.8" fill="#6ee7f9" />
                    {/* Torso */}
                    <path d="M -0.5 -18 C -0.5 -18.5, 3.5 -18.5, 3.5 -18 L 3 -10 L -1 -10 Z" fill="#6ee7f9" />
                    {/* Front Arm */}
                    <path d="M 3 -17 L 6 -13 L 7 -9 L 6 -8.6 L 5 -12 L 2 -16 Z" fill="#6ee7f9" />
                    {/* Back Arm */}
                    <path d="M -0.5 -17 L -3 -13.5 L -4 -10 L -3 -9.6 L -2 -13 L 0 -16 Z" fill="#6ee7f9" />
                    {/* Front Leg (planting on line) */}
                    <path d="M 2 -10 L 5 -4 L 7 0 L 4.5 0 L 3 -4 L 0.5 -10 Z" fill="#6ee7f9" />
                    {/* Back Leg (trailing) */}
                    <path d="M -1 -10 L -3.5 -5 L -6 -1 L -7 -2 L -4.5 -5.5 L -2 -10 Z" fill="#6ee7f9" />
                  </g>
                </g>
              </g>
            )}
          </svg>

          {/* =====================================================================
              2. THE CARDS LAYER (Semantic Ordered List <ol> / <li>)
              Positioned with percentage coordinates matching planet nodes
              Uses container query units (cqw) with minimum 11px font sizes
              ===================================================================== */}
          <ol
            className="relative w-full h-full list-none p-0 m-0"
            aria-label="Exora 2.0 Three-Phase Journey"
          >
            {/* -----------------------------------------------------------------
                CARD 1: PHASE 1 (Right of Node 1, at left: 34%, top: 8%, width: 44%)
                ----------------------------------------------------------------- */}
            <li
              aria-current={activeStepIndex === 0 ? 'step' : undefined}
              style={{
                left: '34%',
                top: '8%',
                width: '44%',
                transition: 'opacity 0.4s ease-out',
                opacity: isNode1Lit ? 1 : 0.45,
              }}
              className="absolute z-20"
            >
              <div
                style={{ padding: 'clamp(10px, 2.2cqw, 20px)' }}
                className={`glass-pass-card rounded-2xl sm:rounded-3xl transition-all duration-300 relative group border ${
                  isNode1Lit ? 'border-white/20 shadow-[0_10px_30px_rgba(255,197,138,0.15)]' : 'border-white/5'
                }`}
              >
                {/* Centered Diamond Sparkle */}
                <div
                  className="absolute top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#120a2e] border border-[#ffc58a]/70 flex items-center justify-center shadow-[0_0_12px_rgba(255,197,138,0.45)] z-20"
                  aria-hidden="true"
                >
                  <Sparkles className="w-4 h-4 text-[#ffd09f] animate-pulse" />
                </div>

                {/* Compact Content Header (Always Visible) */}
                <button
                  type="button"
                  onClick={() => toggleCard('phase-1')}
                  aria-expanded={expandedCards['phase-1']}
                  aria-controls="card-detail-phase-1"
                  className="w-full text-left outline-none min-h-[44px] flex flex-col justify-center"
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span
                      style={{ fontSize: 'clamp(11px, 1.6cqw, 13px)' }}
                      className="font-display text-xs sm:text-sm tracking-[0.14em] uppercase text-[#ffd09f] font-semibold"
                    >
                      PHASE 01 // ONLINE
                    </span>
                    <span
                      style={{ fontSize: 'clamp(12px, 1.8cqw, 14px)' }}
                      className="text-[#d5cbea] font-sans font-semibold tracking-wide"
                    >
                      8–22 Nov
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <h3
                      style={{ fontSize: 'clamp(14px, 2.6cqw, 24px)' }}
                      className="font-display font-semibold text-white uppercase tracking-wide leading-snug"
                    >
                      Idea & PPT Screening
                    </h3>
                    <ChevronDown
                      className={`w-4 h-4 text-[#ffd09f] shrink-0 transition-transform duration-200 ${
                        expandedCards['phase-1'] ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>

                {/* Expandable Details (In place, without shifting cards) */}
                {expandedCards['phase-1'] && (
                  <div
                    id="card-detail-phase-1"
                    className="pt-2 mt-2 border-t border-white/10 space-y-2 animate-[staticFlash_120ms_ease-out]"
                  >
                    <p
                      style={{ fontSize: 'clamp(11px, 1.8cqw, 13px)' }}
                      className="font-sans text-sm sm:text-base text-[#c5bddf] leading-relaxed line-clamp-3"
                    >
                      Squad registration and mandatory project PPT submission. Top 40–50 squads advance to the 24-hour hackathon.
                    </p>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffc58a]/15 border border-[#ffc58a]/40 text-[#ffc58a]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ffc58a]" />
                      <span style={{ fontSize: 'clamp(11px, 1.5cqw, 12px)' }} className="font-display text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                        PPT Submission Mandatory
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </li>

            {/* -----------------------------------------------------------------
                CARD 2: PHASE 2 (Left of Node 2, at left: 12%, top: 40%, width: 44%)
                ----------------------------------------------------------------- */}
            <li
            aria-current={activeStepIndex === 1 ? 'step' : undefined}
            style={{
              left: '12%',
              width: '44%',
              transition: 'opacity 0.4s ease-out',
              opacity: isNode2Lit ? 1 : 0.45,
            }}
            className="absolute z-20 top-[43%] sm:top-[40%]"
            >
              <div
                style={{ padding: 'clamp(10px, 2.2cqw, 20px)' }}
                className={`glass-pass-card rounded-2xl sm:rounded-3xl transition-all duration-300 relative group border ${
                  isNode2Lit ? 'border-white/20 shadow-[0_10px_30px_rgba(139,92,246,0.15)]' : 'border-white/5'
                }`}
              >
                {/* Centered Diamond Sparkle */}
                <div
                  className="absolute -top-5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#120a2e] border border-[#c084fc]/70 flex items-center justify-center shadow-[0_0_12px_rgba(192,132,252,0.45)] z-20"
                >
                  <Sparkles className="w-4 h-4 text-[#c084fc] animate-pulse" />
                </div>

                {/* Compact Content Header (Always Visible) */}
                <button
                  type="button"
                  onClick={() => toggleCard('phase-2')}
                  aria-expanded={expandedCards['phase-2']}
                  aria-controls="card-detail-phase-2"
                  className="w-full text-left outline-none min-h-[44px] flex flex-col justify-center"
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span
                      style={{ fontSize: 'clamp(11px, 1.6cqw, 13px)' }}
                      className="font-display text-xs sm:text-sm tracking-[0.14em] uppercase text-[#c084fc] font-semibold"
                    >
                      PHASE 02 // 24H SPRINT
                    </span>
                    <span
                      style={{ fontSize: 'clamp(12px, 1.8cqw, 14px)' }}
                      className="text-[#d5cbea] font-sans font-semibold tracking-wide"
                    >
                      27 Nov 2026
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <h3
                      style={{ fontSize: 'clamp(14px, 2.6cqw, 24px)' }}
                      className="font-display font-semibold text-white uppercase tracking-wide leading-snug"
                    >
                      24-Hour Build
                    </h3>
                    <ChevronDown
                      className={`w-4 h-4 text-[#c084fc] shrink-0 transition-transform duration-200 ${
                        expandedCards['phase-2'] ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>

                {/* Expandable Details (In place, without shifting cards) */}
                {expandedCards['phase-2'] && (
                  <div
                    id="card-detail-phase-2"
                    className="pt-2 mt-2 border-t border-white/10 space-y-2 animate-[staticFlash_120ms_ease-out]"
                  >
                    <p
                      style={{ fontSize: 'clamp(11px, 1.8cqw, 13px)' }}
                      className="font-sans text-sm sm:text-base text-[#c5bddf] leading-relaxed line-clamp-3"
                    >
                      Non-eliminatory online build sprint. Squads receive architectural mentorship after 4:00 PM to refine project prototypes.
                    </p>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8b5cf6]/15 border border-[#8b5cf6]/40 text-[#c084fc]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]" />
                      <span style={{ fontSize: 'clamp(11px, 1.5cqw, 12px)' }} className="font-display text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                        Zero Eliminations Round
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </li>

            {/* -----------------------------------------------------------------
                CARD 3: FINALE (Right of Node 3, at left: 34%, top: 71%, width: 48%)
                Expands automatically when the walker arrives into the 24H schedule
                ----------------------------------------------------------------- */}
            <li
              aria-current={activeStepIndex === 2 ? 'step' : undefined}
              style={{
                left: '34%',
                width: '48%',
                transition: 'opacity 0.4s ease-out',
                opacity: isNode3Lit ? 1 : 0.45,
              }}
              className="absolute z-20 top-[82%] sm:top-[74%]"
            >
              <div
                style={{ padding: 'clamp(10px, 2.2cqw, 20px)' }}
                className={`glass-pass-card rounded-2xl sm:rounded-3xl transition-all duration-300 relative group border ${
                  isNode3Lit
                    ? 'border-[#e04dff]/50 shadow-[0_15px_40px_rgba(224,77,255,0.22)]'
                    : 'border-white/5'
                }`}
              >
                {/* Centered Diamond Sparkle */}
                <div
                  className="absolute top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#120a2e] border border-[#6ee7f9]/70 flex items-center justify-center shadow-[0_0_12px_rgba(110,231,249,0.45)] z-20"
                >
                  <Sparkles className="w-4 h-4 text-[#6ee7f9] animate-pulse" />
                </div>

                {/* Compact Header (Always Visible) */}
                <button
                  type="button"
                  onClick={() => toggleCard('phase-3')}
                  aria-expanded={expandedCards['phase-3']}
                  aria-controls="card-detail-phase-3"
                  className="w-full text-left outline-none min-h-[44px] flex flex-col justify-center"
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span
                      style={{ fontSize: 'clamp(11px, 1.6cqw, 13px)' }}
                      className="font-display text-xs sm:text-sm tracking-[0.14em] uppercase text-[#6ee7f9] font-semibold"
                    >
                      PHASE 03 // OFFLINE
                    </span>
                    <span
                      style={{ fontSize: 'clamp(12px, 1.8cqw, 14px)' }}
                      className="text-[#ffc58a] font-sans font-semibold tracking-wide"
                    >
                      28 Nov 2026
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <h3
                      style={{ fontSize: 'clamp(14px, 2.6cqw, 24px)' }}
                      className="font-display font-semibold text-white uppercase tracking-wide leading-snug"
                    >
                      The Grand Finale
                    </h3>
                    <ChevronDown
                      className={`w-4 h-4 text-[#6ee7f9] shrink-0 transition-transform duration-200 ${
                        expandedCards['phase-3'] ? 'rotate-180' : ''
                      }`}
                    />
                  </div>

                  <div
                    style={{ fontSize: 'clamp(11px, 1.7cqw, 13px)' }}

                  >
                    <span className="truncate">Thoughtworks, Gurugram </span>
                    <span className="text-[#ffd09f] font-display text-[11px] sm:text-xs font-semibold uppercase shrink-0"> 08:00 AM–05:00 PM</span>
                  </div>
                </button>

                {/* Expanded State: One-Day Schedule with Moon-Dot Milestones */}
                {expandedCards['phase-3'] && (
                  <div
                    id="card-detail-phase-3"
                    className="pt-2 mt-1.5 border-t border-white/10 space-y-1.5 animate-[staticFlash_120ms_ease-out]"
                  >
                    <div
                      style={{ fontSize: 'clamp(9px, 1.5cqw, 11px)' }}
                      className="font-display text-[10px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#ffd09f] flex items-center justify-between"
                    >
                      <span>OFFLINE FINALE ITINERARY</span>
                      <span className="text-[#8beaff] font-sans text-[10px] sm:text-xs font-semibold">08:00 AM – 05:00 PM</span>
                    </div>

                    {/* Moon-Dot Milestone Sequence */}
                    <div className="space-y-1">
                      {FINALE_SCHEDULE.map((item, sIdx) => (
                        <div
                          key={sIdx}
                          className="flex items-start gap-1.5 p-1 sm:p-1.5 rounded-lg border transition-all duration-200 cursor-pointer hover:-translate-y-0.5 bg-[#05030f]/60 border-white/5 hover:bg-[#6ee7f9]/10 hover:border-[#6ee7f9]/40 hover:shadow-[0_0_14px_rgba(110,231,249,0.15)]"
                        >
                          {/* Moon dot */}
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-1 shrink-0 bg-[#6ee7f9] shadow-[0_0_6px_#6ee7f9]"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-1 leading-tight">
                              <span
                                style={{ fontSize: 'clamp(10px, 1.6cqw, 13px)' }}
                                className="font-display font-semibold uppercase truncate text-white"
                              >
                                {item.marker} · {item.title}
                              </span>
                              <span
                                style={{ fontSize: 'clamp(9px, 1.4cqw, 11px)' }}
                                className="text-[#d5cbea] font-sans font-medium shrink-0"
                              >
                                {item.time}
                              </span>
                            </div>
                            <p
                              style={{ fontSize: 'clamp(9px, 1.4cqw, 11px)' }}
                              className="text-[#c5bddf] font-sans font-medium leading-relaxed"
                            >
                              {item.detail}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </li>
          </ol>
          </div>
        )}
      </div>
    </section>
  );
};