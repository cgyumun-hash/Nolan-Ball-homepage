# 이미지 넣는 곳

**원본과 동일한 파일명**을 씁니다. 아래 이름 그대로 이 폴더에 넣으면 자동 반영됩니다.

**없어도 사이트는 깨지지 않습니다** — 자리마다 그라디언트 대체 배경이 깔려 있어
사진이 없으면 그 색이 대신 보입니다.

| 파일명 | 쓰이는 곳 | 원본 화면 |
|---|---|---|
| `slide_1.jpg` | section_1 슬라이드 1 | 들판에서 손잡고 걷는 가족 (역광, 따뜻한 톤) |
| `slide_2.jpg` | section_1 슬라이드 2 | Science for Clean, Health and Earth |
| `slide_3.jpg` | section_1 슬라이드 3 | Redefining Endoscope care |
| `section_3bg.jpg` | PRODUCTS 섹션 배경 | 손 위의 작은 나무 (우측 정렬) |
| `section_4bg.jpg` | ABOUT 섹션 우하단 | 나무 사이로 보이는 빌딩 |

## 파일이 필요 없는 것

원본의 아래 이미지는 CSS·SVG 로 대체해서 **다운로드가 필요 없습니다.**

```
section_2ball.png   → CSS radial-gradient 구슬 3개
section_3icon.png   → 인라인 SVG
view_btn.png        → 인라인 SVG 화살표
prev_btn.png        → ‹ 문자
next_btn.png        → › 문자
lang.png            → 인라인 SVG 지구본
b_lang.png          → 같은 SVG 에 색만 전환
logo.png            → 텍스트 + 도형으로 재현
inquiry_btn.png     → 알약 버튼 + SVG 화살표
```

## 주의

hakambio.com 의 사진을 그대로 가져다 쓰면 저작권 침해입니다.
Vercel 에 배포하면 인터넷에 공개되므로 로컬에서 보는 것과 다릅니다.

무료 스톡에서 비슷한 분위기의 사진을 받으세요.

- https://unsplash.com
- https://www.pexels.com

검색어 예시

```
family walking field sunset backlight
hand holding small tree soil
modern building trees sky low angle
laboratory clean water science
```

## 권장 사양

- 가로 1920px 이상, JPG, 300~500KB 로 압축
- 히어로는 `height: 100vh` 라 세로로 크게 잘립니다. 주요 피사체를 가운데 두세요.
- PRODUCTS 배경은 `center right` 기준이라 **오른쪽이 잘리지 않는** 사진이 좋습니다.
