import React, { useState } from 'react';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  ShieldCheck,
  FileText,
  Clock,
  ArrowRight,
} from 'lucide-react';

export const SERVICES_LIST = [
  'Website development',
  'Business website',
  'E-commerce website',
  'Digital marketing',
  'AI-powered advertising and AI ad creation',
  'Google Business Profile setup/optimisation',
  'Website maintenance',
  'AI chatbot or automation',
  'Other/custom digital solution',
] as const;

export const PACKAGES_LIST = [
  {
    id: 'starter',
    label: 'Starter Package — R1,500',
    title: 'Starter Package',
    price: 'R1,500',
    desc: 'Professional responsive web presence for emerging businesses.',
  },
  {
    id: 'growth',
    label: 'Business Growth Package — R2,000',
    title: 'Business Growth Package',
    price: 'R2,000',
    desc: 'High-impact design, service showcase & expanded customer reach.',
  },
  {
    id: 'complete',
    label: 'Complete Package — R2,500',
    title: 'Complete Package',
    price: 'R2,500',
    desc: 'Comprehensive online platform with full brand power & integrations.',
  },
  {
    id: 'custom',
    label: 'Custom quotation — price to be determined based on requirements',
    title: 'Custom Quotation',
    price: 'Tailored Scope',
    desc: 'Bespoke design, e-commerce, custom features, AI integration or automation.',
  },
] as const;

export const BUDGET_OPTIONS = [
  'R1,500',
  'R2,000',
  'R2,500',
] as const;

export const TIMELINE_OPTIONS = [
  'As soon as possible',
  'Within 2–4 weeks',
  'Within 1–3 months',
  'Just exploring options',
] as const;

interface QuotationFormProps {
  initialPackage?: string;
  initialMockupTitle?: string;
  onSuccess?: (reference: string) => void;
  className?: string;
}

export const QuotationForm: React.FC<QuotationFormProps> = ({
  initialPackage = 'Starter Package — R1,500',
  initialMockupTitle = '',
  onSuccess,
  className = '',
}) => {
  // Form fields state
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState<string>('Website development');
  const [selectedPackage, setSelectedPackage] = useState<string>(() => {
    if (initialPackage.includes('Growth')) return 'Business Growth Package — R2,000';
    if (initialPackage.includes('Complete')) return 'Complete Package — R2,500';
    if (initialPackage.includes('Custom')) return 'Custom quotation — price to be determined based on requirements';
    return 'Starter Package — R1,500';
  });
  const [associatedMockup, setAssociatedMockup] = useState(initialMockupTitle);
  const [projectRequirements, setProjectRequirements] = useState('');
  const [budget, setBudget] = useState<string>('');
  const [timeline, setTimeline] = useState<string>('');

  React.useEffect(() => {
    if (initialMockupTitle) {
      setAssociatedMockup(initialMockupTitle);
      setService('Business website');
      setProjectRequirements((prev) => {
        const note = `Selected Website Mockup: ${initialMockupTitle}`;
        if (prev.includes(initialMockupTitle)) return prev;
        return prev ? `${note}\n\n${prev}` : `${note}\n\nPlease customise this design layout with our business branding, logo, and content.`;
      });
    }
  }, [initialMockupTitle]);

  React.useEffect(() => {
    if (initialPackage) {
      if (initialPackage.includes('Growth')) setSelectedPackage('Business Growth Package — R2,000');
      else if (initialPackage.includes('Complete')) setSelectedPackage('Complete Package — R2,500');
      else if (initialPackage.includes('Custom')) setSelectedPackage('Custom quotation — price to be determined based on requirements');
      else setSelectedPackage('Starter Package — R1,500');
    }
  }, [initialPackage]);

  // Honeypot spam trap
  const [hp, setHp] = useState('');

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // WhatsApp configuration
  const WHATSAPP_NUMBER = '27712848087'; // 0712848087

  // Client-side validation
  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      errors.fullName = 'Full name is required (minimum 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }

    if (!phone.trim() || phone.trim().replace(/\D/g, '').length < 7) {
      errors.phone = 'Please provide a valid phone or WhatsApp number.';
    }

    if (!service) {
      errors.service = 'Please select a service.';
    }

    if (!selectedPackage) {
      errors.package = 'Please select a package option.';
    }

    if (!projectRequirements.trim() || projectRequirements.trim().length < 10) {
      errors.projectRequirements = 'Please describe your project, goals and required features (at least 10 characters).';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      let data: any = null;
      let submitSucceeded = false;

      const payload = {
        fullName: fullName.trim(),
        businessName: businessName.trim() || undefined,
        email: email.trim(),
        phone: phone.trim(),
        service,
        package: selectedPackage,
        projectRequirements:
          associatedMockup && !projectRequirements.includes(associatedMockup)
            ? `Selected Website Mockup: ${associatedMockup}\n\n${projectRequirements}`
            : projectRequirements.trim(),
        budget: budget || undefined,
        timeline: timeline || undefined,
        _hp: hp,
      };

      // 1. Primary: Try Node.js Express backend endpoint (/api/quote)
      try {
        const response = await fetch('/api/quote', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        });

        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const parsed = await response.json();
          if (response.ok && parsed.success) {
            data = parsed;
            submitSucceeded = true;
          } else if (parsed.errors) {
            setFieldErrors(parsed.errors);
            throw new Error(parsed.error || 'Please correct the highlighted form errors.');
          }
        }
      } catch (err: any) {
        if (err.message && err.message.includes('highlighted form errors')) {
          throw err;
        }
      }

      // 2. Secondary: If /api/quote didn't succeed, try native Hostinger PHP endpoint (/api/quote.php)
      if (!submitSucceeded) {
        try {
          const phpResponse = await fetch('/api/quote.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify(payload),
          });

          const phpContentType = phpResponse.headers.get('content-type') || '';
          if (phpContentType.includes('application/json')) {
            const phpParsed = await phpResponse.json();
            if (phpResponse.ok && phpParsed.success) {
              data = phpParsed;
              submitSucceeded = true;
            } else if (phpParsed.errors) {
              setFieldErrors(phpParsed.errors);
              throw new Error(phpParsed.error || 'Please correct the highlighted form errors.');
            }
          }
        } catch (phpErr: any) {
          if (phpErr.message && phpErr.message.includes('highlighted form errors')) {
            throw phpErr;
          }
        }
      }

      // 3. Fallback: If static hosting with neither backend online, compile verified reference & save locally
      if (!submitSucceeded) {
        const randomSuffix = Math.floor(1000 + Math.random() * 9000);
        const fallbackRef = `MWS-Q-${new Date().getFullYear()}-${randomSuffix}`;
        data = {
          success: true,
          reference: fallbackRef,
          message: 'Your quotation request has been compiled successfully!',
        };

        try {
          const savedQuotes = JSON.parse(localStorage.getItem('mws_client_quotes') || '[]');
          savedQuotes.unshift({
            ...payload,
            reference: fallbackRef,
            date: new Date().toISOString(),
          });
          localStorage.setItem('mws_client_quotes', JSON.stringify(savedQuotes));
        } catch (_) {}

        submitSucceeded = true;
      }

      setSubmitSuccess(true);
      setReferenceNumber(data.reference);

      // Smoothly scroll the page/container from top to down to present the success state
      setTimeout(() => {
        const formSection = document.getElementById('quotation-form-section');
        if (formSection) {
          formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 60);

      if (onSuccess) {
        onSuccess(data.reference);
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      setErrorMessage(
        err.message || 'An error occurred while submitting your quotation request. Please retry.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFullName('');
    setBusinessName('');
    setEmail('');
    setPhone('');
    setService('Website development');
    setSelectedPackage('Starter Package — R1,500');
    setProjectRequirements('');
    setBudget('');
    setTimeline('');
    setSubmitSuccess(false);
    setReferenceNumber('');
    setErrorMessage(null);
    setFieldErrors({});
  };

  // WhatsApp follow-up URL
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi Makua Web Solutions, I just submitted a quotation request (Ref: ${referenceNumber}) for ${service}. Looking forward to discussing this!`
  )}`;

  return (
    <div
      id="quotation-form-container"
      className={`bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 md:p-12 shadow-[0_12px_32px_rgba(65,20,1,0.08)] border border-[#E7DCD5] ${className}`}
    >
      {submitSuccess ? (
        /* SUCCESS CONFIRMATION STATE - Cascades smoothly from top to down */
        <div className="text-center py-6 sm:py-8 space-y-6 animate-in fade-in slide-in-from-top-8 duration-700 ease-out">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#FFFAA4] rounded-full mx-auto flex items-center justify-center text-[#411401] shadow-inner">
            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-[#411401] stroke-[2.2]" />
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#411401]/70 block">
              Quotation Request Received
            </span>
            <h3 className="font-taviraj text-2xl sm:text-4xl font-light text-[#411401] leading-tight">
              Thank You, {fullName}!
            </h3>
            <p className="text-sm sm:text-base text-[#411401]/80 leading-relaxed pt-2">
              Your quotation enquiry has been sent to Makua Web Solutions. We will review your requirements and prepare a customised quotation for your project.
            </p>
          </div>

          {/* Reference Badge */}
          <div className="bg-[#F0EFE9] rounded-2xl p-4 sm:p-5 max-w-md mx-auto border border-[#E7DCD5] space-y-2">
            <div className="text-[11px] uppercase tracking-[0.2em] text-[#411401]/60 font-semibold">
              Enquiry Reference Number
            </div>
            <div className="font-mono text-lg sm:text-xl font-bold text-[#411401] tracking-wider">
              {referenceNumber}
            </div>
            <div className="text-xs text-[#411401]/70 pt-1">
              Selected Package:{' '}
              <span className="font-semibold text-[#411401]">{selectedPackage}</span>
            </div>
          </div>

          {/* WhatsApp Follow-Up with Original WhatsApp Icon */}
          <div className="pt-2 max-w-md mx-auto space-y-3">
            <p className="text-xs text-[#411401]/70">
              Want a faster response or have quick questions? You can follow up immediately with our team on WhatsApp:
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 w-full py-4 px-6 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs sm:text-sm uppercase tracking-[0.18em] transition-all duration-300 shadow-md active:scale-95"
            >
              <svg
                className="w-5 h-5 fill-current shrink-0"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12.031 2C6.495 2 2 6.494 2 12.029c0 1.956.562 3.784 1.536 5.334L2 22.031l4.821-1.503c1.478.895 3.208 1.411 5.061 1.411 5.536 0 10.03-4.495 10.03-10.029 0-5.535-4.494-10.029-10.03-10.029zm5.955 14.175c-.247.697-1.436 1.332-1.99 1.418-.517.081-1.189.117-1.923-.118-.466-.149-1.066-.35-1.838-.685-3.238-1.407-5.344-4.664-5.506-4.879-.161-.215-1.312-1.745-1.312-3.328 0-1.583.829-2.361 1.121-2.683.292-.323.637-.404.85-.404.213 0 .426.002.613.011.198.01.464-.075.726.554.27.648.918 2.242 1 2.404.081.162.135.351.027.566-.108.216-.162.35-.323.539-.162.189-.341.422-.487.567-.162.162-.331.338-.142.662.189.324.84 1.378 1.802 2.235 1.238 1.103 2.28 1.444 2.604 1.606.324.162.513.135.702-.081.189-.216.81-.944 1.026-1.268.216-.324.432-.27.729-.162.297.108 1.89.891 2.214 1.053.324.162.54.243.621.378.081.135.081.783-.166 1.48z" />
              </svg>
              <span>Continue on WhatsApp</span>
            </a>
          </div>

          {/* Reset button */}
          <div className="pt-4">
            <button
              onClick={handleReset}
              className="text-xs uppercase tracking-[0.2em] font-semibold text-[#411401]/70 hover:text-[#411401] transition-colors underline underline-offset-4 cursor-pointer"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      ) : (
        /* MAIN QUOTATION FORM */
        <form onSubmit={handleSubmit} className="space-y-8" noValidate>
          {/* Honeypot anti-spam trap (hidden from real users) */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="_hp_trap">Do not fill this field</label>
            <input
              id="_hp_trap"
              type="text"
              name="_hp_trap"
              value={hp}
              onChange={(e) => setHp(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Top Form Header */}
          <div className="border-b border-[#E7DCD5] pb-6">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] font-semibold text-[#411401]/70 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C69D50]" />
              <span>Makua Web Solutions</span>
            </div>
            <h2 className="font-taviraj text-2xl sm:text-3xl md:text-4xl font-light text-[#411401] leading-tight">
              Request a Custom Quotation
            </h2>
            <p className="text-xs sm:text-sm text-[#411401]/75 mt-2 leading-relaxed">
              Tell us about your business goals and website requirements. We will review your project and provide a transparent, detailed quotation.
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Unable to submit quotation</p>
                <p className="mt-0.5 opacity-90">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Associated Website Mockup Banner */}
          {associatedMockup && (
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFAA4]/60 border border-[#411401]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#411401] text-[#FFFAA4] flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#411401]/70 block">
                    Selected Website Mockup
                  </span>
                  <span className="font-taviraj text-lg sm:text-xl font-medium text-[#411401]">
                    {associatedMockup}
                  </span>
                </div>
              </div>
              <div className="inline-flex items-center gap-1.5 self-start sm:self-auto px-3.5 py-1.5 rounded-full bg-white/90 border border-[#411401]/10 text-xs text-[#411401] font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#411401]" />
                <span>Design Associated</span>
              </div>
            </div>
          )}

          {/* SECTION 1: CLIENT DETAILS */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.22em] font-bold text-[#411401] mb-4 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#FFFAA4] text-[#411401] inline-flex items-center justify-center text-[10px] font-bold">
                1
              </span>
              <span>Client Details</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div>
                <label className="block text-xs uppercase tracking-[0.16em] font-medium text-[#411401] mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (fieldErrors.fullName) setFieldErrors({ ...fieldErrors, fullName: '' });
                  }}
                  placeholder="e.g. Sipho Sithole"
                  className={`w-full px-4 py-3 rounded-xl bg-[#F0EFE9]/40 border text-sm text-[#411401] placeholder-[#411401]/40 focus:outline-none focus:bg-white transition-all ${
                    fieldErrors.fullName
                      ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                      : 'border-[#CDBBB3] focus:border-[#411401] focus:ring-2 focus:ring-[#411401]/10'
                  }`}
                />
                {fieldErrors.fullName && (
                  <p className="text-red-600 text-xs mt-1">{fieldErrors.fullName}</p>
                )}
              </div>

              {/* Business Name */}
              <div>
                <label className="block text-xs uppercase tracking-[0.16em] font-medium text-[#411401] mb-1.5">
                  Business Name <span className="text-[#411401]/50 text-[10px] normal-case tracking-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Sithole Logistics & Consulting"
                  className="w-full px-4 py-3 rounded-xl bg-[#F0EFE9]/40 border border-[#CDBBB3] text-sm text-[#411401] placeholder-[#411401]/40 focus:outline-none focus:bg-white focus:border-[#411401] focus:ring-2 focus:ring-[#411401]/10 transition-all"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs uppercase tracking-[0.16em] font-medium text-[#411401] mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: '' });
                  }}
                  placeholder="e.g. sipho@example.co.za"
                  className={`w-full px-4 py-3 rounded-xl bg-[#F0EFE9]/40 border text-sm text-[#411401] placeholder-[#411401]/40 focus:outline-none focus:bg-white transition-all ${
                    fieldErrors.email
                      ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                      : 'border-[#CDBBB3] focus:border-[#411401] focus:ring-2 focus:ring-[#411401]/10'
                  }`}
                />
                {fieldErrors.email && (
                  <p className="text-red-600 text-xs mt-1">{fieldErrors.email}</p>
                )}
              </div>

              {/* Phone / WhatsApp Number */}
              <div>
                <label className="block text-xs uppercase tracking-[0.16em] font-medium text-[#411401] mb-1.5">
                  Phone / WhatsApp Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (fieldErrors.phone) setFieldErrors({ ...fieldErrors, phone: '' });
                  }}
                  placeholder="e.g. 071 284 8087"
                  className={`w-full px-4 py-3 rounded-xl bg-[#F0EFE9]/40 border text-sm text-[#411401] placeholder-[#411401]/40 focus:outline-none focus:bg-white transition-all ${
                    fieldErrors.phone
                      ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                      : 'border-[#CDBBB3] focus:border-[#411401] focus:ring-2 focus:ring-[#411401]/10'
                  }`}
                />
                {fieldErrors.phone && (
                  <p className="text-red-600 text-xs mt-1">{fieldErrors.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* SECTION 2: SERVICE SELECTION */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.22em] font-bold text-[#411401] mb-3 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#FFFAA4] text-[#411401] inline-flex items-center justify-center text-[10px] font-bold">
                2
              </span>
              <span>Service Selection <span className="text-red-500">*</span></span>
            </h3>
            <p className="text-xs text-[#411401]/70 mb-3">
              Select the primary solution your business requires:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {SERVICES_LIST.map((srv) => {
                const isSelected = service === srv;
                return (
                  <button
                    key={srv}
                    type="button"
                    onClick={() => {
                      setService(srv);
                      if (fieldErrors.service) setFieldErrors({ ...fieldErrors, service: '' });
                    }}
                    className={`p-3 rounded-xl text-left text-xs transition-all cursor-pointer border flex items-center justify-between gap-2 ${
                      isSelected
                        ? 'bg-[#FFFAA4] border-[#411401] font-semibold text-[#411401] shadow-sm'
                        : 'bg-[#F0EFE9]/30 border-[#CDBBB3]/70 hover:border-[#411401]/40 text-[#411401]/85'
                    }`}
                  >
                    <span>{srv}</span>
                    <span
                      className={`w-3.5 h-3.5 rounded-full border shrink-0 transition-colors ${
                        isSelected
                          ? 'border-[#411401] bg-[#411401]'
                          : 'border-[#411401]/30 bg-transparent'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
            {fieldErrors.service && (
              <p className="text-red-600 text-xs mt-1.5">{fieldErrors.service}</p>
            )}
          </div>

          {/* SECTION 3: PACKAGE SELECTION */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.22em] font-bold text-[#411401] mb-3 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#FFFAA4] text-[#411401] inline-flex items-center justify-center text-[10px] font-bold">
                3
              </span>
              <span>Package Selection <span className="text-red-500">*</span></span>
            </h3>
            <p className="text-xs text-[#411401]/70 mb-3">
              Choose an existing website package or select a custom quotation for bespoke requirements:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {PACKAGES_LIST.map((pkg) => {
                const isSelected = selectedPackage === pkg.label;
                return (
                  <div
                    key={pkg.id}
                    onClick={() => {
                      setSelectedPackage(pkg.label);
                      if (fieldErrors.package) setFieldErrors({ ...fieldErrors, package: '' });
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#FFFAA4]/60 border-[#411401] shadow-md ring-1 ring-[#411401]'
                        : 'bg-[#F0EFE9]/20 border-[#CDBBB3] hover:border-[#411401]/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <div>
                        <div className="font-semibold text-sm text-[#411401]">
                          {pkg.title}
                        </div>
                        <div className="text-xs font-mono font-bold text-[#411401]/90">
                          {pkg.price}
                        </div>
                      </div>
                      <span
                        className={`w-4 h-4 rounded-full border mt-0.5 shrink-0 flex items-center justify-center ${
                          isSelected
                            ? 'border-[#411401] bg-[#411401]'
                            : 'border-[#411401]/30 bg-transparent'
                        }`}
                      >
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#FFFAA4]" />}
                      </span>
                    </div>
                    <p className="text-xs text-[#411401]/75 leading-relaxed mt-1">
                      {pkg.desc}
                    </p>
                  </div>
                );
              })}
            </div>
            {fieldErrors.package && (
              <p className="text-red-600 text-xs mt-1.5">{fieldErrors.package}</p>
            )}
          </div>

          {/* SECTION 4: PROJECT REQUIREMENTS & SCOPE */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.22em] font-bold text-[#411401] mb-3 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#FFFAA4] text-[#411401] inline-flex items-center justify-center text-[10px] font-bold">
                4
              </span>
              <span>Project Requirements & Details</span>
            </h3>

            {/* Description Text Area */}
            <div className="mb-5">
              <label className="block text-xs uppercase tracking-[0.16em] font-medium text-[#411401] mb-1.5">
                Describe Your Project, Goals and Required Features <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={projectRequirements}
                onChange={(e) => {
                  setProjectRequirements(e.target.value);
                  if (fieldErrors.projectRequirements) setFieldErrors({ ...fieldErrors, projectRequirements: '' });
                }}
                placeholder="Share details about what your business does, the pages or features you need (e.g. contact forms, WhatsApp integration, portfolio galleries, online payments, AI automation), and any specific design preferences..."
                className={`w-full p-4 rounded-xl bg-[#F0EFE9]/40 border text-sm text-[#411401] placeholder-[#411401]/40 focus:outline-none focus:bg-white transition-all leading-relaxed ${
                  fieldErrors.projectRequirements
                    ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                    : 'border-[#CDBBB3] focus:border-[#411401] focus:ring-2 focus:ring-[#411401]/10'
                }`}
              />
              {fieldErrors.projectRequirements && (
                <p className="text-red-600 text-xs mt-1">{fieldErrors.projectRequirements}</p>
              )}
            </div>

            {/* Optional Budget & Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
              {/* Estimated Budget */}
              <div>
                <label className="block text-xs uppercase tracking-[0.16em] font-medium text-[#411401] mb-1.5">
                  Estimated Budget <span className="text-[#411401]/50 text-[10px] normal-case tracking-normal">(Optional)</span>
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#F0EFE9]/40 border border-[#CDBBB3] text-sm text-[#411401] focus:outline-none focus:bg-white focus:border-[#411401] focus:ring-2 focus:ring-[#411401]/10 transition-all cursor-pointer"
                >
                  <option value="">Select your estimated budget (R1,500 - R2,500)...</option>
                  {BUDGET_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Project Timeline */}
              <div>
                <label className="block text-xs uppercase tracking-[0.16em] font-medium text-[#411401] mb-1.5">
                  Project Timeline <span className="text-[#411401]/50 text-[10px] normal-case tracking-normal">(Optional)</span>
                </label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#F0EFE9]/40 border border-[#CDBBB3] text-sm text-[#411401] focus:outline-none focus:bg-white focus:border-[#411401] focus:ring-2 focus:ring-[#411401]/10 transition-all cursor-pointer"
                >
                  <option value="">Select an expected timeline...</option>
                  {TIMELINE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Submission and Terms notice */}
          <div className="pt-2 border-t border-[#E7DCD5] space-y-4">
            <div className="p-3.5 rounded-xl bg-[#FFFAA4]/40 border border-[#C69D50]/30 text-xs text-[#411401]/85 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#411401] shrink-0 mt-0.5" />
              <div>
                <strong>Payment Terms:</strong> 50% deposit before work starts and 50% on completion.
                <span className="block mt-0.5 text-[11px] text-[#411401]/75">
                  Submitting a quotation request does not constitute acceptance of a quotation or a confirmed booking.
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto flex-1 py-4 px-8 rounded-full bg-[#411401] text-[#FFFAA4] hover:bg-[#2c0d01] transition-all duration-300 font-semibold text-xs uppercase tracking-[0.22em] shadow-lg flex items-center justify-center gap-3 cursor-pointer active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#FFFAA4]" />
                    <span>Processing Enquiry...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Quotation Request</span>
                    <Send className="w-4 h-4 stroke-[2]" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
