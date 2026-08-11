import React, { useState } from 'react';
import { MENU_ITEMS, MenuItem } from '../types';
import { Sparkles, Coffee, Clock } from 'lucide-react';

export const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'ESPRESSO' | 'FILTER' | 'COLD' | 'PASTRIES'>('ALL');

  const categories = ['ALL', 'ESPRESSO', 'FILTER', 'COLD', 'PASTRIES'] as const;

  const filteredItems = activeCategory === 'ALL'
    ? MENU_ITEMS
    : MENU_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="relative bg-[#120D0A] py-28 px-6 md:px-12 border-t border-[#3A2115]/60">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono tracking-[0.35em] text-[#C66A32] uppercase mb-3 block">
            THE CRAFT MENU
          </span>
          <h2 className="font-display-title text-4xl sm:text-6xl text-[#F4EBDD] font-normal tracking-tight mb-6">
            Small-Batch Creations
          </h2>
          <p className="font-serif-editorial text-lg sm:text-xl italic text-[#E8D8BD]/70 max-w-xl mx-auto">
            Every beverage is freshly ground and carefully extracted upon order.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-mono tracking-[0.2em] uppercase px-5 py-2.5 rounded-sm transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#C66A32] text-[#120D0A] font-bold shadow-md'
                  : 'bg-[#21140E] text-[#E8D8BD]/70 hover:text-[#E8D8BD] hover:bg-[#3A2115] border border-[#3A2115]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {filteredItems.map((item: MenuItem) => (
            <div
              key={item.id}
              className="group bg-[#1C120C]/60 border border-[#3A2115]/80 hover:border-[#C66A32]/60 p-8 rounded-sm transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between mb-3 gap-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-display-title text-xl md:text-2xl text-[#F4EBDD] group-hover:text-[#C66A32] transition-colors">
                        {item.name}
                      </h3>
                      {item.badge && (
                        <span className="inline-flex items-center text-[9px] font-mono tracking-widest text-[#C66A32] bg-[#C66A32]/10 border border-[#C66A32]/30 px-2 py-0.5 rounded-full uppercase">
                          <Sparkles size={10} className="mr-1" />
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="font-mono text-lg font-medium text-[#E8D8BD] group-hover:text-[#C66A32] transition-colors">
                    {item.price}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs md:text-sm text-[#E8D8BD]/75 font-light leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* Technical / Tasting Specs */}
              <div className="pt-4 border-t border-[#3A2115]/50 space-y-1.5 text-[11px] font-mono text-[#8C5A35]">
                {item.notes && (
                  <div className="flex items-center space-x-2">
                    <span className="text-[#C66A32] uppercase">Notes:</span>
                    <span className="text-[#E8D8BD]/90">{item.notes}</span>
                  </div>
                )}
                {item.origin && (
                  <div className="flex items-center space-x-2">
                    <span className="uppercase">Origin:</span>
                    <span className="text-[#E8D8BD]/80">{item.origin}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Note Footer */}
        <div className="mt-16 text-center text-xs font-mono text-[#8C5A35] flex items-center justify-center space-x-2">
          <Clock size={14} className="text-[#C66A32]" />
          <span>Pour overs require 3–4 minutes of meticulous brewing. Thank you for taking your time.</span>
        </div>

      </div>
    </section>
  );
};
