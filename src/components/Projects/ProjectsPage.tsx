import React, { useState } from 'react';
import {
  Sparkles,
  Info,
} from 'lucide-react';
import { QuotationForm } from '../Pricing/QuotationForm';

// Real completed projects logos and video
import nomzamoLogo from '../../assets/images/nomzamo.png';
import qcpLogo from '../../assets/images/qcp-logo.png';
import aiAdsVideo from '../../assets/images/ai-ads.mp4';

// Website Mockup Demo Designs
import restaurantImg from '../../assets/images/restaurant.png';
import weddingImg from '../../assets/images/wedding.png';
import cateringImg from '../../assets/images/catering.png';
import constructionImg from '../../assets/images/construction.png';
import guestHouseImg from '../../assets/images/guest-house.png';
import fashionStoreImg from '../../assets/images/fashion-store.png';
import gameReserveImg from '../../assets/images/game-reserve.png';
import funeralImg from '../../assets/images/funeral.png';

interface ProjectsPageProps {
  onToast: (msg: string) => void;
  onRequestQuoteModal?: (serviceOrPkg?: string) => void;
}

interface MockupItem {
  id: string;
  title: string;
  image: string;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  onToast,
  onRequestQuoteModal,
}) => {
  // Selected mockup associated with the quotation request
  const [selectedMockup, setSelectedMockup] = useState<MockupItem | null>(null);

  // Real Completed Projects (Logos only)
  const completedProjects = [
    {
      id: 'nomzamo',
      name: 'Nomzamo Enterprise',
      url: 'https://nomzamoenterprise.co.za',
      logo: nomzamoLogo,
    },
    {
      id: 'qubekela',
      name: 'Qubekelaphambile',
      url: 'https://qubekelaphambile.co.za',
      logo: qcpLogo,
    },
  ];

  // Website Mockups (Design Previews)
  const mockups: MockupItem[] = [
    {
      id: 'restaurant',
      title: 'Restaurant & Dining',
      image: restaurantImg,
    },
    {
      id: 'wedding',
      title: 'Wedding & Events',
      image: weddingImg,
    },
    {
      id: 'catering',
      title: 'Catering & Hospitality',
      image: cateringImg,
    },
    {
      id: 'construction',
      title: 'Construction & Engineering',
      image: constructionImg,
    },
    {
      id: 'guest-house',
      title: 'Guest House & Lodge',
      image: guestHouseImg,
    },
    {
      id: 'fashion-store',
      title: 'Fashion Store & Boutique',
      image: fashionStoreImg,
    },
    {
      id: 'game-reserve',
      title: 'Game Reserve & Safari',
      image: gameReserveImg,
    },
    {
      id: 'funeral',
      title: 'Funeral Services',
      image: funeralImg,
    },
  ];

  // Configure Purchase Design Button: associates mockup and redirects to quotation form section
  const handlePurchaseDesign = (mockup: MockupItem) => {
    setSelectedMockup(mockup);
    const formSection = document.getElementById('quotation-form-section');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
    onToast(`Selected "${mockup.title}". Please complete your quotation request below.`);
  };

  return (
    <div className="w-full bg-[#F0EFE9] min-h-screen text-[#411401]">
      {/* 1. Header Hero Banner */}
      <section className="w-full bg-[#411401] text-[#F0EFE9] pt-32 sm:pt-40 pb-16 sm:pb-20 px-6 sm:px-12 md:px-20 border-b border-[#CDBBB3]/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFFAA4]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-[1400px] mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] font-medium text-[#FFFAA4] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Makua Web Solutions · Projects</span>
          </div>

          <h1 className="font-taviraj text-3xl sm:text-5xl md:text-6xl font-extralight tracking-tight text-[#F0EFE9] max-w-4xl mx-auto leading-tight">
            Real Projects. Creative Designs. Digital Possibilities.
          </h1>

          <p className="font-taviraj text-base sm:text-xl md:text-2xl font-light text-[#FFFAA4] max-w-2xl mx-auto mt-4 leading-relaxed italic text-balance">
            “See What We’ve Built. Choose What We Can Build for You.”
          </p>
        </div>
      </section>

      {/* 2. Real Completed Projects Showcase (Web Clients + AI Video Ads) */}
      <section className="py-14 sm:py-20 max-w-[1400px] mx-auto px-6 sm:px-12 md:px-20">
        <div className="flex flex-col items-center justify-center gap-10 sm:gap-14 max-w-4xl mx-auto">
          {/* Real Completed Client Logos */}
          <div className="flex flex-wrap items-center justify-center gap-12 sm:gap-24">
            {completedProjects.map((proj) => (
              <a
                key={proj.id}
                href={proj.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block transition-transform duration-300 hover:scale-105 cursor-pointer"
                title={`Visit ${proj.name}`}
              >
                <img
                  src={proj.logo}
                  alt={proj.name}
                  className="max-h-24 sm:max-h-28 md:max-h-32 w-auto object-contain"
                />
              </a>
            ))}
          </div>

          {/* Completed AI Video Production Showcase */}
          <div className="flex flex-col items-center max-w-sm w-full mx-auto">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_45px_rgba(65,20,1,0.18)] border-2 border-[#C69D50]/40 bg-black aspect-[9/16]">
              <video
                src={aiAdsVideo}
                autoPlay
                loop
                muted
                playsInline
                controls
                preload="auto"
                className="w-full h-full object-cover block"
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <p className="mt-3 text-[11px] sm:text-xs uppercase tracking-[0.25em] font-medium text-[#411401]/75 text-center">
              AI Video Ads · Production
            </p>
          </div>

          {/* Tagline below completed projects */}
          <div className="text-center mt-2">
            <p className="font-taviraj text-base sm:text-lg md:text-xl text-[#411401]/80 italic">
              completed projects by 2026
            </p>
          </div>
        </div>
      </section>

      {/* 3. Website Mockups Section */}
      <section className="py-16 sm:py-20 bg-[#E9E4DC] border-t border-b border-[#D8CCC4]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 md:px-20">
          
          {/* Notice: Design Previews For Undecided Clients */}
          <div className="max-w-2xl mx-auto text-center mb-10">
            <div className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#411401] text-[#FFFAA4] text-xs uppercase tracking-[0.2em] font-semibold shadow-sm">
              <Info className="w-4 h-4 text-[#FFFAA4]" />
              <span>Notice: Design Previews For Undecided Clients</span>
            </div>
          </div>

          {/* Minimized Website Mockups (No names, no purchase design button, minimized previews) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-5xl mx-auto items-start">
            {mockups.map((item) => (
              <div
                key={item.id}
                onClick={() => handlePurchaseDesign(item)}
                className="group flex flex-col bg-white border border-[#D8CCC4] shadow-sm hover:shadow-md hover:border-[#411401]/40 transition-all duration-300 overflow-hidden cursor-pointer"
                title={`Select ${item.title}`}
              >
                {/* Minimized mockup preview image */}
                <div className="w-full bg-[#FAF9F5] overflow-hidden flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto object-contain block transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Customised Quotation Request Section (Reusing Existing QuotationForm) */}
      <section
        id="quotation-form-section"
        className="py-16 sm:py-24 max-w-[1000px] mx-auto px-6 sm:px-12 scroll-mt-24"
      >
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-[0.3em] font-medium text-[#411401]/60 block mb-2">
            Quotation Request Portal
          </span>
          <h2 className="font-taviraj text-3xl sm:text-5xl font-light text-[#411401] leading-tight">
            Customise Your Website Design
          </h2>
          <p className="text-sm text-[#411401]/75 mt-3">
            {selectedMockup
              ? `You have selected the "${selectedMockup.title}" design. Choose your package and submit your details below to request your quotation.`
              : 'Complete the quotation form below with your project goals and preferred package.'}
          </p>
        </div>

        {/* Reusing existing QuotationForm without duplicate creation */}
        <QuotationForm
          initialMockupTitle={selectedMockup?.title}
          initialPackage="Starter Package — R1,500"
          onSuccess={(ref) => {
            onToast(`Quotation request submitted successfully (Ref: ${ref})!`);
          }}
        />
      </section>
    </div>
  );
};
