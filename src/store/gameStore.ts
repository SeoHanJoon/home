import { create } from 'zustand'

interface GameState {
  playerX: number
  playerZ: number
  playerRotation: number
  isMoving: boolean
  nearbyFurniture: string | null
  activeModal: string | null

  setPlayerState: (x: number, z: number, rotation: number, isMoving: boolean) => void
  setNearbyFurniture: (id: string | null) => void
  openModal: (id: string) => void
  closeModal: () => void
}

export const useGameStore = create<GameState>((set) => ({
  playerX: 0,
  playerZ: -3,
  playerRotation: 0,
  isMoving: false,
  nearbyFurniture: null,
  activeModal: null,

  setPlayerState: (x, z, rotation, isMoving) =>
    set({ playerX: x, playerZ: z, playerRotation: rotation, isMoving }),

  setNearbyFurniture: (id) => set({ nearbyFurniture: id }),

  openModal: (id) => set({ activeModal: id }),

  closeModal: () => set({ activeModal: null }),
}))
