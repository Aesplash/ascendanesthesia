import { useEffect, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, CheckCircle2, FileText, ShieldCheck, X } from 'lucide-react';
import { COURSE_META } from '../data/courseData';

interface EnrollmentModalProps {
  open: boolean;
  initialTab?: 'enroll' | 'brochure';
  onClose: () => void;
}

interface TierCheckoutOption {
  id: 'basic' | 'silver' | 'gold' | 'platinum';
  label: string;
  price: string;
  lessons: string;
  enrollUrl: string;
  highlightNote: string;
}

const ENROLL_TIERS: TierCheckoutOption[] = [
  {
    id: 'platinum',
    label: 'Platinum Package',
    price: '$3,899.99',
    lessons: '18 Lessons',
    enrollUrl: 'https://ascendanesthesia.thinkific.com/enroll/3688173',
    highlightNote: 'Butterfly iQ+ Handheld Ultrasound Order Form (Module 1)',
  },
  {
    id: 'gold',
    label: 'Gold Package',
    price: '$1,349.99',
    lessons: '17 Lessons',
    enrollUrl: 'https://ascendanesthesia.thinkific.com/enroll/3688106',
    highlightNote: 'Gold tier conference bundle + custom employer documentation',
  },
  {
    id: 'silver',
    label: 'Silver Package',
    price: '$1,099.99',
    lessons: '17 Lessons',
    enrollUrl: 'https://ascendanesthesia.thinkific.com/enroll/3688104',
    highlightNote: 'Silver tier package benefits + custom destination brochure',
  },
  {
    id: 'basic',
    label: 'Basic Package',
    price: '$499.99',
    lessons: '17 Lessons',
    enrollUrl: 'https://ascendanesthesia.thinkific.com/enroll/3686703',
    highlightNote: 'Core 5-day 25.00 MAC Ed CE seminar (no hardware bundle)',
  },
];

export function EnrollmentModal({
  open,
  initialTab = 'enroll',
  onClose,
}: EnrollmentModalProps) {
  const [activeTab, setActiveTab] = useState<'enroll' | 'brochure'>(initialTab);
  const [selectedTierId, setSelectedTierId] =
    useState<TierCheckoutOption['id']>('platinum');

  useEffect(() => {
    if (open) {
      setActiveTab(initialTab);
    }
  }, [open, initialTab]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  const [acknowledgedPolicy, setAcknowledgedPolicy] = useState(false);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [formError, setFormError] = useState('');
  const [brochureSubmitted, setBrochureSubmitted] = useState(false);

  const selectedTier =
    ENROLL_TIERS.find((t) => t.id === selectedTierId) ?? ENROLL_TIERS[0];

  const handleBrochureSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!fullName.trim()) {
      setFormError('Please enter your full name and credentials.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setFormError('Please enter a valid work or personal email address.');
      return;
    }
    setFormError('');
    setBrochureSubmitted(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="enroll-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A2039]/70 p-4 backdrop-blur-xs"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 6 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-[#E4E7EC] bg-[#FBFAF7] p-6 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-[#357884]">
              AANA CODE {COURSE_META.aanaCode} · EXP {COURSE_META.expirationDate}
            </p>
            <h2
              id="enroll-modal-title"
              className="mt-1 font-display text-2xl font-semibold text-[#133C6B]"
            >
              Modern Anesthesia Practice Enrollment
            </h2>
          </div>

          <button
            type="button"
            aria-label="Close enrollment modal"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[#6B7684] transition-colors hover:bg-[#EEF3F9] hover:text-[#133C6B] cursor-pointer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Mode Tabs */}
        <div
          role="tablist"
          aria-label="Enrollment options"
          className="mt-5 grid grid-cols-2 gap-1.5 rounded-xl border border-[#E4E7EC] bg-[#EEF3F9] p-1"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'enroll'}
            onClick={() => setActiveTab('enroll')}
            className={`min-h-[38px] whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'enroll'
                ? 'bg-white text-[#133C6B] shadow-xs'
                : 'text-[#6B7684] hover:text-[#133C6B]'
            }`}
          >
            Direct Enrollment ({selectedTier.price})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'brochure'}
            onClick={() => setActiveTab('brochure')}
            className={`min-h-[38px] whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'brochure'
                ? 'bg-white text-[#133C6B] shadow-xs'
                : 'text-[#6B7684] hover:text-[#133C6B]'
            }`}
          >
            Employer CME Pre-Approval
          </button>
        </div>

        {activeTab === 'enroll' ? (
          <div className="mt-6 space-y-5">
            {/* Tier Selector */}
            <div>
              <p className="text-xs font-bold tracking-wider text-[#133C6B]">
                SELECT PACKAGE TIER
              </p>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {ENROLL_TIERS.map((tier) => {
                  const active = tier.id === selectedTier.id;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setSelectedTierId(tier.id)}
                      className={`btn-press flex flex-col items-start rounded-xl border p-2.5 text-left transition-colors cursor-pointer ${
                        active
                          ? 'border-[#133C6B] bg-[#EEF3F9]'
                          : 'border-[#E4E7EC] bg-white hover:bg-[#F6F1E9]'
                      }`}
                    >
                      <span className="text-[11px] font-bold text-[#133C6B]">
                        {tier.label.replace(' Package', '')}
                      </span>
                      <span className="mt-0.5 font-num-tabular text-sm font-semibold text-[#0A2039]">
                        {tier.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-xl border border-[#E4E7EC] bg-white p-4">
              <div className="flex items-baseline justify-between gap-4 border-b border-[#E4E7EC] pb-3">
                <span className="text-sm font-bold text-[#133C6B]">
                  {selectedTier.label} ({selectedTier.lessons})
                </span>
                <span className="font-num-tabular text-xl font-semibold text-[#0A2039]">
                  {selectedTier.price}
                </span>
              </div>

              <ul className="mt-3 space-y-2 text-sm text-[#333B47]">
                <li className="flex items-start gap-2">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#3B635D]"
                    aria-hidden="true"
                  />
                  <span>{selectedTier.highlightNote}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#3B635D]"
                    aria-hidden="true"
                  />
                  <span>
                    25.00 MAC Ed CE Credits (10.50 Pharmacology &amp; Therapeutics)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#3B635D]"
                    aria-hidden="true"
                  />
                  <span>
                    Default &amp; Custom Employer Reimbursement Brochures +
                    Emailed Certificate
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-[#E4E7EC] bg-[#EEF8F9] p-3.5 text-xs leading-relaxed text-[#333B47]">
              <span className="font-bold text-[#133C6B]">
                Group, Loyalty &amp; Referral Discounts:
              </span>{' '}
              On the Thinkific checkout page, click{' '}
              <span className="font-semibold text-[#0A2039]">
                “Click here to enter discount code”
              </span>
              . For a group code, email{' '}
              <a
                href={`mailto:${COURSE_META.contactEmail}`}
                className="font-bold text-[#357884] underline underline-offset-2"
              >
                {COURSE_META.contactEmail}
              </a>{' '}
              with your group size and name.
            </div>

            <label className="flex items-start gap-3 rounded-xl border border-[#C99A3B]/40 bg-[#F7ECD6]/55 p-3.5 text-sm text-[#333B47] cursor-pointer hover:bg-[#F7ECD6]/80">
              <input
                type="checkbox"
                checked={acknowledgedPolicy}
                onChange={(e) => setAcknowledgedPolicy(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-[#6B7684] text-[#C22A2E] focus:ring-[#C22A2E]"
              />
              <span>
                I understand this program is structured as a{' '}
                <strong className="font-bold text-[#0A2039]">
                  five-day seminar and is not eligible for extension
                </strong>{' '}
                (reschedule anytime prior to start; $100 fee on eligible
                pre-view cancellations).
              </span>
            </label>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-xs text-[#6B7684]">
                <ShieldCheck
                  className="h-4 w-4 text-[#3B635D]"
                  aria-hidden="true"
                />
                <span>Checkout via Thinkific &amp; Stripe</span>
              </div>

              {acknowledgedPolicy ? (
                <a
                  href={selectedTier.enrollUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#C22A2E] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#BC1A1A]"
                >
                  <span>Proceed to Thinkific Checkout</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="inline-flex min-h-[44px] items-center justify-center whitespace-nowrap rounded-lg bg-[#E4E7EC] px-5 py-2.5 text-sm font-bold text-[#6B7684] cursor-not-allowed"
                >
                  Confirm 5-Day Policy Above to Continue
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="mt-6">
            {brochureSubmitted ? (
              <div className="rounded-xl border border-[#41909D]/40 bg-[#EEF8F9] p-5">
                <div className="flex items-center gap-2 text-[#357884]">
                  <FileText className="h-5 w-5" aria-hidden="true" />
                  <h3 className="font-display text-lg font-semibold text-[#133C6B]">
                    CME Pre-Approval Request Prepared
                  </h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[#333B47]">
                  Thank you, {fullName}. A pre-approval summary referencing AANA
                  Code{' '}
                  <span className="font-num-tabular font-semibold text-[#133C6B]">
                    {COURSE_META.aanaCode}
                  </span>{' '}
                  (25.00 MAC Ed CE Credits, 10.50 Pharm) and the{' '}
                  {selectedTier.price} {selectedTier.label} is ready for{' '}
                  <span className="font-bold text-[#0A2039]">{email}</span>.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={`mailto:${COURSE_META.contactEmail}?subject=${encodeURIComponent(
                      `Employer CME Pre-Approval Brochure Request (${selectedTier.label})`
                    )}&body=${encodeURIComponent(
                      `Name & Credentials: ${fullName}\nEmail: ${email}\nEmployer / Hospital: ${
                        organization || 'N/A'
                      }\nPackage Tier: ${selectedTier.label} (${selectedTier.price})\nCourse: Modern Anesthesia Practice (AANA Code ${COURSE_META.aanaCode})`
                    )}`}
                    className="btn-press inline-flex min-h-[40px] items-center rounded-lg bg-[#133C6B] px-4 py-2 text-xs font-bold text-white hover:bg-[#0A2039]"
                  >
                    Open Request in Email App
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setBrochureSubmitted(false);
                      setActiveTab('enroll');
                    }}
                    className="min-h-[40px] whitespace-nowrap rounded-lg bg-[#C22A2E] px-4 py-2 text-xs font-bold text-white hover:bg-[#BC1A1A] cursor-pointer"
                  >
                    Switch to Direct Enrollment
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="min-h-[40px] whitespace-nowrap rounded-lg border border-[#E4E7EC] bg-white px-4 py-2 text-xs font-bold text-[#133C6B] hover:bg-[#EEF3F9] cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBrochureSubmit} className="space-y-4">
                <p className="text-sm leading-relaxed text-[#333B47]">
                  Need employer CME stipend approval before checkout? Request a
                  pre-enrollment brochure packet with AANA Code{' '}
                  <span className="font-num-tabular font-semibold text-[#133C6B]">
                    {COURSE_META.aanaCode}
                  </span>
                  .
                </p>

                <div>
                  <label
                    htmlFor="cme-name"
                    className="block text-xs font-bold text-[#133C6B]"
                  >
                    Full Name &amp; Credentials
                  </label>
                  <input
                    id="cme-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g., Jordan Taylor, DNP, CRNA"
                    className="mt-1.5 w-full rounded-lg border border-[#E4E7EC] bg-white px-3.5 py-2.5 text-sm text-[#0A2039] placeholder:text-[#6B7684] focus:border-[#41909D] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="cme-email"
                    className="block text-xs font-bold text-[#133C6B]"
                  >
                    Email Address
                  </label>
                  <input
                    id="cme-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@hospital.org"
                    className="mt-1.5 w-full rounded-lg border border-[#E4E7EC] bg-white px-3.5 py-2.5 text-sm text-[#0A2039] placeholder:text-[#6B7684] focus:border-[#41909D] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="cme-org"
                    className="block text-xs font-bold text-[#133C6B]"
                  >
                    Hospital / Anesthesia Group (Optional)
                  </label>
                  <input
                    id="cme-org"
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="For custom brochure formatting"
                    className="mt-1.5 w-full rounded-lg border border-[#E4E7EC] bg-white px-3.5 py-2.5 text-sm text-[#0A2039] placeholder:text-[#6B7684] focus:border-[#41909D] focus:outline-none"
                  />
                </div>

                {formError && (
                  <p
                    role="alert"
                    className="rounded-lg bg-[#FBE0E0] px-3 py-2 text-xs font-bold text-[#BC1A1A]"
                  >
                    {formError}
                  </p>
                )}

                <button
                  type="submit"
                  className="btn-press w-full min-h-[44px] whitespace-nowrap rounded-lg bg-[#133C6B] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#0A2039] cursor-pointer"
                >
                  Generate CME Pre-Approval Summary
                </button>
              </form>
            )}
          </div>
        )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
