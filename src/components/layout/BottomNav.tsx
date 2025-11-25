import { useNavigate, useLocation } from "react-router-dom";
import { tabs } from "@/components/layout/tabs";

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="relative h-18 bg-Sly-bg dark:bg-Sly-grey-900  text-Sly-Textdark:text-white flex justify-around items-center z-50">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        const Icon = tab.icon;
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className={
              tab.center
                ? "bg-Sly-grey-900 dark:bg-Sly-blue px-8 py-3 rounded-2xl text-white font-extrabold"
                : isActive
                ? "dark:text-white"
                : "text-Sly-grey-300 dark:text-Sly-grey-700"
            }
          >
            <Icon className="w-6 h-6" strokeWidth={tab.center ? 4 : 2} />
          </button>
        );
      })}
    </nav>
  );
}
