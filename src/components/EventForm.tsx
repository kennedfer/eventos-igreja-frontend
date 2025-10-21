// components/EventForm.tsx
import { useForm } from "react-hook-form";
import type { ChurchEvent } from "../types/types";
import { Input } from "./Input";
import { Button } from "./Button";

type Props = {
  initial?: Partial<ChurchEvent>;
  onSubmit: (data: Partial<ChurchEvent>) => void;
  onCancel: Function;
  isLoading: boolean;
};

export function EventForm({ initial = {}, onSubmit, onCancel, isLoading }: Props) {
  const defaultValues: Partial<ChurchEvent> = {
    ...initial,
    date: initial.date ? new Date(initial.date as string).toISOString().split("T")[0] : "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<ChurchEvent>>({
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 max-w-xl"
    >
      {/* Date */}
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Data do evento:</span>
        <Input
          type="date"
          {...register("date", { required: "A data do evento é obrigatória" })}
        />
        {errors.date && (
          <span className="text-red-500 text-sm">{errors.date.message}</span>
        )}
      </label>

      {/* Title */}
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Titulo:</span>
        <Input
          {...register("title", { required: "O titulo do evento é obrigatório" })}
          placeholder="Ex: Terço dos Homens"
        />
        {errors.title && (
          <span className="text-red-500 text-sm">{errors.title.message}</span>
        )}
      </label>

      {/* Location */}
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Local:</span>
        <Input
          {...register("location", { required: "O local do evento é obrigatório" })}
          placeholder="Ex: Igreja Comunitária"
        />
        {errors.location && (
          <span className="text-red-500 text-sm">
            {errors.location.message}
          </span>
        )}
      </label>

      {/* Description */}
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Descrição:</span>
        <textarea
          className="appearance-none block w-full px-3 py-2 border border-border-light rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-background-light text-text-light"
          {...register("description")}
          placeholder="Ex: Iniciaremos com um pequeno momento de reflexão"
        />
      </label>

      <div className="flex gap-2">
        <label className="flex flex-col gap-1 grow">
          <span className="text-sm font-medium">Horário de inicio:</span>
          <Input
            type="time"
            {...register("startHour", { required: "A hora de inico do evento é obrigatória" })}
          />
          {errors.startHour && (
            <span className="text-red-500 text-sm">
              {errors.startHour.message}
            </span>
          )}
        </label>

        <label className="flex flex-col gap-1 grow">
          <span className="text-sm font-medium">Horário de termino:</span>
          <Input
            type="time"
            {...register("endHour", { required: "A hora de termino do evento é obrigatória" })}
          />
          {errors.endHour && (
            <span className="text-red-500 text-sm">{errors.endHour.message}</span>
          )}
        </label>
      </div>
      <Button
        isLoading =  {isLoading}
        className="mt-2"
        type="submit"
      >
        Salvar
      </Button>
      <Button onClick={() => onCancel()} color="secondary">Cancelar</Button>
    </form>
  );
}
