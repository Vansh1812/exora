import React from 'react';
import { TrackData } from '../data/tracks';
import { TrackGlyph } from './glyphs/TrackGlyphs';
import { ShieldAlert, Award } from 'lucide-react';

interface TrackPanelProps {
  track: TrackData;
}

export const TrackPanel: React.FC<TrackPanelProps> = ({ track }) => {
  return (
    <div
      id={`panel-${track.id}`}
      role="tabpanel"
      aria-labelledby={`tab-${track.id}`}
      tabIndex={0}
      key={track.id}
      style={{
        '--track-accent': track.accent,
        boxShadow: `0 20px 45px -10px rgba(0, 0, 0, 0.95), 0 0 30px ${track.accent}20`,
        borderColor: `${track.accent}55`,
      } as React.CSSProperties}
      className="relative w-full border bg-[#0c100e]/95 p-6 sm:p-8 rounded-2xl rivet-corner overflow-hidden transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[var(--track-accent)]"
    >
      {/* 1. Thin Accent Scan Line Sweeping Down Upon Activation */}
      <div
        className="absolute inset-x-0 h-[2px] pointer-events-none animate-scan-sweep"
        style={{
          background: `linear-gradient(90deg, transparent, ${track.accent}, transparent)`,
          boxShadow: `0 0 10px ${track.accent}`,
        }}
        aria-hidden="true"
      />

      {/* Top Header Row: Code Name, Classified Stamp & Threat Level Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-[#1f2e26]">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl border flex items-center justify-center shrink-0"
            style={{
              backgroundColor: `${track.accent}15`,
              borderColor: `${track.accent}60`,
              color: track.accent,
            }}
          >
            <TrackGlyph type={track.glyph} className="w-5 h-5" accent={track.accent} />
          </div>

          <div>
            <span
              className="text-xs font-mono font-bold tracking-widest uppercase block"
              style={{ color: track.accent }}
            >
              {track.codeName}
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[#52635a] uppercase">
              SECTOR MERIT CLASSIFICATION
            </span>
          </div>
        </div>

        {/* Stamped Classified Seal & Threat Indicator */}
        <div className="flex items-center gap-3">
          {/* Rubber Stamp (1.15 to 1 scale-in) */}
          <div
            key={`stamp-${track.id}`}
            className="animate-stamp-hit text-[10px] font-mono font-black uppercase tracking-widest px-2.5 py-1 rounded border"
            style={{
              borderColor: track.accent,
              color: track.accent,
              backgroundColor: `${track.accent}12`,
            }}
          >
            CLASSIFIED
          </div>

          {/* 1-to-5 Threat Level Segmented Bar */}
          <div className="flex items-center gap-1.5 bg-[#080b09] px-2.5 py-1.5 rounded border border-[#1b2b22]">
            <span className="text-[9px] font-mono text-[#52635a] tracking-wider uppercase mr-1">
              THREAT
            </span>
            {[1, 2, 3, 4, 5].map((lvl) => {
              const isActive = lvl <= track.threatLevel;
              return (
                <div
                  key={lvl}
                  className="w-2.5 h-3.5 rounded-sm transition-all"
                  style={{
                    backgroundColor: isActive ? track.accent : '#1a2720',
                    boxShadow: isActive ? `0 0 6px ${track.accent}80` : 'none',
                  }}
                  title={`Threat Level ${track.threatLevel}/5`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Track Heading */}
      <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#e2e8e5] tracking-tight mb-3">
        {track.title}
      </h3>

      {/* Mission Brief in Villain Voice */}
      <div className="p-4 bg-[#080b09] border border-[#1b2b22] rounded-xl mb-6 border-l-4" style={{ borderLeftColor: track.accent }}>
        <div className="flex items-center gap-2 mb-1.5 text-[10px] font-mono tracking-widest uppercase" style={{ color: track.accent }}>
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>MISSION DIRECTIVE</span>
        </div>
        <p className="font-display italic text-sm sm:text-base text-[#e2e8e5]/90 leading-snug">
          "{track.brief}"
        </p>
      </div>

      {/* 3 Example Problem Statements as Mono Bullet Lines */}
      <div className="space-y-3 mb-6">
        <span className="text-xs font-mono font-bold tracking-widest text-[#8e9e96] uppercase flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: track.accent }} />
          OPERATIONAL TARGETS // FEASIBLE BUILD OBJECTIVES
        </span>

        <div className="space-y-2">
          {track.problemStatements.map((statement, idx) => (
            <div
              key={idx}
              className="p-3 bg-[#0a0e0c] border border-[#1a261f] hover:border-[#2f4a3a] rounded-lg transition-all flex items-start gap-3 group"
            >
              <span
                className="text-xs font-mono font-bold shrink-0 mt-0.5"
                style={{ color: track.accent }}
              >
                &gt; [SPEC 0{idx + 1}]
              </span>
              <p className="font-mono text-xs sm:text-sm text-[#8e9e96] group-hover:text-[#e2e8e5] transition-colors leading-relaxed">
                {statement}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Track Perk or Incentive Badge */}
      {track.trackPerk && (
        <div className="pt-4 border-t border-[#1b2b22] flex items-center justify-between flex-wrap gap-2 text-xs font-mono">
          <div className="flex items-center gap-2 text-[#8e9e96]">
            <Award className="w-4 h-4 text-[#c9a227]" />
            <span>DIRECTIVE INCENTIVE:</span>
          </div>
          <span
            className="font-bold tracking-wider uppercase text-[11px] px-2.5 py-0.5 rounded border"
            style={{
              borderColor: `${track.accent}50`,
              color: track.accent,
              backgroundColor: `${track.accent}10`,
            }}
          >
            {track.trackPerk}
          </span>
        </div>
      )}
    </div>
  );
};
