import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CustomCursor } from './components/CustomCursor';
import { Toast } from './components/Toast';
import { ReservationsModal } from './components/ReservationsModal';
import { QuotationModal } from './components/Pricing/QuotationModal';

// Home Page Components
import { HeroSection } from './components/Home/HeroSection';
import { FirstWeekFreeBand } from './components/Home/FirstWeekFreeBand';
import { ClassVarietiesGrid } from './components/Home/ClassVarietiesGrid';
import { DecorativeBand } from './components/Home/DecorativeBand';
import { BenefitsCarousel } from './components/Home/BenefitsCarousel';
import { CoachSpotlights } from './components/Home/CoachSpotlights';
import { TestimonialsSection } from './components/Home/TestimonialsSection';
import { Footer } from './components/Home/Footer';

// Sub Pages
import { SchedulePage } from './components/Schedule/SchedulePage';
import { PricingPage } from './components/Pricing/PricingPage';
import { ProjectsPage } from './components/Projects/ProjectsPage';
import { InstructorsPage } from './components/Instructors/InstructorsPage';
import { LegalPage } from './components/Legal/LegalPage';

import { Discipline } from './types';

export default function App() {
  const [activePage, setActivePage] = useState<'home' | 'schedule' | 'services' | 'projects' | 'pricing' | 'instructors' | 'legal'>('home');
  const [scheduleFilter, setScheduleFilter] = useState<Discipline | 'All'>('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isReservationsOpen, setIsReservationsOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteModalPackage, setQuoteModalPackage] = useState<string>('Starter Package — R1,500');

  const handleOpenQuoteModal = (pkgName?: string) => {
    if (pkgName) {
      setQuoteModalPackage(pkgName);
    }
    setIsQuoteModalOpen(true);
  };

  // Scroll to top upon page navigation (or smooth scroll to section)
  const navigateTo = (page: string) => {
    setActivePage(page as any);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDisciplineFromHome = (discipline: Discipline) => {
    setScheduleFilter(discipline);
    navigateTo('schedule');
  };

  const handleBookWithInstructor = (_instructorName: string) => {
    navigateTo('schedule');
  };

  const handleClaimFreeWeek = () => {
    navigateTo('pricing');
  };

  return (
    <div className="min-h-screen bg-[#F0EFE9] text-[#411401] font-inter relative selection:bg-[#FFFAA4] selection:text-[#411401]">
      {/* Soft Peach Blurred-Dot Cursor */}
      <CustomCursor />

      {/* Floating Dynamic Header */}
      <Header
        activePage={activePage}
        onNavigate={navigateTo}
        onOpenReservations={() => setIsReservationsOpen(true)}
        onQuickBook={() => handleOpenQuoteModal()}
        onRequestQuote={() => handleOpenQuoteModal()}
      />

      {/* Main Page Rendering */}
      <main>
        {activePage === 'home' && (
          <>
            {/* 1. Cinematic Full-Screen Hero */}
            <HeroSection
              onSecureSpace={() => handleOpenQuoteModal()}
              onExplorePricing={() => navigateTo('projects')}
              onViewProjects={() => navigateTo('projects')}
              onRequestQuote={() => handleOpenQuoteModal()}
            />

            {/* 2. "First Week Free" Pulsing Offer Band */}
            <FirstWeekFreeBand onClaimFreeWeek={handleClaimFreeWeek} />

            {/* 3. Class Varieties 4-Discipline Grid */}
            <ClassVarietiesGrid onSelectDiscipline={handleSelectDisciplineFromHome} />

            {/* 4. Slim Decorative Band */}
            <DecorativeBand />

            {/* 5. Benefits Carousel */}
            <BenefitsCarousel />

            {/* 6. Coach Spotlights (Packages Slider) */}
            <CoachSpotlights
              onViewInstructors={() => navigateTo('services')}
              onBookInstructorClass={handleBookWithInstructor}
              onRequestQuote={(pkgName) => handleOpenQuoteModal(pkgName)}
            />

            {/* 7. Attributable Testimonials */}
            <TestimonialsSection />
          </>
        )}

        {(activePage === 'services' || activePage === 'schedule') && (
          <SchedulePage
            onToast={(msg) => setToastMessage(msg)}
            onRequestQuote={(serviceName) => handleOpenQuoteModal(serviceName)}
          />
        )}

        {activePage === 'projects' && (
          <ProjectsPage
            onToast={(msg) => setToastMessage(msg)}
            onRequestQuoteModal={(item) => handleOpenQuoteModal(item)}
          />
        )}

        {activePage === 'pricing' && (
          <PricingPage
            onToast={(msg) => setToastMessage(msg)}
            onNavigateToSchedule={() => navigateTo('schedule')}
          />
        )}

        {activePage === 'instructors' && (
          <InstructorsPage
            onBookWithInstructor={handleBookWithInstructor}
            onNavigateToSchedule={() => navigateTo('schedule')}
          />
        )}

        {activePage === 'legal' && (
          <LegalPage onBackToHome={() => navigateTo('home')} />
        )}
      </main>

      {/* Universal Luxury Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenReservations={() => setIsReservationsOpen(true)}
      />

      {/* Reservations & Passes Portfolio Modal */}
      <ReservationsModal
        isOpen={isReservationsOpen}
        onClose={() => setIsReservationsOpen(false)}
        onBrowseSchedule={() => navigateTo('schedule')}
        onToast={(msg) => setToastMessage(msg)}
      />

      {/* Makua Web Solutions Quotation Modal */}
      <QuotationModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        initialPackage={quoteModalPackage}
      />

      {/* Atmospheric Toast Notification */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}
