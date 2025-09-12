type ExpenseCardProps = {
  category: string;
  amount: number;
};

export default function ExpenseCard({ category, amount }: ExpenseCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
      <span className="font-medium text-gray-700">{category}</span>
      <span className="font-bold text-blue-600">${amount.toFixed(2)}</span>
    </div>
  );
}
