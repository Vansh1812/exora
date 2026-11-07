# EXORA 2.0 — Unveil The Build

> **RESTRICTED MERIT // CLASSIFIED DOSSIER DOSSIER-EXORA-2026-V2**  
> A premier 24-hour hackathon and engineering crucible organized by **Google Developer Groups (GDG)** in partnership with **Thoughtworks Technologies, Gurugram**.

[![Event Date](https://img.shields.io/badge/Event%20Date-28%20November%202026-c9a227?style=for-the-badge&logo=google-calendar&logoColor=white)](https://unstop.com/o/iPHpWUc?lb=bjos6kym&utm_medium=Share&utm_source=ubfxqrcy86969&utm_campaign=Online_coding_challenge)
[![Venue](https://img.shields.io/badge/Venue-Thoughtworks%20Technologies%2C%20Gurugram-2f4a3a?style=for-the-badge&logo=google-maps&logoColor=white)](https://maps.google.com)
[![Clearance](https://img.shields.io/badge/Security%20Clearance-Classified%20Operatives-4ade80?style=for-the-badge)](https://unstop.com/o/iPHpWUc?lb=bjos6kym&utm_medium=Share&utm_source=ubfxqrcy86969&utm_campaign=Online_coding_challenge)

---

## 🏛️ The Concept & Aesthetic

**EXORA 2.0** abandons generic hackathon clichés in favor of a sovereign, high-stakes **Dr. Doom "Classified Dossier"** visual language:

- **Typography**: Editorial sharp serif (`Fraunces`) for imposing commands + strict industrial monospace (`JetBrains Mono`) for telemetry, timestamps, and clearance stamps.
- **Palette**: Deep Latverian obsidian (`#0b0d0c`), oxidized emerald steel (`#2f4a3a`), warning red (`#f87171`), cybernetic mint (`#4ade80`), and regal gold (`#c9a227`).
- **Tactical Artifacts**: Steel rivet corners, hairline coordinate grids, redaction bar reveal wipes, RGB-split header glitches, and an interactive vector mask.

---

## ⚡ Core Features

### 1. Interactive Dr. Doom Visor & Mask
- Pure geometric SVG vector artwork (zero copyrighted image assets).
- **Smooth Cursor Tracking**: Golden optical sensor pupils follow pointer, touch, and mouse movements via linear interpolation (`lerp`).
- **Autonomous Surveillance Sweep**: When the cursor pauses, Doom's eyes engage an ambient radar scan across the viewport.
- **Camera Push-Through**: As you scroll into the dossier, the mask scales up smoothly and dissolves into the case brief.
- **Easter Egg**: Click the visor 3 times or type `DOOM` anywhere on your keyboard to reveal the Sovereign's hidden decree.

### 2. Doom Clock Chrono Metric
- Real-time countdown targeting **28 November 2026, 09:00 AM IST**.
- Multi-layer underglow shadow with tick-flip seconds animation and gold pulse.

### 3. Choose Your Operation (5 Hackathon Tracks)
1. **`OP-01 // VAULT`** (`#7CFF6B`) — *FinTech & Cybersecurity* (Threat Level 5/5)
2. **`OP-02 // PULSE`** (`#FF6B6B`) — *HealthTech & Social Impact* (Threat Level 4/5)
3. **`OP-03 // LEDGER`** (`#8B7CFF`) — *Blockchain & Web3* (Threat Level 4/5)
4. **`OP-04 // IRONWORKS`** (`#FFB020`) — *Physical AI, Robotics & IoT* (Threat Level 5/5)
5. **`OP-05 // WILDCARD`** (`#5EEAD4`) — *Open Innovation* (Threat Level 3/5, Featured Grid-Breaking Strip)
- Custom handcrafted inline SVG glyphs (<1 KB each, zero icon font bloat).
- Desktop file drawer tabs + mobile-responsive touch accordion (min 48px tap targets).

### 4. Sinuous Mission Timeline
- Interactive vertical drawing line tied directly to scroll progress.
- 3 distinct operational phases with milestone telemetry and eliminatory status indicators.

### 5. The Paradigm Shift (Doom's World vs Our Plan)
- 4 direct matched pairs contrasting conventional hackathon illusions with Exora 2.0 standards:
  - *Brittle API wrappers abandoned in 48 hours* ✗ ⟷ *Live demo + code walkthrough, keep building after the event* ✓
  - *200-slide keynotes, no terminal time* ✗ ⟷ *Hands-on workshops, terminal open from minute one* ✓
  - *Participation certificates nobody reads* ✗ ⟷ *Certificates tied to your project with GitHub links* ✓
  - *Sponsor swag forgotten by Monday* ✗ ⟷ *1:1 mentor review and a showcase slot* ✓
- Interactive comparison wipe slider on desktop + stacked paired cards on mobile.
- Stat strip: `24 HOURS // 12+ MENTORS // 5 TRACKS // 40+ TEAMS // PRIZE POOL ₹25,000+`.
- *Beyond the Venue* 3-pillar community impact framework.
- Closing call to action: *"Doom promises spectacle. We ship working code."*

### 6. Accessibility & Motion Discipline
- Meets **WCAG AA** contrast requirements across all dark surfaces (minimum 4.5:1 for body copy, > 11:1 for critique items).
- Full **`prefers-reduced-motion`** support: all flashes, glitches, scanlines, and shakes collapse to instantaneous static states.
- Fully keyboard operable: `Tab`, arrow keys, `Enter`, `Space`, and visible focus rings.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Tooling**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/) (select minimal icons) + Custom Vector SVGs
- **Deployment**: Static SPA optimized for sub-second loads (~141 KB gzipped bundle)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm, pnpm, or bun

### 1. Clone the Repository
```bash
git clone https://github.com/Vansh1812/exora2.0.git
cd exora2.0
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000` or `http://localhost:5173`.

### 4. Build for Production
```bash
npm run build
```
The optimized production bundle will be output to the `dist/` directory.

### 5. Preview Production Build
```bash
npm run preview
```

---

## 📁 Project Architecture

```
exora2.0/
├── public/
│   └── assets/aistudio/       # Original event briefs and documentation
├── src/
│   ├── components/
│   │   ├── glyphs/            # Handcrafted inline SVG track glyphs (< 1KB each)
│   │   ├── AbstractMask.tsx   # Custom vector mask with parallax-tracking eyes
│   │   ├── BootScreen.tsx     # Terminal decryption boot sequence
│   │   ├── Cursor.tsx         # Desktop tactical reticle crosshair cursor
│   │   ├── DoomVersusPlan.tsx # Paradigm shift split slider & impact cards
│   │   ├── EasterEggModal.tsx # Secret Latverian protocol modal
│   │   ├── ExoraFAQ.tsx       # Hairline FAQ accordion
│   │   ├── ExoraPrizes.tsx    # 3-tier podium reward cards
│   │   ├── Hero.tsx           # Hero section, Doom Clock, and redaction reveals
│   │   ├── MissionSection.tsx # Case brief, bento pillars, and stats
│   │   ├── Navbar.tsx         # Floating pill nav with clearance indicator
│   │   ├── RegistrationModal.tsx # Squad enrollment & direct GCal export
│   │   ├── SinuousTimeline.tsx # Scroll-drawn SVG timeline
│   │   ├── TrackPanel.tsx     # Classified track dossier panel with scanline sweep
│   │   ├── TrackTabs.tsx      # Desktop accessible file drawer tabs
│   │   └── TracksSection.tsx  # Master tracks section + featured wildcard
│   ├── data/
│   │   └── tracks.ts          # Track dossiers, problem statements & villain briefs
│   ├── hooks/
│   │   ├── useCountdown.ts    # Precision tick timer for Doom Clock
│   │   ├── useMouseParallax.ts# Smooth lerp pointer tracking & ambient drift
│   │   ├── useReducedMotion.ts# System accessibility preference detection
│   │   ├── useReveal.ts       # IntersectionObserver scroll reveal
│   │   └── useScrollProgress.ts # Throttled scroll telemetry
│   ├── eventConfig.ts         # Central source of truth for dates, prizes & copy
│   ├── index.css              # Global styles, scanline keyframes & reduced-motion rules
│   ├── App.tsx                # App root & lazy-loaded suspense boundaries
│   └── main.tsx               # Entry point
├── index.html                 # SEO metadata & Google Fonts
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 📅 Operational Schedule

| Phase | Milestone | Date & Venue | Mode | Eliminatory? |
| :--- | :--- | :--- | :--- | :--- |
| **Phase 1** | PPT Idea Submission Window | 8 Nov – 22 Nov 2026 | Online | **Yes** (Top 40–50 advance) |
| **Phase 1** | Shortlist Announcement | 25 Nov 2026 | Portal | Results declared |
| **Phase 2** | 24-Hour Hackathon Kickoff | 26 Nov 2026 | Online | **No** (All advance to Phase 3) |
| **Phase 2** | Round 1 Mentoring | 26 Nov 2026, 4:00 PM+ | Online | Non-eliminatory technical guidance |
| **Phase 3** | Grand Finale & Offline Sprint | 28 Nov 2026, 9:00 AM | Thoughtworks Gurugram | In-person |
| **Phase 3** | Round 2 Mentoring | 28 Nov 2026, 9:00 AM – 12:00 PM | Thoughtworks Gurugram | **Yes** (Eliminatory review) |
| **Phase 3** | Final Stage Jury Presentations | 28 Nov 2026, 12:00 PM – 5:00 PM | Thoughtworks Gurugram | Final judging & rewards |

---

## ⚖️ License & Attribution

Designed and developed for **GDG On Campus ABESEC** and **Thoughtworks Technologies**.  
All rights reserved. Code released under the [MIT License](LICENSE).
