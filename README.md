# Nolan-Ball-homepage

HaKam Bio기반 Nolan Ball homepage만들기

## 기술 스택

Next.js · React · TypeScript · Tailwind CSS · Framer Motion · Swiper

## 주요활동 관리자

회사 활동 게시물은 Neon Postgres에 저장하고 사진·영상은 Vercel Blob에 저장합니다.

- 공개 목록: `/about/activities`
- 관리자: `/admin`
- 최초 관리자 생성: `/admin/setup`
- 스키마 원본: `db/migrations/001_activities.sql`

Vercel 프로젝트에는 다음 환경변수가 필요합니다. 실제 비밀값은 저장소에 커밋하지 않습니다.

```text
DATABASE_URL
BLOB_READ_WRITE_TOKEN
ADMIN_SETUP_TOKEN
```

`ADMIN_SETUP_TOKEN`에는 충분히 긴 임의 문자열을 넣습니다. 첫 배포 후 `/admin/setup`에서 관리자 계정을 한 번 생성하면 이후에는 `/admin/login`을 사용합니다. 게시물 작성 화면에서 JPG·PNG 이미지는 WebP로 변환된 뒤 Blob에 업로드됩니다.

---

## 1주차
- skill stack 세팅 
- 개발환경 세팅

---

## Git 컨벤션

### 브랜치

```
<타입>/<작업내용>
```

| 타입 | 용도 | 예시 |
|---|---|---|
| `feat/` | 새 기능 | `feat/hero-section` |
| `fix/` | 버그 수정 | `fix/header-mobile` |
| `style/` | 디자인·CSS | `style/footer-layout` |
| `refactor/` | 코드 정리 | `refactor/site-data` |
| `docs/` | 문서 | `docs/readme` |
| `chore/` | 설정·패키지 | `chore/install-swiper` |

- 소문자, 단어 사이는 하이픈(`-`)
- 한글 대신 영어

```powershell
git checkout -b feat/hero-section
```

### 커밋 메시지

```
<타입>: <무엇을 했는지>
```

| 타입 | 용도 |
|---|---|
| `feat` | 새 기능 추가 |
| `fix` | 버그 수정 |
| `style` | 디자인·CSS (동작 변화 없음) |
| `refactor` | 코드 구조 개선 (동작 변화 없음) |
| `docs` | 문서 수정 |
| `test` | 테스트 코드 |
| `chore` | 패키지 설치, 설정 변경 |


```
