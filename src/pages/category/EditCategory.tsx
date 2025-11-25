import { useCategories } from "@/hooks/useCategories";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NewCategory from "./NewCategory";
import type { ICategory } from "@/types/common";

export default function EditCategory() {
  const { data, isLoading, isError, error } = useCategories();
  const [type, setType] = useState<"expense" | "income">("expense");
  const [newCategoryModal, setNewCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    ICategory | undefined
  >(undefined);
  const navigate = useNavigate();

  if (isLoading) {
    return <div>loading...</div>;
  } else if (isError) {
    return <div>can't load categories : {error.message}</div>;
  } else if (data)
    return (
      <div className="flex flex-col items-center bg-Sly-bg dark:bg-Sly-D-bg min-h-screen py-5 px-3 relative">
        {/* header */}
        <div className="flex justify-between items-center w-full mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-400 dark:text-Sly-grey-200 hover:text-gray-600  transition"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>

          <div className="flex rounded-full p-1">
            <button
              onClick={() => setType("expense")}
              className={`px-4 py-1 rounded-full text-sm font-medium ${
                type === "expense"
                  ? "bg-white dark:bg-Sly-grey-700 shadow text-gray-900 dark:text-white"
                  : "text-gray-400 dark:text-Sly-grey-200"
              }`}
            >
              Expense
            </button>
            <button
              onClick={() => setType("income")}
              className={`px-4 py-1 rounded-full text-sm font-medium ${
                type === "income"
                  ? "bg-white dark:bg-Sly-grey-700 shadow text-gray-900 dark:text-white"
                  : "text-gray-400 dark:text-Sly-grey-200"
              }`}
            >
              Income
            </button>
          </div>

          <div className="flex rounded-full px-2 py-1 bg-white dark:bg-Sly-grey-900 shadow text-sm font-medium text-Sly-Text dark:text-gray-200">
            <button
              onClick={() => {
                setSelectedCategory(undefined);
                setNewCategoryModal(true);
              }}
            >
              + New
            </button>
          </div>
        </div>

        {/* category */}
        <section className="bg-white w-full dark:bg-Sly-grey-900 text-Sly-Text dark:text-gray-200 rounded-lg p-3 space-y-4 ">
          {data.map(
            (category) =>
              category.type === type && (
                <div
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category);
                    setNewCategoryModal(true);
                  }}
                  className="flex items-center cursor-pointer"
                >
                  <div className="text-2xl mr-3">{category.icon}</div>
                  <div className="flex w-full items-center justify-between ">
                    <div className="flex w-full justify-between items-center gap-1">
                      <span className="text-sm text-Sly-Text dark:text-gray-200 font-semibold">
                        {category.name}
                      </span>
                      <div
                        className="w-5 h-5 rounded-sm"
                        style={{ background: category.color }}
                      />
                    </div>
                  </div>
                </div>
              )
          )}
        </section>
        {newCategoryModal && (
          <NewCategory
            category={selectedCategory}
            setNewCategoryModal={setNewCategoryModal}
          />
        )}
      </div>
    );
}
