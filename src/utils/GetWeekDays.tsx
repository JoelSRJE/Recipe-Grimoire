import getStartOfWeek from "./GetStartOfWeek";

const getWeekDays = (date: Date) => {
  const startOfWeek = getStartOfWeek(date);

  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);

    return {
      label: day
        .toLocaleDateString("en-GB", { weekday: "short" })
        .toUpperCase(),
      dayNumber: day.getDate(),
      date: day,
    };
  });
};

export default getWeekDays;
