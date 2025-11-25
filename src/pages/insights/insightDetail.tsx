import { useNavigate, useParams } from "react-router-dom";
import { useInsightById } from "./useInsights";
import { useState } from "react";
import type { Period } from "@/types/common";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { periods } from "@/constants/periods";
import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  XAxis,
} from "recharts";

export default function InsightsDetail() {
  const { id } = useParams<{ id: string }>();
  const [period, setPeriod] = useState<Period>("this-month");
  const { data: category, loading, error } = useInsightById(id, period);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const transactions = category?.transactions || [];
  const chart = category?.chart || [];
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (category) {
    return (
      <div className="fixed inset-0 bg-gray-50 z-20 p-4 pb-24 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* 1. Header */}
          <header className="flex items-center justify-between mb-6">
            <XMarkIcon onClick={() => navigate(-1)} className="w-6 h-6" />
            <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span>{category.name} Deatils</span>
            </h1>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="rounded-lg p-0.5 text-sm px-2 border-gray-300 border capitalize"
              >
                {period.replace("-", " ")}
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-36 bg-white border border-gray-300  shadow-lg z-10">
                  <ul>
                    {periods.map((p) => (
                      <li key={p}>
                        <button
                          onClick={() => {
                            setPeriod(p);
                            setIsDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm bg-Sly-bg text-gray-70 capitalize"
                          style={period === p ? {} : { background: "white" }}
                        >
                          {p.replace("-", " ")}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </header>

          {/*Bar Chart Section */}
          <section className="bg-white rounded-lg shadow p-4 mb-3">
            {chart.length > 0 ? (
              <div style={{ width: "100%", overflowX: "auto" }}>
                <ResponsiveContainer
                  width={Math.max(chart.length * 60, 300)}
                  height={300}
                >
                  <BarChart
                    data={chart}
                    margin={{ top: 20, right: 10, left: 10, bottom: 10 }}
                  >
                    <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                      <LabelList
                        dataKey="amount"
                        position="top"
                        formatter={(value: any) => {
                          if (typeof value === "number") {
                            return `$${value.toLocaleString()}`;
                          }
                          return value;
                        }}
                        fontSize={12}
                      />
                      {chart.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={category.color} />
                      ))}
                    </Bar>
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 12, dy: 5 }}
                      interval={0}
                      tickFormatter={(date) => {
                        return new Date(date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        });
                      }}
                      height={40}
                      axisLine={false}
                      tickLine={false}
                      angle={-30}
                      textAnchor="end"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-center text-gray-500 py-10">
                No chart data available.
              </p>
            )}
          </section>

          {/*Category Summary */}
          <section className="bg-white rounded-lg shadow p-4 mb-3">
            <div className="grid grid-cols-3 divide-x divide-gray-200 text-center">
              <div className="px-2">
                <div className="text-sm text-gray-500">Total</div>
                <div className="text-sm font-bold text-gray-800">
                  {category.amount < 0 ? "-$" : "$"}
                  {Math.abs(category.amount).toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </div>
              </div>
              <div className="px-2">
                <div className="text-sm text-gray-500">Transactions</div>
                <div className="text-sm font-bold text-gray-800">
                  {category.transactionsCount}
                </div>
              </div>
              <div className="px-2">
                <div className="text-sm text-gray-500">Average</div>
                <div className="text-sm font-bold text-gray-800">
                  $
                  {category.averageTransaction.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Transaction List Section */}
          <section className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Transactions
            </h2>
            <div>
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center">
                      <div
                        className="text-2xl mr-3 w-1 h-10  rounded-sm"
                        style={{ background: category.color }}
                      ></div>
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-800">
                          {category.name} {category.icon}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(transaction.date).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              weekday: "short",
                            }
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="font-semibold text-gray-800">
                      {transaction.type === "expense" ? "-$" : "$"}

                      {transaction.amount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-4">
                  No transactions in this category.
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    );
  }
}
