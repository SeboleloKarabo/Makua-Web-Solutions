import React from 'react';
import { FileCheck, Search, Send, CheckCircle2, ShieldAlert } from 'lucide-react';

export const QuotationProcessSection: React.FC<{ className?: string }> = ({ className = '' }) => {
  const steps = [
    {
      step: '01',
      title: 'Submit Your Request',
      description: 'Complete the quotation form with your contact details and project requirements.',
      icon: Send,
    },
    {
      step: '02',
      title: 'We Review Your Requirements',
      description: 'Makua Web Solutions reviews your enquiry and determines the scope of work.',
      icon: Search,
    },
    {
      step: '03',
      title: 'Receive Your Quotation',
      description: 'We prepare and send a customised quotation based on your requirements.',
      icon: FileCheck,
    },
    {
      step: '04',
      title: 'Approve and Get Started',
      description: 'Once you accept the quotation, a 50% deposit is required before work starts. The remaining 50% is payable on completion.',
      icon: CheckCircle2,
    },
  ];

  return (
    <div className={`space-y-8 ${className}`}>
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#411401]/60 block mb-2">
          Transparent Project Engagement
        </span>
        <h3 className="font-taviraj text-3xl sm:text-4xl font-light text-[#411401] leading-tight">
          How It Works
        </h3>
        <p className="text-xs sm:text-sm text-[#411401]/75 mt-2">
          From enquiry to completion, here is what you can expect when partnering with Makua Web Solutions.
        </p>
      </div>

      {/* 4 Process Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {steps.map((st) => {
          const Icon = st.icon;
          return (
            <div
              key={st.step}
              className="rounded-2xl p-6 bg-white border border-[#E7DCD5] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-taviraj text-2xl font-light text-[#411401]/50 tabular-nums">
                    {st.step}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-[#FFFAA4] flex items-center justify-center text-[#411401]">
                    <Icon className="w-4 h-4 stroke-[2]" />
                  </div>
                </div>

                <h4 className="font-taviraj text-lg font-medium text-[#411401] leading-snug mb-2">
                  {st.title}
                </h4>
                <p className="text-xs text-[#411401]/75 leading-relaxed">
                  {st.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Payment Terms Callout */}
      <div className="rounded-2xl bg-gradient-to-r from-[#FFFAA4]/60 via-[#FFFAA4] to-[#F6BF8E]/60 p-6 sm:p-8 border border-[#411401]/15 text-[#411401] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-[11px] uppercase tracking-[0.22em] font-bold text-[#411401]">
            Official Payment Terms
          </div>
          <p className="font-taviraj text-xl sm:text-2xl font-medium leading-snug">
            50% deposit before work starts and 50% on completion.
          </p>
          <p className="text-xs text-[#411401]/80 max-w-2xl pt-1">
            Submitting a quotation request does not constitute acceptance of a quotation or a confirmed booking. Work commences only once requirements and the initial 50% deposit are formally confirmed.
          </p>
        </div>
      </div>
    </div>
  );
};
