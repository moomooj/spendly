import Total from "@/pages/home/Total";
import TransactionGroup from "@/components/ui/TransactionGroup";
import { useTransactions } from "@/hooks/useTransactions";

export default function Dashboard() {
  const { data, isLoading, isError, error } = useTransactions();
  if (isLoading) {
    return <p className="text-Sly-Text dark:text-gray-200">⏳ Loading ...</p>;
  } else if (isError) {
    return (
      <p className="text-red-500">
        ⚠️ Can not load data. error : {error.message}
      </p>
    );
  } else if (data)
    return (
      // Set base text colors for light and dark modes
      <div className="text-Sly-Text dark:text-gray-200">
        <Total />
        {data.map((group) => (
          <TransactionGroup
            key={group.date}
            date={group.date}
            transactions={group.transactions}
          />
        ))}
        <div className="space-y-6"></div>
      </div>
    );
}
