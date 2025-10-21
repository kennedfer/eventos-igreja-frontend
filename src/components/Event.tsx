//ISSO AQUI ESTA DUPLICADO, MOVER PARA UM LOCAL UNICO
interface Event {
    location: string;
    title: string;
    startHour: string;
    endHour: string;
    date: string;
}

export const Event = ({ event }: { event: Event }) => {
    const day = new Date(event.date).getUTCDate();

    return <div className="flex gap-3 w-full bg-white p-3 rounded-lg shadow-xs border-1 border-border-light">
        <div className="inline-flex items-center">
            <button className=" p-3 text-xl bg-primary text-white rounded aspect-square h-13 leading-none">{day}</button>
        </div>
        <div className="flex flex-col">
            <h3 className="font-bold">{event.title}</h3>
            <small>{event.location}</small>
            <small className="text-slate-500">
                {event.startHour} - {event.endHour}
            </small></div>
    </div>
}