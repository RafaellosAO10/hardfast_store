import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface SavedBuild {
  id: string;
  userId: string;
  name: string;
  components: {
    cpu: string;
    "placa-mae": string;
    gpu: string;
    ram: string;
    fonte: string;
    gabinete: string;
  };
  createdAt: string;
}

interface BuildsState {
  builds: SavedBuild[];
  addBuild: (b: SavedBuild) => void;
  removeBuild: (id: string) => void;
  forUser: (userId: string) => SavedBuild[];
}

export const useBuildsStore = create<BuildsState>()(
  persist(
    (set, get) => ({
      builds: [],
      addBuild: (b) => set({ builds: [b, ...get().builds] }),
      removeBuild: (id) => set({ builds: get().builds.filter((x) => x.id !== id) }),
      forUser: (userId) => get().builds.filter((b) => b.userId === userId),
    }),
    {
      name: "hardfast_saved_builds",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : (undefined as any),
      ),
    },
  ),
);
