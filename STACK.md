# 기술 스택 — 설치 · 역할 · 구조

Next.js 기반 웹사이트를 만들기 위한 스택 문서입니다.
**설치 방법**, **각 기술이 어디에 쓰이는지**, **프로젝트 구조**를 정리했습니다.

---

## 1. 전체 스택 한눈에

| 분류 | 기술 | 역할 | 설치 |
|---|---|---|---|
| **언어** | HTML | 구조 | 별도 설치 없음 |
| | CSS | 모양 | 별도 설치 없음 |
| | JavaScript | 동작 | 별도 설치 없음 |
| | **TypeScript** 5 | 타입 검사 | 프로젝트 생성 시 포함 |
| **프레임워크** | **Next.js** 15 | 서버 · 라우팅 · 빌드 | `create-next-app` |
| | **React** 19 | UI 컴포넌트 | Next.js에 포함 |
| **스타일·모션** | **Tailwind CSS** v4 | 스타일 | `create-next-app` 옵션 |
| | **Framer Motion** 12 | 애니메이션 | `npm i framer-motion` |
| | **Swiper** 11 | 슬라이더 | `npm i swiper` |
| **도구** | **Node.js** 22 | JS 실행 환경 | winget |
| | **npm** | 패키지 설치 | Node.js에 포함 |
| | **Git** | 버전 관리 | winget |
| | **ESLint** | 실수 검출 | `create-next-app` 옵션 |
| | **VS Code** | 편집기 | 별도 설치 |
| **배포** | **GitHub** | 코드 저장 | 계정만 |
| | **Vercel** | 호스팅 | 계정만 |

> HTML · CSS · JavaScript 는 브라우저에 내장된 언어라 설치 대상이 아닙니다.
> TypeScript · React · ESLint 는 `create-next-app` 이 한 번에 넣어줍니다.

---

## 2. 설치 순서

### 0단계 — 사전 확인

```powershell
node -v          # v22.x  이상
npm -v           # 10.x   이상
git --version    # 2.x    이상
```

`용어가 인식되지 않습니다` 가 나오면 **터미널을 완전히 닫고 새로 열기**.
그래도 안 되면 아래로 설치 (관리자 PowerShell):

```powershell
winget install --id OpenJS.NodeJS.LTS --source winget
winget install --id Git.Git --source winget
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

> **PATH 캐시 주의:** 프로그램을 설치해도 이미 열려 있던 터미널은 옛 경로를 들고 있습니다. 반드시 새로 여세요.

### 1단계 — 프로젝트 생성

한 줄로 Next.js + TypeScript + Tailwind + ESLint 가 모두 설정됩니다.

```powershell
cd c:\Users\user\homepage
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"
```

| 옵션 | 뜻 |
|---|---|
| `.` | 현재 폴더에 생성 |
| `--typescript` | `.tsx` 파일 + 타입 검사 |
| `--tailwind` | Tailwind CSS v4 설정 포함 |
| `--eslint` | 실수 검출 도구 포함 |
| `--app` | App Router (폴더 = URL) |
| `--no-src-dir` | `app/` 을 루트에 생성 |
| `--import-alias "@/*"` | `@/components/Header` 형태로 import |

### 2단계 — 추가 패키지

```powershell
npm install framer-motion swiper
```

### 3단계 — 버전 관리

```powershell
git init
git add .
git commit -m "프로젝트 초기 설정"
```

### 4단계 — 실행

```powershell
npm run dev
```

→ http://localhost:3000

---

## 3. 각 기술이 실제로 어디에 쓰이는가

### Next.js — 파일이 곧 주소

```
app/page.tsx           →  /
app/about/page.tsx     →  /about
app/products/page.tsx  →  /products
app/layout.tsx         →  모든 페이지를 감싸는 껍데기
```

라우터를 따로 설정하지 않습니다. **폴더를 만들면 URL이 생깁니다.**

```tsx
// app/page.tsx — 서버 컴포넌트 (기본값)
export default function Home() {
  return <main>홈</main>;
}
```

### React — 화면을 조각으로

```tsx
// components/Header.tsx
export default function Header() {
  return <header>로고 · 메뉴</header>;
}
```
```tsx
// app/page.tsx 에서 조립
import Header from "@/components/Header";
<Header />
```

### TypeScript — 저장할 때 실수 잡기

```tsx
type Slide = { title: string; image: string };

const slides: Slide[] = [
  { title: "첫 번째", image: "/a.jpg" },
  { title: "두 번째" },              // ❌ image 없음 → 빨간 줄
];
```

### Tailwind CSS — 클래스로 스타일

```tsx
<h1 className="text-[60px] font-bold text-white max-md:text-[38px]">
```

실제로 만들어지는 CSS:

```css
font-size: 60px;  font-weight: 700;  color: #fff;
@media (width < 768px) { font-size: 38px; }
```

공통 색·폰트는 `app/globals.css` 의 `@theme` 에 한 번만 선언합니다.

```css
@theme {
  --color-brand-500: #1eac44;   /* → bg-brand-500, text-brand-500 자동 생성 */
}
```

### Framer Motion — 움직임 (클라이언트 컴포넌트 필수)

```tsx
"use client";                     // ← 없으면 에러
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 24 }}      // 시작
  whileInView={{ opacity: 1, y: 0 }}   // 화면에 들어오면
  viewport={{ once: true }}            // 한 번만
  transition={{ duration: 0.7 }}
/>
```

| 자주 쓰는 기능 | 하는 일 |
|---|---|
| `initial` / `animate` | 시작 → 도착 |
| `whileInView` | 스크롤로 들어올 때 |
| `whileHover` / `whileTap` | 마우스 · 클릭 반응 |
| `exit` + `AnimatePresence` | **사라질 때** (CSS로는 불가능) |
| `variants` + `staggerChildren` | 자식들을 시간차로 등장 |
| `useScroll` + `useTransform` | 스크롤 연동 패럴랙스 |

### Swiper — 슬라이더 전담

```tsx
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";

<Swiper
  modules={[Autoplay, Navigation, Pagination]}
  loop
  autoplay={{ delay: 3000 }}
  pagination={{ type: "fraction" }}
>
  <SwiperSlide>슬라이드 1</SwiperSlide>
</Swiper>
```

터치 스와이프 · 키보드 조작 · 스크린리더 대응이 **자동으로** 따라옵니다.

### ESLint — 저장할 때 검사

```powershell
npm run lint
```

VS Code에 ESLint 확장을 설치하면 타이핑하는 동안 표시됩니다.

### Node.js — 이 모든 것의 엔진

브라우저는 `.tsx` 도 Tailwind 클래스도 모릅니다. Node.js가 번역합니다.

```
내가 쓴 것          Node.js 가 변환         브라우저가 받는 것
─────────────────────────────────────────────────────────
page.tsx      →                      →    .html
Header.tsx    →      Next.js         →    .js
className=".."→      Tailwind        →    .css
```

---

## 4. 구조도

### 4-1. 폴더 구조

```
homepage/
├── app/                    ← 페이지 (폴더 = URL)
│   ├── layout.tsx            모든 페이지 공통 껍데기 · 폰트 · 메타데이터
│   ├── page.tsx              "/" 홈페이지
│   └── globals.css           Tailwind 진입점 + @theme 디자인 토큰
│
├── components/             ← 재사용 조각
│   ├── Header.tsx
│   ├── Hero.tsx
│   └── Footer.tsx
│
├── lib/                    ← 데이터 · 유틸
│   └── site.ts               텍스트를 한곳에 모음
│
├── public/                 ← 정적 파일 (그대로 서빙)
│   └── images/               /images/logo.png 로 접근
│
├── package.json            설치된 패키지 목록
├── tsconfig.json           TypeScript 설정
├── next.config.ts          Next.js 설정
├── postcss.config.mjs      Tailwind 연결
│
├── node_modules/           설치된 패키지 실물 (git 제외)
└── .next/                  빌드 결과물 (git 제외)
```

### 4-2. 기술 층 구조

```
┌─────────────────────────────────────────────┐
│  데이터층    lib/site.ts · DB · CMS          │
├─────────────────────────────────────────────┤
│  서버층      Next.js (Server Actions)        │
├─────────────────────────────────────────────┤
│  구조층      React (JSX)                     │
├─────────────────────────────────────────────┤
│  모양층      Tailwind CSS          ← 항상    │
├─────────────────────────────────────────────┤
│  움직임층    Framer Motion + Swiper ← 선택   │
└─────────────────────────────────────────────┘
              전부 TypeScript 로 작성
                      ▼
                 Node.js 가 실행
```

### 4-3. 요청 → 화면 흐름

```
[브라우저]                         [Node.js 서버]
    │
    │  localhost:3000 요청
    ├────────────────────────────────►
    │                                  ① app/page.tsx 실행
    │                                  ② Header·Hero·Footer 조립
    │                                  ③ Tailwind → CSS 생성
    │                                  ④ HTML 완성
    │  HTML + CSS + JS                 │
    ◄────────────────────────────────┤
    │
  ⑤ 화면 표시 (이미 완성된 HTML → SEO 유리)
  ⑥ JS 로딩 후 React 가 이벤트 연결
  ⑦ Framer Motion · Swiper 동작 시작
```

### 4-4. 컴포넌트 조립 구조

```
app/layout.tsx  ← 폰트 · <html> · <body>
      │
      └── app/page.tsx  (서버 컴포넌트)
             │
             ├── <Header />        "use client"  ← 메뉴 열림/닫힘 상태
             ├── <Hero />          "use client"  ← Swiper + Framer Motion
             ├── <Section />       "use client"  ← 스크롤 등장
             └── <Footer />        서버 컴포넌트  ← 움직임 없음
```

> **규칙:** 움직임이나 상태가 있으면 `"use client"`, 그냥 보여주기만 하면 서버 컴포넌트.
> 서버 컴포넌트가 많을수록 브라우저가 받는 JS가 줄어 빨라집니다.

---

## 5. 명령어 치트시트

```powershell
# 개발
npm run dev            # 개발 서버 (localhost:3000), 종료는 Ctrl+C
npm run build          # 배포용 빌드
npm run start          # 빌드 결과 실행
npm run lint           # 코드 검사

# 패키지
npm install <이름>      # 설치
npm uninstall <이름>    # 제거
npm list --depth=0     # 설치 목록

# Git
git status             # 변경 확인
git add .              # 전체 스테이징
git commit -m "메시지"  # 커밋
git push               # GitHub 업로드
```

---

## 6. 배포 (GitHub → Vercel)

```
① GitHub 에서 새 저장소 생성
② git remote add origin <주소>
   git branch -M main
   git push -u origin main
③ vercel.com 접속 → GitHub 로그인
④ 저장소 선택 → Deploy
⑤ 몇 분 뒤 https://프로젝트명.vercel.app 생성
```

이후로는 `git push` 만 하면 **자동으로 다시 배포**됩니다.

---

## 7. 자주 막히는 지점

| 증상 | 원인 · 해결 |
|---|---|
| `npm/node/git 용어가 인식되지 않습니다` | PATH 캐시 → **터미널 새로 열기** |
| `.ps1 파일을 로드할 수 없습니다` | `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser` |
| `useState is not defined` 류 에러 | 파일 맨 위에 `"use client"` 누락 |
| Tailwind 클래스가 안 먹힘 | 오타 · 개발 서버 재시작 |
| `EADDRINUSE :3000` | 포트 사용 중 → `npm run dev -- -p 3001` |
| `Module not found` | `npm install` 안 함 또는 경로 오타 |

---

## 8. 쓰지 않는 것

| 기술 | 이유 |
|---|---|
| jQuery | React 가 대체 |
| Redux · Zustand | 페이지가 복잡해지면 그때 |
| GraphQL | REST 로 충분한 규모 |
| Docker · AWS | Vercel 이 처리 |
| Vue · Svelte | React 하나를 제대로 |
| 별도 백엔드 언어 | Next.js 가 서버까지 담당 |
