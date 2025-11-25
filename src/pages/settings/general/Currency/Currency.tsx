import { useState } from "react";
import SettingModalLayout from "@/components/settings/SettingModalLayout";
import { currencyList } from "@/constants/currencyList";

export default function CurrencyModal() {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  return (
    <div className="space-y-6">
      <SettingModalLayout title="Currency">
        <div className="space-y-4 bg-white dark:bg-Sly-grey-900 rounded-lg px-4">
          <div className="overflow-y-auto">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {currencyList.map((currency) => (
                <li
                  key={currency.code}
                  onClick={() => setSelectedCurrency(currency.code)}
                  className={`py-3 flex justify-between cursor-pointer text-Sly-Text dark:text-gray-200 ${
                    selectedCurrency === currency.code
                      ? "text-Sly-blue dark:text-Sly-blue font-semibold"
                      : ""
                  }`}
                >
                  <div className="flex">
                    <span
                      className={`mr-3 font-semibold ${
                        selectedCurrency === currency.code
                          ? "text-Sly-blue dark:text-Sly-blue"
                          : "text-Sly-grey-500 dark:text-Sly-grey-300"
                      }`}
                    >
                      {currency.code}
                    </span>
                    <span className="text-Sly-grey-500 dark:text-Sly-grey-300">
                      ({currency.name})
                    </span>
                  </div>
                  <span>{currency.symbol}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SettingModalLayout>
    </div>
  );
}
