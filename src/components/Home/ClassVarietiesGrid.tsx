import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Discipline } from '../../types';

interface ClassVarietiesGridProps {
  onSelectDiscipline?: (discipline: Discipline) => void;
}

interface AudienceItem {
  number: string;
  title: string;
  description: string;
}

export const ClassVarietiesGrid: React.FC<ClassVarietiesGridProps> = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasRevealed, setHasRevealed] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const wheelLockRef = useRef(false);

  const audiences: AudienceItem[] = [
    {
      number: '01',
      title: 'Retail Stores',
      description: 'Showcase your products, promote special offers and help customers discover your business.',
    },
    {
      number: '02',
      title: 'Lodges & Guesthouses',
      description: 'Highlight your accommodation, amenities and booking options to attract more guests.',
    },
    {
      number: '03',
      title: 'Salons & Spas',
      description: 'Display your services, pricing and portfolio while making appointment enquiries easier.',
    },
    {
      number: '04',
      title: 'Restaurants & Cafés',
      description: 'Present your menus, opening hours, location and contact details online.',
    },
    {
      number: '05',
      title: 'Catering Services',
      description: 'Showcase your menus, catering packages, events and services to attract new clients.',
    },
    {
      number: '06',
      title: 'Funeral Services',
      description: 'Present your funeral services, packages, tombstones, contact information and support options professionally.',
    },
    {
      number: '07',
      title: 'Wedding Services',
      description: 'Showcase wedding venues, décor, photography, catering and other services to help couples plan their special day.',
    },
    {
      number: '08',
      title: 'Game Reserves & Safari Lodges',
      description: 'Promote wildlife experiences, accommodation, safari packages and booking enquiries.',
    },
    {
      number: '09',
      title: 'Construction & Service Businesses',
      description: 'Highlight your projects, services, experience and company capabilities.',
    },
    {
      number: '10',
      title: 'Professionals & Other Businesses',
      description: 'Build credibility, showcase your expertise and connect with potential clients.',
    },
  ];

  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasRevealed(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : audiences.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < audiences.length - 1 ? prev + 1 : 0));
  };

  // Horizontal trackpad / mouse-wheel swipe debounced ~600ms
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > 25 || Math.abs(e.deltaY) > 45) {
      if (wheelLockRef.current) return;
      wheelLockRef.current = true;
      if (e.deltaX > 25 || e.deltaY > 45) {
        handleNext();
      } else {
        handlePrev();
      }
      setTimeout(() => {
        wheelLockRef.current = false;
      }, 600);
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`w-full py-24 lg:py-32 px-[6vw] lg:px-[8vw] bg-gradient-to-b from-[#F0EFE9] to-[#FFFAA4] transition-all duration-700 ease-out ${
        hasRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'
      }`}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* HEADER (top of section, ~80px bottom margin) */}
        <div className="mb-20 text-center">
          <div className="text-[12px] uppercase font-sans tracking-[0.3em] font-medium text-[#411401] mb-3">
            Who We Serve
          </div>
          <h2 className="font-taviraj text-[28px] sm:text-[38px] md:text-[46px] font-light text-[#411401] tracking-tight leading-tight max-w-3xl mx-auto">
            Digital Solutions for Businesses of All Sizes
          </h2>
        </div>

        {/* DESKTOP — 3D CARD CAROUSEL */}
        <div className="hidden md:block select-none" onWheel={handleWheel}>
          {/* 384px-tall stage with edge fades mask */}
          <div
            className="relative w-full h-[384px] overflow-hidden flex items-center justify-center"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
            }}
          >
            {audiences.map((item, index) => {
              const step = index - activeIndex;
              const isOutOfRange = Math.abs(step) > 2;
              const opacity = isOutOfRange ? 0 : Math.abs(step) === 2 ? 0.35 : Math.abs(step) === 1 ? 0.85 : 1;
              const scale = Math.max(0.7, 1 - Math.abs(step) * 0.08);
              const translateX = step * 340;
              const zIndex = 30 - Math.abs(step) * 10;

              return (
                <div
                  key={item.number}
                  className="absolute top-8 left-1/2 w-[384px] h-[320px] bg-white rounded-[12px] p-8 lg:p-10 flex flex-col justify-between transition-all"
                  style={{
                    transform: `translateX(calc(-50% + ${translateX}px)) scale(${scale})`,
                    opacity: isOutOfRange ? 0 : opacity,
                    zIndex,
                    boxShadow: '0px 12px 20px 4px rgba(230, 146, 76, 0.12)',
                    transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease-out',
                    pointerEvents: step === 0 ? 'auto' : 'none',
                  }}
                >
                  {/* Top: Two-digit number & title */}
                  <div>
                    <span className="text-[12px] font-semibold tracking-[0.2em] text-[#411401] block">
                      {item.number}
                    </span>

                    {/* Thin serif title with 16px top margin */}
                    <h3 className="font-taviraj text-[24px] lg:text-[28px] font-light text-[#411401] leading-snug mt-4">
                      {item.title}
                    </h3>
                  </div>

                  {/* Body description justified to the bottom edge */}
                  <p className="text-[14px] lg:text-[15px] text-[#411401]/85 leading-relaxed mt-auto pt-6">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Controls: Left/Right Round Arrow Buttons & Progress Dots */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={handlePrev}
              aria-label="Previous card"
              className="w-11 h-11 rounded-full border border-[#411401]/30 flex items-center justify-center text-[#411401] hover:opacity-60 transition-opacity cursor-pointer bg-white/70 shadow-sm"
            >
              <ChevronLeft className="w-5 h-5 stroke-[1.75]" />
            </button>

            {/* Ten dots between arrows */}
            <div className="flex items-center gap-2.5 flex-wrap justify-center max-w-[260px]">
              {audiences.map((_, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Go to card ${idx + 1}`}
                    className={`rounded-full transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'w-[10px] h-[10px] bg-[#411401]'
                        : 'w-[8px] h-[8px] border border-[#411401] bg-transparent'
                    }`}
                  />
                );
              })}
            </div>

            <button
              onClick={handleNext}
              aria-label="Next card"
              className="w-11 h-11 rounded-full border border-[#411401]/30 flex items-center justify-center text-[#411401] hover:opacity-60 transition-opacity cursor-pointer bg-white/70 shadow-sm"
            >
              <ChevronRight className="w-5 h-5 stroke-[1.75]" />
            </button>
          </div>
        </div>

        {/* MOBILE — STACK */}
        <div className="flex flex-col md:hidden gap-6">
          {audiences.map((item, index) => (
            <div
              key={item.number}
              className={`w-full bg-white rounded-[12px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 ease-out ${
                hasRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'
              }`}
              style={{
                boxShadow: '0px 12px 20px 4px rgba(230, 146, 76, 0.12)',
                transitionDelay: `${index * 60}ms`,
              }}
            >
              <div>
                <span className="text-[12px] font-semibold tracking-[0.2em] text-[#411401] block mb-1">
                  {item.number}
                </span>

                <h3 className="font-taviraj text-[22px] font-light text-[#411401] leading-snug mt-2">
                  {item.title}
                </h3>
              </div>

              <p className="text-[14px] text-[#411401]/85 leading-relaxed mt-4">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
