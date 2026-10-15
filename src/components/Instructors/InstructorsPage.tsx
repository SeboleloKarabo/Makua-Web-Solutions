import React from 'react';
import { Sparkles, Award, ArrowUpRight, Compass, Heart } from 'lucide-react';
import { INITIAL_INSTRUCTORS } from '../../data/initialData';
import { Instructor } from '../../types';

interface InstructorsPageProps {
  onBookWithInstructor: (name: string) => void;
  onNavigateToSchedule: () => void;
}

export const InstructorsPage: React.FC<InstructorsPageProps> = ({
  onBookWithInstructor,
  onNavigateToSchedule,
}) => {
  return (
    <div className="w-full bg-[#F0EFE9] min-h-screen">
      
      {/* 1. Hero Band */}
      <section className="w-full bg-[#411401] text-[#F0EFE9] pt-32 sm:pt-40 pb-20 sm:pb-28 px-6 sm:px-12 md:px-20 border-b border-[#CDBBB3]/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFFAA4]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-[1400px] mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] font-medium text-[#FFFAA4] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Master Faculty</span>
          </div>

          <h1 className="font-taviraj text-4xl sm:text-6xl md:text-7xl font-extralight tracking-tight text-[#F0EFE9] max-w-4xl mx-auto leading-tight">
            Somatic Guides & Visionaries
          </h1>

          {/* Philosophy Statement */}
          <p className="font-taviraj text-xl sm:text-3xl md:text-4xl font-light text-[#FFFAA4] max-w-3xl mx-auto mt-6 leading-relaxed italic text-balance">
            “We don't just train bodies. We ignite spirits.”
          </p>

          <p className="text-xs uppercase tracking-[0.25em] text-[#E0CFC9]/70 mt-6 max-w-lg mx-auto">
            Educated in classical kinesiology, nervous system down-regulation, and female endocrinological mechanics.
          </p>
        </div>
      </section>

      {/* 2. Philosophy & Standards Introduction */}
      <section className="max-w-[1400px] mx-auto px-6 sm:px-12 md:px-20 py-16 border-b border-[#CDBBB3]/40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-[#411401]">
          <div className="p-6 rounded-2xl bg-[#E7DCD5]/40 border border-[#CDBBB3]/40">
            <Compass className="w-5 h-5 mb-3 text-[#411401]" />
            <h4 className="font-taviraj text-xl font-medium mb-1">Biomechanics First</h4>
            <p className="text-xs text-[#411401]/80 leading-relaxed">
              Zero mindless repetition. Every verbal cue directs neurological motor recruitment and joint integrity.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-[#E7DCD5]/40 border border-[#CDBBB3]/40">
            <Heart className="w-5 h-5 mb-3 text-[#411401]" />
            <h4 className="font-taviraj text-xl font-medium mb-1">Psychological Safety</h4>
            <p className="text-xs text-[#411401]/80 leading-relaxed">
              No comparative mirrors or competitive leaderboards. A space for deep internal presence and uninhibited release.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-[#E7DCD5]/40 border border-[#CDBBB3]/40">
            <Award className="w-5 h-5 mb-3 text-[#411401]" />
            <h4 className="font-taviraj text-xl font-medium mb-1">Elite Pedigree</h4>
            <p className="text-xs text-[#411401]/80 leading-relaxed">
              Our guides average 10+ years of clinical and classical movement instruction across global ateliers.
            </p>
          </div>
        </div>
      </section>

      {/* 3. 3-Column Instructor Grid */}
      <section className="py-20 sm:py-28 max-w-[1400px] mx-auto px-6 sm:px-12 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {INITIAL_INSTRUCTORS.map((coach) => (
            <div
              key={coach.id}
              className="rounded-[28px] bg-[#E7DCD5]/70 border border-[#CDBBB3]/80 overflow-hidden flex flex-col justify-between shadow-[0_10px_30px_rgba(65,20,1,0.03)] hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Photo & Overlay */}
              <div>
                <div className="aspect-[3/4] relative overflow-hidden bg-[#411401]">
                  <img
                    src={coach.photo}
                    alt={coach.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#411401] via-[#411401]/30 to-transparent opacity-80" />

                  {/* Badges on image */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                    {coach.specialties.map((sp) => (
                      <span
                        key={sp}
                        className="text-[10px] uppercase tracking-wider font-semibold bg-[#411401]/80 backdrop-blur-sm text-[#FFFAA4] px-3 py-1 rounded-full border border-white/10"
                      >
                        {sp}
                      </span>
                    ))}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-[#F0EFE9]">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#FFFAA4] block mb-0.5">
                      {coach.experienceYears}+ Years Clinical Teaching
                    </span>
                    <h3 className="font-taviraj text-3xl font-light">
                      {coach.name}
                    </h3>
                    <p className="text-xs text-[#E0CFC9] mt-0.5">
                      {coach.title}
                    </p>
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-6 sm:p-8 space-y-4">
                  
                  {/* Philosophy Quote */}
                  <div className="p-4 rounded-2xl bg-white/60 border-l-2 border-[#411401] italic font-taviraj text-sm sm:text-base text-[#411401] leading-relaxed">
                    “{coach.philosophy}”
                  </div>

                  {/* Bio */}
                  <p className="text-xs sm:text-sm text-[#411401]/85 leading-relaxed">
                    {coach.bio}
                  </p>

                  {/* Certifications Ledger */}
                  <div className="pt-3 border-t border-[#CDBBB3]/40">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#411401]/60 block mb-2">
                      Accreditations & Lineage:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {coach.certifications.map((c) => (
                        <span
                          key={c}
                          className="text-[11px] text-[#411401]/80 bg-white/70 px-2.5 py-1 rounded-full border border-[#CDBBB3]/40"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Studio Floor Duty Schedule */}
                  <div className="text-xs text-[#411401]/70 bg-[#F0EFE9] p-3 rounded-xl border border-[#CDBBB3]/30">
                    <span className="font-semibold block text-[10px] uppercase tracking-wider text-[#411401]/60">Floor Schedule:</span>
                    <span>{coach.floorDutySchedule}</span>
                  </div>

                </div>
              </div>

              {/* Action */}
              <div className="p-6 sm:p-8 pt-0">
                <button
                  onClick={() => onBookWithInstructor(coach.name)}
                  className="w-full py-3.5 rounded-full bg-[#411401] text-[#FFFAA4] hover:bg-[#411401]/90 text-xs uppercase tracking-[0.2em] font-semibold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-98"
                >
                  <span>View Scheduled Classes</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom invitation */}
        <div className="mt-16 text-center">
          <button
            onClick={onNavigateToSchedule}
            className="px-8 py-4 rounded-full bg-[#E7DCD5] hover:bg-[#411401] hover:text-[#FFFAA4] text-[#411401] text-xs uppercase tracking-[0.2em] font-semibold border border-[#CDBBB3] transition-all"
          >
            Explore Complete Studio Calendar
          </button>
        </div>

      </section>

    </div>
  );
};
