import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import {
  ArrowRight,
  ChevronDown,
  FileCheck2,
  FileText,
  Mail,
  Menu,
  ShieldCheck,
  Tag,
  X,
} from 'lucide-react';
import { AccreditationTrustStrip } from './components/AccreditationTrustStrip';
import { ContactPage } from './components/ContactPage';
import { CurriculumSection } from './components/CurriculumSection';
import { EnrollmentModal } from './components/EnrollmentModal';
import { FaqPage } from './components/FaqPage';
import { SavingsCalculator } from './components/SavingsCalculator';
import { SeminarUpdatesForm } from './components/SeminarUpdatesForm';
import { SeminarsPage } from './components/SeminarsPage';
import { StickyEnrollBar } from './components/StickyEnrollBar';
import { UltrasoundPage } from './components/UltrasoundPage';
import {
  COURSE_META,
  FAQ_ITEMS,
  PACKAGE_DELIVERABLES,
  TESTIMONIALS,
} from './data/courseData';

const BRAND_LOGO_SRC =
  '/assets/aistudio/_Updated_No_BG_-_Ascend_Logo_Dark__1_-1_bf9dd71c.png';

type PageView = 'course' | 'seminars' | 'ultrasound' | 'faq' | 'contact';

export default function App() {
  const heroHeadlineRef = useRef<HTMLHeadingElement | null>(null);
  const [activePage, setActivePage] = useState<PageView>('course');
  const [showStickyEnroll, setShowStickyEnroll] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaqId, setOpenFaqId] = useState<string>('faq-platinum');
  const [contactPrefill, setContactPrefill] = useState('');

  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [enrollModalTab, setEnrollModalTab] = useState<'enroll' | 'brochure'>(
    'enroll'
  );

  const [logoImgFailed, setLogoImgFailed] = useState(false);
  const [heroImgFailed, setHeroImgFailed] = useState(false);
  const [bundleImgFailed, setBundleImgFailed] = useState(false);
  const [instructorImgFailed, setInstructorImgFailed] = useState(false);

  useEffect(() => {
    if (activePage !== 'course') {
      setShowStickyEnroll(false);
      return;
    }

    const headlineEl = heroHeadlineRef.current;
    if (!headlineEl) return;

    const updateVisibility = () => {
      const rect = headlineEl.getBoundingClientRect();
      setShowStickyEnroll(rect.bottom < 0);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        setShowStickyEnroll(
          !entry.isIntersecting && entry.boundingClientRect.top < 0
        );
      },
      { threshold: 0 }
    );

    observer.observe(headlineEl);
    window.addEventListener('scroll', updateVisibility, { passive: true });
    updateVisibility();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateVisibility);
    };
  }, [activePage]);

  const getScrollBehavior = (): ScrollBehavior =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'auto'
      : 'smooth';

  const navigateTo = (page: PageView) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: getScrollBehavior() });
  };

  const scrollToCourseSection = (sectionId: string) => {
    const behavior = getScrollBehavior();
    setMobileMenuOpen(false);
    if (activePage !== 'course') {
      setActivePage('course');
      setTimeout(() => {
        document
          .getElementById(sectionId)
          ?.scrollIntoView({ behavior, block: 'start' });
      }, 70);
    } else {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior, block: 'start' });
    }
  };

  const openEnrollModal = (tab: 'enroll' | 'brochure' = 'enroll') => {
    setEnrollModalTab(tab);
    setEnrollModalOpen(true);
    setMobileMenuOpen(false);
  };

  const navItems: { id: PageView; label: string }[] = [
    { id: 'course', label: 'Platinum Course' },
    { id: 'seminars', label: 'Seminars' },
    { id: 'ultrasound', label: 'Ultrasound Classes' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact Us' },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#FBFAF7] text-[#333B47]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[#133C6B] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to main content
      </a>

      {/* Top Navigation Bar — 3-zone contract */}
      <header className="relative z-30 border-b border-[#E4E7EC] bg-[#FBFAF7]">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => navigateTo('course')}
            aria-label="Ascend Anesthesia Seminars home"
            className="flex h-12 w-36 shrink-0 items-center justify-center overflow-hidden whitespace-nowrap transition-transform duration-150 hover:scale-[1.02] active:scale-[0.99] cursor-pointer"
          >
            {!logoImgFailed ? (
              <img
                src={BRAND_LOGO_SRC}
                alt="Ascend Anesthesia Seminars"
                onError={() => setLogoImgFailed(true)}
                className="h-36 w-36 max-w-none shrink-0 object-contain"
              />
            ) : (
              <span className="font-display text-lg font-semibold tracking-tight text-[#133C6B]">
                Ascend Anesthesia
              </span>
            )}
          </button>

          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-6 text-sm font-bold text-[#333B47]"
          >
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  data-active={isActive ? 'true' : 'false'}
                  onClick={() => navigateTo(item.id)}
                  className={`nav-link-underline whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#133C6B] cursor-pointer ${
                    isActive ? 'text-[#133C6B]' : ''
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => openEnrollModal('enroll')}
              className="btn-press hidden sm:inline-flex min-h-[40px] items-center justify-center whitespace-nowrap shrink-0 rounded-lg bg-[#133C6B] px-4 py-2 text-xs font-bold text-white hover:bg-[#0A2039] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#41909D] cursor-pointer"
            >
              Enroll Now
            </button>

            <button
              type="button"
              aria-label={
                mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
              }
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="btn-press flex h-10 w-10 items-center justify-center rounded-lg border border-[#E4E7EC] bg-white text-[#133C6B] hover:border-[#41909D]/55 hover:bg-[#EEF3F9] md:hidden cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Slide-Out Mobile Menu Drawer — Paper (#FBFAF7) surface prevents red-on-red logo collision */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-50 flex justify-end bg-[#0A2039]/55 backdrop-blur-xs md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            >
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex h-full w-full max-w-sm flex-col bg-[#FBFAF7] text-[#0A2039] shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex h-16 shrink-0 items-center justify-between border-b border-[#E4E7EC] px-4">
                  <button
                    type="button"
                    onClick={() => navigateTo('course')}
                    aria-label="Ascend Anesthesia Seminars home"
                    className="flex h-12 w-36 shrink-0 items-center justify-center overflow-hidden cursor-pointer"
                  >
                    {!logoImgFailed ? (
                      <img
                        src={BRAND_LOGO_SRC}
                        alt="Ascend Anesthesia Seminars"
                        className="h-36 w-36 max-w-none shrink-0 object-contain"
                      />
                    ) : (
                      <span className="font-display text-lg font-semibold text-[#133C6B]">
                        Ascend Anesthesia
                      </span>
                    )}
                  </button>

                  <button
                    type="button"
                    aria-label="Close navigation menu"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-press flex h-11 w-11 items-center justify-center rounded-lg border border-[#E4E7EC] bg-white text-[#133C6B] hover:bg-[#EEF3F9] cursor-pointer"
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>

                <nav
                  aria-label="Mobile navigation"
                  className="flex-1 overflow-y-auto px-4 py-5"
                >
                  {/* Quick Actions Section */}
                  <div>
                    <p className="px-1 text-[11px] font-bold tracking-wider text-[#357884]">
                      QUICK ACTIONS
                    </p>
                    <div className="mt-2.5 grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => openEnrollModal('brochure')}
                        className="group hover-lift btn-press flex min-h-[68px] flex-col items-start justify-between rounded-xl border border-[#E4E7EC] bg-white p-3.5 text-left hover:bg-[#EEF8F9] cursor-pointer"
                      >
                        <FileText
                          className="h-4 w-4 text-[#357884] transition-transform duration-150 group-hover:scale-110"
                          aria-hidden="true"
                        />
                        <div>
                          <span className="block font-display text-sm font-semibold text-[#133C6B]">
                            Employer Brochure
                          </span>
                          <span className="block text-[11px] text-[#6B7684]">
                            CME Pre-Approval
                          </span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => scrollToCourseSection('savings-calculator')}
                        className="group hover-lift btn-press flex min-h-[68px] flex-col items-start justify-between rounded-xl border border-[#E4E7EC] bg-white p-3.5 text-left hover:bg-[#EEF8F9] cursor-pointer"
                      >
                        <Tag
                          className="h-4 w-4 text-[#C22A2E] transition-transform duration-150 group-hover:scale-110"
                          aria-hidden="true"
                        />
                        <div>
                          <span className="block font-display text-sm font-semibold text-[#133C6B]">
                            Discount Codes
                          </span>
                          <span className="block text-[11px] text-[#6B7684]">
                            Group &amp; Referral
                          </span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => scrollToCourseSection('curriculum')}
                        className="group hover-lift btn-press flex min-h-[68px] flex-col items-start justify-between rounded-xl border border-[#E4E7EC] bg-white p-3.5 text-left hover:bg-[#EEF8F9] cursor-pointer"
                      >
                        <FileCheck2
                          className="h-4 w-4 text-[#133C6B] transition-transform duration-150 group-hover:scale-110"
                          aria-hidden="true"
                        />
                        <div>
                          <span className="block font-display text-sm font-semibold text-[#133C6B]">
                            5-Day Syllabus
                          </span>
                          <span className="block text-[11px] text-[#6B7684]">
                            25.00 MAC Ed CE
                          </span>
                        </div>
                      </button>

                      <a
                        href={`mailto:${COURSE_META.contactEmail}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="group hover-lift btn-press flex min-h-[68px] flex-col items-start justify-between rounded-xl border border-[#E4E7EC] bg-white p-3.5 text-left hover:bg-[#EEF8F9]"
                      >
                        <Mail
                          className="h-4 w-4 text-[#3B635D] transition-transform duration-150 group-hover:scale-110"
                          aria-hidden="true"
                        />
                        <div>
                          <span className="block font-display text-sm font-semibold text-[#133C6B]">
                            Email Ascend
                          </span>
                          <span className="block text-[11px] text-[#6B7684]">
                            Staff Support
                          </span>
                        </div>
                      </a>
                    </div>
                  </div>

                  {/* Primary Pages */}
                  <p className="mt-6 px-1 text-[11px] font-bold tracking-wider text-[#6B7684]">
                    BROWSE PROGRAMS
                  </p>
                  <div className="mt-2 divide-y divide-[#E4E7EC] overflow-hidden rounded-2xl border border-[#E4E7EC] bg-white">
                    {navItems.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => navigateTo(item.id)}
                        className="group flex min-h-[50px] w-full items-center justify-between px-5 text-left font-display text-base font-semibold text-[#133C6B] transition-colors duration-150 hover:bg-[#EEF3F9] cursor-pointer"
                      >
                        <span>{item.label}</span>
                        <ArrowRight
                          className="h-4 w-4 text-[#41909D] transition-transform duration-150 group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </button>
                    ))}
                    <a
                      href={COURSE_META.signInUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileMenuOpen(false)}
                      className="group flex min-h-[50px] items-center justify-between px-5 font-display text-base font-semibold text-[#357884] transition-colors duration-150 hover:bg-[#EEF8F9]"
                    >
                      <span>Student Sign In</span>
                      <ArrowRight
                        className="h-4 w-4 text-[#357884] transition-transform duration-150 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  </div>

                  <div className="mt-6 rounded-2xl border border-[#E4E7EC] bg-[#F6F1E9] p-5">
                    <p className="text-xs font-bold tracking-wider text-[#357884]">
                      PLATINUM PACKAGE · 25.00 AANA CE
                    </p>
                    <p className="mt-1 font-display text-lg font-semibold text-[#133C6B]">
                      Modern Anesthesia Practice + Butterfly iQ+
                    </p>
                    <button
                      type="button"
                      onClick={() => openEnrollModal('enroll')}
                      className="group btn-press mt-4 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-[#C22A2E] px-5 py-3 text-sm font-bold text-white hover:bg-[#BC1A1A] cursor-pointer"
                    >
                      <span>Enroll Now — {COURSE_META.price}</span>
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </nav>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main id="main-content">
        <motion.div
          key={activePage}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        >
        {activePage === 'seminars' && (
          <SeminarsPage
            onSelectPlatinum={() => navigateTo('course')}
            onEnrollPlatinum={() => openEnrollModal('enroll')}
          />
        )}

        {activePage === 'ultrasound' && <UltrasoundPage />}

        {activePage === 'faq' && (
          <FaqPage onContactClick={() => navigateTo('contact')} />
        )}

        {activePage === 'contact' && (
          <ContactPage prefilledMessage={contactPrefill} />
        )}

        {activePage === 'course' && (
          <>
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-[#0A2039] text-white">
              <div className="absolute inset-0">
                {!heroImgFailed ? (
                  <motion.img
                    src={COURSE_META.heroImage}
                    alt="Modern surgical and anesthesia clinical suite"
                    referrerPolicy="no-referrer"
                    onError={() => setHeroImgFailed(true)}
                    initial={{ scale: 1.04, opacity: 0.85 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full w-full object-cover object-center"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-[#0A2039] via-[#133C6B] to-[#357884]" />
                )}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-[#0A2039]/95 via-[#0A2039]/85 to-[#133C6B]/70"
                  aria-hidden="true"
                />
              </div>

              <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
                <div className="max-w-3xl">
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                    className="text-xs font-bold tracking-wider text-[#BFE0E4]"
                  >
                    PLATINUM PACKAGE · AANA CODE {COURSE_META.aanaCode} · EXP{' '}
                    {COURSE_META.expirationDate}
                  </motion.p>

                  <motion.h1
                    ref={heroHeadlineRef}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.28,
                      delay: 0.04,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="mt-4 text-balance font-display text-[clamp(2.15rem,4.2vw,3.5rem)] font-semibold leading-[1.12] tracking-tight text-white"
                  >
                    Modern Anesthesia Practice: Safety, Compliance &amp;
                    Advanced Clinical Care
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.28,
                      delay: 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="mt-5 max-w-2xl text-base leading-relaxed text-[#EEF3F9] sm:text-lg"
                  >
                    A structured five-day continuing education seminar
                    delivering{' '}
                    <strong className="font-bold text-white">
                      25.00 AANA MAC Ed CE credits
                    </strong>{' '}
                    (10.50 Pharmacology &amp; Therapeutics) bundled directly
                    with a{' '}
                    <strong className="font-bold text-white">
                      Butterfly iQ+ handheld ultrasound order
                    </strong>{' '}
                    and employer reimbursement documentation.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.26,
                      delay: 0.12,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-[#BFE0E4]"
                  >
                    <span className="font-num-tabular">25.00 MAC Ed CE</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-num-tabular">
                      10.50 Pharm Credits
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>Butterfly iQ+ Included</span>
                    <span aria-hidden="true">·</span>
                    <span>No Mandatory Post-Test</span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.28,
                      delay: 0.16,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
                  >
                    <button
                      type="button"
                      onClick={() => openEnrollModal('enroll')}
                      className="group btn-press inline-flex min-h-[48px] items-center justify-center gap-2 whitespace-nowrap shrink-0 rounded-lg bg-[#C22A2E] px-6 py-3 text-sm font-bold text-white hover:bg-[#BC1A1A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BFE0E4] cursor-pointer"
                    >
                      <span>Enroll Now — {COURSE_META.price}</span>
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => openEnrollModal('brochure')}
                      className="btn-press inline-flex min-h-[48px] items-center justify-center whitespace-nowrap shrink-0 rounded-lg border border-[#BFE0E4]/45 bg-[#133C6B]/60 px-5 py-3 text-sm font-bold text-white backdrop-blur-xs hover:border-[#BFE0E4]/75 hover:bg-[#1F4A7D]/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white cursor-pointer"
                    >
                      Request Employer CME Brochure
                    </button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.28,
                      delay: 0.2,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#BFE0E4]/90"
                  >
                    <span>
                      Structured 5-day seminar window · Group &amp; referral
                      discounts available
                    </span>
                    <span aria-hidden="true">·</span>
                    <a
                      href="#curriculum"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToCourseSection('curriculum');
                      }}
                      className="font-bold text-white underline decoration-[#41909D] underline-offset-4 transition-colors duration-150 hover:text-[#BFE0E4]"
                    >
                      Explore 5-Day Syllabus
                    </a>
                    <span aria-hidden="true">·</span>
                    <a
                      href="#savings-calculator"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToCourseSection('savings-calculator');
                      }}
                      className="font-bold text-white underline decoration-[#41909D] underline-offset-4 transition-colors duration-150 hover:text-[#BFE0E4]"
                    >
                      Group Pricing Calculator
                    </a>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Accreditation Trust Strip directly under Hero */}
            <AccreditationTrustStrip />

            {/* Full-Width Key Proof Strip */}
            <section
              aria-label="Accreditation and package summary"
              className="border-b border-[#E4E7EC] bg-white"
            >
              <div className="mx-auto grid max-w-6xl grid-cols-2 divide-y divide-[#E4E7EC] sm:grid-cols-4 sm:divide-x sm:divide-y-0 px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="py-5 pr-4 transition-colors duration-150 hover:bg-[#FBFAF7] sm:py-6"
                >
                  <p className="font-num-tabular text-2xl font-semibold text-[#133C6B] sm:text-3xl">
                    25.00
                  </p>
                  <p className="mt-1 text-xs font-semibold text-[#6B7684]">
                    AANA Class A / MAC Ed CE Credits
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.22,
                    delay: 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="py-5 pl-4 transition-colors duration-150 hover:bg-[#FBFAF7] sm:px-6 sm:py-6"
                >
                  <p className="font-num-tabular text-2xl font-semibold text-[#133C6B] sm:text-3xl">
                    10.50
                  </p>
                  <p className="mt-1 text-xs font-semibold text-[#6B7684]">
                    Pharmacology &amp; Therapeutics Credits
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.22,
                    delay: 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="py-5 pr-4 transition-colors duration-150 hover:bg-[#FBFAF7] sm:px-6 sm:py-6"
                >
                  <p className="font-display text-2xl font-semibold text-[#357884] sm:text-3xl">
                    Butterfly iQ+
                  </p>
                  <p className="mt-1 text-xs font-semibold text-[#6B7684]">
                    Order form unlocked in Module 1
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.22,
                    delay: 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="py-5 pl-4 transition-colors duration-150 hover:bg-[#FBFAF7] sm:pl-6 sm:py-6"
                >
                  <p className="font-num-tabular text-2xl font-semibold text-[#133C6B] sm:text-3xl">
                    5 Days
                  </p>
                  <p className="mt-1 text-xs font-semibold text-[#6B7684]">
                    Focused seminar · No post-test
                  </p>
                </motion.div>
              </div>
            </section>

            {/* Section 01: What's Included in the Platinum Package */}
            <section id="included" className="bg-[#FBFAF7] py-20 lg:py-24">
              <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.12 }}
                    transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col justify-between lg:col-span-5"
                  >
                    <div>
                      <p className="text-xs font-bold tracking-wider text-[#357884]">
                        PLATINUM PACKAGE BREAKDOWN
                      </p>
                      <h2 className="mt-2 text-balance font-display text-3xl font-semibold tracking-tight text-[#133C6B] sm:text-4xl">
                        Everything Included in Your {COURSE_META.price}{' '}
                        Enrollment
                      </h2>
                      <p className="mt-3 text-base leading-relaxed text-[#333B47]">
                        Designed for practicing CRNAs combining annual AANA
                        recertification requirements with bedside point-of-care
                        ultrasound capability in one reimbursable package.
                      </p>
                    </div>

                    <div className="group hover-lift mt-8 overflow-hidden rounded-2xl border border-[#E4E7EC] bg-white">
                      <div className="aspect-4/3 w-full overflow-hidden bg-[#EEF8F9]">
                        {!bundleImgFailed ? (
                          <img
                            src={COURSE_META.bundleImage}
                            alt="Handheld point-of-care ultrasound probe alongside a clinical tablet display"
                            referrerPolicy="no-referrer"
                            onError={() => setBundleImgFailed(true)}
                            className="h-full w-full object-cover transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                          />
                        ) : (
                          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#EEF8F9] to-[#EEF3F9] p-6 text-center">
                            <FileCheck2
                              className="h-10 w-10 text-[#357884]"
                              aria-hidden="true"
                            />
                            <p className="mt-3 font-display text-sm font-semibold text-[#133C6B]">
                              Butterfly iQ+ &amp; 25.00 CE Seminar Bundle
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="border-t border-[#E4E7EC] px-5 py-4">
                        <p className="text-sm font-bold text-[#133C6B]">
                          Bundled Device + Accreditation Workflow
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-[#6B7684]">
                          Complete the ButterflyIQ+ Order Form inside Chapter 1
                          immediately after registration; our administrative
                          team coordinates shipment and custom CME brochures.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <div className="flex flex-col justify-between gap-4 lg:col-span-7">
                    {PACKAGE_DELIVERABLES.map((item, idx) => (
                      <motion.div
                        key={item.number}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{
                          duration: 0.22,
                          delay: idx * 0.05,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="group hover-lift rounded-xl border border-[#E4E7EC] bg-white p-6"
                      >
                        <div className="flex items-start gap-4">
                          <span className="font-num-tabular text-base font-semibold text-[#41909D] transition-colors duration-150 group-hover:text-[#133C6B]">
                            {item.number}.
                          </span>
                          <div>
                            <h3 className="font-display text-lg font-semibold text-[#133C6B]">
                              {item.title}
                            </h3>
                            <p className="mt-1.5 text-sm leading-relaxed text-[#333B47]">
                              {item.detail}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Section 02: Interactive 5-Day Curriculum */}
            <CurriculumSection />

            {/* Section 03: Faculty Authority & CRNA Social Proof */}
            <section
              id="faculty"
              className="border-t border-[#E4E7EC] bg-[#F6F1E9] py-20 lg:py-24"
            >
              <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.12 }}
                    transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                    className="lg:col-span-5"
                  >
                    <div className="group hover-lift h-full overflow-hidden rounded-2xl border border-[#E4E7EC] bg-white">
                      <div className="aspect-3/4 w-full overflow-hidden bg-[#EEF3F9] lg:h-[360px] lg:aspect-auto">
                        {!instructorImgFailed ? (
                          <img
                            src={COURSE_META.instructorImage}
                            alt="CRNA clinical educator in dark navy surgical scrubs"
                            referrerPolicy="no-referrer"
                            onError={() => setInstructorImgFailed(true)}
                            className="h-full w-full object-cover object-top transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-[#EEF3F9] p-6 text-sm font-semibold text-[#133C6B]">
                            CRNA Clinical Faculty
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <p className="text-xs font-bold tracking-wider text-[#357884]">
                          100% CRNA-OWNED · TRIPLE CROWN MEMBER
                        </p>
                        <h2 className="mt-1.5 font-display text-2xl font-semibold text-[#133C6B]">
                          Built by CRNAs, Supporting CRNA Advocacy
                        </h2>
                        <p className="mt-2.5 text-sm leading-relaxed text-[#333B47]">
                          Ascend Anesthesia Seminars is 100% owned by CRNAs and
                          provides an expert moderator for clinical discussion
                          with no post-tests. A portion of every registration
                          supports state PACs, the CRNA-PAC, and the AANA
                          Foundation.
                        </p>
                        <p className="mt-3 text-xs font-semibold text-[#6B7684]">
                          AANA Prior Approval Code {COURSE_META.aanaCode} ·
                          Dedicated administrative staff for custom employer
                          brochures
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <div className="flex flex-col justify-between gap-6 lg:col-span-7">
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="text-xs font-bold tracking-wider text-[#357884]">
                        PRACTITIONER FEEDBACK
                      </p>
                      <h2 className="mt-2 text-balance font-display text-3xl font-semibold tracking-tight text-[#133C6B]">
                        Trusted by CRNAs for Recertification &amp; CME
                        Reimbursement
                      </h2>
                    </motion.div>

                    <div className="space-y-4">
                      {TESTIMONIALS.map((item, idx) => (
                        <motion.figure
                          key={item.id}
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.15 }}
                          transition={{
                            duration: 0.22,
                            delay: idx * 0.06,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="hover-lift rounded-xl border border-[#E4E7EC] bg-white p-6"
                        >
                          <blockquote className="text-base leading-relaxed text-[#333B47]">
                            “{item.quote}”
                          </blockquote>
                          <figcaption className="mt-4 flex flex-col gap-1 border-t border-[#E4E7EC] pt-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <p className="text-sm font-bold text-[#133C6B]">
                                {item.author}
                              </p>
                              <p className="text-xs text-[#6B7684]">
                                {item.role} · {item.organization}
                              </p>
                            </div>
                            <p className="font-num-tabular text-xs font-semibold text-[#3B635D]">
                              {item.outcome}
                            </p>
                          </figcaption>
                        </motion.figure>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 04: Group & Referral Savings Calculator */}
            <SavingsCalculator
              onRequestQuote={(summaryText) => {
                setContactPrefill(summaryText);
                navigateTo('contact');
              }}
            />

            {/* Section 05: FAQ & Policy Clarity */}
            <section
              id="faq"
              className="border-t border-[#E4E7EC] bg-white py-20 lg:py-24"
            >
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"
              >
                <div className="text-center">
                  <p className="text-xs font-bold tracking-wider text-[#357884]">
                    FREQUENTLY ASKED QUESTIONS
                  </p>
                  <h2 className="mt-2 text-balance font-display text-3xl font-semibold tracking-tight text-[#133C6B] sm:text-4xl">
                    Clarity on Fulfillment, Discounts &amp; the 5-Day Window
                  </h2>
                </div>

                <div className="mt-10 divide-y divide-[#E4E7EC] overflow-hidden rounded-2xl border border-[#E4E7EC] bg-[#FBFAF7]">
                  {FAQ_ITEMS.slice(0, 6).map((faq) => {
                    const isOpen = openFaqId === faq.id;
                    return (
                      <div key={faq.id}>
                        <button
                          type="button"
                          onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                          aria-expanded={isOpen}
                          className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-150 hover:bg-[#F6F1E9]/85 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#41909D] cursor-pointer"
                        >
                          <span className="font-display text-base font-semibold text-[#0A2039]">
                            {faq.question}
                          </span>
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
                              transition={{
                                duration: 0.16,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                              className="px-6 pb-5 text-sm leading-relaxed text-[#333B47]"
                            >
                              {faq.answer}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 text-center">
                  <button
                    type="button"
                    onClick={() => navigateTo('faq')}
                    className="btn-press text-sm font-bold text-[#357884] underline underline-offset-4 transition-colors hover:text-[#133C6B] cursor-pointer"
                  >
                    View all FAQ &amp; cancellation policies
                  </button>
                </div>
              </motion.div>
            </section>

            {/* Section 05: Closing CTA Band */}
            <section className="border-t border-[#1F4A7D] bg-[#133C6B] py-16 text-white lg:py-20">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8"
              >
                <div className="max-w-2xl">
                  <p className="text-xs font-bold tracking-wider text-[#BFE0E4]">
                    READY TO BEGIN YOUR FIVE-DAY SEMINAR
                  </p>
                  <h2 className="mt-2 text-balance font-display text-3xl font-semibold tracking-tight text-white">
                    Complete 25.00 AANA CE Credits &amp; Claim Your Butterfly
                    iQ+
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#EEF3F9]">
                    Includes immediate access to Module 1 ButterflyIQ+ Order
                    Form, Default &amp; Custom Course Brochures, and AANA credit
                    reporting. Note: structured as a five-day seminar and not
                    eligible for extension.
                  </p>
                </div>

                <div className="flex shrink-0 flex-col gap-3 sm:items-end">
                  <div className="flex items-baseline gap-2">
                    <span className="font-num-tabular text-3xl font-semibold text-white">
                      {COURSE_META.price}
                    </span>
                    <span className="text-xs text-[#BFE0E4]">
                      Platinum Package
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => openEnrollModal('enroll')}
                    className="group btn-press inline-flex min-h-[48px] items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#C22A2E] px-6 py-3 text-sm font-bold text-white hover:bg-[#BC1A1A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BFE0E4] cursor-pointer"
                  >
                    <span>Enroll Now</span>
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </button>

                  <div className="flex items-center gap-1.5 text-xs text-[#BFE0E4]">
                    <ShieldCheck
                      className="h-4 w-4 text-[#BFE0E4]"
                      aria-hidden="true"
                    />
                    <span>
                      AANA Code {COURSE_META.aanaCode} · Exp{' '}
                      {COURSE_META.expirationDate}
                    </span>
                  </div>
                </div>
              </motion.div>
            </section>
          </>
        )}
        </motion.div>

        {/* Email Capture Band for Future Seminar Updates */}
        <SeminarUpdatesForm />
      </main>

      {/* Quiet Footer with extra bottom clearance for StickyEnrollBar */}
      <footer className="border-t border-[#1F4A7D] bg-[#0A2039] pb-24 pt-10 text-[#BFE0E4]">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            {!logoImgFailed ? (
              <div className="flex h-11 w-32 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#FBFAF7] px-2">
                <img
                  src={BRAND_LOGO_SRC}
                  alt="Ascend Anesthesia Seminars"
                  onError={() => setLogoImgFailed(true)}
                  className="h-32 w-32 max-w-none shrink-0 object-contain"
                />
              </div>
            ) : null}
            <div>
              <p className="font-display text-sm font-semibold text-white">
                Ascend Anesthesia Seminars
              </p>
              <p className="mt-0.5 text-xs text-[#BFE0E4]/85">
                100% CRNA-Owned · Triple Crown PAC &amp; AANA Foundation
                Supporter
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs">
            <a
              href={COURSE_META.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-150 hover:text-white hover:underline underline-offset-4"
            >
              ascendanesthesia.com
            </a>
            <a
              href={`mailto:${COURSE_META.contactEmail}`}
              className="transition-colors duration-150 hover:text-white hover:underline underline-offset-4"
            >
              {COURSE_META.contactEmail}
            </a>
            <button
              type="button"
              onClick={() => navigateTo('faq')}
              className="transition-colors duration-150 hover:text-white hover:underline underline-offset-4 cursor-pointer"
            >
              FAQ
            </button>
            <button
              type="button"
              onClick={() => navigateTo('contact')}
              className="transition-colors duration-150 hover:text-white hover:underline underline-offset-4 cursor-pointer"
            >
              Contact Us
            </button>
            <a
              href={COURSE_META.signInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-150 hover:text-white hover:underline underline-offset-4"
            >
              Student Sign In
            </a>
            <button
              type="button"
              onClick={() =>
                window.scrollTo({ top: 0, behavior: getScrollBehavior() })
              }
              className="font-bold text-white/90 transition-colors duration-150 hover:text-white hover:underline underline-offset-4 cursor-pointer"
            >
              Back to top
            </button>
          </div>
        </div>
      </footer>

      {/* Scroll-triggered Sticky Enroll Now Bar (active on Platinum Course view) */}
      <StickyEnrollBar
        visible={activePage === 'course' && showStickyEnroll && !enrollModalOpen}
        onEnrollClick={() => openEnrollModal('enroll')}
      />

      {/* Enrollment & CME Brochure Modal */}
      <EnrollmentModal
        open={enrollModalOpen}
        initialTab={enrollModalTab}
        onClose={() => setEnrollModalOpen(false)}
      />
      </div>
    </MotionConfig>
  );
}
