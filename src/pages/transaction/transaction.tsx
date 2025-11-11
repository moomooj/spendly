import { useState } from "react";
import {
  XMarkIcon,
  ArrowPathIcon,
  CalendarIcon,
  TagIcon,
  PencilSquareIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

export default function TransactionForm() {
  const [type, setType] = useState<"expense" | "income">("expense");
  const [amount, setAmount] = useState("0");
  const [note, setNote] = useState("");

  const handleNumberClick = (num: string) => {
    if (amount === "0" && num !== ".") setAmount(num);
    else setAmount((prev) => prev + num);
  };

  const handleBackspace = () => {
    setAmount((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
  };

  const formattedAmount = `$${amount}`;

  return (
    <div className="flex flex-col items-center bg-white min-h-screen p-5">
      {/* 상단 헤더 */}
      <div className="flex justify-between items-center w-full mb-6">
        {/* 닫기 버튼 */}
        <button className="text-gray-400 hover:text-gray-600 transition">
          <XMarkIcon className="w-6 h-6" />
        </button>

        {/* Expense / Income 토글 */}
        <div className="flex bg-gray-100 rounded-full p-1">
          <button
            onClick={() => setType("expense")}
            className={`px-4 py-1 rounded-full text-sm font-medium ${
              type === "expense"
                ? "bg-white shadow text-gray-900"
                : "text-gray-400"
            }`}
          >
            Expense
          </button>
          <button
            onClick={() => setType("income")}
            className={`px-4 py-1 rounded-full text-sm font-medium ${
              type === "income"
                ? "bg-white shadow text-gray-900"
                : "text-gray-400"
            }`}
          >
            Income
          </button>
        </div>

        {/* 교체 아이콘 */}
        <button className="text-gray-400 hover:text-gray-600 transition">
          <ArrowPathIcon className="w-5 h-5" />
        </button>
      </div>

      {/* 금액 표시 */}
      <div className="text-4xl font-semibold mb-3">{formattedAmount}</div>

      {/* 노트 입력 */}
      <div className="flex items-center text-gray-400 gap-2 mb-6">
        <PencilSquareIcon className="w-5 h-5" />
        <input
          type="text"
          placeholder="Add Note"
          className="outline-none border-none text-gray-600 text-sm bg-transparent placeholder-gray-400"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      {/* 날짜 / 카테고리 */}
      <div className="flex justify-between w-full text-gray-500 text-sm mb-8">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5" />
          <span>Today, 10 Nov</span>
          <span>19:35</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <TagIcon className="w-5 h-5" />
          <span>Category</span>
        </div>
      </div>

      {/* 숫자패드 */}
      <div className="grid grid-cols-3 gap-3 w-full max-w-xs">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0].map((num) => (
          <button
            key={num}
            onClick={() => handleNumberClick(String(num))}
            className="text-2xl font-medium bg-gray-100 rounded-lg py-3 hover:bg-gray-200 transition"
          >
            {num}
          </button>
        ))}
        {/* 마지막 체크 버튼 */}
        <button
          onClick={() =>
            alert(`Type: ${type} | Amount: ${amount} | Note: ${note}`)
          }
          className="bg-gray-800 text-white rounded-lg text-2xl py-3 flex items-center justify-center"
        >
          <CheckIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
