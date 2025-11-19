import Total from "@/pages/home/Total";
import TransactionGroup from "@/components/ui/TransactionGroup";
import { useTransactions } from "./useTransactions";

export default function Dashboard() {
  const { data, isLoading, isError, error } = useTransactions();

  if (isLoading) {
    return <p>⏳ 로딩 중...</p>;
  } else if (isError) {
    return <p style={{ color: "red" }}>⚠️ 데이터 로딩 실패: {error.message}</p>;
  } else if (data)
    return (
      <div className="p-5 bg-white min-h-screen text-gray-800">
        <Total />
        <TransactionGroup date={data[0].date} transactions={data} />
        <div className="space-y-6"></div>
      </div>
    );
}
