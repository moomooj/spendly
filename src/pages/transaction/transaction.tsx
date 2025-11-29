import { useState } from "react";
import {
  XMarkIcon,
  ArrowPathIcon,
  CalendarIcon,
  TagIcon,
  PencilSquareIcon,
  CheckIcon,
  BackspaceIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  useCreateTransaction,
  useUpdateTransaction,
  useDeleteTransaction,
} from "@/pages/home/useTransactions";
import { format } from "date-fns";
import { useLocation, useNavigate } from "react-router-dom";
import Category from "./Category";

import Datepicker from "./Datepicker";
import type { ICategory, IRecurring, PostTransaction } from "@/types/common";
import RecurringModal from "./RecurringModal";

export default function TransactionForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const transactionToEdit = location.state?.transaction;

  const [type, setType] = useState<"expense" | "income">(
    transactionToEdit?.type || "expense"
  );
  const [amountInCents, setAmountInCents] = useState(
    transactionToEdit ? Math.round(transactionToEdit.amount * 100) : 0
  );
  const [note, setNote] = useState(transactionToEdit?.note || "");

  const [categoryModal, setCategoryModal] = useState(false);
  const [category, setCategory] = useState<ICategory | null>(
    transactionToEdit?.category || null
  );

  const [dateModal, setDateModal] = useState(false);

  const [date, setDate] = useState(
    transactionToEdit ? new Date(transactionToEdit.date) : new Date()
  );

  const [recurring, setRecurring] = useState<IRecurring | null>(
    transactionToEdit?.recurring || null
  );
  const [customNumber, setCustomNumber] = useState<number | null>(
    transactionToEdit?.customNumber || null
  );
  const [recurringMenu, setRecurringMenu] = useState(false);

  const createTransactionMutation = useCreateTransaction();
  const updateTransactionMutation = useUpdateTransaction();
  const deleteTransactionMutation = useDeleteTransaction();

  const handleNumberClick = (num: string) => {
    const newAmount = amountInCents * 10 + parseInt(num, 10);
    if (newAmount > 9999999999) {
      return;
    }
    setAmountInCents(newAmount);
  };

  const handleBackspace = () => {
    setAmountInCents((prev) => Math.floor(prev / 10));
  };

  const formattedAmount = `$${(amountInCents / 100).toFixed(2)}`;

  const handleSubmit = async () => {
    const transactionAmount = amountInCents / 100;
    if (isNaN(transactionAmount) || transactionAmount <= 0) {
      alert("invalid number.");
      return;
    }

    if (transactionAmount > 99999999) {
      alert("The maximum amount is 99,999,999.");
      return;
    }

    if (!category) {
      alert("Please select a category.");
      return;
    }

    const transactionData: PostTransaction = {
      type: type,
      amount: transactionAmount,
      note: note,
      date: format(date, "yyyy-MM-dd'T'HH:mm:ss"),
      category: category.id,
    };
    if (recurring) {
      transactionData.recurring = recurring;
    }
    if (customNumber) {
      transactionData.customNumber = customNumber;
    }

    try {
      if (transactionToEdit) {
        // (PUT)
        updateTransactionMutation.mutate(
          { id: transactionToEdit.id, data: transactionData },
          {
            onSuccess: () => navigate(-1),
            onError: (error) => alert(`Update failed: ${error.message}`),
          }
        );
      } else {
        // (POST)
        createTransactionMutation.mutate(transactionData, {
          onSuccess: () => navigate(-1),
          onError: (error) => alert(`Creation failed: ${error.message}`),
        });
      }
    } catch (error) {
      alert(
        `An unexpected error occurred: ${
          error instanceof Error ? error.message : "unexpected error"
        }`
      );
    }
  };

  const handleDelete = () => {
    if (!transactionToEdit) return;

    if (window.confirm("Are you sure you want to delete this transaction?")) {
      deleteTransactionMutation.mutate(transactionToEdit.id, {
        onSuccess: () => {
          navigate(-1);
        },
        onError: (error) => {
          alert(`Deletion failed: ${error.message}`);
        },
      });
    }
  };

  const isProcessing =
    createTransactionMutation.isPending ||
    updateTransactionMutation.isPending ||
    deleteTransactionMutation.isPending;

  return (
    <div className="flex flex-col items-center bg-white dark:bg-Sly-D-bg text-Sly-Text dark:text-gray-200 min-h-screen py-5 px-3">
      <div className="flex justify-between items-center w-full mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-Sly-grey-500 dark:text-Sly-grey-300 hover:text-gray-600 transition"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        {/* Expense / Income toggle */}
        <div className="flex bg-gray-100 dark:bg-Sly-grey-900 rounded-full p-1">
          <button
            onClick={() => setType("expense")}
            className={`px-4 py-1 rounded-full text-sm font-medium ${
              type === "expense"
                ? "bg-white dark:bg-Sly-grey-700 shadow text-Sly-Text dark:text-gray-200"
                : "text-Sly-grey-500"
            }`}
          >
            Expense
          </button>
          <button
            onClick={() => setType("income")}
            className={`px-4 py-1 rounded-full text-sm font-medium ${
              type === "income"
                ? "bg-white dark:bg-Sly-grey-700 shadow text-Sly-Text dark:text-gray-200"
                : "text-Sly-grey-500"
            }`}
          >
            Income
          </button>
        </div>
        <div>
          {transactionToEdit && (
            <button
              onClick={handleDelete}
              className="text-red-500 bg-red-100 dark:bg-red-900/50 rounded-full p-1.5 "
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          )}
          <RecurringModal
            recurring={recurring}
            setRecurring={setRecurring}
            recurringMenu={recurringMenu}
            setRecurringMenu={setRecurringMenu}
            setCustomNumber={setCustomNumber}
          />
        </div>
      </div>

      <div className=" flex flex-col justify-center items-center w-full h-dvw">
        <div className="text-4xl font-semibold mb-3">{formattedAmount}</div>
        <div className="flex w-full justify-center items-center text-gray-400">
          <PencilSquareIcon className="w-5 h-5 text-Sly-grey-500 dark:text-Sly-grey-300" />
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add Note"
            className="focus:outline-none outline-none border-none text-Sly-grey-700 dark:text-gray-200 text-sm bg-transparent placeholder-gray-400 dark:placeholder-Sly-grey-500 text-center"
            maxLength={15}
          />
        </div>
      </div>

      {/* date, category, numbers */}
      <div className="w-full absolute bottom-5 px-3">
        <div className="flex justify-between text-Sly-grey-500 dark:text-Sly-grey-300 text-sm">
          <div
            onClick={() => setDateModal(true)}
            className="flex items-center border dark:border-Sly-grey-700 rounded-md p-1 cursor-pointer"
          >
            <CalendarIcon className="w-5 h-5" />
            <span>{format(date, "MMM d, yyyy h:mm aa")}</span>
          </div>

          {dateModal ? (
            <Datepicker
              setDateModal={setDateModal}
              date={date}
              setDate={setDate}
            />
          ) : null}

          {categoryModal ? (
            <Category
              setCategory={setCategory}
              setCategoryModal={setCategoryModal}
            />
          ) : (
            <div
              onClick={() => setCategoryModal(true)}
              className="flex items-center gap-2 px-3 text-black  border dark:border-Sly-grey-700 rounded-md p-1 cursor-pointer"
              style={
                category?.color
                  ? { background: category.color, border: "0px" }
                  : {}
              }
            >
              {category?.name ? (
                `${category.icon}  ${category.name}`
              ) : (
                <>
                  <TagIcon className="w-5 h-5" />
                  <span>Category</span>
                </>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3 mt-3">
          {/* Numbers 1-9 */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(String(num))}
              className="text-2xl font-medium bg-gray-100 dark:bg-Sly-grey-900 rounded-lg py-5 hover:bg-gray-200 dark:hover:bg-Sly-grey-700 transition"
            >
              {num}
            </button>
          ))}

          {/* Backspace */}
          <button
            onClick={handleBackspace}
            className="text-2xl font-medium bg-Sly-Text text-white  dark:bg-gray-500  rounded-lg py-5 flex justify-center items-center   transition"
          >
            <BackspaceIcon className="w-7 h-7" />
          </button>

          {/* Number 0 */}
          <button
            onClick={() => handleNumberClick("0")}
            className="text-2xl font-medium bg-gray-100 dark:bg-Sly-grey-900  rounded-lg py-5 hover:bg-gray-200 dark:hover:bg-Sly-grey-700 transition"
          >
            0
          </button>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isProcessing}
            className="bg-Sly-Text text-white  dark:bg-gray-500   rounded-lg py-5 flex items-center justify-center disabled:bg-Sly-grey-700 transition"
          >
            {isProcessing ? (
              <ArrowPathIcon className="w-6 h-6 animate-spin" />
            ) : (
              <CheckIcon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
