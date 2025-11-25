import { type TOptions } from "@/types/common";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const viewOptions: TOptions[] = [
  "all",
  "expense",
  "income",
  "category",
  "recurring",
  "upcoming",
  "by-day",
  "by-week",
  "by-month",
  "by-year",
];

interface IProps {
  option: TOptions;
  setOption: (value: TOptions) => void;
}

export default function DashboardHeader({ option, setOption }: IProps) {
  const [dropDownBox, setDropDownBox] = useState(false);

  const handleClickOption = (opt: TOptions) => {
    setOption(opt);
    setDropDownBox(false);
  };
  return (
    <div className="flex justify-between items-center mb-4">
      <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-Sly-grey-800">
        <MagnifyingGlassIcon className="w-5 h-5" />
      </button>
      {option !== "all" && (
        <>
          <div className="flex items-center bg-Sly-blue text-white font-medium px-2 py-1 rounded-md">
            <span className="mr-2">{option}</span>
            <XMarkIcon
              onClick={() => setOption("all")}
              className=" w-4 h-4 text-white"
            />
          </div>
        </>
      )}

      <div className="relative flex items-center gap-2">
        <button
          onClick={() => setDropDownBox(!dropDownBox)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-Sly-grey-800"
        >
          <ChevronDownIcon className="w-5 h-5" />
        </button>
        {dropDownBox && (
          <div className="absolute top-full py-2 right-0 w-36 bg-white dark:bg-Sly-grey-900 shadow-lg z-10 rounded-md">
            <ul>
              {viewOptions.map((opt, index) => (
                <li key={index}>
                  <div
                    onClick={() => handleClickOption(opt)}
                    className="flex items-center justify-between w-full text-left px-4 py-1 text-sm text-Sly-Text dark:text-gray-200 hover:bg-Sly-bg dark:hover:bg-Sly-grey-700"
                  >
                    <span>{opt}</span>
                    {option === opt && (
                      <div className="w-2 h-2 rounded-full bg-Sly-blue" />
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
