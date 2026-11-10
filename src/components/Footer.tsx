import React, { useState, useEffect, useRef } from 'react';
import { EVENT_CONFIG } from '../eventConfig';
import { OrbitalLogo } from './OrbitalLogo';
import { Sparkles, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenRegisterModal?: () => void;
}

/**
 * Orbital Walk Closing Footer ("The Final Orbit")
 * Re-themed to "The Walk Between Worlds":
 * - Pure celestial theme: deep cosmic base #05030f to #120a2e
 * - Large Trench EXORA wordmark background texture at 7% opacity
 * - 3 clean desktop columns: Brand & cosmic sign-off, Orbit quick links, Signals & verified socials
 * - Verified community channels: LinkedIn, X (Twitter), Instagram (GitHub removed)
 * - Bottom bar: (c) 2026 EXORA // GDG ON CAMPUS ABESEC with "Return to launch" back-to-top button
 * - No Doom, no stamps, no rivets, no "claim your seat" in footer
 */
export const Footer: React.FC<FooterProps> = () => {
  const [inView, setInView] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      id="footer"
      className={`relative w-full bg-gradient-to-b from-[#05030f] via-[#0c0620] to-[#120a2e] border-t border-white/10 text-[#f4f0ff] transition-opacity duration-700 ease-out motion-reduce:transition-none ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 motion-reduce:opacity-100 motion-reduce:translate-y-0'
      }`}
      aria-label="Orbital Walk Footer"
    >
      {/* 1. Subtle Violet/Peach Top Accent Line */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#8b5cf6]/50 to-transparent" />

      {/* 2. Large EXORA Wordmark Background Texture (Trench Font, 7% opacity) */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none select-none overflow-hidden h-40 sm:h-52 md:h-64 flex items-end justify-center z-0"
        aria-hidden="true"
      >
        <div className="font-display text-[120px] sm:text-[180px] md:text-[220px] uppercase font-normal tracking-[0.08em] text-[#8b5cf6] opacity-[0.06] translate-y-10 sm:translate-y-16 leading-none whitespace-nowrap">
          EXORA 2.0
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-12">
        {/* Three Columns on Desktop (roughly 5/3/4) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          {/* Column 1: Logo + Celestial Sign-Off (5 cols) */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <div className="flex items-center gap-3">
              <OrbitalLogo showWordmark={true} className="w-9 h-9" />
            </div>

            {/* Poetic Celestial Sign-Off */}
            <blockquote className="pt-2 border-l-2 border-[#8b5cf6]/50 pl-3.5 text-sm font-sans font-light text-[#f4f0ff]/90 leading-relaxed max-w-md">
              &ldquo;See you in orbit. Three phases. One innovation journey across the stars. Build code that endures.&rdquo;
            </blockquote>

            {/* Operational Event Note */}
            <p className="text-[11px] font-sans text-[#a99fcf] leading-relaxed max-w-sm pt-1">
              Thoughtworks Technologies, Gurugram // 28-29 November 2026. Organised by Google Developer Groups on Campus ABESEC.
            </p>
          </div>

          {/* Column 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5 text-left">
            <div className="text-xs font-display tracking-[0.2em] text-[#ffc58a] uppercase flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#ffc58a]" />
              <span>ORBITAL INDEX</span>
            </div>

            <nav aria-label="Footer quick navigation" className="flex flex-col space-y-1">
              {[
                { label: 'The Build (About)', href: '#mission' },
                { label: 'Choose Your Orbit', href: '#tracks' },
                { label: 'The Walk (Timeline)', href: '#timeline' },
                { label: 'Before vs With Exora', href: '#impact' },
                { label: 'Collaborators & Patrons', href: '#sponsors' },
              ].map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="group relative inline-flex items-center min-h-[44px] py-1.5 text-xs font-sans text-[#a99fcf] hover:text-[#f4f0ff] focus:text-[#f4f0ff] focus:outline-none transition-colors"
                >
                  <span className="relative">
                    {link.label}
                    {/* Peach/Pink Underline Growing From Left */}
                    <span
                      className="absolute left-0 bottom-0 w-full h-[1.5px] bg-gradient-to-r from-[#ffc58a] to-[#e04dff] origin-left scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-300 ease-out motion-reduce:scale-x-100"
                      aria-hidden="true"
                    />
                  </span>
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact & Verified Social Channels (4 cols) */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <div className="text-xs font-display tracking-[0.2em] text-[#6ee7f9] uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6ee7f9]" />
              SIGNAL & CHANNELS
            </div>

            <div className="space-y-3 text-xs font-sans text-[#a99fcf]">
              {/* Email */}
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl border border-white/10 bg-[#120a2e] flex items-center justify-center shrink-0 text-[#ffc58a]">
                  <svg
                    viewBox="0 0 24 24"
                    width="15"
                    height="15"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <a
                  href={`mailto:${EVENT_CONFIG.contactEmail}`}
                  className="group relative hover:text-[#f4f0ff] transition-colors focus:outline-none"
                >
                  <span className="relative">
                    {EVENT_CONFIG.contactEmail}
                    <span
                      className="absolute left-0 bottom-0 w-full h-[1.5px] bg-[#ffc58a] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out motion-reduce:scale-x-100"
                      aria-hidden="true"
                    />
                  </span>
                </a>
              </div>

              {/* Venue Location */}
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl border border-white/10 bg-[#120a2e] flex items-center justify-center shrink-0 text-[#ffc58a]">
                  <svg
                    viewBox="0 0 24 24"
                    width="15"
                    height="15"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <span className="text-[#a99fcf] leading-tight">
                  {EVENT_CONFIG.contactLocation}
                </span>
              </div>
            </div>

            {/* Social Links: LinkedIn, Instagram, Twitter (GitHub removed per request) */}
            <div className="pt-2">
              <div className="text-[10px] font-display tracking-[0.16em] text-[#a99fcf] uppercase pb-2">
                TRANSMISSION FEEDS
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/gdg-abesec/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GDG ABESEC LinkedIn"
                  className="min-h-[48px] min-w-[48px] inline-flex items-center justify-center rounded-2xl border border-white/10 bg-[#120a2e] text-[#a99fcf] hover:text-[#6ee7f9] hover:border-[#6ee7f9]/50 transition-all focus:outline-none focus:border-[#6ee7f9]"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2m1.4 9.74v-8.37H5.06v8.37z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/gdg.abesec/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GDG ABESEC Instagram"
                  className="min-h-[48px] min-w-[48px] inline-flex items-center justify-center rounded-2xl border border-white/10 bg-[#120a2e] text-[#a99fcf] hover:text-[#e04dff] hover:border-[#e04dff]/50 transition-all focus:outline-none focus:border-[#e04dff]"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>

                {/* X / Twitter */}
                <a
                  href="https://x.com/gdgabesec"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GDG ABESEC X (Twitter)"
                  className="min-h-[48px] min-w-[48px] inline-flex items-center justify-center rounded-2xl border border-white/10 bg-[#120a2e] text-[#a99fcf] hover:text-[#ffc58a] hover:border-[#ffc58a]/50 transition-all focus:outline-none focus:border-[#ffc58a]"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright + Return to Launch Button */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs text-[#a99fcf] text-center sm:text-left">
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <span className="w-2 h-2 rounded-full bg-[#6ee7f9] shadow-[0_0_8px_#6ee7f9]" />
            <span className="font-display tracking-wider text-[11px]">&copy; 2026 EXORA // GDG ON CAMPUS ABESEC</span>
          </div>

          {/* Return to Launch Button */}
          <button
            type="button"
            onClick={handleScrollToTop}
            className="group inline-flex items-center justify-center min-h-[44px] px-4 py-2 rounded-full border border-white/10 bg-[#120a2e]/70 text-[#a99fcf] hover:text-[#f4f0ff] hover:border-[#8b5cf6]/50 transition-all cursor-pointer focus:outline-none focus:border-[#8b5cf6]"
            aria-label="Return to launch"
          >
            <span className="relative flex items-center gap-1.5 font-display text-xs tracking-wider uppercase">
              <span>Return to launch</span>
              <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 motion-reduce:transform-none text-[#ffc58a]" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};
