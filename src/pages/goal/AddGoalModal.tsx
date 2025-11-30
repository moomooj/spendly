import { useState } from "react";
import {
  XMarkIcon,
  ChevronRightIcon,
  CalendarDaysIcon,
  TagIcon,
  BanknotesIcon,
  WalletIcon,
  Squares2X2Icon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";
import Datepicker from "@/components/ui/Datepicker";
import CategoryPicker from "./CategoryPicker";
import type { IGoalPost, InsightType } from "@/types/common";
import { useCreateGoal } from "./useGoal";

interface AddGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddGoalModal({ isOpen, onClose }: AddGoalModalProps) {
  const { mutate: createGoal, isPending } = useCreateGoal();

  const [goalName, setGoalName] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [goalType, setGoalType] = useState<InsightType>("total");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isStartDatePickerOpen, setIsStartDatePickerOpen] = useState(false);
  const [isEndDatePickerOpen, setIsEndDatePickerOpen] = useState(false);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [isCategoryPickerOpen, setIsCategoryPickerOpen] = useState(false);
  const [note, setNote] = useState("");

  const handleGoalAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const maxValue = 99999999999;

    if (Number(value) > maxValue) {
      setGoalAmount(String(maxValue));
    } else {
      setGoalAmount(value);
    }
  };

  const handleSubmit = () => {
    if (!goalName.trim()) {
      alert("Please enter a goal name.");
      return;
    }

    if (!goalAmount) {
      alert("Please enter a goal amount.");
      return;
    }

    if (!goalType) {
      alert("Please select a goal type.");
      return;
    }

    if (endDate && startDate > endDate) {
      alert(
        "Start date cannot be after the end date. Please set the dates again."
      );
      setEndDate(null);
      return;
    }

    if (!endDate) {
      alert("Please select an end date.");
      return;
    }

    const newGoal: IGoalPost = {
      name: goalName.trim(),
      goalAmount: parseFloat(goalAmount),
      type: goalType,
      status: "progress",
      startDate: startDate,
      endDate: endDate,
      categories: selectedCategoryIds,
      note: note,
    };

    createGoal(newGoal, {
      onSuccess: () => onClose(),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-Sly-bg dark:bg-Sly-D-bg z-30 animate-slide-up">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200  dark:border-Sly-grey-900">
        <button onClick={onClose}>
          <XMarkIcon className="w-7 h-7 text-gray-500 dark:text-gray-400" />
        </button>
        <h1 className="text-lg font-semibold text-Sly-Text dark:text-gray-200">
          New Goal
        </h1>
        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="px-4 py-1.5 text-sm font-medium text-white bg-Sly-blue rounded-md hover:bg-Sly-blue-dark disabled:bg-Sly-blue/50"
        >
          Save
        </button>
      </div>

      {/* Form */}
      <div className="p-4 space-y-6 ">
        {/* Type Toggle */}
        <div className="bg-gray-100 dark:bg-Sly-grey-900 rounded-full p-1 flex text-Sly-Text dark:text-gray-300">
          <button
            onClick={() => setGoalType("total")}
            className={`w-1/2 py-2 rounded-full text-sm font-semibold flex items-center justify-center space-x-2 transition-colors duration-300 ${
              goalType === "total"
                ? "bg-white dark:bg-Sly-grey-700 shadow"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            <BanknotesIcon className="w-5 h-5" />
            <span>total</span>
          </button>
          <button
            onClick={() => setGoalType("expense")}
            className={`w-1/2 py-2 rounded-full text-sm font-semibold flex items-center justify-center space-x-2 transition-colors duration-300 ${
              goalType === "expense"
                ? "bg-white dark:bg-Sly-grey-700 shadow"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            <WalletIcon className="w-5 h-5" />
            <span>expense</span>
          </button>
          <button
            onClick={() => setGoalType("income")}
            className={`w-1/2 py-2 rounded-full text-sm font-semibold flex items-center justify-center space-x-2 transition-colors duration-300 ${
              goalType === "income"
                ? "bg-white dark:bg-Sly-grey-700 shadow"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            <CreditCardIcon className="w-5 h-5" />
            <span>income</span>
          </button>
        </div>

        {/* Goal Name */}
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gray-100 dark:bg-Sly-grey-700 rounded-full">
            <TagIcon className="w-6 h-6 text-Sly-Text dark:text-gray-300" />
          </div>
          <input
            type="text"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            placeholder="Goal Name"
            className="w-full bg-transparent text-lg text-Sly-Text dark:text-gray-200 placeholder-gray-400 focus:outline-none"
          />
        </div>

        {/* Goal Amount */}
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gray-100 dark:bg-Sly-grey-700 rounded-full">
            <span className="text-xl font-semibold text-Sly-Text dark:text-gray-300">
              $
            </span>
          </div>
          <input
            type="number"
            value={goalAmount}
            onChange={handleGoalAmountChange}
            placeholder="Goal Amount"
            className="w-full bg-transparent text-lg text-Sly-Text dark:text-gray-200 placeholder-gray-400 focus:outline-none"
          />
        </div>

        {/* Category */}
        <button
          onClick={() => setIsCategoryPickerOpen(true)}
          className="w-full flex justify-between items-center p-4 bg-white dark:bg-Sly-grey-900 rounded-lg shadow-sm"
        >
          <div className="flex items-center space-x-3">
            <Squares2X2Icon className="w-5 h-5 text-gray-500 dark:text-gray-400 " />
            <span className="text-Sly-Text dark:text-gray-300">
              Track Categories
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 dark:text-gray-400">
              {selectedCategoryIds.length > 0
                ? `${selectedCategoryIds.length} selected`
                : "Select"}
            </span>
            <ChevronRightIcon className="w-5 h-5 text-gray-400" />
          </div>
        </button>

        {/* Date Range */}
        <div className="bg-white dark:bg-Sly-grey-900 rounded-lg shadow-sm">
          <button
            onClick={() => setIsStartDatePickerOpen(true)}
            className="w-full flex justify-between items-center p-4 border-b border-gray-200 dark:border-Sly-grey-700"
          >
            <div className="flex items-center space-x-3">
              <CalendarDaysIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <span className="text-Sly-Text dark:text-gray-300">
                Start Date
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-500 dark:text-gray-400">
                {startDate.toLocaleDateString()}
              </span>
              <ChevronRightIcon className="w-5 h-5 text-gray-400" />
            </div>
          </button>
          <button
            onClick={() => setIsEndDatePickerOpen(true)}
            className="w-full flex justify-between items-center p-4"
          >
            <div className="flex items-center space-x-3">
              <CalendarDaysIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <span className="text-Sly-Text dark:text-gray-300">End Date</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-500 dark:text-gray-400">
                {endDate ? endDate.toLocaleDateString() : "Not set"}
              </span>
              <ChevronRightIcon className="w-5 h-5 text-gray-400" />
            </div>
          </button>
        </div>

        {/* Note */}
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Note (optional)"
          rows={3}
          className="w-full bg-white dark:bg-Sly-grey-900 rounded-lg shadow-sm p-4 text-Sly-Text dark:text-gray-200 placeholder-gray-400 focus:outline-none"
        ></textarea>
      </div>

      {isStartDatePickerOpen && (
        <Datepicker
          setDateModal={setIsStartDatePickerOpen}
          date={startDate}
          setDate={setStartDate}
        />
      )}
      {isEndDatePickerOpen && (
        <Datepicker
          setDateModal={setIsEndDatePickerOpen}
          date={endDate}
          setDate={setEndDate}
        />
      )}
      {isCategoryPickerOpen && (
        <CategoryPicker
          isOpen={isCategoryPickerOpen}
          onClose={() => setIsCategoryPickerOpen(false)}
          initialSelectedIds={selectedCategoryIds}
          onDone={setSelectedCategoryIds}
        />
      )}
    </div>
  );
}
