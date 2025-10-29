import { useNavigate, useParams } from "react-router";
import type { ChurchEvent } from "../types/types";
import { EventForm } from "../components/EventForm";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import { Loader } from "../components/Loader";
import { useEffect, useState } from "react";
import { ErrorState } from "../components/ErrorState";
import { useRetry } from "../hooks/useRetry";
import toast from "react-hot-toast";
import { API_URL } from "../utils/env";
import { useEvents } from "../contexts/EventsContext";

export function Edit() {
    const navigate = useNavigate();
    const { eventId } = useParams();
    const [updateLoading, setUpdateLoading] = useState<boolean>(false);

    const eventApiUrl = `${API_URL}/api/v1/events/${eventId}`;

    const { data: response, isLoading, error } = useSWR(eventApiUrl, fetcher)
    const {mutate} = useEvents();

    const { reloading, onRetry } = useRetry(mutate);

    async function handleSubmit(data: Partial<ChurchEvent>) {
        setUpdateLoading(true);

        try {
            let url = eventApiUrl;
            let method = "PUT";

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
                credentials: "include"
            });

            if (response.status === 401) {
                console.log(response)
                toast.error("Você deve estar logado para editar um evento");
                return navigate("/entrar");
            }

            if (response.status === 403) {
                toast.error("O evento não foi encontrado ou não pôde ser editado");
                return navigate("/entrar");
            }

            const { success } = (await response.json())
            if (success) {
                await mutate()
                navigate("/eventos");
            }
        } catch (error: any) {
            console.error(error)
        } finally {
            setUpdateLoading(false)
        }
    }

    useEffect(() => {
        if (error) {
            toast.error("O evento não foi encontrado ou não pôde ser editado");
            navigate("/eventos");
            return;
        }
    
        if (response?.data?.date && new Date(response.data.date).getTime() < Date.now()) {
            navigate("/eventos");
        }
    
        if (response?.data) {
            toast.success("Dados carregados com sucesso");
        }
    }, [response, error, navigate]);
    

    if (error) return <div className="grid items-center h-full w-full p-5"><ErrorState isLoading={reloading} onRetry={onRetry} /></div>

    return isLoading ? <Loader /> : (
        <div className="w-full h-auto items-center flex flex-col">
            <div className="p-5 w-full md:w-[600px] mb-10">
                <h1 className="mb-3 mt-6 text-3xl font-bold">Editar evento</h1>
                <EventForm isLoading={updateLoading} onCancel={() => navigate("/admin")} initial={response?.data} onSubmit={handleSubmit} />
            </div>
        </div>
    );
}
