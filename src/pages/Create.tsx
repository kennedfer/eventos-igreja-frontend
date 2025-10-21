import { useNavigate } from "react-router";
import type { ChurchEvent } from "../types/types";
import { EventForm } from "../components/EventForm";
import toast from "react-hot-toast";
import { useState } from "react";
import { useEvents } from "../contexts/EventsContext";

export function Create() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {mutate} = useEvents();

    async function handleSubmit(data: Partial<ChurchEvent>) {
        setIsLoading(true);
        try {
            const response = await fetch("http://localhost:8080/api/v1/events", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
                credentials:"include"
            });

            if (response.status === 401) {
                toast.error("Você deve estar logado para criar um novo evento");
                return navigate("/entrar");
            }
    
            const { success} = await response.json();
    
            if (success) {
                await mutate();
                toast.success("Evento criado com sucesso");
                navigate("/eventos");
            }else{
                toast.error("Erro ao criar evento");
            }
    
        } catch (err: any) {
            toast.error(err.message.includes('Failed to fetch')
                ? 'Erro de conexão com o servidor, tente novamente mais tarde'
                : 'Ocorreu um erro inesperado');
        } finally {
            setIsLoading(false);
        }
    }
    

    return (
        <div className="w-full h-auto items-center flex flex-col">
            <div className="p-5 w-full md:w-[600px] mb-10">
                <h1 className="mb-3 mt-6 text-3xl font-bold">Criar novo evento</h1>
                <EventForm isLoading={isLoading} onCancel={() => navigate(-1)} onSubmit={handleSubmit} />
            </div>
        </div>
    );
}
