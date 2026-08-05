<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# 이 프로젝트가 하는 일

**하캄바이오(hakambio.com) 홈페이지의 레이아웃·컴포넌트·CSS 를 최대한 재사용하되, 메뉴 구성과 내용은 놀란볼코리아(Nolan Ball Korea) 요구사항을 따릅니다.**

- 레이아웃, 컴포넌트, CSS, 반응형 브레이크포인트는 그대로 씁니다.
- 메뉴는 자료정리 문서 **1-2 추천 홈페이지 메뉴** 7개 구조를 따릅니다.
- 라우트는 가능한 한 기존 것을 재사용해 구조 변경을 최소화합니다.

**충돌하면 자료정리 문서(md)가 우선입니다.** 원본 하캄바이오 사이트나 카탈로그·제안서의 표현보다
md 에 적힌 내용과 표현 수위가 먼저입니다.

## 콘텐츠 원본

콘텐츠를 쓰기 전에 반드시 읽으세요. **md 가 1순위 기준입니다.**

- [자료넣기/놀란볼코리아_홈페이지_콘텐츠_자료정리.md](자료넣기/놀란볼코리아_홈페이지_콘텐츠_자료정리.md) — 게시용 문구, 회사 정보, 제품 규격, 표현 수위 가이드, 확인 체크리스트

보조 자료(같은 [자료넣기/](자료넣기/) 폴더):

| 파일 | 쓰임 |
|---|---|
| `01.Nolan Ball_Catalog.pdf` | 제품 규격표, 4대 핵심 장점, 메인 비주얼 |
| `02.Nolan Ball_제품소개서.pdf` | Micro-Anatomy 구조 설명, 브러시 방식의 한계 |
| `03.Nolan Ball_병원제안서.pptx` | 논문 근거, CFU 시험, 경제성 분석, 도입 시나리오 |
| `03.Nolan Ball_병원제안서_인건비.xlsx` | 인건비 절감 계산 근거 |
| `nolan ball 시험성적.pdf` | 미생물검사 결과보고서 9건 (이미 게시됨) |
| `제안서_Nollan Ball Korea.pdf` | 기술 배경, 정책 제안 |

## 이미지

**이미지는 사용자 검수 없이 `public/images/` 에 넣지 않습니다.**
추출한 후보는 [자료넣기/이미지검수/](자료넣기/이미지검수/) 에 두고 확인을 받은 뒤 옮깁니다.

## 보조 자료에서 그대로 가져오면 안 되는 것

- **경쟁사 실명 비교** — 병원제안서 slide 12 는 "ACF 필터볼(하캄)" 등 경쟁사를 실명으로
  깎아내립니다. 공개 홈페이지에 그대로 올리면 비교광고·명예훼손 위험이 있습니다.
- **"Bullan Bio" / "Bullan Bio Solution"** — 제안서·제품소개서에 이 이름이 박혀 있지만
  md 5-1 은 회사명을 "놀란볼코리아 / Nolan Ball Korea" 로 통일하라고 정합니다.
- **미검증 수치·단정 표현** — "0 CFU", "완전한 세척", "미세균 사멸", "바이오필름 완전 차단" 등.
  md 4-3 표현 수위 검토를 따르세요.

## 메뉴 구조 (md 1-2)

| 메뉴 | 라우트 | 비고 |
|---|---|---|
| MAIN | `/` | 기존 |
| PRODUCT | `/products/*` | 기존 3개 제품 라우트 재사용 |
| TECHNOLOGY | `/about/technology-overview` | 기존 라우트 재사용 |
| HOW TO USE | `/how-to-use` | 신규 |
| TEST & DATA | `/about/certifications` | 기존 라우트 재사용 |
| DOWNLOAD | `/customer-support/resources-downloads` | 기존 라우트 재사용 |
| ABOUT / CONTACT | `/about/overview` · `/about/location` · `/customer-support/online-inquiry` | 기존 |

md 1-2 에 없어서 메뉴에서 뺀 페이지: `/business`, `/about/organization`,
`/customer-support/notices`. 파일은 남아 있지만 링크되지 않습니다.

## 콘텐츠 작업 시 지켜야 할 것

- 사이트 문구는 [lib/site.ts](lib/site.ts) 한 곳에 모여 있습니다. 컴포넌트에 직접 쓰지 마세요.
- 회사명은 국문 "놀란볼코리아", 영문 "Nolan Ball Korea"로 통일합니다.
- md 4-3 **표현 수위 검토**를 따릅니다. "완전 세척", "미세균 사멸", "바이오필름 완전 차단", "감염 예방 보장", "멸균·소독 제품" 은 쓰지 않습니다.
- md 에서 `확인 필요`·`미확정`으로 표시된 항목(최종 규격, 포장단위, 제품코드, 법적 분류, 대표자명 등)은 임의로 채우지 말고 사용자에게 확인합니다.
- 사이트는 국문 우선입니다. 영문은 확정 후 `/en` 으로 별도 추가합니다(md 7-1).
