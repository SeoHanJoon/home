import type { CollisionBox, FurnitureConfig } from '@/types/game'

export const PLAYER_SPEED = 5
export const PLAYER_RADIUS = 0.3
export const INTERACTION_RADIUS = 2.2

// ── Furniture ─────────────────────────────────────────────────────────────────

export const FURNITURE_CONFIGS: FurnitureConfig[] = [
  {
    id: 'kitchen-sink',
    position: [-6.5, 0, -3],
    rotation: [0, Math.PI / 2, 0],
    label: '주방 싱크대',
    interactionRadius: INTERACTION_RADIUS,
    content: {
      emoji: '🔧',
      title: 'Tech Stack',
      subtitle: '기술 스택',
      body: '사용하는 기술들을 설거지하듯 깔끔하게 정리했어요.\n\nFrontend: React, Next.js, TypeScript, Tailwind CSS\nBackend: Node.js, NestJS, PostgreSQL, Redis\nCloud: AWS, Docker, CI/CD\nTools: Git, Figma, Notion',
    },
  },
  {
    id: 'refrigerator',
    position: [-3.5, 0, -4.8],
    rotation: [0, 0, 0],
    label: '냉장고',
    interactionRadius: INTERACTION_RADIUS,
    content: {
      emoji: '🧊',
      title: 'Bookmarks',
      subtitle: '즐겨찾기 & 영감',
      body: '개발하면서 영향을 받은 것들을 냉장 보관 중이에요.\n\n📖 Clean Code — Robert C. Martin\n📖 Designing Data-Intensive Applications\n🎮 60 Seconds! (이 포트폴리오 영감의 원천)\n🌐 Josh Comeau, Kent C. Dodds 블로그',
      links: [
        { label: 'GitHub Stars', href: 'https://github.com' },
      ],
    },
  },
  {
    id: 'dining-table',
    position: [4, 0, -3],
    rotation: [0, 0, 0],
    label: '거실 식탁',
    interactionRadius: INTERACTION_RADIUS,
    content: {
      emoji: '🍽️',
      title: 'Contact',
      subtitle: '함께하고 싶으신가요?',
      body: '같이 밥 먹으면서 이야기 나눠요!\n맛있는 아이디어와 함께라면 언제든지 환영합니다.\n\n📧 gkswnsy@gmail.com\n💼 협업, 채용 문의 모두 환영합니다.',
      links: [
        { label: 'Email', href: 'mailto:gkswnsy@gmail.com' },
        { label: 'LinkedIn', href: 'https://linkedin.com' },
        { label: 'GitHub', href: 'https://github.com' },
      ],
    },
  },
  {
    id: 'bunk-bed',
    position: [-5.25, 0, 3],
    rotation: [0, 0, 0],
    label: '2층 침대',
    interactionRadius: INTERACTION_RADIUS,
    content: {
      emoji: '🏗️',
      title: 'Side Projects',
      subtitle: '사이드 프로젝트',
      body: '퇴근 후 아래 칸에서 잠들기 전, 위 칸에서는 사이드 프로젝트가 돌아가요.\n\n🚀 프로젝트 A — 설명\n🚀 프로젝트 B — 설명\n🚀 이 포트폴리오 — 게임형 포트폴리오 사이트',
      links: [
        { label: 'GitHub', href: 'https://github.com' },
      ],
    },
  },
  {
    id: 'computer-desk',
    position: [4.5, 0, 1.5],
    rotation: [0, Math.PI, 0],
    label: '컴퓨터 책상',
    interactionRadius: INTERACTION_RADIUS,
    content: {
      emoji: '💻',
      title: 'Work Experience',
      subtitle: '경력 사항',
      body: '이 책상 앞에서 보낸 시간들이에요.\n\n🏢 회사명 (2023 – 현재)\n  포지션: 풀스택 개발자\n  주요 업무: ...\n\n🏢 이전 회사 (2021 – 2023)\n  포지션: 프론트엔드 개발자\n  주요 업무: ...',
      links: [
        { label: '이력서 보기', href: '/resume.pdf' },
      ],
    },
  },
  {
    id: 'bed',
    position: [3.5, 0, 4.5],
    rotation: [0, 0, 0],
    label: '침대',
    interactionRadius: INTERACTION_RADIUS,
    content: {
      emoji: '🛏️',
      title: 'About Me',
      subtitle: '안녕하세요 👋',
      body: '저는 이한준입니다.\n만드는 것을 좋아하는 풀스택 개발자예요.\n\n사용자가 좋아하는 제품을 만들고 싶어서\n코드를 짜고, 고민하고, 또 짜고 있습니다.\n\n잠들기 전에 아이디어를 떠올리고,\n일어나서 그걸 코드로 옮기는 하루를 보냅니다.',
      links: [
        { label: 'GitHub', href: 'https://github.com' },
        { label: 'Blog', href: 'https://blog.example.com' },
      ],
    },
  },
]

// ── Collision Boxes ────────────────────────────────────────────────────────────
//
// House layout (top-down, Three.js coords):
//   Upper open area:       x∈[-7,7],    z∈[-6,0]
//   안방 (2층침대):        x∈[-7,-3.5], z∈[0,6]
//   Central (sealed):      x∈[-3.5,0],  z∈[0,6]  ← inaccessible
//   침실 (desk+bed):       x∈[0,7],     z∈[0,6]
//   Left doorway (→안방):  x∈[-5,-3.5] at z=0
//   Right doorway (→침실): x∈[0,1.5]   at z=0

export const ALL_COLLISION_BOXES: CollisionBox[] = [
  // ── Outer walls ──────────────────────────────────────────────────────────────
  { minX: -7.4, maxX: -1.1, minZ: -6.4, maxZ: -5.8 }, // North-left (나가는문 gap at x∈[-1,1])
  { minX: 1.1, maxX: 7.4, minZ: -6.4, maxZ: -5.8 },   // North-right
  { minX: -7.4, maxX: 7.4, minZ: 5.8, maxZ: 6.4 },    // South
  { minX: -7.4, maxX: -6.8, minZ: -6.4, maxZ: 6.4 },  // West
  { minX: 6.8, maxX: 7.4, minZ: -6.4, maxZ: 6.4 },    // East

  // ── Middle horizontal wall (z=0) ─────────────────────────────────────────────
  // Doorways: left x∈[-5,-3.5], right x∈[0,1.5]
  { minX: -7.0, maxX: -5.0, minZ: -0.25, maxZ: 0.25 }, // left segment
  { minX: -3.5, maxX: 0.0, minZ: -0.25, maxZ: 0.25 },  // center segment
  { minX: 1.5, maxX: 7.0, minZ: -0.25, maxZ: 0.25 },   // right segment

  // ── Inner vertical walls (lower section) ──────────────────────────────────────
  { minX: -3.7, maxX: -3.3, minZ: 0.0, maxZ: 6.4 }, // x=-3.5: right wall of 안방
  { minX: -0.2, maxX: 0.2, minZ: 0.0, maxZ: 6.4 },  // x=0:    left wall of 침실

  // ── Furniture ─────────────────────────────────────────────────────────────────
  { minX: -7.2, maxX: -6.0, minZ: -3.9, maxZ: -2.1 }, // 주방싱크대 (rotated, near west wall)
  { minX: -4.1, maxX: -2.9, minZ: -5.3, maxZ: -4.3 }, // 냉장고
  { minX: 2.4, maxX: 5.6, minZ: -4.2, maxZ: -1.8 },   // 거실식탁 (chairs included)
  { minX: -6.3, maxX: -4.2, minZ: 2.5, maxZ: 3.5 },   // 2층침대
  { minX: 3.5, maxX: 6.5, minZ: 0.9, maxZ: 2.1 },     // 컴퓨터책상
  { minX: 2.7, maxX: 4.3, minZ: 3.4, maxZ: 5.7 },     // 침대
]
