import React, { useState, useMemo } from 'react';
import { TRACKS_DATA, TrackData } from '../data/tracks';
import { TrackTabs } from './TrackTabs';
import { TrackPanel } from './TrackPanel';
import { TrackGlyph } from './glyphs/TrackGlyphs';
import { useReveal } from '../hooks/useReveal';
import { ChevronDown, Sparkles } from 'lucide-react';

export const TracksSection: React.FC = () => {
  const { ref, revealClass, isRevealed } = useReveal<HTMLDivElement>();
  const [activeTrackId, setActiveTrackId] = useState<string>(TRACKS_DATA[0].id);
  const [mobileExpandedId, setMobileExpandedId] = useState<string>(TRACKS_DATA[0].id);

  // Memoize active track object for high performance
  const activeTrack = useMemo(
    () => TRACKS_DATA.find((t) => t.id === activeTrackId) || TRACKS_DATA[0],
    [activeTrackId]
  );

  const wildcardTrack = useMemo(
    () => TRACKS_DATA.find((t) => t.id === 'op-05') || TRACKS_DATA[4],
    []
  );

  const handleMobileAccordionToggle = (id: string) => {
    setMobileExpandedId((prev) => (prev === id ? '' : id));
  };

  return (
    <section
      id="tracks"
      ref={ref}
      className={`py-24 px-4 sm:px-6 lg:px-8 border-b border-[#1f2e26] relative overflow-hidden ${revealClass}`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono tracking-widest text-[#c9a227] uppercase mb-2">
            <span className="text-[#52635a]">//</span>
            <span>OPERATIONAL SECTORS</span>
            <span className="text-[#33473c]">·</span>
            <span>5 FILES // CLEARANCE REQUIRED</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-[#e2e8e5] tracking-tight uppercase">
            CHOOSE YOUR OPERATION
          </h2>

          <p className="text-xs sm:text-sm font-mono text-[#8e9e96] max-w-2xl mt-2">
            Select a classified sector file to review mission parameters, operational targets, and threat ratings before deploying your squad.
          </p>
        </div>

        {/* ============================================================
            DESKTOP LAYOUT (lg:grid): FILE DRAWER WITH LEFT TABS & RIGHT PANEL
            ============================================================ */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Column (5 cols): File Drawer Vertical Tabs */}
          <div className="lg:col-span-5">
            <TrackTabs
              tracks={TRACKS_DATA}
              activeTrackId={activeTrackId}
              onSelectTrack={setActiveTrackId}
            />
          </div>

          {/* Right Column (7 cols): Active Track Full Dossier Panel */}
          <div className="lg:col-span-7">
            <TrackPanel track={activeTrack} />
          </div>
        </div>

        {/* ============================================================
            MOBILE LAYOUT (below lg): ACCORDION WITH MIN 48PX TAP TARGETS
            ============================================================ */}
        <div className="lg:hidden space-y-3 mb-10">
          {TRACKS_DATA.map((track) => {
            const isExpanded = mobileExpandedId === track.id;

            return (
              <div
                key={track.id}
                style={{
                  '--track-accent': track.accent,
                  borderLeftColor: track.accent,
                } as React.CSSProperties}
                className={`border bg-[#0c100e] rounded-xl overflow-hidden transition-all duration-200 border-l-4 ${
                  isExpanded ? 'border-t-[#2f4a3a] border-r-[#2f4a3a] border-b-[#2f4a3a]' : 'border-[#1f2e26]'
                }`}
              >
                {/* Accordion Trigger (Min 48px tap target) */}
                <button
                  type="button"
                  onClick={() => handleMobileAccordionToggle(track.id)}
                  aria-expanded={isExpanded}
                  aria-controls={`mobile-panel-${track.id}`}
                  className="w-full min-h-[52px] p-4 flex items-center justify-between gap-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--track-accent)]"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-8 h-8 rounded-lg border flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: `${track.accent}15`,
                        borderColor: `${track.accent}50`,
                        color: track.accent,
                      }}
                    >
                      <TrackGlyph type={track.glyph} className="w-4 h-4" accent={track.accent} />
                    </div>

                    <div className="min-w-0 truncate">
                      <span
                        className="block text-[10px] font-mono tracking-wider font-bold uppercase truncate"
                        style={{ color: track.accent }}
                      >
                        {track.codeName}
                      </span>
                      <span className="block font-display text-sm font-bold text-[#e2e8e5] truncate">
                        {track.title}
                      </span>
                    </div>
                  </div>

                  <ChevronDown
                    className={`w-4 h-4 text-[#8e9e96] shrink-0 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180 text-[var(--track-accent)]' : ''
                    }`}
                  />
                </button>

                {/* Mobile Accordion Content */}
                {isExpanded && (
                  <div id={`mobile-panel-${track.id}`} className="p-4 pt-1 border-t border-[#1b2b22] space-y-4">
                    {/* Brief */}
                    <div className="p-3 bg-[#080b09] rounded-lg border border-[#1a261f]">
                      <div className="text-[10px] font-mono uppercase mb-1" style={{ color: track.accent }}>
                        MISSION BRIEF
                      </div>
                      <p className="font-display italic text-xs sm:text-sm text-[#e2e8e5]/90">
                        "{track.brief}"
                      </p>
                    </div>

                    {/* Threat Bar */}
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-[#52635a]">THREAT ASSESSMENT:</span>
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5].map((lvl) => (
                          <div
                            key={lvl}
                            className="w-2.5 h-3 rounded-sm"
                            style={{
                              backgroundColor: lvl <= track.threatLevel ? track.accent : '#1a2720',
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Problem Statements */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono uppercase text-[#52635a] block">
                        OPERATIONAL TARGETS:
                      </span>
                      {track.problemStatements.map((statement, sIdx) => (
                        <div key={sIdx} className="text-xs font-mono text-[#8e9e96] flex items-start gap-2">
                          <span className="font-bold shrink-0" style={{ color: track.accent }}>
                            &gt;
                          </span>
                          <span>{statement}</span>
                        </div>
                      ))}
                    </div>

                    {/* Perk */}
                    {track.trackPerk && (
                      <div className="text-[11px] font-mono text-[#c9a227] pt-2 border-t border-[#1b2b22]">
                        ★ {track.trackPerk}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ============================================================
            FEATURED STRIP: 5TH CARD (OPEN INNOVATION // WILDCARD)
            Breaking the grid with dashed border and rotated WILDCARD stamp
            ============================================================ */}
        <div
          onClick={() => setActiveTrackId('op-05')}
          style={{
            '--track-accent': wildcardTrack.accent,
            boxShadow: activeTrackId === 'op-05' ? `0 0 35px ${wildcardTrack.accent}20` : undefined,
          } as React.CSSProperties}
          className="relative w-full border-2 border-dashed border-[#5EEAD4]/60 hover:border-[#5EEAD4] bg-[#0c1310] hover:bg-[#0f1714] p-6 sm:p-7 rounded-2xl transition-all cursor-pointer group rivet-corner"
        >
          {/* Rotated WILDCARD Stamp Badge in Top Right */}
          <div className="absolute right-4 sm:right-6 top-4 sm:top-5 transform rotate-6 group-hover:rotate-0 transition-transform">
            <span
              className="inline-block px-3 py-1 font-mono text-[10px] sm:text-xs font-black uppercase tracking-widest border-2 border-[#5EEAD4] text-[#5EEAD4] bg-[#5EEAD4]/10 shadow-[0_0_12px_rgba(94,234,212,0.3)]"
            >
              ★ WILDCARD SECTOR
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pr-16 sm:pr-32">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#5EEAD4]/10 border border-[#5EEAD4]/50 flex items-center justify-center text-[#5EEAD4] shrink-0 group-hover:scale-105 transition-transform">
                <TrackGlyph type="wildcard" className="w-6 h-6" accent="#5EEAD4" />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#5EEAD4]">
                    OP-05 // WILDCARD
                  </span>
                  <span className="text-[10px] font-mono text-[#52635a] uppercase hidden sm:inline">
                    · UNCONSTRAINED DOMAIN
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#e2e8e5] group-hover:text-white transition-colors">
                  Open Innovation & Experimental Systems
                </h3>

                <p className="font-mono text-xs sm:text-sm text-[#8e9e96] max-w-3xl mt-1 leading-relaxed">
                  Have an unclassifiable breakthrough? Cross-disciplinary fusion, quantum computing, or decentralized autonomous swarms are welcome under the Wildcard banner.
                </p>
              </div>
            </div>

            <div className="shrink-0 self-start md:self-auto">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-[#0b0d0c] bg-[#5EEAD4] hover:bg-[#7ff3e1] shadow-[0_0_15px_rgba(94,234,212,0.4)] transition-all">
                <Sparkles className="w-3.5 h-3.5" />
                <span>DEPLOY WILDCARD</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
