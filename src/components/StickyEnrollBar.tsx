import { ArrowRight } from 'lucide-react';
import { COURSE_META } from '../data/courseData';

interface StickyEnrollBarProps {
  visible: boolean;
  onEnrollClick: () => void;
}

export function StickyEnrollBar({ visible, onEnrollClick }: StickyEnrollBarProps) {
  return (
    <div
      role="region"
      aria-label="Course enrollment bar"
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-[#1F4A7D] bg-[#0A2039]/95 backdrop-blur-md text-white transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible
          ? 'translate-y-0 opacity-100 pointer-events-auto'
          : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6 lg:px-8">
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-sm font-semibold text-white sm:text-base">
            Modern Anesthesia Practice · Platinum Package
          </p>
          <p className="hidden truncate text-xs text-[#BFE0E4] sm:block">
            25.00 AANA CE Credits (10.50 Pharm) · Butterfly iQ+ Order Included · Code {COURSE_META.aanaCode}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <div className="text-right">
            <span className="font-num-tabular text-sm font-semibold text-white sm:text-base">
              {COURSE_META.price}
            </span>
            <span className="hidden text-xs text-[#BFE0E4]/80 sm:block">
              5-Day Seminar
            </span>
          </div>

          <button
            type="button"
            onClick={onEnrollClick}
            tabIndex={visible ? 0 : -1}
            className="group btn-press inline-flex min-h-[40px] sm:min-h-[44px] items-center justify-center gap-2 whitespace-nowrap shrink-0 rounded-lg bg-[#C22A2E] px-4 py-2 text-sm font-bold text-white hover:bg-[#BC1A1A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BFE0E4] cursor-pointer"
          >
            <span>Enroll Now</span>
            <ArrowRight
              className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
