import { useEffect, useState } from "react";

export type Theme = "system" | "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "light") {
      root.classList.remove("dark");
    } else if (theme === "dark") {
      root.classList.add("dark");
    } else {
      // system
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const systemPrefersDark = media.matches;

      if (systemPrefersDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }

      // 시스템 설정 변경 감지
      const handler = (e: MediaQueryListEvent) => {
        if (theme === "system") {
          if (e.matches) {
            root.classList.add("dark");
          } else {
            root.classList.remove("dark");
          }
        }
      };

      media.addEventListener("change", handler);
      return () => media.removeEventListener("change", handler);
    }
  }, [theme]);

  return { theme, setTheme };
}
