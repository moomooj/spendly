import { useNavigate, Outlet } from "react-router-dom";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

export default function AppLayout() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-3xl mx-auto w-full">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="relative h-14 bg-white border-gray-300 border-t flex justify-around items-center text-gray-600">
        <button onClick={() => navigate("/")}>🏠</button>
        <button onClick={() => navigate("/expenses")}>💸</button>
        <button onClick={() => navigate("/budget")}>📊</button>
        <button onClick={() => navigate("/settings")}>⚙️</button>
        {/* nested button */}
        <button className="absolute -top-19 right-3 w-16 h-16 rounded-full bg-bran flex items-center justify-center text-blue-500">
          <PlusCircleIcon />
        </button>
      </nav>
    </div>
  );
}
