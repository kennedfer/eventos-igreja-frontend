import { Button } from "./Button";
import { WarningIcon } from "./Icons";

export function ErrorState({ onRetry, isLoading }: { onRetry: () => void; isLoading?: boolean }) {
    return (
      <div className="flex flex-col items-center justify-center h-auto py-20 bg-white rounded-xl shadow-sm text-center p-6">
        <div className="bg-primary/20 text-primary p-4 rounded-full mb-6">
          <WarningIcon size={50} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Erro no servidor</h2>
        <p className="mb-3 text-slate-500 dark:text-slate-400 max-w-sm">
          Não foi possível nos conectar ao servidor, tente novamente mais tarde
        </p>
        <Button isLoading={isLoading} onClick={onRetry}>
          Recarregar
        </Button>
      </div>
    );
  }
  