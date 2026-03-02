import { create } from 'zustand';

interface ItemStore {
  images: string[]; // array of base64 or uri strings
  removeImage: (index: number) => void;
  setImages: (newImages: string[]) => void;
  clearImages: () => void;
}

export const useItemStore = create<ItemStore>((set) => ({
  images: [],

  removeImage: (index) =>
    set((state) => ({
      images: state.images.filter((_, i) => i !== index),
    })),

  setImages: (newImages) => set({ images: newImages }),

  clearImages: () => set({ images: [] }),
}));
