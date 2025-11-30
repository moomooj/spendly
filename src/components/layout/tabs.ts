import {
  BanknotesIcon,
  QuestionMarkCircleIcon,
  ChartBarIcon,
  Cog8ToothIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

export const tabs = [
  { path: "/", icon: BanknotesIcon, header: false },
  { path: "/goal", icon: QuestionMarkCircleIcon, header: false },
  { path: "/transaction", icon: PlusIcon, header: false, center: true },
  { path: "/insights", icon: ChartBarIcon, header: "Insights" },
  { path: "/settings", icon: Cog8ToothIcon, header: "Settings" },
];
