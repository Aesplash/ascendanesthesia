import { motion } from 'motion/react';
import { COURSE_META } from '../data/courseData';

function AanaApprovalEmblem() {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
      className="h-9 w-9 shrink-0"
    >
      <rect
        x="1"
        y="1"
        width="34"
        height="34"
        rx="8"
        fill="#FFFFFF"
        stroke="#E4E7EC"
      />
      <path
        d="M18 7.5L26 10.7V17.4C26 22.7 22.6 26.9 18 28.5C13.4 26.9 10 22.7 10 17.4V10.7L18 7.5Z"
        fill="#EEF8F9"
        stroke="#133C6B"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 18.2L16.9 20.6L21.7 15.6"
        stroke="#357884"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TripleCrownEmblem() {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
      className="h-9 w-9 shrink-0"
    >
      <rect
        x="1"
        y="1"
        width="34"
        height="34"
        rx="8"
        fill="#FFFFFF"
        stroke="#E4E7EC"
      />
      <path
        d="M9 23.5L11.2 13.5L15.2 17.5L18 11.5L20.8 17.5L24.8 13.5L27 23.5H9Z"
        fill="#F7ECD6"
        stroke="#C99A3B"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 26H25.5"
        stroke="#133C6B"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StatePacEmblem() {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
      className="h-9 w-9 shrink-0"
    >
      <rect
        x="1"
        y="1"
        width="34"
        height="34"
        rx="8"
        fill="#FFFFFF"
        stroke="#E4E7EC"
      />
      <path
        d="M18 8.5C15.4 10.6 14 13.3 14 16H22C22 13.3 20.6 10.6 18 8.5Z"
        fill="#EEF8F9"
        stroke="#357884"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M11.5 16H24.5M13 16V24M18 16V24M23 16V24M10 24.5H26"
        stroke="#133C6B"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CrnaOwnedEmblem() {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
      className="h-9 w-9 shrink-0"
    >
      <rect
        x="1"
        y="1"
        width="34"
        height="34"
        rx="8"
        fill="#FFFFFF"
        stroke="#E4E7EC"
      />
      <path
        d="M11 24.5L17.6 10.5L24.5 24.5"
        stroke="#C22A2E"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 21.5L22.5 15.5M22.5 15.5L19.3 15.1M22.5 15.5L21.3 18.5"
        stroke="#133C6B"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const TRUST_ITEMS = [
  {
    id: 'aana-approved',
    title: 'AANA Prior Approved',
    detail: `Code ${COURSE_META.aanaCode} · Exp ${COURSE_META.expirationDate}`,
    Emblem: AanaApprovalEmblem,
  },
  {
    id: 'aana-foundation',
    title: 'AANA Foundation & CRNA-PAC',
    detail: 'Proud Triple Crown Donor Member',
    Emblem: TripleCrownEmblem,
  },
  {
    id: 'state-pac',
    title: 'State PAC Memberships',
    detail: 'Portion of Every Registration Donated',
    Emblem: StatePacEmblem,
  },
  {
    id: 'crna-owned',
    title: '100% CRNA-Owned',
    detail: 'Built by CRNAs · No Post-Tests',
    Emblem: CrnaOwnedEmblem,
  },
];

export function AccreditationTrustStrip() {
  return (
    <section
      aria-label="Accreditation and CRNA trust credentials"
      className="border-b border-[#E4E7EC] bg-[#EEF3F9]"
    >
      <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="shrink-0">
            <p className="text-[11px] font-bold tracking-wider text-[#357884]">
              ACCREDITATION TRUST
            </p>
          </div>

          <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {TRUST_ITEMS.map(({ id, title, detail, Emblem }, idx) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.24,
                  delay: 0.08 + idx * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group hover-lift flex items-center gap-3 rounded-xl border border-transparent px-2.5 py-2 hover:bg-white"
              >
                <div className="transition-transform duration-180 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:scale-105">
                  <Emblem />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-display text-sm font-semibold text-[#133C6B]">
                    {title}
                  </p>
                  <p className="truncate text-xs font-medium text-[#333B47]">
                    {detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
