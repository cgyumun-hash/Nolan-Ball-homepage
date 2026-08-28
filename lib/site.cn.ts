import type { FilterBall, NavItem } from "@/lib/site";
import {
  EN_ABOUT,
  EN_CERTIFICATIONS,
  EN_COMPANY,
  EN_DOWNLOADS,
  EN_FILTER_BALL_COLONOSCOPES,
  EN_FILTER_BALL_GASTROSCOPES,
  EN_HOW_TO_USE,
  EN_LOCATION,
  EN_OVERVIEW,
  EN_PRODUCT_SPECS,
  EN_TECHNOLOGY,
  EN_TEST_RESULTS,
} from "@/lib/site.en";

export const CN_COMPANY = {
  ...EN_COMPANY,
  address: "韩国釜山广域市金井区西部谷路16番街8-1，Alchan大厦1层",
  addressLines: ["韩国釜山广域市金井区西部谷路16番街8-1", "Alchan大厦1层"],
  copyright: "COPYRIGHT 2026 BY NOLAN BALL KOREA. ALL RIGHTS RESERVED.",
} as const;

export const CN_PRODUCTS_PAGES = [
  { label: "2.8 mm / 胃镜专用", href: "/cn/products/filter-ball-for-gastroscopes" },
  { label: "3.2 mm / 胃镜·肠镜兼用", href: "/cn/products/nolan-ball-3-2mm" },
  { label: "3.7 mm / 肠镜专用", href: "/cn/products/filter-ball-for-colonoscopes" },
  { label: "Valve Brush", href: "/cn/products/endoscopic-valve-port-brush" },
  { label: "HOW TO USE", href: "/cn/how-to-use" },
] as const;

export const CN_RESOURCES_PAGES = [
  { label: "试验结果·报告", href: "/cn/about/certifications" },
  { label: "资料下载", href: "/cn/customer-support/resources-downloads" },
] as const;

export const CN_COMPANY_PAGES = [
  { label: "公司简介", href: "/cn/about/overview" },
  { label: "来访路线", href: "/cn/about/location" },
  { label: "在线咨询", href: "/cn/customer-support/online-inquiry" },
] as const;

export const CN_TECHNOLOGY_PAGES = [
  { label: "技术概览", href: "/cn/about/technology-overview" },
] as const;

export const CN_NAV: NavItem[] = [
  { label: "MAIN", href: "/cn", children: [] },
  { label: "PRODUCT", href: "/cn/products/filter-ball-for-gastroscopes", children: [...CN_PRODUCTS_PAGES] },
  { label: "TECHNOLOGY", href: "/cn/about/technology-overview", children: [] },
  { label: "RESOURCES", href: "/cn/about/certifications", children: [...CN_RESOURCES_PAGES] },
  { label: "COMPANY", href: "/cn/about/overview", children: [...CN_COMPANY_PAGES] },
];

export const CN_SLIDES = [
  {
    id: "slide_1",
    eyebrow: "ENDOSCOPE CHANNEL CLEANING",
    lines: ["内镜清洗的", "全新标准"],
    description: "与管腔内壁形成360°贴合的一次性清洗解决方案",
    image: "/images/main/메인1_pc.webp",
    imageMobile: "/images/main/메인1_moblie.webp",
    fallback: "linear-gradient(115deg, #0b3261 0%, #217fc1 55%, #8ed7f2 100%)",
  },
  {
    id: "slide_2",
    eyebrow: "CONSISTENT WORKFLOW",
    lines: ["更快速、更一致的", "清洗流程"],
    description: "有助于减少操作人员熟练度带来的差异并提升现场效率",
    image: "/images/main/메인2_pc.webp",
    imageMobile: "/images/main/메인2_mobile.webp",
    fallback: "linear-gradient(115deg, #092c52 0%, #1c6fa8 55%, #8bc9e8 100%)",
  },
  {
    id: "slide_3",
    eyebrow: "BEYOND CLEANING",
    lines: ["超越清洗，", "迈向更安全的未来"],
    description: "以负责任的技术与合作，共同打造值得信赖的医疗环境",
    image: "/images/main/메인3_pc.webp",
    imageMobile: "/images/main/메인3_moblie.webp",
    fallback: "linear-gradient(115deg, #1d3345 0%, #3f6c86 55%, #8fb3c6 100%)",
  },
] as const;

export const CN_HERO_ACTIONS = [
  { label: "查看产品", href: "/cn/products/filter-ball-for-gastroscopes", primary: true },
  { label: "资料下载", href: "/cn/customer-support/resources-downloads", primary: false },
  { label: "样品·导入咨询", href: "/cn/customer-support/online-inquiry", primary: false },
] as const;

export const CN_WHY = {
  eyebrow: "",
  headingLines: ["CONTACT.", "WIPE.", "CHANGE."],
  description: "",
  contact: "360°",
  cta: "VIEW TECHNOLOGY",
  href: "/cn/about/technology-overview",
  image: "/images/main/360_pc.webp",
  imageMobile: "/images/main/360_moblie.webp",
} as const;

export const CN_KEY_BENEFITS = {
  eyebrow: "WHY NOLAN BALL",
  heading: "形成清洗差异的\n四项核心技术",
  keyMessage: "",
  supportingText: "",
  items: [
    { no: "01", title: "内径匹配360°贴合", body: "与管腔内径匹配的球形结构贴合整个圆周，有助于减少清洗盲区。" },
    { no: "02", title: "自旋转连续擦拭", body: "微凸点与接触带在移动过程中擦拭并带出血液、黏液及微细颗粒。" },
    { no: "03", title: "有助于减少生物膜形成环境", body: "去除早期污染物和有机物，帮助减少有利于生物膜形成的环境。" },
    { no: "04", title: "不可逆颜色变化", body: "使用后的颜色变化便于确认使用状态，并有助于防止重复使用。" },
  ],
  image: "/images/main/4가지기술_pc.webp",
  imageMobile: "/images/main/4가지기술_moblie.webp",
  imageAlt: "Nolan Ball内镜管腔清洗产品",
} as const;

export const CN_PRODUCTS = {
  brand: "Nolan Ball Korea",
  heading: "PRODUCTS",
  desc: "用于内镜管腔清洗的一次性解决方案",
  cta: "查看产品",
  href: "/cn/products/filter-ball-for-gastroscopes",
  image: "/images/main/홈페이지_product_pc.webp",
  imageMobile: "/images/main/홈페이지_product_moblie.webp",
  disclaimer: "图片中的产品外观与比例可能与实际产品有所不同。",
  fallback: "linear-gradient(110deg, #071f3d 0%, #145f9c 50%, #73bde5 100%)",
} as const;

export const CN_PRODUCT_SPECS = {
  ...EN_PRODUCT_SPECS,
  heading: "产品规格",
  columns: ["适用范围", "用途", "规格", "状态", "包装单位"],
  rows: [
    { use: "胃镜", purpose: "专用", spec: "2.8 mm", status: "已上市", pack: "500 pcs" },
    { use: "胃镜·肠镜", purpose: "兼用", spec: "3.2 mm", status: "已上市", pack: "500 pcs" },
    { use: "肠镜", purpose: "专用", spec: "3.7 mm", status: "已上市", pack: "500 pcs" },
  ],
  note: "包装单位和产品代码以最终确认为准，下单前请向负责人确认。",
} as const;

const CN_FEATURES = ["不可逆颜色变化，便于确认使用状态", "360°全周接触清洗", "有助于减少生物膜形成环境", "一次性使用设计"];
const CN_EFFECTS = ["支持对管腔内壁残留物进行物理清除", "有助于减少操作人员差异", "支持连续擦拭和向外带出污染物", "支持规范化的一次性使用管理"];

function product(base: FilterBall, title: string, subtitle: string, image: string, intro: string): FilterBall {
  return {
    ...base,
    title,
    subtitle,
    image,
    imageWidth: 1254,
    imageHeight: 1254,
    intro: [[{ t: intro }], [{ t: "球形结构与管腔内壁形成360°全周接触，连续擦拭作用有助于物理去除血液、黏液及蛋白质等残留污染物。" }], [{ t: "柔性结构在弯曲区段保持接触，有助于支持更一致的手工清洗流程。" }]],
    features: CN_FEATURES,
    effects: CN_EFFECTS,
  };
}

export const CN_FILTER_BALL_GASTROSCOPES = product(EN_FILTER_BALL_GASTROSCOPES, "2.8 mm / 胃镜专用", "胃镜专用 · 2.8 mm", "/images/revision/products/nolan-ball-2-8.webp", "2.8 mm Nolan Ball是根据胃镜管腔结构设计的一次性管腔清洗球。");
export const CN_FILTER_BALL_GASTRO_COLONOSCOPES = product(EN_FILTER_BALL_GASTROSCOPES, "3.2 mm / 胃镜·肠镜兼用", "胃镜·肠镜兼用 · 3.2 mm", "/images/revision/products/nolan-ball-3-2.webp", "3.2 mm Nolan Ball是为兼容胃镜和肠镜管腔而设计的一次性管腔清洗球。");
export const CN_FILTER_BALL_COLONOSCOPES = product(EN_FILTER_BALL_COLONOSCOPES, "3.7 mm / 肠镜专用", "肠镜专用 · 3.7 mm", "/images/revision/products/nolan-ball-3-7.webp", "3.7 mm Nolan Ball是根据肠镜较长且弯曲的管腔结构设计的一次性管腔清洗球。");
export const CN_VALVE_PORT_BRUSH = product(EN_FILTER_BALL_GASTROSCOPES, "Valve Brush", "内镜阀门·端口一次性清洗刷", "/images/revision/products/valve-brush.webp", "Valve Brush是用于清洗内镜阀门和端口等容易残留污染物区域的一次性清洗刷。");

export const CN_TECHNOLOGY = {
  ...EN_TECHNOLOGY,
  title: "技术概览",
  overview: {
    ...EN_TECHNOLOGY.overview,
    title: "产品概览",
    headline: "从管腔入口延伸至末端的全表面接触清洗",
    intro: "Nolan Ball是根据内镜吸引管腔内径设计的球形清洗结构。插入后与管腔内壁形成连续面接触，从入口到末端支持贴合清洗，并有助于减少传统刷具难以触及的区域。",
    principles: [
      { no: "01", title: "内径匹配360°贴合", body: "球形结构与管腔内径相匹配，插入瞬间形成全表面接触，有助于减少从入口到末端的清洗盲区。", points: ["与管腔内径匹配的球形结构", "插入时形成全表面接触", "覆盖包括入口在内的整个管腔"] },
      { no: "02", title: "全清洗阶段异物排出", body: "移动过程中的连续擦拭与推动作用，有助于分离管腔内残留有机物并向外排出。", points: ["连续擦拭与推动", "支持血液、黏液、蛋白质和微粒向外排出", "辅助去除管腔内残留物"] },
      { no: "03", title: "减少生物膜形成环境", body: "通过早期去除残留有机物和初始基质，帮助减少微生物附着及EPS形成环境，并支持后续再处理效率。", points: ["支持早期去除残留有机物", "减少有利于微生物附着的环境", "支持后续清洗的一致性"] },
    ],
    measurement: {
      title: "吸引管腔入口的初期污染物接触区",
      body: "操作后，血液、黏液和蛋白质等有机物可能经管腔入口进入并残留于内壁。",
      quote: "Nolan Ball从插入瞬间开始支持360°贴合接触",
    },
    specifications: {
      title: "规格（以内镜管腔内径为准）",
      items: [
        { size: "2.8 mm", application: "胃镜专用", code: "GASTRO" },
        { size: "3.2 mm", application: "胃镜·肠镜兼用", code: "GASTRO & COLONO" },
        { size: "3.7 mm", application: "肠镜专用", code: "COLONO" },
      ],
      note: "※ 图示尺寸可能与实际产品不同。",
    },
  },
  featuresTitle: "产品结构",
  featuresLead: "六项结构协同支持接触、移动、污染物捕获以及使用状态确认。\n选择结构名称即可查看详细内容。",
  features: [
    { no: "01", name: "污染物捕获表面", en: "Debris Capture & Anti-Reattachment", body: "改性极性表面用于吸附和捕获分离的污染颗粒，有助于减少其重新附着于管腔内壁。", points: [] },
    { no: "02", name: "微凸点结构", en: "Localized Shear Cleaning", body: "接触带之间分布的多点凸起提高局部接触压力，对附着残留物产生压缩与剪切作用。", points: ["支持分离黏液、蛋白质和血液残留", "辅助清洁表面微小凹凸区域", "扩展对微小盲区的接触"] },
    { no: "03", name: "非对称摩擦表面", en: "Self-Rotating Cleaning Action", body: "不同摩擦区域在产品移动时诱导球体旋转，使接触面动态变化。", points: ["接触面的动态重新配置", "重复移动时覆盖管腔圆周", "支持对残留物的接触清洗"] },
    { no: "04", name: "球形本体", en: "Full-Contact Cleaning Base", body: "球形本体从入口至末端维持表面接触，并在管腔弯曲变化中支持稳定移动。", points: [] },
    { no: "05", name: "连续接触带", en: "Continuous Surface Wiping", body: "球体表面的纵横交叉接触带在移动过程中支持连续擦拭作用。", points: ["保持一定宽度的表面接触", "将物理清洗作用传递至整个管腔", "接触位置变化有助于减少盲区"] },
    { no: "06", name: "不可逆颜色指示", en: "Visual Single-Use Verification", body: "球体内部的水分反应型不可逆变色系统在清洗过程中接触水分后永久变色。", points: ["以视觉方式确认清洗过程", "支持一次性使用规范", "支持标准化感染管理流程"] },
  ],
} as const;

export const CN_TEST_RESULTS = {
  ...EN_TEST_RESULTS,
  heading: "试验结果",
  resultLabel: "试验结果",
  result: "0 CFU",
  resultEn: "0 CFU",
  summary: {
    lead: "在 2.8 mm 和 3.7 mm 条件下进行的试验中，Nolan Ball 的结果为 0 CFU，未检测到微生物生长。",
    body: "该试验结果体现了 Nolan Ball 的预清洗性能。其结构与通道内径相适配，可与内壁形成接触，并有助于去除通道内部残留的有机物及污染物。",
    note: "※ 以上结果是在特定试验条件下获得的，实际结果可能因使用环境及再处理条件不同而有所差异。",
    specs: [
      { value: "2.8 mm", label: "试验结果" },
      { value: "3.7 mm", label: "试验结果" },
    ],
  },
  interpretationTitle: "CFU 试验结果与解读",
  method: [
    "在所述试验条件下，2.8 mm和3.7 mm试验组的报告均记录为培养2天后未检出微生物生长。该结果应结合各报告中的样本信息与试验条件进行确认。",
    "Nolan Ball的接触与剪切作用支持去除黏液、血液及蛋白质等残留有机物，并将其向外带出。",
  ],
  disclaimer: "试验结果可能因试验条件及样本特性而异。完整判断请参考原始试验报告中记载的样本名称、接收日期、报告日期及试验条件。",
} as const;

export const CN_CERTIFICATIONS = { ...EN_CERTIFICATIONS, eyebrow: "RESOURCES", title: "试验结果·报告", note: "独立专业检验机构在一般细菌培养试验中报告培养2天后未检出微生物生长。完整信息请参阅试验报告。" } as const;
export const CN_DOWNLOADS = {
  ...EN_DOWNLOADS,
  heading: "资料下载",
  items: [
    { ...EN_DOWNLOADS.items[0], name: "Nolan Ball产品目录", desc: "产品概览、规格及核心优势" },
    { ...EN_DOWNLOADS.items[1], name: "Nolan Ball产品介绍", desc: "产品结构与清洗机制" },
    { ...EN_DOWNLOADS.items[2], name: "试验报告", desc: "一般细菌培养试验报告" },
    { ...EN_DOWNLOADS.items[3], name: "使用说明书（IFU）", desc: "使用步骤与注意事项", pending: "最终使用说明书确认后公开。" },
  ],
  note: "资料可能在不另行通知的情况下更新。如需最新版，请联系我们。",
} as const;
export const CN_OVERVIEW = {
  ...EN_OVERVIEW,
  eyebrow: "COMPANY",
  title: "公司简介",
  introTitle: "树立内镜清洗新标准",
  intro: ["Nolan Ball Korea开发旨在提高内镜再处理效率与一致性的卫生耗材。", "代表产品Nolan Ball结合360°接触结构与连续擦拭机制，以补充传统刷具方式的结构性局限。", "我们致力于通过兼顾临床便利性与可靠清洗流程的产品，营造更安全的内镜卫生环境。"],
  vision: { label: "VISION", title: "更安全、更可持续的内镜卫生环境", body: ["Nolan Ball Korea以临床便利性为基础，通过结构化清洗技术和卫生耗材支持内镜再处理中的感染管理标准。", "我们致力于让产品结构和操作流程更易于应用，帮助医疗机构建立一致的手工清洗流程。", "通过这些努力，我们希望为韩国及全球医疗机构的安全、可持续内镜卫生环境作出贡献。"] },
  mission: { label: "MISSION", title: "提供面向现场的实用清洗解决方案", body: ["我们的使命是以创新结构设计和产品开发支持内镜再处理的卫生与安全。", "Nolan Ball的360°全周接触结构与捕获、推动机制支持物理去除血液、黏液和蛋白质等残留污染物。", "一次性使用管理和一致的操作流程支持效率与标准化，同时也考虑废弃物负担和医疗机构的ESG目标。"] },
  coreValuesTitle: "核心价值",
  coreValues: [
    { title: "以患者为中心", body: "将患者安全与信赖置于产品开发的核心。" },
    { title: "创新", body: "通过全新结构与方法改善清洗流程。" },
    { title: "责任", body: "以一致、透明的标准维护质量与安全。" },
    { title: "合作", body: "与医护人员和合作伙伴共同开发实用解决方案。" },
    { title: "可持续性", body: "考虑废弃物负担并追求对环境负责的发展。" },
  ],
  companyTitle: "公司信息",
  company: [
    { label: "公司名称", value: "Nolan Ball Korea" },
    { label: "总部", value: CN_COMPANY.address },
    { label: "联系电话", value: `${CN_COMPANY.tel}（传真 ${CN_COMPANY.fax}）` },
    { label: "主要业务", value: "Nolan Ball一次性内镜管腔清洗产品的开发、制造与销售" },
  ],
} as const;
export const CN_LOCATION = { ...EN_LOCATION, eyebrow: "COMPANY", title: "来访路线", officeTitle: "总部", officeAddress: CN_COMPANY.address, transitTitle: "公共交通" } as const;
export const CN_HOW_TO_USE = {
  ...EN_HOW_TO_USE,
  eyebrow: "HOW TO USE",
  title: "使用方法",
  lead: "Nolan Ball是用于内镜再处理手工清洗阶段的一次性管腔清洗球。请始终遵循产品随附的最终使用说明书（IFU）。",
  notice: "最终使用说明书批准后，本页面将同步更新。",
  steps: [
    { no: "01", title: "选择适合管腔的规格", body: "根据内镜管腔选择2.8 mm、3.2 mm或3.7 mm产品。规格不匹配可能导致接触不一致。" },
    { no: "02", title: "使用前检查产品", body: "打开包装后确认产品未变色。已变色的产品不得使用。" },
    { no: "03", title: "插入并通过管腔", body: "将产品放入吸引管腔并使其通过整个管腔。移动过程中支持与内壁接触及连续擦拭。" },
    { no: "04", title: "取出并确认颜色变化", body: "产品从末端排出后，确认颜色变化以辅助判断使用状态。" },
    { no: "05", title: "一次使用后废弃", body: "请勿重复使用，并按照医疗机构的废弃物管理规定处理。" },
  ],
  cautionTitle: "注意事项",
  cautions: ["仅限一次性使用，请勿重复使用。", "请勿使用与管腔规格不符的产品。", "包装破损或使用前已变色时请勿使用。", "本产品用于支持手工清洗阶段，不能替代完整的再处理或消毒流程。"],
  videoTitle: "产品指南视频",
  videoNote: "确认最终视频文件或链接后将在此处公开。",
} as const;
export const CN_ABOUT = { ...EN_ABOUT, paragraphs: ["Nolan Ball Korea开发旨在提高内镜再处理效率与一致性的卫生耗材。", "Nolan Ball结合360°接触结构与连续擦拭机制，以补充传统刷具方式的结构性局限。", "我们希望通过临床使用便利且支持可靠清洗流程的产品，为更安全的内镜卫生环境作出贡献。"], cta: "了解更多", href: "/cn/about/overview" } as const;

export const CN_SUPPORTED_PATHS = [
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
  "/about/location",
  "/customer-support/online-inquiry",
] as const;
