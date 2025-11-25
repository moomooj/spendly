import SettingBtn from "@/components/settings/SettingBtn";

import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      {/* General Section */}
      <h2 className="text-sm font-semibold mb-2">General</h2>

      <section className="bg-white dark:bg-Sly-grey-900 text-Sly-Text dark:text-white rounded-lg p-3 space-y-4 ">
        <SettingBtn
          icon={
            <span role="img" aria-label="appearance">
              🎨
            </span>
          }
          label="Appearance"
          buttonType="text"
          SettingText={"Appearance"}
          onClick={() => navigate("/settings/appearance")}
        />
        <SettingBtn
          icon={
            <span role="img" aria-label="notifications">
              🎨
            </span>
          }
          label="Notifications"
          buttonType="text"
          SettingText={"Notifications"}
          onClick={() => navigate("/settings/notifications")}
        />
        <SettingBtn
          icon={
            <span role="img" aria-label="currency">
              🎨
            </span>
          }
          label="Currency"
          buttonType="text"
          SettingText={"Currency"}
          onClick={() => navigate("/settings/currency")}
        />
      </section>
    </div>
  );
}
