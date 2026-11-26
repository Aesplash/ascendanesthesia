import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Mail } from 'lucide-react';

export function SeminarUpdatesForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [subscribedEmail, setSubscribedEmail] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Please enter a valid email address to receive seminar updates.');
      return;
    }

    setError('');
    setSubscribedEmail(trimmed);
    setEmail('');
  };

  return (
    <section
      id="seminar-updates"
      aria-labelledby="seminar-updates-heading"
      className="border-t border-[#E4E7EC] bg-[#F6F1E9] py-14"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="hover-lift flex flex-col justify-between gap-6 rounded-2xl border border-[#E4E7EC] bg-white p-6 sm:p-8 lg:flex-row lg:items-center lg:gap-10"
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#357884]">
              <Mail className="h-4 w-4" aria-hidden="true" />
              <span>FUTURE SEMINAR UPDATES</span>
            </div>
            <h2
              id="seminar-updates-heading"
              className="mt-1.5 font-display text-2xl font-semibold tracking-tight text-[#133C6B]"
            >
              Get Notified on New AANA Seminars &amp; Live POCUS Dates
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-[#333B47]">
              Receive early announcements for new MAC Ed CE courses, destination
              conferences, and CRNA group discounts—no spam.
            </p>
          </div>

          <div className="w-full max-w-md shrink-0">
            {subscribedEmail ? (
              <motion.div
                role="status"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-2 rounded-xl border border-[#5B978E]/40 bg-[#EEF8F9] p-4"
              >
                <div className="flex items-center gap-2 text-[#3B635D]">
                  <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
                  <p className="font-display text-sm font-semibold text-[#133C6B]">
                    Subscribed for Future Seminar Updates
                  </p>
                </div>
                <p className="text-xs leading-relaxed text-[#333B47]">
                  We added{' '}
                  <span className="font-bold text-[#0A2039]">
                    {subscribedEmail}
                  </span>{' '}
                  to our CRNA seminar announcement list.
                </p>
                <button
                  type="button"
                  onClick={() => setSubscribedEmail('')}
                  className="self-start text-xs font-bold text-[#357884] underline underline-offset-2 hover:text-[#133C6B] cursor-pointer"
                >
                  Add another email address
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <label
                  htmlFor="seminar-updates-email"
                  className="block text-xs font-bold text-[#133C6B]"
                >
                  Email Address
                </label>
                <div className="mt-1.5 flex flex-col gap-2.5 sm:flex-row sm:items-stretch">
                  <input
                    id="seminar-updates-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="crna@practicegroup.org"
                    autoComplete="email"
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? 'seminar-updates-error' : undefined}
                    className="min-h-[44px] flex-1 rounded-lg border border-[#E4E7EC] bg-[#FBFAF7] px-3.5 py-2.5 text-sm text-[#0A2039] placeholder:text-[#6B7684] focus:border-[#41909D] focus:bg-white focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="btn-press min-h-[44px] whitespace-nowrap shrink-0 rounded-lg bg-[#133C6B] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0A2039] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#41909D] cursor-pointer"
                  >
                    Notify Me
                  </button>
                </div>
                {error && (
                  <p
                    id="seminar-updates-error"
                    role="alert"
                    className="mt-2 rounded-lg bg-[#FBE0E0] px-3 py-1.5 text-xs font-bold text-[#BC1A1A]"
                  >
                    {error}
                  </p>
                )}
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
