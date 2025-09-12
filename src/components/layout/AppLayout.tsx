import { Outlet } from "react-router-dom";
import Header from "./Header";
import BottomNav from "./BottomNav";

export default function AppLayout() {
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-3xl mx-auto w-full">
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
