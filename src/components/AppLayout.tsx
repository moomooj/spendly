import { useNavigate, Outlet } from "react-router-dom";

export default function AppLayout() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-3xl mx-auto w-full">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="h-14 bg-white border-t flex justify-around items-center text-gray-600">
        <button onClick={() => navigate("/")}>🏠</button>
        <button onClick={() => navigate("/expenses")}>💸</button>
        <button onClick={() => navigate("/budget")}>📊</button>
        <button onClick={() => navigate("/settings")}>⚙️</button>
      </nav>
    </div>
  );
}
