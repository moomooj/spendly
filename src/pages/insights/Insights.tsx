import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell } from "recharts";
import { useInsights } from "./useInsights";
import { periods } from "@/constants/periods";
import type { InsightType, Period } from "@/types/common";

export default function Insights() {
  const navigate = useNavigate();
  const [insightType, setInsightType] = useState<InsightType>("total");
  const [period, setPeriod] = useState<Period>("this-month");
  const { data: categoryData, loading, error } = useInsights(period);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentData = categoryData?.[insightType];

  if (loading) {
    return <div className="text-Sly-Text dark:text-gray-200">Loading...</div>;
  }
  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  const totalAmount =
    currentData?.reduce((sum, category) => sum + category.amount, 0) || 0;

  const chartDisplayData =
    currentData?.filter((category) => category.percentage > 0) || [];
  const dynamicPaddingAngle = chartDisplayData.length > 1 ? 4 : 0;

  return (
    <div className="text-Sly-Text dark:text-gray-200">
      <div className="max-w-4xl mx-auto">
        {/* Controls: Toggle and Dropdown */}
        <div className="flex justify-between items-center my-4">
          {/* Expense/Income Toggle */}
          <div className="flex bg-gray-200 dark:bg-Sly-grey-900 rounded-full p-1 text-sm">
            <button
              onClick={() => setInsightType("total")}
              className={`px-4 py-1 font-semibold rounded-full transition-colors duration-300 ${
                insightType === "total"
                  ? "bg-white dark:bg-Sly-grey-700 text-Sly-Text dark:text-gray-200 shadow"
                  : "bg-transparent text-Sly-grey-500"
              }`}
            >
              Total
            </button>
            <button
              onClick={() => setInsightType("expense")}
              className={`px-4 py-1 font-semibold rounded-full transition-colors duration-300 ${
                insightType === "expense"
                  ? "bg-white dark:bg-Sly-grey-700 text-Sly-Text dark:text-gray-200 shadow"
                  : "bg-transparent text-Sly-grey-500"
              }`}
            >
              Expense
            </button>
            <button
              onClick={() => setInsightType("income")}
              className={`px-4 py-1 font-semibold rounded-full transition-colors duration-300 ${
                insightType === "income"
                  ? "bg-white dark:bg-Sly-grey-700 text-Sly-Text dark:text-gray-200 shadow"
                  : "bg-transparent text-Sly-grey-500"
              }`}
            >
              Income
            </button>
          </div>

          {/* Time Range Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="rounded-lg p-0.5 text-sm px-2 border-gray-300 dark:border-Sly-grey-700 border capitalize"
            >
              {period.replace("-", " ")}
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-36 bg-white dark:bg-Sly-grey-900 border border-gray-300 dark:border-Sly-grey-700 shadow-lg z-10 rounded-md">
                <ul>
                  {periods.map((p) => (
                    <li key={p}>
                      <button
                        onClick={() => {
                          setPeriod(p);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm capitalize ${
                          period === p
                            ? "bg-Sly-bg dark:bg-Sly-grey-700"
                            : "bg-white dark:bg-Sly-grey-900 hover:bg-Sly-bg dark:hover:bg-Sly-grey-700"
                        }`}
                      >
                        {p.replace("-", " ")}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Donut Chart and Total Amount */}
        <div className="relative flex justify-center items-center my-10">
          <PieChart width={256} height={256}>
            <Pie
              data={chartDisplayData}
              cx="50%"
              cy="50%"
              innerRadius={100}
              outerRadius={128}
              fill="#8884d8"
              paddingAngle={dynamicPaddingAngle}
              dataKey="percentage"
              stroke="none"
            >
              {chartDisplayData.map((entry) => (
                <Cell key={`cell-${entry.id}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
          <div className="absolute flex flex-col justify-center items-center">
            <span className="text-Sly-grey-500 dark:text-Sly-grey-300 text-sm">
              {insightType === "expense"
                ? "Total Spent"
                : insightType === "income"
                ? "Total Income"
                : "Total"}
            </span>
            <span className="text-3xl font-bold text-Sly-Text dark:text-gray-200">
              {totalAmount < 0 ? "-$" : "$"}
              {Math.abs(totalAmount).toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </span>
          </div>
        </div>

        {/* Category Breakdown */}
        <div>
          {currentData?.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between p-2 rounded-md hover:bg-Sly-bg dark:hover:bg-Sly-grey-900 cursor-pointer"
              onClick={() => navigate(`/insights/${category.id}`)}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: category.color }}
                />
                <span className="font-medium">{category.name}</span>
              </div>
              <div className="flex">
                <div className="font-semibold dark:font-light mr-7">
                  {category.amount < 0 ? "-$" : "$"}
                  {Math.abs(category.amount).toLocaleString()}
                </div>
                <div className="font-semibold dark:font-light ">
                  {category.percentage < 10 && (
                    <span style={{ visibility: "hidden" }}>0</span>
                  )}
                  {category.percentage.toFixed(1)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
