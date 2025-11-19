import { useFormatDate } from "@/hooks/useFormatDate";
import TransactionItem from "./TransactionItem";
import burgerIcon from "@/data/burger.png";

type TransactionGroupProps = {
  date: string | Date;
  transactions: Array<{
    id: number;
    type: "income" | "expense";
    amount: number;
    categories?: { id: number; name: string };
    date: string;
  }>;
};

export default function TransactionGroup({
  date,
  transactions,
}: TransactionGroupProps) {
  const { formatDate } = useFormatDate();

  return (
    <div>
      <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2">
        {formatDate(date)}
      </p>

      <div className="space-y-3">
        {transactions.map((tx) => (
          <TransactionItem
            key={tx.id}
            id={tx.id}
            type={tx.type}
            amount={tx.amount}
            categoryName={tx.categories?.name || "Unknown"}
            date={tx.date}
            icon={burgerIcon}
          />
        ))}
      </div>
    </div>
  );
}
