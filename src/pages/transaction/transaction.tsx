import { useState } from "react";
import {
  XMarkIcon,
  ArrowPathIcon,
  CalendarIcon,
  TagIcon,
  PencilSquareIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { createTransaction } from "./transactionApi";
import { useNavigate } from "react-router-dom";
import Category from "./Category";
import { type ICategory } from "./useCategories";

export default function TransactionForm() {
  const [type, setType] = useState<"expense" | "income">("expense");
  const [amount, setAmount] = useState("0");
  const [date, setDate] = useState(Date.now());
  const [categoryModal, setCategoryModal] = useState(false);
  const [category, setCategory] = useState<ICategory | null>(null);

  const navigate = useNavigate();

  const handleNumberClick = (num: string) => {
    if (amount === "0" && num !== ".") setAmount(num);
    else setAmount((prev) => prev + num);
  };

  /*const handleBackspace = () => {
    setAmount((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
  };*/

  const formattedAmount = `$${amount}`;

  const handleSubmit = async () => {
    const transactionAmount = parseFloat(amount);
    if (isNaN(transactionAmount) || transactionAmount <= 0) {
      alert("invalid number.");
      return;
    }

    const transactionData = {
      type: type,
      amount: transactionAmount,
      note: category?.note,
      date: date,
      category: category?.id,
    };

    try {
      await createTransaction(transactionData);

      navigate(-1);
    } catch (error) {
      alert(
        `거래 저장 실패: ${
          error instanceof Error ? error.message : "알 수 없는 오류"
        }`
      );
    }
  };

  return (
    <div className="flex flex-col items-center bg-white min-h-screen py-5 px-3">
      <div className="flex justify-between items-center w-full mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-gray-600 transition"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        {/* Expense / Income toggle */}
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

      <div className=" flex flex-col justify-center items-center w-full h-dvw">
        <div className="text-4xl font-semibold mb-3">{formattedAmount}</div>
        <div className="flex w-full justify-center items-center text-gray-400">
          <PencilSquareIcon className="w-5 h-5" />
          <input
            type="text"
            placeholder="Add Note"
            className="focus:outline-none outline-none border-none text-gray-600 text-sm bg-transparent placeholder-gray-400"
            maxLength={15}
          />
        </div>
      </div>

      {/* date, category, numbers */}
      <div className="w-full absolute bottom-5 px-3">
        <div className="flex justify-between  text-gray-500 text-sm ">
          <div className="flex items-center border-1 rounded-md  p-1">
            <CalendarIcon className="w-5 h-5" />
            <span>Today, 10 Nov</span>
            <span>19:35</span>
          </div>
          {categoryModal ? (
            <Category
              setCategory={setCategory}
              setCategoryModal={setCategoryModal}
            />
          ) : (
            <div
              onClick={() => setCategoryModal(true)}
              className="flex items-center gap-2 text-gray-400 border-1 rounded-md  p-1"
            >
              {category?.name ? (
                category.name
              ) : (
                <>
                  <TagIcon className="w-5 h-5" />
                  <span> "Category"</span>
                </>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3 mt-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(String(num))}
              className="text-2xl font-medium bg-gray-100 rounded-lg py-5 hover:bg-gray-200 transition"
            >
              {num}
            </button>
          ))}
          {/* send req */}
          <button
            onClick={handleSubmit}
            className="bg-gray-800 text-white rounded-lg text-2xl py-3 flex items-center justify-center"
          >
            <CheckIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
