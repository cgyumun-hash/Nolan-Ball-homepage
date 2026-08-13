/**
 * 사이트 문구를 한곳에 모읍니다.
 *
 * 레이아웃·구조는 hakambio.com 마크업을 그대로 따르고(출처: index.html ·
 * /css/main.css · /css/reset.css · /css/mo_main.css), 내용만 놀란볼코리아로
 * 교체합니다. 원본은 같은 메뉴가 GNB · 사이드바 · 푸터 3곳에 하드코딩되어
 * 있었고 그 탓에 한쪽만 "Prouducts" 오타가 남아 있었습니다.
 *
 * 문구 출처: 자료넣기/놀란볼코리아_홈페이지_콘텐츠_자료정리.md
 */

export const COMPANY = {
  nameEn: "Nolan Ball Korea",
  legal: "놀란볼코리아 Nolan Ball Korea",
  address:
    "부산광역시 금정구 서부곡로 16번길 8-1, 알찬빌딩 1층",
  /** 모바일에서 줄바꿈이 사라지도록 두 조각으로 나눠 둡니다 (원본 br.no_br) */
  addressLines: [
    "부산광역시 금정구 서부곡로 16번길 8-1,",
    "알찬빌딩 1층",
  ],
  tel: "051-516-5064",
  fax: "051-516-5065",
  email: "Nolan5000@naver.com",
  copyright: "COPYRIGHT 2026 BY Nolan Ball Korea ALL RIGHT RESERVED.",
} as const;

/** 온라인 문의 전송 상태 문구 */
export const INQUIRY_FORM_MESSAGES = {
  submit: "문의하기",
  submitting: "전송 중...",
  success: "문의가 접수되었습니다. 담당자가 확인 후 연락드리겠습니다.",
  failure: "문의 전송에 실패했습니다. 잠시 후 다시 시도하거나 대표 이메일로 문의해 주세요.",
} as const;

/** 자료정리 5-3 — 문의 유형 */
export const INQUIRY_TYPES = [
  "제품",
  "샘플",
  "견적",
  "유통·대리점",
  "해외 수출",
] as const;

export type NavItem = {
  label: string;
  href: string;
  children: { label: string; href: string }[];
};

/**
 * 상단 메뉴는 MAIN · PRODUCT · TECHNOLOGY · RESOURCES · COMPANY 5개로 구성합니다.
 * HOW TO USE는 PRODUCT에 포함합니다.
 * GNB · 사이드바 · 푸터 · 서브페이지 탭(.sub_pager)이 모두 아래를 씁니다.
 * 라우트는 하캄바이오 구조를 최대한 재사용해 페이지 이동을 최소화했습니다.
 * (신규 라우트는 /how-to-use 하나뿐입니다.)
 *
 * md 1-2 에 없어 메뉴에서 뺀 페이지: /business, /about/organization,
 * /customer-support/notices — 파일은 남아 있지만 링크되지 않습니다.
 */

/** PRODUCT — 자료정리 3-3 제품 규격 기준. 출시 3종 + 보류 2개 */
export const PRODUCTS_PAGES = [
  {
    label: "위 내시경용 2.8mm",
    href: "/products/filter-ball-for-gastroscopes",
  },
  {
    label: "대장 내시경용 3.7mm",
    href: "/products/filter-ball-for-colonoscopes",
  },
  {
    label: "기관지 내시경용 2.8mm",
    href: "/products/filter-ball-for-bronchoscopes",
  },
  { label: "HOW TO USE", href: "/how-to-use" },
  { label: "제품 영상", href: "/products/acf-filter-ball-video" },
] as const;

/** RESOURCES — 시험·데이터와 다운로드 자료를 한곳에 모읍니다. */
export const RESOURCES_PAGES = [
  { label: "시험 결과·성적서", href: "/about/certifications" },
  { label: "자료 다운로드", href: "/customer-support/resources-downloads" },
] as const;

/** COMPANY — 회사 정보와 문의 */
export const COMPANY_PAGES = [
  { label: "회사소개", href: "/about/overview" },
  { label: "오시는 길", href: "/about/location" },
  { label: "온라인 문의", href: "/customer-support/online-inquiry" },
] as const;

/** 메뉴에서 제외된 이전 페이지와의 호환용 목록 */
export const ABOUT_CONTACT_PAGES = COMPANY_PAGES;

/** 서브페이지 탭(.sub_pager)이 단독 페이지에서도 필요해 배열로 둡니다 */
export const TECHNOLOGY_PAGES = [
  { label: "기술 개요", href: "/about/technology-overview" },
] as const;

/** 상단 GNB · 좌측 사이드바 · 푸터가 공유합니다 */
export const NAV: NavItem[] = [
  { label: "MAIN", href: "/", children: [] },
  {
    label: "PRODUCT",
    href: "/products/filter-ball-for-gastroscopes",
    children: [...PRODUCTS_PAGES],
  },
  {
    label: "TECHNOLOGY",
    href: "/about/technology-overview",
    children: [],
  },
  {
    label: "RESOURCES",
    href: "/about/certifications",
    children: [...RESOURCES_PAGES],
  },
  {
    label: "COMPANY",
    href: "/about/overview",
    children: [...COMPANY_PAGES],
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
    lines: ["내시경 세척의 새로운 기준", "Nolan Ball"],
    image: "/images/main/1.webp",
    /** 사진이 없을 때 대신 보일 배경 */
    fallback: "linear-gradient(115deg, #0b3261 0%, #217fc1 55%, #8ed7f2 100%)",
  },
  {
    id: "slide_2",
    lines: ["내시경 세척의", "새로운 혁신을 제공합니다"],
    image: "/images/main/3.webp",
    fallback: "linear-gradient(115deg, #092c52 0%, #1c6fa8 55%, #8bc9e8 100%)",
  },
  {
    id: "slide_3",
    lines: ["세척을 넘어", "책임과 협력으로 신뢰를 이어갑니다"],
    image: "/images/main/4.webp",
    fallback: "linear-gradient(115deg, #1d3345 0%, #3f6c86 55%, #8fb3c6 100%)",
  },
] as const;

/** section_3 — PRODUCTS. cta 를 누르면 첫 제품 페이지로 갑니다 */
export const PRODUCTS = {
  heading: "PRODUCTS",
  desc: "내시경 채널 세척을 위한 일회용 솔루션",
  cta: "제품 알아보기",
  href: "/products/filter-ball-for-gastroscopes",
  image: "/images/main/6.webp",
  fallback: "linear-gradient(110deg, #071f3d 0%, #145f9c 50%, #73bde5 100%)",
} as const;

/** section_2 — Why Nolan Ball? (원본 .section_2) */
export const WHY = {
  headingLines: ["Why", "Nolan Ball?"],
  cta: "VIEW MORE",
  href: "/about/technology-overview",
} as const;

/**
 * 히어로 아래 버튼 3개 — 자료정리 2-1.
 * 원본 하캄바이오에는 없던 영역이라 슬라이드 하단에 새로 얹었습니다.
 */
export const HERO_ACTIONS: {
  label: string;
  href: string;
  /** true 면 주황 채움 버튼, 아니면 흰 테두리 버튼 */
  primary?: boolean;
}[] = [
  { label: "제품 알아보기", href: "/products/filter-ball-for-gastroscopes", primary: true },
  { label: "자료 다운로드", href: "/customer-support/resources-downloads" },
  { label: "도입·샘플 문의", href: "/customer-support/online-inquiry" },
];

/**
 * 메인 핵심 장점 4개 — 자료정리 2-2 원문 그대로.
 * 4-3 표현 수위에 따라 "10초"는 "회사 자료 기준"이라는 단서를 붙여 씁니다.
 */
export const KEY_BENEFITS = {
  heading: "4대 핵심 장점",
  keyMessage: "사용자의 숙련도와 관계없이 빠르고 균일한 고품질 세척을 제공합니다.",
  supportingText: "Nolan Ball은 내시경 채널 내벽에 360° 밀착하여 혈액, 점액, 단백질 등 잔류 오염물의 물리적 제거를 돕는 일회용 채널 세척 솔루션입니다.",
  items: [
    {
      no: "01",
      title: "360° 밀착 접촉",
      body: "채널 내벽 전면에 연속적으로 접촉하여 세척 사각지대를 줄이는 구조입니다.",
    },
    {
      no: "02",
      title: "빠른 세척 공정",
      body: "회사 자료 기준 약 10초의 짧은 공정으로 세척 업무의 효율 향상을 지원합니다.",
    },
    {
      no: "03",
      title: "균일한 세척 성능",
      body: "사용자의 숙련도에 따른 편차를 줄여 일관된 세척 결과를 지원합니다.",
    },
    {
      no: "04",
      title: "일회용 관리",
      body: "수분 반응형 비가역 변색 구조를 통해 사용 여부를 직관적으로 확인하도록 설계되었습니다.",
    },
  ],
  image: "/images/main/11.webp",
  imageAlt: "Nolan Ball 내시경 채널 세척 제품",
} as const;

/**
 * 제품 규격 — 자료정리 3-3 "현재 자료 기준" 표 그대로.
 *
 * ⚠️ md 3-3 확인 필요: 최근 포장 시안과 기존 카탈로그의 포장단위가 다를 수 있어
 *    100 pcs/pack 또는 500 pcs 중 최종 단위를 확인해야 합니다.
 *    제품코드·법적 분류도 미확정이라 표에 넣지 않았습니다.
 */
export const PRODUCT_SPECS = {
  heading: "제품 규격",
  columns: ["구분", "용도", "규격", "상태", "포장단위"] as const,
  rows: [
    { use: "위 내시경", purpose: "전용", spec: "2.8 mm", status: "출시", pack: "500 pcs" },
    { use: "대장 내시경", purpose: "전용", spec: "3.7 mm", status: "출시", pack: "500 pcs" },
    { use: "기관지 내시경", purpose: "전용", spec: "2.8 mm", status: "출시", pack: "500 pcs" },
    { use: "ERCP", purpose: "전용", spec: "—", status: "출시 예정", pack: "—" },
    { use: "비뇨 내시경", purpose: "전용", spec: "—", status: "출시 예정", pack: "—" },
  ],
  note: "포장단위와 제품코드는 최종 확정 전이므로 실제 발주 전 담당자에게 확인해 주세요.",
} as const;

/** 시험 결과 요약 — 자료정리 4-1 표 그대로 */
export const TEST_SUMMARY = {
  heading: "시험 결과 요약",
  rows: [
    { label: "시험기관", value: "씨젠의료재단 씨젠의원" },
    { label: "시험 유형", value: "일반세균배양(MIC, 기타검체)" },
    { label: "결과 표현", value: "2일 배양 후 미생물 증식 없음(No growth)" },
    { label: "보고일", value: "2026.02.27 / 2026.03.16 / 2026.03.18" },
    { label: "시료", value: "2.8 mm · 3.7 mm 관련 시료 (구형·와플형 포함) 총 9건" },
  ],
  /** md 4-1 "필수 표기" */
  disclaimer:
    "시험 조건과 시료 정보에 따라 결과가 달라질 수 있으며, 상세 내용은 시험성적서 원문을 참조해 주세요.",
} as const;

/**
 * DOWNLOAD — 자료정리 6장 "기존 자료의 홈페이지 배치 계획".
 *
 * ready:false 인 항목은 md 가 지정한 "공개 전 조치"가 아직 끝나지 않은 자료입니다.
 * 조치가 끝나면 파일을 public/downloads/ 에 넣고 ready:true 로 바꾸세요.
 */
export const DOWNLOADS = {
  heading: "자료 다운로드",
  items: [
    {
      name: "Nolan Ball 카탈로그",
      desc: "제품 개요, 규격표, 핵심 장점",
      file: "/downloads/nolan-ball-catalog.pdf",
      size: "19.8 MB",
      ready: true,
    },
    {
      name: "Nolan Ball 제품소개서",
      desc: "제품 구조(Micro-Anatomy), 세정 메커니즘",
      file: "/downloads/nolan-ball-product-guide.pdf",
      size: "28.9 MB",
      ready: true,
    },
    {
      name: "미생물검사 결과보고서",
      desc: "씨젠의료재단 일반세균배양 시험성적서 9건",
      file: "/downloads/nolan-ball-test-report.pdf",
      size: "2.7 MB",
      /** md 6장 공개 전 조치: "개인·기관 정보 공개 범위 확인" — 미완료 */
      ready: false,
      pending: "검사기관 담당자 실명·서명이 포함되어 있어 공개 범위 확인 후 게시합니다.",
    },
    {
      name: "사용설명서 (IFU)",
      desc: "단계별 사용 순서와 주의사항",
      file: "",
      size: "—",
      /** md 3-4 주의: 최종 IFU 원문 미확보 */
      ready: false,
      pending: "최종 사용설명서(IFU) 원문이 확보되면 게시합니다.",
    },
  ],
  note: "자료는 예고 없이 개정될 수 있습니다. 최신본이 필요하시면 문의해 주세요.",
} as const;

/* ══════════════════════════════════════════════════════════════
   서브페이지
   ══════════════════════════════════════════════════════════════ */

/**
 * .subheader 배경.
 * 원본은 대메뉴별로 .sub01 ~ .sub04 클래스를 바꿔 배경 이미지를 교체합니다.
 */
/**
 * ⚠️ 배너 사진은 현재 전부 비워 둔 상태입니다 (image: "").
 *
 * 제품 렌더·도해를 배너 배경으로 넣어 봤더니 배경이 밝아 흰색 제목이 묻히고
 * 제품 이미지가 잘려 보여서 뺐습니다. 지금은 아래 그라디언트만 나옵니다.
 *
 * 나중에 배너 전용 사진이 준비되면
 *   1) public/images/ 에 1920×655 (권장 2배 3840×1310) 로 넣고
 *   2) 아래 image 에 "/images/파일명.jpg" 를 적으면 바로 반영됩니다.
 * SubHeader 는 image 가 빈 문자열이면 사진 레이어를 아예 그리지 않습니다.
 *
 * 배너 사진 고를 때: 제목이 왼쪽에 흰색으로 얹히므로 왼쪽 절반이 어두워야 읽힙니다.
 */
export const SUBHEADER_BG = {
  /** COMPANY */
  company: {
    image: "/images/company/3.webp",
    position: "center 25%",
    overlay: "linear-gradient(90deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.10) 52%, rgba(0,0,0,0.07) 100%)",
    fallback: "linear-gradient(120deg, #173247 0%, #47758f 55%, #9bc2d2 100%)",
  },
  /** RESOURCES */
  resources: {
    image: "/images/resources/1.webp",
    position: "center 66%",
    selectiveBlur: true,
    fallback: "linear-gradient(120deg, #163247 0%, #3c7189 55%, #8cb4c1 100%)",
  },
  /** PRODUCT */
  product: {
    image: "/images/product/1.webp",
    position: "center 56%",
    fallback: "linear-gradient(120deg, #061b2d 0%, #0d4e74 55%, #258eac 100%)",
  },
  /** TECHNOLOGY */
  technology: {
    image: "/images/technology/1.webp",
    fallback: "linear-gradient(120deg, #102c4a 0%, #285d8c 55%, #6aa2c8 100%)",
  },
  /** TEST & DATA · ABOUT / CONTACT */
  sub01: {
    image: "",
    fallback: "linear-gradient(120deg, #0b2c55 0%, #1667a5 55%, #73bde5 100%)",
  },
  /** (현재 메뉴에서 빠진 사업분야 페이지가 씁니다) */
  sub02: {
    image: "",
    fallback: "linear-gradient(120deg, #14304a 0%, #2f6a86 55%, #74a9b5 100%)",
  },
  /** PRODUCT · HOW TO USE */
  sub03: {
    image: "",
    fallback: "linear-gradient(120deg, #2a2320 0%, #5d5048 55%, #a2907f 100%)",
  },
  /** DOWNLOAD */
  sub04: {
    image: "",
    fallback: "linear-gradient(120deg, #0a2947 0%, #275f8f 55%, #8fbcd8 100%)",
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
  feature: "/images/subicon_1.webp",
  effect: "/images/subicon_2.webp",
} as const;

/**
 * 세 제품의 본문은 자료정리 3-1(제품 개요) · 3-2(구조적 특징) · 2-2(핵심 장점)에서
 * 가져왔습니다. 규격·용도만 제품별로 다르고 나머지는 공통입니다.
 *
 * 자료정리 4-3(표현 수위 검토)에 따라 "완전 세척", "미세균 사멸",
 * "바이오필름 완전 차단", "감염 예방 보장", "멸균·소독" 표현은 쓰지 않습니다.
 */
export const FILTER_BALL_COLONOSCOPES: FilterBall = {
  eyebrow: "PRODUCT",
  title: "대장 내시경용 3.7mm",
  brand: "Nolan Ball",
  brandColor: "#E84E79",
  subtitle: "대장 내시경 전용 · 3.7 mm",
  image: "/images/sub31_img.webp",
  imageWidth: 408,
  imageHeight: 408,
  intro: [
    [
      {
        t: "대장 내시경 전용 Nolan Ball 은 길고 굴곡이 많은 채널 구조에 맞춰 설계된 3.7 mm 규격의 일회용 채널 세척 볼입니다.",
      },
    ],
    [
      { t: "채널 내벽과의 " },
      { t: "360° 접촉과 연속 와이핑", b: true },
      {
        t: " 을 통해 혈액·점액·단백질 등 잔류 오염물의 ",
      },
      { t: "물리적 제거를 돕습니다.", b: true },
    ],
    [
      { t: "굴곡부를 통과하면서도 접촉을 유지하도록 설계되어 " },
      { t: "사용자의 숙련도에 따른 편차를 줄이고,", b: true },
      {
        t: " 보다 균일한 수동 세척 공정을 지원합니다.",
      },
    ],
  ],
  features: [
    "미세 돌기 구조 — 채널 내벽에 접촉해 부착된 오염물의 물리적 제거를 돕습니다",
    "연속 띠 구조 — 이동 과정에서 연속적인 와이핑 작용이 이어지도록 설계되었습니다",
    "비대칭 마찰 구조 — 이동 시 회전을 유도하여 내벽과의 접촉 범위를 넓힙니다",
    "유연한 탄성 구조 — 굴곡부를 통과하면서도 내벽과의 접촉을 유지합니다",
  ],
  effects: [
    "360° 밀착 접촉으로 세척 사각지대를 줄이는 구조",
    "짧은 공정으로 세척 업무의 효율 향상을 지원",
    "숙련도에 따른 편차를 줄여 일관된 세척 결과를 지원",
    "수분 반응형 비가역 변색 구조로 사용 여부를 직관적으로 확인",
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
  eyebrow: "PRODUCT",
  title: "위 내시경용 2.8mm",
  brand: "Nolan Ball",
  brandColor: "#999",
  subtitle: "위 내시경 전용 · 2.8 mm",
  image: "/images/sub32_img.webp",
  imageWidth: 408,
  imageHeight: 408,
  intro: [
    [
      {
        t: "위 내시경 전용 Nolan Ball 은 상부 소화관 내시경의 채널 구조에 맞춰 설계된 2.8 mm 규격의 일회용 채널 세척 볼입니다.",
      },
    ],
    [
      { t: "채널 내벽과의 " },
      { t: "360° 접촉과 연속 와이핑", b: true },
      {
        t: " 을 통해 혈액·점액·단백질 등 잔류 오염물의 ",
      },
      { t: "물리적 제거를 돕습니다.", b: true },
    ],
    [
      { t: "굴곡부를 통과하면서도 접촉을 유지하도록 설계되어 " },
      { t: "사용자의 숙련도에 따른 편차를 줄이고,", b: true },
      {
        t: " 보다 균일한 수동 세척 공정을 지원합니다.",
      },
    ],
  ],
  features: [
    "미세 돌기 구조 — 채널 내벽에 접촉해 부착된 오염물의 물리적 제거를 돕습니다",
    "연속 띠 구조 — 이동 과정에서 연속적인 와이핑 작용이 이어지도록 설계되었습니다",
    "비대칭 마찰 구조 — 이동 시 회전을 유도하여 내벽과의 접촉 범위를 넓힙니다",
    "유연한 탄성 구조 — 굴곡부를 통과하면서도 내벽과의 접촉을 유지합니다",
  ],
  effects: [
    "360° 밀착 접촉으로 세척 사각지대를 줄이는 구조",
    "짧은 공정으로 세척 업무의 효율 향상을 지원",
    "숙련도에 따른 편차를 줄여 일관된 세척 결과를 지원",
    "수분 반응형 비가역 변색 구조로 사용 여부를 직관적으로 확인",
  ],
};

/**
 * /sub/sub33.php — Products ▸ Filter Ball for Bronchoscopes
 * 앞의 두 제품과 달리 본문이 3문단이 아니라 2문단이고,
 * Features · Effects 도 문구가 전부 다릅니다.
 */
export const FILTER_BALL_BRONCHOSCOPES: FilterBall = {
  eyebrow: "PRODUCT",
  title: "기관지 내시경용 2.8mm",
  brand: "Nolan Ball",
  brandColor: "#64C5C9",
  subtitle: "기관지 내시경 전용 · 2.8 mm",
  image: "/images/sub33_img.webp",
  imageWidth: 408,
  imageHeight: 408,
  intro: [
    [
      {
        t: "기관지 내시경 전용 Nolan Ball 은 좁고 복잡한 호흡기 내시경 채널에 맞춰 설계된 2.8 mm 규격의 일회용 채널 세척 볼입니다.",
      },
    ],
    [
      { t: "채널 내벽과의 " },
      {
        t: "360° 접촉과 연속 와이핑",
        b: true,
      },
      { t: " 을 통해 잔류 오염물의 물리적 제거를 돕고, " },
      { t: "굴곡부에서도 접촉을 유지하도록", b: true },
      { t: " 설계되어 균일한 수동 세척 공정을 지원합니다." },
    ],
  ],
  features: [
    "미세 돌기 구조 — 채널 내벽에 접촉해 부착된 오염물의 물리적 제거를 돕습니다",
    "연속 띠 구조 — 이동 과정에서 연속적인 와이핑 작용이 이어지도록 설계되었습니다",
    "비대칭 마찰 구조 — 이동 시 회전을 유도하여 내벽과의 접촉 범위를 넓힙니다",
    "유연한 탄성 구조 — 굴곡부를 통과하면서도 내벽과의 접촉을 유지합니다",
  ],
  effects: [
    "360° 밀착 접촉으로 세척 사각지대를 줄이는 구조",
    "짧은 공정으로 세척 업무의 효율 향상을 지원",
    "숙련도에 따른 편차를 줄여 일관된 세척 결과를 지원",
    "수분 반응형 비가역 변색 구조로 사용 여부를 직관적으로 확인",
  ],
};

/**
 * /sub/sub34.php — Products ▸ Endoscopic Valve/Port Brush
 * 필터볼이 아니라 브러시지만 원본도 .sub31 레이아웃을 그대로 씁니다.
 * 다만 h6(브랜드 줄)이 없고 h4 에 제품명 전체가 들어갑니다.
 * 이미지도 398×298 가로형으로 앞의 세 개(408×408)와 다릅니다.
 */
/* ⚠️ 보류 — 놀란볼코리아 자료정리 문서에 이 제품에 대한 내용이 없습니다.
   본문은 하캄바이오 원문 그대로이며 아직 교체되지 않았습니다.
   제품 자료가 확보되면 위 세 제품과 같은 방식으로 교체하세요. */
export const VALVE_PORT_BRUSH: FilterBall = {
  eyebrow: "PRODUCT",
  title: "밸브·포트 브러시",
  subtitle: "Endoscopic Valve/Port Brush",
  image: "/images/sub34_img.webp",
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

/**
 * /sub/sub30.php — 제품소개 ▸ 제품 영상
 * 영상 파일(sub30_video.mp4)은 아직 없습니다. 자료정리 3-4 에 따라
 * 제품 가이드 영상을 확보하면 public/images/ 에 넣으세요.
 */
export const PRODUCT_VIDEO = {
  eyebrow: "PRODUCT",
  title: "제품 영상",
  sectionTitle: "Nolan Ball 알아보기",
  video: "/images/sub30_video.mp4",
} as const;

/** /sub/sub11.php — About Us ▸ Overview */
export const OVERVIEW = {
  eyebrow: "COMPANY",
  title: "회사소개",
  introTitle: "내시경 세척의 새로운 기준을 만듭니다",
  intro: [
    "놀란볼코리아(Nolan Ball Korea)는 내시경 세척볼 Nolan Ball을 중심으로 내시경 재처리 현장의 효율성과 세척 결과의 일관성을 높이는 위생 소모품을 개발하는 전문 기업입니다.",
    "대표 제품 Nolan Ball은 기존 브러시 기반 세척 방식의 구조적 한계를 보완하기 위해 채널 내벽에 360°로 접촉하는 구조와 연속 와이핑·오염물 밀어내기 메커니즘을 적용했습니다.",
    "유연한 볼 구조가 굴곡진 채널을 따라 이동하면서 혈액·점액·단백질 등 잔류 오염물의 물리적 제거를 돕고, 작업자의 숙련도에 따른 세척 편차와 사각지대를 줄여 보다 신속하고 표준화된 수동 세척 공정을 지원합니다.",
  ],
  vision: {
    label: "VISION",
    title: "안전하고 지속 가능한 내시경 위생 환경",
    body: [
      "Nolan Ball Korea는 복합 구조 기반 세정 기술과 의료 현장의 사용성을 고려한 위생 소모품을 통해 내시경 재처리 전 과정의 감염관리 기준 향상을 지원합니다.",
      "제품의 구조와 사용 절차를 현장에 적용하기 쉽도록 정리하여 의료기관이 일관된 수동 세척 공정을 운영하고, 작업자에 따른 편차를 줄여 나갈 수 있는 환경을 만드는 데 집중합니다.",
      "이를 바탕으로 국내외 의료기관에서 보다 안전하고 지속 가능한 내시경 위생 환경을 구현하고, 신뢰할 수 있는 재처리 체계를 구축하는 데 기여하는 것을 목표로 합니다.",
    ],
  },
  mission: {
    label: "MISSION",
    title: "현장 중심의 세척 솔루션 제공",
    body: [
      "Nolan Ball Korea는 혁신적인 구조 설계와 의료 현장의 사용성을 고려한 제품 개발을 기반으로 내시경 재처리 과정의 위생성과 안전성 향상을 지원하고, 환자 감염 위험을 낮추는 데 기여하는 것을 사명으로 합니다.",
      "Nolan Ball의 360° 전주면 접촉 구조와 오염물 포획·밀어내기 메커니즘은 굴곡진 채널에서도 내벽과의 접촉을 유지하며 혈액·점액·단백질 등 잔류 오염물의 물리적 제거와 배출을 돕습니다.",
      "또한 일회용 관리 방식과 일관된 사용 절차를 통해 의료기관의 세척 업무 효율과 표준화를 지원하고, 제품의 크기와 폐기 부담을 고려해 의료기관의 ESG 가치 실현을 지원하고자 합니다.",
    ],
  },
  coreValuesTitle: "핵심 가치",
  coreValues: [
    { title: "환자 중심", body: "환자의 안전과 신뢰를 제품 개발의 중심에 둡니다." },
    { title: "혁신", body: "새로운 구조와 방식으로 세척 공정을 개선합니다." },
    { title: "책임", body: "품질과 안전 기준을 일관되고 투명하게 지킵니다." },
    { title: "협력", body: "의료진·파트너와 현장에 필요한 해법을 만듭니다." },
    { title: "지속 가능성", body: "폐기 부담을 고려하며 환경과 공존을 지향합니다." },
  ],
  introImage: { src: "/images/company/1.webp", alt: "놀란볼코리아 회사 소개 이미지" },
  visionImage: { src: "/images/company/2-S.webp", alt: "놀란볼코리아 비전 이미지" },
  missionImage: { src: "/images/company/4-company.webp", alt: "물방울과 수면 이미지" },
  /**
   * 회사 개요 표.
   * 자료정리 5-2 기준. 설립일·사업자등록번호·대표자명은 "공개 여부 및 최종 정보 확인"
   * 상태라 채우지 않고 행을 빼 두었습니다. 확정되면 여기에 추가하세요.
   */
  companyTitle: "회사 개요",
  company: [
    { label: "회사명", value: "놀란볼코리아 (Nolan Ball Korea)" },
    { label: "본사", value: "부산광역시 금정구 서부곡로 16번길 8-1, 알찬빌딩 1층" },
    { label: "대표전화", value: "051-516-5064 (팩스 051-516-5065)" },
    {
      label: "주요 사업",
      value:
        "내시경 채널 세척용 일회용 제품 “Nolan Ball” 개발·제조·판매",
    },
  ],
  companyBgFallback:
    "radial-gradient(circle at 72% 12%, rgba(255,224,168,0.12), transparent 18%), linear-gradient(120deg, #17141a 0%, #292126 55%, #21191d 100%)",
} as const;

/**
 * /sub/sub12.php — TECHNOLOGY ▸ 기술 개요
 *
 * 본문은 자료정리 3-1(제품 개요) · 3-2(구조적 특징)을 기준으로 하고,
 * 도해는 제품소개서(Micro-Anatomy)와 병원제안서(구조 상세)에서 가져왔습니다.
 * 4-3 표현 수위에 따라 "완전 세척", "미세균 사멸" 등은 쓰지 않습니다.
 */
export const TECHNOLOGY = {
  eyebrow: "TECHNOLOGY",
  title: "기술 개요",
  /** 원본 .text — 좌우에 84×53 아이콘, 가운데 40px 헤딩 */
  headline: ["360° 접촉과 연속 와이핑으로", "채널 내벽을 세척합니다"],
  icons: ["/images/sub12_icon1.webp", "/images/sub12_icon2.webp"],
  /** 원본은 <br><br> 로 두 문단 */
  lead: [
    "Nolan Ball 은 유연성 내시경의 내부 채널을 수동 세척하는 과정에서 사용하는 채널 세척용 볼입니다. 채널 내벽과의 360° 접촉, 연속 와이핑, 오염물 밀어내기 및 배출을 핵심 원리로 합니다.",
    "굴곡진 채널에서도 접촉을 유지하도록 설계되어 혈액·점액·단백질 등 잔류 유기물 제거를 돕고, 사용자의 숙련도에 따른 세척 편차를 줄입니다.",
  ],
  /** 화면 전체 폭 주황 밴드 */
  bandTitle: "Micro-Anatomy",
  /**
   * 전체 폭으로 싣는 도해.
   * 모두 제품소개서 페이지를 통째로 렌더한 것이라 설명 글자가 이미지 안에 있습니다.
   * 순서는 "문제 제기 → 해결 원리 → 근거" 흐름으로 잡았습니다.
   *
   * 지우고 싶은 도해가 있으면 아래 배열에서 해당 항목만 지우면 됩니다.
   */
  figures: [
    {
      image: "/images/tech_biofilm.webp",
      caption: "바이오필름 형성 조건 — 재처리 가이드라인을 지켜도 채널 내부에 잔존할 수 있습니다.",
    },
    {
      image: "/images/tech_brush_limits.webp",
      caption: "기존 브러시 방식의 구조적 한계 — 사각지대, 기질 잔존, 내벽 마모.",
    },
    {
      image: "/images/tech_impact.webp",
      caption: "오염된 내시경이 불러오는 연쇄 파급 효과.",
    },
    {
      image: "/images/tech_process.webp",
      caption: "내시경 재처리 공정과 기존 세척 방식의 구조.",
    },
    {
      image: "/images/tech_paradigm.webp",
      caption: "긁어내기(Scraping)에서 360° 전면 밀착 와이핑(Wiping)으로.",
    },
    {
      image: "/images/tech_mechanism.webp",
      caption: "세정 메커니즘 — 내경 일치 360° 밀착, 연속 와이핑, 오염 기질 제거.",
    },
    {
      /* 제품소개서 7쪽 — 표면 구조 상세 */
      image: "/images/tech_micro_anatomy.webp",
      caption: "표면 구조 — 미세 돌기, 연속 띠, 편마찰 유도 표면.",
    },
    {
      image: "/images/tech_structure.webp",
      caption:
        "구조별 역할 — 구형 본체, 연속 띠, 미세 돌기, 편마찰 표면, 오염물 포획 표면, 비가역 색상 인디케이터.",
    },
    {
      image: "/images/tech_speed.webp",
      caption: "기존 재처리 공정을 바꾸지 않고 본세척 단계에 그대로 들어갑니다.",
    },
    {
      /* ⚠️ md 4-3 조건부 — "0 CFU" 는 시험 방법·단위·검출한계를 함께 제시할 때만
         쓰라고 되어 있습니다. 아래 캡션이 그 단서 역할을 합니다. */
      image: "/images/tech_cfu.webp",
      caption:
        "비임상 세척 시험 결과 (일반세균배양, 2일 배양 기준). 시험 조건과 시료 정보에 따라 결과가 달라질 수 있으며 상세 내용은 시험성적서 원문을 참조해 주세요.",
    },
  ],
  /** 자료정리 3-2 구조적 특징 4가지 */
  featuresTitle: "구조적 특징",
  features: [
    {
      no: "01",
      name: "미세 돌기 구조",
      en: "Micro-Protrusions",
      body: "미세 돌기가 채널 내벽에 접촉해 부착된 오염물의 물리적 제거를 돕습니다.",
    },
    {
      no: "02",
      name: "연속 띠 구조",
      en: "Contact Bands",
      body: "이동 과정에서 연속적인 와이핑 작용이 이어지도록 설계되었습니다.",
    },
    {
      no: "03",
      name: "비대칭 마찰 구조",
      en: "Asymmetric Friction",
      body: "이동 시 회전을 유도하여 채널 내벽과의 접촉 범위를 넓히도록 설계되었습니다.",
    },
    {
      no: "04",
      name: "유연한 탄성 구조",
      en: "Flexible Body",
      body: "굴곡부를 통과하면서도 채널 내벽과의 접촉을 유지하도록 설계되었습니다.",
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
/*
 * 🚨 미교체 — 아래 items 4개(내열 내시경 캡 · ACF Filter Ball · 밸브 브러시 ·
 *    생분해성 의료기기)는 전부 하캄바이오 사업 내용입니다. 놀란볼코리아
 *    자료정리 문서에 대응 자료가 없어 그대로 두었습니다.
 *    "95% 단백질 제거", "99.9% 세균 감소" 같은 수치는 놀란볼코리아 시험자료로
 *    뒷받침되지 않으므로(자료정리 4-3 표현 수위 참조) 그대로 쓰면 안 됩니다.
 *    ❗공개 배포 전 반드시 교체하거나 이 페이지를 내려야 합니다.
 */
export const BUSINESS = {
  title: "사업분야",
  leadTitle: "Eco-Friendly Innovation in Medical Care",
  leadText:
    "Hakam Bio is committed to safer, greener healthcare through sustainable materials and smart design.",
  items: [
    {
      no: "01.",
      name: "Heat-resistant endoscopic cap",
      quote:
        "“ It disperses the high heat generated by the endoscopic light, reducing the risk of organ damage to the patient. ”",
      image: "/images/sub21_1.webp",
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
      image: "/images/sub21_2.webp",
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
      image: "/images/sub21_3.webp",
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
      image: "/images/sub21_4.webp",
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

/**
 * 대중교통 안내 한 줄.
 * bold 는 굵게 앞세우는 노선 번호, wide 는 그 뒤에서 줄을 바꿀지 여부입니다
 * (원본은 이 줄에만 span.lh50 을 줍니다).
 */
export type TransitLine = { text: string; bold?: string; wide?: boolean };
export type TransitRow = { icon: string; label: string; lines: TransitLine[] };

const TRANSIT: TransitRow[] = [
  {
    icon: "/images/icon_1.webp",
    label: "지하철",
    lines: [
      {
        bold: "부산도시철도 1호선 부산대역 2번 출구",
        text: "서부곡로16번길 방향으로 도보 약 7분",
        wide: true,
      },
    ],
  },
  {
    icon: "/images/icon_2.webp",
    label: "버스",
    lines: [
      {
        bold: "29 · 49 · 50 · 148 · 1002번",
        text: "부곡시장 정류장(11118) 하차 후 도보 약 2분",
        wide: true,
      },
    ],
  },
];

/** /sub/sub15.php — 회사소개 ▸ 오시는 길 */
export const LOCATION = {
  eyebrow: "COMPANY",
  title: "오시는 길",
  officeTitle: "본사",
  officeAddress: "부산광역시 금정구 서부곡로 16번길 8-1, 알찬빌딩 1층",
  /** 놀란볼코리아 본사 좌표로 새로 발급한 카카오맵 지도 퍼가기 값 */
  map: {
    name: "놀란볼코리아",
    latitude: 35.2266414394281,
    longitude: 129.090490710535,
    timestamp: "1786522726463",
    key: "sgc5gi2x9ij",
    height: "579",
  },
  transitTitle: "대중교통",
  transit: TRANSIT,
} as const;

/**
 * /sub/sub14.php — About Us ▸ Certifications
 * 인증서 이미지는 세로형입니다. 원본 사이트는 406×550,
 * sub14_1~9 는 PDF 를 150dpi 로 렌더한 1073×1517 (A4 비율).
 * <img className="w-full"> 로 원본 비율 그대로 그려지므로 비율은 달라도 됩니다.
 * hover 하면 rgba(0,0,0,.8) 오버레이 위에 제목이 뜹니다 (순수 CSS).
 */
export const CERTIFICATIONS = {
  eyebrow: "RESOURCES",
  title: "시험 결과·성적서",
  /**
   * 자료정리 4-1 기준 안내 문구.
   * 4-3 표현 수위 검토에 따라 결과를 단정하지 않고 원문 확인을 함께 안내합니다.
   */
  note: "외부 전문 검사기관의 일반세균배양 시험에서 2일 배양 후 미생물 증식 없음이 확인되었습니다. 자세한 시험 조건과 시료 정보는 시험성적서 원문을 확인해 주세요.",
  items: [
    /* sub14_1 ~ sub14_9 — 씨젠의료재단 미생물검사 결과보고서 9건.
       모두 일반세균배양(MIC) 결과 "No growth of microorganisms after 2-day culture".
       라벨의 괄호 안은 원본 보고서의 수진자명(시료 구분)입니다. */
    { image: "/images/sub14_1.webp", label: "미생물검사 결과보고서 — 시료 2" },
    { image: "/images/sub14_2.webp", label: "미생물검사 결과보고서 — nolan 2.8 (10-2)" },
    { image: "/images/sub14_3.webp", label: "미생물검사 결과보고서 — nolan 2.8 (10-1)" },
    { image: "/images/sub14_4.webp", label: "미생물검사 결과보고서 — nolan 2.8 (1-1)" },
    { image: "/images/sub14_5.webp", label: "미생물검사 결과보고서 — nolan 2.8 (1-2)" },
    { image: "/images/sub14_6.webp", label: "미생물검사 결과보고서 — nolan 3.7 구형 (2)" },
    { image: "/images/sub14_7.webp", label: "미생물검사 결과보고서 — nolan 3.7 와플 (2)" },
    { image: "/images/sub14_8.webp", label: "미생물검사 결과보고서 — nolan 3.7 구형 (1)" },
    { image: "/images/sub14_9.webp", label: "미생물검사 결과보고서 — nolan 3.7 와플 (1)" },
  ],
} as const;

/** /sub/sub13.php — About Us ▸ Organization */
export const ORGANIZATION = {
  eyebrow: "회사소개",
  title: "조직도",
  /** 원본 h4 — 앞부분만 주황색 40px 굵게 (span) */
  leadHighlight: "놀란볼코리아는",
  leadRest:
    " 연구개발부터 품질관리, 생산, 영업까지 이어지는 조직 구성을 통해 신뢰할 수 있는 내시경 위생 소모품을 공급합니다.",
  /** 조직도 이미지 — 520px 이하에서 모바일용으로 교체됩니다 */
  chartPc: "/images/sub13_w1.webp",
  chartMo: "/images/sub13_w2.webp",
} as const;

/**
 * /how-to-use — HOW TO USE (자료정리 3-4)
 *
 * ⚠️ md 3-4 주의: "현재 제공 자료만으로는 최종 사용 순서와 주의사항을 확정하기
 *    어렵습니다. 최종 IFU 원문을 추가해야 합니다."
 *    아래 steps 는 카탈로그·제품소개서에서 확인되는 범위만 적은 잠정 안내이며,
 *    최종 사용설명서(IFU)가 나오면 그 순서와 문구로 교체해야 합니다.
 */
export const HOW_TO_USE = {
  eyebrow: "HOW TO USE",
  title: "사용 방법",
  lead: "Nolan Ball 은 내시경 재처리의 수동 세척 단계에서 사용하는 일회용 채널 세척 볼입니다. 아래 순서는 제공된 자료 기준의 잠정 안내이며, 실제 사용은 제품에 동봉된 최종 사용설명서(IFU)를 따라야 합니다.",
  /** 최종 IFU 확정 전까지 노출하는 안내 배너 */
  notice:
    "최종 사용설명서(IFU)가 확정되면 이 페이지의 단계와 주의사항을 교체해야 합니다. 현재 내용은 카탈로그·제품소개서에서 확인된 범위만 담고 있습니다.",
  steps: [
    {
      no: "01",
      title: "채널 규격에 맞는 제품 선택",
      body: "위·기관지 내시경은 2.8 mm, 대장 내시경은 3.7 mm 제품을 사용합니다. 채널 내경과 맞지 않는 규격을 쓰면 세척 편차가 생길 수 있습니다.",
    },
    {
      no: "02",
      title: "사용 전 상태 확인",
      body: "개봉 후 볼의 색이 변해 있지 않은지 확인합니다. 색이 변한 제품은 이미 사용된 것이므로 사용하지 않습니다.",
    },
    {
      no: "03",
      title: "채널에 투입 후 통과",
      body: "석션 채널에 투입해 채널 전 구간을 통과시킵니다. 이동 과정에서 채널 내벽에 밀착해 연속적인 와이핑과 밀어내기 작용이 이루어집니다.",
    },
    {
      no: "04",
      title: "배출 및 색 변화 확인",
      body: "채널 말단으로 배출된 볼의 색 변화를 확인해 세척 공정이 수행되었는지 점검합니다.",
    },
    {
      no: "05",
      title: "1회 사용 후 폐기",
      body: "재사용하지 않습니다. 수분 반응형 비가역 변색 구조로 사용 여부가 남으며, 사용 후에는 기관의 의료폐기물 처리 절차에 따라 폐기합니다.",
    },
  ],
  cautionTitle: "주의사항",
  cautions: [
    "1회용 제품입니다. 재사용하지 마십시오.",
    "채널 규격에 맞지 않는 제품을 사용하지 마십시오.",
    "포장이 손상되었거나 사용 전 이미 변색된 제품은 사용하지 마십시오.",
    "본 제품은 수동 세척 단계를 보조하는 제품이며, 기관의 재처리 절차와 소독 공정을 대체하지 않습니다.",
    "보관 조건과 유효기간은 제품 표시사항을 따르십시오.",
  ],
  videoTitle: "제품 가이드 영상",
  videoNote:
    "카탈로그의 QR 코드로 제공되는 제품 가이드 영상입니다. 영상 파일 또는 링크가 확보되면 이 자리에 삽입합니다.",
} as const;

/** section_4 — ABOUT (자료정리 5-1 회사 소개 문구 초안) */
export const ABOUT = {
  paragraphs: [
    "놀란볼코리아(Nolan Ball Korea)는 내시경 재처리 과정의 효율성과 일관성을 높이기 위한 위생 소모품을 개발합니다.",
    "대표 제품 Nolan Ball 은 기존 브러시 방식의 구조적 한계를 보완하기 위해 360° 접촉 구조와 연속 와이핑 메커니즘을 적용한 내시경 채널 세척 솔루션입니다.",
    "현장의 사용 편의성과 신뢰할 수 있는 세척 공정을 지원하는 제품을 통해 보다 안전한 내시경 위생 환경을 만드는 것을 목표로 합니다.",
  ],
  cta: "자세히 보기",
  href: "/about/overview",
  image: "/images/main/9.webp",
  fallback: "linear-gradient(150deg, #102d4a 0%, #386d98 60%, #83b9d7 100%)",
} as const;
