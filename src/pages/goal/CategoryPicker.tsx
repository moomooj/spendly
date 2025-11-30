import { useState, useEffect } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useCategories } from "@/hooks/useCategories";
import type { ICategory } from "@/types/common";

interface CategoryPickerProps {
  isOpen: boolean;
  onClose: () => void;
  initialSelectedIds: string[];
  onDone: (ids: string[]) => void;
}

export default function CategoryPicker({
  isOpen,
  onClose,
  initialSelectedIds,
  onDone,
}: CategoryPickerProps) {
  const { data, isLoading, isError, error } = useCategories();
  const [selectedIds, setSelectedIds] = useState<string[]>(initialSelectedIds);

  useEffect(() => {
    if (isOpen) {
      setSelectedIds(initialSelectedIds);
    }
  }, [isOpen, initialSelectedIds]);

  const handleCategorySelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((catId) => catId !== id) : [...prev, id]
    );
  };

  const handleDone = () => {
    onDone(selectedIds);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500/40 dark:bg-black/50 backdrop-blur-sm flex items-end z-40">
      <div className="bg-Sly-bg dark:bg-Sly-grey-800 w-full rounded-t-xl animate-slide-up-fast h-4/5 flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-Sly-grey-700">
          <h2 className="text-lg font-semibold text-Sly-Text dark:text-gray-200">
            Select Categories
          </h2>
          <button
            onClick={handleDone}
            className="px-4 py-1.5 text-sm font-medium text-white bg-Sly-blue rounded-md hover:bg-Sly-blue-dark"
          >
            Done
          </button>
        </div>
        <div className="p-4 flex-grow overflow-y-auto">
          {isLoading && <p>Loading categories...</p>}
          {isError && <p>Error: {error.message}</p>}
          {data &&
            data.map((category: ICategory) => {
              const isSelected = selectedIds.includes(category._id);
              return (
                <button
                  key={category._id}
                  onClick={() => handleCategorySelect(category._id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg mb-2 transition-colors ${
                    !isSelected &&
                    "hover:bg-gray-100 dark:hover:bg-Sly-grey-700"
                  }`}
                  style={{
                    backgroundColor: isSelected
                      ? `${category.color}99`
                      : "transparent",
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{category.icon}</span>
                    <span className="text-Sly-Text dark:text-gray-200">
                      {category.name}
                    </span>
                  </div>
                  {isSelected && (
                    <CheckIcon
                      className="w-5 h-5"
                      style={{ color: category.color }}
                    />
                  )}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
}
