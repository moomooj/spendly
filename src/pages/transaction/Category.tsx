import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useCategories } from "../../hooks/useCategories";
import { type ICategory } from "@/types/common";
import { useNavigate } from "react-router-dom";

interface CategoryProps {
  setCategory: (value: ICategory | null) => void;
  setCategoryModal: (value: boolean) => void;
}

export default function Category({
  setCategory,
  setCategoryModal,
}: CategoryProps) {
  const { data, isLoading, isError, error } = useCategories();
  const navigate = useNavigate();

  function handleCategoryClick(index: number) {
    if (data) {
      setCategory(data[index]);
      setCategoryModal(false);
    }
  }

  if (isLoading) {
    return <div>loading...</div>;
  } else if (isError) {
    return <div>can't load categories : {error.message}</div>;
  } else
    return (
      <div className="fixed inset-0 bg-Sly-grey-500/30 backdrop-blur-sm p-8">
        <div className="flex flex-wrap gap-3 h-full overflow-y-auto overflow-x-hidden content-start">
          <div className="w-fit bg-white/80 p-2 rounded-lg shadow-md">
            <div
              className="flex flex-row items-center justify-center space-x-1"
              onClick={() => navigate("/categories")}
            >
              <PencilSquareIcon className="w-5 h-7" />
              <span className="font-semibold text-sm text-gray-800">
                Edit Category
              </span>
            </div>
          </div>
          {data?.map((category, index) => (
            <div
              onClick={() => handleCategoryClick(index)}
              key={category.id}
              className="w-fit bg-white/80 p-2 rounded-lg shadow-md"
              style={{ background: category.color }}
            >
              <div className="flex flex-row items-center justify-center space-x-1">
                <span className="text-xl">{category.icon}</span>
                <span className="font-semibold text-sm text-gray-800">
                  {category.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}
