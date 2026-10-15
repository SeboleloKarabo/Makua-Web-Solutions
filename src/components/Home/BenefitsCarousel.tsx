import React from 'react';
import {
  Briefcase,
  Smartphone,
  Target,
  Cpu,
  Headphones,
} from 'lucide-react';

export const BenefitsCarousel: React.FC = () => {
  const features = [
    {
      number: '01',
      title: 'Professional',
      desc: 'We create websites that represent your business professionally.',
      icon: Briefcase,
    },
    {
      number: '02',
      title: 'Mobile-Friendly',
      desc: 'Your website is designed to work across smartphones, tablets and computers.',
      icon: Smartphone,
    },
    {
      number: '03',
      title: 'Business-Focused',
      desc: 'We focus on what your website needs to achieve for your business.',
      icon: Target,
    },
    {
      number: '04',
      title: 'Modern Technology',
      desc: 'We use modern web technologies and AI-powered tools to create effective digital solutions.',
      icon: Cpu,
    },
    {
      number: '05',
      title: 'Ongoing Support',
      desc: 'We can continue supporting your website after launch through our maintenance services.',
      icon: Headphones,
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#F0EFE9] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 md:px-20">
        {/* Top Header */}
        <div className="mb-16 sm:mb-20 text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] font-medium text-[#411401]/70 block mb-3">
            Why Choose MWS?
          </span>
          <h2 className="font-taviraj text-3xl sm:text-4xl md:text-5xl font-light text-[#411401] leading-tight mb-4">
            More Than Just A Website
          </h2>
          <p className="text-base sm:text-lg text-[#411401]/80 leading-relaxed">
            We don't just build websites. We help businesses create a stronger digital presence.
          </p>
        </div>

        {/* 5 Feature Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-white/85 backdrop-blur-sm border border-[#CDBBB3]/40 rounded-[24px] p-7 sm:p-8 transition-all duration-300 hover:border-[#411401]/30 hover:shadow-[0_16px_35px_rgba(65,20,1,0.08)] hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-semibold tracking-[0.2em] text-[#411401]/50 tabular-nums">
                      {feature.number}
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-[#FFFAA4]/90 flex items-center justify-center text-[#411401] shadow-xs">
                      <Icon className="w-5 h-5 stroke-[1.75]" />
                    </div>
                  </div>

                  <h3 className="font-taviraj text-xl sm:text-2xl font-normal text-[#411401] leading-snug mb-3">
                    {feature.title}
                  </h3>
                </div>

                <p className="text-sm text-[#411401]/80 leading-relaxed mt-2 pt-2 border-t border-[#CDBBB3]/20">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
