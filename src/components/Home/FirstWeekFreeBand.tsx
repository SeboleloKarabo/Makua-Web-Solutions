import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface FirstWeekFreeBandProps {
  onClaimFreeWeek: () => void;
}

export const FirstWeekFreeBand: React.FC<FirstWeekFreeBandProps> = ({ onClaimFreeWeek }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-28 sm:py-36 md:py-40 overflow-hidden bg-[#F0EFE9] rounded-b-[28px]"
      style={{
        borderBottomLeftRadius: '28px',
        borderBottomRightRadius: '28px',
      }}
    >
      {/* Keyframe animation for breathing half-dome glow (scaling 1 -> 2 -> 1 over 2.5s) */}
      <style>{`
        @keyframes domeBreathing {
          0%, 100% {
            transform: translateX(-50%) scale(1);
          }
          50% {
            transform: translateX(-50%) scale(2);
          }
        }
      `}</style>

      {/* Large Soft Glow Half-Dome Shape behind the content */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          width: '100%',
          maxWidth: '800px',
          height: '520px',
          bottom: '-35%',
          left: '50%',
          borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
          background: 'linear-gradient(to top, #F6BF8E, #FFFAA4)',
          filter: 'blur(60px)',
          opacity: 0.9,
          animation: 'domeBreathing 2.5s ease-in-out infinite',
          transformOrigin: 'bottom center',
        }}
      />

      {/* Content Block with Fade-and-Rise Reveal on Scroll */}
      <div
        className={`relative z-10 max-w-[850px] mx-auto px-6 sm:px-12 text-center transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Centred Butterfly Image - Maximized in size */}
        <div className="flex justify-center mb-8 sm:mb-10">
          <img
            src="/src/assets/images/butterfly-image.png"
            alt="Butterfly"
            className="w-36 sm:w-44 md:w-52 h-auto max-h-36 sm:max-h-44 object-contain transition-transform duration-700 hover:scale-105 drop-shadow-sm"
          />
        </div>

        {/* Headline: About Us */}
        <h2 className="font-taviraj text-4xl sm:text-5xl md:text-6xl font-light text-[#411401] leading-tight tracking-tight text-balance">
          About Us
        </h2>

        {/* Narrative Section: Story & Vision */}
        <div className="mt-8 text-left sm:text-center max-w-2xl mx-auto space-y-5 text-[#411401]/85 text-sm sm:text-base leading-relaxed">
          
          <h3 className="font-taviraj text-xl sm:text-2xl font-normal text-[#411401] pt-2 text-center">
            From A Small Beginning To A Big Vision
          </h3>

          <p>
            Makua Web Solutions started as an idea in 2026, built through determination, sacrifice and a vision to help businesses grow digitally. Despite limited resources, we turned that idea into reality, securing our first two clients and investing in a laptop to take our business forward.
          </p>

          <p>
            Our journey hasn't been easy. We've faced rejection, unanswered messages and the challenge of earning trust without an established online presence. But we never stopped believing in what we could build.
          </p>

          <h3 className="font-taviraj text-xl sm:text-2xl font-normal text-[#411401] pt-4 text-center">
            Our Vision, Our Future
          </h3>

          <p>
            We believe success doesn't happen overnight. It starts with one opportunity, one client and the courage to keep going. Today, we're building towards a bigger vision: growing Makua Web Solutions into a recognised digital solutions business, serving 100 clients and beyond.
          </p>

          <p className="font-medium text-[#411401] pt-2 text-center italic font-taviraj text-base sm:text-lg">
            “We started with an idea. We're building with purpose. And we're just getting started.”
          </p>
        </div>

        {/* Pill CTA Button labelled "View Packages" */}
        <div className="mt-10 sm:mt-12 flex justify-center">
          <button
            onClick={onClaimFreeWeek}
            className="group inline-flex items-center gap-3 px-9 py-4 rounded-full bg-[#411401] text-[#F0EFE9] text-xs uppercase tracking-[0.22em] font-semibold transition-all duration-300 hover:bg-[#411401]/90 shadow-md active:scale-95 cursor-pointer"
          >
            <span>View Packages</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </section>
  );
};
