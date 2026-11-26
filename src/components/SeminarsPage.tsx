import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Globe2 } from 'lucide-react';
import { COURSE_META } from '../data/courseData';

interface SeminarsPageProps {
  onSelectPlatinum: () => void;
  onEnrollPlatinum: () => void;
}

const CUSTOM_STEPS = [
  {
    step: '01',
    title: 'Schedule Your Own Vacation',
    detail:
      'Pick the destination and travel dates that work for your schedule—anywhere you want to go.',
  },
  {
    step: '02',
    title: 'Sign Up for an Approved Seminar',
    detail:
      'Choose your 25-credit seminar and package tier (Basic, Silver, Gold, or Platinum with Butterfly iQ+).',
  },
  {
    step: '03',
    title: 'Share Your Trip Dates & Location',
    detail:
      'Submit your dates and destination inside the onboarding module—or request custom formatting from our staff.',
  },
  {
    step: '04',
    title: 'Complete With No Post-Tests',
    detail:
      'Access evidence-based modules from desktop or mobile, submit your Self-Assessment Form, and we upload your transcript to AANA automatically.',
  },
];

const PACKAGE_TIERS = [
  {
    name: 'Basic Package',
    price: '$499.99',
    lessons: '17 Lessons',
    highlight: false,
    summary: 'Core 25.00 MAC Ed CE 5-day seminar with custom destination brochure and automated AANA reporting.',
    ctaLabel: 'View on Thinkific',
    href: 'https://ascendanesthesia.thinkific.com/collections',
  },
  {
    name: 'Silver Package',
    price: '$1,099.99',
    lessons: '17 Lessons',
    highlight: false,
    summary: '25.00 MAC Ed CE seminar with upgraded Silver tier conference bundle & custom brochure.',
    ctaLabel: 'View on Thinkific',
    href: 'https://ascendanesthesia.thinkific.com/collections',
  },
  {
    name: 'Gold Package',
    price: '$1,349.99',
    lessons: '17 Lessons',
    highlight: false,
    summary: '25.00 MAC Ed CE seminar with Gold tier benefits, custom destination documentation, and moderator access.',
    ctaLabel: 'View on Thinkific',
    href: 'https://ascendanesthesia.thinkific.com/collections',
  },
  {
    name: 'Platinum Package',
    price: '$3,899.99',
    lessons: '18 Lessons',
    highlight: true,
    summary: 'Full 25.00 MAC Ed CE seminar (10.50 Pharm) plus the ButterflyIQ+ Order Form for your handheld ultrasound probe.',
    ctaLabel: 'View Platinum Details',
    href: '',
  },
];

export function SeminarsPage({
  onSelectPlatinum,
  onEnrollPlatinum,
}: SeminarsPageProps) {
  return (
    <div className="bg-[#FBFAF7]">
      {/* Hero */}
      <section className="border-b border-[#E4E7EC] bg-[#133C6B] py-16 text-white lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <p className="text-xs font-bold tracking-wider text-[#BFE0E4]">
              ANYTIME · ANYWHERE · MADE BY CRNAs FOR CRNAs
            </p>
            <h1 className="mt-3 text-balance font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.12] tracking-tight text-white">
              Custom Destination Anesthesia Seminars
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#EEF3F9] sm:text-lg">
              Turn any personal trip into an AANA-approved continuing education
              seminar customized to your dates and destination—with zero
              post-tests and automatic AANA transcript reporting.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4-Step How Custom Seminars Work */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-bold tracking-wider text-[#357884]">
                HOW CUSTOM SEMINARS WORK
              </p>
              <h2 className="mt-2 text-balance font-display text-3xl font-semibold tracking-tight text-[#133C6B]">
                Four Steps to Earn 25.00 Class A Credits Anywhere
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#3B635D]">
              <Globe2 className="h-4 w-4" aria-hidden="true" />
              <span>Automatic AANA ID Transcript Upload</span>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CUSTOM_STEPS.map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.22,
                  delay: idx * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="hover-lift rounded-xl border border-[#E4E7EC] bg-white p-6"
              >
                <span className="font-num-tabular text-lg font-semibold text-[#41909D]">
                  {item.step}.
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold text-[#133C6B]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#333B47]">
                  {item.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Active AANA-Approved Programs */}
      <section className="border-t border-[#E4E7EC] bg-[#F6F1E9] py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-wider text-[#357884]">
              AANA PRIOR APPROVAL ACTIVE
            </p>
            <h2 className="mt-2 text-balance font-display text-3xl font-semibold tracking-tight text-[#133C6B]">
              Two 25-Credit Seminar Curricula &amp; Package Tiers
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="hover-lift rounded-2xl border border-[#E4E7EC] bg-white p-6">
              <p className="font-num-tabular text-xs font-bold text-[#357884]">
                CODE 1046673 · EXP {COURSE_META.expirationDate}
              </p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-[#133C6B]">
                Modern Anesthesia Practice: Safety, Compliance &amp; Advanced
                Clinical Care
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#333B47]">
                25.00 MAC Ed CE credits (including up to 10.50 CE credits in
                Pharmacology &amp; Therapeutics). Available in Basic, Silver,
                Gold, and Platinum (Butterfly iQ+ included).
              </p>
              <button
                type="button"
                onClick={onSelectPlatinum}
                className="group btn-press mt-5 inline-flex min-h-[42px] items-center gap-2 rounded-lg bg-[#C22A2E] px-4 py-2 text-xs font-bold text-white hover:bg-[#BC1A1A] cursor-pointer"
              >
                <span>Inspect Platinum Package</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </button>
            </div>

            <div className="hover-lift rounded-2xl border border-[#E4E7EC] bg-white p-6">
              <p className="font-num-tabular text-xs font-bold text-[#357884]">
                CODE 1046968 · AANA PRIOR APPROVED
              </p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-[#133C6B]">
                Anesthesia in Context: Managing Complex Situations in the OR
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#333B47]">
                25.00 MAC Ed CE credits focused on complex intraoperative
                scenarios, offered across Gold and Platinum (Butterfly iQ+)
                custom destination packages.
              </p>
              <a
                href={COURSE_META.collectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group btn-press mt-5 inline-flex min-h-[42px] items-center gap-2 rounded-lg border border-[#E4E7EC] bg-[#EEF3F9] px-4 py-2 text-xs font-bold text-[#133C6B] hover:bg-[#E4E7EC]"
              >
                <span>Browse Anesthesia in Context</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>

          {/* 4-Tier Comparison for Modern Anesthesia Practice */}
          <h3 className="mt-14 font-display text-2xl font-semibold text-[#133C6B]">
            Compare Modern Anesthesia Practice Tiers
          </h3>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PACKAGE_TIERS.map((tier, idx) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.22,
                  delay: idx * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`flex flex-col justify-between rounded-2xl border p-6 ${
                  tier.highlight
                    ? 'hover-lift-dark border-[#133C6B] bg-[#0A2039] text-white'
                    : 'hover-lift border-[#E4E7EC] bg-white text-[#333B47]'
                }`}
              >
                <div>
                  <p
                    className={`font-num-tabular text-xs font-bold ${
                      tier.highlight ? 'text-[#BFE0E4]' : 'text-[#357884]'
                    }`}
                  >
                    {tier.lessons} · 25.00 MAC Ed CE
                  </p>
                  <h4
                    className={`mt-1.5 font-display text-xl font-semibold ${
                      tier.highlight ? 'text-white' : 'text-[#133C6B]'
                    }`}
                  >
                    {tier.name}
                  </h4>
                  <p
                    className={`mt-3 font-num-tabular text-2xl font-semibold ${
                      tier.highlight ? 'text-white' : 'text-[#0A2039]'
                    }`}
                  >
                    {tier.price}
                  </p>
                  <p
                    className={`mt-3 text-sm leading-relaxed ${
                      tier.highlight ? 'text-[#EEF3F9]' : 'text-[#333B47]'
                    }`}
                  >
                    {tier.summary}
                  </p>
                </div>

                <div className="mt-6">
                  {tier.highlight ? (
                    <button
                      type="button"
                      onClick={onEnrollPlatinum}
                      className="group btn-press flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-[#C22A2E] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#BC1A1A] cursor-pointer"
                    >
                      <span>Enroll in Platinum</span>
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </button>
                  ) : (
                    <a
                      href={tier.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group btn-press flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg border border-[#E4E7EC] bg-[#FBFAF7] px-4 py-2.5 text-xs font-bold text-[#133C6B] hover:bg-[#EEF3F9]"
                    >
                      <span>{tier.ctaLabel}</span>
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2 text-xs text-[#6B7684]">
            <CheckCircle2 className="h-4 w-4 text-[#3B635D]" aria-hidden="true" />
            <span>
              All tiers include automated AANA transcript reporting and zero
              mandatory post-tests.
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
