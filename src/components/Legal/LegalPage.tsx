import React, { useState } from 'react';
import { Shield, FileText, Eye, CheckCircle2, ArrowLeft } from 'lucide-react';

interface LegalPageProps {
  onBackToHome: () => void;
  defaultTab?: 'privacy' | 'terms' | 'accessibility';
}

export const LegalPage: React.FC<LegalPageProps> = ({ onBackToHome, defaultTab = 'privacy' }) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'accessibility'>(defaultTab);

  return (
    <div className="w-full bg-[#F0EFE9] min-h-screen pt-32 sm:pt-40 pb-24 px-6 sm:px-12 md:px-20 text-[#411401]">
      <div className="max-w-[1000px] mx-auto">
        
        {/* Back button */}
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#411401]/70 hover:text-[#411401] mb-8 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Home</span>
        </button>

        {/* Heading */}
        <div className="border-b border-[#CDBBB3]/60 pb-8 mb-10">
          <span className="text-xs uppercase tracking-[0.3em] font-medium text-[#411401]/60 block mb-2">
            Standards & Integrity
          </span>
          <h1 className="font-taviraj text-4xl sm:text-5xl font-light text-[#411401]">
            Policies & Commitments
          </h1>
          <p className="text-sm text-[#411401]/80 mt-2">
            Clear, transparent parameters governing your privacy, service agreements, and digital accessibility.
          </p>
        </div>

        {/* Segmented Tab Controls */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-[#E7DCD5]/80 rounded-2xl border border-[#CDBBB3]/60 mb-12">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-5 py-2.5 rounded-xl text-xs uppercase tracking-[0.18em] font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'privacy'
                ? 'bg-[#411401] text-[#FFFAA4] shadow-sm'
                : 'text-[#411401]/70 hover:text-[#411401]'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`px-5 py-2.5 rounded-xl text-xs uppercase tracking-[0.18em] font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'terms'
                ? 'bg-[#411401] text-[#FFFAA4] shadow-sm'
                : 'text-[#411401]/70 hover:text-[#411401]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Terms of Service</span>
          </button>

          <button
            onClick={() => setActiveTab('accessibility')}
            className={`px-5 py-2.5 rounded-xl text-xs uppercase tracking-[0.18em] font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'accessibility'
                ? 'bg-[#411401] text-[#FFFAA4] shadow-sm'
                : 'text-[#411401]/70 hover:text-[#411401]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Accessibility Statement</span>
          </button>
        </div>

        {/* Content Container */}
        <div className="bg-[#E7DCD5]/50 rounded-[28px] p-8 sm:p-12 border border-[#CDBBB3]/70 space-y-8 leading-relaxed text-sm text-[#411401]/85">
          
          {activeTab === 'privacy' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="font-taviraj text-2xl sm:text-3xl font-light text-[#411401]">
                Client Data & Privacy Policy
              </h2>
              <p className="text-xs uppercase tracking-wider text-[#411401]/60">
                Last Updated: October 2026
              </p>

              <div>
                <h3 className="font-semibold text-base text-[#411401] mb-2">1. Information Collection</h3>
                <p>
                  At Makua Web Solutions, your privacy is paramount. We collect only necessary identifiers
                  (Full Name, verified Email Address, phone number, and project requirements) required to deliver professional digital solutions, web design, and continuous technical support.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-base text-[#411401] mb-2">2. Zero Telemetry & Non-Commercialization</h3>
                <p>
                  We never trade, sell, or monetize client information to third-party ad networks. Your project assets, credentials, and business data remain strictly confidential.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-base text-[#411401] mb-2">3. Data Security</h3>
                <p>
                  All project files and digital communication are held in secure environments with industry-standard encryption practices.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="font-taviraj text-2xl sm:text-3xl font-light text-[#411401]">
                Terms of Service & Project Code
              </h2>
              <p className="text-xs uppercase tracking-wider text-[#411401]/60">
                Last Updated: October 2026
              </p>

              <div>
                <h3 className="font-semibold text-base text-[#411401] mb-2">1. Payment & Project Terms</h3>
                <p>
                  Projects typically commence with 50% deposit before design and development begins, with the remaining 50% balance settled upon project completion and prior to final asset handover or domain deployment.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-base text-[#411401] mb-2">2. Timelines & Revisions</h3>
                <p>
                  We work closely with clients through each milestone. Project milestones and revisions are executed transparently to ensure websites meet business objectives.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-base text-[#411401] mb-2">3. Maintenance & Ongoing Support</h3>
                <p>
                  Ongoing maintenance agreements cover scheduled updates, security checks, backups, and technical assistance according to your selected plan.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'accessibility' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="font-taviraj text-2xl sm:text-3xl font-light text-[#411401]">
                Digital Accessibility Commitment
              </h2>
              <p className="text-xs uppercase tracking-wider text-[#411401]/60">
                WCAG 2.1 Level AA Compliance
              </p>

              <div className="p-4 rounded-2xl bg-[#FFFAA4]/60 border border-[#411401]/20 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#411401] shrink-0" />
                <p className="text-xs font-medium text-[#411401]">
                  Makua Web Solutions’ digital interfaces are engineered to meet or exceed WCAG 2.1 Level AA contrast guidelines (4.5:1 text contrast on warm cream backgrounds).
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-base text-[#411401] mb-2">1. Digital Touch Targets & Focus States</h3>
                <p>
                  All interactive elements feature touch targets exceeding 44px, unambiguous high-contrast visual focus rings for screen readers, and respect for operating system <code>prefers-reduced-motion</code> standards.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-base text-[#411401] mb-2">2. Cross-Device Responsiveness</h3>
                <p>
                  Our websites are constructed with mobile-first responsiveness across phones, tablets, laptops, and ultra-wide desktop displays.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-base text-[#411401] mb-2">3. Accessibility Assistance</h3>
                <p>
                  If you encounter any barrier navigating our web platforms, contact our team at <strong>info@makuawebsolutions.co.za</strong> or WhatsApp <strong>0712848087</strong> for immediate support.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
