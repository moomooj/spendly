import { useState, useMemo } from "react";
import TransactionGroup from "@/components/ui/TransactionGroup";
import type { ITransaction, ITransactionGroup } from "@/types/common";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface Iprops {
  data: ITransactionGroup[];
  setSearchModal: (value: boolean) => void;
}

export default function Search({ data, setSearchModal }: Iprops) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) {
      return []; // 검색어가 없으면 아무것도 보여주지 않음
    }

    const lowercasedTerm = searchTerm.toLowerCase();

    return data
      .map((group: ITransactionGroup) => ({
        ...group,
        transactions: group.transactions.filter(
          (tx: ITransaction) =>
            tx.name?.toLowerCase().includes(lowercasedTerm) ||
            tx.category?.name?.toLowerCase().includes(lowercasedTerm)
        ),
      }))
      .filter((group) => group.transactions.length > 0);
  }, [data, searchTerm]);

  return (
    <div
      onClick={() => setSearchModal(false)}
      className="fixed inset-0 bg-Sly-bg dark:bg-Sly-D-bg bg-opacity-70 p-4 sm:p-8 z-20 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl mx-auto bg-Sly-bg dark:bg-Sly-D-bg rounded-lg  flex flex-col max-h-[90vh]"
      >
        <div className="p-4 relative">
          <MagnifyingGlassIcon className="ml-1 w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-300 dark:bg-Sly-D-bg rounded-sm py-2 pl-10 pr-4 focus:outline-none  text-Sly-Text dark:text-gray-200"
            autoFocus
          />
        </div>
        <div className="overflow-y-auto p-4">
          {filteredData.map((group) => (
            <TransactionGroup
              key={group.date}
              date={group.date}
              transactions={group.transactions}
            />
          ))}
          {searchTerm && filteredData.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400 py-10">
              No transactions found for "{searchTerm}".
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
