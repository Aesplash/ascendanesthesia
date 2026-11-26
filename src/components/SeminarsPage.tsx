import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Globe2,
  Search,
  X,
} from 'lucide-react';
import {
  COURSE_META,
  THINKIFIC_COURSES,
  THINKIFIC_PROGRAMS,
} from '../data/courseData';

interface SeminarsPageProps {
  onSelectPlatinum: () => void;
  onEnrollPlatinum: () => void;
  onRequestSeminarInfo: (prefillMessage: string) => void;
}

type ProgramFilter =
  | 'all'
  | 'modern-practice'
  | 'anesthesia-context'
  | '1099-blueprint';

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
      'Choose any of the 9 published packages across 25-credit clinical seminars or the 12-credit 1099 Blueprint.',
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

const FILTER_TABS: { id: ProgramFilter; label: string; count: number }[] = [
  { id: 'all', label: 'All Courses', count: THINKIFIC_COURSES.length },
  { id: 'modern-practice', label: 'Modern Anesthesia Practice', count: 4 },
  { id: 'anesthesia-context', label: 'Anesthesia in Context', count: 4 },
  { id: '1099-blueprint', label: '1099 Blueprint', count: 1 },
];

export function SeminarsPage({
  onSelectPlatinum,
  onEnrollPlatinum,
  onRequestSeminarInfo,
}: SeminarsPageProps) {
  const [activeFilter, setActiveFilter] = useState<ProgramFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const visibleCourses = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return THINKIFIC_COURSES.filter((course) => {
      const matchesTab =
        activeFilter === 'all' || course.programId === activeFilter;
      if (!matchesTab) return false;
      if (!query) return true;
      return (
        course.title.toLowerCase().includes(query) ||
        course.programLabel.toLowerCase().includes(query) ||
        course.summary.toLowerCase().includes(query) ||
        course.aanaCode.includes(query) ||
        course.ceCredits.toLowerCase().includes(query) ||
        (course.pharmCredits?.toLowerCase().includes(query) ?? false)
      );
    });
  }, [activeFilter, searchQuery]);

  const handleSelectProgram = (filter: ProgramFilter) => {
    setActiveFilter(filter);
    setSearchQuery('');
    const el = document.getElementById('thinkific-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-[#FBFAF7]">
      {/* Hero */}
      <section className="border-b border-[#E4E7EC] bg-[#133C6B] py-16 text-white lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          >
            <div className="max-w-3xl">
              <p className="text-xs font-bold tracking-wider text-[#BFE0E4]">
                ANYTIME · ANYWHERE · MADE BY CRNAs FOR CRNAs
              </p>
              <h1 className="mt-3 text-balance font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.12] tracking-tight text-white">
                Custom Destination Anesthesia Seminars &amp; Collections
              </h1>
              <p className="mt-4 text-base leading-relaxed text-[#EEF3F9] sm:text-lg">
                Browse all 9 published Thinkific packages and 5 active
                AANA-approved curricula—from 25-credit clinical seminars and
                Butterfly iQ+ bundles to our 12-credit 1099 Blueprint and
                5-credit controlled-substance compliance training.
              </p>
            </div>

            <div className="shrink-0">
              <a
                href={COURSE_META.collectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group btn-press inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[#41909D] bg-[#0A2039] px-4 py-2.5 text-xs font-bold text-[#BFE0E4] hover:bg-[#16365E]"
              >
                <span>Open Live Thinkific Collections</span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
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
                Four Steps to Earn AANA Class A Credits Anywhere
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

      {/* Complete 9-Course Thinkific Catalog + Search */}
      <section className="border-t border-[#E4E7EC] bg-[#F6F1E9] py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div id="thinkific-catalog" className="scroll-mt-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-bold tracking-wider text-[#357884]">
                  COMPLETE THINKIFIC CATALOG
                </p>
                <h2 className="mt-1 font-display text-2xl font-semibold text-[#133C6B] sm:text-3xl">
                  All {THINKIFIC_COURSES.length} Different Published Courses
                </h2>
              </div>

              <div className="relative w-full lg:max-w-xs">
                <Search
                  className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#6B7684]"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses, AANA code, CE..."
                  aria-label="Search published courses"
                  className="min-h-[42px] w-full rounded-lg border border-[#E4E7EC] bg-white pr-9 pl-10 text-sm text-[#0A2039] placeholder:text-[#6B7684] focus:border-[#41909D] focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded p-1 text-[#6B7684] hover:text-[#133C6B] cursor-pointer"
                  >
                    <X className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>

            <div
              role="tablist"
              aria-label="Filter Thinkific courses by curriculum"
              className="mt-6 flex flex-wrap gap-1.5 rounded-xl border border-[#E4E7EC] bg-white p-1.5"
            >
              {FILTER_TABS.map((tab) => {
                const active = activeFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveFilter(tab.id)}
                    className={`min-h-[36px] whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#133C6B] text-white'
                        : 'text-[#333B47] hover:bg-[#EEF3F9] hover:text-[#133C6B]'
                    }`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                );
              })}
            </div>

            {visibleCourses.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-[#E4E7EC] bg-white p-8 text-center">
                <p className="font-display text-lg font-semibold text-[#133C6B]">
                  No courses matched “{searchQuery}”
                </p>
                <p className="mt-1 text-sm text-[#6B7684]">
                  Clear your search or switch curriculum tabs to see all 9
                  published courses.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveFilter('all');
                  }}
                  className="btn-press mt-4 inline-flex min-h-[40px] items-center rounded-lg border border-[#E4E7EC] bg-[#EEF3F9] px-4 py-2 text-xs font-bold text-[#133C6B] hover:bg-[#E4E7EC] cursor-pointer"
                >
                  Show All 9 Courses
                </button>
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {visibleCourses.map((course, idx) => (
                  <div
                    key={course.id}
                    className={`flex flex-col justify-between rounded-2xl border p-6 ${
                      course.isFlagship
                        ? 'hover-lift-dark border-[#133C6B] bg-[#0A2039] text-white'
                        : 'hover-lift border-[#E4E7EC] bg-white text-[#333B47]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`font-num-tabular text-[11px] font-bold tracking-wider uppercase ${
                            course.isFlagship
                              ? 'text-[#BFE0E4]'
                              : 'text-[#357884]'
                          }`}
                        >
                          0{idx + 1} · {course.programLabel}
                        </span>
                        <span
                          className={`font-num-tabular text-xs font-bold ${
                            course.isFlagship
                              ? 'text-[#BFE0E4]'
                              : 'text-[#6B7684]'
                          }`}
                        >
                          {course.lessons} Lessons
                        </span>
                      </div>

                      <h3
                        className={`mt-2 font-display text-xl font-semibold leading-snug ${
                          course.isFlagship ? 'text-white' : 'text-[#133C6B]'
                        }`}
                      >
                        {course.title}
                      </h3>

                      <div className="mt-3 flex flex-wrap items-baseline justify-between gap-2 border-b border-current/10 pb-3">
                        <span
                          className={`font-num-tabular text-2xl font-semibold ${
                            course.isFlagship ? 'text-white' : 'text-[#0A2039]'
                          }`}
                        >
                          {course.price}
                        </span>
                        <span
                          className={`font-num-tabular text-xs font-bold ${
                            course.isFlagship
                              ? 'text-[#BFE0E4]'
                              : 'text-[#3B635D]'
                          }`}
                        >
                          {course.ceCredits}
                          {course.pharmCredits
                            ? ` · ${course.pharmCredits}`
                            : ''}
                        </span>
                      </div>

                      <p
                        className={`mt-3 text-sm leading-relaxed ${
                          course.isFlagship
                            ? 'text-[#EEF3F9]'
                            : 'text-[#333B47]'
                        }`}
                      >
                        {course.summary}
                      </p>

                      <p
                        className={`mt-3 font-num-tabular text-[11px] ${
                          course.isFlagship
                            ? 'text-[#BFE0E4]/85'
                            : 'text-[#6B7684]'
                        }`}
                      >
                        AANA Code {course.aanaCode} · Exp {course.expirationDate}
                      </p>
                    </div>

                    <div className="mt-6 flex flex-col gap-2">
                      {course.isFlagship ? (
                        <>
                          <button
                            type="button"
                            onClick={onEnrollPlatinum}
                            className="group btn-press flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-[#C22A2E] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#BC1A1A] cursor-pointer"
                          >
                            <span>Enroll in Flagship Platinum</span>
                            <ArrowRight
                              className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                              aria-hidden="true"
                            />
                          </button>
                          <button
                            type="button"
                            onClick={onSelectPlatinum}
                            className="btn-press flex min-h-[38px] w-full items-center justify-center rounded-lg border border-[#1F4A7D] px-4 py-2 text-xs font-bold text-[#BFE0E4] hover:bg-[#133C6B] cursor-pointer"
                          >
                            View Full Syllabus &amp; Preview
                          </button>
                        </>
                      ) : (
                        <a
                          href={course.courseUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group btn-press flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg border border-[#E4E7EC] bg-[#FBFAF7] px-4 py-2.5 text-xs font-bold text-[#133C6B] hover:bg-[#EEF3F9]"
                        >
                          <span>View Course on Thinkific</span>
                          <ExternalLink
                            className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* All 5 Active AANA Prior-Approved Curricula */}
          <div className="mt-16 border-t border-[#E4E7EC] pt-14">
            <div className="max-w-3xl">
              <p className="text-xs font-bold tracking-wider text-[#357884]">
                AANA PRIOR APPROVAL ACTIVE
              </p>
              <h2 className="mt-2 text-balance font-display text-2xl font-semibold tracking-tight text-[#133C6B] sm:text-3xl">
                All 5 Ascend Anesthesia Seminars With Active AANA Approval
              </h2>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {THINKIFIC_PROGRAMS.map((prog, idx) => (
                <motion.div
                  key={prog.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.22,
                    delay: idx * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="hover-lift flex flex-col justify-between rounded-2xl border border-[#E4E7EC] bg-white p-6"
                >
                  <div>
                    <p className="font-num-tabular text-xs font-bold text-[#357884]">
                      0{idx + 1} · CODE {prog.aanaCode} · EXP{' '}
                      {prog.expirationDate}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-semibold leading-snug text-[#133C6B]">
                      {prog.title}
                    </h3>
                    <p className="mt-2 font-num-tabular text-xs font-bold text-[#0A2039]">
                      {prog.ceCredits}
                      {prog.pharmCredits ? ` · ${prog.pharmCredits}` : ''} ·{' '}
                      {prog.priceRange}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-[#333B47]">
                      {prog.description}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    {prog.hasCatalogPackages ? (
                      <button
                        type="button"
                        onClick={() =>
                          handleSelectProgram(
                            prog.id as
                              | 'modern-practice'
                              | 'anesthesia-context'
                              | '1099-blueprint'
                          )
                        }
                        className="group btn-press inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-[#E4E7EC] bg-[#EEF3F9] px-4 py-2 text-xs font-bold text-[#133C6B] hover:bg-[#E4E7EC] cursor-pointer"
                      >
                        <span>Filter Catalog Above</span>
                        <ArrowRight
                          className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          onRequestSeminarInfo(
                            `I would like registration details for "${prog.title}" (AANA Code ${prog.aanaCode}, ${prog.ceCredits}).`
                          )
                        }
                        className="group btn-press inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-[#E4E7EC] bg-[#FBFAF7] px-4 py-2 text-xs font-bold text-[#133C6B] hover:bg-[#EEF3F9] cursor-pointer"
                      >
                        <span>Request Custom Seminar Info</span>
                        <ArrowRight
                          className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </button>
                    )}

                    {prog.id === 'modern-practice' && (
                      <button
                        type="button"
                        onClick={onSelectPlatinum}
                        className="btn-press inline-flex min-h-[40px] items-center text-xs font-bold text-[#C22A2E] underline-offset-4 hover:underline cursor-pointer"
                      >
                        Inspect Platinum Syllabus
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center gap-2 text-xs text-[#6B7684]">
            <CheckCircle2
              className="h-4 w-4 shrink-0 text-[#3B635D]"
              aria-hidden="true"
            />
            <span>
              All seminars include automated AANA transcript reporting and zero
              mandatory post-tests.
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
