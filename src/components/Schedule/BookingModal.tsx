import React, { useState } from 'react';
import { X, Clock, MapPin, User, Mail, Sparkles, CheckCircle2 } from 'lucide-react';
import { ClassItem } from '../../types';
import { bookClass } from '../../services/storage';

interface BookingModalProps {
  classItem: ClassItem | null;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ classItem, onClose, onSuccess }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!classItem) return null;

  const spotsLeft = classItem.capacity - classItem.spotsTaken;
  const isFull = spotsLeft <= 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Please provide your full legal or preferred name.');
      return;
    }
    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address for confirmation.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const result = bookClass(classItem.id, fullName, email);
      if (result.success) {
        onSuccess(`Booked! Your reservation for ${classItem.title} is confirmed.`);
        onClose();
      } else {
        setError(result.message);
      }
    } catch {
      setError('An error occurred during booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#411401]/60 backdrop-blur-md animate-in fade-in duration-300">
      <div
        className="relative w-full max-w-lg bg-[#F0EFE9] text-[#411401] rounded-[28px] border border-[#CDBBB3]/80 shadow-[0_25px_60px_-15px_rgba(65,20,1,0.3)] overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-[#411401] text-[#F0EFE9] px-6 sm:px-8 py-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#FFFAA4]">
              Sanctuary Reservation
            </span>
            <h3 className="font-taviraj text-xl sm:text-2xl font-light text-[#F0EFE9] mt-0.5">
              Secure Your Session
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-[#F0EFE9] flex items-center justify-center transition-colors"
            aria-label="Close booking modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Class Summary Ledger */}
        <div className="p-6 sm:p-8 bg-[#E7DCD5]/60 border-b border-[#CDBBB3]/60">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#411401]/70 block mb-1">
                {classItem.discipline} · {classItem.intensity} Intensity
              </span>
              <h4 className="font-taviraj text-2xl font-light text-[#411401]">
                {classItem.title}
              </h4>
            </div>

            <div className="text-right shrink-0">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                isFull
                  ? 'bg-red-900/10 text-red-900'
                  : spotsLeft <= 2
                  ? 'bg-[#F6BF8E] text-[#411401]'
                  : 'bg-[#FFFAA4] text-[#411401]'
              }`}>
                {isFull ? 'Full' : `${spotsLeft} Spots Left`}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4 text-xs text-[#411401]/80">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#411401]" />
              <span>{classItem.day} · {classItem.startTime}–{classItem.endTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#411401]" />
              <span>{classItem.room}</span>
            </div>
          </div>

          <p className="text-xs text-[#411401]/75 mt-3 pt-3 border-t border-[#CDBBB3]/40 leading-relaxed italic">
            Led by {classItem.instructorName} ({classItem.instructorRole || 'Master Faculty'})
          </p>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-100/80 border border-red-300 text-red-950 text-xs">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs uppercase tracking-[0.2em] font-medium text-[#411401]/70 mb-2">
              Full Legal Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#411401]/40" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Vivienne Westwood"
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-[#CDBBB3] focus:outline-none focus:border-[#411401] focus:ring-1 focus:ring-[#411401] text-sm text-[#411401] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.2em] font-medium text-[#411401]/70 mb-2">
              Email Address for Pass & Calendar Invite
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#411401]/40" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. vivienne@sanctuary.com"
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-[#CDBBB3] focus:outline-none focus:border-[#411401] focus:ring-1 focus:ring-[#411401] text-sm text-[#411401] transition-all"
              />
            </div>
            <p className="text-[11px] text-[#411401]/60 mt-1.5">
              Complimentary towel, locker, and botanical tea service included with every pass.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isFull || submitting}
              className={`w-full py-4 rounded-full font-semibold text-xs uppercase tracking-[0.22em] transition-all flex items-center justify-center gap-2 shadow-md ${
                isFull
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#411401] text-[#FFFAA4] hover:bg-[#411401]/90 active:scale-98 cursor-pointer'
              }`}
            >
              {submitting ? (
                <span>Confirming Sanctuary Slot...</span>
              ) : isFull ? (
                <span>Class Capacity Reached</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Reservation</span>
                </>
              )}
            </button>
          </div>

          <div className="text-center text-[10px] uppercase tracking-widest text-[#411401]/50">
            12-Hour Cancellation Courtesy · No Hidden Fees
          </div>
        </form>
      </div>
    </div>
  );
};
