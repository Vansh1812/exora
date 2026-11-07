import React from 'react';
import { EVENT_CONFIG } from '../eventConfig';
import { Calendar, Users, ExternalLink, X, FileText, CheckCircle2, MapPin, AlertCircle } from 'lucide-react';

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
      '\n\nPhases:\n- 22 Nov: PPT Submission Deadline\n- 25 Nov: Phase 1 Shortlist Results\n- 26 Nov: Phase 2 — 24-Hour Hackathon & Live Mentoring\n- 28 Nov: Grand Finale at ' +
      EVENT_CONFIG.venue
    );
    const location = encodeURIComponent(EVENT_CONFIG.venue + ', ' + EVENT_CONFIG.venueAddress);
    // 2026-11-28T09:00:00 to 2026-11-28T18:00:00 (UTC 20261128T033000Z/20261128T123000Z)
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=20261128T033000Z/20261128T123000Z`;
    window.open(gCalUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-[#0c100e] border border-[#2f4a3a] p-6 sm:p-8 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9)] rivet-corner">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#1f2e26]">
          <div>
            <span className="text-[10px] font-mono text-[#c9a227] uppercase tracking-widest block">
              OPERATIONAL DIRECTIVE // ENROLLMENT
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#e2e8e5]">
              Enlist Your Squad for {EVENT_CONFIG.eventName}
            </h3>
            <div className="text-xs font-mono text-[#52635a] flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-[#c9a227]" />
              <span>{EVENT_CONFIG.venue}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#8e9e96] hover:text-[#e2e8e5] text-lg font-mono p-1 transition-colors"
            aria-label="Close registration modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mandatory Screening Alert */}
        <div className="p-3.5 bg-[#14261b] border border-[#2f4a3a] rounded-xl flex items-start gap-2.5 mb-5 text-xs font-mono text-[#4ade80]">
          <AlertCircle className="w-4 h-4 text-[#c9a227] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-[#c9a227] uppercase">Mandatory Requirement:</span> PPT submission by <strong className="text-white">22 November</strong> is mandatory for Phase 1 screening. Shortlisted teams advance to Phase 2.
          </div>
        </div>

        {/* Squad Prerequisites Checklist */}
        <div className="space-y-4 mb-6 text-xs font-mono text-[#8e9e96]">
          {/* Phase Journey & Key Dates */}
          <div className="p-4 bg-[#080b09] border border-[#1b2b22] rounded-xl space-y-2">
            <div className="text-[#e2e8e5] font-semibold flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#c9a227]" />
              <span>Event Timeline & Deadlines:</span>
            </div>
            <ul className="space-y-1.5 text-[#8e9e96]">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c9a227]" />
                <span><strong className="text-[#e2e8e5]">8–22 Nov:</strong> Registration Window (100% Free).</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f87171]" />
                <span><strong className="text-[#f87171]">22 Nov:</strong> PPT Submission Deadline (Mandatory).</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
                <span><strong className="text-[#e2e8e5]">25 Nov:</strong> Phase 1 Shortlist Results Declared.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
                <span><strong className="text-[#38bdf8]">26 Nov:</strong> Phase 2 — 24-Hour Hackathon & Live Mentoring.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c9a227]" />
                <span><strong className="text-[#c9a227]">28 Nov:</strong> Phase 3 — Grand Finale @ Thoughtworks Gurugram.</span>
              </li>
            </ul>
          </div>

          <div className="p-4 bg-[#080b09] border border-[#1b2b22] rounded-xl space-y-2">
            <div className="text-[#e2e8e5] font-semibold flex items-center gap-2">
              <Users className="w-4 h-4 text-[#c9a227]" />
              <span>Squad Composition & Admittance:</span>
            </div>
            <ul className="space-y-1 text-[#8e9e96] list-disc list-inside">
              <li>2 to 4 members per team (cross-college squads welcome).</li>
              <li>100% Free registration — zero fees across all phases.</li>
              <li>Student identity verified during offline check-in on 28 November.</li>
            </ul>
          </div>

          <div className="p-4 bg-[#080b09] border border-[#1b2b22] rounded-xl space-y-2">
            <div className="text-[#e2e8e5] font-semibold flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#c9a227]" />
              <span>Project Idea PPT Requirements:</span>
            </div>
            <ul className="space-y-1 text-[#8e9e96] list-disc list-inside">
              <li>Problem statement, target users, and proposed technical solution.</li>
              <li>System architecture, tech stack & proposed tools.</li>
              <li>Feasibility, expected outcomes, and prototype completion roadmap.</li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <a
            href={EVENT_CONFIG.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-mono font-bold tracking-wider uppercase text-[#0b0d0c] bg-[#c9a227] hover:bg-[#ddb435] shadow-[0_0_20px_rgba(201,162,39,0.3)] transition-all rounded-full"
          >
            <span>Proceed to Registration Portal</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <button
              type="button"
              onClick={handleCalendarExport}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-mono font-semibold text-[#e2e8e5] border border-[#1f2e26] hover:border-[#2f4a3a] hover:text-[#c9a227] bg-[#080b09] transition-all rounded-full"
            >
              <Calendar className="w-4 h-4 text-[#c9a227]" />
              <span>Add to Calendar</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center px-4 py-2.5 text-xs font-mono font-semibold text-[#8e9e96] hover:text-[#e2e8e5] border border-[#1f2e26] hover:border-[#33473c] bg-[#080b09] transition-all rounded-full"
            >
              Review Dossier First
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
