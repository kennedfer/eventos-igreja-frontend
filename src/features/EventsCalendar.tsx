import { type HtmlHTMLAttributes } from "react";
import { Calendar } from "../components/Calendar";
import { useEvents } from "../contexts/EventsContext";
import { Button } from "../components/Button";

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

//42 é o numero de peças do Calendário = 7 * 6
const CALENDAR_PIECES_COUNT = 42;

interface CalendarEvent {
  date: string;
}

interface EventsCalendarProps extends HtmlHTMLAttributes<HTMLDivElement> {
  events: CalendarEvent[]
}

export const EventsCalendar = ({ events }: EventsCalendarProps) => {
  const { currentDate, nextMonth, previousMonth, today } = useEvents();

  const daysInMonth = new Date(currentDate.year, currentDate.month, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.year, currentDate.month - 1, 1).getDay();

  const daysOfNextMonth = CALENDAR_PIECES_COUNT - daysInMonth - firstDayOfMonth;

  let eventsDays: number[] = [];

  if (events) {
    eventsDays = events.map(event => new Date(event.date).getUTCDate());
  }


  return (
    <div className="col-span-2 w-full bg-white aspect-square p-5 rounded-xl border border-border-light shadow-sm">
      <div className="w-full flex justify-between text-nowrap gap-2">
        <Button variant="ghost" color="secondary" onClick={previousMonth}>
          <svg
            fill="currentColor"
            height="20"
            viewBox="0 0 256 256"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
          </svg>
        </Button>
        <button className="font-sm font-bold">
          {months[currentDate.month - 1]} {currentDate.year}
        </button>
        <Button variant="ghost" color="secondary" onClick={nextMonth}>
          <svg
            fill="currentColor"
            height="20"
            viewBox="0 0 256 256"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
          </svg>
        </Button>
      </div>
      <Calendar
        daysToBook={eventsDays}
        firstDayOfMonth={firstDayOfMonth}
        daysInMonth={daysInMonth}
        daysOfNextMonth={daysOfNextMonth}
        today={currentDate.month == today.getMonth() + 1 ? today.getDate() : 0}
      />
    </div>
  );
};
