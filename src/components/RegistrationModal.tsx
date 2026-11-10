import React from 'react';
import { EVENT_CONFIG } from '../eventConfig';
import { Calendar, Users, ExternalLink, X, FileText, MapPin, AlertCircle, Sparkles } from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleCalendarExport = () => {
    // Google Calendar direct intent link for 28 November 2026
    const title = encodeURIComponent(EVENT_CONFIG.eventName + ' // Google Developer Groups');
    const details = encodeURIComponent(
      EVENT_CONFIG.heroSynopsis +
      '\n\nPhases:\n- 22 Nov: PPT Submission Deadline\n- 25 Nov: Phase 1 Shortlist Results\n- 27 Nov: Phase 2 — 24-Hour Hackathon & Live Mentoring\n- 28 Nov: Grand Finale at ' +
      EVENT_CONFIG.venue
    );
    const location = encodeURIComponent(EVENT_CONFIG.venue + ', ' + EVENT_CONFIG.venueAddress);
    // 2026-11-28T09:00:00 to 2026-11-28T18:00:00 (UTC 20261128T033000Z/20261128T123000Z)
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=20261128T033000Z/20261128T123000Z`;
    window.open(gCalUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-[staticFlash_150ms_ease-out]">
      <div className="glass-pass-card relative w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-3xl shadow-[0_25px_60px_rgba(5,3,15,0.95),_0_0_50px_rgba(139,92,246,0.3)] border border-white/20">
        {/* Pulsing Diamond Sparkle Centered on Top Edge */}
        <div
          className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-[#120a2e] border border-[#ffc58a]/80 shadow-[0_0_16px_#ffc58a]"
          aria-hidden="true"
        >
          <Sparkles className="w-4 h-4 text-[#ffc58a] animate-pulse" />
        </div>

        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 mb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 mb-1 text-[10px] font-display text-[#ffc58a] uppercase tracking-[0.2em]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffc58a]" />
              <span>ORBITAL ENROLLMENT // THREE PHASES</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-normal text-[#f4f0ff] uppercase tracking-wide">
              Reserve Your Orbit
            </h3>
            <div className="text-xs font-sans text-[#a99fcf] flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-[#ffc58a]" />
              <span>{EVENT_CONFIG.venue}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-[#a99fcf] hover:text-[#f4f0ff] p-1.5 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close registration modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mandatory Screening Alert (Celestial Glass Pill) */}
        <div className="p-4 bg-[#120a2e]/90 border border-[#ffc58a]/40 rounded-2xl flex items-start gap-3 mb-6 shadow-[0_0_20px_rgba(255,197,138,0.12)]">
          <AlertCircle className="w-4 h-4 text-[#ffc58a] shrink-0 mt-0.5" />
          <div className="text-xs font-sans text-[#f4f0ff]/90 leading-relaxed">
            <span className="font-display text-xs text-[#ffc58a] tracking-wider uppercase block sm:inline mr-1">
              Mandatory Requirement:
            </span>
            PPT submission by <strong className="text-[#ffc58a]">22 November</strong> is mandatory for Phase 1 screening. Shortlisted teams advance to Phase 2.
          </div>
        </div>

        {/* Squad Prerequisites Checklist */}
        <div className="space-y-4 mb-7 text-xs font-sans text-[#a99fcf]">
          {/* Phase Journey & Key Dates */}
          <div className="p-4 bg-[#05030f]/60 border border-white/10 rounded-2xl space-y-2.5">
            <div className="text-[#f4f0ff] font-display text-xs tracking-wider uppercase flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#ffc58a]" />
              <span>Event Timeline & Key Deadlines:</span>
            </div>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#ffc58a] shadow-[0_0_6px_#ffc58a]" />
                <span><strong className="text-[#f4f0ff]">8–22 Nov:</strong> Registration Window (100% Free).</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#ff6f91] shadow-[0_0_6px_#ff6f91]" />
                <span><strong className="text-[#ff6f91]">22 Nov:</strong> PPT Submission Deadline (Mandatory).</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#6ee7f9] shadow-[0_0_6px_#6ee7f9]" />
                <span><strong className="text-[#f4f0ff]">25 Nov:</strong> Phase 1 Shortlist Results Declared.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#8b5cf6] shadow-[0_0_6px_#8b5cf6]" />
                <span><strong className="text-[#6ee7f9]">27 Nov:</strong> Phase 2 — 24-Hour Hackathon & Live Mentoring.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#ffc58a] shadow-[0_0_6px_#ffc58a]" />
                <span><strong className="text-[#ffc58a]">28 Nov:</strong> Phase 3 — One-Day Grand Finale (8 AM–5 PM, check-in by 9 AM) @ Thoughtworks Gurugram.</span>
              </li>
            </ul>
          </div>

          {/* Squad Composition */}
          <div className="p-4 bg-[#05030f]/60 border border-white/10 rounded-2xl space-y-2">
            <div className="text-[#f4f0ff] font-display text-xs tracking-wider uppercase flex items-center gap-2">
              <Users className="w-4 h-4 text-[#6ee7f9]" />
              <span>Squad Composition & Admittance:</span>
            </div>
            <ul className="space-y-1.5 list-disc list-inside leading-relaxed text-[#a99fcf]">
              <li>2 to 4 members per team (cross-college squads welcome).</li>
              <li>100% Free registration — zero fees across all three phases.</li>
              <li>Student identity verified during offline check-in on 28 November.</li>
            </ul>
          </div>

          {/* Idea PPT Requirements */}
          <div className="p-4 bg-[#05030f]/60 border border-white/10 rounded-2xl space-y-2">
            <div className="text-[#f4f0ff] font-display text-xs tracking-wider uppercase flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#e04dff]" />
              <span>Project Idea PPT Requirements:</span>
            </div>
            <ul className="space-y-1.5 list-disc list-inside leading-relaxed text-[#a99fcf]">
              <li>Problem statement, target users, and proposed technical solution.</li>
              <li>System architecture, tech stack & proposed tools.</li>
              <li>Feasibility, expected outcomes, and prototype completion roadmap.</li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2 border-t border-white/10">
          <a
            href={EVENT_CONFIG.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-orbital w-full inline-flex items-center justify-center gap-2 text-xs py-3.5"
          >
            <span>Proceed to Registration Portal</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <button
              type="button"
              onClick={handleCalendarExport}
              className="btn-secondary-orbital text-xs inline-flex items-center justify-center gap-2 py-2.5"
            >
              <Calendar className="w-4 h-4 text-[#ffc58a]" />
              <span>Add to Calendar</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="btn-secondary-orbital text-xs inline-flex items-center justify-center py-2.5 opacity-80 hover:opacity-100"
            >
              Close & Return to Orbit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
