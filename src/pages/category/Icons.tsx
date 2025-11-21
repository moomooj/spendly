import { iconList } from "@/constants/iconList";

interface IconsProps {
  setIcon: (icon: string | null) => void;
}

export default function Icons({ setIcon }: IconsProps) {
  const handleIconClick = (icon: string) => {
    setIcon(icon);
  };

  return (
    <div className="flex justify-center items-center ">
      <div
        className="bg-Sly-bg  p-5 max-w-sm w-full pb-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-x-auto pb-2">
          <div className="grid grid-rows-4 grid-flow-col gap-4">
            {iconList.map((icon, index) => (
              <button
                key={index}
                onClick={() => handleIconClick(icon)}
                className="text-3xl rounded-lg hover:bg-gray-200 p-2 transition-colors"
              >
                {icon}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
