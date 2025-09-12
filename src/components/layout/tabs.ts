import {
  BanknotesIcon,
  QuestionMarkCircleIcon,
  ChartBarIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/solid";

export const tabs = [
  { path: "/", icon: BanknotesIcon, header: "Spendly" },
  { path: "/expenses", icon: QuestionMarkCircleIcon, header: "Expenses" },
  { path: "/insights", icon: ChartBarIcon, header: "Insights" },
  { path: "/settings", icon: Cog8ToothIcon, header: "Settings" },
];
