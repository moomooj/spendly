import { ChevronRightIcon } from "@heroicons/react/24/outline";

interface SettingItemProps {
  icon: React.ReactNode;
  label: string;
  buttonType: "toggle" | "text";
  SettingText?: string;
  onClick: () => void;
}

export default function SettingItem({
  icon,
  label,
  buttonType,
  SettingText,
  onClick,
}: SettingItemProps) {
  return (
    <div onClick={onClick} className="flex items-center ">
      {/* Icon Placeholder */}
      <div className="w-11 h-10 flex items-center justify-center rounded-lg bg-amber-200 mr-2">
        {icon}
      </div>

      <div className="flex w-full items-center justify-between ">
        <p className="text-sm font-medium ">{label}</p>
        {buttonType == "toggle" ? (
          "NEED TO BE TOGGLE BTN"
        ) : (
          <div className="flex items-center gap-1 text-gray-500">
            <span className="text-sm">{SettingText}</span>
            <ChevronRightIcon className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );
}
