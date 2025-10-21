import { Event } from "../components/Event"

//ISSO AQUI ESTA DUPLICADO, MOVER PARA UM LOCAL UNICO
interface Event{
    id: number;
    location: string;
    title: string;
    startHour: string;
    endHour: string;
    date: string;
}


export const EventsView = ({events}: {events: Event[]}) => {
    if(!events) return <span>paia dms sio</span>

    return <div className="flex flex-col gap-3">
        {
            events.map(event => <Event key={event.id} event={event}/>)
        }
    </div>
}

export const SkeletonEventsView = () => {
    const nViews = [1,2,3,4];

    return <div className="flex flex-col gap-3">
        {
            nViews.map(n => <div key={`skeleton-events-view-${n}`} className="h-20 w-full bg-gray-200 border-border-light rounded-md animate-pulse"></div>)
        }
    </div>
}