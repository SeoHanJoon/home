export interface CollisionBox {
  minX: number
  maxX: number
  minZ: number
  maxZ: number
}

export interface ModalContent {
  title: string
  subtitle: string
  body: string
  emoji: string
  links?: { label: string; href: string }[]
}

export interface FurnitureConfig {
  id: string
  position: [number, number, number]
  rotation: [number, number, number]
  label: string
  interactionRadius: number
  content: ModalContent
}
