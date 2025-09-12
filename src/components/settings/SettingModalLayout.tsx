import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

type Props = {
  title: string;
  children: React.ReactNode;
};

export default function SettingModalLayout({ title, children }: Props) {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-start">
        <button
          onClick={() => navigate(-1)} // 이전 페이지로 이동
          className="p-1 rounded hover:bg-gray-100"
        >
          <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
        </button>

        <h1 className=" text-2xl font-bold text-gray-900">{title}</h1>
        <div className="w-10" />
      </header>

      <div className="space-y-3">{children}</div>
    </div>
  );
}
