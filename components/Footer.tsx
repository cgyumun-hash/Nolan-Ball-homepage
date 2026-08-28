import Image from "next/image";
import { COMPANY, NAV } from "@/lib/site";
import { EN_COMPANY, EN_NAV } from "@/lib/site.en";
import { CN_COMPANY, CN_NAV } from "@/lib/site.cn";
import { selectLocale, type SiteLocale } from "@/lib/locale";

/**
 * 원본 .footer
 *   .s1 { display:flex; gap:130px; justify-content:right; align-items:center;
 *         margin:25px 0 60px; font-weight:800 }
 *        1200↓ justify-content:space-between + gap:0
 *        580↓  세로 정렬 + gap:15px + margin-bottom:50px
 *   .s2 { display:flex; justify-content:space-between; align-items:end; padding-bottom:20px }
 *        1200↓ 세로 정렬 (align-items:flex-start), .c1 에 margin-bottom:50px
 *   .s2 .c1 ul { display:flex; gap:40px }   580↓ 세로 정렬 + gap:10px
 *   .s2 .c1 ul h6 { font-size:16px }
 *   .s2 .c2 { flex-direction:column; align-items:end }  1200↓ align-items:flex-start
 *   .s2 .c2 p { font-size:14px; color:#666 }
 *   580↓ .footer { font-size:14px }
 *
 * 서브페이지에서는 인라인으로 border-top: 1px solid #333 이 붙습니다.
 *
 * 애니메이션이 없으므로 서버 컴포넌트입니다 ("use client" 불필요).
 */
export default function Footer({ bordered = false, locale = "ko" }: { bordered?: boolean; locale?: SiteLocale }) {
  const company = selectLocale(locale, COMPANY, EN_COMPANY, CN_COMPANY);
  const nav = selectLocale(locale, NAV, EN_NAV, CN_NAV);
  const labels = locale === "cn"
    ? ["地址", "电话", "传真", "电子邮箱"]
    : locale === "en"
      ? ["Address", "Telephone", "Fax", "Email"]
      : ["주소", "대표전화", "팩스", "이메일"];
  const info = [
    { label: labels[0], lines: company.addressLines },
    { label: labels[1], lines: [company.tel] },
    { label: labels[2], lines: [company.fax] },
    { label: labels[3], lines: [company.email] },
  ];

  return (
    <footer
      className={`w-full pb-[env(safe-area-inset-bottom)] max-b580:text-[14px] ${
        bordered ? "border-t border-ink-900" : ""
      }`}
    >
      <div className="wrap-in">
        {/* .s1 */}
        <nav
          className="mt-[25px] mb-[60px] flex items-center justify-end gap-x-[130px] font-extrabold
                     max-b1200:justify-between max-b1200:gap-x-0
                     max-b580:mb-10 max-b580:grid max-b580:grid-cols-2 max-b580:items-start max-b580:gap-x-6 max-b580:gap-y-4"
        >
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="transition-colors hover:text-sky-600"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* .s2 */}
        <div
          className="flex items-end justify-between pb-5
                     max-b1200:flex-col max-b1200:items-start"
        >
          {/* .c1 */}
          <div className="max-b1200:mb-[50px]">
            {info.map((row) => (
              <ul
                key={row.label}
                className="mb-[15px] flex items-start gap-10 last:mb-0
                           max-b580:flex-col max-b580:gap-2.5"
              >
                <h6 className="w-[72px] shrink-0 text-[16px] font-bold">
                  {row.label}
                </h6>
                <li className="leading-relaxed">
                  {row.lines.map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))}
                </li>
              </ul>
            ))}
          </div>

          {/* .c2 */}
          <div className="flex flex-col items-end max-b1200:items-start">
            <Image
              src="/images/main/logo.webp"
              alt="Nolan Ball Korea"
              width={633}
              height={161}
              className="h-auto w-[240px] max-b580:w-[200px]"
            />
            <p className="mt-4 text-[14px] text-ink-500">{company.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
