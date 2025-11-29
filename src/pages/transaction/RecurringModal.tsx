import type { IRecurring } from "@/types/common";
import {
  ArrowPathIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

interface RecurringModalProps {
  recurring: IRecurring | null;
  setRecurring: (value: IRecurring | null) => void;
  recurringMenu: boolean;
  setRecurringMenu: (value: boolean) => void;
  setCustomNumber: (value: number | null) => void;
}

export default function RecurringModal({
  recurring,
  setCustomNumber,
  setRecurring,
  recurringMenu,
  setRecurringMenu,
}: RecurringModalProps) {
  const [customMenu, setCustomMenu] = useState(false);
  const [repeatNumber, setRepeatNumber] = useState(2);
  const repeatUnits = ["days", "weeks", "months"] as const;
  type RepeatUnit = (typeof repeatUnits)[number];
  const [repeatUnitIndex, setRepeatUnitIndex] = useState(0);
  const repeatUnit: RepeatUnit = repeatUnits[repeatUnitIndex];

  const recurringOptions = ["none", "daily", "weekly", "monthly", "custom"];

  const handleCloseRecurringMenu = (option: any) => {
    if (option === "custom") {
      setCustomMenu(true);
      return;
    }
    if (option !== "none") {
      setRecurringMenu(false);
      setCustomNumber(null);
      if (option === "daily") setRecurring("days");
      if (option === "weekly") setRecurring("weeks");
      if (option === "monthly") setRecurring("months");
      return;
    } else {
      setRecurringMenu(false);
      setRecurring(null);
    }
  };

  const handleNumberChange = (direction: "up" | "down") => {
    setRepeatNumber((prev) => {
      if (direction === "up" && prev < 30) {
        return prev + 1;
      }
      if (direction === "down" && prev > 2) {
        return prev - 1;
      }
      return prev;
    });
  };

  const handleUnitChange = (direction: "up" | "down") => {
    setRepeatUnitIndex((prevIndex) => {
      const newIndex = direction === "up" ? prevIndex - 1 : prevIndex + 1;
      return (newIndex + repeatUnits.length) % repeatUnits.length;
    });
  };
  return (
    <>
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            onClick={() => setRecurringMenu(!recurringMenu)}
            className={` rounded-full p-1.5 mx-3 ${
              recurring
                ? "text-green-500 bg-green-100 dark:bg-green-500/40"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            <ArrowPathIcon className="w-5 h-5" />
          </button>
        </div>
        {recurringMenu && (
          <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl  z-10">
            <div className="py-1">
              {recurringOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleCloseRecurringMenu(option as IRecurring)}
                  className="w-full text-left px-4 py-2 text-sm text-Sly-Text dark:text-gray-200 "
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {customMenu && (
        <div className="fixed w-full h-full inset-0 bg-gray-500/40 dark:bg-black/50 backdrop-blur-xs flex items-end z-30">
          <div className="bg-Sly-bg w-full h-[30%] rounded-t-xl">
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-Sly-grey-700">
              <button
                onClick={() => {
                  setCustomMenu(false);
                }}
              >
                <XMarkIcon className="w-7 h-7 text-gray-400 bg-gray-500/20 rounded-full p-1" />
              </button>
              <p className="font-semibold text-lg text-Sly-Text dark:text-gray-200">
                Custom interval
              </p>
              <button
                onClick={() => {
                  setCustomMenu(false);
                  setCustomNumber(repeatNumber);
                  setRecurring(repeatUnit);
                }}
              >
                <CheckIcon className="w-7 h-7 text-green-600 bg-green-500/30 rounded-full p-1" />
              </button>
            </div>

            <div className="flex items-center justify-center p-8 space-x-6 text-Sly-Text dark:text-gray-200">
              <p className="text-lg">Repeats Every</p>
              <div className="flex items-center space-x-4">
                <div className="flex flex-col items-center">
                  <button onClick={() => handleNumberChange("up")}>
                    <ChevronUpIcon className="w-6 h-6" />
                  </button>
                  <span className="text-4xl font-bold w-16 text-center">
                    {repeatNumber}
                  </span>
                  <button onClick={() => handleNumberChange("down")}>
                    <ChevronDownIcon className="w-6 h-6" />
                  </button>
                </div>
                <div className="flex flex-col items-center">
                  <button onClick={() => handleUnitChange("up")}>
                    <ChevronUpIcon className="w-6 h-6" />
                  </button>
                  <span className="text-4xl font-bold w-40 text-center capitalize">
                    {repeatUnit}
                  </span>
                  <button onClick={() => handleUnitChange("down")}>
                    <ChevronDownIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
