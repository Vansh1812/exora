import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { TRACKS_DATA, TrackData } from '../data/tracks';
import { useReveal } from '../hooks/useReveal';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { Sparkles } from 'lucide-react';

/**
 * Concise, plain-language mission statements (max 14 words)
 * and 3 short ideas to build (max 10 words each) for each orbit
 */
const TRACK_COPY: Record<string, { mission: string; ideas: string[]; codenameOnly: string; shortTitle: string }> = {
  'orbit-01': {
    codenameOnly: 'SENTINEL',
    shortTitle: 'FinTech',
    mission: 'Build unbreachable financial defenses, fraud detection engines, and privacy-preserving verification systems.',
    ideas: [
      'Real-time UPI fraud interception and synthetic identity defense',
      'Zero-knowledge cryptographic credentials for decentralized banking APIs',
      'Privacy-preserving anomaly telemetry for cross-border student transactions',
    ],
  },
  'orbit-02': {
    codenameOnly: 'VITALIS',
    shortTitle: 'HealthTech',
    mission: 'Bridge healthcare divides using edge diagnostics, predictive telemetry, and community life-support tools.',
    ideas: [
      'Offline edge diagnostics for remote community healthcare clinics',
      'Federated edge learning for predictive disease outbreak telemetry',
      'Multi-lingual mental wellness and cognitive support assistant',
    ],
  },
  'orbit-03': {
    codenameOnly: 'CONSENSUS',
    shortTitle: 'Blockchain',
    mission: 'Forge decentralized protocols, transparent credential ledgers, and tamper-proof peer-to-peer networks.',
    ideas: [
      'Anti-tamper academic micro-credential and degree verification ledger',
      'Automated decentralized disaster relief disbursement protocol',
      'Zero-gas micro-patronage network for open-source hardware creators',
    ],
  },
  'orbit-04': {
    codenameOnly: 'KINETIC',
    shortTitle: 'Robotics',
    mission: 'Automate physical systems by combining spatial robotics, IoT sensors, and embedded edge silicon.',
    ideas: [
      'Autonomous indoor drone routing for automated logistics warehouses',
      'Edge computer vision sensory module for predictive machine alerts',
      'Smart agricultural micro-irrigation controller on low-power LoRaWAN',
    ],
  },
  'orbit-05': {
    codenameOnly: 'HORIZON',
    shortTitle: 'Wildcard',
    mission: 'Build radical wildcard experiments that break boundaries and pioneer uncharted technological frontiers.',
    ideas: [
      'Multi-agent collaborative code synthesis for legacy system migrations',
      'Peer-to-peer mesh communications grid for emergency power blackouts',
      'Tactile spatial interfaces translating complex STEM for youth',
    ],
  },
};

/**
 * Custom SVG Planet Spheres with distinctive features:
 * - Sentinel: Luminous angled cyber ring with glowing node
 * - Vitalis: Bio-craters and glowing life-pulse aura
 * - Consensus: Tilted dual intersecting planetary rings
 * - Kinetic: Horizontal atmospheric bands (gas giant)
 * - Horizon: 4-point radiant star core and prismatic corona
 */
const PlanetSphere: React.FC<{
  trackId: string;
  accent: string;
  isSelected?: boolean;
  isReduced?: boolean;
  className?: string;
}> = React.memo(({ trackId, accent, isSelected = false, isReduced = false, className = '' }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`overflow-visible select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* Planet 1: Sentinel (FinTech & Cybersecurity) */}
        <radialGradient id="grad-orbit-01" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#dbeafe" />
          <stop offset="35%" stopColor="#5b7cff" />
          <stop offset="75%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#0f172a" />
        </radialGradient>

        {/* Planet 2: Vitalis (HealthTech & Social Impact) */}
        <radialGradient id="grad-orbit-02" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffe4e6" />
          <stop offset="30%" stopColor="#ff6f91" />
          <stop offset="70%" stopColor="#e11d48" />
          <stop offset="100%" stopColor="#4c0519" />
        </radialGradient>

        {/* Planet 3: Consensus (Blockchain & Web3) */}
        <radialGradient id="grad-orbit-03" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#f3e8ff" />
          <stop offset="35%" stopColor="#c084fc" />
          <stop offset="75%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#2e1065" />
        </radialGradient>

        {/* Planet 4: Kinetic (Physical AI & IoT) */}
        <radialGradient id="grad-orbit-04" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#fffbeb" />
          <stop offset="30%" stopColor="#ffc58a" />
          <stop offset="70%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#7c2d12" />
        </radialGradient>

        {/* Planet 5: Horizon (Open Innovation) */}
        <radialGradient id="grad-orbit-05" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ecfeff" />
          <stop offset="30%" stopColor="#6ee7f9" />
          <stop offset="70%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#083344" />
        </radialGradient>

        {/* Clipping path for Kinetic bands */}
        <clipPath id="kineticSphereClip">
          <circle cx="50" cy="50" r="32" />
        </clipPath>
      </defs>

      {/* Thin Outer Orbit Ring for Selected Planet */}
      {isSelected && (
        <ellipse
          cx="50"
          cy="50"
          rx="47"
          ry="19"
          stroke={accent}
          strokeWidth="1.2"
          strokeDasharray="3 3"
          opacity="0.85"
        />
      )}

      {/* Tiny Orbiting Moon for Selected Planet */}
      {isSelected && (
        <g
          style={{ transformOrigin: '50px 50px' }}
          className={isReduced ? '' : 'orbit-moon-1'}
        >
          <circle cx="50" cy="12" r="3" fill="#ffffff" filter="drop-shadow(0 0 4px #ffffff)" />
        </g>
      )}

      {/* Corona Atmosphere Halo */}
      <circle
        cx="50"
        cy="50"
        r="36"
        fill={accent}
        opacity={isSelected ? 0.28 : 0.12}
      />

      {/* Planet Sphere Body */}
      <circle
        cx="50"
        cy="50"
        r="32"
        fill={`url(#grad-${trackId})`}
      />

      {/* Specular Rim Light */}
      <circle
        cx="49"
        cy="48"
        r="30"
        stroke="#ffffff"
        strokeWidth="0.8"
        opacity="0.45"
      />

      {/* -------------------------------------------------------------
          DISTINCTIVE PLANETARY FEATURES PER TRACK
          ------------------------------------------------------------- */}
      {/* 1. Sentinel: Digital Cyber Ring with Glowing Node */}
      {trackId === 'orbit-01' && (
        <g>
          <ellipse
            cx="50"
            cy="50"
            rx="43"
            ry="14"
            stroke="#5b7cff"
            strokeWidth="1.8"
            strokeDasharray="6 3"
            transform="rotate(-25 50 50)"
            opacity="0.9"
          />
          {/* Specular digital node on ring */}
          <circle cx="85" cy="38" r="2.8" fill="#6ee7f9" filter="drop-shadow(0 0 4px #6ee7f9)" />
        </g>
      )}

      {/* 2. Vitalis: Bio-Craters and Pulse Aura */}
      {trackId === 'orbit-02' && (
        <g>
          {/* Crater 1 */}
          <ellipse cx="38" cy="42" rx="7" ry="5" fill="#4c0519" opacity="0.6" />
          <ellipse cx="37" cy="41" rx="6" ry="4" stroke="#ffffff" strokeWidth="0.6" opacity="0.4" />
          {/* Crater 2 */}
          <ellipse cx="63" cy="58" rx="5" ry="3.5" fill="#4c0519" opacity="0.5" />
          <ellipse cx="62" cy="57" rx="4" ry="2.6" stroke="#ffffff" strokeWidth="0.6" opacity="0.35" />
          {/* Pulse arc */}
          <path
            d="M 32 58 Q 50 64 68 58"
            stroke="#ff6f91"
            strokeWidth="1"
            opacity="0.65"
            fill="none"
          />
        </g>
      )}

      {/* 3. Consensus: Dual Intersecting Planetary Rings */}
      {trackId === 'orbit-03' && (
        <g>
          {/* Primary Ring */}
          <ellipse
            cx="50"
            cy="50"
            rx="46"
            ry="14"
            stroke="#c084fc"
            strokeWidth="2"
            transform="rotate(-22 50 50)"
            opacity="0.95"
          />
          {/* Secondary Crossing Ring */}
          <ellipse
            cx="50"
            cy="50"
            rx="41"
            ry="12"
            stroke="#ffc58a"
            strokeWidth="1.2"
            strokeDasharray="4 2"
            transform="rotate(34 50 50)"
            opacity="0.75"
          />
        </g>
      )}

      {/* 4. Kinetic: Horizontal Atmospheric Bands (Gas Giant) */}
      {trackId === 'orbit-04' && (
        <g clipPath="url(#kineticSphereClip)">
          <path d="M 14 38 Q 50 46 86 38" stroke="#f97316" strokeWidth="4.5" opacity="0.75" fill="none" />
          <path d="M 12 50 Q 50 58 88 50" stroke="#c2410c" strokeWidth="3.5" opacity="0.8" fill="none" />
          <path d="M 18 62 Q 50 68 82 62" stroke="#ea580c" strokeWidth="2.5" opacity="0.6" fill="none" />
          <path d="M 22 28 Q 50 34 78 28" stroke="#fef08a" strokeWidth="1.5" opacity="0.45" fill="none" />
        </g>
      )}

      {/* 5. Horizon: Radiant 4-Point Star Core & Prismatic Corona */}
      {trackId === 'orbit-05' && (
        <g>
          {/* Prismatic fine ring */}
          <circle cx="50" cy="50" r="43" stroke="#6ee7f9" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
          {/* 4-point radiant star in center */}
          <path
            d="M 50 32 Q 50 50 68 50 Q 50 50 50 68 Q 50 50 32 50 Q 50 50 50 32 Z"
            fill="#ffffff"
            filter="drop-shadow(0 0 5px #6ee7f9)"
          />
          <circle cx="50" cy="50" r="2.5" fill="#6ee7f9" />
        </g>
      )}
    </svg>
  );
});

PlanetSphere.displayName = 'PlanetSphere';

/**
 * Choose Your Orbit (Redesigned Tracks Section)
 * Features:
 * 1. Planet selector row: 5 glowing SVG spheres in one row (fits 360px without text wrap, 48px min tap targets)
 * 2. Detail card below: Glass card with diamond sparkle on top, bottom gradient glow, top-right cropped planet
 * 3. Compact skimmable content: Mono label, display font title, 1-line plain mission, 3 ideas with sparkle bullets, stars & reward pill
 * 4. Open Innovation (Horizon): Special full-width wildcard strip with dashed border
 * 5. Full keyboard accessibility (Arrow keys, Home, End) and ARIA roles (tablist, tab, tabpanel)
 */
export const TracksSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const { ref: revealRef, revealClass } = useReveal<HTMLDivElement>();
  const isReduced = useReducedMotion();

  const [activeTrackId, setActiveTrackId] = useState<string>(TRACKS_DATA[0].id);
  const [isSectionVisible, setIsSectionVisible] = useState<boolean>(true);

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

  // Memoize active track object
  const activeTrack = useMemo(
    () => TRACKS_DATA.find((t) => t.id === activeTrackId) || TRACKS_DATA[0],
    [activeTrackId]
  );

  const activeCopy = useMemo(
    () => TRACK_COPY[activeTrack.id] || TRACK_COPY['orbit-01'],
    [activeTrack.id]
  );

  // Keyboard navigation for tablist (WAI-ARIA compliance)
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      let targetIndex = index;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        targetIndex = (index + 1) % TRACKS_DATA.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        targetIndex = (index - 1 + TRACKS_DATA.length) % TRACKS_DATA.length;
      } else if (e.key === 'Home') {
        e.preventDefault();
        targetIndex = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        targetIndex = TRACKS_DATA.length - 1;
      }

      if (targetIndex !== index) {
        tabsRef.current[targetIndex]?.focus();
        setActiveTrackId(TRACKS_DATA[targetIndex].id);
      }
    },
    []
  );

  return (
    <section
      id="tracks"
      ref={sectionRef}
      className="pt-4 pb-12 sm:pt-6 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative overflow-hidden"
    >
      <div ref={revealRef} className={`max-w-5xl mx-auto ${revealClass}`}>
        {/* Section Header */}
        <div className="mb-5 sm:mb-7 text-center md:text-left">
          <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-[#180d35]/90 border border-[#b18aff]/50 text-xs sm:text-sm font-display font-semibold tracking-[0.16em] text-[#ffd09f] uppercase shadow-[0_0_18px_rgba(177,138,255,0.12)]">
            
            <span>ORBITAL DOMAINS // 5 TRAJECTORIES</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl font-semibold text-white tracking-[0.08em] uppercase drop-shadow-[0_0_18px_rgba(224,77,255,0.2)]">
            CHOOSE YOUR ORBIT
          </h2>

          <p className="text-sm sm:text-base font-sans text-[#c5bddf] max-w-2xl mt-3 leading-relaxed">
            Select a planetary sphere to align your squad’s mission directives, difficulty rating, and track rewards.
          </p>
        </div>

        {/* =========================================================================
            1. PLANET SELECTOR ROW (role="tablist")
            5 glowing planets in one row; fits 360px without text wrap; min 48px tap targets
            ========================================================================= */}
        <div
          role="tablist"
          aria-label="Choose Your Orbit Tracks"
          className="flex items-end justify-between sm:justify-center gap-1 sm:gap-6 md:gap-10 w-full max-w-4xl mx-auto mb-6 sm:mb-10 px-1 pt-2 sm:pt-4 pb-2"
        >
          {TRACKS_DATA.map((track, idx) => {
            const isSelected = track.id === activeTrackId;
            const copy = TRACK_COPY[track.id];

            return (
              <button
                key={track.id}
                ref={(el) => {
                  tabsRef.current[idx] = el;
                }}
                id={`tab-${track.id}`}
                role="tab"
                aria-selected={isSelected}
                aria-controls="track-detail-panel"
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setActiveTrackId(track.id)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                aria-label={`${track.codeName}: ${track.title}`}
                style={{
                  '--accent': track.accent,
                } as React.CSSProperties}
                className={`group flex flex-col items-center justify-end min-w-[56px] min-h-[72px] sm:min-w-[76px] sm:min-h-[96px] p-1 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] transition-all duration-300 relative cursor-pointer ${
                  isSelected ? 'z-20' : 'z-10 opacity-70 hover:opacity-100'
                }`}
              >
                {/* Planet Sphere Visual with Scale and Floating on Selected */}
                <div
                  className={`relative transition-all duration-300 ${
                    isSelected
                      ? `scale-125 sm:scale-130 ${
                          !isReduced && isSectionVisible ? 'animate-planet-float' : ''
                        }`
                      : 'hover:scale-105'
                  }`}
                  style={{
                    width: 'clamp(44px, 11vw, 68px)',
                    height: 'clamp(44px, 11vw, 68px)',
                  }}
                >
                  <PlanetSphere
                    trackId={track.id}
                    accent={track.accent}
                    isSelected={isSelected}
                    isReduced={isReduced}
                    className="w-full h-full"
                  />
                </div>

                {/* Codename in Tiny Mono Text Underneath */}
                <div className="mt-2.5 text-center flex flex-col items-center">
                  <span
                    style={{
                      color: isSelected ? track.accent : '#d5cbea',
                      fontSize: 'clamp(10px, 2vw, 12px)',
                    }}
                    className={`font-mono uppercase tracking-wider block transition-colors leading-none ${
                      isSelected ? 'font-bold' : 'font-medium'
                    }`}
                  >
                    {copy?.codenameOnly || track.id}
                  </span>

                  {/* Selected Track Short Name */}
                  <span
                    style={{
                      fontSize: 'clamp(9px, 1.7vw, 11px)',
                    }}
                    className={`font-sans font-medium text-[#d5cbea] truncate max-w-[68px] sm:max-w-[100px] mt-1.5 transition-opacity ${
                      isSelected ? 'opacity-100' : 'hidden sm:block opacity-90'
                    }`}
                  >
                    {copy?.shortTitle || track.title}
                  </span>

                  {/* Active Indicator Pip */}
                  {isSelected && (
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-1.5 shadow-[0_0_8px_var(--accent)]"
                      style={{ backgroundColor: track.accent }}
                      aria-hidden="true"
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            2. DETAIL CARD BELOW THE ROW (role="tabpanel")
            Large glass card (radius 28px, diamond sparkle, bottom glow, top-right cropped planet)
            ========================================================================= */}
        <div
          id="track-detail-panel"
          role="tabpanel"
          aria-labelledby={`tab-${activeTrack.id}`}
          tabIndex={0}
          style={{
            '--accent': activeTrack.accent,
            boxShadow: `0 24px 60px -10px rgba(5, 3, 15, 0.9), 0 0 35px ${activeTrack.accent}25`,
            borderColor: `${activeTrack.accent}45`,
          } as React.CSSProperties}
          className="glass-pass-card rounded-[28px] p-6 pt-8 sm:p-9 sm:pt-14 md:p-10 md:pt-14 relative overflow-hidden transition-all duration-300 border border-white/14 mb-8 outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        >
        
          {/* Soft Gradient Glow Along the Bottom Edge */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[2px] opacity-75"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${activeTrack.accent} 50%, #ff9a3c 100%)`,
            }}
            aria-hidden="true"
          />

          {/* Large Cropped Decorative Planet in Top-Right Corner at 25% Opacity */}
          <div
            className="absolute -top-10 -right-10 w-44 h-44 sm:w-64 sm:h-64 opacity-25 pointer-events-none overflow-hidden select-none"
            aria-hidden="true"
          >
            <PlanetSphere
              trackId={activeTrack.id}
              accent={activeTrack.accent}
              isSelected={false}
              isReduced={isReduced}
              className="w-full h-full"
            />
          </div>

          {/* Card Content with Crossfade (key={activeTrack.id}) */}
          <div
            key={activeTrack.id}
            className={`relative z-10 space-y-6 ${
              isReduced ? '' : 'animate-card-crossfade'
            }`}
          >
            {/* Top Row: Small Mono Label & Difficulty Rating */}
            {/* Track Codename */}
            <div className="flex items-center">
              <span style={{ color: activeTrack.accent }}
              className="font-mono text-sm sm:text-base tracking-[0.16em] uppercase font-semibold"
              >
                {activeTrack.codeName}
                </span>
                </div>

            {/* Track Name in Display Font */}
            <h3 className="font-display text-3xl sm:text-5xl font-semibold text-white uppercase tracking-wide leading-tight drop-shadow-[0_0_16px_rgba(224,77,255,0.16)]">
              {activeTrack.title}
            </h3>

            {/* One-Line Plain Language Mission (max 14 words) */}
            <p className="text-base sm:text-lg text-[#e5def5] leading-[1.8] font-sans font-medium max-w-3xl">
              &ldquo;{activeCopy.mission}&rdquo;
            </p>

            {/* Ideas to Build (3 short lines, max 10 words each) */}
            <div className="space-y-2.5 pt-2">
              <span className="text-sm font-display font-semibold uppercase tracking-[0.16em] text-[#d5cbea] block">
                IDEAS TO BUILD //
              </span>

              <div className="space-y-2">
                {activeCopy.ideas.map((idea, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 text-sm sm:text-base font-sans font-medium text-[#e5def5] leading-relaxed"
                  >
                    
                    <span>{idea}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reward / Mentor Pill at Bottom */}
            {activeTrack.trackPerk && (
              <div className="pt-4 border-t border-white/10 flex items-center justify-between flex-wrap gap-2">
                <div
                  
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm sm:text-base font-sans font-medium border"  
                  style={{
                    backgroundColor: `${activeTrack.accent}15`,
                    borderColor: `${activeTrack.accent}45`,
                    color: '#f4f0ff',
                  }}
                >
                  
                  <span>{activeTrack.trackPerk}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
