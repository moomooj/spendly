import { useFormatDate } from "@/hooks/useFormatDate";
import { type ITransaction } from "@/types/common";

export default function TransactionItem({
  transaction,
}: {
  transaction: ITransaction;
}) {
  const { formatDate } = useFormatDate("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="flex justify-between items-center py-3 ">
      {/* 왼쪽: 아이콘 + 카테고리 + 시간 */}
      <div className="flex items-center gap-3">
        <p
          className="flex items-center justify-center w-10 h-10 rounded-xl text-3xl"
          style={{ backgroundColor: transaction.category.color }}
        >
          {transaction.category?.icon}
        </p>
        <div>
          <p className="font-medium text-gray-800">
            {transaction.category?.name}
          </p>
          <p className="text-xs text-gray-400">
            {formatDate(transaction.date)}
          </p>
        </div>
      </div>

      {/* 오른쪽: 금액 */}
      <p
        className={`font-semibold text-sm ${
          transaction.type === "expense" ? "text-red-500" : "text-green-500"
        }`}
      >
        {transaction.type === "expense" ? "-" : "+"}$
        {transaction.amount.toFixed(2)}
      </p>
    </div>
  );
}
