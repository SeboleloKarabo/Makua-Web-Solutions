import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import makuaLogo from '../assets/images/makua-logo.png';

interface HeaderProps {
  activePage: string;
  onNavigate: (page: string) => void;
  onOpenReservations: () => void;
  onQuickBook: () => void;
  onRequestQuote?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  onNavigate,
  onQuickBook,
  onRequestQuote,
}) => {
  const [isOnHero, setIsOnHero] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const isSubpage = activePage !== 'home';

  // Close menu and ensure header is visible on route change
  useEffect(() => {
    setMenuOpen(false);
    setIsOnHero(true);
  }, [activePage]);

  // Handle scroll behavior: header bar visible ONLY on hero section, fades over 2s when scrolling down
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsOnHero(window.scrollY < 120);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll and set darker warm cursor dot while open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.classList.add('menu-open-active');
    } else {
      document.body.style.overflow = '';
      document.documentElement.classList.remove('menu-open-active');
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.classList.remove('menu-open-active');
    };
  }, [menuOpen]);

  const handleLinkClick = (pageId: string) => {
    onNavigate(pageId);
    setMenuOpen(false);
  };

  const menuLinks = [
    { label: 'Projects', page: 'projects', delay: 0.28 },
    { label: 'Services', page: 'services', delay: 0.42 },
    { label: 'Pricing', page: 'pricing', delay: 0.53 },
  ];

  return (
    <>
      {/* Darker warm cursor style when menu panel is open */}
      <style>{`
        html.menu-open-active [class*="animate-pulse-blob"] {
          background-color: rgba(65, 20, 1, 0.5) !important;
        }
      `}</style>

      {/* Top Floating Bar - 2s smooth fade, visible on hero or when menu is open */}
      <header
        className={`fixed top-6 left-0 right-0 z-50 px-6 sm:px-12 md:px-16 max-w-[1400px] mx-auto transition-opacity duration-[2000ms] ease-in-out ${
          isOnHero || menuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Left: Logo image */}
          <div className="flex items-center gap-3">
            <img
              src={makuaLogo}
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.endsWith('/makua-logo.png')) {
                  target.src = '/makua-logo.png';
                }
              }}
              alt="Makua Web Solutions Logo"
              className="h-10 sm:h-12 w-auto object-contain cursor-pointer transition-opacity hover:opacity-90"
              onClick={() => handleLinkClick('home')}
            />
          </div>

          {/* Right: Hamburger Button & Subpage Close (X) Icon */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Hamburger Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 transition-colors duration-300 cursor-pointer flex items-center justify-center focus:outline-none text-[#C69D50] hover:text-[#D8B268]"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? (
                // Thin-stroke X in gold
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  className="overflow-visible"
                >
                  <line
                    x1="4"
                    y1="4"
                    x2="18"
                    y2="18"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                  <line
                    x1="18"
                    y1="4"
                    x2="4"
                    y2="18"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                // Three 1px lines in gold, third line shorter
                <svg
                  width="24"
                  height="18"
                  viewBox="0 0 24 18"
                  fill="none"
                  className="overflow-visible"
                >
                  <line
                    x1="0"
                    y1="2"
                    x2="24"
                    y2="2"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                  <line
                    x1="0"
                    y1="9"
                    x2="24"
                    y2="9"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                  <line
                    x1="0"
                    y1="16"
                    x2="14"
                    y2="16"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>

            {/* Clearly visible X (close) icon on every subpage next to hamburger menu */}
            {isSubpage && !menuOpen && (
              <button
                onClick={() => handleLinkClick('home')}
                className="p-2 transition-colors duration-300 cursor-pointer flex items-center justify-center focus:outline-none text-[#C69D50] hover:text-[#D8B268]"
                aria-label="Close"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-5 h-5 sm:w-6 sm:h-6 overflow-visible"
                >
                  <line
                    x1="4"
                    y1="4"
                    x2="20"
                    y2="20"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                  />
                  <line
                    x1="20"
                    y1="4"
                    x2="4"
                    y2="20"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Dropdown Cream Panel: 1.0s smooth slide down and 1.0s smooth slide up */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop Scrim */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1.0] }}
              className="fixed inset-0 z-30 bg-[#411401]/25 backdrop-blur-[2px]"
              onClick={() => setMenuOpen(false)}
            />

            {/* Cream (#F0EFE9) Panel, height 68vh, rounded bottom corners 28px - 1s slide down & 1s slide up */}
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{
                duration: 1.0,
                ease: [0.25, 0.1, 0.25, 1.0],
              }}
              className="fixed top-0 left-0 right-0 z-40 bg-[#F0EFE9] text-[#411401] overflow-hidden shadow-2xl border-b border-[#CDBBB3]/40 flex flex-col justify-between h-[68vh] min-h-[460px]"
              style={{
                borderBottomLeftRadius: '28px',
                borderBottomRightRadius: '28px',
              }}
            >
              {/* Content Container: 8vw side padding, generous top space (~150px) below the logo */}
              <div className="px-[8vw] pt-[140px] sm:pt-[160px] pb-8 flex flex-col justify-between h-full">
                
                {/* Left-Aligned Stacked List of 3 Links & Pill Button */}
                <div>
                  <div className="flex flex-col space-y-4 sm:space-y-5">
                    {menuLinks.map((link) => (
                      <motion.button
                        key={link.label}
                        onClick={() => handleLinkClick(link.page)}
                        initial={{
                          opacity: 0,
                          y: 15,
                          filter: 'blur(12px)',
                          letterSpacing: '0.22em',
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          filter: 'blur(0px)',
                          letterSpacing: '0.02em',
                        }}
                        transition={{
                          duration: 0.7,
                          delay: link.delay * 0.4,
                          ease: [0.25, 0.1, 0.25, 1],
                        }}
                        className="font-taviraj font-light text-[28px] sm:text-[32px] text-[#C69D50] text-left hover:text-[#B38A3F] transition-colors cursor-pointer leading-tight w-fit"
                      >
                        {link.label}
                      </motion.button>
                    ))}
                  </div>

                  {/* Pill Button: "Request Quote" in matching logo gold (#C69D50) */}
                  <motion.div
                    initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{
                      duration: 1.0,
                      delay: 0.65,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="mt-8 sm:mt-10"
                  >
                    <button
                      onClick={() => {
                        if (onRequestQuote) {
                          onRequestQuote();
                        } else {
                          onQuickBook();
                        }
                        setMenuOpen(false);
                      }}
                      className="inline-flex items-center px-7 py-3 rounded-full bg-[#C69D50] text-[#411401] text-[11px] uppercase tracking-[0.25em] font-semibold hover:tracking-[0.38em] hover:bg-[#D8B268] transition-all duration-300 shadow-sm cursor-pointer"
                    >
                      Request Quote
                    </button>
                  </motion.div>
                </div>

                {/* Pinned at Bottom of Panel: Opening Hours in muted gold */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 1.4,
                    delay: 0.85,
                    ease: 'easeOut',
                  }}
                  className="mt-auto pt-6 text-xs text-[#C69D50]/80 tracking-wider font-light"
                >
                  Mon–Fri 8:00–17:00 · Sat 9:00–13:00
                </motion.div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
