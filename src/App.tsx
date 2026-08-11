import React, { useRef } from 'react';
import { useScrollProgress } from './hooks/useScrollProgress';
import { Navbar } from './components/Navbar';
import { CoffeeJourney } from './components/CoffeeJourney';
import { Menu } from './components/Menu';
import { Story } from './components/Story';
import { Visit } from './components/Visit';
import { Footer } from './components/Footer';

export default function App() {
  const journeyRef = useRef<HTMLDivElement | null>(null);

  // Custom hook for tracking scroll position and current scene
  const { journeyProgress, activeScene } = useScrollProgress(journeyRef);

  // Smooth scroll helper for navbar and restart buttons
  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'journey') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRestart = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#120D0A] text-[#E8D8BD] selection:bg-[#C66A32] selection:text-[#120D0A] font-sans antialiased overflow-x-hidden">
      
      {/* Top Fixed Minimal Luxury Navbar with BREW HUD */}
      <Navbar activeScene={activeScene} onNavigate={handleNavigate} />

      {/* Main Interactive Scroll-Driven Coffee Journey (Scenes 1 - 8) */}
      <CoffeeJourney
        journeyRef={journeyRef}
        progress={journeyProgress}
        activeScene={activeScene}
        onRestart={handleRestart}
      />

      {/* Craft Coffee Menu Section */}
      <Menu />

      {/* Brand Philosophy & Craft Story */}
      <Story />

      {/* Roastery Café Location & Hours */}
      <Visit />

      {/* Footer */}
      <Footer />

    </div>
  );
}
