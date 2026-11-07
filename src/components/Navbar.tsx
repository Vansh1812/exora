import React, { useState, useEffect } from 'react';
import { EVENT_CONFIG } from '../eventConfig';
import { GdgLogoMark } from './GdgLogoMark';

interface NavbarProps {
  onOpenRegisterModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRegisterModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
      {/* Floating Tactical Pill Header (Inspired by Exora & GDG Brand Identity) */}
      <header className="pointer-events-auto max-w-4xl mx-auto rounded-full border border-[#2f4a3a]/70 bg-[#0a0f0d]/90 backdrop-blur-md px-4 sm:px-6 py-2 shadow-[0_12px_40px_rgba(0,0,0,0.85)] flex items-center justify-between gap-4 transition-all hover:border-[#c9a227]/40">
        {/* Left: Official GDG < > Insignia */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="flex items-center group shrink-0 select-none py-0.5"
          aria-label={`${EVENT_CONFIG.eventName} Home`}
        >
          {/* Authentic Google Developer Groups < > Brackets Logo */}
          <GdgLogoMark className="w-10 h-7 sm:w-11 sm:h-8 transition-transform group-hover:scale-105" />
        </a>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-[11px] font-mono tracking-widest uppercase text-[#8e9e96]">
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

        {/* Right: Desktop Register CTA Button + Mobile 3-Line Hamburger Icon */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Desktop Gold CTA */}
          <button
            type="button"
            onClick={onOpenRegisterModal}
            className="hidden sm:inline-flex button-metallic-sheen px-5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-[#0b0d0c] bg-[#c9a227] hover:bg-[#ddb435] shadow-[0_0_15px_rgba(201,162,39,0.35)] transition-all active:scale-95 whitespace-nowrap cursor-pointer"
          >
            REGISTER
          </button>

          {/* Elegant 3-Line Hamburger Menu Icon (Directly matches image_d1fdd409.png reference) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-white hover:text-[#c9a227] transition-colors focus:outline-none flex items-center justify-center cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="w-5 h-5 text-white transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden mt-2 max-w-sm mx-auto rounded-2xl border border-[#2f4a3a] bg-[#0c120f]/95 backdrop-blur-md p-4 space-y-2 text-center font-mono text-xs uppercase tracking-wider text-[#8e9e96] shadow-[0_20px_50px_rgba(0,0,0,0.9)] rivet-corner">
          <div className="pb-2 border-b border-[#1b2b22] text-[10px] text-[#c9a227] tracking-widest">
            OPERATIONAL NAVIGATION
          </div>
          <a
            href="#mission"
            onClick={(e) => handleNavClick(e, '#mission')}
            className="block py-2 rounded-lg hover:bg-[#142019] hover:text-[#c9a227] transition-colors"
          >
            ABOUT / THE MISSION
          </a>
          <a
            href="#tracks"
            onClick={(e) => handleNavClick(e, '#tracks')}
            className="block py-2 rounded-lg hover:bg-[#142019] hover:text-[#c9a227] transition-colors"
          >
            OPERATIONAL TRACKS
          </a>
          <a
            href="#timeline"
            onClick={(e) => handleNavClick(e, '#timeline')}
            className="block py-2 rounded-lg hover:bg-[#142019] hover:text-[#c9a227] transition-colors"
          >
            EVENT TIMELINE
          </a>
          <a
            href="#impact"
            onClick={(e) => handleNavClick(e, '#impact')}
            className="block py-2 rounded-lg hover:bg-[#142019] hover:text-[#c9a227] transition-colors"
          >
            DOOM VS OUR PLAN
          </a>
          <a
            href="#sponsors"
            onClick={(e) => handleNavClick(e, '#sponsors')}
            className="block py-2 rounded-lg hover:bg-[#142019] hover:text-[#c9a227] transition-colors"
          >
            SPONSORS & ALLIES
          </a>
          <a
            href="#rewards"
            onClick={(e) => handleNavClick(e, '#rewards')}
            className="block py-2 rounded-lg hover:bg-[#142019] hover:text-[#c9a227] transition-colors"
          >
            PRIZE REWARDS
          </a>
          <a
            href="#faq"
            onClick={(e) => handleNavClick(e, '#faq')}
            className="block py-2 rounded-lg hover:bg-[#142019] hover:text-[#c9a227] transition-colors"
          >
            FREQUENTLY ASKED
          </a>

          <div className="pt-2 border-t border-[#1b2b22]">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegisterModal();
              }}
              className="w-full py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-[#0b0d0c] bg-[#c9a227] hover:bg-[#ddb435] shadow-[0_0_15px_rgba(201,162,39,0.35)] transition-all cursor-pointer"
            >
              REGISTER FOR EXORA 2.0
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
