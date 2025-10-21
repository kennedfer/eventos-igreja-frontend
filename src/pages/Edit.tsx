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

export function Edit() {
    const navigate = useNavigate();
    const { eventId } = useParams();
    const [updateLoading, setUpdateLoading] = useState<boolean>(false);

    const { data: response, isLoading, error, mutate } = useSWR("http://localhost:8080/api/v1/events/" + eventId, fetcher)

    const { reloading, onRetry } = useRetry(mutate);

    async function handleSubmit(data: Partial<ChurchEvent>) {
        setUpdateLoading(true);

        try {
            let url = "http://localhost:8080/api/v1/events/" + eventId;
            let method = "PUT";

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
                credentials: "include"
            });

            if (response.status === 401) {
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
            } else {
                console.log(success)
            }
        } catch (error: any) {
            console.log(error)
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

    console.log(error, isLoading, response)

    return isLoading ? <Loader /> : (
        <div className="w-full h-auto items-center flex flex-col">
            <div className="p-5 w-full md:w-[600px] mb-10">
                <h1 className="mb-3 mt-6 text-3xl font-bold">Editar evento</h1>
                <EventForm isLoading={updateLoading} onCancel={() => navigate("/admin")} initial={response?.data} onSubmit={handleSubmit} />
            </div>
        </div>
    );
}
