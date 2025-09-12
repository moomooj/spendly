import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "@/pages/home/Dashboard";
import Insights from "./pages/insights/Insights";
import Settings from "@/pages/settings/Settings";
import SettingsLayout from "@/components/layout/SettingsLayout";
import AppearancePage from "./pages/settings/general/Appearance/AppearanceModal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "insights", element: <Insights /> },
      { path: "settings", element: <Settings /> },
    ],
  },
  {
    path: "/settings",
    element: <SettingsLayout />,
    children: [{ path: "appearance", element: <AppearancePage /> }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
