"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { COMPANY, LANGS, NAV } from "@/lib/site";

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
export default function Header({ forceSolid = false }: { forceSolid?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const solid = forceSolid || hovered;
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const [sideOpen, setSideOpen] = useState(false);
  /** 사이드바 아코디언 — 원본은 li 클릭 시 .active 토글 */
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const fg = solid ? "text-ink-900" : "text-white";
  const barBg = solid ? "bg-ink-900" : "bg-white";

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
                    max-b1080:py-[5px] ${solid ? "bg-white" : "bg-transparent"}`}
      >
        <div className="wrap-in flex items-center justify-between">
          {/* ── 로고 (원본 logo.png 를 텍스트+도형으로 재현) ──────────
              원본은 이미지라 색이 고정이지만, 여기서는 투명 헤더 위에서도
              읽히도록 헤더 상태를 따라가게 했습니다. */}
          <a href="#" className="flex shrink-0 items-center gap-2.5 py-4">
            <span
              className={`grid h-9 w-9 shrink-0 place-items-center rounded-[6px] border-2 text-[15px] font-black transition-colors ${
                solid
                  ? "border-brand-500 text-brand-500"
                  : "border-white text-white"
              }`}
            >
              H
            </span>
            <span className="leading-none">
              <span className="flex items-center gap-1.5">
                <span
                  className={`text-[22px] font-bold tracking-tight transition-colors ${fg}`}
                >
                  Ha Kam
                </span>
                <span className="rounded-[3px] bg-brand-500 px-1.5 py-0.5 text-[13px] font-bold text-white">
                  BIO
                </span>
              </span>
              <span
                className={`mt-1 block text-[9px] tracking-wide transition-colors ${
                  solid ? "text-ink-500" : "text-white/80"
                }`}
              >
                {COMPANY.legal}
              </span>
            </span>
          </a>

          {/* ── GNB ─────────────────────────────────────────────── */}
          <nav className="hidden w-[70%] items-center justify-between text-center b1080:flex">
            {NAV.map((item) => (
              <div
                key={item.label}
                onMouseEnter={() => setOpenMenu(item.label)}
                className="relative w-1/5 cursor-pointer px-2.5 py-[25px]
                           max-b1600:px-[5px] max-b1400:w-1/4"
              >
                {/* 원본 GNB 링크는 class="fs20" → 20px, 1600px 이하 18px */}
                <a
                  href={item.href}
                  className={`text-[20px] font-normal transition-colors max-b1600:text-[18px] ${fg}`}
                >
                  {item.label}
                </a>

                {/* 원본 .sub_menu — jQuery slideDown/slideUp */}
                <AnimatePresence>
                  {openMenu === item.label && (
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
          <div className="flex shrink-0 items-center gap-5">
            {/* 원본 .side_menu — hover 시 .translation-links slideDown */}
            <div
              className="relative py-6"
              onMouseEnter={() => setLangOpen(true)}
              onMouseLeave={() => setLangOpen(false)}
            >
              <button aria-label="언어 선택" className={`block ${fg}`}>
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
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute right-0 top-[57px] overflow-hidden
                               border-t-[3px] border-brand-500 bg-white"
                  >
                    <div className="px-5 py-[15px]">
                      {LANGS.map((l) => (
                        <li key={l.code} className="mb-2.5 last:mb-0">
                          <button
                            className="block w-[30px] text-left text-[13px] font-bold
                                       text-ink-500 hover:text-ink-900"
                          >
                            {l.label}
                          </button>
                        </li>
                      ))}
                    </div>
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* 원본 .ico — 30×25, 막대 3개(높이 10%), active 시 X 로 변형 */}
            <button
              onClick={() => setSideOpen(true)}
              aria-label="전체 메뉴 열기"
              className="relative h-[25px] w-[30px]"
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
            className="fixed inset-0 z-[100] cursor-pointer"
          >
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              onClick={(e) => e.stopPropagation()}
              className="h-full w-[300px] cursor-default overflow-y-auto bg-white
                         pt-[70px] text-[24px] text-ink-900 max-b580:w-[250px]"
            >
              {NAV.map((item) => (
                <div key={item.label}>
                  <button
                    onClick={() =>
                      setOpenAccordion((v) =>
                        v === item.label ? null : item.label,
                      )
                    }
                    className="block w-full px-10 py-3.5 text-left
                               max-b580:px-[30px] max-b580:text-[16px]"
                  >
                    {item.label}
                  </button>

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
                            className="border-b border-line pl-5 text-[16px] hover:font-extrabold"
                          >
                            <a
                              href={child.href}
                              className="block px-10 py-3.5 max-b580:px-[30px]"
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
