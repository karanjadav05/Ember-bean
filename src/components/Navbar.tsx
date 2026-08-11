import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  activeScene: number; // 1 to 8
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeScene, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Map 8 scenes to 6 main brewing steps indicator
  const getBrewStep = (scene: number) => {
    if (scene <= 1) return '01';
    if (scene === 2) return '01';
    if (scene === 3) return '02';
    if (scene === 4) return '03';
    if (scene === 5) return '04';
    if (scene === 6) return '05';
    return '06';
  };

  const currentStep = getBrewStep(activeScene);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-[#120D0A]/80 backdrop-blur-md border-b border-[#3A2115]/40 py-4 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('journey')}
          className="text-left group focus:outline-none"
        >
          <span className="block font-display-title text-xl md:text-2xl tracking-[0.18em] text-[#E8D8BD] group-hover:text-[#C66A32] transition-colors">
            EMBER & BEAN
          </span>
          <span className="block text-[9px] tracking-[0.3em] text-[#8C5A35] font-sans font-medium uppercase">
            Small-Batch Roastery
          </span>
        </button>

        {/* HUD Brew Progress Indicator */}
        <div className="hidden md:flex items-center space-x-3 bg-[#21140E]/80 border border-[#3A2115]/60 px-4 py-1.5 rounded-full">
          <span className="text-[10px] tracking-[0.25em] text-[#8C5A35] font-mono uppercase font-semibold">
            BREW
          </span>
          <span className="h-2 w-px bg-[#3A2115]" />
          <span className="font-mono text-xs tracking-widest text-[#E8D8BD] font-medium">
            <span className="text-[#C66A32] font-semibold">{currentStep}</span> / 06
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs tracking-[0.2em] font-sans uppercase text-[#E8D8BD]/80">
          <button
            onClick={() => handleNavClick('journey')}
            className="hover:text-[#C66A32] transition-colors focus:outline-none cursor-pointer"
          >
            Journey
          </button>
          <button
            onClick={() => handleNavClick('menu')}
            className="hover:text-[#C66A32] transition-colors focus:outline-none cursor-pointer"
          >
            Menu
          </button>
          <button
            onClick={() => handleNavClick('story')}
            className="hover:text-[#C66A32] transition-colors focus:outline-none cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => handleNavClick('visit')}
            className="hover:text-[#C66A32] transition-colors focus:outline-none cursor-pointer border border-[#3A2115] px-4 py-1.5 rounded-sm hover:border-[#C66A32]"
          >
            Visit Us
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-3">
          <div className="flex items-center space-x-2 bg-[#21140E] border border-[#3A2115] px-3 py-1 rounded-full text-[11px] font-mono text-[#E8D8BD]">
            <span className="text-[#C66A32]">{currentStep}</span>/06
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#E8D8BD] hover:text-[#C66A32] focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-[#3A2115]/60 flex flex-col space-y-4 px-2 pb-3">
          <button
            onClick={() => handleNavClick('journey')}
            className="text-left py-2 text-sm uppercase tracking-[0.2em] text-[#E8D8BD] hover:text-[#C66A32]"
          >
            Coffee Journey
          </button>
          <button
            onClick={() => handleNavClick('menu')}
            className="text-left py-2 text-sm uppercase tracking-[0.2em] text-[#E8D8BD] hover:text-[#C66A32]"
          >
            Menu & Reserve
          </button>
          <button
            onClick={() => handleNavClick('story')}
            className="text-left py-2 text-sm uppercase tracking-[0.2em] text-[#E8D8BD] hover:text-[#C66A32]"
          >
            Our Philosophy
          </button>
          <button
            onClick={() => handleNavClick('visit')}
            className="text-left py-2 text-sm uppercase tracking-[0.2em] text-[#C66A32] hover:underline"
          >
            Visit Café & Roastery →
          </button>
        </div>
      )}
    </header>
  );
};
