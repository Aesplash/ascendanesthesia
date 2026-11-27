import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FileCheck2, ShieldCheck, X } from 'lucide-react';
import { COURSE_META } from '../data/courseData';

export type PolicyTab = 'refund' | 'terms' | 'privacy';

interface PolicyModalProps {
  open: boolean;
  initialTab?: PolicyTab;
  onClose: () => void;
}

const POLICY_TABS: { id: PolicyTab; label: string }[] = [
  { id: 'refund', label: 'Refund & Cancellation' },
  { id: 'terms', label: 'Terms & AANA Credits' },
  { id: 'privacy', label: 'Privacy Policy' },
];

export function PolicyModal({
  open,
  initialTab = 'refund',
  onClose,
}: PolicyModalProps) {
  const [activeTab, setActiveTab] = useState<PolicyTab>(initialTab);

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

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="policy-modal-title"
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
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#E4E7EC] bg-[#FBFAF7] p-6 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold tracking-wider text-[#357884]">
                  ASCEND ANESTHESIA SEMINARS POLICIES
                </p>
                <h2
                  id="policy-modal-title"
                  className="mt-1 font-display text-2xl font-semibold text-[#133C6B]"
                >
                  Legal, Accreditation &amp; Fulfillment Policies
                </h2>
              </div>
              <button
                type="button"
                aria-label="Close policies modal"
                onClick={onClose}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[#6B7684] transition-colors hover:bg-[#EEF3F9] hover:text-[#133C6B] cursor-pointer"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div
              role="tablist"
              aria-label="Policy sections"
              className="mt-5 grid grid-cols-1 gap-1.5 rounded-xl border border-[#E4E7EC] bg-[#EEF3F9] p-1 sm:grid-cols-3"
            >
              {POLICY_TABS.map((tab) => {
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveTab(tab.id)}
                    className={`min-h-[38px] whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
                      active
                        ? 'bg-white text-[#133C6B] shadow-xs'
                        : 'text-[#6B7684] hover:text-[#133C6B]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 rounded-xl border border-[#E4E7EC] bg-white p-5 sm:p-6">
              {activeTab === 'refund' && (
                <div className="space-y-4 text-sm leading-relaxed text-[#333B47]">
                  <div className="flex items-center gap-2 text-[#133C6B]">
                    <ShieldCheck className="h-5 w-5 text-[#41909D]" aria-hidden="true" />
                    <h3 className="font-display text-lg font-semibold">
                      Rescheduling, Cancellation &amp; Refund Policy
                    </h3>
                  </div>
                  <p>
                    <strong className="font-bold text-[#0A2039]">
                      Flexible Rescheduling:
                    </strong>{' '}
                    You may reschedule your custom seminar dates anytime prior
                    to beginning your seminar by contacting our administrative
                    office staff.
                  </p>
                  <p>
                    <strong className="font-bold text-[#0A2039]">
                      Cancellations:
                    </strong>{' '}
                    You may cancel anytime before payment is rendered, or after
                    payment prior to the seminar start date and before any
                    course content is viewed. Eligible post-payment
                    cancellations are subject to a{' '}
                    <span className="font-num-tabular font-bold text-[#0A2039]">
                      $100
                    </span>{' '}
                    course cancellation fee.
                  </p>
                  <p>
                    <strong className="font-bold text-[#0A2039]">
                      5-Day Seminar Window &amp; Extended-Access Packages:
                    </strong>{' '}
                    Modern Anesthesia Practice courses are structured as five-day
                    seminars and are not eligible for extension. Refunds are not
                    issued for extended-access packages that include Amazon gift
                    cards.
                  </p>
                </div>
              )}

              {activeTab === 'terms' && (
                <div className="space-y-4 text-sm leading-relaxed text-[#333B47]">
                  <div className="flex items-center gap-2 text-[#133C6B]">
                    <FileCheck2 className="h-5 w-5 text-[#357884]" aria-hidden="true" />
                    <h3 className="font-display text-lg font-semibold">
                      AANA Prior Approval &amp; Certificate Delivery Terms
                    </h3>
                  </div>
                  <p>
                    <strong className="font-bold text-[#0A2039]">
                      Accreditation Status:
                    </strong>{' '}
                    Modern Anesthesia Practice is prior approved by the American
                    Association of Nurse Anesthesiology (Code{' '}
                    <span className="font-num-tabular font-semibold">
                      {COURSE_META.aanaCode}
                    </span>
                    , Expiration Date {COURSE_META.expirationDate}) for{' '}
                    <span className="font-num-tabular font-semibold">
                      25.00 MAC Ed CE credits
                    </span>{' '}
                    including up to{' '}
                    <span className="font-num-tabular font-semibold">
                      10.50 Pharmacology &amp; Therapeutics credits
                    </span>
                    .
                  </p>
                  <p>
                    <strong className="font-bold text-[#0A2039]">
                      Completion &amp; Reporting:
                    </strong>{' '}
                    There are zero mandatory post-tests. Certificates of
                    completion are emailed and AANA ID transcripts are uploaded
                    upon seminar completion and return of the required
                    Self-Assessment Form.
                  </p>
                  <p>
                    <strong className="font-bold text-[#0A2039]">
                      Hardware Fulfillment (Platinum):
                    </strong>{' '}
                    Butterfly iQ+ device fulfillment is initiated via the
                    ButterflyIQ+ Order Form located in Module 1 following paid
                    enrollment.
                  </p>
                </div>
              )}

              {activeTab === 'privacy' && (
                <div className="space-y-4 text-sm leading-relaxed text-[#333B47]">
                  <h3 className="font-display text-lg font-semibold text-[#133C6B]">
                    Privacy &amp; Practitioner Information
                  </h3>
                  <p>
                    Ascend Anesthesia Seminars collects practitioner details
                    (such as name, credentials, AANA ID number, email address,
                    and shipping details for Platinum hardware fulfillment)
                    solely to administer seminar enrollment, prepare custom
                    employer CME brochures, fulfill bundled hardware orders, and
                    report earned CE transcripts to the AANA.
                  </p>
                  <p>
                    Course enrollment and payments are processed securely
                    through Thinkific &amp; Stripe. We never sell practitioner
                    contact data to third-party marketers.
                  </p>
                  <p>
                    For privacy inquiries, data updates, or employer brochure
                    requests, contact{' '}
                    <a
                      href={`mailto:${COURSE_META.contactEmail}`}
                      className="font-bold text-[#357884] underline underline-offset-2"
                    >
                      {COURSE_META.contactEmail}
                    </a>
                    .
                  </p>
                </div>
              )}
            </div>

            <div className="mt-5 flex items-center justify-end">
              <button
                type="button"
                onClick={onClose}
                className="btn-press min-h-[40px] rounded-lg bg-[#133C6B] px-5 py-2 text-xs font-bold text-white hover:bg-[#0A2039] cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
