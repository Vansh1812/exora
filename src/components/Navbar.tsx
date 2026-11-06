import React, { useState } from 'react';
import { EVENT_CONFIG } from '../eventConfig';

interface NavbarProps {
  onOpenRegisterModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRegisterModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-4 z-40 w-full px-4 sm:px-6 pointer-events-none">
      <header className="pointer-events-auto max-w-4xl mx-auto rounded-full border border-[#2f4a3a]/60 bg-[#0d120f]/85 backdrop-blur-md px-4 sm:px-6 py-2.5 shadow-[0_10px_35px_rgba(0,0,0,0.85)] flex items-center justify-between gap-4 transition-all">
        {/* Left: Custom Latverian / GDG Geometric Insignia */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="flex items-center gap-2.5 font-display font-bold text-sm sm:text-base text-[#e2e8e5] hover:text-[#c9a227] transition-colors whitespace-nowrap shrink-0 group"
          aria-label="Exora 2.0 Home"
        >
          <div className="w-8 h-8 rounded-full bg-[#141e18] border border-[#2f4a3a] group-hover:border-[#c9a227] flex items-center justify-center transition-colors">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
              <path
                d="M12 2L4 7v6c0 5 8 9 8 9s8-4 8-9V7l-8-5z"
                fill="#1c2b22"
                stroke="#c9a227"
                strokeWidth="1.5"
              />
              <path d="M8 12h2.5m3 0H16" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <span className="tracking-tight">{EVENT_CONFIG.eventName}</span>
        </a>

        {/* Center: Clean Uppercase Nav Links */}
        <nav className="hidden md:flex items-center gap-5 sm:gap-6 text-[11px] font-mono tracking-widest uppercase text-[#8e9e96]">
          <a
            href="#mission"
            onClick={(e) => handleNavClick(e, '#mission')}
            className="hover:text-[#c9a227] transition-colors whitespace-nowrap"
          >
            ABOUT
          </a>
          <a
            href="#tracks"
            onClick={(e) => handleNavClick(e, '#tracks')}
            className="hover:text-[#c9a227] transition-colors whitespace-nowrap"
          >
            TRACKS
          </a>
          <a
            href="#timeline"
            onClick={(e) => handleNavClick(e, '#timeline')}
            className="hover:text-[#c9a227] transition-colors whitespace-nowrap"
          >
            TIMELINE
          </a>
          <a
            href="#impact"
            onClick={(e) => handleNavClick(e, '#impact')}
            className="hover:text-[#c9a227] transition-colors whitespace-nowrap"
          >
            IMPACT
          </a>
          <a
            href="#sponsors"
            onClick={(e) => handleNavClick(e, '#sponsors')}
            className="hover:text-[#c9a227] transition-colors whitespace-nowrap"
          >
            SPONSORS
          </a>
          <a
            href="#rewards"
            onClick={(e) => handleNavClick(e, '#rewards')}
            className="hover:text-[#c9a227] transition-colors whitespace-nowrap"
          >
            REWARDS
          </a>
          <a
            href="#faq"
            onClick={(e) => handleNavClick(e, '#faq')}
            className="hover:text-[#c9a227] transition-colors whitespace-nowrap"
          >
            FAQ
          </a>
        </nav>

        {/* Right: Register CTA Pill Button + Mobile Hamburger */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onOpenRegisterModal}
            className="button-metallic-sheen px-4 sm:px-5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-[#0b0d0c] bg-[#c9a227] hover:bg-[#ddb435] shadow-[0_0_15px_rgba(201,162,39,0.35)] transition-all active:scale-95 whitespace-nowrap"
          >
            REGISTER
          </button>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-[#8e9e96] hover:text-[#e2e8e5] border border-[#2f4a3a]/60 rounded-full"
            aria-label="Toggle menu"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden mt-2 max-w-sm mx-auto rounded-2xl border border-[#2f4a3a] bg-[#0c110e]/95 backdrop-blur-md p-4 space-y-2 text-center font-mono text-xs uppercase tracking-wider text-[#8e9e96] shadow-2xl">
          <a
            href="#mission"
            onClick={(e) => handleNavClick(e, '#mission')}
            className="block py-1.5 hover:text-[#c9a227]"
          >
            ABOUT / THE MISSION
          </a>
          <a
            href="#tracks"
            onClick={(e) => handleNavClick(e, '#tracks')}
            className="block py-1.5 hover:text-[#c9a227]"
          >
            OPERATIONAL TRACKS
          </a>
          <a
            href="#timeline"
            onClick={(e) => handleNavClick(e, '#timeline')}
            className="block py-1.5 hover:text-[#c9a227]"
          >
            EVENT TIMELINE
          </a>
          <a
            href="#impact"
            onClick={(e) => handleNavClick(e, '#impact')}
            className="block py-1.5 hover:text-[#c9a227]"
          >
            DOOM VS OUR PLAN
          </a>
          <a
            href="#sponsors"
            onClick={(e) => handleNavClick(e, '#sponsors')}
            className="block py-1.5 hover:text-[#c9a227]"
          >
            SPONSORS & ALLIES
          </a>
          <a
            href="#rewards"
            onClick={(e) => handleNavClick(e, '#rewards')}
            className="block py-1.5 hover:text-[#c9a227]"
          >
            PRIZE REWARDS
          </a>
          <a
            href="#faq"
            onClick={(e) => handleNavClick(e, '#faq')}
            className="block py-1.5 hover:text-[#c9a227]"
          >
            FREQUENTLY ASKED
          </a>
        </div>
      )}
    </div>
  );
};
