import React from 'react';
import { Flame, Compass, Sun } from 'lucide-react';

export const Story: React.FC = () => {
  return (
    <section id="story" className="relative bg-[#1C120C] py-28 px-6 md:px-12 border-t border-[#3A2115]/80 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Editorial Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative z-10 bg-[#120D0A] border border-[#3A2115] p-3 rounded-sm shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80"
                alt="Ember & Bean Roastery Interior"
                referrerPolicy="no-referrer"
                className="w-full h-[480px] object-cover rounded-sm filter contrast-105 brightness-90 hover:brightness-100 transition-all duration-700"
              />
              <div className="p-4 bg-[#120D0A] border-t border-[#3A2115] flex items-center justify-between font-mono text-[10px] text-[#8C5A35]">
                <span>ROASTER NO. 04</span>
                <span>SURAT, INDIA</span>
              </div>
            </div>

            {/* Accent Shadow Box */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#C66A32]/30 rounded-sm -z-0 pointer-events-none" />
          </div>

          {/* Editorial Text Content */}
          <div className="lg:col-span-7 space-y-8">
            <span className="text-xs font-mono tracking-[0.35em] text-[#C66A32] uppercase block">
              OUR PHILOSOPHY
            </span>

            <h2 className="font-display-title text-4xl sm:text-6xl text-[#F4EBDD] font-normal leading-[1.1] tracking-tight">
              "WE DON'T MAKE <br />
              <span className="italic font-serif-editorial text-[#C66A32]">COFFEE FAST."</span>
            </h2>

            <p className="font-serif-editorial text-xl sm:text-2xl text-[#E8D8BD]/90 leading-relaxed italic font-light">
              "We roast in small batches, brew with intention, and believe the best part of the morning deserves a little more time."
            </p>

            <div className="space-y-4 text-xs md:text-sm text-[#E8D8BD]/75 leading-relaxed font-light">
              <p>
                Founded in 2016, EMBER & BEAN was born from a simple observation: modern life moves at a frantic speed, turning even the sacred ritual of morning coffee into an automated, rushed transaction.
              </p>
              <p>
                We source exclusively from micro-lots where farmers are paid 3x above fair trade baseline. Every batch is roasted on a vintage cast-iron Probat roaster, carefully profiling thermal energy to highlight each bean's natural terroir.
              </p>
            </div>

            {/* Three Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#3A2115] text-left">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-[#C66A32]">
                  <Flame size={16} />
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#E8D8BD]">Micro-Batch</span>
                </div>
                <p className="text-[11px] text-[#8C5A35] font-light">
                  Never exceeding 5kg per roast for hyper-granular flavor control.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-[#C66A32]">
                  <Compass size={16} />
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#E8D8BD]">Direct Origin</span>
                </div>
                <p className="text-[11px] text-[#8C5A35] font-light">
                  Single-farm traceability directly from high-elevation origins.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-[#C66A32]">
                  <Sun size={16} />
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#E8D8BD]">Mindful Brew</span>
                </div>
                <p className="text-[11px] text-[#8C5A35] font-light">
                  Pour-overs crafted by hand. No machines, no shortcuts.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
