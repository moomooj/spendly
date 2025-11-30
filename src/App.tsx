import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "@/pages/home/Dashboard";
import Insights from "@/pages/insights/Insights";
import Settings from "@/pages/settings/Settings";
import Transaction from "@/pages/transaction/Transaction";
import EditCategory from "@/pages/category/EditCategory";
import InsightsDetail from "@/pages/insights/InsightDetail";
import Goal from "./pages/goal/Goal";
import NotFound from "@/pages/ErrorPage/NotFound";
import ErrorPage from "@/pages/ErrorPage/ErrorPage";

import AppearancePage from "@/pages/settings/general/Appearance/AppearanceModal";
import Notifications from "@/pages/settings/general/Notifications/NotificationsModal";
import Currency from "@/pages/settings/general/Currency/Currency";
import { ThemeProvider } from "./pages/settings/general/Appearance/ThemeProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "insights", element: <Insights /> },
      { path: "insights/:id", element: <InsightsDetail /> },
      { path: "goal", element: <Goal /> },
      { path: "settings", element: <Settings /> },
      { path: "settings/appearance", element: <AppearancePage /> },
      { path: "settings/notifications", element: <Notifications /> },
      { path: "settings/currency", element: <Currency /> },
    ],
  },
  {
    path: "categories",
    element: <EditCategory />,
  },
  {
    path: "transaction",
    element: <Transaction />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
