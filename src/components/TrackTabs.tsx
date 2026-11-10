import React, { useRef } from 'react';
import { TrackData } from '../data/tracks';
import { TrackGlyph } from './glyphs/TrackGlyphs';

interface TrackTabsProps {
  tracks: TrackData[];
  activeTrackId: string;
  onSelectTrack: (id: string) => void;
}

export const TrackTabs: React.FC<TrackTabsProps> = ({
  tracks,
  activeTrackId,
  onSelectTrack,
}) => {
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  // Keyboard navigation for tablist (WAI-ARIA compliance)
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let targetIndex = index;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      targetIndex = (index + 1) % tracks.length;
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      targetIndex = (index - 1 + tracks.length) % tracks.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      targetIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      targetIndex = tracks.length - 1;
    }

    if (targetIndex !== index) {
      tabsRef.current[targetIndex]?.focus();
      onSelectTrack(tracks[targetIndex].id);
    }
  };

  return (
    <div
      role="tablist"
      aria-label="Classified Operations Tracks"
      className="flex flex-col gap-2.5 w-full h-full"
    >
      {tracks.map((track, idx) => {
        const isActive = track.id === activeTrackId;

        return (
          <button
            key={track.id}
            ref={(el) => {
              tabsRef.current[idx] = el;
            }}
            id={`tab-${track.id}`}
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${track.id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelectTrack(track.id)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            style={{
              '--track-accent': track.accent,
              boxShadow: isActive ? `0 0 25px ${track.accent}25, inset 0 0 15px ${track.accent}10` : undefined,
              borderColor: isActive ? track.accent : undefined,
            } as React.CSSProperties}
            className={`group flex-1 flex items-center text-left p-4 rounded-xl border transition-all duration-200 relative overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-[var(--track-accent)] ${
              isActive
                ? 'bg-[#121915] border-[var(--track-accent)] text-[#e2e8e5] translate-x-1'
                : 'bg-[#0c100e]/95 border-[#1f2e26] text-[#8e9e96] hover:border-[#2f4a3a] hover:bg-[#101612] hover:-translate-y-0.5'
            }`}
          >
            {/* Left Accent Indicator Strip */}
            <div
              className={`absolute left-0 top-0 bottom-0 w-1 transition-all ${
                isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'
              }`}
              style={{ backgroundColor: track.accent }}
              aria-hidden="true"
            />

            <div className="flex items-center justify-between gap-3 pl-2">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 transition-transform ${
                    isActive ? 'scale-105 border-[var(--track-accent)]' : 'border-[#1f2e26] group-hover:border-[#2f4a3a]'
                  }`}
                  style={{
                    backgroundColor: isActive ? `${track.accent}15` : '#080b09',
                    color: track.accent,
                  }}
                >
                  <TrackGlyph type={track.glyph} className="w-5 h-5" accent={track.accent} />
                </div>

                <div className="min-w-0 truncate">
                  <span
                    className="block text-[10px] font-mono tracking-widest font-bold uppercase truncate"
                    style={{ color: track.accent }}
                  >
                    {track.codeName}
                  </span>
                  <span className="block font-display text-sm sm:text-base font-bold text-[#e2e8e5] truncate">
                    {track.title}
                  </span>
                </div>
              </div>

              {/* Active Tab Badge Indicator */}
              <div className="shrink-0 flex items-center">
                {isActive ? (
                  <span
                    className="w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px_var(--track-accent)]"
                    style={{ backgroundColor: track.accent }}
                  />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1f2e26] group-hover:bg-[#52635a] transition-colors" />
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};
