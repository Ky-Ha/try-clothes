import { create } from 'zustand';

interface BodyStore {
  images: string[]; // array of base64 or uri strings
  removeImage: (index: number) => void;
  setImages: (newImages: string[]) => void;
  clearImages: () => void;
}

export const useBodyStore = create<BodyStore>((set) => ({
  images: [],
  removeImage: (index) =>
    set((state) => ({
      images: state.images.filter((_, i) => i !== index),
    })),

  setImages: (newImages) => set({ images: newImages }),

  clearImages: () => set({ images: [] }),
}));
