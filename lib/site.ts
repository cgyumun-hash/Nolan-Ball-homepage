/**
 * hakambio.com 메인 페이지의 실제 마크업에서 확인한 내용만 담습니다.
 * 출처: index.html · /css/main.css · /css/reset.css · /css/mo_main.css
 *
 * 원본은 같은 메뉴가 GNB · 사이드바 · 푸터 3곳에 하드코딩되어 있고,
 * 그 탓에 한쪽만 "Prouducts" 오타가 남아 있습니다.
 * 여기서는 한 곳에 모아 그런 불일치가 생길 수 없게 합니다.
 */

export const COMPANY = {
  nameEn: "Ha Kam BIO",
  legal: "(주)하캄바이오 hakam Co,. Ltd",
  address:
    "#706, Byucksan E Centum Class One 2nd, 71 Centum-dong, Haeundae-gu, Busan, 48060, South Korea",
  /** 모바일에서 줄바꿈이 사라지도록 두 조각으로 나눠 둡니다 (원본 br.no_br) */
  addressLines: [
    "#706, Byucksan E Centum Class One 2nd, 71 Centum-dong,",
    "Haeundae-gu, Busan, 48060, South Korea",
  ],
  tel: "051-746-7077",
  email: "hakamb@naver.com",
  copyright: "COPYRIGHT 2025 BY Ha Kam BIO Co., Ltd ALL RIGHT RESERVED.",
} as const;

export type NavItem = {
  label: string;
  href: string;
  children: { label: string; href: string }[];
};

/**
 * About Us 하위 5개.
 * GNB · 사이드바 · 푸터 · 서브페이지 탭(.sub_pager)이 모두 이걸 씁니다.
 * 아직 만들지 않은 페이지는 href="#" 로 두어 404 가 나지 않게 합니다.
 */
export const ABOUT_US_PAGES = [
  { label: "Overview", href: "/about/overview" },
  { label: "Technology Overview", href: "/about/technology-overview" },
  { label: "Organization", href: "/about/organization" },
  { label: "Certifications", href: "/about/certifications" },
  { label: "Location & Directions", href: "/about/location" },
] as const;

/** Business Areas 는 하위 항목이 하나뿐입니다 */
export const BUSINESS_PAGES = [
  { label: "Business Areas", href: "/business" },
] as const;

/** Products 하위 5개 */
export const PRODUCTS_PAGES = [
  { label: "ACF Filter Ball Video", href: "/products/acf-filter-ball-video" },
  {
    label: "Filter Ball for Colonoscopes",
    href: "/products/filter-ball-for-colonoscopes",
  },
  {
    label: "Filter Ball for Gastroscopes",
    href: "/products/filter-ball-for-gastroscopes",
  },
  {
    label: "Filter Ball for Bronchoscopes",
    href: "/products/filter-ball-for-bronchoscopes",
  },
  {
    label: "Endoscopic Valve/Port Brush",
    href: "/products/endoscopic-valve-port-brush",
  },
] as const;

export const CUSTOMER_SUPPORT_PAGES = [
  { label: "Notices", href: "/customer-support/notices" },
  {
    label: "Resources & Downloads",
    href: "/customer-support/resources-downloads",
  },
  { label: "Online Inquiry", href: "/customer-support/online-inquiry" },
] as const;

/** 상단 GNB · 좌측 사이드바 · 푸터가 공유합니다 */
export const NAV: NavItem[] = [
  {
    label: "About Us",
    href: "#",
    children: [...ABOUT_US_PAGES],
  },
  {
    label: "Business Areas",
    href: "/business",
    children: [...BUSINESS_PAGES],
  },
  {
    label: "Products",
    href: "/products/acf-filter-ball-video",
    // 원본은 데스크톱 드롭다운에서만 <br> 로 두 줄 처리합니다
    children: [...PRODUCTS_PAGES],
  },
  {
    label: "Customer Support",
    href: "/customer-support/notices",
    children: [...CUSTOMER_SUPPORT_PAGES],
  },
];

/** 언어 선택 (원본은 구글 번역 위젯 · 여기서는 외형만) */
export const LANGS = [
  { code: "ko", label: "KO" },
  { code: "en", label: "EN" },
  { code: "zh-CN", label: "CN" },
  { code: "ja", label: "JP" },
] as const;

/**
 * section_1 — Swiper 슬라이드 3장
 * 원본 h2 는 <br class="mo_br"> 로 줄을 나누고 580px 이하에서 그 br 을 숨깁니다.
 */
export const SLIDES = [
  {
    id: "slide_1",
    lines: ["From Green Innovation to", "Healthy Living"],
    image: "/images/slide_1.jpg",
    /** 사진이 없을 때 대신 보일 배경 */
    fallback: "linear-gradient(115deg, #6b7a3a 0%, #a99b5e 55%, #d8c68a 100%)",
  },
  {
    id: "slide_2",
    lines: ["Science for Clean,", "Health and Earth"],
    image: "/images/slide_2.jpg",
    fallback: "linear-gradient(115deg, #23433a 0%, #4c7a63 55%, #9dc3a4 100%)",
  },
  {
    id: "slide_3",
    lines: ["Redefining Endoscope", "care through science"],
    image: "/images/slide_3.jpg",
    fallback: "linear-gradient(115deg, #1d3345 0%, #3f6c86 55%, #8fb3c6 100%)",
  },
] as const;

/** section_3 — PRODUCTS */
export const PRODUCTS = {
  heading: "PRODUCTS",
  desc: "The Perfect Solution for Cleaning Endoscope Channels",
  cta: "VIEW MORE",
  image: "/images/section_3bg.jpg",
  fallback: "linear-gradient(110deg, #2f4a1f 0%, #6d9440 50%, #b9cf86 100%)",
} as const;

/* ══════════════════════════════════════════════════════════════
   서브페이지
   ══════════════════════════════════════════════════════════════ */

/**
 * .subheader 배경.
 * 원본은 대메뉴별로 .sub01 ~ .sub04 클래스를 바꿔 배경 이미지를 교체합니다.
 */
export const SUBHEADER_BG = {
  sub01: {
    image: "/images/subheader_1.jpg",
    fallback: "linear-gradient(120deg, #12351f 0%, #2f6b3f 55%, #6ba15f 100%)",
  },
  /** Business Areas — subheader_2.jpg (1920×655) */
  sub02: {
    image: "/images/subheader_2.jpg",
    fallback: "linear-gradient(120deg, #14304a 0%, #2f6a86 55%, #74a9b5 100%)",
  },
  /** Products — subheader_3.jpg (1920×655) */
  sub03: {
    image: "/images/subheader_3.jpg",
    fallback: "linear-gradient(120deg, #2a2320 0%, #5d5048 55%, #a2907f 100%)",
  },
  sub04: {
    image: "/images/subheader_4.jpg",
    fallback: "linear-gradient(120deg, #17241b 0%, #435d4b 55%, #8ca391 100%)",
  },
} as const;

/**
 * /sub/sub31.php ~ sub33.php — 필터볼 제품 페이지
 * 세 페이지(대장·위·기관지)가 구조가 같아 데이터만 다릅니다.
 */
export type TextSeg = { t: string; b?: boolean };

export type FilterBall = {
  eyebrow: string;
  title: string;
  /** h6 — 인라인 색상이 제품마다 다릅니다. sub34 에는 이 줄이 없습니다 */
  brand?: string;
  brandColor?: string;
  /** h4 */
  subtitle: string;
  /** 문단 배열 · 문단 안은 세그먼트(b:true 면 굵게) */
  intro: TextSeg[][];
  image: string;
  /** 원본 이미지 실제 크기 — 파일이 없을 때 같은 비율로 자리를 잡습니다 */
  imageWidth: number;
  imageHeight: number;
  features: string[];
  effects: string[];
};

export const FILTER_BALL_ICONS = {
  feature: "/images/subicon_1.png",
  effect: "/images/subicon_2.png",
} as const;

export const FILTER_BALL_COLONOSCOPES: FilterBall = {
  eyebrow: "Products",
  title: "Filter Ball for Colonoscopes",
  brand: "ACF Filter Ball",
  brandColor: "#E84E79",
  subtitle: "for Colonoscopes",
  image: "/images/sub31_img.png",
  imageWidth: 408,
  imageHeight: 408,
  intro: [
    [
      {
        t: "The ACF filter ball for colonoscopy is designed to effectively remove contamination that occurs in deep and long channel structures.",
      },
    ],
    [
      { t: "Its " },
      { t: "activated carbon fiber adsorption power and dimple structure", b: true },
      {
        t: " reduce frictional resistance during cleaning and enhance hydrodynamic energy, enabling ",
      },
      { t: "efficient washing even in narrow channels.", b: true },
    ],
    [
      { t: "In addition, it uses " },
      { t: "eco-friendly materials,", b: true },
      {
        t: " providing a safe cleaning solution for both humans and the environment.",
      },
    ],
  ],
  features: [
    "Precision cleaning design tailored to the structure of colonoscope channels",
    "Dimple structure enhances cleaning efficiency and flow dynamics",
    "Gentle and safe cleaning without the need for brushes",
    "Eco-friendly materials support sustainable infection control",
  ],
  effects: [
    "Improved cleaning quality and prevention of cross-contamination",
    "Extended endoscope lifespan",
    "Establishment of an eco-friendly hospital cleaning system",
  ],
};

/**
 * /sub/sub32.php — Products ▸ Filter Ball for Gastroscopes
 * sub31 과 레이아웃이 완전히 같고 다음만 다릅니다.
 *   h6 색상  #E84E79 → #999
 *   이미지    sub31_img.png → sub32_img.png (둘 다 408×408)
 *   첫 문단 · Features 첫 항목
 */
export const FILTER_BALL_GASTROSCOPES: FilterBall = {
  eyebrow: "Products",
  title: "Filter Ball for Gastroscopes",
  brand: "ACF Filter Ball",
  brandColor: "#999",
  subtitle: "for Gastroscopes",
  image: "/images/sub32_img.png",
  imageWidth: 408,
  imageHeight: 408,
  intro: [
    [
      {
        t: "The ACF filter ball, designed specifically for upper endoscopy, is engineered to fit delicate channel structures and effectively remove proteins and bacteria.",
      },
    ],
    [
      { t: "Its " },
      { t: "activated carbon fiber adsorption power and dimple structure", b: true },
      {
        t: " reduce frictional resistance during cleaning and enhance hydrodynamic energy, enabling ",
      },
      { t: "efficient washing even in narrow channels.", b: true },
    ],
    [
      { t: "In addition, it uses " },
      { t: "eco-friendly materials,", b: true },
      {
        t: " providing a safe cleaning solution for both humans and the environment.",
      },
    ],
  ],
  features: [
    "Precision cleaning design tailored to the structure of upper endoscope channels",
    "Dimple structure enhances cleaning efficiency and flow dynamics",
    "Gentle and safe cleaning without the need for brushes",
    "Eco-friendly materials support sustainable infection control",
  ],
  effects: [
    "Improved cleaning quality and prevention of cross-contamination",
    "Extended endoscope lifespan",
    "Establishment of an eco-friendly hospital cleaning system",
  ],
};

/**
 * /sub/sub33.php — Products ▸ Filter Ball for Bronchoscopes
 * 앞의 두 제품과 달리 본문이 3문단이 아니라 2문단이고,
 * Features · Effects 도 문구가 전부 다릅니다.
 */
export const FILTER_BALL_BRONCHOSCOPES: FilterBall = {
  eyebrow: "Products",
  title: "Filter Ball for Bronchoscopes",
  brand: "ACF Filter Ball",
  brandColor: "#64C5C9",
  subtitle: "for Bronchoscopes",
  image: "/images/sub33_img.png",
  imageWidth: 408,
  imageHeight: 408,
  intro: [
    [
      {
        t: "The ACF filter ball for bronchoscopy is designed to fit the narrow and complex channels of respiratory endoscopes.",
      },
    ],
    [
      { t: "Its " },
      {
        t: "activated carbon fiber provides powerful adsorption, effectively removing",
        b: true,
      },
      { t: " bacteria and protein residues, while " },
      { t: "eco-friendly materials", b: true },
      { t: " reduce waste generation and ensure a safe cleaning environment." },
    ],
  ],
  features: [
    "Stable cleaning performance even in complex channel structures",
    "Powerful adsorption with multi-porous activated carbon fiber",
    "Gentle, brush-free cleaning method",
    "Eco-friendly infection control solution",
  ],
  effects: [
    "Minimization of cross-contamination risk",
    "Improved cleaning quality and prevention of equipment damage",
    "Realization of an eco-friendly hospital system",
  ],
};

/**
 * /sub/sub34.php — Products ▸ Endoscopic Valve/Port Brush
 * 필터볼이 아니라 브러시지만 원본도 .sub31 레이아웃을 그대로 씁니다.
 * 다만 h6(브랜드 줄)이 없고 h4 에 제품명 전체가 들어갑니다.
 * 이미지도 398×298 가로형으로 앞의 세 개(408×408)와 다릅니다.
 */
export const VALVE_PORT_BRUSH: FilterBall = {
  eyebrow: "Products",
  title: "Endoscopic Valve/Port Brush",
  subtitle: "Endoscopic Valve/Port Brush",
  image: "/images/sub34_img.png",
  imageWidth: 398,
  imageHeight: 298,
  intro: [
    [
      { t: "The valve brush is a single-use,", b: true },
      {
        t: " specialized brush developed for precise cleaning of the suction valve and biopsy port areas of endoscopes.",
      },
    ],
    [
      {
        t: "Its delicate brush head and flexible shaft design allow thorough cleaning of narrow areas without causing damage, while the disposable design ensures a hygienic and ",
      },
      { t: "safe infection control environment.", b: true },
    ],
  ],
  features: [
    "Specially designed for suction valves and fine areas",
    "Gentle material for safe cleaning without damage",
    "Hygienic single-use design to minimize the risk of infection",
    "Broad compatibility with major endoscope brands",
  ],
  effects: [
    "Minimizes infection risk and enhances hygiene control",
    "Maintains endoscope performance and longevity",
    "Improves cleaning efficiency and convenience of maintenance",
  ],
};

/** /sub/sub30.php — Products ▸ ACF Filter Ball Video */
export const PRODUCT_VIDEO = {
  eyebrow: "Products",
  title: "ACF Filter Ball Video",
  sectionTitle: "About Filter Ball",
  video: "/images/sub30_video.mp4",
} as const;

/** /sub/sub11.php — About Us ▸ Overview */
export const OVERVIEW = {
  eyebrow: "About Us",
  title: "Overview",
  /** 초록 100px 헤딩 — 원본은 <br class="no_br"> 로 3줄, 980px 이하에서 한 줄로 흐름 */
  headline: ["From Green", "Innovation to", "Healthy Living"],
  paragraphs: [
    "Our ACF filter ball and our patented products currently under research and development (both domestic and PCT patents) are designed to meet global standards such as international environmental management systems and carbon neutrality initiatives.",
    "These products not only contribute to the promotion of public health but also demonstrate that the quality of South Korean medical supplies continues to evolve through innovation and scientific advancement.",
    "We are committed to leading the way in introducing these innovations to the global market.",
  ],
  photo: "/images/sub11_img.jpg",
  photoFallback:
    "linear-gradient(135deg, #1f3d24 0%, #3f7a45 55%, #8bc07a 100%)",
  /** 회사 개요 표 */
  companyTitle: "Company Overview",
  company: [
    { label: "Company Name", value: "Hakam Bio Co., Ltd." },
    { label: "Established", value: "July 10, 2024" },
    { label: "Headquarters", value: "Haeundae-gu, Busan, Korea" },
    {
      label: "Main Business",
      value:
        "Manufacturing and sales of the “ACF Filter Ball” for endoscope channel cleaning",
    },
  ],
  companyBg: "/images/sub11_bg.jpg",
  companyBgFallback:
    "linear-gradient(120deg, #0d2a17 0%, #1e5b30 55%, #35804a 100%)",
} as const;

/** /sub/sub12.php — About Us ▸ Technology Overview */
export const TECHNOLOGY = {
  eyebrow: "About Us",
  title: "Technology Overview",
  /** 원본 .text — 좌우에 84×53 아이콘, 가운데 40px 헤딩 */
  headline: [
    "Introduction of ACF Filter Ball Research",
    "and Development Team",
  ],
  icons: ["/images/sub12_icon1.png", "/images/sub12_icon2.png"],
  /** 원본은 <br><br> 로 두 문단 */
  lead: [
    "HaKamBio is realizing innovation in endoscopic cleaning with the world’s first activated carbon fiber ACF Filter Ball.",
    "By applying activated carbon fiber and ribbed structural technology, it maximizes cleaning efficiency while providing a safe and eco-friendly infection-control solution.",
  ],
  /** 화면 전체 폭 주황 밴드 */
  bandTitle: "Development Technology",
  /**
   * 연도별 개발 기술.
   * side "left"  = .ul_1 (이미지 왼쪽)
   * side "right" = .ul_2 (이미지 오른쪽 · justify-content:space-between)
   */
  timeline: [
    {
      year: "2019",
      side: "left",
      image: "/images/sub12_1.png",
      items: ["Carbon heater boiler", "Carbon heating system"],
    },
    {
      year: "2022",
      side: "right",
      image: "/images/sub12_2.png",
      items: [
        "CNT Flashable Surface Heating Body",
        "CNT High Temperature (110°C) Surface Film",
        "An air sterilizing warmer",
        "Refractory Filling Structure Filling Material with Expansion Graphite",
      ],
    },
    {
      year: "2023",
      side: "left",
      image: "/images/sub12_1.png",
      items: [
        "Fireproof coating with carbon material Dry heating flooring",
        "Refractory Filling Structure Filling Material with Expansion Graphite",
        "CNT + Silicon Dispersion High Temperature Heating Composite Material",
      ],
    },
    {
      year: "2024",
      side: "right",
      image: "/images/sub12_2.png",
      items: [
        "ACF Filter Ball",
        "Activated carbon cleaning cloth",
        "CNT Electrode Window Pad",
      ],
    },
  ],
} as const;

/**
 * /sub/sub21.php — Business Areas
 *
 * 본문은 원본이 <p> 하나 안에서 <br> 로 줄을 나눕니다.
 *   <br><br>            문단 구분  → 아래 배열의 바깥 단계
 *   <br>                줄바꿈     → 안쪽 배열
 *   <br class="no_br">  1600px 이하에서 숨김 → 재현하지 않았습니다
 */
export const BUSINESS = {
  title: "Business Areas",
  leadTitle: "Eco-Friendly Innovation in Medical Care",
  leadText:
    "Hakam Bio is committed to safer, greener healthcare through sustainable materials and smart design.",
  items: [
    {
      no: "01.",
      name: "Heat-resistant endoscopic cap",
      quote:
        "“ It disperses the high heat generated by the endoscopic light, reducing the risk of organ damage to the patient. ”",
      image: "/images/sub21_1.jpg",
      /** false = 이미지 왼쪽 · true = .left (이미지 오른쪽) */
      reversed: false,
      body: [
        [
          "The light source at the distal tip of an endoscope can generate heat of approximately 70°C, posing a risk of burns or damage to the mucosal tissue of internal organs.",
        ],
        [
          "To prevent this, medical professionals have had to continuously move the endoscope, causing discomfort and inconvenience during examinations and procedures.",
        ],
        [
          "HacamBio's High Heat-Resistant Endoscopic Cap is a device mounted on the tip of the endoscope that effectively disperses heat.",
          "By evenly distributing high temperatures and lowering the surface heat, it helps minimize the risk of thermal injury to organs and ensures safety even during prolonged examinations or complex procedures.",
        ],
        [
          "Patients can feel more at ease, while healthcare professionals benefit from reduced need for unnecessary manipulations, leading to a more efficient clinical environment.",
        ],
        [
          "This innovative thermal safety solution offers both enhanced patient protection and improved convenience for medical staff.",
        ],
      ],
    },
    {
      no: "02.",
      name: "ACF Filter Ball",
      quote:
        "“ An innovative solution that blocks infections and reduces medical waste through powerful adsorption-based cleaning. ”",
      image: "/images/sub21_2.jpg",
      reversed: true,
      body: [
        [
          "The safety of endoscopic procedures is only fully ensured through proper post-use cleaning.",
          "However, traditional brush-based cleaning methods can damage the inner walls of the endoscope and often fail to completely remove blood and protein residues.",
        ],
        [
          "This can lead to the formation of biofilms—a serious issue in which microorganisms adhere to surfaces and create a hardened protective layer that cannot be removed with standard brushes.",
        ],
        [
          "The ACF Filter Ball is a spherical cleaning consumable made from Activated Carbon Fiber (ACF).",
        ],
        [
          "Its unique groove structure and strong adsorption properties allow it to effectively remove contaminants from within endoscope channels.",
          "It has been proven to achieve over 95% protein removal and 99.9% bacterial reduction, providing reliable cleaning without damaging the channel.",
        ],
        [
          "In addition, the ACF Filter Ball significantly reduces cleaning time, easing the burden on medical staff. Compared to conventional brushes, it can reduce medical waste by over 65 tons annually.",
          "This next-generation endoscope cleaning solution delivers enhanced patient safety, infection prevention, and environmental sustainability—all at once.",
        ],
      ],
    },
    {
      no: "03.",
      name: "Endoscope Valve Cleaning Brush",
      /** 원본에는 "clean<" 처럼 여는 꺾쇠가 잘못 남아 있습니다 (오타로 보여 제외) */
      quote:
        "“ A specialized brush designed to thoroughly clean even the narrow and complex endoscope valve channels. ”",
      image: "/images/sub21_3.jpg",
      reversed: false,
      body: [
        [
          "One of the most challenging parts of endoscope cleaning is the narrow and complex structure of the valve channel.",
        ],
        [
          "Residual blood or protein in these areas can increase the risk of infection and compromise device performance.",
        ],
        [
          "Hakambio's Endoscope Cleaning Midsole is a specialized valve brush designed to address this issue.",
          "Its flexible yet firm bristles effectively remove residual contaminants without damaging the delicate internal surfaces of the valve.",
        ],
        [
          "The ergonomically designed handle ensures ease of use and better grip during cleaning procedures.",
          "The brush is single-use, enhancing hygiene and supporting infection control protocols.",
          "With compatibility across a wide range of endoscope models, it is suitable for use in hospitals and endoscopy centers alike.",
        ],
        [
          "This essential cleaning tool contributes to both patient safety and clinical efficiency, making it a valuable solution in modern endoscope reprocessing.",
        ],
      ],
    },
    {
      no: "04.",
      name: "Biodegradable medical device",
      quote:
        "“ An eco-friendly medical device that naturally decomposes after use, minimizing environmental impact. ”",
      image: "/images/sub21_4.jpg",
      reversed: true,
      body: [
        [
          "Most single-use plastic medical devices used in hospitals cannot be recycled due to infection risks and are therefore incinerated or landfilled.",
          "This results in significant disposal costs and environmental burdens.",
        ],
        [
          "HacamBio is addressing this issue by developing biodegradable plastic medical devices.",
          "These products use materials that naturally decompose when buried in soil after use, maintaining the same performance and safety standards as conventional medical devices while fundamentally reducing waste problems.",
        ],
        [
          "This approach not only lowers medical waste disposal costs but also contributes to reducing carbon emissions.",
        ],
        [
          "Biodegradable medical devices represent a sustainable choice that protects patient safety while promoting environmental conservation, setting a new standard for the future of eco-friendly healthcare.",
        ],
      ],
    },
  ],
} as const;

/** /sub/sub15.php — About Us ▸ Location & Directions */
export const LOCATION = {
  eyebrow: "About Us",
  title: "Location & Directions",
  officeTitle: "Head office",
  officeAddress:
    "Room 706, 71 Centumdong-ro, Haeundae-gu, Busan, 48058, Republic of Korea",
  /**
   * 카카오맵 "지도 퍼가기" 임베드 값 (원본 sub15.php 의 실행 스크립트).
   * 이 키는 하캄바이오가 등록한 장소를 가리킵니다.
   * 직접 배포하실 거면 https://map.kakao.com 에서 본인 장소로 새로 발급하세요.
   */
  map: {
    timestamp: "1758100857535",
    key: "wgda2t8mv3n",
    height: "579",
  },
  transitTitle: "Public Transit",
  transit: [
    {
      icon: "/images/icon_1.png",
      label: "Subway",
      lines: [
        {
          text: "Take Line 2 and get off at Centum City Station. Use Exit 3 and walk approximately 250 meters.",
        },
      ],
    },
    {
      icon: "/images/icon_2.png",
      label: "Bus stop",
      lines: [
        { bold: "Bus No. 115 : ", text: "Get off at Sejong Telecom bus stop." },
        {
          bold: "Bus No. 181, 307 : ",
          text: "Get off at SK Telecom bus stop. (Approx. 200 meters on foot)",
        },
        {
          bold: "Bus No. 100-1, 155, 200, 31, 5-1, 115, 100 : ",
          /** 원본은 이 줄만 span 에 .lh50 을 주고 <br> 로 줄을 나눕니다 */
          wide: true,
          text: "Get off at Centum High School bus stop. (Approx. 260 meters on foot)",
        },
      ],
    },
  ],
} as const;

/**
 * /sub/sub14.php — About Us ▸ Certifications
 * 인증서 이미지는 모두 406×550 (세로형)입니다.
 * hover 하면 rgba(0,0,0,.8) 오버레이 위에 제목이 뜹니다 (순수 CSS).
 */
export const CERTIFICATIONS = {
  eyebrow: "About Us",
  title: "Certifications",
  items: [
    { image: "/images/sub14_1.jpg", label: "Certificate of In-House Research Institute" },
    { image: "/images/sub14_2.jpg", label: "Patent Certificate for Activated Carbon Ball" },
    { image: "/images/sub14_3.jpg", label: "Patent Certificate for Dimple" },
    { image: "/images/sub14_4.jpg", label: "Certificate of Startup Enterprise" },
    {
      image: "/images/sub14_5.jpg",
      label: "Test Report on Bacterial Reduction Rate of Activated Carbon",
    },
    { image: "/images/sub14_6.jpg", label: "Test Report on Activated Carbon Fiber" },
    { image: "/images/sub14_7.jpg", label: "Certificate of Venture Enterprise" },
    { image: "/images/sub14_8.jpg", label: "Certificate of ESG Self-Assessment" },
    { image: "/images/sub14_9.jpg", label: "PCT Application 1/4" },
    { image: "/images/sub14_10.jpg", label: "PCT Application 2/4" },
    { image: "/images/sub14_11.jpg", label: "PCT Application 3/4" },
    { image: "/images/sub14_12.jpg", label: "PCT Application 4/4" },
  ],
} as const;

/** /sub/sub13.php — About Us ▸ Organization */
export const ORGANIZATION = {
  eyebrow: "About Us",
  title: "Organization",
  /** 원본 h4 — 앞부분만 주황색 40px 굵게 (span) */
  leadHighlight: "HAKAM Bio's",
  leadRest:
    " streamlined organizational structure supports our commitment to delivering advanced medical solutions through precise R&D, quality manufacturing, and global partnerships.",
  /** 조직도 이미지 — 520px 이하에서 모바일용으로 교체됩니다 */
  chartPc: "/images/sub13_w1.png",
  chartMo: "/images/sub13_w2.png",
} as const;

/** section_4 — ABOUT HAKAM BIO (원문 그대로) */
export const ABOUT = {
  paragraphs: [
    "Our ACF filter ball and our patented products currently under research and development (both domestic and PCT patents) are designed to meet global standards such as international environmental management systems and carbon neutrality initiatives.",
    "These products not only contribute to the promotion of public health but also demonstrate that the quality of South Korean medical supplies continues to evolve through innovation and scientific advancement.",
    "We are committed to leading the way in introducing these innovations to the global market.",
  ],
  cta: "VIEW MORE",
  image: "/images/section_4bg.jpg",
  fallback: "linear-gradient(150deg, #1f2f3d 0%, #4a6b7a 60%, #8fb56a 100%)",
} as const;
