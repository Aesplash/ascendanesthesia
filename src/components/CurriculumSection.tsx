import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, PlayCircle, X } from 'lucide-react';
import {
  CURRICULUM_CHAPTERS,
  type CurriculumLesson,
} from '../data/courseData';

const DAY_FILTERS = [
  { id: 'all', label: 'All Modules' },
  { id: 'Onboarding', label: 'Onboarding' },
  { id: 'Day 1', label: 'Day 1' },
  { id: 'Day 2', label: 'Day 2' },
  { id: 'Day 3', label: 'Day 3' },
  { id: 'Day 4', label: 'Day 4' },
  { id: 'Day 5', label: 'Day 5' },
  { id: 'Completion', label: 'Assessment' },
];

export function CurriculumSection() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [openChapterIds, setOpenChapterIds] = useState<string[]>([
    'welcome',
    'day-1',
  ]);
  const [previewLesson, setPreviewLesson] = useState<CurriculumLesson | null>(
    null
  );

  const visibleChapters =
    activeFilter === 'all'
      ? CURRICULUM_CHAPTERS
      : CURRICULUM_CHAPTERS.filter((ch) => ch.dayTag === activeFilter);

  const toggleChapter = (id: string) => {
    setOpenChapterIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const allExpanded = visibleChapters.every((ch) =>
    openChapterIds.includes(ch.id)
  );

  const handleToggleAll = () => {
    if (allExpanded) {
      setOpenChapterIds([]);
    } else {
      setOpenChapterIds(visibleChapters.map((ch) => ch.id));
    }
  };

  return (
    <section
      id="curriculum"
      className="border-t border-[#E4E7EC] bg-white py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-wider text-[#357884]">
              FIVE-DAY SEMINAR CURRICULUM
            </p>
            <h2 className="mt-2 text-balance font-display text-3xl font-semibold tracking-tight text-[#133C6B] sm:text-4xl">
              25.00 MAC Ed CE Credits Across 12 Clinical Modules
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#333B47]">
              Every module lists its exact AANA credit allocation, pharmacology
              hours, and estimated completion time—no mandatory post-test required.
            </p>
          </div>

          <button
            type="button"
            onClick={handleToggleAll}
            className="btn-press self-start md:self-auto whitespace-nowrap shrink-0 rounded-lg border border-[#E4E7EC] bg-[#FBFAF7] px-4 py-2 text-xs font-bold text-[#133C6B] hover:border-[#41909D]/55 hover:bg-[#EEF3F9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#41909D] cursor-pointer"
          >
            {allExpanded ? 'Collapse All Chapters' : 'Expand All Chapters'}
          </button>
        </motion.div>

        {/* Interactive Day Filter Controls */}
        <div
          role="tablist"
          aria-label="Filter curriculum by seminar day"
          className="mt-8 flex flex-wrap items-center gap-1.5 rounded-xl border border-[#E4E7EC] bg-[#EEF3F9] p-1.5"
        >
          {DAY_FILTERS.map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setActiveFilter(filter.id);
                  if (filter.id !== 'all') {
                    const match = CURRICULUM_CHAPTERS.find(
                      (c) => c.dayTag === filter.id
                    );
                    if (match && !openChapterIds.includes(match.id)) {
                      setOpenChapterIds((prev) => [...prev, match.id]);
                    }
                  }
                }}
                className={`min-h-[36px] whitespace-nowrap shrink-0 rounded-lg px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#41909D] ${
                  isActive
                    ? 'bg-white text-[#133C6B] shadow-xs'
                    : 'text-[#6B7684] hover:text-[#133C6B]'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Chapters Accordion List */}
        <div className="mt-8 space-y-4">
          {visibleChapters.map((chapter, idx) => {
            const isOpen = openChapterIds.includes(chapter.id);
            return (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.22,
                  delay: Math.min(idx * 0.04, 0.2),
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="overflow-hidden rounded-xl border border-[#E4E7EC] bg-[#FBFAF7] transition-colors duration-150 hover:border-[#41909D]/55"
              >
                <button
                  type="button"
                  onClick={() => toggleChapter(chapter.id)}
                  aria-expanded={isOpen}
                  aria-controls={`chapter-panel-${chapter.id}`}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-[#F6F1E9]/70 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#41909D] cursor-pointer sm:px-6"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-semibold text-[#6B7684]">
                      <span className="font-num-tabular font-semibold text-[#357884]">
                        {chapter.index}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{chapter.dayTag}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-num-tabular">
                        {chapter.totalCredits}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="font-num-tabular">
                        {chapter.lessons.length}{' '}
                        {chapter.lessons.length === 1 ? 'item' : 'items'}
                      </span>
                    </div>
                    <h3 className="mt-1 font-display text-lg font-semibold text-[#0A2039]">
                      {chapter.title}
                    </h3>
                    <p className="mt-0.5 text-sm text-[#333B47]">
                      {chapter.subtitle}
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
                      id={`chapter-panel-${chapter.id}`}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                      className="divide-y divide-[#E4E7EC] border-t border-[#E4E7EC] bg-white"
                    >
                      {chapter.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="flex flex-col gap-3 px-5 py-4 transition-colors duration-150 hover:bg-[#FBFAF7] sm:flex-row sm:items-center sm:justify-between sm:px-6"
                        >
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-[#0A2039]">
                            {lesson.title}
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-[#333B47]">
                            {lesson.summary}
                          </p>
                          <div className="mt-1.5 flex flex-wrap items-center gap-x-2 text-xs text-[#6B7684]">
                            <span>{lesson.format}</span>
                            {lesson.duration && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span className="font-num-tabular">
                                  {lesson.duration}
                                </span>
                              </>
                            )}
                            {lesson.credits && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span className="font-num-tabular font-semibold text-[#357884]">
                                  {lesson.credits}
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        {lesson.previewable && (
                          <button
                            type="button"
                            onClick={() => setPreviewLesson(lesson)}
                            className="btn-press inline-flex min-h-[40px] shrink-0 items-center gap-1.5 self-start sm:self-center whitespace-nowrap rounded-lg border border-[#E4E7EC] bg-[#EEF8F9] px-3.5 py-2 text-xs font-bold text-[#357884] hover:border-[#41909D]/50 hover:bg-[#BFE0E4]/35 hover:text-[#133C6B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#41909D] cursor-pointer"
                          >
                            <PlayCircle
                              className="h-4 w-4 text-[#41909D]"
                              aria-hidden="true"
                            />
                            <span>Preview Syllabus</span>
                          </button>
                        )}
                      </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Syllabus / Sample Lesson Preview Modal */}
      <AnimatePresence>
        {previewLesson && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="preview-modal-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A2039]/65 p-4 backdrop-blur-xs"
            onClick={() => setPreviewLesson(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 6 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-lg rounded-2xl border border-[#E4E7EC] bg-[#FBFAF7] p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-[#357884]">
                  SAMPLE MODULE PREVIEW · {previewLesson.format}
                </p>
                <h3
                  id="preview-modal-title"
                  className="mt-1 font-display text-xl font-semibold text-[#133C6B]"
                >
                  {previewLesson.title}
                </h3>
              </div>
              <button
                type="button"
                aria-label="Close preview"
                onClick={() => setPreviewLesson(null)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[#6B7684] hover:bg-[#EEF3F9] hover:text-[#133C6B] cursor-pointer"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-4 space-y-3 border-t border-[#E4E7EC] pt-4 text-sm leading-relaxed text-[#333B47]">
              <p>{previewLesson.summary}</p>
              <div className="rounded-xl border border-[#E4E7EC] bg-white p-4 text-[#333B47]">
                <p className="font-bold text-[#133C6B]">
                  Included Clinical Learning Objectives
                </p>
                <ul className="mt-2 list-disc space-y-1.5 pl-4 text-sm">
                  <li>
                    Review current AANA-aligned clinical practice standards and
                    perioperative safety checklists.
                  </li>
                  <li>
                    Apply actionable decision trees directly in high-acuity OR
                    and procedural sedation settings.
                  </li>
                  <li>
                    Earn verified MAC Ed CE credit automatically logged upon
                    completing the 5-day seminar and Self-Assessment Form.
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setPreviewLesson(null)}
                className="btn-press min-h-[40px] whitespace-nowrap rounded-lg bg-[#133C6B] px-4 py-2 text-sm font-bold text-white hover:bg-[#0A2039] cursor-pointer"
              >
                Close Preview
              </button>
            </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
