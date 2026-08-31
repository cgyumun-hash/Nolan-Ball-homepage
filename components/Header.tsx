"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { NAV } from "@/lib/site";
import { EN_NAV } from "@/lib/site.en";
import { CN_NAV } from "@/lib/site.cn";
import { getLanguageHref, selectLocale, type SiteLocale } from "@/lib/locale";

const LANGUAGE_OPTIONS = [
  { code: "ko", label: "KO" },
  { code: "en", label: "EN" },
  { code: "cn", label: "CN" },
] as const;

/**
 * 원본 .header
 *   position:absolute · top:0 · z-index:99   ← fixed 가 아니라 스크롤하면 사라집니다
 *   .wrap_in { display:flex; justify-content:space-between; align-items:center; color:#fff }
 *   .menu { width:70% }  .menu>li { width:20%; padding:25px 10px }
 *     1600↓ padding 25px 5px · 1400↓ width 25% · 1080↓ 통째로 숨김
 *   .sub_menu { top:60px; border-top:3px solid #1EAC44; color:#666 }
 *
 * jQuery 동작 (index.html)
 *   $('.header').mouseover → background #fff, 메뉴 글자 #333, 햄버거 #333
 *   $('.menu>li').mouseout → background transparent, 글자 #fff
 *
 * 서브페이지(sub13.php 등)는 인라인 <style> 로 항상 흰 배경이고
 * mouseout 핸들러를 주석 처리해 두었습니다 → forceSolid 로 재현합니다.
 */
export default function Header({
  forceSolid = false,
  darkOnTransparent = false,
  locale = "ko",
}: {
  forceSolid?: boolean;
  darkOnTransparent?: boolean;
  locale?: SiteLocale;
}) {
  const pathname = usePathname();
  const nav = selectLocale(locale, NAV, EN_NAV, CN_NAV);
  const [hovered, setHovered] = useState(false);
  const solid = forceSolid || hovered;
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const [sideOpen, setSideOpen] = useState(false);
  /** 사이드바 아코디언 — 원본은 li 클릭 시 .active 토글 */
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const dark = solid || darkOnTransparent;
  const fg = dark ? "text-ink-900" : "text-white max-b1080:text-ink-900";
  const barBg = dark ? "bg-ink-900" : "bg-white max-b1080:bg-ink-900";

  return (
    <>
      <header
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setOpenMenu(null);
          setLangOpen(false);
        }}
        className={`absolute inset-x-0 top-0 z-[99] w-full transition-colors duration-300
                    max-b1080:py-1 ${solid ? "bg-white" : "bg-transparent"}`}
      >
        <div className="wrap-in flex min-w-0 items-center justify-between gap-4 max-b520:gap-2">
          <Link
            href={locale === "ko" ? "/" : `/${locale}`}
            className="min-w-0 shrink py-3"
            aria-label={locale === "ko" ? "놀란볼코리아 메인으로 이동" : "Go to the Nolan Ball Korea home page"}
          >
            <Image
              src="/images/main/logo.webp"
              alt="Nolan Ball Korea"
              width={633}
              height={161}
              priority
              className="h-auto w-[230px] max-b1200:w-[190px] max-b1080:w-[clamp(150px,45vw,180px)] max-b520:w-[145px]"
            />
          </Link>

          {/* ── GNB ─────────────────────────────────────────────── */}
          {/* 4개 대분류를 동일한 폭으로 나누고 줄바꿈을 막습니다. */}
          <nav className="hidden min-w-0 flex-1 items-center justify-between text-center b1080:flex">
            {nav.map((item) => (
              <div
                key={item.label}
                onMouseEnter={() => {
                  setLangOpen(false);
                  setOpenMenu(item.label);
                }}
                onMouseLeave={() => setOpenMenu(null)}
                className="relative min-w-0 flex-1 cursor-pointer px-2 py-[25px]
                           max-b1600:px-1"
              >
                {/* 원본 GNB 링크는 class="fs20" → 20px, 1600px 이하 18px */}
                <a
                  href={item.href}
                  className={`block min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[17px] font-normal transition-colors
                              max-b1600:text-[15px] max-b1200:text-[13px] ${fg}`}
                >
                  {item.label}
                </a>

                {/* 원본 .sub_menu — jQuery slideDown/slideUp.
                    하위 항목이 없는 메뉴는 드롭다운을 띄우지 않습니다. */}
                <AnimatePresence>
                  {openMenu === item.label && item.children.length > 0 && (
                    <motion.ul
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="absolute left-0 top-[60px] z-[99] w-full overflow-hidden
                                 border-t-[3px] border-brand-500 text-ink-500"
                    >
                      {item.children.map((child) => (
                        <li
                          key={child.label}
                          className="border-b border-line bg-white p-2.5 text-[16px]
                                     last:border-b-0 hover:font-extrabold hover:text-ink-900"
                        >
                          <a href={child.href}>{child.label}</a>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* ── 언어 선택 + 햄버거 ──────────────────────────────── */}
          <div className="flex min-w-0 shrink-0 items-center gap-5 max-b520:gap-4">
            {/* 원본 .side_menu — hover 시 .translation-links slideDown */}
            <div
              className="relative py-6 max-b1080:py-4"
              onMouseEnter={() => {
                setOpenMenu(null);
                setLangOpen(true);
              }}
              onMouseLeave={() => setLangOpen(false)}
            >
              <button
                type="button"
                aria-label={locale === "en" ? "Select language" : locale === "cn" ? "选择语言" : "언어 선택"}
                aria-expanded={langOpen}
                aria-controls="header-language-menu"
                aria-haspopup="menu"
                onClick={() => {
                  setOpenMenu(null);
                  setLangOpen((open) => !open);
                }}
                className={`block ${fg}`}
              >
                {/* 원본 lang.png / b_lang.png (지구본) */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <circle cx="12" cy="12" r="9.25" stroke="currentColor" strokeWidth="1.5" />
                  <ellipse cx="12" cy="12" rx="4" ry="9.25" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M2.75 12h18.5" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.ul
                    id="header-language-menu"
                    role="menu"
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute right-0 top-[57px] z-[101] min-w-[72px] overflow-hidden bg-white px-5 py-[15px] shadow-lg
                               before:absolute before:right-0 before:top-0 before:h-[3px] before:w-6 before:bg-brand-500"
                  >
                    {LANGUAGE_OPTIONS.map((l) => (
                      <li key={l.code} role="none" className="mb-2.5 last:mb-0">
                        <Link
                          href={getLanguageHref(pathname, l.code)}
                          hrefLang={l.code}
                          role="menuitem"
                          aria-current={locale === l.code ? "page" : undefined}
                          onClick={() => setLangOpen(false)}
                          className={`block min-w-0 text-left text-[13px] font-bold hover:text-ink-900 ${
                            locale === l.code ? "text-ink-900" : "text-ink-500"
                          }`}
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* 원본 .ico — 30×25, 막대 3개(높이 10%), active 시 X 로 변형 */}
            <button
              onClick={() => setSideOpen(true)}
              aria-label={locale === "en" ? "Open full menu" : locale === "cn" ? "打开完整菜单" : "전체 메뉴 열기"}
              className="relative h-[25px] w-[30px] max-b520:h-[22px] max-b520:w-[27px]"
            >
              <span className={`absolute left-0 top-0 h-[2.5px] w-full ${barBg}`} />
              <span className={`absolute left-0 top-[40%] h-[2.5px] w-full ${barBg}`} />
              <span className={`absolute left-0 top-[80%] h-[2.5px] w-full ${barBg}`} />
            </button>
          </div>
        </div>
      </header>

      {/* ── 좌측 사이드바 ────────────────────────────────────────
          원본 .left-side-bar-box  fixed · rgba(0,0,0,0) → 0.5 · transition .5s
               .left-side-bar      width 300px (580↓ 250px) · left -250px → 0 */}
      <AnimatePresence>
        {sideOpen && (
          <motion.div
            initial={{ backgroundColor: "rgba(0,0,0,0)" }}
            animate={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            exit={{ backgroundColor: "rgba(0,0,0,0)" }}
            transition={{ duration: 0.5 }}
            onClick={() => setSideOpen(false)}
            className="fixed inset-0 z-[100] cursor-pointer overflow-hidden"
          >
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={locale === "en" ? "Full menu" : locale === "cn" ? "完整菜单" : "전체 메뉴"}
              className="relative h-dvh max-h-dvh w-[min(320px,calc(100vw-32px))] max-w-full cursor-default
                         overflow-x-hidden overflow-y-auto overscroll-contain bg-white pb-[max(24px,env(safe-area-inset-bottom))]
                         pt-[max(70px,env(safe-area-inset-top))] text-[24px] text-ink-900
                         max-b580:w-[min(280px,calc(100vw-16px))]"
            >
              <button
                type="button"
                onClick={() => setSideOpen(false)}
                aria-label={locale === "en" ? "Close full menu" : locale === "cn" ? "关闭完整菜单" : "전체 메뉴 닫기"}
                className="absolute right-4 top-[max(18px,env(safe-area-inset-top))] grid h-10 w-10 place-items-center text-[30px] leading-none"
              >
                <span aria-hidden>×</span>
              </button>
              {nav.map((item) => (
                <div key={item.label} className="min-w-0">
                  {/* 하위 항목이 없으면 아코디언 대신 바로 이동하는 링크로 둡니다 */}
                  {item.children.length === 0 ? (
                    <a
                      href={item.href}
                      onClick={() => setSideOpen(false)}
                      className="block w-full min-w-0 break-words px-10 py-3.5 text-left leading-snug
                                 max-b580:px-6 max-b580:text-[16px]"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        setOpenAccordion((v) =>
                          v === item.label ? null : item.label,
                        )
                      }
                      aria-expanded={openAccordion === item.label}
                      className="block w-full min-w-0 break-words px-10 py-3.5 text-left leading-snug
                                 max-b580:px-6 max-b580:text-[16px]"
                    >
                      {item.label}
                    </button>
                  )}

                  <AnimatePresence initial={false}>
                    {openAccordion === item.label && (
                      <motion.ul
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        {item.children.map((child) => (
                          <li
                            key={child.label}
                            className="min-w-0 border-b border-line pl-5 text-[16px] hover:font-extrabold"
                          >
                            <a
                              href={child.href}
                              onClick={() => setSideOpen(false)}
                              className="block min-w-0 break-words px-10 py-3.5 leading-snug max-b580:px-6"
                            >
                              {child.label}
                            </a>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
