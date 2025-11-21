import { useCategories } from "@/hooks/useCategories";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NewCategoryModal from "./NewCategory";

export default function EditCategory() {
  const { data, isLoading, isError, error } = useCategories();
  const [type, setType] = useState<"expense" | "income">("expense");
  const [newCategoryModal, setNewCategoryModal] = useState(false);

  const navigate = useNavigate();

  if (isLoading) {
    return <div>loading...</div>;
  } else if (isError) {
    return <div>can't load categories : {error.message}</div>;
  } else if (data)
    return (
      <div className="flex flex-col items-center bg-Sly-bg min-h-screen py-5 px-3">
        {/* header */}
        <div className="flex justify-between items-center w-full mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>

          <div className="flex rounded-full p-1">
            <button
              onClick={() => setType("expense")}
              className={`px-4 py-1 rounded-full text-sm font-medium ${
                type === "expense"
                  ? "bg-white shadow text-gray-900"
                  : "text-gray-400"
              }`}
            >
              Expense
            </button>
            <button
              onClick={() => setType("income")}
              className={`px-4 py-1 rounded-full text-sm font-medium ${
                type === "income"
                  ? "bg-white shadow text-gray-900"
                  : "text-gray-400"
              }`}
            >
              Income
            </button>
          </div>

          <div className="flex rounded-full px-2 py-1 bg-white shadow text-sm font-medium">
            <button onClick={() => setNewCategoryModal(true)}>+ New</button>
          </div>
        </div>

        {/* category */}
        <section className="bg-white w-full dark:bg-Sly-grey-900 text-Sly-Text dark:text-white rounded-lg p-3 space-y-4 ">
          {data.map((category) =>
            category.type === type ? (
              <div key={category._id} className="flex items-center ">
                <div className="text-2xl mr-3">{category.icon}</div>
                <div className="flex w-full items-center justify-between ">
                  <div className="flex w-full justify-between items-center gap-1 text-gray-500">
                    <span className="text-sm text-Sly-Text font-semibold">
                      {category.name}
                    </span>
                    <div
                      className="w-5 h-5 rounded-sm"
                      style={{ background: category.color }}
                    />
                  </div>
                </div>
              </div>
            ) : null
          )}
        </section>
        {/* bottom */}
        {newCategoryModal ? (
          <NewCategoryModal setNewCategoryModal={setNewCategoryModal} />
        ) : null}
      </div>
    );
}
