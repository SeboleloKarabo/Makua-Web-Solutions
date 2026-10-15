import React from 'react';
import { ArrowUpRight, MapPin, Phone, Mail } from 'lucide-react';
import makuaHeroImg from '../../assets/images/makua-hero.png';
import makuaLogo from '../../assets/images/makua-logo.png';
import makuaLogo2 from '../../assets/images/makua-logo2.png';

interface FooterProps {
  onNavigate: (page: string) => void;
  onOpenReservations?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="relative w-full overflow-hidden text-[#F0EFE9] bg-[#411401]">
      {/* Full-bleed background hero photo with rich dark warm espresso scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={makuaHeroImg}
          alt="Makua Web Solutions"
          className="w-full h-full object-cover object-center filter saturate-75 opacity-35 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#411401] via-[#411401]/90 to-[#411401]/75" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-12 md:px-20 pt-16 sm:pt-24 pb-16">
        
        {/* Top Left: M Logo on top, makua-logo2 directly below it with close spacing */}
        <div className="flex flex-col gap-2 mb-8 items-start">
          <img
            src={makuaLogo}
            alt="Makua M Logo"
            className="h-10 sm:h-12 w-auto object-contain object-left"
          />
          <img
            src={makuaLogo2}
            alt="Makua Web Solutions Logo"
            className="h-8 sm:h-10 w-auto object-contain object-left"
          />
        </div>

        {/* Top Callout Banner */}
        <div className="border-b border-[#CDBBB3]/20 pb-14 mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <h2 className="font-taviraj text-3xl sm:text-5xl md:text-6xl font-light text-[#F0EFE9] leading-tight text-balance">
              Digital Solutions That Grow Your Business
            </h2>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row gap-4 items-start lg:items-end justify-end">
            <button
              onClick={() => onNavigate('projects')}
              className="px-8 py-4 rounded-full bg-[#FFFAA4] text-[#411401] hover:bg-white text-xs font-semibold uppercase tracking-[0.22em] transition-all duration-300 flex items-center gap-3 shadow-lg active:scale-95 cursor-pointer"
            >
              <span>View Projects</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2]" />
            </button>
          </div>
        </div>

        {/* Navigation & Contact Ledger */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#CDBBB3]/20">
          
          {/* Column 1: Connect (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] font-medium text-[#FFFAA4]">
              Connect
            </h4>
            <div className="text-xs text-[#E0CFC9]/90 space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FFFAA4] shrink-0 mt-0.5" />
                <span>Kwamhlanga, 1022. Operate Remotely.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FFFAA4] shrink-0" />
                <a
                  href="https://wa.me/27712848087"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#FFFAA4] transition-colors"
                  title="Chat with us on WhatsApp (0712848087)"
                >
                  0712848087
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#FFFAA4] shrink-0" />
                <a href="mailto:info@makuawebsolutions.co.za" className="hover:text-[#FFFAA4] transition-colors">
                  info@makuawebsolutions.co.za
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Navigate (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.25em] font-medium text-[#FFFAA4]">
              Navigate
            </h4>
            <ul className="space-y-2.5 text-sm text-[#E0CFC9]">
              <li>
                <button
                  onClick={() => onNavigate('projects')}
                  className="hover:text-[#FFFAA4] transition-colors cursor-pointer"
                >
                  Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-[#FFFAA4] transition-colors cursor-pointer"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('pricing')}
                  className="hover:text-[#FFFAA4] transition-colors cursor-pointer"
                >
                  Pricing
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Social Media (3 cols) - Icons only, original SVGs in matching #FFFAA4 color */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] font-medium text-[#FFFAA4]">
              Social Media
            </h4>
            <div className="flex items-center gap-4 pt-1">
              {/* WhatsApp icon */}
              <a
                href="https://wa.me/27712848087"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp (0712848087)"
                className="text-[#FFFAA4] hover:text-white transition-colors p-1"
                title="WhatsApp (0712848087)"
              >
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12.031 2C6.495 2 2 6.494 2 12.029c0 1.956.562 3.784 1.536 5.334L2 22.031l4.821-1.503c1.478.895 3.208 1.411 5.061 1.411 5.536 0 10.03-4.495 10.03-10.029 0-5.535-4.494-10.029-10.03-10.029zm5.955 14.175c-.247.697-1.436 1.332-1.99 1.418-.517.081-1.189.117-1.923-.118-.466-.149-1.066-.35-1.838-.685-3.238-1.407-5.344-4.664-5.506-4.879-.161-.215-1.312-1.745-1.312-3.328 0-1.583.829-2.361 1.121-2.683.292-.323.637-.404.85-.404.213 0 .426.002.613.011.198.01.464-.075.726.554.27.648.918 2.242 1 2.404.081.162.135.351.027.566-.108.216-.162.35-.323.539-.162.189-.341.422-.487.567-.162.162-.331.338-.142.662.189.324.84 1.378 1.802 2.235 1.238 1.103 2.28 1.444 2.604 1.606.324.162.513.135.702-.081.189-.216.81-.944 1.026-1.268.216-.324.432-.27.729-.162.297.108 1.89.891 2.214 1.053.324.162.54.243.621.378.081.135.081.783-.166 1.48z" />
                </svg>
              </a>

              {/* Original Facebook icon */}
              <a
                href="https://facebook.com/makuawebsolutions"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="text-[#FFFAA4] hover:text-white transition-colors p-1"
              >
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Original TikTok icon */}
              <a
                href="https://tiktok.com/@makuawebsolutions"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="text-[#FFFAA4] hover:text-white transition-colors p-1"
              >
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.97v7.54c-.03 2.11-.79 4.21-2.26 5.75-1.66 1.76-4.14 2.69-6.55 2.51-2.58-.15-4.99-1.52-6.38-3.69-1.48-2.28-1.65-5.33-.42-7.76 1.19-2.4 3.65-4 6.32-4.15.35-.03.7-.02 1.05.02v4.06c-.84-.1-1.71.05-2.42.53-.87.58-1.39 1.59-1.43 2.64-.04 1.15.54 2.29 1.51 2.89.96.61 2.24.62 3.22.04.78-.45 1.28-1.31 1.3-2.22V.02h-2.45z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 4: Hours (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.25em] font-medium text-[#FFFAA4]">
              Hours
            </h4>
            <div className="text-xs text-[#E0CFC9] space-y-1.5 leading-relaxed">
              <p className="font-medium text-[#F0EFE9]">Monday – Friday</p>
              <p>08:00 – 17:00</p>
              <p className="font-medium text-[#F0EFE9] pt-2">Saturday</p>
              <p>09:00 – 13:00</p>
              <p className="font-medium text-[#F0EFE9] pt-2">Sunday</p>
              <p>Closed</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Credit */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E0CFC9]/60">
          <p>© 2026 Makua Web Solutions. All Rights Reserved.</p>
          <p className="text-[#FFFAA4]/90 font-medium tracking-wide">
            Designed by Makua Web Solutions
          </p>
        </div>

      </div>
    </footer>
  );
};
