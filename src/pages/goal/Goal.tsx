import { PlusIcon, TrophyIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import AddGoalModal from "./AddGoalModal";
import { useGoals } from "./useGoal";
import { useNavigate } from "react-router-dom";

export default function Goal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: goals, isLoading, isError } = useGoals();
  const navigate = useNavigate();

  return (
    <>
      <div className="p-4  dark:bg-Sly-D-bg min-h-screen">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-Sly-Text dark:text-gray-200">
            My Goals
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-Sly-blue text-white p-2 rounded-full shadow-md hover:bg-Sly-blue-dark transition-colors"
          >
            <PlusIcon className="w-6 h-6" />
          </button>
        </header>
        {isLoading ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Loading goals...
          </p>
        ) : isError ? (
          <p className="text-center text-red-500">Failed to load goals.</p>
        ) : !goals || goals.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center mt-20">
            <div className="p-6 bg-gray-100 dark:bg-Sly-grey-800 rounded-full mb-4">
              <TrophyIcon className="w-12 h-12 text-gray-500 dark:text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-Sly-Text dark:text-gray-200">
              No goals yet
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Add your first goal by tapping the '+' button on the top right!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {goals.map((goal) => (
              <div
                key={goal.id}
                className=" bg-white dark:bg-Sly-grey-900 dark:bg-Sly-grey-800 rounded-lg shadow p-4"
                onClick={() => navigate(`/goal/${goal.id}`)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    {/* TODO: Add emoji to goal data if available */}
                    <span className="text-2xl">🎯</span>
                    <h2 className="text-lg font-semibold text-Sly-Text dark:text-gray-200">
                      {goal.name}
                    </h2>
                  </div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {Math.round(
                      Math.max(0, (goal.currentAmount / goal.goalAmount) * 100)
                    )}
                    %
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-2">
                  <div
                    className="bg-Sly-blue h-2.5 rounded-full"
                    style={{
                      width: `${Math.max(
                        0,
                        (goal.currentAmount / goal.goalAmount) * 100
                      )}%`,
                    }}
                  ></div>
                </div>
                <div className="text-right text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-bold">
                    ${goal.currentAmount.toLocaleString()}
                  </span>{" "}
                  / ${goal.goalAmount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <AddGoalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
