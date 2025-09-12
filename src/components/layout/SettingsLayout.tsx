import { Outlet } from "react-router-dom";

export default function SettingsLayout() {
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-3xl mx-auto w-full">
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
