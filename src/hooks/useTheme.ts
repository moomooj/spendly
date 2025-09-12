import { useEffect } from "react";
import { useThemeStore } from "../pages/settings/general/Appearance/store";

export function useTheme() {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "light") {
      root.classList.remove("dark");
    } else if (theme === "dark") {
      root.classList.add("dark");
    } else {
      const media: MediaQueryList = window.matchMedia(
        "(prefers-color-scheme: dark)"
      );

      const apply = (isDark: boolean) => {
        if (isDark) root.classList.add("dark");
        else root.classList.remove("dark");
      };

      // 초기 적용
      apply(media.matches);

      // 시스템 다크모드 변경 감지
      const handler = (e: MediaQueryListEvent) => apply(e.matches);
      media.addEventListener("change", handler);

      return () => media.removeEventListener("change", handler);
    }
  }, [theme]);

  return { theme, setTheme };
}
