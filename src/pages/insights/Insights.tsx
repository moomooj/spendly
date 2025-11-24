import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const mockCategoryData = [
  {
    id: 1,
    name: "Food & Drinks",
    icon: "🍔",
    color: "#FFDDC1",
    amount: 450.75,
    percentage: 36.5,
  },
  {
    id: 2,
    name: "Transportation",
    icon: "🚗",
    color: "#C1FFD7",
    amount: 250.0,
    percentage: 20.2,
  },
  {
    id: 3,
    name: "Shopping",
    icon: "🛍️",
    color: "#D7C1FF",
    amount: 300.5,
    percentage: 24.3,
  },
  {
    id: 4,
    name: "Bills & Utilities",
    icon: "🧾",
    color: "#FFC1C1",
    amount: 233.31,
    percentage: 18.9,
  },
];

export default function Insights() {
  const totalAmount = 1234.56;

  return (
    <div className="">
      <div className="max-w-4xl mx-auto">
        {/* Donut Chart and Total Amount */}
        <div className="relative flex justify-center items-center my-10">
          <PieChart width={256} height={256}>
            <Pie
              data={mockCategoryData}
              cx="50%"
              cy="50%"
              innerRadius={100}
              outerRadius={130}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="amount"
            >
              {mockCategoryData.map((entry) => (
                <Cell key={`cell-${entry.id}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          <div className="absolute flex flex-col justify-center items-center">
            <span className="text-gray-500 text-sm">Total Spent</span>
            <span className="text-3xl font-bold text-gray-800">
              ${totalAmount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Category Breakdown */}
        <div>
          {mockCategoryData.map((category) => (
            <div
              key={category.id}
              className=" flex items-center justify-between p-2"
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: category.color }}
                />
                <span className="font-medium text-gray-700">
                  {category.name}
                </span>
              </div>
              <div className="flex">
                <div className="font-bold ">${category.amount.toFixed(2)}</div>
                <div className="font-bold ml-7">
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
