import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate, useParams } from "react-router-dom";
import { useGoal, useDeleteGoal } from "./useGoal";
import type { ICategoryInsight, ITransaction } from "@/types/common";

export default function GoalDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: goal, isLoading, isError } = useGoal(id);
  const { mutate: deleteGoal, isPending: isDeleting } = useDeleteGoal();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      if (id) {
        deleteGoal(id, {
          onSuccess: () => {
            navigate("/goal"); // 삭제 후 목표 목록 페이지로 이동
          },
        });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 text-center text-gray-500 dark:text-gray-400">
        Loading goal details...
      </div>
    );
  }

  if (isError || !goal) {
    return (
      <div className="p-4 text-center text-red-500">
        Failed to load goal details.
      </div>
    );
  }

  const percentage = Math.round(
    Math.max(0, (goal.currentAmount / goal.goalAmount) * 100)
  );

  return (
    <div className="p-4 bg-gray-50  dark:bg-Sly-D-bg min-h-screen">
      <header className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="p-2 ">
          <ArrowLeftIcon className="w-6 h-6 text-Sly-Text dark:text-gray-200" />
        </button>
        <h1 className="text-xl font-bold text-Sly-Text dark:text-gray-200 mx-auto">
          Goal Details
        </h1>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="p-2 disabled:opacity-50"
        >
          <TrashIcon className="w-9 h-9 text-red-500 rounded-full p-2 bg-red-300/25 dark:bg-red-300/25" />
        </button>
      </header>

      <div className="bg-white dark:bg-Sly-grey-900 rounded-lg shadow p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-Sly-Text dark:text-gray-200">
            {goal.name}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Status:{" "}
            <span className="font-semibold capitalize">{goal.status}</span>
          </p>
        </div>

        {/* Progress Bar */}
        <div className="relative h-20 w-20 mx-auto mb-4">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              className="text-gray-200 dark:text-gray-700"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="text-Sly-blue"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray={`${percentage}, 100`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-Sly-Text dark:text-gray-200">{`${percentage}%`}</span>
          </div>
        </div>

        <div className="text-center text-lg text-Sly-Text dark:text-gray-300 mb-6">
          <span className="font-bold">
            ${goal.currentAmount.toLocaleString()}
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            {" "}
            / ${goal.goalAmount.toLocaleString()}
          </span>
        </div>

        <div className="border-t border-gray-200 dark:border-Sly-grey-700 pt-4 mt-6">
          <h3 className="font-semibold text-Sly-Text dark:text-gray-200 mb-2">
            Note
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {goal.note || "No note provided."}
          </p>
        </div>
        {/* Tracked Categories */}
        <div className="border-t border-gray-200 dark:border-Sly-grey-700 pt-4 mt-6">
          {goal.categories && goal.categories.length > 0 ? (
            goal.categories.map((category: ICategoryInsight) => (
              <div key={category.id} className="mb-6 last:mb-0">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{category.icon}</span>
                    <h3 className="font-semibold text-Sly-Text dark:text-gray-200">
                      {category.name}
                    </h3>
                  </div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {category.transactions.length} transactions
                  </span>
                </div>
                <div className="space-y-2">
                  {category.transactions.map((transaction: ITransaction) => (
                    <div
                      key={transaction._id}
                      className="flex justify-between items-center bg-gray-50 dark:bg-Sly-grey-700/50 p-3 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-Sly-Text dark:text-gray-200">
                          {transaction.description || "Transaction"}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>
                      <p
                        className={`font-semibold ${
                          transaction.type === "expense"
                            ? "text-red-500"
                            : "text-Sly-blue"
                        }`}
                      >
                        {transaction.type === "expense" ? "-" : "+"}$
                        {transaction.amount.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No related transactions yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
