import { useForm } from "react-hook-form";
import { Input, PasswordInput } from "../components/Input"
import type { LoginFields } from "../types/types";
import { Button } from "../components/Button";

type LoginFormProps = {
    onSubmit: Function,
    isLoading: boolean;
}

export const LoginForm = ({ onSubmit, isLoading }: LoginFormProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFields>();

    return (<div className="w-full mx-auto md:w-[350px] bg-white rounded-md shadow-lg border border-border-light overflow-hidden">
        <h2 className="text-xl font-semibold p-3 border-border-light border-b-1 w-full text-center bg-background-light" >Painel de Administrador</h2>
        <form onSubmit={handleSubmit((loginData: LoginFields) => onSubmit(loginData))} className="flex flex-col gap-2 p-3">
            <div>
                <label htmlFor="username">Usuário:</label>
                <Input {...register("username", {
                    required: "O usuário não pode ser vazio"
                })} id="username" placeholder="Ex.: AdministrativoIgreja" />
                {errors.username?.message && (
                    <small className="text-red-400">{errors.username.message}</small>
                )}
            </div>
            <div>
                <label htmlFor="password">Senha:</label>
                <PasswordInput {...register("password", {
                    required: "A senha não pode ser vazia"
                })} id="password" type="password" placeholder="Ex.: 123456" />
                {errors.password?.message && (
                    <small className="text-red-400">{errors.password.message}</small>
                )}
            </div>
            <Button isLoading={isLoading} type="submit" className="mt-2" variant="solid">Entrar</Button>
        </form>


    </div>)
}