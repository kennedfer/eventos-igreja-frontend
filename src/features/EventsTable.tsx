import { Button } from "../components/Button";
import type { ChurchEvent } from "../types/types";

type EventsTableProps = {
  events: ChurchEvent[];
  isUpcoming?: boolean;
  onEdit?: Function
  onDelete?: Function
}
export const EventsTable = ({
  events,
  isUpcoming,
  onEdit,
  onDelete
}: EventsTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-[800px] w-full bg-white border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-3 text-center text-sm font-medium">Evento</th>
            <th className="px-4 py-3 text-center text-sm font-medium">Data</th>
            <th className="px-4 py-3 text-center text-sm font-medium">Horário</th>
            <th className="px-4 py-3 text-center text-sm font-medium">Local</th>
            {isUpcoming && <th className="px-4 py-3 text-center w-60 text-sm font-medium">Ações</th>}
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id} className="border-t border-t-[#e7dbcf]">
              <td className="px-4 py-2 min-w-[150px] truncate text-center text-sm">{event.title}</td>
              <td className="px-4 py-2 min-w-[120px] truncate text-center text-sm text-slate-500">{event.date}</td>
              <td className="px-4 py-2 min-w-[120px] truncate text-center text-sm text-slate-500">{event.startHour} - {event.endHour}</td>
              <td className="px-4 py-2 min-w-[150px] truncate text-center text-sm text-slate-500">{event.location}</td>
              {isUpcoming && (
                <td className="px-4 py-2 w-60 flex gap-2 justify-center">
                  {onEdit && <Button onClick={() => onEdit(event.id)} variant="ghost" className="p-0">Editar</Button>}
                  {onDelete && <Button onClick={() => onDelete(event.id)} variant="ghost" color="destructive" className="p-0">Deletar</Button>}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
