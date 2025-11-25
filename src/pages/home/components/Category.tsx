import type { InsightSingle, ITransaction } from "@/types/common";
import useCurrencyStore from "@/store/currencyStore";
import { useState } from "react";

interface Iprops {
  data: any;
}

export default function Category({ data }: Iprops) {
  const [categoryNum, setCategoryNum] = useState(data[0].id);
  const { selectedCurrency } = useCurrencyStore();

  const handleCategoryClick = (id: number) => {
    setCategoryNum(id);
  };

  return (
    <div>
      <div className="flex overflow-auto py-4">
        {data?.map((category: InsightSingle) => (
          <div
            className="flex items-center rounded-sm py-1 px-2 mx-2 whitespace-nowrap cursor-pointer bg-Sly-D-bg"
            key={category.id}
            style={{
              backgroundColor:
                category.id === categoryNum ? category.color : "",
            }}
            onClick={() => handleCategoryClick(category.id)}
          >
            <span className="mr-2">{category.icon}</span>
            <span>{category.name}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-2">
        {data
          .find((category: InsightSingle) => category.id === categoryNum)
          ?.transactions.map((tx: ITransaction) => (
            <div
              key={tx._id}
              className="flex justify-between items-center p-3 bg-Sly-bg dark:bg-Sly-D-bg rounded-lg"
            >
              <div className="flex items-center">
                <div className="mr-4 text-xl">{tx.category.icon}</div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(tx.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div
                className={`font-semibold ${
                  tx.type !== "expense" && "text-Sly-blue"
                }`}
              >
                {tx.type === "expense" && "-"}
                {selectedCurrency.symbol}
                {Math.abs(tx.amount).toLocaleString()}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
