import type React from "react";
import { CalendarPiece } from "./CalendarPiece";

interface CalendarProps {
  firstDayOfMonth: number;
  daysInMonth: number;
  daysOfNextMonth: number;
  today?: number;
  daysToBook: number[];
}

const CalendarHeader: React.FC = () => {
  const columns = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];

  return columns.map((column) => (
    <CalendarPiece
      key={column}
      className="text-xs text-gray-400 font-bold"
      content={column}
    />
  ));
};

export const Calendar: React.FC<CalendarProps> = ({
  firstDayOfMonth,
  daysInMonth,
  daysOfNextMonth,
  today,
  daysToBook
}) => {
  const blankArr = Array.from({ length: firstDayOfMonth }, (_, i) => i + 1);
  const monthDaysArr = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const daysOfNextMonthArr = Array.from(
    { length: daysOfNextMonth },
    (_, i) => i + 1
  );

  return (
    <div className="mx-auto h-auto aspect-square grid grid-rows-6 grid-cols-7">
      <CalendarHeader />
      {blankArr.map((_, index) => (
        <CalendarPiece key={"start-" + index} isMuted content={""} />
      ))}
      {monthDaysArr.map((day, index) => (
        <CalendarPiece
          isToday={today === day}
          isMarked={daysToBook.includes(day)}
          content={day}
          key={`middle-piece-${day}-${index}`}
        />
      ))}
      {daysOfNextMonthArr.map((_, index) => (
        <CalendarPiece key={`end-${index + blankArr.length}`} isMuted content={""} />
      ))}
    </div>
  );
};
