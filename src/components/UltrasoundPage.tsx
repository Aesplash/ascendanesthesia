import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, MapPin, Stethoscope } from 'lucide-react';
import { COURSE_META, POCUS_EXAMS, ULTRASOUND_CAPABILITIES } from '../data/courseData';

export function UltrasoundPage() {
  const [institution, setInstitution] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [groupSize, setGroupSize] = useState('5–12 Clinicians');
  const [focusArea, setFocusArea] = useState('PoCUS + Regional Anesthesia');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!institution.trim() || !contactName.trim()) {
      setError('Please enter your institution name and primary contact.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address for your free estimate.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FBFAF7]">
      {/* Page Hero */}
      <section className="border-b border-[#E4E7EC] bg-[#133C6B] py-16 text-white lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <p className="text-xs font-bold tracking-wider text-[#BFE0E4]">
              ON-SITE INSTITUTIONAL TRAINING · LED BY INDEPENDENT CRNAs
            </p>
            <h1 className="mt-3 text-balance font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.12] tracking-tight text-white">
              On-Site Ultrasound &amp; Perioperative POCUS Courses
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#EEF3F9] sm:text-lg">
              Ascend Anesthesia Seminars brings expert independent CRNA
              instructors directly to your hospital, anesthesia group,
              conference, or training program for one-on-one hands-on ultrasound
              training.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-[#BFE0E4]">
              <span>PoCUS &amp; Regional Anesthesia</span>
              <span aria-hidden="true">·</span>
              <span>Acute Pain Program Consulting</span>
              <span aria-hidden="true">·</span>
              <span>Billing Education</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Six Institutional Training Pillars */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-wider text-[#357884]">
              CUSTOMIZED INSTITUTIONAL PROGRAMS
            </p>
            <h2 className="mt-2 text-balance font-display text-3xl font-semibold tracking-tight text-[#133C6B]">
              On-Site Training Tailored to Your Department
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#333B47]">
              Designed for small groups, nurse anesthesia programs, and
              hospital departments. Course costs vary based on location and
              custom curriculum development.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {ULTRASOUND_CAPABILITIES.map((cap, idx) => (
              <motion.div
                key={cap.number}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.22,
                  delay: idx * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="hover-lift rounded-xl border border-[#E4E7EC] bg-white p-6"
              >
                <span className="font-num-tabular text-sm font-semibold text-[#41909D]">
                  {cap.number}.
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold text-[#133C6B]">
                  {cap.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#333B47]">
                  {cap.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* POCUS Perioperative Examinations + Estimate Request Form */}
      <section className="border-t border-[#E4E7EC] bg-[#F6F1E9] py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left: What is POCUS + 10 Exams */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6"
            >
              <p className="text-xs font-bold tracking-wider text-[#357884]">
                PERIOPERATIVE DIAGNOSTIC &amp; PROCEDURAL GUIDANCE
              </p>
              <h2 className="mt-2 text-balance font-display text-3xl font-semibold tracking-tight text-[#133C6B]">
                What Is Point of Care Ultrasound (POCUS)?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#333B47]">
                Point of Care Ultrasound (POCUS) is a diagnostic or procedural
                guidance ultrasound performed by a clinician during a patient
                encounter to guide evaluation and management. Knowing both how
                to acquire views and what to do clinically with the findings is
                essential to turning ultrasound into a dependable perioperative
                tool.
              </p>

              <div className="mt-6 rounded-2xl border border-[#E4E7EC] bg-white p-6">
                <div className="flex items-center gap-2 text-[#133C6B]">
                  <Stethoscope className="h-5 w-5 text-[#41909D]" aria-hidden="true" />
                  <h3 className="font-display text-lg font-semibold">
                    10 Perioperative POCUS Examinations Covered
                  </h3>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                  {POCUS_EXAMS.map((exam, idx) => (
                    <div
                      key={exam}
                      className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-[#333B47] transition-colors duration-150 hover:bg-[#EEF8F9]"
                    >
                      <span className="font-num-tabular text-xs font-semibold text-[#357884]">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="font-medium">{exam}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: Free Institutional Estimate Form */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{
                duration: 0.24,
                delay: 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="lg:col-span-6"
            >
              <div className="rounded-2xl border border-[#E4E7EC] bg-white p-6 sm:p-8">
                <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#357884]">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  <span>FREE INSTITUTIONAL ESTIMATE</span>
                </div>
                <h3 className="mt-2 font-display text-2xl font-semibold text-[#133C6B]">
                  Request On-Site Training Proposal
                </h3>
                <p className="mt-1.5 text-sm text-[#6B7684]">
                  Share your facility location and training goals—our team will
                  reply with instructor availability and a custom quote.
                </p>

                {submitted ? (
                  <div className="mt-6 rounded-xl border border-[#5B978E]/40 bg-[#EEF8F9] p-5">
                    <div className="flex items-center gap-2 text-[#3B635D]">
                      <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                      <h4 className="font-display text-lg font-semibold text-[#133C6B]">
                        Estimate Request Prepared
                      </h4>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[#333B47]">
                      Thank you, {contactName}. Your request for{' '}
                      <strong className="font-bold text-[#0A2039]">
                        {institution}
                      </strong>{' '}
                      ({focusArea}, {groupSize}) is ready to send directly to{' '}
                      {COURSE_META.contactEmail}.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <a
                        href={`mailto:${COURSE_META.contactEmail}?subject=${encodeURIComponent(
                          `On-Site Ultrasound Estimate Request: ${institution}`
                        )}&body=${encodeURIComponent(
                          `Institution / Group: ${institution}\nContact: ${contactName}\nWork Email: ${email}\nEstimated Participants: ${groupSize}\nTraining Focus: ${focusArea}\nLocation & Target Dates: ${notes || 'Flexible'}`
                        )}`}
                        className="btn-press inline-flex min-h-[40px] items-center rounded-lg bg-[#C22A2E] px-4 py-2 text-xs font-bold text-white hover:bg-[#BC1A1A]"
                      >
                        Send Proposal via Email App
                      </a>
                      <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="btn-press min-h-[40px] rounded-lg border border-[#E4E7EC] bg-white px-4 py-2 text-xs font-bold text-[#133C6B] hover:bg-[#EEF3F9] cursor-pointer"
                      >
                        Submit Another Request
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="us-institution"
                          className="block text-xs font-bold text-[#133C6B]"
                        >
                          Hospital / School / Group
                        </label>
                        <input
                          id="us-institution"
                          type="text"
                          value={institution}
                          onChange={(e) => setInstitution(e.target.value)}
                          placeholder="e.g., St. Jude Anesthesia Group"
                          className="mt-1.5 w-full rounded-lg border border-[#E4E7EC] bg-[#FBFAF7] px-3.5 py-2.5 text-sm text-[#0A2039] focus:border-[#41909D] focus:bg-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="us-name"
                          className="block text-xs font-bold text-[#133C6B]"
                        >
                          Your Name &amp; Title
                        </label>
                        <input
                          id="us-name"
                          type="text"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="e.g., Alex Morgan, CRNA"
                          className="mt-1.5 w-full rounded-lg border border-[#E4E7EC] bg-[#FBFAF7] px-3.5 py-2.5 text-sm text-[#0A2039] focus:border-[#41909D] focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="us-email"
                          className="block text-xs font-bold text-[#133C6B]"
                        >
                          Work Email
                        </label>
                        <input
                          id="us-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="coordinator@facility.org"
                          className="mt-1.5 w-full rounded-lg border border-[#E4E7EC] bg-[#FBFAF7] px-3.5 py-2.5 text-sm text-[#0A2039] focus:border-[#41909D] focus:bg-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="us-size"
                          className="block text-xs font-bold text-[#133C6B]"
                        >
                          Estimated Participants
                        </label>
                        <select
                          id="us-size"
                          value={groupSize}
                          onChange={(e) => setGroupSize(e.target.value)}
                          className="mt-1.5 w-full rounded-lg border border-[#E4E7EC] bg-[#FBFAF7] px-3.5 py-2.5 text-sm text-[#0A2039] focus:border-[#41909D] focus:bg-white focus:outline-none"
                        >
                          <option>1–4 Clinicians (Small Group)</option>
                          <option>5–12 Clinicians</option>
                          <option>13–25 Clinicians / Cohort</option>
                          <option>25+ Conference / Program</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="us-focus"
                        className="block text-xs font-bold text-[#133C6B]"
                      >
                        Training Focus
                      </label>
                      <select
                        id="us-focus"
                        value={focusArea}
                        onChange={(e) => setFocusArea(e.target.value)}
                        className="mt-1.5 w-full rounded-lg border border-[#E4E7EC] bg-[#FBFAF7] px-3.5 py-2.5 text-sm text-[#0A2039] focus:border-[#41909D] focus:bg-white focus:outline-none"
                      >
                        <option>PoCUS + Regional Anesthesia</option>
                        <option>Point of Care Ultrasound (PoCUS) Only</option>
                        <option>Continuous Peripheral Nerve Blocks</option>
                        <option>Acute Pain Program &amp; Billing Consultation</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="us-notes"
                        className="block text-xs font-bold text-[#133C6B]"
                      >
                        City/State &amp; Target Dates (Optional)
                      </label>
                      <textarea
                        id="us-notes"
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Share preferred months or specific exams needed..."
                        className="mt-1.5 w-full rounded-lg border border-[#E4E7EC] bg-[#FBFAF7] px-3.5 py-2.5 text-sm text-[#0A2039] focus:border-[#41909D] focus:bg-white focus:outline-none"
                      />
                    </div>

                    {error && (
                      <p
                        role="alert"
                        className="rounded-lg bg-[#FBE0E0] px-3 py-2 text-xs font-bold text-[#BC1A1A]"
                      >
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      className="btn-press min-h-[48px] w-full rounded-lg bg-[#C22A2E] px-5 py-3 text-sm font-bold text-white hover:bg-[#BC1A1A] cursor-pointer"
                    >
                      Request Free Estimate
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
