import React, { useState, useEffect } from 'react';
import { EVENT_CONFIG } from '../eventConfig';
import { OrbitalLogo } from './OrbitalLogo';

interface NavbarProps {
  onOpenRegisterModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();

    setMobileMenuOpen(false);

    // Wait until React has removed the mobile drawer
    window.setTimeout(() => {
      if (href === '#hero') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
        window.history.replaceState(null, '', href);
        return;
      }

      const target = document.querySelector(href) as HTMLElement | null;
      if (!target) return;

      const navHeader = document.querySelector('header');
      const navBottom = navHeader
        ? navHeader.getBoundingClientRect().bottom
        : 60;

      // Measure target section
      const targetRect = target.getBoundingClientRect();
      const targetTop = targetRect.top + window.scrollY;
      const targetHeight = targetRect.height;
      const windowHeight = window.innerHeight;
      const availableHeight = windowHeight - navBottom;

      let targetPosition: number;

      // If the section fits inside the viewport below navbar (e.g. Sponsors, Prizes),
      // center its vertical midpoint directly with the visible screen center!
      if (targetHeight > 0 && targetHeight < availableHeight) {
        const targetCenter = targetTop + targetHeight / 2;
        const visibleCenter = navBottom + availableHeight / 2;
        targetPosition = targetCenter - visibleCenter;
      } else {
        // If content is taller than viewport (e.g. Mission, Timeline),
        // position the first visible content element cleanly 14px below the navbar
        const contentEl =
          (target.firstElementChild as HTMLElement) || target;
        const contentRect = contentEl.getBoundingClientRect();
        const contentTop = contentRect.top + window.scrollY;
        targetPosition = contentTop - navBottom - 14;
      }

      window.scrollTo({
        top: Math.max(0, Math.round(targetPosition)),
        behavior: 'smooth',
      });

      window.history.replaceState(null, '', href);
    }, 100);
  };

  return (
    <div className="sticky top-0 z-40 w-full pt-3 sm:pt-4 px-3 sm:px-4 flex justify-center pointer-events-none">
      {/* Floating Centered Pill Navbar (transparent outer area preserves seamless cosmic background) */}
      <header className="pointer-events-auto relative inline-flex items-center justify-between gap-3 sm:gap-5 lg:gap-7 w-full md:w-auto max-w-5xl rounded-full bg-[#120a2e]/80 backdrop-blur-xl border border-white/15 px-4 sm:px-5 py-1.5 sm:py-2 shadow-[0_12px_40px_rgba(5,3,15,0.65),0_0_24px_rgba(139,92,246,0.16)]">
        {/* Left: Minimal Orbital Mark + EXORA Wordmark */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="flex items-center group shrink-0 select-none py-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b5cf6] rounded-full"
          aria-label={`${EVENT_CONFIG.eventName} Home`}
        >
          <OrbitalLogo className="w-7 h-7 sm:w-8 sm:h-8" />
        </a>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-3.5 lg:gap-6 text-[11px] lg:text-[12px] font-display font-semibold uppercase tracking-[0.12em] text-[#f0eaff]">
          <a
            href="#mission"
            onClick={(e) => handleNavClick(e, '#mission')}
            className="hover:text-[#ffc58a] transition-colors whitespace-nowrap focus:outline-none focus-visible:text-[#ffc58a]"
          >
            THE BUILD
          </a>
          <a
            href="#tracks"
            onClick={(e) => handleNavClick(e, '#tracks')}
            className="hover:text-[#ffc58a] transition-colors whitespace-nowrap focus:outline-none focus-visible:text-[#ffc58a]"
          >
            ORBITS
          </a>
          <a
            href="#timeline"
            onClick={(e) => handleNavClick(e, '#timeline')}
            className="hover:text-[#ffc58a] transition-colors whitespace-nowrap focus:outline-none focus-visible:text-[#ffc58a]"
          >
            THE WALK
          </a>
          <a
            href="#impact"
            onClick={(e) => handleNavClick(e, '#impact')}
            className="hover:text-[#ffc58a] transition-colors whitespace-nowrap focus:outline-none focus-visible:text-[#ffc58a]"
          >
            IMPACT
          </a>
          <a
            href="#sponsors"
            onClick={(e) => handleNavClick(e, '#sponsors')}
            className="hover:text-[#ffc58a] transition-colors whitespace-nowrap focus:outline-none focus-visible:text-[#ffc58a]"
          >
            PATRONS
          </a>
          <a
            href="#rewards"
            onClick={(e) => handleNavClick(e, '#rewards')}
            className="hover:text-[#ffc58a] transition-colors whitespace-nowrap focus:outline-none focus-visible:text-[#ffc58a]"
          >
            PRIZE MONEY
          </a>
        </nav>

        {/* Right: Register Primary Pill Button + Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Primary Action Button (Desktop): Peach-to-Orange Gradient Pill */}
          <a
            href={EVENT_CONFIG.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center justify-center px-5 lg:px-6 py-2 min-h-[40px] rounded-full text-xs lg:text-[13px] font-display font-semibold tracking-[0.13em] uppercase text-[#05030f] bg-gradient-to-r from-[#ffd09f] to-[#ff9a3c] hover:from-[#ffdbb5] hover:to-[#ffad5f] shadow-[0_0_20px_rgba(255,154,60,0.4)] hover:shadow-[0_0_28px_rgba(255,154,60,0.6)] transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e04dff] active:scale-95 whitespace-nowrap"
          >
            <span>REGISTER</span>
          </a>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-[#a99fcf] hover:text-[#ffc58a] hover:bg-[#120a2e] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b5cf6]"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="pointer-events-none md:hidden absolute left-0 right-0 top-full px-4 pt-2">
          <div className="pointer-events-auto max-w-sm mx-auto rounded-3xl border border-white/15 bg-[#120a2e]/95 backdrop-blur-xl p-5 space-y-2 text-center font-display text-xs uppercase tracking-[0.16em] text-[#a99fcf] shadow-[0_20px_50px_rgba(5,3,15,0.9)]">
            <div className="pb-3 border-b border-white/10 text-xs sm:text-sm font-semibold text-[#ffc58a] tracking-[0.2em]">
              ORBITAL NAVIGATION
            </div>
            <a
              href="#mission"
              onClick={(e) => handleNavClick(e, '#mission')}
              className="block py-3 rounded-xl text-sm sm:text-base font-semibold tracking-[0.13em] text-[#e2d9f5] hover:bg-white/5 hover:text-[#ffc58a] transition-all duration-200"
            >
              THE BUILD
            </a>
            <a
              href="#tracks"
              onClick={(e) => handleNavClick(e, '#tracks')}
              className="block py-3 rounded-xl text-sm sm:text-base font-semibold tracking-[0.13em] text-[#e2d9f5] hover:bg-white/5 hover:text-[#ffc58a] transition-all duration-200"
            >
              CHOOSE YOUR ORBIT
            </a>
            <a
              href="#timeline"
              onClick={(e) => handleNavClick(e, '#timeline')}
              className="block py-3 rounded-xl text-sm sm:text-base font-semibold tracking-[0.13em] text-[#e2d9f5] hover:bg-white/5 hover:text-[#ffc58a] transition-all duration-200"
            >
              THE WALK TIMELINE
            </a>
            <a
              href="#impact"
              onClick={(e) => handleNavClick(e, '#impact')}
              className="block py-3 rounded-xl text-sm sm:text-base font-semibold tracking-[0.13em] text-[#e2d9f5] hover:bg-white/5 hover:text-[#ffc58a] transition-all duration-200"
            >
              BEFORE VS WITH EXORA
            </a>
            <a
              href="#sponsors"
              onClick={(e) => handleNavClick(e, '#sponsors')}
              className="block py-3 rounded-xl text-sm sm:text-base font-semibold tracking-[0.13em] text-[#e2d9f5] hover:bg-white/5 hover:text-[#ffc58a] transition-all duration-200"
            >
              PATRONS & COLLABORATORS
            </a>
            <a
              href="#rewards"
              onClick={(e) => handleNavClick(e, '#rewards')}
              className="block py-3 rounded-xl text-sm sm:text-base font-semibold tracking-[0.13em] text-[#e2d9f5] hover:bg-white/5 hover:text-[#ffc58a] transition-all duration-200"
            >
              PRIZE MONEY
            </a>

            <div className="pt-3 border-t border-white/10">
              <a
                href={EVENT_CONFIG.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-3.5 text-center rounded-full text-sm font-display font-bold uppercase tracking-[0.15em] text-[#1a0b08] bg-gradient-to-r from-[#ffd09f] via-[#ffb66f] to-[#ff9638] border border-[#ffe0bd]/70 shadow-[0_0_12px_rgba(255,197,138,0.35),0_0_28px_rgba(255,154,60,0.3)] hover:shadow-[0_0_18px_rgba(255,197,138,0.55),0_0_35px_rgba(255,154,60,0.4)] transition-all duration-300 cursor-pointer active:scale-[0.98]"
              >
                REGISTER FOR EXORA 2.0
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
