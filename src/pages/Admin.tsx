import { useNavigate } from "react-router";
import { EventsTable } from "../features/EventsTable";
import { PlusButton } from "../components/Button";
import type { ChurchEvent } from "../types/types";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import { useState } from "react";
import { Modal } from "../components/Modal";
import { Loader } from "../components/Loader";
import { ErrorState } from "../components/ErrorState";
import { useRetry } from "../hooks/useRetry";
import { API_URL } from "../utils/env";

export const Admin = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [targetId, setTargetId] = useState(0);

    const navigate = useNavigate();
    const { data: response, isLoading, error, mutate} = useSWR(`${API_URL}/api/v1/events`, fetcher);
    
    const {reloading, onRetry} = useRetry(mutate);

    function divideEventsByToday(events: ChurchEvent[]) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const upcomingEvents: typeof events = [];
        const pastEvents: typeof events = [];

        for (const event of events) {
            const eventDate = new Date(event.date);
            eventDate.setHours(0, 0, 0, 0);

            if (eventDate < today) pastEvents.push(event);
            else upcomingEvents.push(event);
        }

        return { upcomingEvents, pastEvents };
    }

    async function deleteEvent() {
        const url = `${API_URL}/api/v1/events/${targetId}`;
        const method = "DELETE";

        const response = await fetch(url, { method });
        const { success } = await response.json();

        if (success) {
            mutate();
            navigate("/eventos");
        }
    }

    function onDelete(id: number) {
        setIsOpen(true);
        setTargetId(id);
    }

    if (isLoading) return <Loader />;
    if(error) return <div className="grid items-center h-full w-full p-5"><ErrorState isLoading={reloading} onRetry={onRetry}/></div>

    const events = response?.data? response.data : [];
    const { upcomingEvents, pastEvents } = divideEventsByToday(events);

    return (
        <>
            <Modal
                isDestructive
                approveLabel="Apagar"
                onApprove={deleteEvent}
                isOpen={isOpen}
                onCancel={() => setIsOpen(false)}
                title="Apagar Evento"
            >
                Deseja apagar o evento?<br />
                <b>Essa ação não pode ser desfeita</b>
            </Modal>

            <div className="flex flex-col min-h-full w-full bg-background-light">
                <div className="flex flex-col grow w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-10 py-5">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Gestão de Eventos</h1>
                        <PlusButton
                            className="flex items-center gap-1 w-full sm:w-auto justify-center sm:justify-start"
                            onClick={() => navigate("/eventos/novo")}
                            color="primary"
                        >
                            Novo Evento
                        </PlusButton>
                    </div>

                    {/* Próximos Eventos */}
                    <section className="mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold mb-3 px-0">Próximos Eventos</h2>
                        <div className="overflow-x-auto px-0">
                            <div className="min-w-[600px] flex flex-col overflow-hidden rounded-lg border border-border-light">
                                <EventsTable
                                    isUpcoming
                                    onDelete={onDelete}
                                    onEdit={(id: number) => navigate(`/eventos/${id}/editar`)}
                                    events={upcomingEvents}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Eventos Passados */}
                    <section>
                        <h2 className="text-xl sm:text-2xl font-bold mb-3 px-0">Eventos Passados</h2>
                        <div className="overflow-x-auto px-0">
                            <div className="min-w-[600px] flex flex-col overflow-hidden rounded-lg border border-border-light">
                                <EventsTable events={pastEvents} />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};
