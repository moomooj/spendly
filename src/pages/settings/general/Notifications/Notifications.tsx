import SettingItem from "@/components/settings/SettingBtn";
import { useNavigate } from "react-router-dom";

export default function Notifications() {
  const navigate = useNavigate();

  return (
    <SettingItem
      icon={
        <span role="img" aria-label="appearance">
          🎨
        </span>
      }
      label="Notifications"
      buttonType="text"
      SettingText={"Notifications"}
      onClick={() => navigate("/settings/notifications")}
    />
  );
}
