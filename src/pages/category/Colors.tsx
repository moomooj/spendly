interface ColorsProps {
  setColor: (color: string) => void;
  setShowColorModal: (show: boolean) => void;
}

const colorList = [
  "#EF4444", // Red
  "#F97316", // Orange
  "#EAB308", // Yellow
  "#84CC16", // Lime
  "#22C55E", // Green
  "#10B981", // Emerald
  "#14B8A6", // Teal
  "#06B6D4", // Cyan
  "#0EA5E9", // Sky
  "#3B82F6", // Blue
  "#6366F1", // Indigo
  "#8B5CF6", // Violet
  "#A855F7", // Purple
  "#D946EF", // Fuchsia
  "#EC4899", // Pink
  "#F43F5E", // Rose
  "#78716C", // Stone
  "#A16207", // Amber
  "#6B7280", // Gray
  "#64748B", // Slate
  "#737373", // Neutral
  "#71717A", // Zinc
  "#52525B", // Cool Gray
  "#44403C", // Warm Gray
];

export default function Colors({ setColor, setShowColorModal }: ColorsProps) {
  const handleColorClick = (color: string) => {
    setColor(color);
    setShowColorModal(false);
  };

  return (
    <div
      className="absolute bottom-full left-0 mb-5 w-max bg-white rounded-xl p-4 shadow-lg z-20"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="grid grid-cols-6 gap-3">
        {colorList.map((color) => (
          <button
            key={color}
            onClick={() => handleColorClick(color)}
            className="w-8 h-8 rounded-full border border-gray-200 hover:opacity-80 transition-opacity"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
}
