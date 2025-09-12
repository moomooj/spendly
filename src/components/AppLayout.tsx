import { useNavigate, Outlet, useLocation } from "react-router-dom";
import {
  PlusCircleIcon,
  Cog8ToothIcon,
  ChartBarIcon,
  BanknotesIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { path: "/", icon: BanknotesIcon, header: "Spendly" },
    { path: "/expenses", icon: QuestionMarkCircleIcon, header: "?????" },
    { path: "/budget", icon: ChartBarIcon, header: "Insights" },
    { path: "/settings", icon: Cog8ToothIcon, header: "Settings" },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-3xl mx-auto w-full">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <header className="flex justify-between items-center mb-6">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;
            return (
              <h1 key={tab.header} className="text-2xl font-bold text-gray-900">
                {isActive ? tab.header : null}
              </h1>
            );
          })}
        </header>
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="relative h-14 bg-white border-gray-300 border-t flex justify-around items-center">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          const Icon = tab.icon;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={isActive ? "text-gray-600" : "text-gray-400"}
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
    </div>
  );
}
