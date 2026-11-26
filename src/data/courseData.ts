export interface CurriculumLesson {
  id: string;
  title: string;
  format: 'Order Form' | 'Clinical Lecture' | 'Guide' | 'PDF Brochure' | 'Assessment';
  credits?: string;
  duration?: string;
  previewable?: boolean;
  summary: string;
}

export interface CurriculumChapter {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  dayTag: string;
  totalCredits: string;
  lessons: CurriculumLesson[];
}

export interface FaqItem {
  id: string;
  category: 'Accreditation & Format' | 'Discounts & Pricing' | 'Policies & Fulfillment';
  question: string;
  answer: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  organization: string;
  outcome: string;
}

export const COURSE_META = {
  brand: 'Ascend Anesthesia Seminars',
  title: 'Modern Anesthesia Practice: Safety, Compliance & Advanced Clinical Care',
  tier: 'Platinum Package',
  price: '$3,899.99',
  totalCredits: '25.00 MAC Ed CE Credits',
  pharmCredits: '10.50 Pharmacology & Therapeutics Credits',
  aanaCode: '1046673',
  expirationDate: '2/11/2027',
  contactEmail: 'contact@ascendanesthesia.com',
  websiteUrl: 'https://www.ascendanesthesia.com/',
  enrollUrl: 'https://ascendanesthesia.thinkific.com/enroll/3688173',
  signInUrl: 'https://ascendanesthesia.thinkific.com/users/sign_in',
  collectionsUrl: 'https://ascendanesthesia.thinkific.com/collections',
  heroImage: '/src/assets/images/hero_anesthesia_or_1795618790660.jpg',
  bundleImage: '/src/assets/images/butterfly_ultrasound_bundle_1795618789937.jpg',
  instructorImage: '/src/assets/images/crna_instructor_portrait_1795618791269.jpg',
};

export const PACKAGE_DELIVERABLES = [
  {
    number: '01',
    title: 'Butterfly iQ+ Handheld Ultrasound Order Included',
    detail:
      'Complete your Butterfly iQ+ hardware fulfillment form directly inside Module 1 immediately after enrollment—bringing point-of-care ultrasound directly to your clinical practice.',
  },
  {
    number: '02',
    title: '25.00 AANA Class A Credits (10.50 Pharmacology)',
    detail:
      'Prior approved by the American Association of Nurse Anesthesiology (Code 1046673, valid through 2/11/2027) with an expert moderator available for clinical discussion and content questions.',
  },
  {
    number: '03',
    title: 'Custom Employer CME Brochure & Certificate Delivery',
    detail:
      'Access default and custom seminar brochures post-enrollment, backed by administrative office staff, with certificates sent via email upon seminar and self-assessment completion.',
  },
  {
    number: '04',
    title: 'No Post-Tests & Triple Crown CRNA Advocacy',
    detail:
      '100% owned by CRNAs with zero mandatory post-tests. A portion of every registration is donated to state PACs, the CRNA-PAC, and the AANA Foundation.',
  },
];

export const CURRICULUM_CHAPTERS: CurriculumChapter[] = [
  {
    id: 'welcome',
    index: '01',
    title: 'Welcome & Platinum Fulfillment',
    subtitle: 'Device order intake, course instructions, and employer documentation',
    dayTag: 'Onboarding',
    totalCredits: 'Orientation',
    lessons: [
      {
        id: 'butterfly-form',
        title: 'ButterflyIQ+ Order Form',
        format: 'Order Form',
        duration: '5 min',
        summary:
          'Submit your clinical shipping address and device preferences to initiate fulfillment of your bundled Butterfly iQ+ probe.',
      },
      {
        id: 'welcome-instructions',
        title: 'Welcome & Instructions',
        format: 'Guide',
        duration: '5 min',
        previewable: true,
        summary:
          'Overview of your 5-day seminar timeline, AANA credit reporting workflow, and direct contact details for our administrative team.',
      },
      {
        id: 'default-brochure',
        title: 'Default Course Brochure',
        format: 'PDF Brochure',
        duration: 'Download',
        summary:
          'Standardized AANA-coded syllabus and accreditation letter ready for employer CME submission.',
      },
      {
        id: 'custom-brochure',
        title: 'Custom Course Brochure',
        format: 'Guide',
        duration: 'On Request',
        summary:
          'Request customized seminar date formatting or employer-specific details handled by Ascend administrative office staff.',
      },
      {
        id: 'how-to-use',
        title: 'How to Use This Course',
        format: 'Guide',
        duration: '4 min',
        summary:
          'Step-by-step walkthrough of module navigation, video playback, and completion tracking.',
      },
    ],
  },
  {
    id: 'day-1',
    index: '02',
    title: 'Day 1: Cardiac Devices & Precision Fluid Therapy',
    subtitle: 'Perioperative CIED protocols and goal-directed hemodynamic management',
    dayTag: 'Day 1',
    totalCredits: '5.00 CE',
    lessons: [
      {
        id: 'pacemakers',
        title: 'Modern Perioperative Care of Pacemakers & ICDs',
        format: 'Clinical Lecture',
        credits: '2.50 CE',
        duration: '2h 30m',
        previewable: true,
        summary:
          'Evidence-based magnet application, EMI mitigation, pre-op interrogation review, and emergency reprogramming protocols for CIEDs.',
      },
      {
        id: 'fluid-management',
        title: 'Precision in Practice: Advanced Perioperative Fluid Management',
        format: 'Clinical Lecture',
        credits: '2.50 CE (1.50 Pharm)',
        duration: '2h 30m',
        summary:
          'Dynamic fluid responsiveness indices, balanced crystalloid vs. colloid selection, and glycocalyx preservation strategies.',
      },
    ],
  },
  {
    id: 'day-2',
    index: '03',
    title: 'Day 2: Substance Use, Neuromuscular Blockade & Spine Trauma',
    subtitle: 'High-risk pharmacology updates and airway-critical positioning',
    dayTag: 'Day 2',
    totalCredits: '6.00 CE',
    lessons: [
      {
        id: 'addicted-patient',
        title: 'Anesthesia Implications for the Addicted Patient',
        format: 'Clinical Lecture',
        credits: '2.00 CE (2.00 Pharm)',
        duration: '2h 00m',
        summary:
          'Multimodal analgesia for patients on buprenorphine, methadone, or naltrexone alongside acute withdrawal prevention.',
      },
      {
        id: 'nmbd-update',
        title: 'Neuromuscular-Blocking Drugs: Recent Update for U.S. CRNAs',
        format: 'Clinical Lecture',
        credits: '2.00 CE (2.00 Pharm)',
        duration: '2h 00m',
        summary:
          'Quantitative train-of-four monitoring standards, sugammadex dosing nuances, and residual paralysis prevention.',
      },
      {
        id: 'c-spine',
        title: 'Peri-Anesthetic Management of Cervical Spine Injury',
        format: 'Clinical Lecture',
        credits: '2.00 CE',
        duration: '2h 00m',
        summary:
          'Airway stabilization techniques, video laryngoscopy vs. fiberoptic approaches, and spinal cord perfusion pressure targets.',
      },
    ],
  },
  {
    id: 'day-3',
    index: '04',
    title: 'Day 3: Protective Ventilation & Medico-Legal Practice',
    subtitle: 'Lung-protective strategies and CRNA professional liability defense',
    dayTag: 'Day 3',
    totalCredits: '4.00 CE',
    lessons: [
      {
        id: 'ventilation',
        title: 'CRNA Mechanical Ventilation: Advanced Perioperative Strategies',
        format: 'Clinical Lecture',
        credits: '2.00 CE',
        duration: '2h 00m',
        summary:
          'Driving pressure optimization, individualized PEEP titration, recruitment maneuvers, and laparoscopic/robotic pulmonary mechanics.',
      },
      {
        id: 'liability',
        title: 'CRNA Professional Liability: Navigating Legal and Ethical Practice',
        format: 'Clinical Lecture',
        credits: '2.00 CE',
        duration: '2h 00m',
        summary:
          'Documentation integrity, informed consent standards, malpractice case studies, and risk mitigation across independent and ACT models.',
      },
    ],
  },
  {
    id: 'day-4',
    index: '05',
    title: 'Day 4: Hepatic Disease, Ketamine & Regional Lower Extremity Care',
    subtitle: 'Altered pharmacokinetics and targeted regional analgesia',
    dayTag: 'Day 4',
    totalCredits: '6.00 CE',
    lessons: [
      {
        id: 'liver-disease',
        title: 'Advanced Liver Disease & Anesthetic Management',
        format: 'Clinical Lecture',
        credits: '2.00 CE (1.50 Pharm)',
        duration: '2h 00m',
        summary:
          'Coagulopathy assessment (TEG/ROTEM), hepatorenal protection, and drug metabolism adjustments in cirrhotic patients.',
      },
      {
        id: 'ketamine',
        title: 'Ketamine in Modern Anesthesia',
        format: 'Clinical Lecture',
        credits: '2.00 CE (2.00 Pharm)',
        duration: '2h 00m',
        summary:
          'Sub-anesthetic opioid-sparing infusions, emergence reaction mitigation, and psychiatric/hemodynamic considerations.',
      },
      {
        id: 'lower-extremity',
        title: 'Lower Extremity Anesthesia Precision and Safety',
        format: 'Clinical Lecture',
        credits: '2.00 CE',
        duration: '2h 00m',
        summary:
          'Motor-sparing peripheral nerve blocks (ACB, iPACK, PENG) and ultrasound-guided anatomy for orthopedic procedures.',
      },
    ],
  },
  {
    id: 'day-5',
    index: '06',
    title: 'Day 5: Pulmonary Risk & Neuroanesthetic Crisis Management',
    subtitle: 'Complex airway pathology and acute intracranial emergencies',
    dayTag: 'Day 5',
    totalCredits: '4.00 CE',
    lessons: [
      {
        id: 'smoker',
        title: 'The Smoker on the Table: Advanced Anesthetic Implications & Management',
        format: 'Clinical Lecture',
        credits: '2.00 CE',
        duration: '2h 00m',
        summary:
          'Bronchospasm prophylaxis, carboxyhemoglobin clearance, airway reactivity, and COPD extubation criteria.',
      },
      {
        id: 'neuro-crisis',
        title: 'Advanced Neuroanesthetic Therapeutics & Crisis Management',
        format: 'Clinical Lecture',
        credits: '2.00 CE (1.50 Pharm)',
        duration: '2h 00m',
        summary:
          'Intracranial hypertension rescues, hyperosmolar therapy, aneurysm rupture management, and neuromonitoring compatibility.',
      },
    ],
  },
  {
    id: 'assessment',
    index: '07',
    title: 'Required Course Completion & Credit Reporting',
    subtitle: 'Final evaluation to trigger emailed certificate & AANA submission',
    dayTag: 'Completion',
    totalCredits: 'Required',
    lessons: [
      {
        id: 'self-assessment',
        title: 'Self-Assessment Form',
        format: 'Assessment',
        duration: '5 min',
        summary:
          'Return the required Self-Assessment Form within your 5-day seminar window to receive your emailed certificate of completion and AANA CE reporting.',
      },
    ],
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    quote:
      'Having the Butterfly iQ+ order form built directly into Day 1 alongside 25 Class A credits meant I used my annual hospital CME allocation cleanly on one itemized invoice.',
    author: 'Rachel Donovan, DNP, CRNA',
    role: 'Lead Nurse Anesthetist',
    organization: 'Midwest Regional Surgical Center',
    outcome: '25.00 CE credits reported to AANA within 48 hours of completion',
  },
  {
    id: 't2',
    quote:
      'The neuromuscular blockade update and lower extremity block precision lectures translated immediately to our orthopedic ORs—and the administrative team customized our brochure the same afternoon.',
    author: 'Marcus Vance, MSN, CRNA',
    role: 'Independent Anesthesia Practitioner',
    organization: 'Cascade Perioperative Group',
    outcome: '10.50 Pharmacology credits applied toward recertification cycle',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-platinum',
    category: 'Policies & Fulfillment',
    question: 'What is included in the $3,899.99 Platinum Package?',
    answer:
      'The Platinum Package includes full access to the 5-day Modern Anesthesia Practice seminar (25.00 AANA-approved MAC Ed CE credits, Code 1046673, including up to 10.50 Pharmacology & Therapeutics credits), the ButterflyIQ+ Order Form inside Module 1, Default and Custom Course Brochures for employer reimbursement, and expert moderator support.',
  },
  {
    id: 'faq-crna-owned',
    category: 'Accreditation & Format',
    question: 'Is Ascend Anesthesia Seminars owned by CRNAs?',
    answer:
      'Yes! Ascend Anesthesia Seminars is 100% owned by CRNAs. We founded the company because CE courses for CRNAs are often too expensive—our mission is keeping more money in the hands of CRNAs while delivering practical, high-impact clinical education.',
  },
  {
    id: 'faq-pac',
    category: 'Accreditation & Format',
    question: 'Does Ascend Anesthesia support CRNA advocacy and PACs?',
    answer:
      'Absolutely! A portion of all registrations is donated to various state PACs and to the CRNA-PAC & AANA Foundation. We are proud Triple Crown members.',
  },
  {
    id: 'faq-post-tests',
    category: 'Accreditation & Format',
    question: 'Are there post-tests, and is an instructor available for questions?',
    answer:
      'No! There are no post-tests with our seminars. We have an expert moderator available for discussion and content-related questions throughout your seminar.',
  },
  {
    id: 'faq-certificates',
    category: 'Accreditation & Format',
    question: 'How and when will I receive my certificate of completion?',
    answer:
      'Certificates of completion are sent via email after completion of the seminar and return of the required Self-Assessment Form.',
  },
  {
    id: 'faq-discounts',
    category: 'Discounts & Pricing',
    question: 'Do you offer group, loyalty, or referral discounts?',
    answer:
      'Yes—several! We offer coupon codes for group discounts, repeat/loyalty customers, and referrals. If someone referred you, write their name in the message box. For group discounts, message us with your group size and group name. At checkout, click "Click here to enter discount code" and enter your code.',
  },
  {
    id: 'faq-cancellation',
    category: 'Policies & Fulfillment',
    question: 'What is your rescheduling, cancellation, and refund policy?',
    answer:
      'You can reschedule your seminar at any time. You may cancel anytime before payment is rendered, or after payment anytime before your seminar begins and before any content is viewed (a $100 course cancellation fee applies). Refunds are not given for extended-access packages that include gift cards. Note: this Platinum course is structured as a five-day seminar and is not eligible for extension.',
  },
  {
    id: 'faq-gift-cards',
    category: 'Policies & Fulfillment',
    question: 'How are gift cards delivered for packages that include them?',
    answer:
      'Gift cards are sent directly from Amazon via email. We send out gift cards daily.',
  },
  {
    id: 'faq-brochure',
    category: 'Policies & Fulfillment',
    question: 'How do I get a Custom Course Brochure for employer reimbursement?',
    answer:
      'You gain immediate access to your default and custom brochures after registration and payment. If you need date adjustments or custom formatting, our administrative office staff is available to assist.',
  },
];

export const ULTRASOUND_CAPABILITIES = [
  {
    number: '01',
    title: 'Point of Care Ultrasound Training (PoCUS)',
    detail:
      'Perioperative bedside diagnostic protocols tailored specifically to anesthesia clinical decision-making.',
  },
  {
    number: '02',
    title: 'Ultrasound Guided Regional Anesthesia',
    detail:
      'Targeted upper and lower extremity nerve blocks with real-time sonoanatomy optimization.',
  },
  {
    number: '03',
    title: 'Continuous Peripheral Nerve Block Training',
    detail:
      'Catheter placement workflows, securing techniques, and postoperative infusion troubleshooting.',
  },
  {
    number: '04',
    title: 'Acute Pain Program Consultation',
    detail:
      'Practical implementation guidance for hospitals and anesthesia groups launching acute pain services.',
  },
  {
    number: '05',
    title: 'Billing Education',
    detail:
      'Compliant procedural documentation and ultrasound guidance billing workflows for CRNA practices.',
  },
  {
    number: '06',
    title: 'One-on-One Hands-On Scanning Practice',
    detail:
      'Direct scanning supervision at your institution with experienced independent CRNA lecturers.',
  },
];

export const POCUS_EXAMS = [
  'Gastric Ultrasound',
  'Pulmonary Ultrasound',
  'Focused Transthoracic Echocardiograms',
  'FAST Exam',
  'ICP Assessment',
  'Volume Status',
  'Pleura Assessment',
  'Diaphragm Assessment',
  'Vascular Access',
  'Airway Ultrasound',
];

export const SEMINAR_CATALOG = [
  {
    id: 'platinum',
    title: 'Modern Anesthesia Practice: Platinum Package',
    credits: '25.00 MAC Ed CE · 10.50 Pharm',
    format: '5-Day Seminar + Butterfly iQ+ Order Form',
    price: '$3,899.99',
    description:
      'Our flagship 5-day safety, compliance, and advanced clinical care seminar bundled with a Butterfly iQ+ handheld ultrasound order.',
    isFeatured: true,
  },
  {
    id: 'standard-seminars',
    title: 'Online CRNA Continuing Education Seminars',
    credits: 'AANA Class A CE Credits',
    format: 'Self-Paced Online · No Post-Tests',
    price: 'Group & Loyalty Discounts Available',
    description:
      'Browse all active AANA-approved seminars designed by CRNAs to keep high-quality CE accessible and affordable.',
    isFeatured: false,
  },
  {
    id: 'onsite-ultrasound',
    title: 'On-Site Institutional Ultrasound & POCUS Training',
    credits: 'Custom Institutional Curriculum',
    format: 'In-Person · 1-on-1 Hands-On Practice',
    price: 'Free Custom Estimate',
    description:
      'Independent CRNA instructors travel to your hospital, anesthesia group, or program for hands-on POCUS and regional anesthesia training.',
    isFeatured: false,
  },
];
