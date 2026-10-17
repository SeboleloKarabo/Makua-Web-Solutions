import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import makuaHeroImg from '../../assets/images/makua-hero.png';

interface HeroSectionProps {
  onSecureSpace: () => void;
  onExplorePricing: () => void;
  onViewProjects?: () => void;
  onRequestQuote?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSecureSpace,
  onExplorePricing,
  onViewProjects,
  onRequestQuote,
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track scroll for dynamic bottom radius
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate bottom rounding based on scroll (up to 28px motif)
  const bottomRadius = Math.min(28, Math.max(0, scrollY * 0.15));

  return (
    <section
      className="relative w-full min-h-[90vh] sm:min-h-screen flex flex-col justify-end overflow-hidden transition-all duration-300"
      style={{
        borderBottomLeftRadius: `${bottomRadius}px`,
        borderBottomRightRadius: `${bottomRadius}px`,
      }}
    >
      {/* Full-bleed background hero photo */}
      <div className="absolute inset-0 z-0">
        <img
          src={makuaHeroImg}
          alt="Makua Web Solutions"
          className="w-full h-full object-cover object-[35%_center] sm:object-center transition-transform duration-700 ease-out"
          style={{
            transform: isMobile
              ? `translateY(${scrollY * 0.06}px)`
              : `translateY(${scrollY * 0.16}px) scale(1.02)`,
          }}
        />
        {/* Cinematic dark scrim towards the bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#411401] via-[#411401]/55 to-[#411401]/25 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#411401]/50 via-transparent to-[#411401]/90" />
      </div>

      {/* Main Hero Content */}
      <div className="px-6 sm:px-12 md:px-20 pb-20 sm:pb-28 pt-44 max-w-[1400px] w-full mx-auto relative z-10 flex flex-col justify-end">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-t border-white/20 pt-10">
          {/* Main Headline */}
          <div className="lg:col-span-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-taviraj font-light text-[#F0EFE9] leading-[1.15] tracking-tight text-balance max-w-3xl">
              Digital Solutions That Grow Your Business
            </h1>
          </div>

          {/* CTA Buttons */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row items-start lg:items-center justify-start lg:justify-end gap-4">
            <button
              onClick={onRequestQuote || onSecureSpace}
              className="group relative px-8 py-4 rounded-full bg-[#FFFAA4] text-[#411401] hover:bg-white transition-all duration-300 font-semibold text-xs uppercase tracking-[0.22em] shadow-[0_10px_25px_rgba(0,0,0,0.3)] flex items-center gap-3 active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <span>Request Quote</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={onViewProjects || onExplorePricing}
              className="px-6 py-4 rounded-full bg-transparent hover:bg-white/10 text-[#F0EFE9] transition-colors font-medium text-xs uppercase tracking-[0.2em] border border-white/30 whitespace-nowrap cursor-pointer active:scale-95"
            >
              View Projects
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
