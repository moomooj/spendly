import Total from "@/pages/home/Total";
import TransactionGroup from "@/components/ui/TransactionGroup";
import groupedData from "@/data/dummy.json";
import { useEffect, useState } from "react";
import { fetchTransactions, type ITransaction } from "./transaction";

export default function Dashboard() {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTransactions()
      .then((data) => setTransactions(data))
      .catch((err) => {
        console.error(err);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>⏳ 로딩 중...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="p-5 bg-white min-h-screen text-gray-800">
      <Total />

      <div className="space-y-6">
        {groupedData.map((group) => (
          <TransactionGroup
            key={group.date}
            date={group.date}
            transactions={group.transactions}
          />
        ))}
      </div>
    </div>
  );
}
