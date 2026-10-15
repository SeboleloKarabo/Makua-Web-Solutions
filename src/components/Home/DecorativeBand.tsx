import React from 'react';

export const DecorativeBand: React.FC = () => {
  return (
    <div className="w-full bg-[#411401] text-[#F0EFE9] py-6 sm:py-8 overflow-hidden border-y border-[#CDBBB3]/20">
      <div className="flex items-center justify-around gap-8 text-[11px] sm:text-xs uppercase tracking-[0.35em] font-light text-[#FFFAA4]/90 whitespace-nowrap px-6">
        <span>We Design</span>
        <span className="text-[#F6BF8E] opacity-50">✦</span>
        <span>We Build</span>
        <span className="text-[#F6BF8E] opacity-50">✦</span>
        <span>We Grow Your Business Online</span>
        <span className="text-[#F6BF8E] opacity-50">✦</span>
        <span>Growing your future</span>
      </div>
    </div>
  );
};
