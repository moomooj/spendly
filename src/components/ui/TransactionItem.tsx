import { useFormatDate } from "@/hooks/useFormatDate";
import { type ITransaction } from "@/types/common";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  return (
    <div
      className="flex justify-between items-center py-3 cursor-pointer"
      onClick={() => navigate("/transaction", { state: { transaction } })}
    >
      {/* 왼쪽: 아이콘 + 카테고리 + 시간 */}
      <div className="flex items-center gap-3">
        <p
          className="flex items-center justify-center w-10 h-10 rounded-xl text-3xl"
          style={{ backgroundColor: transaction.category.color }}
        >
          {transaction.category?.icon}
        </p>
        <div>
          <p className="font-medium text-Sly-Text dark:text-gray-200">
            {transaction.category?.name}
          </p>
          <p className="text-xs text-Sly-grey-500 dark:text-Sly-grey-700">
            {formatDate(transaction.date)}
          </p>
        </div>
      </div>

      {/* 오른쪽: 금액 */}
      <p
        className={`font-semibold text-sm ${
          transaction.type === "expense"
            ? "text-shadow-Sly-D-bg"
            : "text-Sly-blue"
        }`}
      >
        {transaction.type === "expense" ? "-" : "+"}$
        {transaction.amount.toFixed(2)}
      </p>
    </div>
  );
}
