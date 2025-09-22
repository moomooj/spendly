import { categories, transactions } from "@/data/dummy.json";
import { useFormatDate } from "@/hooks/useFormatDate";

export default function Dashboard() {
  const { formatDate } = useFormatDate();

  return (
    <div>
      <h1>need to be total money!</h1>
      <div>
        {transactions.map((t, i) => (
          <div key={i} className="text-gray-500">
            {formatDate(t.date)}
          </div>
        ))}
      </div>
    </div>
  );
}
