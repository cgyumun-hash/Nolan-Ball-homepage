import type { FilterBall, NavItem, TransitRow } from "@/lib/site";

/**
 * English-language website copy.
 *
 * The Korean content guide remains the source of truth. These translations use
 * restrained corporate and medical-device language and preserve the qualifiers
 * applied in the Korean copy.
 */

export const EN_COMPANY = {
  nameEn: "Nolan Ball Korea",
  legal: "Nolan Ball Korea",
  address:
    "1F, Alchan Building, 8-1, Seobugok-ro 16beon-gil, Geumjeong-gu, Busan, Republic of Korea",
  addressLines: [
    "1F, Alchan Building, 8-1, Seobugok-ro 16beon-gil,",
    "Geumjeong-gu, Busan, Republic of Korea",
  ],
  tel: "+82-51-516-5064",
  fax: "+82-51-516-5065",
  email: "nolan5000@naver.com",
  copyright: "COPYRIGHT 2026 BY NOLAN BALL KOREA. ALL RIGHTS RESERVED.",
} as const;

export const EN_INQUIRY_FORM_MESSAGES = {
  submit: "Submit Inquiry",
  submitting: "Submitting...",
  success: "Your inquiry has been received. Our team will contact you after review.",
  failure:
    "We were unable to submit your inquiry. Please try again later or contact us by email.",
} as const;

/** Values remain Korean because the existing mail API validates these values. */
export const EN_INQUIRY_TYPE_OPTIONS = [
  { label: "Product Information", value: "제품" },
  { label: "Sample Request", value: "샘플" },
  { label: "Quotation", value: "견적" },
  { label: "Distribution & Partnership", value: "유통·대리점" },
  { label: "International Sales", value: "해외 수출" },
] as const;

export const EN_PRODUCTS_PAGES = [
  {
    label: "2.8 mm / Gastroscope",
    href: "/en/products/filter-ball-for-gastroscopes",
  },
  {
    label: "3.2 mm / Gastroscope & Colonoscope",
    href: "/en/products/nolan-ball-3-2mm",
  },
  {
    label: "3.7 mm / Colonoscope",
    href: "/en/products/filter-ball-for-colonoscopes",
  },
  {
    label: "Valve Brush",
    href: "/en/products/endoscopic-valve-port-brush",
  },
  { label: "HOW TO USE", href: "/en/how-to-use" },
] as const;

export const EN_RESOURCES_PAGES = [
  { label: "Test Results & Reports", href: "/en/about/certifications" },
  { label: "Downloads", href: "/en/customer-support/resources-downloads" },
] as const;

export const EN_COMPANY_PAGES = [
  { label: "Company Overview", href: "/en/about/overview" },
  { label: "Activities", href: "/en/about/activities" },
  { label: "Location", href: "/en/about/location" },
  { label: "Contact Us", href: "/en/customer-support/online-inquiry" },
] as const;

export const EN_ACTIVITIES = {
  eyebrow: "COMPANY",
  title: "Activities",
  introEyebrow: "NOLAN BALL KOREA",
  introTitle: "Domestic & Global Activities",
  intro:
    "Discover Nolan Ball Korea's exhibitions, conferences, product demonstrations, and global partnerships.",
  filters: {
    all: "All",
    exhibition: "Exhibitions",
    seminar: "Conferences & Seminars",
    demonstration: "Product Demonstrations",
    overseas: "Global Activities",
    other: "Other",
  },
  sortNewest: "Newest",
  sortOldest: "Oldest",
  readMore: "View details",
  empty: "No activities have been published yet.",
  backToList: "Back to activities",
  eventDate: "Date",
  location: "Location",
  gallery: "Activity photos",
  video: "Related video",
} as const;

export const EN_TECHNOLOGY_PAGES = [
  { label: "Technology Overview", href: "/en/about/technology-overview" },
] as const;

export const EN_NAV: NavItem[] = [
  { label: "MAIN", href: "/en", children: [] },
  {
    label: "PRODUCT",
    href: "/en/products/filter-ball-for-gastroscopes",
    children: [...EN_PRODUCTS_PAGES],
  },
  {
    label: "TECHNOLOGY",
    href: "/en/about/technology-overview",
    children: [],
  },
  {
    label: "RESOURCES",
    href: "/en/about/certifications",
    children: [...EN_RESOURCES_PAGES],
  },
  {
    label: "COMPANY",
    href: "/en/about/overview",
    children: [...EN_COMPANY_PAGES],
  },
];

export const EN_SLIDES = [
  {
    id: "slide_1",
    eyebrow: "ENDOSCOPE CHANNEL CLEANING",
    lines: ["A New Standard in", "Endoscope Cleaning"],
    description: "A single-use cleaning solution designed for 360° contact with the channel wall",
    image: "/images/main/메인1_pc.webp",
    imageMobile: "/images/main/메인1_moblie.webp",
    fallback: "linear-gradient(115deg, #0b3261 0%, #217fc1 55%, #8ed7f2 100%)",
  },
  {
    id: "slide_2",
    eyebrow: "CONSISTENT WORKFLOW",
    lines: ["A Faster, More", "Consistent Workflow"],
    description: "Designed to reduce operator-dependent variation and support workflow efficiency",
    image: "/images/main/메인2_pc.webp",
    imageMobile: "/images/main/메인2_mobile.webp",
    fallback: "linear-gradient(115deg, #092c52 0%, #1c6fa8 55%, #8bc9e8 100%)",
  },
  {
    id: "slide_3",
    eyebrow: "BEYOND CLEANING",
    lines: ["Beyond Cleaning,", "Toward a Safer Future"],
    description: "Building a trusted healthcare environment through responsible technology and collaboration",
    image: "/images/main/메인3_pc.webp",
    imageMobile: "/images/main/메인3_moblie.webp",
    fallback: "linear-gradient(115deg, #1d3345 0%, #3f6c86 55%, #8fb3c6 100%)",
  },
] as const;

export const EN_PRODUCTS = {
  brand: "Nolan Ball Korea",
  heading: "PRODUCTS",
  desc: "A single-use solution for endoscope channel cleaning",
  cta: "Explore Products",
  href: "/en/products/filter-ball-for-gastroscopes",
  image: "/images/main/홈페이지_product_pc.webp",
  imageMobile: "/images/main/홈페이지_product_moblie.webp",
  disclaimer: "Product appearance and scale in the image may differ from the actual product.",
  fallback: "linear-gradient(110deg, #071f3d 0%, #145f9c 50%, #73bde5 100%)",
} as const;

export const EN_WHY = {
  eyebrow: "",
  headingLines: ["CONTACT.", "WIPE.", "CHANGE."],
  description: "",
  contact: "360°",
  cta: "VIEW TECHNOLOGY",
  href: "/en/about/technology-overview",
  image: "/images/main/360_pc.webp",
  imageMobile: "/images/main/360_moblie.webp",
} as const;

export const EN_HERO_ACTIONS = [
  {
    label: "Explore Products",
    href: "/en/products/filter-ball-for-gastroscopes",
    primary: true,
  },
  {
    label: "Download Resources",
    href: "/en/customer-support/resources-downloads",
    primary: false,
  },
  {
    label: "Samples & Inquiries",
    href: "/en/customer-support/online-inquiry",
    primary: false,
  },
] as const;

export const EN_KEY_BENEFITS = {
  eyebrow: "WHY NOLAN BALL",
  heading: "Four Core Technologies\nThat Make a Difference",
  keyMessage: "",
  supportingText: "",
  items: [
    {
      no: "01",
      title: "360° Full Contact",
      body: "A spherical structure matched to the channel diameter contacts the full circumference to reduce cleaning blind spots.",
    },
    {
      no: "02",
      title: "Self-Rotating Continuous Wiping",
      body: "Micro-protrusions and contact bands wipe and carry out blood, mucus, and fine particles during movement.",
    },
    {
      no: "03",
      title: "Helps Reduce Biofilm-Forming Conditions",
      body: "Removing early contaminants and organic matter helps reduce conditions in which biofilm may form.",
    },
    {
      no: "04",
      title: "Irreversible Color Change",
      body: "A post-use color change supports visual confirmation of use and helps prevent reuse.",
    },
  ],
  image: "/images/main/4가지기술_pc.webp",
  imageMobile: "/images/main/4가지기술_moblie.webp",
  imageAlt: "Nolan Ball single-use endoscope channel-cleaning product",
} as const;

export const EN_PRODUCT_SPECS = {
  heading: "Product Specifications",
  columns: ["Application", "Configuration", "Size", "Availability", "Pack Size"] as const,
  rows: [
    { use: "Gastroscope", purpose: "Dedicated", spec: "2.8 mm", status: "Available", pack: "500 pcs" },
    { use: "Gastroscope & Colonoscope", purpose: "Dual-use", spec: "3.2 mm", status: "Available", pack: "500 pcs" },
    { use: "Colonoscope", purpose: "Dedicated", spec: "3.7 mm", status: "Available", pack: "500 pcs" },
  ],
  note: "Pack sizes and product codes are pending final confirmation. Please verify the applicable information with our team before placing an order.",
} as const;

export const EN_TEST_RESULTS = {
  heading: "Test Results",
  lead:
    "Nolan Ball-related specimens were evaluated through general bacterial culture testing conducted by an independent professional laboratory. The summary below reflects the results recorded in the nine reports provided.",
  resultLabel: "Test Results",
  result: "0 CFU",
  resultEn: "0 CFU",
  summary: {
    lead: "In tests conducted under 2.8 mm and 3.7 mm conditions, Nolan Ball showed a result of 0 CFU, with no microbial growth detected.",
    body: "The results demonstrate the pre-cleaning performance of Nolan Ball, whose structure is designed to fit the channel inner diameter, maintain contact with the inner wall, and support the removal of residual organic matter and contaminants from inside the channel.",
    note: "※ These results were obtained under the specified test conditions and may vary depending on the actual conditions of use and reprocessing.",
    specs: [
      { value: "2.8 mm", label: "Test Result" },
      { value: "3.7 mm", label: "Test Result" },
    ],
  },
  metrics: [
    { value: "9", label: "Microbiology Test Reports" },
    { value: "2.8 / 3.7 mm", label: "Related Specimen Sizes" },
    { value: "3 Dates", label: "Feb. 27 · Mar. 16 · Mar. 18, 2026" },
  ],
  details: [
    { label: "Testing Laboratory", value: "Seegene Medical Foundation, Seegene Clinic" },
    { label: "Test Type", value: "General bacterial culture (MIC, other specimen)" },
    { label: "Test Code", value: "D5854004Z" },
    { label: "Scope Reviewed", value: "2.8 mm and 3.7 mm-related specimens; round and waffle-pattern specimen labels" },
  ],
  batchesTitle: "Test Configuration and Results",
  batchesLead:
    "Nolan Ball-related specimens were evaluated by an independent professional laboratory using general bacterial culture testing. Based on the specimen names and receipt dates stated in the reports, the results were organized into 2.8 mm and 3.7 mm groups. The summary covers nine reports, including one preliminary reference report.",
  batches: [
    {
      no: "01",
      title: "2.8 mm-Related Results I",
      spec: "2.8 mm",
      received: "Received Mar. 13, 2026",
      reported: "Reported Mar. 16, 2026",
      count: "2 Reports",
      images: [
        "/images/test-results/test-result-04.webp",
        "/images/test-results/test-result-05.webp",
      ],
      body: "General bacterial culture results were reviewed for the 2.8 mm-related specimens identified as 1-1 and 1-2.",
    },
    {
      no: "02",
      title: "2.8 mm-Related Results II",
      spec: "2.8 mm",
      received: "Received Mar. 13, 2026",
      reported: "Reported Mar. 16, 2026",
      count: "2 Reports",
      images: [
        "/images/test-results/test-result-03.webp",
        "/images/test-results/test-result-02.webp",
      ],
      body: "The same reported result wording was recorded for the 2.8 mm-related specimens identified as 10-1 and 10-2.",
    },
    {
      no: "03",
      title: "3.7 mm-Related Results",
      spec: "3.7 mm",
      received: "Received Mar. 16, 2026",
      reported: "Reported Mar. 18, 2026",
      count: "4 Reports",
      images: [
        "/images/test-results/test-result-06.webp",
        "/images/test-results/test-result-07.webp",
        "/images/test-results/test-result-08.webp",
        "/images/test-results/test-result-09.webp",
      ],
      body: "Four 3.7 mm specimens bearing round and waffle-pattern labels were reviewed, and all four reports contained the same result wording.",
    },
  ],
  interpretationTitle: "CFU Test Results & Interpretation",
  method: [
    "The reports for specimens collected after one Nolan Ball pass state, ‘No growth of microorganisms after 2-day culture.’ The same wording was recorded for specimens collected after subsequent passes through the fifth pass. The reported results were consistent under the stated test conditions.",
    "Nolan Ball is dimensioned for the internal channel diameter and is designed to establish 360° circumferential contact with the channel wall upon insertion. The resulting physical contact and shear action support the removal and outward transport of residual organic matter, including mucus, blood, and protein.",
    "Within the scope of the reported tests, consistent general bacterial culture results were recorded after the first and subsequent passes. This may support an interpretation that the contact-based structure contributes to a consistent cleaning process. The original reports should be reviewed for the complete specimen information and test conditions.",
  ],
  interpretations: [
    {
      no: "01",
      title: "Test Group Configuration",
      body: [
        "The first and second test groups involved 2.8 mm-related specimens, while the third involved 3.7 mm-related specimens.",
        "Results from different product sizes and test rounds were reviewed using the same reporting criterion.",
      ],
    },
    {
      no: "02",
      title: "Sequential Passes and Sampling",
      body: [
        "Nolan Ball was passed sequentially through the endoscope channel.",
        "Specimens were collected after the first through fifth passes to review changes across the repeated cleaning sequence.",
      ],
    },
    {
      no: "03",
      title: "Culture Testing and Review",
      body: [
        "Specimens collected at each stage were evaluated by an independent professional laboratory using general bacterial culture testing.",
        "The result wording in the nine reports provided was compared by test round and specimen.",
      ],
    },
  ],
  disclaimer:
    "Results may vary depending on test conditions and specimen characteristics. For a complete assessment, review the specimen name, receipt date, report date, and test conditions stated in the original reports.",
} as const;

export const EN_DOWNLOADS = {
  heading: "Downloads",
  items: [
    {
      name: "Nolan Ball Catalog",
      desc: "Product overview, specifications, and core benefits",
      file: "/downloads/nolan-ball-catalog.pdf",
      size: "19.8 MB",
      ready: true,
    },
    {
      name: "Nolan Ball Product Guide",
      desc: "Micro-Anatomy structure and cleaning mechanism",
      file: "/downloads/nolan-ball-product-guide.pdf",
      size: "28.9 MB",
      ready: true,
    },
    {
      name: "Microbiology Test Reports",
      desc: "Nine general bacterial culture reports issued by Seegene Medical Foundation",
      file: "/downloads/Nolan_Ball_시험성적.pdf",
      size: "0.4 MB",
      ready: true,
    },
    {
      name: "Instructions for Use (IFU)",
      desc: "Step-by-step instructions and precautions",
      file: "",
      size: "—",
      ready: false,
      pending: "The document will be published once the final IFU is available.",
    },
  ],
  note: "Documents may be revised without prior notice. Please contact us if you require the latest version.",
} as const;

const EN_ENDOSCOPE_FEATURES = [
  "Color-change indication to discourage reuse",
  "360° circumferential contact cleaning",
  "Helps reduce conditions conducive to biofilm formation",
  "Copper-ion-containing material",
];

const EN_ENDOSCOPE_EFFECTS = [
  "Water-responsive, irreversible color indication supports intuitive identification of pre- and post-use status",
  "Supports the removal of mucus, protein, and other organic residues from the channel wall",
  "Helps reduce conditions conducive to biofilm formation by supporting the removal of residual organic matter",
  "Performance attributes associated with copper ions will be published after the relevant supporting test data have been reviewed",
];

export const EN_FILTER_BALL_COLONOSCOPES: FilterBall = {
  eyebrow: "PRODUCT",
  title: "Colonoscope · 3.7 mm",
  brand: "Nolan Ball",
  brandColor: "#E84E79",
  subtitle: "Dedicated for colonoscope channels · 3.7 mm",
  image: "/images/revision/products/nolan-ball-3-7.webp",
  imageWidth: 1254,
  imageHeight: 1254,
  intro: [
    [
      {
        t: "Nolan Ball for colonoscopes is a 3.7 mm, single-use channel-cleaning ball designed for the long and curved channel geometry of lower gastrointestinal endoscopes.",
      },
    ],
    [
      { t: "Its " },
      { t: "360° circumferential contact and continuous wiping action", b: true },
      { t: " support the " },
      { t: "physical removal of residual contaminants", b: true },
      { t: ", including blood, mucus, and protein." },
    ],
    [
      { t: "The flexible structure is designed to maintain contact through curved sections, helping " },
      { t: "reduce operator-dependent variation", b: true },
      { t: " and support a more consistent manual cleaning process." },
    ],
  ],
  features: [...EN_ENDOSCOPE_FEATURES],
  effects: [...EN_ENDOSCOPE_EFFECTS],
};

export const EN_FILTER_BALL_GASTROSCOPES: FilterBall = {
  eyebrow: "PRODUCT",
  title: "Gastroscope · 2.8 mm",
  brand: "Nolan Ball",
  brandColor: "#999",
  subtitle: "Dedicated for gastroscope channels 2.8 mm",
  image: "/images/revision/products/nolan-ball-2-8.webp",
  imageWidth: 1254,
  imageHeight: 1254,
  intro: [
    [
      {
        t: "Nolan Ball for gastroscopes is a 2.8 mm, single-use channel-cleaning ball designed for the channel geometry of upper gastrointestinal endoscopes.",
      },
    ],
    [
      { t: "Its " },
      { t: "360° circumferential contact and continuous wiping action", b: true },
      { t: " support the " },
      { t: "physical removal of residual contaminants", b: true },
      { t: ", including blood, mucus, and protein." },
    ],
    [
      { t: "The flexible structure is designed to maintain contact through curved sections, helping " },
      { t: "reduce operator-dependent variation", b: true },
      { t: " and support a more consistent manual cleaning process." },
    ],
  ],
  features: [...EN_ENDOSCOPE_FEATURES],
  effects: [...EN_ENDOSCOPE_EFFECTS],
};

export const EN_FILTER_BALL_GASTRO_COLONOSCOPES: FilterBall = {
  eyebrow: "PRODUCT",
  title: "3.2 mm / Gastroscope & Colonoscope",
  brand: "Nolan Ball",
  brandColor: "#f59e0b",
  subtitle: "Dual-use for gastroscope and colonoscope channels · 3.2 mm",
  image: "/images/revision/products/nolan-ball-3-2.webp",
  imageWidth: 1254,
  imageHeight: 1254,
  intro: [
    [{ t: "The 3.2 mm Nolan Ball is a single-use channel-cleaning ball designed for compatible gastroscope and colonoscope channels." }],
    [
      { t: "Its channel-matched spherical structure supports " },
      { t: "360° full-surface contact from the entrance to the distal end", b: true },
      { t: ", helping reduce cleaning blind spots and physically remove residual contaminants." },
    ],
    [
      { t: "Continuous wiping and debris-pushing action support a " },
      { t: "consistent reprocessing workflow", b: true },
      { t: " for compatible gastroscope and colonoscope channels." },
    ],
  ],
  features: [...EN_ENDOSCOPE_FEATURES],
  effects: [...EN_ENDOSCOPE_EFFECTS],
};

export const EN_VALVE_PORT_BRUSH: FilterBall = {
  eyebrow: "PRODUCT",
  title: "Valve Brush",
  brand: "Nolan Ball",
  brandColor: "#1479c9",
  subtitle: "Single-use brush for endoscope valve and port cleaning",
  image: "/images/revision/products/valve-brush.webp",
  imageWidth: 1254,
  imageHeight: 1254,
  intro: [
    [{ t: "The Valve Brush is a single-use cleaning brush designed for endoscope valve and port areas where residue can remain." }],
    [{ t: "Its flexible bristles and ergonomic handle support controlled physical removal of contaminants from narrow or irregular internal surfaces." }],
    [{ t: "Single-use application supports hygienic management and helps reduce the risk of cross-use during the reprocessing workflow." }],
  ],
  features: ["Flexible bristles for valve and port geometry", "Ergonomic handle for controlled cleaning", "Single-use configuration", "Supports access to narrow internal surfaces"],
  effects: ["Supports physical removal of visible residue", "Helps standardize valve and port cleaning tasks", "Supports hygienic single-use management", "Designed to complement the endoscope reprocessing workflow"],
};

export const EN_OVERVIEW = {
  eyebrow: "COMPANY",
  title: "Company Overview",
  introTitle: "Setting a New Standard in Endoscope Cleaning",
  intro: [
    "Nolan Ball Korea develops hygiene consumables designed to improve workflow efficiency and consistency in endoscope reprocessing, with a focus on its flagship channel-cleaning product, Nolan Ball.",
    "Nolan Ball combines a 360° channel-wall contact structure with continuous wiping and debris-pushing mechanisms to complement the structural limitations of conventional brush-based cleaning.",
    "Its flexible ball structure follows curved channels while supporting the physical removal of residual contaminants such as blood, mucus, and protein. The design helps reduce cleaning blind spots and operator-dependent variation, supporting a faster and more standardized manual cleaning process.",
  ],
  vision: {
    label: "VISION",
    title: "A Safer, More Sustainable Endoscope Hygiene Environment",
    body: [
      "Nolan Ball Korea supports higher infection-control standards throughout endoscope reprocessing through structured cleaning technology and hygiene consumables designed around clinical usability.",
      "We focus on making product structures and procedures straightforward to implement, helping healthcare facilities operate consistent manual cleaning workflows and reduce operator-dependent variation.",
      "Through these efforts, we aim to contribute to safer, more sustainable endoscope hygiene environments and reliable reprocessing systems for healthcare facilities in Korea and worldwide.",
    ],
  },
  mission: {
    label: "MISSION",
    title: "Delivering Practical, Field-Oriented Cleaning Solutions",
    body: [
      "Our mission is to support improved hygiene and safety in endoscope reprocessing through innovative structural design and product development grounded in clinical usability, contributing to efforts to reduce patient infection risk.",
      "Nolan Ball's 360° circumferential contact structure and debris capture-and-push mechanism are designed to maintain contact through curved channels, supporting the physical removal and discharge of residual contaminants such as blood, mucus, and protein.",
      "Its single-use management approach and consistent operating procedure support workflow efficiency and standardization. The compact product format also reflects our consideration of waste burden and healthcare organizations' ESG objectives.",
    ],
  },
  coreValuesTitle: "Core Values",
  coreValues: [
    { title: "Patient Focus", body: "We place patient safety and trust at the center of product development." },
    { title: "Innovation", body: "We improve cleaning processes through new structures and approaches." },
    { title: "Responsibility", body: "We uphold quality and safety standards with consistency and transparency." },
    { title: "Collaboration", body: "We work with clinicians and partners to develop practical solutions." },
    { title: "Sustainability", body: "We consider disposal burden and pursue responsible coexistence with the environment." },
  ],
  introImage: { src: "/images/company/1.webp", alt: "Nolan Ball Korea company overview" },
  visionImage: { src: "/images/company/2-S.webp", alt: "Nolan Ball Korea vision" },
  missionImage: { src: "/images/company/4-company.webp", alt: "Water droplet and ripples" },
  companyTitle: "Company Information",
  company: [
    { label: "Company", value: "Nolan Ball Korea" },
    { label: "Head Office", value: EN_COMPANY.address },
    { label: "Contact", value: `${EN_COMPANY.tel} (Fax ${EN_COMPANY.fax})` },
    {
      label: "Core Business",
      value: "Development, manufacture, and sale of Nolan Ball single-use endoscope channel-cleaning products",
    },
  ],
  companyBgFallback:
    "radial-gradient(circle at 78% 20%, rgba(255,224,168,0.1), transparent 20%), linear-gradient(120deg, #17141a 0%, #292126 55%, #21191d 100%)",
} as const;

export const EN_TECHNOLOGY = {
  eyebrow: "TECHNOLOGY",
  title: "Technology Overview",
  overview: {
    eyebrow: "TECHNOLOGY OVERVIEW",
    title: "Technology Overview",
    headline: "Full-Surface Contact Cleaning from Channel Entry to Distal End",
    intro:
      "Nolan Ball is a spherical channel-cleaning structure dimensioned for the internal diameter of an endoscope suction channel. Upon insertion, it is designed to establish continuous surface contact with the channel wall, supporting close-contact cleaning from the entry point to the distal end while helping reduce areas that may be difficult to reach with conventional brushes.",
    principles: [
      {
        no: "01",
        title: "360° Contact Matched to Channel Diameter",
        body: "The spherical structure is dimensioned for the channel diameter and designed to establish full-surface contact upon insertion, helping reduce potential blind spots from entry to distal end.",
        points: [
          "Spherical structure corresponding to the internal channel diameter",
          "Full-surface contact initiated upon insertion",
          "Contact coverage across the channel, including the entry section",
        ],
      },
      {
        no: "02",
        title: "Debris Removal During Pre-Cleaning",
        body: "Continuous wiping and pushing action during movement supports the separation and outward transport of residual organic matter from inside the channel.",
        points: [
          "Continuous wiping and pushing action",
          "Supports outward transport of blood, mucus, protein, and fine particles",
          "Assists in removing residual organic matter from the channel",
        ],
      },
      {
        no: "03",
        title: "Reduced Conditions for Biofilm Formation",
        body: "By supporting early removal of residual organic matter and initial substrate, the process helps reduce conditions conducive to microbial attachment and EPS formation and supports subsequent reprocessing efficiency.",
        points: [
          "Supports early removal of residual organic matter and initial substrate",
          "Helps reduce conditions favorable to microbial attachment and EPS formation",
          "Supports greater consistency and efficiency in subsequent cleaning steps",
        ],
      },
    ],
    image: {
      src: "/images/revision/technology/overview-desktop.webp",
      mobile: "/images/revision/technology/overview-mobile-clean.webp",
      alt: "Nolan Ball product",
    },
    measurement: {
      title: "Initial Contaminant Contact Zone at the Suction Channel Entry",
      body: "Following a procedure, organic matter such as blood, mucus, and protein may enter through the channel opening and remain on the channel wall.",
      quote: "Nolan Ball supports 360° contact from the moment of insertion",
    },
    specifications: {
      title: "Specifications (based on channel inner diameter)",
      items: [
        { size: "2.8 mm", application: "Gastroscope only", code: "GASTRO" },
        { size: "3.2 mm", application: "Gastroscope & colonoscope", code: "GASTRO & COLONO" },
        { size: "3.7 mm", application: "Colonoscope only", code: "COLONO" },
      ],
      note: "※ The illustration may not represent the actual product size.",
    },
  },
  featuresEyebrow: "",
  featuresTitle: "Product Structure",
  featuresLead:
    "Six coordinated structural elements support contact, movement, debris capture, and visual verification of use.\nSelect a structure name to view its details.",
  interactionHint: "",
  structureImage: "/images/technology/제품구조_pc.webp",
  structureImageMobile: "/images/technology/제품구조_moblie.webp",
  features: [
    {
      no: "01",
      name: "Debris-Capture Surface",
      en: "Debris Capture & Anti-Reattachment",
      body: "The modified polar surface is designed to adsorb and capture separated particles, helping reduce their reattachment to the channel wall.",
      points: [],
    },
    {
      no: "02",
      name: "Micro-Protrusion Structure",
      en: "Localized Shear Cleaning",
      body: "Distributed multi-point protrusions between the bands increase localized contact pressure and generate compression and shear action against adhered residues and biofilm-related material.",
      points: [
        "Supports separation of mucus, protein, and blood residue",
        "Assists cleaning within surface irregularities",
        "Extends contact into small potential dead zones",
      ],
    },
    {
      no: "03",
      name: "Asymmetric Friction Surface",
      en: "Self-Rotating Cleaning Action",
      body: "Modified hemispherical surfaces create higher- and lower-friction regions designed to induce rotation as the ball moves through the channel.",
      points: [
        "Dynamic repositioning of the contact face",
        "Broad circumferential contact during repeated movement",
        "Supports contact efficiency across residual material",
      ],
    },
    {
      no: "04",
      name: "Spherical Body",
      en: "Full-Contact Cleaning Base",
      body: "The spherical body supports surface contact from entry to distal end and is designed to move through changes in channel curvature while maintaining stable contact pressure.",
      points: [],
    },
    {
      no: "05",
      name: "Continuous Contact Bands",
      en: "Continuous Surface Wiping",
      body: "Intersecting horizontal and vertical bands formed around the ball support continuous wiping action as the product moves through the channel.",
      points: [
        "Maintains a defined width of surface contact",
        "Transfers physical cleaning action throughout the channel",
        "Changing contact position helps reduce potential blind spots",
      ],
    },
    {
      no: "06",
      name: "Irreversible Color Indicator",
      en: "Visual Single-Use Verification",
      body: "A water-responsive, irreversible color system inside the ball is designed to change permanently when exposed to moisture during the cleaning process.",
      points: [
        "Visual indication that the cleaning process has been performed",
        "Supports compliance with single-use procedures",
        "Supports standardized infection-control workflows",
      ],
    },
  ],
} as const;

const EN_TRANSIT: TransitRow[] = [
  {
    icon: "/images/icon_1.webp",
    label: "Subway",
    lines: [
      {
        bold: "Busan Metro Line 1 · Pusan National University Station, Exit 2",
        text: "Approximately a 7-minute walk toward Seobugok-ro 16beon-gil",
        wide: true,
      },
    ],
  },
  {
    icon: "/images/icon_2.webp",
    label: "Bus",
    lines: [
      {
        bold: "Routes 29, 49, 50, 148, and 1002",
        text: "Get off at Bugok Market stop (11118), then walk approximately 2 minutes",
        wide: true,
      },
    ],
  },
];

export const EN_LOCATION = {
  eyebrow: "COMPANY",
  title: "Location",
  officeTitle: "Head Office",
  officeAddress: EN_COMPANY.address,
  map: {
    name: "Nolan Ball Korea",
    latitude: 35.2266414394281,
    longitude: 129.090490710535,
    height: "579",
  },
  transitTitle: "Public Transportation",
  transit: EN_TRANSIT,
} as const;

export const EN_CERTIFICATIONS = {
  eyebrow: "RESOURCES",
  title: "Test Results & Reports",
  note: "An independent professional laboratory reported no growth of microorganisms after a two-day general bacterial culture. Please review the original reports for the complete test conditions and specimen information.",
  items: Array.from({ length: 9 }, (_, index) => ({
    image: `/images/test-results/test-result-0${index + 1}.webp`,
    label: `Microbiology Test Report ${index + 1}`,
  })),
} as const;

export const EN_HOW_TO_USE = {
  eyebrow: "HOW TO USE",
  title: "How to Use",
  lead: "Nolan Ball is a single-use channel-cleaning ball intended for the manual cleaning stage of endoscope reprocessing. The sequence below is provisional and based on the materials currently provided. Always follow the final Instructions for Use (IFU) supplied with the product.",
  notice: "This page will be updated when the final IFU is approved. The current information is limited to content confirmed in the catalog and product guide.",
  steps: [
    {
      no: "01",
      title: "Select the Correct Channel Size",
      body: "Select the product that corresponds to the intended endoscope channel: 2.8 mm for gastroscopes, 3.2 mm for compatible gastroscope and colonoscope channels, or 3.7 mm for colonoscopes. An incorrect size may result in inconsistent channel contact.",
    },
    {
      no: "02",
      title: "Inspect the Product Before Use",
      body: "After opening the package, confirm that the ball has not changed color. Do not use a discolored product, as the color change indicates prior exposure to moisture.",
    },
    {
      no: "03",
      title: "Insert and Pass Through the Channel",
      body: "Introduce the ball into the suction channel and pass it through the full channel length. During movement, the ball is designed to maintain contact with the channel wall and provide continuous wiping and pushing action.",
    },
    {
      no: "04",
      title: "Retrieve and Confirm the Color Change",
      body: "After the ball exits the distal end of the channel, confirm the color change as a visual indication that the process has been performed.",
    },
    {
      no: "05",
      title: "Dispose of After One Use",
      body: "Do not reuse. The water-responsive, irreversible color indicator records exposure to moisture. Dispose of the used product in accordance with your facility's medical-waste procedures.",
    },
  ],
  cautionTitle: "Precautions",
  cautions: [
    "For single use only. Do not reuse.",
    "Do not use a product that does not correspond to the channel size.",
    "Do not use if the packaging is damaged or if the product is already discolored before use.",
    "This product supports the manual cleaning stage and does not replace the facility's complete reprocessing or disinfection procedure.",
    "Follow the storage conditions and expiration date stated on the product labeling.",
  ],
  videoTitle: "Product Guide Video",
  videoNote: "A product guide video is referenced by the QR code in the catalog. The video will be embedded here when the final file or link is available.",
} as const;

export const EN_ABOUT = {
  paragraphs: [
    "Nolan Ball Korea develops hygiene consumables designed to improve efficiency and consistency in endoscope reprocessing.",
    "Our flagship product, Nolan Ball, combines a 360° contact structure with a continuous wiping mechanism to complement the structural limitations of conventional brush-based cleaning.",
    "Through products designed for clinical usability and reliable cleaning workflows, we aim to contribute to a safer endoscope hygiene environment.",
  ],
  cta: "Learn More",
  href: "/en/about/overview",
  image: "/images/main/9.webp",
  fallback: "linear-gradient(150deg, #102d4a 0%, #386d98 60%, #83b9d7 100%)",
} as const;

export const EN_INQUIRY_COPY = {
  consentTitle: "Consent to the Collection and Use of Personal Information",
  consentIntro: "Please review the following information before providing your consent.",
  collectedItems: "Information collected: organization, contact name, department/title, telephone number, and email address",
  retentionSummary: "Personal information will be deleted without undue delay once the purpose of collection has been fulfilled. The maximum retention period is three years.",
  policyIntro: "Nolan Ball Korea respects your privacy. This notice explains how personal information is collected, used, retained, and deleted when you use this website or contact us regarding our products and services.",
  policySections: [
    {
      title: "1. Personal Information We Collect",
      body: "To process inquiries, we collect your organization, name, department or title, telephone number, and email address. Technical information such as IP address, browser or device information, and visited pages may be generated automatically while using the service.",
    },
    {
      title: "2. Purpose of Use",
      body: "Information is used to respond to product, sample, and quotation requests; provide and improve products and services; meet legal obligations; and maintain service security.",
    },
    {
      title: "3. Disclosure and Processing by Service Providers",
      body: "We do not sell personal information. Information may be disclosed where required by law or provided to contracted service providers only to the extent necessary to perform their duties under appropriate confidentiality obligations.",
    },
    {
      title: "4. Retention and Deletion",
      body: "Information is deleted without undue delay when the purpose of collection has been fulfilled. The maximum retention period is three years unless a longer period is required by applicable law.",
    },
    {
      title: "5. Your Rights",
      body: "You may request access to, correction or deletion of, or restriction of processing of your personal information, and you may withdraw consent where applicable.",
    },
    {
      title: "6. Safeguards",
      body: "Nolan Ball Korea applies appropriate technical and organizational measures designed to protect personal information from loss, theft, unauthorized disclosure, alteration, or damage.",
    },
    {
      title: "7. Cookies",
      body: "This website may use cookies or similar technologies. You may configure your browser to refuse the storage of cookies.",
    },
    {
      title: "8. Changes to This Notice",
      body: "This notice may be revised. The latest version and its effective date will be made available on this website.",
    },
  ],
  contactTitle: "9. Contact",
  contactBody: "For questions regarding this privacy notice, please contact us using the information below.",
  faxLabel: "Fax",
  agree: "I consent to the collection and use of my personal information.",
  fields: {
    organization: "Organization",
    name: "Contact Name",
    department: "Department / Title",
    phone: "Telephone",
    email: "Email",
    inquiryType: "Inquiry Type",
    endoscope: "Endoscope Type / Channel Size",
    message: "Message",
  },
  emailDomainLabel: "Select email domain",
  emailDomainCustom: "Enter manually",
  selectPrompt: "Please select",
  endoscopePlaceholder: "e.g., Colonoscope · 3.7 mm channel",
} as const;

export const EN_SUPPORTED_PATHS = [
  "/",
  "/products/filter-ball-for-gastroscopes",
  "/products/nolan-ball-3-2mm",
  "/products/filter-ball-for-colonoscopes",
  "/products/endoscopic-valve-port-brush",
  "/about/technology-overview",
  "/how-to-use",
  "/about/certifications",
  "/customer-support/resources-downloads",
  "/about/overview",
  "/about/activities",
  "/about/location",
  "/customer-support/online-inquiry",
] as const;
