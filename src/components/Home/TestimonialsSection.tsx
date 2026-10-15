import React from 'react';
import { 
  Sparkles, 
  Code2, 
  Globe2, 
  TrendingUp, 
  MapPin, 
  ShieldCheck, 
  Cpu 
} from 'lucide-react';

interface ServiceItem {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const SERVICES: ServiceItem[] = [
  {
    number: '01',
    title: 'Website Development',
    description: 'Professional, responsive websites designed around your business, services and goals.',
    icon: Code2,
  },
  {
    number: '02',
    title: 'Business Websites',
    description: 'Complete online platforms that showcase your company, services, projects, products and contact information.',
    icon: Globe2,
  },
  {
    number: '03',
    title: 'Digital Marketing',
    description: 'Help your business reach more people through digital marketing, social media promotion, content and AI-powered advertising.',
    icon: TrendingUp,
  },
  {
    number: '04',
    title: 'Google Business Profile',
    description: 'Setup and optimisation of your Google Business Profile to help customers find your business on Google Search and Maps.',
    icon: MapPin,
  },
  {
    number: '05',
    title: 'Website Maintenance',
    description: 'Keep your website secure, updated, functional and performing properly with ongoing technical support and maintenance.',
    icon: ShieldCheck,
  },
  {
    number: '06',
    title: 'AI-Powered Business Solutions',
    description: 'Use artificial intelligence to improve how your business operates, communicates with customers and handles everyday tasks.',
    icon: Cpu,
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#F0EFE9]" id="our-services">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 md:px-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] font-medium text-[#411401]/70 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#411401]" />
            <span>Our Services</span>
          </div>
          <h2 className="font-taviraj text-3xl sm:text-5xl font-light text-[#411401] leading-tight mb-5">
            Digital Solutions Built Around Your Business
          </h2>
          <p className="text-base sm:text-lg text-[#411401]/75 font-light leading-relaxed max-w-2xl mx-auto">
            We provide practical digital solutions designed to help businesses establish, improve and grow their online presence.
          </p>
        </div>

        {/* 6-Card Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                className="p-8 sm:p-9 rounded-[28px] bg-[#E7DCD5]/50 border border-[#CDBBB3]/60 flex flex-col justify-between shadow-[0_10px_25px_rgba(65,20,1,0.02)] transition-all duration-300 hover:bg-[#E7DCD5] hover:border-[#411401]/30 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#411401]/50">
                      {service.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#411401]/5 border border-[#411401]/10 flex items-center justify-center text-[#411401]">
                      <Icon className="w-5 h-5 stroke-[1.5]" />
                    </div>
                  </div>
                  <h3 className="font-taviraj text-2xl font-light text-[#411401] mb-3 leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-[15px] font-light text-[#411401]/80 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
