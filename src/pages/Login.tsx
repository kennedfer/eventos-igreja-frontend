import { useLocation, useNavigate } from "react-router";
import { LoginForm } from "../features/LoginForm";
import type { LoginFields } from "../types/types";
import { fetchData } from "../utils/fetcher";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import { useState } from "react";
import { API_URL } from "../utils/env";

export function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    async function doLogin(loginData: LoginFields) {
        try {
            setIsLoading(true);
            const response = await fetchData(`${API_URL}/api/v1/login`, {
                method: "POST",
                body: JSON.stringify(loginData),
                headers: {
                    "Content-Type": "application/json"
                },
                "credentials":"include"
            });

            if (response.success) {
                login(response.data.token, 0)
                const from = location.state?.from || '/';
                navigate(from, { replace: true });

                toast.success("Entrou com sucesso")
            }
        } catch (error: any) {
            if (error.message.includes('Failed to fetch')) {
                toast.error('Erro de conexão com o servidor, tente novamente mais tarde');
            } else {
                toast.error('Senha ou usuário inválido');
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="p-5 w-screen h-full flex items-center bg-background-light text-text-light">
            <LoginForm isLoading={isLoading} onSubmit={doLogin} />
        </div>
    )
}