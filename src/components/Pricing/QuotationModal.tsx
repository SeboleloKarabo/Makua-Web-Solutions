import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { QuotationForm } from './QuotationForm';
import { QuotationProcessSection } from './QuotationProcessSection';
import makuaLogo from '../../assets/images/makua-logo.png';

interface QuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackage?: string;
  initialMockupTitle?: string;
}

export const QuotationModal: React.FC<QuotationModalProps> = ({
  isOpen,
  onClose,
  initialPackage,
  initialMockupTitle,
}) => {
  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#411401]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-4xl bg-[#F0EFE9] rounded-[28px] sm:rounded-[36px] shadow-2xl border border-[#CDBBB3]/40 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Sticky Header with Close button */}
        <div className="px-6 sm:px-8 py-5 border-b border-[#E7DCD5] bg-[#F0EFE9]/95 backdrop-blur-md flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <img
              src={makuaLogo}
              alt="Makua Logo"
              className="h-8 w-auto object-contain"
            />
            <span className="font-taviraj text-lg sm:text-xl font-medium text-[#411401]">
              Quotation Request Portal
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-[#411401]/20 flex items-center justify-center text-[#411401] hover:bg-[#411401] hover:text-[#FFFAA4] transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 stroke-[2]" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-4 sm:p-8 overflow-y-auto space-y-10">
          <QuotationForm initialPackage={initialPackage} initialMockupTitle={initialMockupTitle} />

          <div className="pt-2 border-t border-[#E7DCD5]">
            <QuotationProcessSection />
          </div>
        </div>
      </div>
    </div>
  );
};
