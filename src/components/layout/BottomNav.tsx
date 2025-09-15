import { useNavigate, useLocation } from "react-router-dom";
import { tabs } from "@/components/layout/tabs";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="relative h-14 bg-Sly-bg dark:bg-Sly-D-bg text-Sly-Text dark:text-white border-t-[0.1px] border-Sly-grey-900 dark:border-Sly-grey-700 flex justify-around items-center">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        const Icon = tab.icon;
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className={
              isActive
                ? "dark:text-white"
                : "text-Sly-grey-300 dark:text-Sly-grey-700"
            }
          >
            <Icon className="w-6 h-6" />
          </button>
        );
      })}
      {/* nested button */}
      <button className="absolute -top-17 right-3 w-14 h-14 rounded-full bg-bran flex items-center justify-center text-blue-500">
        <PlusCircleIcon />
      </button>
    </nav>
  );
}
