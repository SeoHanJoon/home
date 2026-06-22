# 🏠 Home — Game Portfolio

**60 Seconds!** 게임에서 영감을 받은 게임형 포트폴리오 사이트.  
분필 캐릭터가 집 안을 자유롭게 탐험하며, 가구에 다가가 상호작용하면 포트폴리오 내용을 볼 수 있습니다.

## 데모

> [배포 주소]

## 조작 방법

| 키 | 동작 |
|---|---|
| `↑` `↓` `←` `→` / `W` `A` `S` `D` | 캐릭터 이동 |
| `E` | 가구 상호작용 |
| `ESC` | 모달 닫기 |

## 집 구조

```
              [나가는문]
┌───────────────────────────────┐
│  주방싱크대  냉장고  거실식탁 │  거실/주방
│                               │
├──────────[복도문]─────────────┤  z = 0
│ ┌──────┐ ┌────┐ ┌───────────┐│
│ │      │ │    │ │컴퓨터책상 ││
│ │2층침대│ │복도│ │           ││
│ │      │ │    │ │   침대    ││
│ └──────┘ └────┘ └───────────┘│
└───────────────────────────────┘
   안방      복도      침실
```

- **거실/주방** — 냉장고, 주방싱크대, 거실식탁
- **복도** — 거실↔안방↔침실 연결 통로
- **안방** (왼쪽 아래) — 2층침대
- **침실** (오른쪽 아래) — 컴퓨터책상, 침대

## 가구 & 포트폴리오 매핑

| 가구 | 섹션 |
|------|------|
| 🛏️ 침대 | About Me |
| 💻 컴퓨터책상 | Work Experience |
| 🏗️ 2층침대 | Side Projects |
| 🔧 주방싱크대 | Tech Stack |
| 🍽️ 거실식탁 | Contact |
| 🧊 냉장고 | Bookmarks |

## 기술 스택

- **Framework:** Next.js 16 + React 19 + TypeScript
- **3D:** Three.js, React Three Fiber (`@react-three/fiber`), `@react-three/drei`
- **State:** Zustand
- **Styling:** Tailwind CSS v4

## 로컬 실행

```bash
npm install
npm run dev
# http://localhost:3000
```

## 구조

```
src/
├── app/                      # Next.js App Router
├── components/
│   ├── game/
│   │   ├── furniture/        # 가구 3D 컴포넌트 (6종)
│   │   ├── Character.tsx     # 분필 캐릭터
│   │   ├── House.tsx         # 집 구조 (벽, 바닥)
│   │   ├── GameScene.tsx     # 게임 루프, 충돌 감지
│   │   └── CameraController.tsx
│   └── ui/
│       ├── InteractionModal.tsx   # 포트폴리오 콘텐츠 모달
│       ├── InteractionPrompt.tsx  # "E 상호작용" HUD
│       └── ControlsGuide.tsx
├── data/gameConfig.ts        # 가구 위치, 충돌 박스, 콘텐츠
├── store/gameStore.ts        # Zustand 게임 상태
├── hooks/useKeyboardInput.ts
└── types/game.ts
```
