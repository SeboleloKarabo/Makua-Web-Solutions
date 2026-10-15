import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  Check,
  TrendingUp,
  Cpu,
  MapPin,
  Code2,
  Globe,
  Wrench,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';

interface SchedulePageProps {
  onToast: (msg: string) => void;
  onRequestQuote?: (serviceName?: string) => void;
}

interface ServiceSolution {
  id: string;
  number: string;
  title: string;
  category: string;
  badge: string;
  description: string;
  features: string[];
  icon: React.ComponentType<{ className?: string }>;
}

export const SchedulePage: React.FC<SchedulePageProps> = ({
  onToast,
  onRequestQuote,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [heroTitleText, setHeroTitleText] = useState('');

  // Typewriter effect for headline: "Digital solutions built around your business"
  useEffect(() => {
    const fullText = 'Digital solutions built around your business';
    let idx = 0;
    const interval = setInterval(() => {
      if (idx <= fullText.length) {
        setHeroTitleText(fullText.slice(0, idx));
        idx++;
      } else {
        clearInterval(interval);
      }
    }, 35);
    return () => clearInterval(interval);
  }, []);

  const solutions: ServiceSolution[] = [
    {
      id: 'digital-marketing',
      number: '01',
      title: 'Digital Marketing',
      category: 'Marketing',
      badge: 'Reach & Awareness',
      description:
        'We help businesses reach more customers online through social media marketing, digital advertising, content creation and marketing campaigns that increase brand awareness and promote business growth.',
      features: [
        'Social media marketing & audience growth',
        'Targeted digital advertising & ad campaigns',
        'Engaging content creation & brand messaging',
        'Performance tracking & lead generation',
      ],
      icon: TrendingUp,
    },
    {
      id: 'ai-solutions',
      number: '02',
      title: 'AI-Powered Business Solutions',
      category: 'Automation',
      badge: 'Smart Efficiency',
      description:
        'We help businesses work smarter using AI-powered tools such as chatbots, automated customer enquiries and AI assistants to save time, improve customer service and simplify daily tasks.',
      features: [
        'AI chatbots for 24/7 instant client support',
        'Automated customer enquiry qualification',
        'AI assistants to streamline everyday tasks',
        'Workflow automation & operations efficiency',
      ],
      icon: Cpu,
    },
    {
      id: 'google-business-profile',
      number: '03',
      title: 'Google Business Profile',
      category: 'Visibility',
      badge: 'Search & Maps',
      description:
        'We help businesses create, set up and optimise their Google Business Profile so customers can find them on Google Search and Google Maps, view their services, check contact details and connect with their business.',
      features: [
        'Profile creation, verification & optimisation',
        'Google Maps & Google Search local visibility',
        'Showcase services, business hours & contacts',
        'Direct call & direction button connectivity',
      ],
      icon: MapPin,
    },
    {
      id: 'website-development',
      number: '04',
      title: 'Website Development',
      category: 'Development',
      badge: 'Core Online Presence',
      description:
        'Professional, responsive websites designed around your business, services and goals.',
      features: [
        'Fast, responsive mobile-first architecture',
        'Custom clean design & high-end typography',
        'WhatsApp direct messaging integration',
        'Search engine optimisation (SEO) foundations',
      ],
      icon: Code2,
    },
    {
      id: 'business-websites',
      number: '05',
      title: 'Business Websites',
      category: 'Development',
      badge: 'Complete Platform',
      description:
        'Complete online platforms that showcase your company, services, projects, products and contact information.',
      features: [
        'Comprehensive multi-section company showcase',
        'Projects & portfolio presentations',
        'Lead capture & custom quote requests',
        'Company credibility & testimonial displays',
      ],
      icon: Globe,
    },
    {
      id: 'website-maintenance',
      number: '06',
      title: 'Website Maintenance',
      category: 'Support',
      badge: 'Security & Updates',
      description:
        'Keep your website secure, updated, functional and performing properly with ongoing technical support and maintenance.',
      features: [
        'Routine security checks & system monitoring',
        'Content updates & image optimizations',
        'Speed performance tuning & troubleshooting',
        'Priority technical assistance & peace of mind',
      ],
      icon: Wrench,
    },
  ];

  const filterTabs = [
    { label: 'All Solutions', id: 'All' },
    { label: '1. Digital Marketing', id: 'digital-marketing' },
    { label: '2. AI-Powered Business Solutions', id: 'ai-solutions' },
    { label: '3. Google Business Profile', id: 'google-business-profile' },
  ];

  const filteredSolutions =
    selectedFilter === 'All'
      ? solutions
      : solutions.filter((s) => s.id === selectedFilter);

  const handleQuoteClick = (serviceTitle: string) => {
    if (onRequestQuote) {
      onRequestQuote(serviceTitle);
    } else {
      window.location.href = `mailto:info@makuawebsolutions.co.za?subject=Quotation%20Request%20-%20${encodeURIComponent(
        serviceTitle
      )}`;
    }
  };

  return (
    <div className="w-full bg-[#F0EFE9] min-h-screen text-[#411401]">
      
      {/* 1. Dark Espresso Hero Band */}
      <section className="w-full bg-[#411401] text-[#F0EFE9] pt-32 sm:pt-40 pb-20 sm:pb-24 px-6 sm:px-12 md:px-20 border-b border-[#CDBBB3]/20 relative overflow-hidden">
        {/* Subtle geometric pattern & glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFFAA4]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-72 h-72 bg-[#F6BF8E]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          {/* Eyebrow: Our Services */}
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] font-medium text-[#FFFAA4] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Services</span>
          </div>

          {/* Headline: Digital solutions built around your business */}
          <h1 className="font-taviraj text-3xl sm:text-5xl md:text-6xl font-extralight text-[#F0EFE9] tracking-tight min-h-[1.25em]">
            {heroTitleText}
            {heroTitleText.length < 44 && (
              <span className="inline-block w-2 sm:w-3 h-7 sm:h-12 bg-[#FFFAA4] ml-2 animate-pulse align-middle" />
            )}
          </h1>

          {/* Subtitle Paragraph */}
          <p className="mt-4 text-sm sm:text-base text-[#E0CFC9] max-w-2xl leading-relaxed">
            We provide practical digital solutions designed to help businesses establish, improve and grow their online presence.
          </p>
        </div>
      </section>

      {/* 2. Solutions Tabs Selector Bar (Replacing Monday, Tuesday, Wednesday) */}
      <section className="py-6 sm:py-8 bg-[#E7DCD5]/60 border-b border-[#CDBBB3]/60 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 md:px-20">
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 pt-1 scrollbar-none">
            {filterTabs.map((tab) => {
              const isSelected = selectedFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFilter(tab.id)}
                  className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.18em] font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-[#411401] text-[#FFFAA4] shadow-md scale-102'
                      : 'bg-white/80 hover:bg-white text-[#411401]/80 hover:text-[#411401] border border-[#CDBBB3]/60'
                  }`}
                >
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Solutions Cards Grid */}
      <section className="py-16 sm:py-24 max-w-[1400px] mx-auto px-6 sm:px-12 md:px-20">
        
        {/* Results Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#CDBBB3]/50 text-xs uppercase tracking-[0.2em] text-[#411401]/60">
          <span>
            {selectedFilter === 'All'
              ? 'All Digital Solutions & Google Business Profile'
              : filterTabs.find((t) => t.id === selectedFilter)?.label}
          </span>
          {selectedFilter !== 'All' && (
            <button
              onClick={() => setSelectedFilter('All')}
              className="text-[#411401] hover:underline font-semibold cursor-pointer"
            >
              Show All Solutions
            </button>
          )}
        </div>

        {/* Cards Grid with Soft Cream-to-Butter-Yellow Gradient */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSolutions.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="rounded-[28px] bg-gradient-to-br from-[#FAF9F5] via-[#F4EFE6] to-[#FFFDD6] border border-[#CDBBB3]/70 p-7 sm:p-8 flex flex-col justify-between shadow-[0_8px_25px_rgba(65,20,1,0.03)] hover:shadow-[0_16px_35px_rgba(65,20,1,0.08)] transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  {/* Card Top: Number, Badge & Icon */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-taviraj text-2xl font-light text-[#411401]/40 tabular-nums">
                      {item.number}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-wider text-[#411401]/80 bg-white/80 px-2.5 py-0.5 rounded-full border border-[#CDBBB3]/50 font-semibold">
                        {item.badge}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-[#FFFAA4] flex items-center justify-center text-[#411401]">
                        <IconComponent className="w-4 h-4 stroke-[2]" />
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-taviraj text-2xl sm:text-3xl font-medium text-[#411401] leading-snug mt-1">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#411401]/85 mt-4 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Feature Bullets */}
                  <div className="space-y-2.5 mt-6 pt-5 border-t border-[#CDBBB3]/40">
                    <span className="text-[10px] uppercase tracking-[0.22em] font-bold text-[#411401]/60 block mb-1">
                      Key Highlights:
                    </span>
                    {item.features.map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        className="flex items-start gap-2 text-xs text-[#411401]/90 leading-relaxed"
                      >
                        <Check className="w-3.5 h-3.5 text-[#411401] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Bottom: Request Quote Button */}
                <div className="mt-8 pt-5 border-t border-[#CDBBB3]/40 flex items-center justify-end">
                  <button
                    onClick={() => handleQuoteClick(item.title)}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#411401] text-[#FFFAA4] hover:bg-[#2c0d01] hover:text-white transition-all text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
                  >
                    <span>Request Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Closing Callout Banner */}
      <section className="max-w-[1400px] mx-auto px-6 sm:px-12 md:px-20 pb-20 sm:pb-28">
        <div className="rounded-[28px] bg-gradient-to-r from-[#F6BF8E] via-[#FFFAA4] to-[#F6BF8E] p-8 sm:p-12 border border-[#411401]/10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-8 text-[#411401]">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#411401]/70 block">
              Makua Web Solutions
            </span>
            <h3 className="font-taviraj text-2xl sm:text-4xl font-light leading-tight">
              Ready to grow your business online?
            </h3>
            <p className="text-xs sm:text-sm text-[#411401]/80 leading-relaxed">
              Contact us today for a free consultation or customised quotation. Transparent pricing with 50% deposit before work starts and 50% upon completion.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleQuoteClick('General Digital Solution')}
              className="px-8 py-4 rounded-full bg-[#411401] text-[#FFFAA4] hover:bg-[#2c0d01] text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Request Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="https://wa.me/27712848087"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              title="Chat on WhatsApp (0712848087)"
              className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-md flex items-center justify-center transition-all cursor-pointer active:scale-95 shrink-0"
            >
              <svg
                className="w-6 h-6 fill-white"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12.031 2C6.495 2 2 6.494 2 12.029c0 1.956.562 3.784 1.536 5.334L2 22.031l4.821-1.503c1.478.895 3.208 1.411 5.061 1.411 5.536 0 10.03-4.495 10.03-10.029 0-5.535-4.494-10.029-10.03-10.029zm5.955 14.175c-.247.697-1.436 1.332-1.99 1.418-.517.081-1.189.117-1.923-.118-.466-.149-1.066-.35-1.838-.685-3.238-1.407-5.344-4.664-5.506-4.879-.161-.215-1.312-1.745-1.312-3.328 0-1.583.829-2.361 1.121-2.683.292-.323.637-.404.85-.404.213 0 .426.002.613.011.198.01.464-.075.726.554.27.648.918 2.242 1 2.404.081.162.135.351.027.566-.108.216-.162.35-.323.539-.162.189-.341.422-.487.567-.162.162-.331.338-.142.662.189.324.84 1.378 1.802 2.235 1.238 1.103 2.28 1.444 2.604 1.606.324.162.513.135.702-.081.189-.216.81-.944 1.026-1.268.216-.324.432-.27.729-.162.297.108 1.89.891 2.214 1.053.324.162.54.243.621.378.081.135.081.783-.166 1.48z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
