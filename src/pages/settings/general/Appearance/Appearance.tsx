import SettingItem from "@/components/settings/SettingBtn";
import { useTheme } from "./useTheme";
import { useNavigate } from "react-router-dom";

export default function Appearance() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  console.log(theme);

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
