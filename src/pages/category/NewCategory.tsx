import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  FaceSmileIcon,
  PlusIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import Icons from "./Icons";
import Colors from "./Colors";
import { useCreateCategory, useUpdateCategory } from "@/hooks/useCategories";
import type { ICategory } from "@/types/common";

interface NewCategoryProps {
  category?: ICategory;
  setNewCategoryModal: (value: boolean) => void;
}

export default function NewCategory({
  category,
  setNewCategoryModal,
}: NewCategoryProps) {
  const [type, setType] = useState<"expense" | "income">(
    category?.type || "expense"
  );
  const [icon, setIcon] = useState<string | null>(category?.icon || null);
  const [color, setColor] = useState<string>(category?.color || "#E0FFFF");
  const [name, setName] = useState<string>(category?.name || "");
  const [showColorModal, setShowColorModal] = useState<boolean>(false);

  useEffect(() => {
    if (category) {
      setName(category.name);
      setIcon(category.icon);
      setColor(category.color);
      setType(category.type);
    }
  }, [category]);

  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();

  const handleSubmit = () => {
    if (!name.trim() || !icon || !color) {
      alert("Please provide a name, icon, and color for the category.");
      return;
    }

    const categoryData = {
      name: name.trim(),
      icon,
      color,
      type,
    };

    if (category) {
      // Update existing category
      updateCategoryMutation.mutate(
        { id: category._id, data: categoryData },
        {
          onSuccess: () => {
            setNewCategoryModal(false);
          },
          onError: (error) => {
            alert(
              `Failed to update category: ${
                error instanceof Error ? error.message : "Unknown error"
              }`
            );
          },
        }
      );
    } else {
      // Create new category
      createCategoryMutation.mutate(categoryData, {
        onSuccess: () => {
          setNewCategoryModal(false);
        },
        onError: (error) => {
          alert(
            `Failed to create category: ${
              error instanceof Error ? error.message : "Unknown error"
            }`
          );
        },
      });
    }
  };

  const isProcessing =
    createCategoryMutation.isPending || updateCategoryMutation.isPending;
  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-end"
      onClick={() => setNewCategoryModal(false)}
    >
      <div
        className="w-full  bg-white flex flex-col items-center pt-5 px-3 rounded-t-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="flex justify-between items-center w-full mb-6">
          <button className="text-gray-400 hover:text-gray-600 transition">
            <XMarkIcon
              className="w-6 h-6"
              onClick={() => setNewCategoryModal(false)}
            />
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

          <div></div>
        </div>

        {/* icon */}
        <div className="px-5 py-4 text-3xl rounded-xl border-3 border-Sly-grey-300 my-20">
          {icon ? icon : <FaceSmileIcon className="w-7 h-9" />}
        </div>

        {/* color, name ,add btn */}
        <div className="flex py-3 w-full">
          <div className="w-10 h-10 bg-Sly-bg rounded-xl flex justify-center items-center">
            <div
              onClick={() => setShowColorModal(!showColorModal)}
              className="w-7 h-7 rounded-xl relative"
              style={{ background: color }}
            >
              {showColorModal ? (
                <Colors
                  setShowColorModal={setShowColorModal}
                  setColor={setColor}
                />
              ) : null}
            </div>
          </div>
          <input
            className="bg-Sly-bg mx-2 px-2 w-9/12 rounded-xl border-2 border-transparent focus:outline-none focus:border-Sly-Text transition-colors"
            placeholder="Category name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            disabled={isProcessing}
            className="w-10 h-10 p-2 bg-Sly-grey-900 rounded-xl text-Sly-bg flex justify-center items-center disabled:bg-Sly-grey-300"
          >
            {isProcessing ? (
              <ArrowPathIcon className="w-6 h-6 animate-spin" />
            ) : (
              <PlusIcon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* keyboard */}
        <Icons setIcon={setIcon} />
      </div>
    </div>
  );
}
