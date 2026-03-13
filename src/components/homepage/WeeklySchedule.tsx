import { CalendarDotsIcon } from "@phosphor-icons/react";
import DayCard from "./DayCard";
import getWeekDays from "../../utils/GetWeekDays";
import { useState } from "react";

interface WeeklyMeals {
  date: string;
  label: string;
  dayNumber: number;
  value: string;
}

const WeeklySchedule = () => {
  const [meals, setMeals] = useState<Record<string, string>>({});
  const weekDays = getWeekDays(new Date());

  const handleMealChange = (dateKey: string, value: string) => {
    setMeals((prev) => ({
      ...prev,
      [dateKey]: value,
    }));
  };

  const sendWeeklySchedule = () => {
    const weeklyMeals: WeeklyMeals[] = weekDays.map((day) => {
      const dateKey = day.date.toISOString().split("T")[0];

      return {
        date: dateKey,
        label: day.label,
        dayNumber: day.dayNumber,
        value: meals[dateKey] ?? "",
      };
    });

    console.log(weeklyMeals);
  };

  return (
    <div className="relative flex flex-col h-full gap-3 p-2">
      <p className="flex items-center gap-2 tracking-wide">
        <CalendarDotsIcon size={24} className="text-green-highlight" /> WEEKLY
        CAMPAIGN
      </p>

      <div className="absolute top-3 left-3 h-4 w-4 bg-green-800 blur-md" />

      {/* Daily card */}
      {weekDays.map((day) => {
        const dateKey = day.date.toISOString().split("T")[0];

        return (
          <DayCard
            key={dateKey}
            label={day.label}
            dayNumber={day.dayNumber}
            value={meals[dateKey] ?? ""}
            onChange={(value) => handleMealChange(dateKey, value)}
          />
        );
      })}

      <button
        onClick={sendWeeklySchedule}
        className="flex justify-center items-center gap-2 bg-green-highlight text-white rounded-md px-4 
                py-2 text-lg font-bold transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 
                disabled:cursor-not-allowed shadow-[var(--glow-lighter-green)] hover:cursor-pointer"
      >
        SUBMIT
      </button>
    </div>
  );
};

export default WeeklySchedule;
