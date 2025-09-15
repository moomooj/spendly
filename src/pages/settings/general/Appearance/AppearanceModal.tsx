import SettingModalLayout from "@/components/settings/SettingModalLayout";
import { useTheme } from "./useDarkMode";

export default function AppearanceModal() {
  const { theme, setTheme } = useTheme();

  return (
    <SettingModalLayout title="Appearance">
      <div className="rounded">
        <button
          onClick={() => setTheme("system")}
          className={`w-full px-4 py-2  ${
            theme === "system"
              ? "bg-Sly-blue text-white dark:bg-Sly-grey-300 dark:text-white"
              : "bg-white text-Sly-Text dark:bg-Sly-grey-900 dark:text-white"
          }`}
        >
          System
        </button>
        <button
          onClick={() => setTheme("dark")}
          className={`w-full px-4 py-2  ${
            theme === "dark"
              ? "bg-Sly-blue text-white dark:bg-Sly-grey-300 dark:text-white"
              : "bg-white text-Sly-Text dark:bg-Sly-grey-900 dark:text-white"
          }`}
        >
          dark
        </button>
        <button
          onClick={() => setTheme("light")}
          className={`w-full px-4 py-2  ${
            theme === "light"
              ? "bg-Sly-blue text-white dark:bg-Sly-grey-300 dark:text-white"
              : "bg-white text-Sly-Text dark:bg-Sly-grey-900 dark:text-white"
          }`}
        >
          Light
        </button>
      </div>
    </SettingModalLayout>
  );
}
