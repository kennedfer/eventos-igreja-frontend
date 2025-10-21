import { CalendarIcon } from "./Icons";

export function EmptyState() {
    return <div className="flex flex-col items-center justify-center h-auto py-20 bg-white rounded-xl shadow-sm  text-center p-6">
        <div className="bg-primary/20 text-primary p-4 rounded-full mb-6">
            <CalendarIcon size={40}/>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Nenhum Evento Encontrado</h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-sm">Não encontramos nenhum evento neste mês ou dia, está na data correta?</p>
    </div>
}