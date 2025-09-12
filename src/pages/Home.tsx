export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}

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
