import { useTransactions } from "@/hooks/useTransactions";
import DashboardHeader from "./DashboardHeader";
import { useState } from "react";
import { type TOptions } from "@/types/common";
import AllDashboard from "./components/AllDashboard";
import Expense from "./components/Expense";
import Income from "./components/Income";
import Category from "./components/Category";
import Recurring from "./components/Recurring";
import UpComing from "./components/UpComing";
import ByDate from "./components/ByDate";

export default function Dashboard() {
  const [option, setOption] = useState<TOptions>("all");
  const { data, isLoading, isError, error } = useTransactions(option);

  if (isLoading) {
    return <p className="text-Sly-Text dark:text-gray-200">⏳ Loading ...</p>;
  } else if (isError) {
    return (
      <p className="text-red-500">
        ⚠️ Can not load data. error : {error.message}
      </p>
    );
  } else if (data)
    return (
      // Set base text colors for light and dark modes
      <div className="text-Sly-Text dark:text-gray-200">
        <DashboardHeader option={option} setOption={setOption} />
        {option === "all" && <AllDashboard data={data} />}
        {option === "expense" && <Expense data={data} />}
        {option === "income" && <Income data={data} />}
        {option === "category" && <Category data={data} />}
        {option === "recurring" && <Recurring data={data} />}
        {option === "upcoming" && <UpComing data={data} />}
        {option === "by-day" && <ByDate byDate={option} data={data} />}
        {option === "by-week" && <ByDate byDate={option} data={data} />}
        {option === "by-month" && <ByDate byDate={option} data={data} />}
        {option === "by-year" && <ByDate byDate={option} data={data} />}
      </div>
    );
}
