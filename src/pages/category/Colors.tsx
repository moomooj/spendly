import { colorList } from "@/constants/colorList";

interface ColorsProps {
  setColor: (color: string) => void;
  setShowColorModal: (show: boolean) => void;
}

export default function Colors({ setColor, setShowColorModal }: ColorsProps) {
  const handleColorClick = (color: string) => {
    setColor(color);
    setShowColorModal(false);
  };

  return (
    <div
      className="absolute bottom-full left-0 mb-5 w-max bg-white  dark:bg-Sly-grey-900 rounded-xl p-4 shadow-lg z-20"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="grid grid-cols-6 gap-3">
        {colorList.map((color) => (
          <button
            key={color}
            onClick={() => handleColorClick(color)}
            className="w-8 h-8 rounded-full border border-gray-200 dark:border-Sly-grey-700 hover:opacity-80 transition-opacity"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
}
