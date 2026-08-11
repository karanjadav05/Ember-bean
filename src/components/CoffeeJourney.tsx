import React from 'react';
import { CoffeeCanvas } from './CoffeeCanvas';
import { ArrowDown, RotateCcw } from 'lucide-react';

interface CoffeeJourneyProps {
  journeyRef: React.RefObject<HTMLDivElement | null>;
  progress: number; // 0 to 1
  activeScene: number; // 1 to 8
  onRestart: () => void;
}

export const CoffeeJourney: React.FC<CoffeeJourneyProps> = ({
  journeyRef,
  progress,
  activeScene,
  onRestart,
}) => {
  // Defined ranges for each scene:
  // Scene 1 Arrival: 0.00 - 0.10
  // Scene 2 Beans: 0.10 - 0.25
  // Scene 3 Grind: 0.25 - 0.40
  // Scene 4 Bloom: 0.40 - 0.55
  // Scene 5 Pour: 0.55 - 0.70
  // Scene 6 Wait: 0.70 - 0.82
  // Scene 7 Ready Cup: 0.82 - 0.94
  // Scene 8 Sweet Message: 0.94 - 1.00
  const SCENE_RANGES = [
    { min: 0.00, peakStart: 0.00, peakEnd: 0.08, max: 0.12 }, // Scene 1 Arrival
    { min: 0.08, peakStart: 0.12, peakEnd: 0.23, max: 0.27 }, // Scene 2 Beans
    { min: 0.23, peakStart: 0.27, peakEnd: 0.38, max: 0.42 }, // Scene 3 Grind
    { min: 0.38, peakStart: 0.42, peakEnd: 0.53, max: 0.57 }, // Scene 4 Bloom
    { min: 0.53, peakStart: 0.57, peakEnd: 0.68, max: 0.72 }, // Scene 5 Pour
    { min: 0.68, peakStart: 0.72, peakEnd: 0.80, max: 0.84 }, // Scene 6 Wait
    { min: 0.80, peakStart: 0.84, peakEnd: 0.92, max: 0.95 }, // Scene 7 Ready Cup
    { min: 0.92, peakStart: 0.95, peakEnd: 1.00, max: 1.00 }, // Scene 8 Sweet Message
  ];

  const getSceneOpacity = (sceneIndex: number) => {
    const range = SCENE_RANGES[sceneIndex - 1];
    if (!range) return 0;

    const p = progress;
    if (p < range.min || p > range.max) return 0;
    if (p >= range.peakStart && p <= range.peakEnd) return 1;

    if (p < range.peakStart) {
      // Fading in
      const fadeInProgress = (p - range.min) / (range.peakStart - range.min);
      return Math.min(Math.max(fadeInProgress, 0), 1);
    } else {
      // Fading out
      const fadeOutProgress = (range.max - p) / (range.max - range.peakEnd);
      return Math.min(Math.max(fadeOutProgress, 0), 1);
    }
  };

  return (
    <div
      ref={journeyRef}
      id="journey"
      className="relative w-full h-[650vh] bg-[#120D0A] bg-grain"
    >
      {/* Sticky Window Container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center">
        
        {/* Interactive Canvas Visuals */}
        <CoffeeCanvas progress={progress} />

        {/* Ambient Sunlight Beam Overlay */}
        <div
          className="absolute inset-0 pointer-events-none sunbeam transition-opacity duration-1000"
          style={{ opacity: 0.3 + progress * 0.7 }}
        />

        {/* --- SCENE OVERLAYS CONTAINER --- */}
        <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
          
          {/* SCENE 01 — THE ARRIVAL */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-12 transition-all duration-700 transform"
            style={{
              opacity: getSceneOpacity(1),
              transform: `scale(${0.95 + getSceneOpacity(1) * 0.05}) translateY(${(1 - getSceneOpacity(1)) * 20}px)`,
              pointerEvents: getSceneOpacity(1) > 0.5 ? 'auto' : 'none',
            }}
          >
            <div className="max-w-4xl mx-auto flex flex-col items-center">
              <p className="text-[10px] md:text-xs tracking-[0.35em] text-[#C66A32] font-mono uppercase mb-4 font-semibold">
                EMBER & BEAN &bull; SMALL-BATCH ROASTERY &bull; EST. 2016
              </p>

              <h1 className="font-display-title text-4xl sm:text-6xl md:text-8xl tracking-tight text-[#F4EBDD] font-normal leading-[1.08] mb-6">
                "GOOD COFFEE <br />
                <span className="italic font-serif-editorial text-[#E8D8BD]">TAKES TIME."</span>
              </h1>

              <p className="text-sm md:text-base font-serif-editorial italic text-[#E8D8BD]/70 tracking-widest max-w-md mb-12">
                Don't rush this.
              </p>

              <div className="flex flex-col items-center animate-bounce mt-4 text-[#8C5A35]">
                <span className="text-[10px] tracking-[0.3em] font-mono uppercase text-[#E8D8BD]/80 mb-2 font-medium">
                  SCROLL TO BREW
                </span>
                <ArrowDown size={18} className="text-[#C66A32]" />
              </div>
            </div>
          </div>

          {/* SCENE 02 — THE BEANS */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 transform"
            style={{
              opacity: getSceneOpacity(2),
              transform: `translateY(${(1 - getSceneOpacity(2)) * 30}px)`,
              pointerEvents: getSceneOpacity(2) > 0.5 ? 'auto' : 'none',
            }}
          >
            <div className="bg-[#120D0A]/80 backdrop-blur-md border border-[#3A2115]/80 p-8 md:p-12 rounded-sm max-w-2xl text-left shadow-2xl">
              <div className="flex items-baseline justify-between border-b border-[#3A2115] pb-4 mb-6">
                <span className="text-xs font-mono tracking-[0.3em] text-[#C66A32]">01 / THE BEANS</span>
                <span className="text-[10px] font-mono text-[#8C5A35]">SINGLE ORIGIN</span>
              </div>

              <h2 className="font-display-title text-3xl md:text-5xl text-[#F4EBDD] mb-3">
                "Everything begins here."
              </h2>

              <p className="text-xs md:text-sm text-[#E8D8BD]/80 leading-relaxed mb-8 font-light">
                Hand-harvested at 1,950 meters in the high altitudes of Guji. Slow shade-dried on raised African beds for 21 days until peak sweetness is unlocked.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#3A2115]/60 text-left">
                <div>
                  <span className="block text-[9px] font-mono tracking-widest text-[#8C5A35] uppercase">Origin</span>
                  <span className="text-xs md:text-sm font-medium text-[#E8D8BD] tracking-wider">ETHIOPIA</span>
                </div>
                <div>
                  <span className="block text-[9px] font-mono tracking-widest text-[#8C5A35] uppercase">Roast</span>
                  <span className="text-xs md:text-sm font-medium text-[#E8D8BD] tracking-wider">LIGHT</span>
                </div>
                <div>
                  <span className="block text-[9px] font-mono tracking-widest text-[#8C5A35] uppercase">Notes</span>
                  <span className="text-xs md:text-sm font-medium text-[#C66A32] tracking-wider">CHOCOLATE &bull; CITRUS &bull; CARAMEL</span>
                </div>
              </div>
            </div>
          </div>

          {/* SCENE 03 — THE GRIND */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 transform"
            style={{
              opacity: getSceneOpacity(3),
              transform: `translateY(${(1 - getSceneOpacity(3)) * 30}px)`,
              pointerEvents: getSceneOpacity(3) > 0.5 ? 'auto' : 'none',
            }}
          >
            <div className="bg-[#120D0A]/80 backdrop-blur-md border border-[#3A2115]/80 p-8 md:p-12 rounded-sm max-w-xl text-center shadow-2xl">
              <span className="inline-block text-xs font-mono tracking-[0.3em] text-[#C66A32] uppercase mb-3">
                02 / THE GRIND
              </span>
              <h2 className="font-display-title text-3xl md:text-5xl text-[#F4EBDD] mb-4">
                "Precision changes everything."
              </h2>
              <p className="text-xs md:text-sm text-[#E8D8BD]/80 leading-relaxed max-w-md mx-auto mb-8 font-light">
                Unlocking aroma by fracturing roasted cells into uniform particles. 64mm steel flat burrs spinning at low RPM to avoid heat friction.
              </p>

              <div className="inline-flex items-center space-x-6 bg-[#21140E] border border-[#3A2115] px-6 py-3 rounded-full text-xs font-mono text-[#E8D8BD]">
                <div>
                  <span className="text-[#8C5A35] mr-2">GRIND:</span>
                  <span className="font-semibold text-[#C66A32]">MEDIUM-FINE</span>
                </div>
                <span className="h-3 w-px bg-[#3A2115]" />
                <div>
                  <span className="text-[#8C5A35] mr-2">BURRS:</span>
                  <span className="font-semibold text-[#E8D8BD]">64MM STEEL</span>
                </div>
              </div>
            </div>
          </div>

          {/* SCENE 04 — THE BLOOM */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 transform"
            style={{
              opacity: getSceneOpacity(4),
              transform: `translateY(${(1 - getSceneOpacity(4)) * 30}px)`,
              pointerEvents: getSceneOpacity(4) > 0.5 ? 'auto' : 'none',
            }}
          >
            <div className="bg-[#120D0A]/80 backdrop-blur-md border border-[#3A2115]/80 p-8 md:p-12 rounded-sm max-w-xl text-center shadow-2xl">
              <span className="inline-block text-xs font-mono tracking-[0.3em] text-[#C66A32] uppercase mb-3">
                03 / THE BLOOM
              </span>
              <h2 className="font-display-title text-3xl md:text-5xl text-[#F4EBDD] mb-4">
                "Let it breathe."
              </h2>
              <p className="text-xs md:text-sm text-[#E8D8BD]/80 leading-relaxed max-w-md mx-auto mb-8 font-light">
                The first saturate pour releases trapped carbon dioxide gas, swelling the grounds and paving the path for sweet, balanced extraction.
              </p>

              <div className="flex justify-center space-x-4 font-mono text-xs">
                <div className="bg-[#21140E] border border-[#3A2115] px-4 py-2 rounded-sm text-[#E8D8BD]">
                  <span className="text-[#C66A32] font-bold mr-1">92°C</span> WATER
                </div>
                <div className="bg-[#21140E] border border-[#3A2115] px-4 py-2 rounded-sm text-[#E8D8BD]">
                  <span className="text-[#C66A32] font-bold mr-1">30 SEC</span> BLOOM
                </div>
              </div>
            </div>
          </div>

          {/* SCENE 05 — THE POUR */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 transform"
            style={{
              opacity: getSceneOpacity(5),
              transform: `translateY(${(1 - getSceneOpacity(5)) * 30}px)`,
              pointerEvents: getSceneOpacity(5) > 0.5 ? 'auto' : 'none',
            }}
          >
            <div className="bg-[#120D0A]/80 backdrop-blur-md border border-[#3A2115]/80 p-8 md:p-12 rounded-sm max-w-xl text-center shadow-2xl">
              <span className="inline-block text-xs font-mono tracking-[0.3em] text-[#C66A32] uppercase mb-3">
                04 / THE POUR
              </span>
              <h2 className="font-display-title text-3xl md:text-5xl text-[#F4EBDD] mb-4">
                "Slowly. Carefully."
              </h2>
              <p className="text-xs md:text-sm text-[#E8D8BD]/80 leading-relaxed max-w-md mx-auto mb-8 font-light">
                Concentric spiral pouring maintaining constant water level and thermal stability in the paper filter.
              </p>

              <div className="flex justify-center space-x-4 font-mono text-xs">
                <div className="bg-[#21140E] border border-[#3A2115] px-5 py-2.5 rounded-sm text-[#E8D8BD]">
                  <span className="text-[#8C5A35] block text-[9px]">TOTAL POUR</span>
                  <span className="text-[#C66A32] font-bold text-sm">250 ML</span>
                </div>
                <div className="bg-[#21140E] border border-[#3A2115] px-5 py-2.5 rounded-sm text-[#E8D8BD]">
                  <span className="text-[#8C5A35] block text-[9px]">BREW TIME</span>
                  <span className="text-[#E8D8BD] font-bold text-sm">2:45</span>
                </div>
              </div>
            </div>
          </div>

          {/* SCENE 06 — THE WAIT */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 transform"
            style={{
              opacity: getSceneOpacity(6),
              transform: `scale(${0.98 + getSceneOpacity(6) * 0.02})`,
              pointerEvents: getSceneOpacity(6) > 0.5 ? 'auto' : 'none',
            }}
          >
            <span className="text-xs font-mono tracking-[0.35em] text-[#C66A32] uppercase mb-4">
              05 / THE WAIT
            </span>
            <h2 className="font-display-title text-3xl sm:text-5xl md:text-6xl text-[#F4EBDD] max-w-xl mx-auto leading-snug font-normal mb-6">
              "Some things are better <br />
              <span className="italic font-serif-editorial text-[#E8D8BD]">when you don't hurry them."</span>
            </h2>
            <p className="text-xs font-mono tracking-widest text-[#8C5A35] uppercase">
              Final drops forming &bull; Quiet stillness
            </p>
          </div>

          {/* SCENE 07 — THE CUP */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 transform"
            style={{
              opacity: getSceneOpacity(7),
              transform: `translateY(${(1 - getSceneOpacity(7)) * 20}px)`,
              pointerEvents: getSceneOpacity(7) > 0.5 ? 'auto' : 'none',
            }}
          >
            <span className="text-xs font-mono tracking-[0.35em] text-[#C66A32] uppercase mb-4">
              06 / READY
            </span>
            <h2 className="font-display-title text-4xl sm:text-6xl md:text-7xl text-[#F4EBDD] mb-4">
              "Your coffee is ready."
            </h2>
            <p className="text-sm font-serif-editorial italic text-[#E8D8BD]/80">
              Steaming, rich, and waiting for you.
            </p>
          </div>

          {/* SCENE 08 — THE SWEET MESSAGE */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 transform"
            style={{
              opacity: getSceneOpacity(8),
              transform: `scale(${0.96 + getSceneOpacity(8) * 0.04})`,
              pointerEvents: getSceneOpacity(8) > 0.4 ? 'auto' : 'none',
            }}
          >
            <div className="bg-[#120D0A]/90 backdrop-blur-lg border border-[#3A2115] p-10 md:p-16 rounded-sm max-w-2xl text-center shadow-2xl">
              <h2 className="font-display-title text-4xl sm:text-6xl text-[#F4EBDD] tracking-tight mb-6">
                YOU MADE IT.
              </h2>

              <p className="font-serif-editorial text-xl sm:text-2xl italic text-[#E8D8BD]/90 leading-relaxed mb-8 max-w-md mx-auto">
                "Now take a breath. <br />
                The rest of the day can wait."
              </p>

              <p className="text-xs font-mono tracking-[0.3em] text-[#C66A32] uppercase mb-10">
                &mdash; EMBER & BEAN
              </p>

              <button
                onClick={onRestart}
                className="inline-flex items-center space-x-3 bg-[#C66A32] hover:bg-[#8C5A35] text-[#120D0A] font-semibold text-xs uppercase tracking-[0.25em] px-8 py-4 rounded-sm transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer shadow-lg"
              >
                <span>TAKE ANOTHER SIP</span>
                <RotateCcw size={16} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
