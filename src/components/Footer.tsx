import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#0C0806] text-[#E8D8BD] py-20 px-6 md:px-12 border-t border-[#3A2115]">
      <div className="max-w-6xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16 pb-16 border-b border-[#3A2115]/60">
          
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-4">
            <h3 className="font-display-title text-2xl md:text-3xl tracking-[0.15em] text-[#F4EBDD]">
              EMBER & BEAN
            </h3>
            <p className="font-serif-editorial text-lg italic text-[#C66A32]">
              "TAKE YOUR TIME."
            </p>
            <p className="text-xs text-[#E8D8BD]/70 max-w-sm leading-relaxed font-light">
              Craft coffee roastery dedicated to slow brewing, ethical direct-trade origins, and the pursuit of quiet morning ritual.
            </p>
          </div>

          {/* Newsletter Signup */}
          <div className="md:col-span-6 space-y-4">
            <span className="text-xs font-mono tracking-[0.25em] text-[#C66A32] uppercase block">
              SEASONAL ROASTING NOTES
            </span>
            <p className="text-xs text-[#E8D8BD]/80 font-light">
              Subscribe to receive notification when rare, limited-harvest micro-lots arrive at our roastery.
            </p>

            {subscribed ? (
              <div className="flex items-center space-x-2 text-xs font-mono text-[#C66A32] bg-[#21140E] border border-[#3A2115] p-3 rounded-sm">
                <CheckCircle2 size={16} />
                <span>You are subscribed. We will send notes only when a rare lot drops.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="bg-[#1C120C] border border-[#3A2115] text-xs font-mono text-[#E8D8BD] px-4 py-3 rounded-l-sm focus:outline-none focus:border-[#C66A32] flex-grow"
                />
                <button
                  type="submit"
                  className="bg-[#C66A32] hover:bg-[#8C5A35] text-[#120D0A] font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-r-sm transition-colors cursor-pointer flex items-center"
                >
                  <Send size={14} />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#8C5A35] space-y-4 sm:space-y-0">
          <div>
            &copy; {new Date().getFullYear()} EMBER & BEAN ROASTERY. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center space-x-6">
            <span className="hover:text-[#E8D8BD] transition-colors cursor-pointer">INSTAGRAM</span>
            <span className="hover:text-[#E8D8BD] transition-colors cursor-pointer">JOURNAL</span>
            <span className="hover:text-[#E8D8BD] transition-colors cursor-pointer">TERMS</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
