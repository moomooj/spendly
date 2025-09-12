import { create } from "zustand";

export type Theme = "system" | "light" | "dark";

type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: "system",
  setTheme: (theme) => set({ theme }),
}));
