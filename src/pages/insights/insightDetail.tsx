import type { Insight, Period, ITransaction } from "@/types/common";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface InsightsDetailProps {
  category: Insight;
  period: Period;
  setPeriod: (period: Period) => void;
  onClose: () => void;
}

export default function InsightsDetail({
  category,
  onClose,
}: InsightsDetailProps) {
  const transactions: ITransaction[] = category.transactions || [];

  return (
    <div className="fixed inset-0 bg-gray-50 z-20 p-4 pb-24 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        {/* 1. Header */}
        <header className="flex items-center justify-between mb-6">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 w-10 h-10 flex items-center justify-center text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <span>{category.name} Deatils</span> <span>{category.icon}</span>
          </h1>
          <div className="w-10 h-10"></div>
        </header>

        {/*Bar Chart Section */}
        <section className="bg-white rounded-lg shadow p-4 mb-3">
          {transactions.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={transactions}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              >
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  interval={0}
                  angle={-30}
                  textAnchor="end"
                  height={70}
                />
                <YAxis tickFormatter={(value) => `$${value}`} />
                <Tooltip
                  cursor={{ fill: "rgba(0,0,0,0.05)" }}
                  formatter={(value: number) => [
                    `$${value.toFixed(2)}`,
                    "Amount",
                  ]}
                />
                <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                  {transactions.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={category.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
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
              <div className="text-lg font-bold text-gray-800">
                $
                {category.amount.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </div>
            </div>
            <div className="px-2">
              <div className="text-sm text-gray-500">Transactions</div>
              <div className="text-lg font-bold text-gray-800">
                {category.transactionsCount}
              </div>
            </div>
            <div className="px-2">
              <div className="text-sm text-gray-500">Average</div>
              <div className="text-lg font-bold text-gray-800">
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
                    $
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
