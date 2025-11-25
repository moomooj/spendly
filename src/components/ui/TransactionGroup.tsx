import { useFormatDate } from "@/hooks/useFormatDate";
import TransactionItem from "./TransactionItem";
import { type ITransactionGroup } from "@/types/common";

export default function TransactionGroup({
  date,
  transactions,
}: ITransactionGroup) {
  const { formatDate } = useFormatDate();

  return (
    <div className="mb-3">
      <p className="text-Sly-grey-500 dark:text-Sly-grey-700 text-xs font-semibold uppercase tracking-wide pb-2 border-b border-gray-300 dark:border-Sly-grey-700">
        {formatDate(date)}
      </p>
      <div className="space-y-1">
        {transactions.map((tx) => (
          <TransactionItem key={tx._id} transaction={tx} />
        ))}
      </div>
    </div>
  );
}
