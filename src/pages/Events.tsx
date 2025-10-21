import { useNavigate } from "react-router";
import { PlusButton } from "../components/Button";
import { EmptyState } from "../components/EmptyState";
import { useEvents } from "../contexts/EventsContext";
import { EventsCalendar } from "../features/EventsCalendar";
import { EventsView, SkeletonEventsView } from "../features/EventsView";
import { ErrorState } from "../components/ErrorState";
import { useRetry } from "../hooks/useRetry";

export function Events() {
    const { events, isLoading, error, mutate } = useEvents();
    const {reloading, onRetry} = useRetry(mutate);

    const navigate = useNavigate();

    return (<div className='w-full min-h-full bg-background-light text-slate-700'>
        <div className='md:w-[1100px] p-5 gap-10 mx-auto md:grid md:grid-cols-7 md:gap-6 gap-3 flex flex-col md:p-10 max-w-full'>
            <EventsCalendar events={events} />
            <div className='col-span-5'>
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className='font-bold text-3xl'>Olá,</h2>
                        <h2 className='text-xl'>Como você está?</h2>
                        <h2 className='my-2 text-lg'>Neste mês teremos os seguintes eventos:</h2>
                    </div>
                    <PlusButton className="flex items-center gap-1" onClick={() => navigate("/eventos/novo")} color="primary">
                        Novo
                    </PlusButton>
                </div>
                {error ? (
                    <ErrorState onRetry={onRetry} isLoading={reloading}/>
                ) : isLoading ? (
                    <SkeletonEventsView />
                ) : !events?.length ? (
                    <EmptyState />
                ) : (
                    <EventsView events={events} />
                )}
            </div>
        </div>
    </div>
    )
}