import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import package1Img from '../../assets/images/package-1.png';
import package2Img from '../../assets/images/package-2.png';
import package3Img from '../../assets/images/package-3.png';
import maintananceImg from '../../assets/images/maintanance.png';
import mwsPaymentImg from '../../assets/images/payment-terms (2).png';

interface CoachSpotlightsProps {
  onViewInstructors?: () => void;
  onBookInstructorClass?: (instructorName: string) => void;
  onRequestQuote?: (pkgLabel?: string) => void;
}

export interface PackageDetail {
  id: string;
  image: string;
  alt: string;
  title: string;
  subtitle: string;
  price: string;
  paymentTerms: string;
  badge: string;
  description: string;
  offers: string[];
  quoteLabel: string;
}

export const CoachSpotlights: React.FC<CoachSpotlightsProps> = ({
  onViewInstructors,
  onBookInstructorClass,
  onRequestQuote,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasRevealed, setHasRevealed] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const wheelLockRef = useRef(false);

  const packages: PackageDetail[] = [
    {
      id: '01',
      image: package1Img,
      alt: 'Starter Presence Package - R1,500',
      title: 'Starter Package',
      subtitle: 'Essential Online Business Presence',
      price: 'R1,500',
      paymentTerms: '50% deposit before work starts · 50% on completion',
      badge: 'Essential Presence',
      description:
        'Designed specifically for startups, sole proprietors, and small businesses looking to establish a professional, modern, and trustworthy online presence.',
      offers: [
        'Custom clean multi-section landing page / website',
        'Mobile-first responsive design (phones, tablets & desktops)',
        'Direct WhatsApp click-to-chat integration',
        'Interactive contact form & Google Map location',
        'Social media profile links & branding alignment',
        'Fast page loading speed & basic Google SEO setup',
        'Free deployment guidance & testing before handover',
      ],
      quoteLabel: 'Starter Package — R1,500',
    },
    {
      id: '02',
      image: package2Img,
      alt: 'Business Growth Package - R2,000',
      title: 'Business Growth Package',
      subtitle: 'High-Converting Platform For Growing Brands',
      price: 'R2,000',
      paymentTerms: '50% deposit before work starts · 50% on completion',
      badge: 'Most Popular',
      description:
        'Engineered for established and growing businesses that need to showcase their full services, customer proof, and convert online visitors into paying clients.',
      offers: [
        'Up to 5 comprehensive custom sections / pages',
        'Rich portfolio & services showcase galleries',
        'Interactive quote request & lead capture module',
        'Google Business Profile setup / optimization guidance',
        'Enhanced search engine optimization (SEO) metadata',
        'Client testimonials & trust badges showcase',
        'Performance speed optimization & security standards',
      ],
      quoteLabel: 'Business Growth Package — R2,000',
    },
    {
      id: '03',
      image: package3Img,
      alt: 'Complete Business Platform - R2,500',
      title: 'Complete Package',
      subtitle: 'All-Inclusive Full-Scale Digital Solution',
      price: 'R2,500',
      paymentTerms: '50% deposit before work starts · 50% on completion',
      badge: 'Full Scale',
      description:
        'Our most comprehensive web package for businesses seeking maximum digital visibility, customized interactive layouts, and priority project launch.',
      offers: [
        'Full multi-page corporate web application layout',
        'Custom interactive micro-interactions & sleek styling',
        'Advanced lead generation & booking inquiry workflows',
        'Full SEO architecture for higher search rankings',
        'Cross-platform responsiveness & browser compatibility',
        'Priority project delivery & direct communication',
        '30 days post-launch technical support & guidance',
      ],
      quoteLabel: 'Complete Package — R2,500',
    },
    {
      id: '04',
      image: maintananceImg,
      alt: 'Website Maintenance & Care Package',
      title: 'Website Maintenance',
      subtitle: 'Proactive Care, Speed & Security Monitoring',
      price: 'Flexible Retainer or On-Demand',
      paymentTerms: 'Keep your digital presence running without downtime',
      badge: 'Ongoing Support',
      description:
        'Keep your digital platform fast, secure, up-to-date, and error-free. We handle the technical upkeep so you can focus entirely on running your business.',
      offers: [
        'Regular software, plugin & security patch updates',
        'Content, text, photo, and price list updates',
        'Uptime and performance speed monitoring',
        'Automated website backup creation and recovery',
        'Broken link detection & contact form testing',
        'Priority technical assistance & emergency troubleshooting',
      ],
      quoteLabel: 'Website maintenance',
    },
    {
      id: '05',
      image: mwsPaymentImg,
      alt: 'Official Payment Terms - 50% Deposit & 50% Completion',
      title: 'Official Payment Terms',
      subtitle: 'Transparent, Fair Milestone-Based Structure',
      price: '50% Deposit · 50% On Completion',
      paymentTerms: 'Milestone structure for mutual security & confidence',
      badge: 'Payment Policy',
      description:
        'Clear and transparent financial terms. Work commences immediately upon payment of the 50% deposit, and the remaining 50% is only payable once you have reviewed, tested, and approved the completed website.',
      offers: [
        '50% deposit required prior to project kick-off',
        'Milestone-based progress reviews & preview links',
        'Remaining 50% payable upon completion & satisfaction',
        'Zero hidden fees or unexpected post-launch costs',
        'Free initial consultation & detailed written quotation',
        'Official invoices & receipts issued for every payment',
      ],
      quoteLabel: 'Custom quotation — price to be determined based on requirements',
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
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : packages.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < packages.length - 1 ? prev + 1 : 0));
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

  const handleCardClick = (_item: PackageDetail, index: number) => {
    setActiveIndex(index);
  };

  const handleQuoteClick = (pkg?: PackageDetail) => {
    const targetPkg = pkg || packages[activeIndex];
    const selected = targetPkg?.quoteLabel || 'Starter Package — R1,500';
    if (onRequestQuote) {
      onRequestQuote(selected);
    } else if (onBookInstructorClass) {
      onBookInstructorClass('General Quote');
    } else if (onViewInstructors) {
      onViewInstructors();
    } else {
      window.location.href = 'mailto:info@makuawebsolutions.co.za?subject=Request%20A%20Quote';
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
        {/* HEADER */}
        <div className="mb-14 md:mb-18 text-center">
          <div className="text-[12px] uppercase font-sans tracking-[0.3em] font-medium text-[#411401] mb-3">
            our packages
          </div>
          <h2 className="font-taviraj text-[30px] sm:text-[38px] md:text-[48px] font-light text-[#411401] tracking-tight leading-tight max-w-3xl mx-auto">
            Choose The Solution That Fits Your Business
          </h2>
          <p className="text-xs sm:text-sm text-[#411401]/75 mt-3 max-w-xl mx-auto">
            Explore our curated packages and request a direct quotation for your business.
          </p>
        </div>

        {/* DESKTOP — 3D SLIDE CAROUSEL */}
        <div className="hidden md:block select-none" onWheel={handleWheel}>
          <div
            className="relative w-full h-[480px] overflow-hidden flex items-center justify-center"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
            }}
          >
            {packages.map((item, index) => {
              const step = index - activeIndex;
              const isOutOfRange = Math.abs(step) > 2;
              const opacity = isOutOfRange ? 0 : Math.abs(step) === 2 ? 0.35 : Math.abs(step) === 1 ? 0.85 : 1;
              const scale = Math.max(0.72, 1 - Math.abs(step) * 0.08);
              const translateX = step * 280;
              const zIndex = 30 - Math.abs(step) * 10;

              return (
                <div
                  key={item.id}
                  onClick={() => handleCardClick(item, index)}
                  className="absolute top-3 left-1/2 w-[310px] flex items-center justify-center transition-all cursor-pointer"
                  style={{
                    transform: `translateX(calc(-50% + ${translateX}px)) scale(${scale})`,
                    opacity: isOutOfRange ? 0 : opacity,
                    zIndex,
                    transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease-out',
                    pointerEvents: isOutOfRange ? 'none' : 'auto',
                  }}
                >
                  <div className="relative overflow-hidden transition-transform duration-300">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="w-[310px] h-auto max-h-[440px] object-contain drop-shadow-[0_10px_20px_rgba(230,146,76,0.20)] select-none"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Controls: Left/Right Round Arrow Buttons & Progress Dots */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <button
              onClick={handlePrev}
              aria-label="Previous package"
              className="w-11 h-11 rounded-full border border-[#411401]/30 flex items-center justify-center text-[#411401] hover:opacity-60 transition-opacity cursor-pointer bg-white/70 shadow-sm active:scale-95"
            >
              <ChevronLeft className="w-5 h-5 stroke-[1.75]" />
            </button>

            {/* Dots between arrows */}
            <div className="flex items-center gap-2.5">
              {packages.map((_, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Go to package ${idx + 1}`}
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
              aria-label="Next package"
              className="w-11 h-11 rounded-full border border-[#411401]/30 flex items-center justify-center text-[#411401] hover:opacity-60 transition-opacity cursor-pointer bg-white/70 shadow-sm active:scale-95"
            >
              <ChevronRight className="w-5 h-5 stroke-[1.75]" />
            </button>
          </div>

          {/* Action CTA below carousel: Request Quote ONLY */}
          <div className="flex items-center justify-center mt-8">
            <button
              onClick={() => handleQuoteClick()}
              className="px-8 py-4 rounded-full bg-[#411401] text-[#FFFAA4] hover:bg-[#2e0e01] hover:text-white transition-all duration-300 font-semibold text-xs uppercase tracking-[0.22em] flex items-center gap-3 shadow-[0_8px_20px_rgba(65,20,1,0.18)] hover:shadow-[0_12px_28px_rgba(65,20,1,0.28)] active:scale-95 cursor-pointer"
            >
              <span>Request Quote</span>
              <ArrowRight className="w-4 h-4 stroke-[2]" />
            </button>
          </div>
        </div>

        {/* MOBILE — STACK */}
        <div className="flex flex-col md:hidden gap-7 items-center">
          {packages.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActiveIndex(index)}
              className={`w-full max-w-[320px] flex flex-col items-center transition-all duration-500 ease-out cursor-pointer ${
                hasRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'
              }`}
              style={{
                transitionDelay: `${index * 90}ms`,
              }}
            >
              <div className="relative overflow-hidden border border-[#CDBBB3]/40 bg-white/40 p-2 shadow-sm">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-auto object-contain drop-shadow-[0_10px_20px_rgba(230,146,76,0.20)]"
                />
              </div>
            </div>
          ))}

          {/* Action button below mobile stack */}
          <div className="w-full max-w-[320px] mt-2 flex flex-col gap-3">
            <button
              onClick={() => handleQuoteClick()}
              className="w-full py-4 px-6 rounded-full bg-[#411401] text-[#FFFAA4] hover:bg-[#2e0e01] font-semibold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_8px_20px_rgba(65,20,1,0.18)] active:scale-95"
            >
              <span>Request Quote</span>
              <ArrowRight className="w-4 h-4 stroke-[2]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
