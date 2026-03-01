import { create } from 'zustand'

interface BodyStore {
  images: string[] // array of base64 or uri strings
  addImage: (image: string) => void
  removeImage: (index: number) => void
  setImages: (newImages: string[]) => void
  clearImages: () => void
}

export const useBodyStore = create<BodyStore>((set) => ({
  images: [],

  addImage: (image) =>
    set((state) => {
      if (state.images.length >= 3) return state // prevent adding more than 3
      return { images: [...state.images, image] }
    }),

  removeImage: (index) =>
    set((state) => ({
      images: state.images.filter((_, i) => i !== index),
    })),

  setImages: (newImages) => set({ images: newImages }),

  clearImages: () => set({ images: [] }),
}))
