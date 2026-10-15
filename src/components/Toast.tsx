import React, { useEffect } from 'react';
import { Check, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
  type?: 'success' | 'info';
}

export const Toast: React.FC<ToastProps> = ({ message, onClose, type = 'success' }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4500);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#411401] text-[#F0EFE9] px-6 py-4 rounded-[20px] shadow-2xl border border-[#CDBBB3]/30 flex items-center gap-4 max-w-md">
        <div className="w-8 h-8 rounded-full bg-[#FFFAA4] text-[#411401] flex items-center justify-center shrink-0">
          <Check className="w-4 h-4 stroke-[2.5]" />
        </div>
        <div className="flex-1">
          <p className="text-xs uppercase tracking-[0.2em] font-medium text-[#FFFAA4]/80">Sanctuary Notice</p>
          <p className="text-sm font-medium text-[#F0EFE9] mt-0.5">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-[#E0CFC9] hover:text-[#FFFAA4] transition-colors p-1"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
