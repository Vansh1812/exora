/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BootScreen } from './components/BootScreen';
import { Cursor } from './components/Cursor';
import { SectionShutter } from './components/SectionShutter';
import { EasterEggModal, useOrbitalEasterEgg } from './components/EasterEggModal';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RegistrationModal } from './components/RegistrationModal';
import { DynamicStarfield } from './components/DynamicStarfield';

import { MissionSection } from './components/MissionSection';
import { TracksSection } from './components/TracksSection';
import { SinuousTimeline } from './components/SinuousTimeline';
import { DoomVersusPlan } from './components/DoomVersusPlan';
import { CollaboratorsMarquee } from './components/CollaboratorsMarquee';
import { ExoraPrizes } from './components/ExoraPrizes';
import { ExoraFAQ } from './components/ExoraFAQ';
import { Footer } from './components/Footer';

export default function App() {
  const [bootCompleted, setBootCompleted] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isEasterEggOpen, setIsEasterEggOpen] = useState(false);

  // Keyboard shortcut listener: typing "EXORA" or "ORBIT" unlocks transmission
  useOrbitalEasterEgg(() => setIsEasterEggOpen(true));

  return (
    <div className="relative min-h-screen bg-[#05030f] text-[#f4f0ff] overflow-x-hidden selection:bg-[#8b5cf6]/30 selection:text-[#ffffff]">
      {/* Interactive Starlight Cursor */}
      <Cursor />

      {/* Background System: 3 Large Soft Radial Glows Drifting Slowly (Transform Only) */}
      <div className="cosmic-glow-system" aria-hidden="true">
        <div className="glow-orb-blue" />
        <div className="glow-orb-violet" />
        <div className="glow-orb-peach" />
      </div>

      {/* Dynamic Living Cosmos Starfield (Moving stars, parallax drift, and shooting stars) */}
      <DynamicStarfield />

      {/* Background System: Tiled SVG Noise Grain (6-8% Opacity) */}
      <div className="cosmic-grain" aria-hidden="true" />

      {/* Skip to Content Link for Keyboard Accessibility */}
      <a
        href="#mission"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-5 py-2.5 bg-gradient-to-r from-[#ffc58a] to-[#ff9a3c] text-[#05030f] font-display text-xs font-semibold rounded-full shadow-2xl"
      >
        Skip to main content
      </a>

      {/* Floating Centered Pill Navbar */}
      <Navbar onOpenRegisterModal={() => setIsRegisterModalOpen(true)} />

      {/* Main Content Area */}
      <main id="main-content">
        {/* Section 0: Hero with Redaction Bar, Clock Ticks, and Push-Through Scroll */}
        <Hero
          onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
          onTriggerEasterEgg={() => setIsEasterEggOpen(true)}
        />

        <SectionShutter />

        {/* Section 1: The Mission & Manifesto */}
        <MissionSection />

        <SectionShutter />

        {/* Section 1.5: Hackathon Tracks / Choose Your Orbit */}
        <TracksSection />

        <SectionShutter />

        {/* Section 2: Event Timeline (The Walk) */}
        <SinuousTimeline />

        <SectionShutter />

        {/* Section 3: Impact (Before vs With Exora) */}
        <DoomVersusPlan onOpenRegisterModal={() => setIsRegisterModalOpen(true)} />

        <SectionShutter />

        {/* Section 4: Collaborators & Patrons Marquee (Sliding Brand Names) */}
        <CollaboratorsMarquee />

        <SectionShutter />

        {/* Section 5: Prize Rewards */}
        <ExoraPrizes />

        <SectionShutter />

        {/* Section 6: Frequently Asked Questions */}
        <ExoraFAQ />
      </main>

      <SectionShutter />

      {/* Footer */}
      <Footer onOpenRegisterModal={() => setIsRegisterModalOpen(true)} />

      {/* Interactive Registration Modal */}
      <RegistrationModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />

      {/* Secret Easter Egg Modal (typing "EXORA" or "ORBIT") */}
      <EasterEggModal
        isOpen={isEasterEggOpen}
        onClose={() => setIsEasterEggOpen(false)}
      />
    </div>
  );
}
