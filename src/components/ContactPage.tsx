import { useEffect, useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Mail, MessageSquare, Users } from 'lucide-react';
import { COURSE_META } from '../data/courseData';

interface ContactPageProps {
  prefilledMessage?: string;
}

export function ContactPage({ prefilledMessage = '' }: ContactPageProps) {
  const [topic, setTopic] = useState('Group Discount Code');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [groupOrReferrer, setGroupOrReferrer] = useState('');
  const [message, setMessage] = useState(prefilledMessage);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (prefilledMessage) {
      setMessage(prefilledMessage);
      setTopic('Group Discount Code');
      setSent(false);
    }
  }, [prefilledMessage]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!message.trim()) {
      setError('Please enter a short message or inquiry.');
      return;
    }
    setError('');
    setSent(true);
  };

  return (
    <div className="bg-[#FBFAF7] py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Clean Direct Contact Info (No low-contrast photo or overlapping chat bubbles) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <p className="text-xs font-bold tracking-wider text-[#357884]">
              ADMINISTRATIVE &amp; MODERATOR SUPPORT
            </p>
            <h1 className="mt-2 text-balance font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.12] tracking-tight text-[#133C6B]">
              Contact Ascend Anesthesia Seminars
            </h1>
            <p className="mt-3 text-base leading-relaxed text-[#333B47]">
              Reach our CRNA-owned administrative staff directly for group
              discount codes, custom employer CME brochures, seminar
              rescheduling, or clinical moderator questions.
            </p>

            <div className="mt-8 space-y-4">
              <div className="hover-lift rounded-xl border border-[#E4E7EC] bg-white p-5">
                <div className="flex items-center gap-2.5 text-[#133C6B]">
                  <Mail className="h-5 w-5 text-[#41909D]" aria-hidden="true" />
                  <h2 className="font-display text-lg font-semibold">
                    Direct Email Support
                  </h2>
                </div>
                <p className="mt-1.5 text-sm text-[#333B47]">
                  For fastest response on registration or course questions:
                </p>
                <a
                  href={`mailto:${COURSE_META.contactEmail}`}
                  className="btn-press mt-3 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[#133C6B] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0A2039]"
                >
                  Email {COURSE_META.contactEmail}
                </a>
              </div>

              <div className="hover-lift rounded-xl border border-[#E4E7EC] bg-[#F6F1E9] p-5">
                <div className="flex items-center gap-2.5 text-[#133C6B]">
                  <Users className="h-5 w-5 text-[#357884]" aria-hidden="true" />
                  <h2 className="font-display text-lg font-semibold">
                    Group &amp; Referral Discounts
                  </h2>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-[#333B47]">
                  Include your group size and anesthesia group name—or the full
                  name of the CRNA colleague who referred you—and we will reply
                  with your coupon code.
                </p>
              </div>

              <div className="hover-lift rounded-xl border border-[#E4E7EC] bg-white p-5">
                <div className="flex items-center gap-2.5 text-[#133C6B]">
                  <MessageSquare
                    className="h-5 w-5 text-[#5B978E]"
                    aria-hidden="true"
                  />
                  <h2 className="font-display text-lg font-semibold">
                    Social &amp; Messenger
                  </h2>
                </div>
                <div className="mt-2 flex flex-wrap gap-4 text-sm font-bold text-[#357884]">
                  <a
                    href="https://www.facebook.com/ascendanesthesia/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-[#133C6B]"
                  >
                    Facebook Messenger
                  </a>
                  <a
                    href="https://www.instagram.com/ascendanesthesia/?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-[#133C6B]"
                  >
                    Instagram (@ascendanesthesia)
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Clean Interactive Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="rounded-2xl border border-[#E4E7EC] bg-white p-6 sm:p-8">
              <h2 className="font-display text-2xl font-semibold text-[#133C6B]">
                Send Us a Direct Message
              </h2>
              <p className="mt-1.5 text-sm text-[#6B7684]">
                No chatbots or overlapping popups—messages route directly to our
                administrative office staff.
              </p>

              {sent ? (
                <div className="mt-6 rounded-xl border border-[#5B978E]/40 bg-[#EEF8F9] p-6">
                  <div className="flex items-center gap-2 text-[#3B635D]">
                    <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                    <h3 className="font-display text-lg font-semibold text-[#133C6B]">
                      Message Prepared for Administrative Staff
                    </h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[#333B47]">
                    Thank you, {name}. Your inquiry regarding{' '}
                    <strong className="font-bold text-[#0A2039]">{topic}</strong>{' '}
                    is ready. For immediate email delivery, you can also click
                    below to open your mail client pre-addressed to{' '}
                    {COURSE_META.contactEmail}.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a
                      href={`mailto:${COURSE_META.contactEmail}?subject=${encodeURIComponent(
                        `[${topic}] Inquiry from ${name}`
                      )}&body=${encodeURIComponent(
                        `${message}\n\nGroup/Referrer: ${groupOrReferrer || 'N/A'}\nReply to: ${email}`
                      )}`}
                      className="btn-press inline-flex min-h-[40px] items-center rounded-lg bg-[#C22A2E] px-4 py-2 text-xs font-bold text-white hover:bg-[#BC1A1A]"
                    >
                      Open in Email App
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setSent(false);
                        setMessage('');
                      }}
                      className="btn-press min-h-[40px] rounded-lg border border-[#E4E7EC] bg-white px-4 py-2 text-xs font-bold text-[#133C6B] hover:bg-[#EEF3F9] cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label
                      htmlFor="contact-topic"
                      className="block text-xs font-bold text-[#133C6B]"
                    >
                      Inquiry Type
                    </label>
                    <select
                      id="contact-topic"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="mt-1.5 w-full rounded-lg border border-[#E4E7EC] bg-[#FBFAF7] px-3.5 py-2.5 text-sm text-[#0A2039] focus:border-[#41909D] focus:bg-white focus:outline-none"
                    >
                      <option>Group Discount Code</option>
                      <option>Referral / Loyalty Discount</option>
                      <option>Custom Course Brochure</option>
                      <option>Reschedule or Cancellation</option>
                      <option>Clinical Content / Moderator Question</option>
                      <option>On-Site Ultrasound Training Estimate</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-bold text-[#133C6B]"
                      >
                        Full Name &amp; Credentials
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Jordan Taylor, CRNA"
                        className="mt-1.5 w-full rounded-lg border border-[#E4E7EC] bg-[#FBFAF7] px-3.5 py-2.5 text-sm text-[#0A2039] focus:border-[#41909D] focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-bold text-[#133C6B]"
                      >
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="mt-1.5 w-full rounded-lg border border-[#E4E7EC] bg-[#FBFAF7] px-3.5 py-2.5 text-sm text-[#0A2039] focus:border-[#41909D] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-extra"
                      className="block text-xs font-bold text-[#133C6B]"
                    >
                      Group Name &amp; Size — or Referring CRNA Name (Optional)
                    </label>
                    <input
                      id="contact-extra"
                      type="text"
                      value={groupOrReferrer}
                      onChange={(e) => setGroupOrReferrer(e.target.value)}
                      placeholder="e.g., 6 CRNAs at Valley Anesthesia, or Referred by..."
                      className="mt-1.5 w-full rounded-lg border border-[#E4E7EC] bg-[#FBFAF7] px-3.5 py-2.5 text-sm text-[#0A2039] focus:border-[#41909D] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-bold text-[#133C6B]"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can our administrative staff or clinical moderator help?"
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
                    Send Message to Ascend
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
