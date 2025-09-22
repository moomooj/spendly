import { Outlet } from "react-router-dom";
import Header from "./Header";
import BottomNav from "./BottomNav";
import { useTheme } from "@/pages/settings/general/Appearance/useDarkMode";
export default function AppLayout() {
  const { theme } = useTheme();
  return (
    <div className="flex flex-col h-screen bg-Sly-bg dark:bg-Sly-D-bg text-Sly-Text dark:text-white max-w-3xl mx-auto w-full">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <Header />
        <Outlet />
      </main>
      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
