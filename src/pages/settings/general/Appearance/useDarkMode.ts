import { useEffect, useState } from "react";

export type Theme = "light" | "dark" | "system";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("theme") as Theme) || "system";
  });

  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (mode: Theme) => {
      if (mode === "light") {
        root.classList.remove("dark");
      } else if (mode === "dark") {
        root.classList.add("dark");
      } else {
        if (media.matches) root.classList.add("dark");
        else root.classList.remove("dark");
      }
    };

    applyTheme(theme);

    localStorage.setItem("theme", theme);

    const handler = () => {
      if (theme === "system") applyTheme("system");
    };
    media.addEventListener("change", handler);

    return () => media.removeEventListener("change", handler);
  }, [theme]);

  return { theme, setTheme };
}
