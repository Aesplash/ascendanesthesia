import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, Mail, Search, Tag } from 'lucide-react';
import { COURSE_META, FAQ_ITEMS } from '../data/courseData';

const CATEGORIES = [
  'All Questions',
  'Accreditation & Format',
  'Discounts & Pricing',
  'Policies & Fulfillment',
] as const;

interface FaqPageProps {
  onContactClick: () => void;
}

export function FaqPage({ onContactClick }: FaqPageProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof CATEGORIES)[number]>('All Questions');
  const [searchQuery, setSearchQuery] = useState('');
  const [openId, setOpenId] = useState<string>('faq-crna-owned');

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All Questions' || item.category === selectedCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      item.question.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="bg-[#FBFAF7] py-16 lg:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <p className="text-xs font-bold tracking-wider text-[#357884]">
            FREQUENTLY ASKED QUESTIONS
          </p>
          <h1 className="mt-2 text-balance font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.12] tracking-tight text-[#133C6B]">
            Answers on CE Credits, Discounts, Rescheduling &amp; Advocacy
          </h1>
          <p className="mt-3 text-base leading-relaxed text-[#333B47]">
            Everything CRNAs ask before enrolling—structured with clear
            questions so policies, coupon codes, and certificate workflows are
            easy to scan.
          </p>
        </motion.div>

        {/* Search + Category Controls */}
        <div className="mt-8 space-y-4">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7684]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g., coupon, post-test, PAC, cancellation)..."
              aria-label="Search frequently asked questions"
              className="w-full rounded-xl border border-[#E4E7EC] bg-white py-3 pl-10 pr-4 text-sm text-[#0A2039] placeholder:text-[#6B7684] focus:border-[#41909D] focus:outline-none"
            />
          </div>

          <div
            role="tablist"
            aria-label="Filter FAQ by topic"
            className="flex flex-wrap gap-1.5 rounded-xl border border-[#E4E7EC] bg-[#EEF3F9] p-1.5"
          >
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(category)}
                  className={`btn-press min-h-[36px] whitespace-nowrap shrink-0 rounded-lg px-3 py-1.5 text-xs font-bold cursor-pointer ${
                    active
                      ? 'bg-white text-[#133C6B] shadow-xs'
                      : 'text-[#6B7684] hover:text-[#133C6B]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Accordion List */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 divide-y divide-[#E4E7EC] overflow-hidden rounded-2xl border border-[#E4E7EC] bg-white"
        >
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center">
              <p className="font-display text-lg font-semibold text-[#133C6B]">
                No matching questions found
              </p>
              <p className="mt-1 text-sm text-[#6B7684]">
                Try another keyword or reach out directly to our administrative
                team.
              </p>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div key={faq.id}>
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? '' : faq.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-[#FBFAF7] cursor-pointer"
                  >
                    <div>
                      <span className="text-xs font-bold text-[#357884]">
                        {faq.category}
                      </span>
                      <p className="mt-0.5 font-display text-base font-semibold text-[#0A2039]">
                        {faq.question}
                      </p>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-[#6B7684] transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                        className="px-6 pb-5 text-sm leading-relaxed text-[#333B47]"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </motion.div>

        {/* Coupon Code & Direct Support Callout */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="hover-lift rounded-2xl border border-[#E4E7EC] bg-[#F6F1E9] p-6">
            <div className="flex items-center gap-2 text-[#133C6B]">
              <Tag className="h-4 w-4 text-[#C22A2E]" aria-hidden="true" />
              <h2 className="font-display text-lg font-semibold">
                How to Apply Coupon Codes
              </h2>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-[#333B47]">
              We offer coupon codes for referrals, repeat customers, and group
              discounts. At checkout, select{' '}
              <strong className="font-bold text-[#0A2039]">
                “Click here to enter discount code”
              </strong>{' '}
              and enter your code.
            </p>
          </div>

          <div className="hover-lift rounded-2xl border border-[#E4E7EC] bg-[#EEF8F9] p-6">
            <div className="flex items-center gap-2 text-[#133C6B]">
              <Mail className="h-4 w-4 text-[#357884]" aria-hidden="true" />
              <h2 className="font-display text-lg font-semibold">
                Still Have a Question?
              </h2>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-[#333B47]">
              Email{' '}
              <a
                href={`mailto:${COURSE_META.contactEmail}`}
                className="font-bold text-[#357884] underline"
              >
                {COURSE_META.contactEmail}
              </a>{' '}
              or send us a message directly for the fastest response.
            </p>
            <button
              type="button"
              onClick={onContactClick}
              className="btn-press mt-4 min-h-[40px] rounded-lg bg-[#133C6B] px-4 py-2 text-xs font-bold text-white hover:bg-[#0A2039] cursor-pointer"
            >
              Open Contact Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
