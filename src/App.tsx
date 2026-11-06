/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy, useState } from 'react';
import { BootScreen } from './components/BootScreen';
import { Cursor } from './components/Cursor';
import { SectionShutter } from './components/SectionShutter';
import { EasterEggModal, useDoomEasterEgg } from './components/EasterEggModal';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RegistrationModal } from './components/RegistrationModal';
import { CustomizationGuideDrawer } from './components/CustomizationGuideDrawer';

// Lazy-load below-the-fold sections
const MissionSection = lazy(() =>
  import('./components/MissionSection').then((module) => ({ default: module.MissionSection }))
);
const TracksSection = lazy(() =>
  import('./components/TracksSection').then((module) => ({ default: module.TracksSection }))
);
const SinuousTimeline = lazy(() =>
  import('./components/SinuousTimeline').then((module) => ({ default: module.SinuousTimeline }))
);
const DoomVersusPlan = lazy(() =>
  import('./components/DoomVersusPlan').then((module) => ({ default: module.DoomVersusPlan }))
);
const CollaboratorsMarquee = lazy(() =>
  import('./components/CollaboratorsMarquee').then((module) => ({ default: module.CollaboratorsMarquee }))
);
const ExoraPrizes = lazy(() =>
  import('./components/ExoraPrizes').then((module) => ({ default: module.ExoraPrizes }))
);
const ExoraFAQ = lazy(() =>
  import('./components/ExoraFAQ').then((module) => ({ default: module.ExoraFAQ }))
);
const Footer = lazy(() =>
  import('./components/Footer').then((module) => ({ default: module.Footer }))
);

/**
 * Minimal low-latency skeleton placeholder for lazy-loaded dossier sections
 */
const DossierSectionSkeleton: React.FC<{ label: string }> = ({ label }) => (
  <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-b border-[#1f2e26]/50">
    <div className="border border-[#1f2e26] bg-[#0c100e]/40 p-8 rounded-2xl animate-pulse flex flex-col items-center justify-center min-h-[220px] text-center">
      <div className="w-6 h-6 border-2 border-[#2f4a3a] border-t-[#c9a227] rounded-full animate-spin mb-4" />
      <div className="text-xs font-mono tracking-widest text-[#52635a] uppercase">
        DECRYPTING EXORA 2.0 // {label}
      </div>
    </div>
  </div>
);

export default function App() {
  const [bootCompleted, setBootCompleted] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isEasterEggOpen, setIsEasterEggOpen] = useState(false);

  // Keyboard shortcut listener: typing "DOOM" anywhere reveals easter egg
  useDoomEasterEgg(() => setIsEasterEggOpen(true));

  return (
    <div className="relative min-h-screen bg-[#0b0d0c] text-[#8e9e96] dossier-grid overflow-x-hidden selection:bg-[#c9a227]/25 selection:text-[#f8fafc]">
      {/* 1. Boot Sequence (Max 2s, cached in sessionStorage, skippable) */}
      {!bootCompleted && <BootScreen onComplete={() => setBootCompleted(true)} />}

      {/* 2. Desktop Custom Reticle Crosshair Cursor */}
      <Cursor />

      {/* 3. Film Grain Texture Overlay */}
      <div className="film-grain" aria-hidden="true" />

      {/* 4. Skip to Content Link for Keyboard Accessibility */}
      <a
        href="#mission"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#c9a227] text-[#0b0d0c] font-mono text-xs font-bold rounded-full shadow-xl"
      >
        Skip to main content
      </a>

      {/* 5. Floating Centered Pill Navbar with Audio Toggle */}
      <Navbar onOpenRegisterModal={() => setIsRegisterModalOpen(true)} />

      {/* Main Content Area */}
      <main id="main-content">
        {/* Section 0: Hero with Redaction Bar, Clock Ticks, and Push-Through Scroll */}
        <Hero
          onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
          onTriggerEasterEgg={() => setIsEasterEggOpen(true)}
        />

        <SectionShutter />

        {/* Section 1: The Mission & Bento Grid (Steel plate slide-in, stamp hits, screen shake) */}
        <Suspense fallback={<DossierSectionSkeleton label="THE MISSION" />}>
          <MissionSection />
        </Suspense>

        <SectionShutter />

        {/* Section 1.5: Hackathon Tracks / Choose Your Operation */}
        <Suspense fallback={<DossierSectionSkeleton label="CHOOSE YOUR OPERATION" />}>
          <TracksSection />
        </Suspense>

        <SectionShutter />

        {/* Section 2: Event Timeline (Scroll-drawn SVG line, typewriter headers, past node dimming) */}
        <Suspense fallback={<DossierSectionSkeleton label="EVENT TIMELINE" />}>
          <SinuousTimeline />
        </Suspense>

        <SectionShutter />

        {/* Section 3: Impact (Doom's Plan vs Our Plan - scroll wipe & keyboard slider) */}
        <Suspense fallback={<DossierSectionSkeleton label="DOOM VS OUR PLAN" />}>
          <DoomVersusPlan onOpenRegisterModal={() => setIsRegisterModalOpen(true)} />
        </Suspense>

        <SectionShutter />

        {/* Section 4: Collaborators & Ecosystem Marquee */}
        <Suspense fallback={<DossierSectionSkeleton label="COLLABORATORS" />}>
          <CollaboratorsMarquee />
        </Suspense>

        <SectionShutter />

        {/* Section 5: Prize Rewards (3-Card Podium with RGB glitch & Top Reward) */}
        <Suspense fallback={<DossierSectionSkeleton label="PRIZE REWARDS" />}>
          <ExoraPrizes />
        </Suspense>

        <SectionShutter />

        {/* Section 6: Frequently Asked Questions (Hairline Accordion with RGB glitch) */}
        <Suspense fallback={<DossierSectionSkeleton label="FREQUENTLY ASKED" />}>
          <ExoraFAQ />
        </Suspense>
      </main>

      <SectionShutter />

      {/* Footer */}
      <Suspense fallback={<div className="h-24 bg-[#070a08]" />}>
        <Footer onOpenRegisterModal={() => setIsRegisterModalOpen(true)} />
      </Suspense>

      {/* Interactive Registration Modal */}
      <RegistrationModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />

      {/* Secret Easter Egg Modal (3 eye clicks or typing "DOOM") */}
      <EasterEggModal
        isOpen={isEasterEggOpen}
        onClose={() => setIsEasterEggOpen(false)}
      />

      {/* Live Customization Drawer Helper */}
      <CustomizationGuideDrawer />
    </div>
  );
}
