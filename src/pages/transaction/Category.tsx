import { useCategories } from "./useCategories";
import burgerIcon from "@/data/burger.png";
import { type ICategory } from "./useCategories";

interface CategoryProps {
  setCategory: (value: ICategory | null) => void;
  setCategoryModal: (value: boolean) => void;
}

export default function Category({
  setCategory,
  setCategoryModal,
}: CategoryProps) {
  const { data, isLoading, isError, error } = useCategories();

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
          {data?.map((category, index) => (
            <div
              onClick={() => handleCategoryClick(index)}
              key={category.id}
              className="w-fit bg-white/80 p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-row items-center space-x-1">
                <img
                  src={burgerIcon}
                  alt={category.name}
                  className="w-5 h-5 rounded-full flex-shrink-0"
                />

                <span className="font-semibold text-sm text-gray-800 whitespace-nowrap">
                  {category.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}
