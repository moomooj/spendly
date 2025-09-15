import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "@/pages/home/Dashboard";
import Insights from "./pages/insights/Insights";
import Settings from "@/pages/settings/Settings";
import AppearancePage from "./pages/settings/general/Appearance/AppearanceModal";
import Notifications from "@/pages/settings/general/Notifications/NotificationsModal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "insights", element: <Insights /> },
      { path: "settings", element: <Settings /> },
      { path: "settings/appearance", element: <AppearancePage /> },
      { path: "settings/notifications", element: <Notifications /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
