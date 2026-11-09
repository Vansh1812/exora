import React, { useState, useEffect, useRef } from 'react';
import { EVENT_CONFIG } from '../eventConfig';
import { GdgLogoMark } from './GdgLogoMark';

interface FooterProps {
  onOpenRegisterModal: () => void;
}

/**
 * End of File / Sealed Dossier Footer
 * Distinct terminal page of the transmission:
 * - Gradient background #10201a to #0b1511
 * - High contrast WCAG AA palette (#cfd8d2 text, #8fa398 muted, #2f4a3a borders, #c9a227 gold)
 * - Thin gold top rule with centered [END OF FILE] mono stamp (animates 1.15 -> 1.0)
 * - Large cropped EXORA wordmark background texture at 7% opacity
 * - 3 uneven desktop columns (5/3/4) with Dr. Doom blinking eye lines on entry
 * - Pure inline SVGs (zero external icon dependencies)
 * - 48px minimum touch targets on mobile
 * - Respects prefers-reduced-motion
 */
export const Footer: React.FC<FooterProps> = ({ onOpenRegisterModal }) => {
  const [inView, setInView] = useState(false);
  const [blink, setBlink] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  // IntersectionObserver to trigger entry animations once
  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          // Trigger eye line blink once after entry
          const timer = setTimeout(() => {
            setBlink(true);
            setTimeout(() => setBlink(false), 240);
          }, 450);
          observer.disconnect();
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.15 }
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
      id="contact"
      style={
        {
          '--footer-bg-start': '#10201a',
          '--footer-bg-end': '#0b1511',
          '--footer-text': '#cfd8d2',
          '--footer-muted': '#8fa398',
          '--footer-border': '#2f4a3a',
          '--footer-gold': '#c9a227',
        } as React.CSSProperties
      }
      className={`relative w-full overflow-hidden bg-gradient-to-b from-[#10201a] to-[#0b1511] border-t border-[#2f4a3a] text-[#cfd8d2] transition-opacity duration-700 ease-out motion-reduce:transition-none ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 motion-reduce:opacity-100 motion-reduce:translate-y-0'
      }`}
      aria-label="Terminal Dossier Footer"
    >
      {/* 1. Thin Gold Top Rule with Centered Mono Stamp */}
      <div className="relative w-full">
        {/* Continuous hairline gold top rule */}
        <div className="w-full border-t border-[#c9a227]/40" />

        {/* Centered END OF FILE stamp */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
          <div
            className={`font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-[#c9a227] bg-[#10201a] border border-[#c9a227] px-3.5 sm:px-4 py-1 rounded shadow-[0_0_15px_rgba(201,162,39,0.3)] transition-transform duration-500 ease-out select-none whitespace-nowrap motion-reduce:transform-none ${
              inView ? 'scale-100 opacity-100' : 'scale-115 opacity-0 motion-reduce:scale-100 motion-reduce:opacity-100'
            }`}
          >
            END OF FILE // SEALED TRANSMISSION
          </div>
        </div>
      </div>

      {/* 2. Large EXORA Wordmark Background Texture (6-8% opacity, cropped at bottom edge) */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none select-none overflow-hidden h-40 sm:h-52 md:h-64 flex items-end justify-center z-0"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1200 240"
          className="w-full h-auto text-[#c9a227] opacity-[0.07] translate-y-8 sm:translate-y-12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stylized EXORA Wordmark with angular Latverian cuts */}
          <text
            x="50%"
            y="190"
            textAnchor="middle"
            fill="currentColor"
            fontFamily="'Fraunces', Georgia, serif"
            fontWeight="900"
            fontSize="210"
            letterSpacing="0.16em"
          >
            EXORA
          </text>
        </svg>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-12">
        {/* Three Uneven Columns on Desktop (roughly 5/3/4) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-[#2f4a3a]">
          {/* Column 1: Logo + Dr. Doom Blinking Eye Lines + Villain Sign-Off (5 cols) */}
          <div className="lg:col-span-5 space-y-4 text-left">
            {/* Header: GDG Logo + Brand Name with Blinking Eye Lines */}
            <div className="flex items-center gap-3">
              <GdgLogoMark className="w-10 h-7 shrink-0" />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-lg sm:text-xl text-[#cfd8d2] tracking-tight">
                    {EVENT_CONFIG.eventName}
                  </span>
                  {/* Dr. Doom Blinking Optical Sensor Line */}
                  <div
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border border-[#2f4a3a] bg-[#0b1511] transition-transform duration-150 motion-reduce:transform-none ${
                      blink ? 'scale-y-10 opacity-30' : 'scale-y-100 opacity-100'
                    }`}
                    title="Optical telemetry online"
                    aria-label="Dr. Doom Surveillance Eye"
                  >
                    <span className="w-2.5 h-[3px] rounded-full bg-[#c9a227] shadow-[0_0_6px_#c9a227]" />
                    <span className="w-2.5 h-[3px] rounded-full bg-[#c9a227] shadow-[0_0_6px_#c9a227]" />
                  </div>
                </div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#8fa398]">
                  GOOGLE DEVELOPER GROUPS // ABESEC
                </span>
              </div>
            </div>

            {/* One-Line Sign-Off in Villain Voice */}
            <blockquote className="pt-2 border-l-2 border-[#2f4a3a] pl-3.5 text-xs font-mono text-[#8fa398] leading-relaxed max-w-md">
              &ldquo;Doom promises no spectacle without sacrifice. Ship working code before the clock strikes zero, or remain forgotten.&rdquo;
            </blockquote>

            {/* Operational Event Note */}
            <p className="text-[11px] font-mono text-[#8fa398]/80 leading-relaxed max-w-sm pt-1">
              Thoughtworks Technologies, Gurugram // 28 November 2026. Organised by Google Developer Groups on Campus ABESEC.
            </p>
          </div>

          {/* Column 2: Quick Links with Gold Underline Hover/Focus (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5 text-left">
            <div className="text-xs font-mono font-bold tracking-widest text-[#cfd8d2] uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c9a227]" />
              DOSSIER INDEX
            </div>

            <nav aria-label="Footer quick navigation" className="flex flex-col space-y-1">
              {[
                { label: 'About Briefing', href: '#mission' },
                { label: 'Operation Tracks', href: '#tracks' },
                { label: 'Timeline Schedule', href: '#timeline' },
                { label: 'Doom vs Our Plan', href: '#impact' },
                { label: 'Direct Contact', href: '#contact' },
              ].map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="group relative inline-flex items-center min-h-[48px] py-2 text-xs font-mono text-[#8fa398] hover:text-[#cfd8d2] focus:text-[#cfd8d2] focus:outline-none transition-colors"
                >
                  <span className="relative">
                    {link.label}
                    {/* Gold Underline Growing From Left */}
                    <span
                      className="absolute left-0 bottom-0 w-full h-[1.5px] bg-[#c9a227] origin-left scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-300 ease-out motion-reduce:transition-none motion-reduce:scale-x-100"
                      aria-hidden="true"
                    />
                  </span>
                </a>
              ))}

              {/* Gold CTA Action */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onOpenRegisterModal}
                  className="group relative inline-flex items-center justify-center min-h-[48px] px-4 py-2 rounded border border-[#c9a227] bg-[#c9a227]/10 hover:bg-[#c9a227] text-[#c9a227] hover:text-[#0b0d0c] font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-[0_0_12px_rgba(201,162,39,0.15)] hover:shadow-[0_0_20px_rgba(201,162,39,0.45)]"
                >
                  <span>CLAIM YOUR SEAT // REGISTER</span>
                </button>
              </div>
            </nav>
          </div>

          {/* Column 3: Contact & Social Icons (Pure Inline SVG, No Icon Library) (4 cols) */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <div className="text-xs font-mono font-bold tracking-widest text-[#cfd8d2] uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c9a227]" />
              COMMAND & CONTACT
            </div>

            <div className="space-y-3 text-xs font-mono text-[#8fa398]">
              {/* Email */}
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded border border-[#2f4a3a] bg-[#0b1511] flex items-center justify-center shrink-0 text-[#c9a227]">
                  {/* Inline Mail SVG */}
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
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
                  className="group relative hover:text-[#cfd8d2] transition-colors focus:outline-none"
                >
                  <span className="relative">
                    {EVENT_CONFIG.contactEmail}
                    <span
                      className="absolute left-0 bottom-0 w-full h-[1.5px] bg-[#c9a227] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out motion-reduce:scale-x-100"
                      aria-hidden="true"
                    />
                  </span>
                </a>
              </div>

              {/* Venue Location */}
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded border border-[#2f4a3a] bg-[#0b1511] flex items-center justify-center shrink-0 text-[#c9a227]">
                  {/* Inline MapPin SVG */}
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
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
                <span className="text-[#8fa398] leading-tight">
                  {EVENT_CONFIG.contactLocation}
                </span>
              </div>
            </div>

            {/* Social Links with Pure Inline SVGs */}
            <div className="pt-2">
              <div className="text-[10px] font-mono tracking-widest text-[#8fa398] uppercase pb-2">
                COMMUNITY CHANNELS
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                {/* GitHub */}
                <a
                  href="https://github.com/gdscabesec"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GDG ABESEC GitHub"
                  className="min-h-[48px] min-w-[48px] inline-flex items-center justify-center rounded border border-[#2f4a3a] bg-[#0b1511] text-[#8fa398] hover:text-[#c9a227] hover:border-[#c9a227]/60 transition-all focus:outline-none focus:border-[#c9a227]"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/company/gdscabesec"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GDG ABESEC LinkedIn"
                  className="min-h-[48px] min-w-[48px] inline-flex items-center justify-center rounded border border-[#2f4a3a] bg-[#0b1511] text-[#8fa398] hover:text-[#c9a227] hover:border-[#c9a227]/60 transition-all focus:outline-none focus:border-[#c9a227]"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2m1.4 9.74v-8.37H5.06v8.37z" />
                  </svg>
                </a>

                {/* X / Twitter */}
                <a
                  href="https://twitter.com/gdscabesec"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GDG ABESEC X (Twitter)"
                  className="min-h-[48px] min-w-[48px] inline-flex items-center justify-center rounded border border-[#2f4a3a] bg-[#0b1511] text-[#8fa398] hover:text-[#c9a227] hover:border-[#c9a227]/60 transition-all focus:outline-none focus:border-[#c9a227]"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com/gdscabesec"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GDG ABESEC Instagram"
                  className="min-h-[48px] min-w-[48px] inline-flex items-center justify-center rounded border border-[#2f4a3a] bg-[#0b1511] text-[#8fa398] hover:text-[#c9a227] hover:border-[#c9a227]/60 transition-all focus:outline-none focus:border-[#c9a227]"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar in JetBrains Mono: Copyright + Return to Briefing Button */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#8fa398] text-center sm:text-left">
          {/* File Closed Status Bar */}
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <span className="w-2 h-2 rounded-full bg-[#2f4a3a]" />
            <span>&copy; 2026 EXORA // GDG ON CAMPUS ABESEC // FILE CLOSED</span>
          </div>

          {/* Return to Briefing Back-to-Top Button */}
          <button
            type="button"
            onClick={handleScrollToTop}
            className="group inline-flex items-center justify-center min-h-[48px] px-3.5 py-2 rounded border border-[#2f4a3a] bg-[#0b1511] text-[#8fa398] hover:text-[#c9a227] hover:border-[#c9a227]/50 transition-all cursor-pointer focus:outline-none focus:border-[#c9a227]"
            aria-label="Return to top of dossier briefing"
          >
            <span className="relative flex items-center gap-1.5">
              <span>Return to briefing</span>
              {/* Arrow Up SVG */}
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover:-translate-y-0.5 motion-reduce:transform-none"
                aria-hidden="true"
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
              <span
                className="absolute left-0 bottom-0 w-full h-[1px] bg-[#c9a227] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out motion-reduce:scale-x-100"
                aria-hidden="true"
              />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};
