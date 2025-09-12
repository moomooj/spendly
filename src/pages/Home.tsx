import ExpenseCard from "./ExpenseCard";

export default function Dashboard() {
  const expenses = [
    { category: "Groceries", amount: 320 },
    { category: "Dining Out", amount: 120 },
    { category: "Transportation", amount: 80 },
  ];

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Spendly</h1>
        <span className="text-lg font-semibold text-gray-600">
          Total: ${total.toFixed(2)}
        </span>
      </header>

      {/* Expense Summary */}
      <section className="grid gap-4 md:grid-cols-3">
        {expenses.map((exp, idx) => (
          <ExpenseCard key={idx} category={exp.category} amount={exp.amount} />
        ))}
      </section>

      {/* Recent Transactions */}
      <section>
        <h2 className="text-xl font-semibold mb-2 text-gray-800">
          Recent Transactions
        </h2>
        <ul className="space-y-2">
          <li className="flex justify-between border-b py-2">
            <span>Starbucks</span>
            <span className="text-red-500">-$6.50</span>
          </li>
          <li className="flex justify-between border-b py-2">
            <span>Skytrain Ticket</span>
            <span className="text-red-500">-$3.10</span>
          </li>
          <li className="flex justify-between border-b py-2">
            <span>Paycheck</span>
            <span className="text-green-600">+$1200.00</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
