import SettingItem from "@/components/settings/SettingBtn";
import { useNavigate } from "react-router-dom";
import { useTheme } from "./useDarkMode";

export default function Appearance() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <>
      <SettingItem
        icon={
          <span role="img" aria-label="appearance">
            🎨
          </span>
        }
        label="Appearance"
        buttonType="text"
        SettingText={theme}
        onClick={() => navigate("/settings/appearance")}
      />
    </>
  );
}
