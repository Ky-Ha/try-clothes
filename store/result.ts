import { create } from 'zustand'

interface ResultStore {
  resultImage: string | number | null
  itemImages: string[]
  setResultImage: (image: string | number | null) => void
  setItemImages: (images: string[]) => void
  clearAll: () => void
}

export const useResultStore = create<ResultStore>((set) => ({
  resultImage: null,
  itemImages: [],
  setResultImage: (image) => set({ resultImage: image }),
  setItemImages: (images) => set({ itemImages: images }),
  clearAll: () => set({ resultImage: null, itemImages: [] }),
}))
