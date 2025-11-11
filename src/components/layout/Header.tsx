import { useLocation } from "react-router-dom";
import { tabs } from "@/components/layout/tabs";

export default function Header() {
  const location = useLocation();
  const pathname = location.pathname;

  if (pathname.startsWith("/settings/") && pathname !== "/settings") {
    return null;
  }

  return (
    <>
      {tabs.map((tab, index) => {
        const isActive = location.pathname === tab.path;
        return isActive && tab.header ? (
          <header
            key={index}
            className=" flex justify-between items-center mb-6"
          >
            <h1 className="text-2xl font-bold ">{tab.header}</h1>
          </header>
        ) : null;
      })}
    </>
  );
}
