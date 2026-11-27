import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Calculator, Minus, Plus } from 'lucide-react';

interface PackageTierOption {
  id: string;
  name: string;
  unitPrice: number;
  subtitle: string;
}

const PACKAGE_OPTIONS: PackageTierOption[] = [
  {
    id: 'platinum',
    name: 'Platinum Package',
    unitPrice: 3899.99,
    subtitle: '25.00 CE + Butterfly iQ+ Order',
  },
  {
    id: 'gold',
    name: 'Gold Package',
    unitPrice: 1349.99,
    subtitle: '25.00 CE + Gold Tier Bundle',
  },
  {
    id: 'silver',
    name: 'Silver Package',
    unitPrice: 1099.99,
    subtitle: '25.00 CE + Silver Tier Bundle',
  },
  {
    id: 'basic',
    name: 'Basic Package',
    unitPrice: 499.99,
    subtitle: '25.00 CE Seminar Only',
  },
];

type DiscountProgram = 'referral' | 'group' | 'custom';

interface SavingsCalculatorProps {
  onRequestQuote: (summaryText: string) => void;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function SavingsCalculator({ onRequestQuote }: SavingsCalculatorProps) {
  const [selectedTierId, setSelectedTierId] = useState<string>('platinum');
  const [seats, setSeats] = useState<number>(5);
  const [program, setProgram] = useState<DiscountProgram>('group');
  const [customRate, setCustomRate] = useState<number>(15);

  const selectedTier =
    PACKAGE_OPTIONS.find((t) => t.id === selectedTierId) ?? PACKAGE_OPTIONS[0];

  const suggestedGroupRate = useMemo(() => {
    if (seats >= 10) return 20;
    if (seats >= 5) return 15;
    if (seats >= 2) return 10;
    return 0;
  }, [seats]);

  const effectiveDiscountPercent = useMemo(() => {
    if (program === 'referral') return 10;
    if (program === 'group') return suggestedGroupRate;
    return customRate;
  }, [program, suggestedGroupRate, customRate]);

  const retailSubtotal = selectedTier.unitPrice * seats;
  const estimatedSavings = retailSubtotal * (effectiveDiscountPercent / 100);
  const estimatedTotal = retailSubtotal - estimatedSavings;
  const costPerCrna = seats > 0 ? estimatedTotal / seats : selectedTier.unitPrice;
  const totalCeCredits = seats * 25;

  const handleSeatChange = (next: number) => {
    const clamped = Math.max(1, Math.min(50, Math.round(next)));
    setSeats(clamped);
    if (clamped === 1 && program === 'group') {
      setProgram('referral');
    }
  };

  const handleRequestQuote = () => {
    const programLabel =
      program === 'group'
        ? `Group Discount (~${effectiveDiscountPercent}% est.)`
        : program === 'referral'
          ? `Referral / Loyalty Discount (~${effectiveDiscountPercent}% est.)`
          : `Custom Rate (${effectiveDiscountPercent}% est.)`;

    const summary = `Requesting an official coupon code for ${seats} CRNA${
      seats > 1 ? 's' : ''
    } on the ${selectedTier.name} (${formatCurrency(
      selectedTier.unitPrice
    )}/seat) under ${programLabel}. Estimated total shown: ${formatCurrency(
      estimatedTotal
    )}.`;

    onRequestQuote(summary);
  };

  return (
    <section
      id="savings-calculator"
      className="border-t border-[#E4E7EC] bg-[#FBFAF7] py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <p className="text-xs font-bold tracking-wider text-[#357884]">
            GROUP &amp; REFERRAL SAVINGS ESTIMATOR
          </p>
          <h2 className="mt-2 text-balance font-display text-3xl font-semibold tracking-tight text-[#133C6B] sm:text-4xl">
            Estimate Team Pricing &amp; Coupon Savings
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#333B47]">
            Planning registration for an anesthesia department, practice group,
            or colleague referral? Preview estimated savings across seminar
            tiers before requesting your official Thinkific discount code.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          {/* Left Controls Card */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-[#E4E7EC] bg-white p-6 sm:p-8 lg:col-span-7"
          >
            {/* Step 1: Seminar Package */}
            <div>
              <span className="text-xs font-bold tracking-wider text-[#133C6B]">
                01. SELECT SEMINAR PACKAGE
              </span>
              <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {PACKAGE_OPTIONS.map((tier) => {
                  const active = tier.id === selectedTierId;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setSelectedTierId(tier.id)}
                      className={`hover-lift btn-press flex flex-col items-start rounded-xl border p-3.5 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#41909D] ${
                        active
                          ? 'border-[#133C6B] bg-[#EEF3F9]'
                          : 'border-[#E4E7EC] bg-[#FBFAF7] hover:bg-[#F6F1E9]/70'
                      }`}
                    >
                      <div className="flex w-full items-baseline justify-between gap-2">
                        <span className="font-display text-sm font-semibold text-[#133C6B]">
                          {tier.name}
                        </span>
                        <span className="font-num-tabular text-sm font-semibold text-[#0A2039]">
                          {formatCurrency(tier.unitPrice)}
                        </span>
                      </div>
                      <span className="mt-1 text-xs text-[#6B7684]">
                        {tier.subtitle}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Number of Clinicians */}
            <div className="mt-7 border-t border-[#E4E7EC] pt-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <label
                    htmlFor="calc-seats-input"
                    className="text-xs font-bold tracking-wider text-[#133C6B]"
                  >
                    02. NUMBER OF CLINICIANS (CRNAs)
                  </label>
                  <p className="mt-0.5 text-xs text-[#6B7684]">
                    Group rates scale for 2+, 5+, and 10+ registrations
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Decrease clinicians"
                    onClick={() => handleSeatChange(seats - 1)}
                    disabled={seats <= 1}
                    className="btn-press flex h-10 w-10 items-center justify-center rounded-lg border border-[#E4E7EC] bg-[#FBFAF7] text-[#133C6B] hover:bg-[#EEF3F9] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                  >
                    <Minus className="h-4 w-4" aria-hidden="true" />
                  </button>

                  <input
                    id="calc-seats-input"
                    type="number"
                    min={1}
                    max={50}
                    value={seats}
                    onChange={(e) =>
                      handleSeatChange(Number(e.target.value) || 1)
                    }
                    className="h-10 w-16 rounded-lg border border-[#E4E7EC] bg-white text-center font-num-tabular text-base font-semibold text-[#0A2039] focus:border-[#41909D] focus:outline-none"
                  />

                  <button
                    type="button"
                    aria-label="Increase clinicians"
                    onClick={() => handleSeatChange(seats + 1)}
                    disabled={seats >= 50}
                    className="btn-press flex h-10 w-10 items-center justify-center rounded-lg border border-[#E4E7EC] bg-[#FBFAF7] text-[#133C6B] hover:bg-[#EEF3F9] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {[3, 5, 10, 20].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => handleSeatChange(preset)}
                    className={`btn-press min-h-[34px] whitespace-nowrap shrink-0 rounded-lg border px-3 py-1 text-xs font-bold cursor-pointer ${
                      seats === preset
                        ? 'border-[#133C6B] bg-[#133C6B] text-white'
                        : 'border-[#E4E7EC] bg-[#FBFAF7] text-[#333B47] hover:bg-[#EEF3F9]'
                    }`}
                  >
                    {preset} Clinicians
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Discount Program */}
            <div className="mt-7 border-t border-[#E4E7EC] pt-6">
              <span className="text-xs font-bold tracking-wider text-[#133C6B]">
                03. DISCOUNT TYPE
              </span>

              <div
                role="tablist"
                aria-label="Select discount program"
                className="mt-3 grid grid-cols-1 gap-1.5 rounded-xl border border-[#E4E7EC] bg-[#EEF3F9] p-1.5 sm:grid-cols-3"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={program === 'group'}
                  onClick={() => {
                    setProgram('group');
                    if (seats < 2) setSeats(2);
                  }}
                  className={`min-h-[38px] whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
                    program === 'group'
                      ? 'bg-white text-[#133C6B] shadow-xs'
                      : 'text-[#6B7684] hover:text-[#133C6B]'
                  }`}
                >
                  Group Tier ({suggestedGroupRate}%)
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={program === 'referral'}
                  onClick={() => setProgram('referral')}
                  className={`min-h-[38px] whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
                    program === 'referral'
                      ? 'bg-white text-[#133C6B] shadow-xs'
                      : 'text-[#6B7684] hover:text-[#133C6B]'
                  }`}
                >
                  Referral / Loyalty (10%)
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={program === 'custom'}
                  onClick={() => setProgram('custom')}
                  className={`min-h-[38px] whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
                    program === 'custom'
                      ? 'bg-white text-[#133C6B] shadow-xs'
                      : 'text-[#6B7684] hover:text-[#133C6B]'
                  }`}
                >
                  Custom Quote %
                </button>
              </div>

              <AnimatePresence initial={false}>
                {program === 'custom' && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-4 rounded-xl border border-[#E4E7EC] bg-[#FBFAF7] p-4"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-[#133C6B]">
                      <label htmlFor="custom-discount-range">
                        Adjust Estimated Coupon Percentage
                      </label>
                      <span className="font-num-tabular text-sm text-[#357884]">
                        {customRate}%
                      </span>
                    </div>
                    <input
                      id="custom-discount-range"
                      type="range"
                      min={0}
                      max={25}
                      step={1}
                      value={customRate}
                      onChange={(e) => setCustomRate(Number(e.target.value))}
                      className="mt-2 w-full accent-[#133C6B] cursor-pointer"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right Live Breakdown Card */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              duration: 0.24,
              delay: 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="hover-lift-dark flex flex-col justify-between rounded-2xl border border-[#133C6B] bg-[#0A2039] p-6 text-white sm:p-8 lg:col-span-5"
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#BFE0E4]">
                <Calculator className="h-4 w-4" aria-hidden="true" />
                <span>ESTIMATED ORDER SUMMARY</span>
              </div>

              <h3 className="mt-2 font-display text-2xl font-semibold text-white">
                {selectedTier.name} × {seats}{' '}
                {seats === 1 ? 'CRNA' : 'CRNAs'}
              </h3>

              <dl className="mt-6 space-y-3.5 border-t border-[#1F4A7D] pt-5 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-[#BFE0E4]">Standard Retail Subtotal</dt>
                  <dd className="font-num-tabular font-semibold text-white">
                    {formatCurrency(retailSubtotal)}
                  </dd>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <dt className="text-[#BFE0E4]">
                    Estimated Discount ({effectiveDiscountPercent}%)
                  </dt>
                  <dd className="font-num-tabular font-semibold text-[#BFE0E4]">
                    −{formatCurrency(estimatedSavings)}
                  </dd>
                </div>

                <div className="flex items-center justify-between gap-4 border-t border-[#1F4A7D] pt-3.5">
                  <dt className="font-bold text-white">
                    Estimated Group Total
                  </dt>
                  <dd className="font-num-tabular text-3xl font-semibold text-white">
                    {formatCurrency(estimatedTotal)}
                  </dd>
                </div>

                <div className="flex items-center justify-between gap-4 text-xs">
                  <dt className="text-[#BFE0E4]/90">
                    Effective Cost per Clinician
                  </dt>
                  <dd className="font-num-tabular font-semibold text-[#BFE0E4]">
                    {formatCurrency(costPerCrna)} / CRNA
                  </dd>
                </div>

                <div className="flex items-center justify-between gap-4 text-xs">
                  <dt className="text-[#BFE0E4]/90">
                    Total Team AANA CE Credits
                  </dt>
                  <dd className="font-num-tabular font-semibold text-[#BFE0E4]">
                    {totalCeCredits.toFixed(2)} MAC Ed CE
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-8 space-y-3">
              <button
                type="button"
                onClick={handleRequestQuote}
                className="group btn-press flex min-h-[48px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#C22A2E] px-5 py-3 text-sm font-bold text-white hover:bg-[#BC1A1A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BFE0E4] cursor-pointer"
              >
                <span>Request Official Coupon Code</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </button>

              <p className="text-[11px] leading-relaxed text-[#BFE0E4]/85">
                Estimates illustrate potential group, loyalty, and referral
                savings. Final coupon codes are issued by Ascend administrative
                staff based on group size and tier.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
