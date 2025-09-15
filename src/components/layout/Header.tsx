import { useLocation } from "react-router-dom";
import { tabs } from "@/components/layout/tabs";

export default function Header() {
  const location = useLocation();

  return (
    <header className=" flex justify-between items-center mb-6">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        return isActive ? (
          <h1 key={tab.header} className="text-2xl font-bold ">
            {tab.header}
          </h1>
        ) : null;
      })}
    </header>
  );
}
