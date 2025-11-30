import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker-custom.css";

interface DatepickerProps {
  setDateModal: (value: boolean) => void;
  date: Date | null;
  setDate: (date: Date) => void;
}

export default function Datepicker({
  setDateModal,
  date,
  setDate,
}: DatepickerProps) {
  const handleDateChange = (newDate: Date | null) => {
    if (newDate) setDate(newDate);
  };

  return (
    <div
      className="fixed w-full h-full inset-0 bg-gray-500/90 dark:bg-black/50 backdrop-blur-sm flex justify-center items-center z-30"
      onClick={() => setDateModal(false)}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <DatePicker
          selected={date}
          onChange={handleDateChange}
          inline
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
        />
      </div>
    </div>
  );
}
