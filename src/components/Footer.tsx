
import React, { useState, useEffect, useRef } from 'react';
import { EVENT_CONFIG } from '../eventConfig';
import { OrbitalLogo } from './OrbitalLogo';
import { Sparkles, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
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

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const target = document.querySelector(href);

    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { label: 'The Build (About)', href: '#mission' },
    { label: 'Choose Your Orbit', href: '#tracks' },
    { label: 'The Walk (Timeline)', href: '#timeline' },
    { label: 'Before vs With Exora', href: '#impact' },
    { label: 'Our Sponsors', href: '#sponsors' },
    { label: 'Prize Pool', href: '#rewards' },
    { label: 'Frequently Asked Questions', href: '#faq' },
  ];

  return (
    <footer
      ref={footerRef}
      id="footer"
      className={`relative w-full bg-gradient-to-b from-[#05030f] via-[#0c0620] to-[#120a2e] border-t border-white/10 text-[#f4f0ff] transition-all duration-700 ease-out motion-reduce:transition-none ${
        inView
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-6 motion-reduce:opacity-100 motion-reduce:translate-y-0'
      }`}
      aria-label="Exora 2.0 Footer"
    >
      {/* Top Accent Line */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#8b5cf6]/60 to-transparent" />

      {/* Background Wordmark */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 pointer-events-none opacity-40 blur-3xl z-0"
        style={{
          background: 'radial-gradient(ellipse 60% 100% at 50% 0%, rgba(139,92,246,0.5), rgba(110,231,249,0.2) 50%, transparent 80%)',
        }}
        aria-hidden="true"
      />

      {/* Bottom Right Warm Amber Thruster Glow */}
      <div
        className="absolute bottom-0 right-0 w-96 h-80 pointer-events-none opacity-25 blur-3xl z-0"
        style={{
          background: 'radial-gradient(circle at 100% 100%, rgba(255,197,138,0.4), rgba(255,111,145,0.2) 40%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      {/* 4. High-Tech Blueprint Coordinate Deck Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.22] z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(139, 92, 246, 0.35) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(139, 92, 246, 0.35) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.4) 75%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.4) 75%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 pt-14 sm:pt-20 pb-10 sm:pb-12 overflow-x-clip">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 sm:pb-14 border-b border-white/10">

          {/* Column 1: Brand */}
          <div className="lg:col-span-5 space-y-5 text-left">

            <div className="flex items-center gap-3">
              <OrbitalLogo showWordmark={true} className="w-10 h-10" />
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-semibold text-white tracking-wide uppercase">
              Beyond the <span className="text-[#ffc58a]">Ordinary.</span>
            </h3>

            <blockquote className="border-l-2 border-[#8b5cf6]/60 pl-4 text-sm sm:text-base font-sans font-medium text-[#d4cce8] leading-relaxed max-w-md">
              "See you in orbit. Three phases. One innovation journey across
              the stars. Build code that endures."
            </blockquote>

            <p className="text-sm font-sans font-medium text-[#bdb3dc] leading-relaxed max-w-sm pt-1">
              A 24-hour hybrid hackathon bringing together creative minds,
              ambitious builders, and innovative ideas.
            </p>

            <div className="pt-2 space-y-2">
              <div className="text-xs font-display font-semibold tracking-[0.16em] text-[#ffc58a] uppercase">
                EVENT DESTINATION
              </div>

              <p className="text-sm font-sans font-medium text-[#c5bddf] leading-relaxed">
                Thoughtworks Technologies, Gurugram
              </p>

              <p className="text-xs sm:text-sm font-sans text-[#a99fcf]">
                27–28 November 2026
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-3 space-y-4 text-left">

            <div className="text-sm font-display font-semibold tracking-[0.16em] text-[#ffc58a] uppercase flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#ffc58a]" />
              <span>EXPLORE EXORA</span>
            </div>

            <nav aria-label="Footer quick navigation" className="flex flex-col space-y-1">
              {[
                { label: 'Exora 2.0 (About)', href: '#mission' },
                { label: 'Choose Your Orbit', href: '#tracks' },
                { label: 'The Walk (Timeline)', href: '#timeline' },
                { label: 'Before vs With Exora', href: '#impact' },
                { label: 'Collaborators & Patrons', href: '#sponsors' },
              ].map((link, idx) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="group relative inline-flex items-center min-h-[44px] py-2 text-sm font-sans font-medium text-[#bdb3dc] hover:text-white focus:text-white focus:outline-none transition-colors duration-200"
                >
                  <span className="relative">
                    {link.label}

                    <span
                      className="absolute left-0 bottom-0 w-full h-[1.5px] bg-gradient-to-r from-[#ffc58a] to-[#e04dff] origin-left scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-300 ease-out motion-reduce:scale-x-100"
                      aria-hidden="true"
                    />
                  </span>
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact and Socials */}
          <div className="lg:col-span-4 space-y-5 text-left">

            <div className="text-sm font-display font-semibold tracking-[0.16em] text-[#6ee7f9] uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#6ee7f9] shadow-[0_0_8px_#6ee7f9]" />
              <span>STAY CONNECTED</span>
            </div>

            <p className="text-sm sm:text-base font-sans font-medium text-[#c5bddf] leading-relaxed">
              Have questions or want to stay updated? Reach out and connect
              with the Exora community.
            </p>

            {/* Contact Details */}
            <div className="space-y-4 text-sm font-sans font-medium text-[#bdb3dc]">

              {/* Email */}
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl border border-white/10 bg-[#120a2e] flex items-center justify-center shrink-0 text-[#ffc58a]">
                  <svg
                    viewBox="0 0 24 24"
                    width="17"
                    height="17"
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
                  className="group relative break-all hover:text-white transition-colors"
                >
                  <span className="relative">
                    {EVENT_CONFIG.contactEmail}
                    <span
                      className="absolute left-0 bottom-0 w-full h-[1.5px] bg-[#ffc58a] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                      aria-hidden="true"
                    />
                  </span>
                </a>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl border border-white/10 bg-[#120a2e] flex items-center justify-center shrink-0 text-[#ffc58a]">
                  <svg
                    viewBox="0 0 24 24"
                    width="17"
                    height="17"
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

                <span className="text-[#c5bddf] leading-relaxed">
                  {EVENT_CONFIG.contactLocation}
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2">
              <div className="text-xs font-display font-semibold tracking-[0.16em] text-[#a99fcf] uppercase pb-3">
                FOLLOW OUR JOURNEY
              </div>

              <div className="flex flex-wrap items-center gap-3">

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/gdg-abesec"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GDG ABESEC LinkedIn"
                  className="min-h-[48px] min-w-[48px] inline-flex items-center justify-center rounded-2xl border border-white/10 bg-[#120a2e] text-[#bdb3dc] hover:text-[#6ee7f9] hover:border-[#6ee7f9]/50 hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:border-[#6ee7f9]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="19"
                    height="19"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2m1.4 9.74v-8.37H5.06v8.37z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/gdg.abesec/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GDG ABESEC Instagram"
                  className="min-h-[48px] min-w-[48px] inline-flex items-center justify-center rounded-2xl border border-white/10 bg-[#120a2e] text-[#bdb3dc] hover:text-[#e04dff] hover:border-[#e04dff]/50 hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:border-[#e04dff]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="19"
                    height="19"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
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
                  className="min-h-[48px] min-w-[48px] inline-flex items-center justify-center rounded-2xl border border-white/10 bg-[#120a2e] text-[#bdb3dc] hover:text-[#ffc58a] hover:border-[#ffc58a]/50 hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:border-[#ffc58a]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative z-10 pt-5 flex flex-col items-center gap-2.5 font-sans text-sm text-[#a99fcf] text-center">

          {/* Copyright Row */}
          <div className="flex items-center gap-2.5 flex-wrap justify-center">
            <span className="w-2 h-2 rounded-full bg-[#6ee7f9] shadow-[0_0_8px_#6ee7f9]" />

            <span className="font-display font-medium tracking-wider text-xs sm:text-sm">
              © 2026 EXORA 2.0
            </span>

            <span className="text-white/20">|</span>

            <span className="text-xs sm:text-sm font-sans font-medium text-[#bdb3dc]">
              GDG ON CAMPUS ABESEC
            </span>
          </div>

          {/* EXORA 2.0 Watermark */}
          <div
            className="w-full flex items-center justify-center overflow-hidden py-0 pointer-events-none select-none"
            aria-hidden="true"
          >
            <div
              className="font-display text-[clamp(3.8rem,17vw,120px)] sm:text-[180px] md:text-[210px] uppercase font-normal tracking-[0.04em] text-transparent leading-none whitespace-nowrap"
              style={{
                WebkitTextStroke: '1.5px rgba(139, 92, 246, 0.22)',
                textShadow: '0 0 40px rgba(139, 92, 246, 0.15)',
              }}
            >
              EXORA 2.0
            </div>
          </div>

          {/* Back to Top */}
          <button
            type="button"
            onClick={handleScrollToTop}
            className="group inline-flex items-center justify-center min-h-[42px] px-5 py-2 rounded-full border border-[#8b5cf6]/40 bg-[#120a2e]/90 backdrop-blur-md text-[#e2d9f5] hover:text-[#ffc58a] hover:border-[#ffc58a]/60 hover:-translate-y-1 transition-all duration-300 cursor-pointer focus:outline-none focus:border-[#ffc58a]"
            aria-label="Return to top"
          >
            <span className="flex items-center gap-2 font-display text-xs sm:text-sm font-medium tracking-wider uppercase">
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-1 motion-reduce:transform-none text-[#ffc58a]" />
            </span>
          </button>

        </div>
      </div>
    </footer>
  );
};
