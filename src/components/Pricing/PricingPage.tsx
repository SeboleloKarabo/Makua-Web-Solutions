import React, { useState } from 'react';
import {
  Sparkles,
  Check,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  Clock,
  Layers,
  Code2,
  TrendingUp,
  Cpu,
} from 'lucide-react';
import { QuotationForm } from './QuotationForm';
import { QuotationProcessSection } from './QuotationProcessSection';

interface PricingPageProps {
  onToast: (msg: string) => void;
  onNavigateToSchedule?: () => void;
  initialSelectedPackage?: string;
}

export const PricingPage: React.FC<PricingPageProps> = ({
  onToast,
  initialSelectedPackage = 'Starter Package — R1,500',
}) => {
  const [activePackage, setActivePackage] = useState<string>(initialSelectedPackage);

  const websitePackages = [
    {
      id: 'starter',
      label: 'Starter Package — R1,500',
      title: 'Starter Package',
      price: 'R1,500',
      badge: 'Essential Presence',
      description: 'Ideal for small businesses and startups establishing a professional web presence.',
      features: [
        'Responsive mobile-first design',
        'Custom modern layout & typography',
        'WhatsApp direct messaging integration',
        'Contact form & location details',
        'Basic SEO setup & fast loading speed',
        'Social media links & branding',
      ],
      popular: false,
      cta: 'Request Starter Quote',
    },
    {
      id: 'growth',
      label: 'Business Growth Package — R2,000',
      title: 'Business Growth Package',
      price: 'R2,000',
      badge: 'Most Popular',
      description: 'Engineered for growing businesses looking to attract more customers and convert leads.',
      features: [
        'Complete multi-section business platform',
        'Showcase services, portfolio & offerings',
        'Interactive contact & quote request capture',
        'Google Business Profile integration support',
        'Enhanced SEO & mobile speed optimization',
        'Social proof & customer testimonial display',
      ],
      popular: true,
      cta: 'Request Growth Quote',
    },
    {
      id: 'complete',
      label: 'Complete Package — R2,500',
      title: 'Complete Package',
      price: 'R2,500',
      badge: 'Full Scale',
      description: 'All-inclusive digital solution for businesses seeking maximum visibility and impact.',
      features: [
        'Full comprehensive multi-page online platform',
        'Interactive showcase with rich animations',
        'Integrated quotation & lead management',
        'Advanced performance tuning & security',
        'Custom branding & content layout architecture',
        'Priority technical support & launch assistance',
      ],
      popular: false,
      cta: 'Request Complete Quote',
    },
    {
      id: 'custom',
      label: 'Custom quotation — price to be determined based on requirements',
      title: 'Custom Quotation',
      price: 'Tailored Scope',
      badge: 'Bespoke Solutions',
      description: 'Custom web applications, e-commerce storefronts, AI chatbots, automation and advertising.',
      features: [
        'Bespoke web applications & portals',
        'AI chatbot & business workflow automations',
        'E-commerce & custom payment checkouts',
        'AI-powered advertising & campaigns',
        'Custom database integrations',
        'Ongoing maintenance & SLA support',
      ],
      popular: false,
      cta: 'Request Custom Quote',
    },
  ];

  const handleSelectPackageCard = (pkgLabel: string) => {
    setActivePackage(pkgLabel);
    const formEl = document.getElementById('quotation-form-section');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
    onToast(`Selected ${pkgLabel}. Fill in your details below to request your quotation.`);
  };

  return (
    <div className="w-full bg-[#F0EFE9] min-h-screen text-[#411401]">
      
      {/* 1. Hero Band: "Transparent Pricing & Quotations" */}
      <section className="w-full bg-[#411401] text-[#F0EFE9] pt-32 sm:pt-40 pb-20 sm:pb-28 px-6 sm:px-12 md:px-20 border-b border-[#CDBBB3]/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFFAA4]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-[1400px] mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] font-medium text-[#FFFAA4] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Makua Web Solutions · Pricing & Quotations</span>
          </div>

          <h1 className="font-taviraj text-4xl sm:text-6xl md:text-7xl font-extralight tracking-tight text-[#F0EFE9] max-w-4xl mx-auto leading-tight">
            Transparent Pricing. Measurable Growth.
          </h1>

          <p className="font-taviraj text-lg sm:text-2xl md:text-3xl font-light text-[#FFFAA4] max-w-3xl mx-auto mt-6 leading-relaxed italic text-balance">
            “Practical digital solutions designed to help your business establish, improve and grow online.”
          </p>

          <p className="text-xs uppercase tracking-[0.25em] text-[#E0CFC9]/80 mt-4">
            Clear Payment Terms · 50% Deposit Before Work Starts · 50% on Completion
          </p>
        </div>
      </section>

      {/* 2. Highlight Banner: Payment Terms Callout */}
      <section className="max-w-[1400px] mx-auto px-6 sm:px-12 md:px-20 -mt-10 sm:-mt-12 relative z-20">
        <div className="rounded-[28px] bg-gradient-to-r from-[#F6BF8E] via-[#FFFAA4] to-[#F6BF8E] p-8 sm:p-10 shadow-xl border border-[#411401]/10 flex flex-col md:flex-row items-center justify-between gap-6 text-[#411401]">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#411401]/80 block mb-1">
              Standard Engagement Terms
            </span>
            <h3 className="font-taviraj text-2xl sm:text-3xl font-medium leading-tight">
              Payment Terms: 50% before work starts, 50% on completion
            </h3>
            <p className="text-xs sm:text-sm text-[#411401]/85 mt-2 max-w-2xl">
              Transparent, milestone-based pricing with no surprise charges. Submitting a quotation request is completely free and non-binding.
            </p>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById('quotation-form-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 rounded-full bg-[#411401] text-[#FFFAA4] hover:bg-[#2c0d01] hover:text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-md shrink-0 flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <span>Request a Quote</span>
            <ArrowRight className="w-4 h-4 stroke-[2]" />
          </button>
        </div>
      </section>

      {/* 3. Website Packages Grid */}
      <section className="py-20 sm:py-28 max-w-[1400px] mx-auto px-6 sm:px-12 md:px-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-medium text-[#411401]/60 block mb-2">
            Our Website Packages
          </span>
          <h2 className="font-taviraj text-3xl sm:text-5xl font-light text-[#411401] leading-tight">
            Choose The Solution That Fits Your Business
          </h2>
          <p className="text-sm text-[#411401]/75 mt-3">
            Fixed transparent pricing on standard website tiers, plus tailored quotes for custom platforms and AI automations.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {websitePackages.map((pkg) => {
            const isFeatured = pkg.popular;
            return (
              <div
                key={pkg.id}
                className={`rounded-[28px] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 relative border ${
                  isFeatured
                    ? 'bg-[#FFFAA4] text-[#411401] border-2 border-[#411401] shadow-[0_20px_40px_rgba(65,20,1,0.12)] lg:-translate-y-2'
                    : 'bg-white text-[#411401] border-[#CDBBB3] hover:shadow-lg'
                }`}
              >
                {/* Badge if featured */}
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#411401] text-[#FFFAA4] text-[10px] uppercase tracking-[0.22em] font-bold shadow-md">
                    ★ Most Popular
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase tracking-[0.25em] font-semibold opacity-75">
                      {pkg.badge}
                    </span>
                  </div>

                  <h3 className="font-taviraj text-2xl font-medium leading-snug">
                    {pkg.title}
                  </h3>

                  {/* Price */}
                  <div className="mt-4 mb-6 pb-4 border-b border-[#411401]/15">
                    <div className="font-taviraj text-4xl font-light tracking-tight tabular-nums">
                      {pkg.price}
                    </div>
                    <span className="text-[11px] opacity-70 block mt-1">
                      {pkg.id === 'custom' ? 'Tailored based on requirements' : '50% deposit · 50% on completion'}
                    </span>
                  </div>

                  <p className="text-xs text-[#411401]/80 leading-relaxed mb-6">
                    {pkg.description}
                  </p>

                  {/* Features list */}
                  <div className="space-y-3 mb-8">
                    <span className="text-[10px] uppercase tracking-[0.25em] font-bold opacity-60 block">
                      Included Features:
                    </span>
                    {pkg.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs leading-relaxed">
                        <Check className="w-3.5 h-3.5 text-[#411401] shrink-0 mt-0.5" />
                        <span className="opacity-90">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleSelectPackageCard(pkg.label)}
                  className={`w-full py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95 ${
                    isFeatured
                      ? 'bg-[#411401] text-[#FFFAA4] hover:bg-[#2c0d01]'
                      : 'bg-[#F0EFE9] hover:bg-[#411401] hover:text-[#FFFAA4] text-[#411401] border border-[#CDBBB3]'
                  }`}
                >
                  <span>{pkg.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Dedicated Quotation Form Section */}
      <section
        id="quotation-form-section"
        className="py-16 sm:py-24 max-w-[1000px] mx-auto px-6 sm:px-12 scroll-mt-24"
      >
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-[0.3em] font-medium text-[#411401]/60 block mb-2">
            Online Quotation Form
          </span>
          <h2 className="font-taviraj text-3xl sm:text-5xl font-light text-[#411401] leading-tight">
            Request Your Quotation
          </h2>
          <p className="text-sm text-[#411401]/75 mt-3">
            Complete the form below with your project goals. We will review your enquiry and provide a clear, comprehensive quote.
          </p>
        </div>

        <QuotationForm
          initialPackage={activePackage}
          onSuccess={(ref) => {
            onToast(`Quotation submitted successfully (Ref: ${ref})!`);
          }}
        />

        {/* How It Works & Payment Terms Section */}
        <div className="mt-16">
          <QuotationProcessSection />
        </div>
      </section>

      {/* 5. Frequently Asked Questions */}
      <section className="py-20 sm:py-28 max-w-[1200px] mx-auto px-6 sm:px-12 md:px-20 border-t border-[#E7DCD5]">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.3em] font-medium text-[#411401]/60 block mb-2">
            Common Questions
          </span>
          <h2 className="font-taviraj text-3xl sm:text-4xl font-light text-[#411401] leading-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E7DCD5] space-y-2">
            <h4 className="font-taviraj text-lg font-medium text-[#411401]">
              How does the 50/50 payment term work?
            </h4>
            <p className="text-xs sm:text-sm text-[#411401]/75 leading-relaxed">
              Once you review and approve the written quotation, a 50% deposit is payable before any development or design work commences. The remaining 50% is payable upon completion, once you have reviewed and tested the finished solution.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E7DCD5] space-y-2">
            <h4 className="font-taviraj text-lg font-medium text-[#411401]">
              Does submitting a quotation request commit me?
            </h4>
            <p className="text-xs sm:text-sm text-[#411401]/75 leading-relaxed">
              No. Submitting a quotation request is completely free and carries zero obligation. It allows Makua Web Solutions to evaluate your scope and send you an accurate estimate.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E7DCD5] space-y-2">
            <h4 className="font-taviraj text-lg font-medium text-[#411401]">
              Can I get a custom quote for services without fixed prices?
            </h4>
            <p className="text-xs sm:text-sm text-[#411401]/75 leading-relaxed">
              Yes, absolutely. For custom web applications, e-commerce storefronts, AI chatbot automations, or ongoing digital marketing, select "Custom quotation" in the form above and describe your requirements.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E7DCD5] space-y-2">
            <h4 className="font-taviraj text-lg font-medium text-[#411401]">
              Can I contact Makua Web Solutions directly on WhatsApp?
            </h4>
            <p className="text-xs sm:text-sm text-[#411401]/75 leading-relaxed">
              Yes! You can chat with us directly on WhatsApp at <strong>0712848087</strong>. After submitting the quotation form, an optional "Continue on WhatsApp" button will also appear with your enquiry reference.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
