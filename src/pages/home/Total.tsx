import { useState } from "react";
import { useTotal } from "./hooks/useTotal";
import type { Period } from "@/types/common";
import { periods } from "@/constants/periods";

export default function Total() {
  const [period, setPeriod] = useState<Period>("today");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data, isLoading, isError } = useTotal(period);

  if (isLoading) {
    return (
      <div className="w-full h-60 flex flex-col justify-center items-center">
        <p>Loading total...</p>
      </div>
    );
  } else if (isError) {
    return (
      <div className="w-full h-60 flex flex-col justify-center items-center text-red-500">
        <p>Error fetching total.</p>
      </div>
    );
  } else if (data)
    return (
      <div className="w-full h-60 flex flex-col justify-center items-center bg-Sly-bg dark:bg-Sly-D-bg rounded-lg mb-6">
        <div className="relative">
          <h1 className="text-center text-lg">
            Net Total{" "}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="rounded-lg p-0.5 text-sm px-2 border border-gray-300 dark:border-Sly-grey-700 capitalize"
            >
              {period.replace("-", " ")}
            </button>
          </h1>
          {isDropdownOpen && (
            <div className="absolute top-full mt-2 w-36 bg-white dark:bg-Sly-grey-900 border border-gray-300 dark:border-Sly-grey-700 shadow-lg z-10 rounded-md">
              <ul>
                {periods.map((p) => (
                  <li key={p}>
                    <button
                      onClick={() => {
                        setPeriod(p);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm capitalize ${
                        period === p
                          ? "bg-Sly-bg dark:bg-Sly-grey-700"
                          : "bg-white dark:bg-Sly-grey-900 hover:bg-Sly-bg dark:hover:bg-Sly-grey-700"
                      }`}
                    >
                      {p.replace("-", " ")}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="text-5xl mt-2">
          $
          {data.total.toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })}
        </div>
      </div>
    );
}
