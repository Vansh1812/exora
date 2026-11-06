import React from 'react';
import { EVENT_CONFIG } from '../eventConfig';
import { Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onOpenRegisterModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenRegisterModal }) => {
  return (
    <footer className="border-t border-[#1f2e26] bg-[#070a08] pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-xs font-mono text-[#52635a]">
      <div className="max-w-6xl mx-auto">
        {/* 3-Column Layout (Matching image_a5bf6392.png) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#1f2e26]">
          {/* Column 1: Google Branding & Collaboration (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-2xl text-[#e2e8e5] tracking-tight">
                Google
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#8e9e96] pt-1">
                DEVELOPER GROUPS
              </span>
            </div>
            <div className="text-sm font-semibold text-[#8e9e96] tracking-wider uppercase">
              EXORA 2.0 // THOUGHTWORKS TECHNOLOGIES, GURUGRAM
            </div>
            <div className="text-xs text-[#52635a]">
              {EVENT_CONFIG.collaborationWith}
            </div>
            <p className="text-[11px] text-[#3f5247] pt-2 max-w-sm">
              Google Developer Groups (GDG) is an independent tech community. Latverian dossier transmission aesthetic is styled as an immersive creative engineering homage.
            </p>
          </div>

          {/* Column 2: Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono font-bold tracking-widest text-[#c9a227] uppercase">
              QUICK LINKS
            </div>
            <ul className="space-y-2 text-xs text-[#8e9e96]">
              <li>
                <a href="#hero" className="hover:text-[#c9a227] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#mission" className="hover:text-[#c9a227] transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#timeline" className="hover:text-[#c9a227] transition-colors">
                  Timeline
                </a>
              </li>
              <li>
                <a href="#sponsors" className="hover:text-[#c9a227] transition-colors">
                  Sponsors
                </a>
              </li>
              <li>
                <a href="#rewards" className="hover:text-[#c9a227] transition-colors">
                  Rewards
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#c9a227] transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenRegisterModal}
                  className="text-[#c9a227] hover:underline uppercase font-bold"
                >
                  Register Now
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <div className="text-xs font-mono font-bold tracking-widest text-[#c9a227] uppercase">
              CONTACT
            </div>
            <div className="space-y-3 text-xs text-[#8e9e96]">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#c9a227] shrink-0" />
                <a
                  href={`mailto:${EVENT_CONFIG.contactEmail}`}
                  className="hover:text-[#c9a227] transition-colors"
                >
                  {EVENT_CONFIG.contactEmail}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#c9a227] shrink-0" />
                <span>{EVENT_CONFIG.contactLocation}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              {EVENT_CONFIG.socialLinks.map((s, idx) => (
                <a
                  key={idx}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-mono text-[#52635a] hover:text-[#c9a227] transition-colors border border-[#1b2b22] px-2 py-1 rounded"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Tagline Quote (Matching image_a5bf6392.png) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#52635a]">
          <div>
            © 2026 {EVENT_CONFIG.eventName}: {EVENT_CONFIG.eventTaglineMain} — {EVENT_CONFIG.collegeName}
          </div>
          <div className="italic text-[#c9a227]/90 font-display text-xs">
            {EVENT_CONFIG.footerQuote}
          </div>
        </div>
      </div>
    </footer>
  );
};
