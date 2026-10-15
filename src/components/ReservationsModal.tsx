import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, Trash2, Sparkles, CheckCircle2 } from 'lucide-react';
import { Booking } from '../types';
import { getStoredBookings, cancelBooking } from '../services/storage';

interface ReservationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBrowseSchedule: () => void;
  onToast: (msg: string) => void;
}

export const ReservationsModal: React.FC<ReservationsModalProps> = ({
  isOpen,
  onClose,
  onBrowseSchedule,
  onToast,
}) => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const reloadBookings = () => {
    setBookings(getStoredBookings());
  };

  useEffect(() => {
    if (isOpen) {
      reloadBookings();
    }
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener('mws-db-updated', reloadBookings);
    return () => window.removeEventListener('mws-db-updated', reloadBookings);
  }, []);

  if (!isOpen) return null;

  const activeBookings = bookings.filter((b) => b.status === 'confirmed');
  const pastOrCancelled = bookings.filter((b) => b.status === 'cancelled');

  const handleCancel = (booking: Booking) => {
    if (confirm(`Would you like to release your reservation for ${booking.classTitle}?`)) {
      const ok = cancelBooking(booking.id);
      if (ok) {
        onToast(`Reservation for ${booking.classTitle} cancelled. Spot returned to schedule.`);
        reloadBookings();
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#411401]/60 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#F0EFE9] text-[#411401] rounded-[28px] border border-[#CDBBB3]/80 shadow-2xl overflow-hidden flex flex-col max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#411401] text-[#F0EFE9] px-6 sm:px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#FFFAA4] text-[#411401] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#FFFAA4]">
                Patron Portfolio
              </span>
              <h3 className="font-taviraj text-2xl font-light text-[#F0EFE9]">
                My Reserved Spaces
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-[#F0EFE9] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close passes modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {activeBookings.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-2xl bg-[#E7DCD5]/40 border border-[#CDBBB3]/60">
              <Calendar className="w-10 h-10 mx-auto text-[#411401]/40 mb-3" />
              <h4 className="font-taviraj text-2xl font-light text-[#411401]">
                No Active Reservations
              </h4>
              <p className="text-xs text-[#411401]/70 mt-1 max-w-sm mx-auto">
                You have not booked any upcoming movement sessions yet. Reserve your mat or reformer from our kinetic calendar.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onBrowseSchedule();
                }}
                className="mt-6 px-6 py-3 rounded-full bg-[#411401] text-[#FFFAA4] hover:bg-[#411401]/90 text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-sm cursor-pointer"
              >
                Browse Kinetic Calendar
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#411401]/60 block">
                Confirmed Upcoming Rituals ({activeBookings.length})
              </span>

              {activeBookings.map((b) => (
                <div
                  key={b.id}
                  className="p-5 rounded-2xl bg-gradient-to-br from-[#FAF9F5] to-[#FFFDD6] border border-[#CDBBB3] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] uppercase tracking-wider font-semibold bg-[#411401] text-[#FFFAA4] px-2.5 py-0.5 rounded-full">
                        {b.discipline}
                      </span>
                      <span className="text-xs font-semibold text-[#411401]">
                        {b.day}
                      </span>
                    </div>

                    <h4 className="font-taviraj text-xl font-medium text-[#411401]">
                      {b.classTitle}
                    </h4>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#411401]/75 mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#411401]" />
                        {b.startTime} – {b.endTime}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#411401]" />
                        {b.room}
                      </span>
                      <span>·</span>
                      <span>With {b.instructorName}</span>
                    </div>

                    <p className="text-[11px] text-[#411401]/60 mt-1">
                      Booked for: {b.userName} ({b.userEmail})
                    </p>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      Confirmed
                    </span>
                    <button
                      onClick={() => handleCancel(b)}
                      className="p-2 rounded-full hover:bg-red-50 text-[#411401]/60 hover:text-red-700 transition-colors"
                      title="Cancel reservation & release spot"
                      aria-label="Cancel reservation"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Past/Cancelled Log if any */}
          {pastOrCancelled.length > 0 && (
            <div className="pt-4 border-t border-[#CDBBB3]/40">
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#411401]/50 block mb-2">
                Cancelled / Released Passes
              </span>
              <div className="space-y-2">
                {pastOrCancelled.map((b) => (
                  <div
                    key={b.id}
                    className="p-3 rounded-xl bg-white/40 border border-[#CDBBB3]/30 flex items-center justify-between text-xs text-[#411401]/60"
                  >
                    <span>{b.classTitle} · {b.day} ({b.startTime})</span>
                    <span className="text-[10px] uppercase tracking-wider text-red-700/80">Released</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 px-6 sm:px-8 bg-[#E7DCD5]/60 border-t border-[#CDBBB3]/60 flex items-center justify-between text-xs text-[#411401]/70">
          <span>Need to reschedule? Call concierge at (212) 840-2910</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-[#411401] text-[#FFFAA4] text-xs font-semibold uppercase tracking-wider"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
