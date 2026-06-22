# 게임형 포트폴리오 — 구현 계획서

> **컨셉:** "60 Seconds!" 스타일의 집 내부 탐험 포트폴리오  
> **스택:** Next.js 16 · React 19 · TypeScript · Three.js · React Three Fiber · Zustand

---

## 1. 집 구조 (House Layout)

이미지 기준 탑다운 뷰. Three.js 좌표계 기준:
- **X축:** 좌(-) → 우(+)
- **Z축:** 위/북(-) → 아래/남(+)
- **Y축:** 바닥(0) → 위(+)

```
         -7          -2   0        7
          |           |   |        |
 -6  ┌────────────────────────────┐  ← 북쪽 벽
     │     나가는문               │
     │  ┌──────┐    ┌──────────┐  │
     │  │ 냉장 │    │          │  │
     │  │  고  │    │  거실    │  │
 -3  │  └──────┘    │  식탁    │  │
     │               │          │  │
     │ 주방  │       └──────────┘  │
     │ 싱크대│                     │
  0  ├────────────■■■────■■■──────┤  ← 중간 벽 (■=문)
     │ ┌──────────┐ ┊  ┌─────────┐│
     │ │          │ ┊  │컴퓨터   ││
     │ │  2층침대  │ ┊  │책상     ││
  3  │ │          │ ┊  ├─────────┤│
     │ └──────────┘ ┊  │         ││
     │              ┊  │  침대   ││
  6  └──────────────────────────── ┘  ← 남쪽 벽
```

### 방 구분

| 구역 | X 범위 | Z 범위 | 설명 |
|------|--------|--------|------|
| 거실/주방 (오픈 플랜) | -7 ~ 7 | -6 ~ 0 | 단일 대형 공간 |
| 안방 (왼쪽 아래) | -7 ~ -2 | 0 ~ 6 | 2층침대 |
| 복도/화장실 (중간) | -2 ~ 0 | 0 ~ 6 | 통로 |
| 침실 (오른쪽 아래) | 0 ~ 7 | 0 ~ 6 | 컴퓨터책상 + 침대 |

### 문(doorway) 위치

| 문 | X 위치 | Z 위치 | 너비 |
|----|--------|--------|------|
| 나가는문 (북쪽 외벽) | -1 ~ 1 | -6 (북쪽) | 2 units |
| 중간 벽 왼쪽 문 | -3 ~ -1.5 | 0 | 1.5 units |
| 중간 벽 오른쪽 문 | 1.5 ~ 3 | 0 | 1.5 units |

---

## 2. 가구 배치 및 포트폴리오 매핑

| ID | 가구 | 3D 위치 (x, z) | 회전 | 포트폴리오 섹션 | 인터랙션 |
|----|------|----------------|------|-----------------|----------|
| `kitchen-sink` | 주방싱크대 | (-6, -3) | 서쪽 벽 향함 | **기술 스택** | 설거지 애니메이션 + 스킬 목록 |
| `refrigerator` | 냉장고 | (-3, -5) | 남쪽 향함 | **즐겨찾기 / 영감** | 문 열림 + 내용물 표시 |
| `dining-table` | 거실 식탁 | (4, -3) | 정면 | **협업 / 연락처** | 앉기 모션 + 연락처 카드 |
| `bunk-bed` | 2층침대 | (-4.5, 3) | 동쪽 향함 | **사이드 프로젝트** | 올라타기 애니메이션 + 프로젝트 목록 |
| `computer-desk` | 컴퓨터책상 | (3.5, 1.5) | 서쪽 향함 | **업무 경험 / 메인 프로젝트** | 타이핑 애니메이션 + 이력서 |
| `bed` | 침대 | (3.5, 4.5) | 정면 | **About Me** | 눕기 모션 + 자기소개 |

---

## 3. 캐릭터 디자인 (Chalk Figure)

### 비주얼
- **소재:** 분필 느낌 — MeshStandardMaterial (color: `#F5F2EC`, roughness: 0.88, metalness: 0)
- **눈:** 작은 어두운 구체 2개 (얼굴 앞면)
- **코:** 더 작은 구체 1개
- **손:** 팔 끝 작은 구체
- **발:** 넓적한 BoxGeometry (신발 모양)

### 신체 구조 (Three.js Primitives)

```
  ●        ← Head: SphereGeometry(r=0.22)
  │
╔═══╗      ← Body: CylinderGeometry(top=0.16, bottom=0.20, h=0.65)
║   ║
╝   ╚      ← Arms: CylinderGeometry(r=0.05, h=0.45) × 2 (각도 ±30°)
 ●     ●   ← Hands: SphereGeometry(r=0.07) × 2
  |   |    ← Legs: CylinderGeometry(r=0.065, h=0.48) × 2 (walk animation)
 ■■   ■■   ← Feet: BoxGeometry(0.14 × 0.09 × 0.22) × 2
```

### 애니메이션
- **Idle:** 상하 미세 bobbing (sin 함수, 주기 1.5s)
- **Walk:** 좌우 다리 반대 방향 회전 (±25°), 팔 역방향 스윙
- **Interact:** 손 들기 모션 (0.5s tween)
- **방향:** 이동 방향으로 캐릭터 Y축 회전 (smooth lerp)

---

## 4. 조작 방법

| 키 | 동작 |
|----|------|
| `↑` / `W` | 앞으로 이동 |
| `↓` / `S` | 뒤로 이동 |
| `←` / `A` | 왼쪽으로 이동 |
| `→` / `D` | 오른쪽으로 이동 |
| `E` | 가까운 가구와 상호작용 |
| `ESC` | 모달 닫기 |

---

## 5. 카메라

- **타입:** Isometric-ish Follow Camera (고정 오프셋)
- **오프셋:** `(0, 13, 10)` — 캐릭터 기준
- **LookAt:** 캐릭터 위치 `+ (0, 0, -1)` (약간 앞을 봄)
- **Follow:** `lerp(current, target, 0.06)` per frame (부드러운 추적)
- **FOV:** 50°

---

## 6. 인터랙션 시스템

### 흐름
```
캐릭터 이동
    ↓
매 프레임: 각 가구까지 거리 계산
    ↓
거리 ≤ 2.0 units → "E 상호작용" 프롬프트 표시 (floating HTML)
    ↓
E 키 입력 → 인터랙션 모달 오픈 + 캐릭터 인터랙션 애니메이션
    ↓
ESC or 닫기 버튼 → 모달 클로즈
```

### 모달 UI 스타일
- 게임 다이얼로그 박스 스타일
- 반투명 어두운 배경 + 테두리
- 제목 / 이모지 / 내용 구조
- 포트폴리오 실제 데이터 표시

---

## 7. 씬 구성 (Three.js Scene)

### 조명
- **AmbientLight:** `#FFF5E0`, intensity 0.4 (따뜻한 전반적 조명)
- **DirectionalLight:** `#FFF8F0`, intensity 0.8, position `(3, 10, 5)`, castShadow
- **PointLight × 2:** 거실/침실 천장 위치, warm white, intensity 0.6

### 색상 팔레트
| 요소 | 색상 | 비고 |
|------|------|------|
| 배경 (씬) | `#1C1410` | 어두운 갈색 |
| 바닥 | `#5C4033` | 진한 원목 |
| 벽 | `#E8D5B7` | 따뜻한 베이지 |
| 가구 | 각각 다른 목재 톤 | 갈색 계열 |
| 캐릭터 | `#F5F2EC` | 분필 흰색 |

### 그림자
- Renderer: `shadowMap.type = PCFSoftShadowMap`
- 캐릭터 + 가구 모두 `castShadow / receiveShadow`

---

## 8. 충돌 감지 (Collision Detection)

AABB (Axis-Aligned Bounding Box) on XZ plane.

### 벽 충돌 박스
```typescript
// 외벽 4개 + 중간벽 분절 (문 구간 제외)
const WALL_BOXES = [
  // 외벽
  { minX: -7.2, maxX: 7.2, minZ: -6.2, maxZ: -5.8 },  // 북쪽
  { minX: -7.2, maxX: 7.2, minZ: 5.8, maxZ: 6.2 },    // 남쪽
  { minX: -7.2, maxX: -6.8, minZ: -6.2, maxZ: 6.2 },  // 서쪽
  { minX: 6.8, maxX: 7.2, minZ: -6.2, maxZ: 6.2 },    // 동쪽
  // 중간 벽 (문 2개 제외)
  { minX: -7.0, maxX: -3.0, minZ: -0.2, maxZ: 0.2 },  // 왼쪽 구간
  { minX: -1.5, maxX: 1.5, minZ: -0.2, maxZ: 0.2 },   // 중간 구간
  { minX: 3.0, maxX: 7.0, minZ: -0.2, maxZ: 0.2 },    // 오른쪽 구간
]
```

- **Player radius:** 0.3 units (충돌 박스에 이 값을 마진으로 추가)
- 충돌 시 해당 축 방향 이동만 차단 (X/Z 독립 처리)

---

## 9. 파일 구조

```
src/
├── types/
│   └── game.ts                    # FurnitureConfig, CollisionBox, ModalContent 등
├── data/
│   └── gameConfig.ts              # 가구 위치, 충돌 박스, 포트폴리오 내용
├── store/
│   └── gameStore.ts               # Zustand — 플레이어 위치, 인터랙션 상태
├── hooks/
│   └── useKeyboardInput.ts        # 키 입력 상태 추적
├── components/
│   ├── game/
│   │   ├── GameCanvas.tsx         # Canvas 래퍼 (SSR disabled)
│   │   ├── GameScene.tsx          # 메인 씬 + 게임 루프 (useFrame)
│   │   ├── Character.tsx          # 분필 캐릭터 + 애니메이션
│   │   ├── House.tsx              # 바닥, 벽, 천장(없음)
│   │   ├── CameraController.tsx   # Follow camera
│   │   └── furniture/
│   │       ├── KitchenSink.tsx    # 주방싱크대
│   │       ├── Refrigerator.tsx   # 냉장고
│   │       ├── DiningTable.tsx    # 거실 식탁
│   │       ├── BunkBed.tsx        # 2층침대
│   │       ├── ComputerDesk.tsx   # 컴퓨터책상
│   │       └── Bed.tsx            # 침대
│   └── ui/
│       ├── InteractionPrompt.tsx  # "E 상호작용" HUD
│       └── InteractionModal.tsx   # 포트폴리오 콘텐츠 모달
└── app/
    ├── page.tsx                   # 게임 진입점
    ├── layout.tsx
    └── globals.css
```

---

## 10. 구현 순서 (Phases)

### Phase 1 — 기반 구조
1. `types/game.ts` + `data/gameConfig.ts` 작성
2. `store/gameStore.ts` 작성 (Zustand)
3. `hooks/useKeyboardInput.ts` 작성
4. `app/page.tsx` + `GameCanvas.tsx` 기본 틀

### Phase 2 — 씬 & 집
5. `House.tsx` — 바닥 + 벽 + 방 구조
6. `CameraController.tsx` — 팔로우 카메라

### Phase 3 — 캐릭터
7. `Character.tsx` — 분필 캐릭터 빌드
8. `GameScene.tsx` — 이동 로직 + 충돌 감지

### Phase 4 — 가구
9. 가구 6종 컴포넌트 제작 (각각 3D 기하학)

### Phase 5 — 인터랙션
10. `InteractionPrompt.tsx` — 근처 가구 감지 HUD
11. `InteractionModal.tsx` — 포트폴리오 모달 UI
12. 실제 포트폴리오 콘텐츠 입력

### Phase 6 — 폴리싱
13. 조명, 그림자, 색상 조정
14. 애니메이션 튜닝 (walk cycle, interact)
15. 모바일 터치 컨트롤 (선택)
16. 로딩 화면 + 조작법 안내 오버레이

---

## 11. 미결정 사항 (확인 필요)

- [ ] **포트폴리오 실제 내용** — 각 가구별 텍스트/링크 제공 필요
- [ ] **나가는문 인터랙션** — 클릭 시 외부 링크(GitHub/LinkedIn) or 그냥 데코?
- [ ] **배경 BGM / 효과음** — 추가 여부
- [ ] **모바일 지원** — 가상 D-pad 버튼 추가 여부
- [ ] **복도/중간 공간** — 화장실로 표현? 빈 공간? 별도 인터랙션?
- [ ] **가구 이름 표시** — 항상 floating label로 보여줄지, 근접 시에만 보여줄지

---

*작성일: 2026-06-22*
