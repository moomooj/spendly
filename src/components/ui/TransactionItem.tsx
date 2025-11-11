import { useFormatDate } from "@/hooks/useFormatDate";

type TransactionItemProps = {
  id: number;
  type: "income" | "expense";
  amount: number;
  categoryName: string;
  date: string | Date;
  icon: string;
};

export default function TransactionItem({
  type,
  amount,
  categoryName,
  date,
  icon,
}: TransactionItemProps) {
  const { formatDate } = useFormatDate("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="flex justify-between items-center py-3 border-b border-gray-100">
      {/* 왼쪽: 아이콘 + 카테고리 + 시간 */}
      <div className="flex items-center gap-3">
        <img src={icon} alt={categoryName} className="w-8 h-8 rounded-full" />
        <div>
          <p className="font-medium text-gray-800">{categoryName}</p>
          <p className="text-xs text-gray-400">{formatDate(date)}</p>
        </div>
      </div>

      {/* 오른쪽: 금액 */}
      <p
        className={`font-semibold text-sm ${
          type === "expense" ? "text-red-500" : "text-green-500"
        }`}
      >
        {type === "expense" ? "-" : "+"}${amount.toFixed(2)}
      </p>
    </div>
  );
}
