import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Clock } from 'lucide-react';

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  cutoffLabel: string;
}

function getNextEnrollmentDeadline(now: Date): Date {
  const target = new Date(now);
  const day = target.getDay();
  const daysUntilSunday = day === 0 ? 0 : 7 - day;
  target.setDate(target.getDate() + daysUntilSunday);
  target.setHours(23, 59, 59, 999);

  if (target.getTime() - now.getTime() < 12 * 60 * 60 * 1000) {
    target.setDate(target.getDate() + 7);
  }

  return target;
}

function calculateRemaining(): TimeRemaining {
  const now = new Date();
  const deadline = getNextEnrollmentDeadline(now);
  const diffMs = Math.max(0, deadline.getTime() - now.getTime());

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const cutoffLabel = deadline.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return { days, hours, minutes, seconds, cutoffLabel };
}

function padTwo(value: number): string {
  return String(value).padStart(2, '0');
}

export function EnrollmentCountdown() {
  const [remaining, setRemaining] = useState<TimeRemaining>(() =>
    calculateRemaining()
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemaining(calculateRemaining());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const units = [
    { label: 'Days', value: padTwo(remaining.days) },
    { label: 'Hours', value: padTwo(remaining.hours) },
    { label: 'Min', value: padTwo(remaining.minutes) },
    { label: 'Sec', value: padTwo(remaining.seconds) },
  ];

  return (
    <motion.aside
      aria-label="Upcoming seminar cycle enrollment countdown"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className="hover-lift-dark rounded-2xl border border-[#BFE0E4]/25 bg-[#0A2039]/85 p-5 text-white backdrop-blur-md"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#BFE0E4]">
          <Clock className="h-4 w-4 text-[#41909D]" aria-hidden="true" />
          <span>ENROLLMENT ENDS</span>
        </div>
        <span className="text-xs font-semibold text-[#EEF3F9]">
          Closes {remaining.cutoffLabel} · 11:59 PM
        </span>
      </div>

      <div
        role="timer"
        aria-live="off"
        className="mt-4 grid grid-cols-4 divide-x divide-[#BFE0E4]/20 border-y border-[#BFE0E4]/20 py-3.5 text-center"
      >
        {units.map((unit) => (
          <div key={unit.label} className="px-2">
            <p className="font-num-tabular text-2xl font-semibold leading-none tracking-tight text-white sm:text-3xl">
              {unit.value}
            </p>
            <p className="mt-1.5 text-[11px] font-semibold tracking-wide text-[#BFE0E4]/90">
              {unit.label}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs leading-relaxed text-[#BFE0E4]/90">
        Upcoming 5-day seminar cycle · Butterfly iQ+ order form unlocks in
        Module 1 immediately after registration.
      </p>
    </motion.aside>
  );
}
