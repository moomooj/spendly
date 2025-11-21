import { useState } from "react";
import { useTotal, type Period } from "./hooks/useTotal";

export default function Total() {
  const [period, setPeriod] = useState<Period>("today");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data, isLoading, isError } = useTotal(period);

  const periods: Period[] = [
    "today",
    "this-week",
    "this-month",
    "this-year",
    "all-time",
  ];

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
      <div className="w-full h-60 flex flex-col justify-center items-center">
        <div className="relative">
          <h1 className="text-center text-lg">
            Net Total{" "}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="rounded-lg p-0.5 text-sm px-2 border-gray-300 border capitalize"
            >
              {period.replace("-", " ")}
            </button>
          </h1>
          {isDropdownOpen && (
            <div className="absolute top-full mt-2 w-36 bg-white border border-gray-300  shadow-lg z-10">
              <ul>
                {periods.map((p) => (
                  <li key={p}>
                    <button
                      onClick={() => {
                        setPeriod(p);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm bg-Sly-bg text-gray-70 capitalize"
                      style={period === p ? {} : { background: "white" }}
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
