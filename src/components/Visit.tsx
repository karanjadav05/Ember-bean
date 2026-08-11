import React from 'react';
import { MapPin, Clock, Navigation, Phone, ExternalLink } from 'lucide-react';

export const Visit: React.FC = () => {
  // Google Maps directions URL targeting Surat location
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Surat+Gujarat+India+Coffee+Roastery";

  return (
    <section id="visit" className="relative bg-[#120D0A] py-28 px-6 md:px-12 border-t border-[#3A2115]/80">
      <div className="max-w-6xl mx-auto">
        
        <div className="bg-[#1C120C] border border-[#3A2115] p-8 md:p-16 rounded-sm shadow-2xl relative overflow-hidden">
          
          {/* Subtle Sunbeam accent inside card */}
          <div className="absolute top-0 right-0 w-96 h-96 sunbeam pointer-events-none opacity-40" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Left Column: Details */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="text-xs font-mono tracking-[0.35em] text-[#C66A32] uppercase block mb-3">
                  VISIT US
                </span>
                <h2 className="font-display-title text-3xl sm:text-5xl text-[#F4EBDD] font-normal tracking-tight mb-2">
                  EMBER & BEAN
                </h2>
                <p className="font-mono text-xs text-[#8C5A35] tracking-[0.2em] uppercase">
                  SMALL-BATCH ROASTERY & CAFÉ
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs font-mono">
                <div className="space-y-2 border-l border-[#3A2115] pl-4">
                  <div className="flex items-center space-x-2 text-[#C66A32]">
                    <Clock size={16} />
                    <span className="uppercase text-[#8C5A35]">HOURS</span>
                  </div>
                  <p className="text-sm font-semibold text-[#E8D8BD]">06:30 — 20:00</p>
                  <p className="text-[11px] text-[#8C5A35]">Open Daily &bull; Early Morning Filter Starts 06:30</p>
                </div>

                <div className="space-y-2 border-l border-[#3A2115] pl-4">
                  <div className="flex items-center space-x-2 text-[#C66A32]">
                    <MapPin size={16} />
                    <span className="uppercase text-[#8C5A35]">LOCATION</span>
                  </div>
                  <p className="text-sm font-semibold text-[#E8D8BD]">SURAT, INDIA</p>
                  <p className="text-[11px] text-[#8C5A35]">Craft Quarter, Dumas Road, Piplod</p>
                </div>
              </div>

              <p className="text-xs md:text-sm text-[#E8D8BD]/80 font-light leading-relaxed">
                Designed as an sanctuary from urban noise. Minimalist teak seating, warm indirect morning sunlight, ambient acoustic jazz, and the soothing scent of fresh pour-overs.
              </p>

              {/* Get Directions Button */}
              <div>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-3 bg-[#C66A32] hover:bg-[#8C5A35] text-[#120D0A] font-bold text-xs uppercase tracking-[0.25em] px-8 py-4 rounded-sm transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer shadow-lg"
                >
                  <Navigation size={16} />
                  <span>GET DIRECTIONS</span>
                  <ExternalLink size={14} className="ml-1" />
                </a>
              </div>
            </div>

            {/* Right Column: Cafe Map Preview Graphic */}
            <div className="lg:col-span-5">
              <div className="bg-[#120D0A] border border-[#3A2115] p-6 rounded-sm text-center space-y-6">
                <div className="relative h-52 bg-[#21140E] border border-[#3A2115] rounded-sm overflow-hidden flex items-center justify-center">
                  
                  {/* Styled Map Grid Visual */}
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C66A32_1px,transparent_1px)] [background-size:16px_16px]" />
                  
                  <div className="relative z-10 text-center">
                    <div className="w-12 h-12 bg-[#C66A32]/20 border border-[#C66A32] rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse">
                      <MapPin size={22} className="text-[#C66A32]" />
                    </div>
                    <span className="block font-mono text-xs font-semibold text-[#E8D8BD] tracking-wider">
                      EMBER & BEAN CAFÉ
                    </span>
                    <span className="block font-mono text-[10px] text-[#8C5A35]">
                      21°10'12.4"N 72°46'31.2"E
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-[#8C5A35] px-2">
                  <span>PARKING: AVAILABLE</span>
                  <span>WIFI: FAST & FREE</span>
                  <span>PETS: WELCOME</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
