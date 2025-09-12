import SettingItem from "@/components/settings/SettingBtn";
import { useNavigate } from "react-router-dom";
import { useThemeStore } from "./store";

export default function Appearance() {
  const { theme } = useThemeStore();
  const navigate = useNavigate();

  const themeLabel =
    theme === "system" ? "System" : theme === "light" ? "Light" : "Dark";

  return (
    <SettingItem
      icon={
        <span role="img" aria-label="appearance">
          🎨
        </span>
      }
      label="Appearance"
      buttonType="text"
      SettingText={themeLabel}
      onClick={() => navigate("/settings/appearance")}
    />
  );
}
