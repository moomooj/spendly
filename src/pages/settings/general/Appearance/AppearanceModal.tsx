import { useTheme } from "./useTheme";
import SettingModalLayout from "@/components/settings/SettingModalLayout";
export default function AppearanceModal() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6 ">
      <SettingModalLayout title="Appearance">
        <div className="space-y-3">
          <button
            onClick={() => setTheme("system")}
            className={`w-full px-4 py-2 rounded ${
              theme === "system" ? "bg-brand text-white" : "bg-gray-100"
            }`}
          >
            System
          </button>
          <button
            onClick={() => setTheme("light")}
            className={`w-full px-4 py-2 rounded ${
              theme === "light" ? "bg-brand text-white" : "bg-gray-100"
            }`}
          >
            Light
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`w-full px-4 py-2 rounded ${
              theme === "dark" ? "bg-brand text-white" : "bg-gray-100"
            }`}
          >
            Dark
          </button>
        </div>
      </SettingModalLayout>
    </div>
  );
}
