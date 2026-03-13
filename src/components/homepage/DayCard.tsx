import { SealCheckIcon, PlusCircleIcon } from "@phosphor-icons/react";

interface DayCardProps {
  label: string;
  dayNumber: number;
  value: string;
  onChange: (value: string) => void;
}

const DayCard = ({ label, dayNumber, value, onChange }: DayCardProps) => {
  const hasValue = value.trim().length > 0;

  return (
    <div
      className={`flex flex-row justify-between items-center p-2 min-w-80 rounded-r-lg
        border-l-3 transition-colors duration-300
        ${
          hasValue
            ? "bg-weekly-card border-l-green-highlight"
            : "bg-weekly-card/60 border-l-gray-600"
        }`}
    >
      <div className="flex flex-col items-center">
        <p className="text-xs opacity-60">{label}</p>
        <p className="text-xl text-white font-semibold">{dayNumber}</p>
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="OPEN SLOT"
        className="max-h-8 placeholder:text-sm font-bold bg-transparent outline-none"
      />

      <span className="">
        {hasValue ? (
          <SealCheckIcon size={24} className="text-green-highlight" />
        ) : (
          <PlusCircleIcon size={24} className="text-darker-text opacity-50" />
        )}
      </span>
    </div>
  );
};

export default DayCard;
