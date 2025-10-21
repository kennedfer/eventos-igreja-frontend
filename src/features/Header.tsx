import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/Button";
import { useAuth } from "../contexts/AuthContext";

export const Header = () => {
    const { token, logout } = useAuth();
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);

    function handleAdminPanel() {
        if (!token) return document.startViewTransition(() => navigate("/entrar", { viewTransition: true }));
        navigate("/admin", { viewTransition: true });
    }

    function handleLogout() {
        navigate("/eventos", { viewTransition: true });
        logout();
    }

    return (
        <header className="border-b border-border-light px-4 py-3 md:px-10 flex items-center justify-between relative">
            <h1 className="text-lg font-semibold cursor-pointer" onClick={() => navigate("/")}>
                Calendário de Eventos da Igreja
            </h1>

            {/* Desktop Menu */}
            <nav className="hidden md:flex gap-2">
                <Button onClick={() => navigate("/eventos")} variant="ghost" color="secondary">
                    Eventos
                </Button>
                {token && <Button onClick={handleAdminPanel} variant="ghost" color="primary">Painel de Administrador</Button>}
                {token ? (
                    <Button onClick={handleLogout} variant="ghost" color="destructive">Sair</Button>
                ) : (
                    <Button onClick={() => navigate("/entrar")} variant="ghost" color="primary">Entrar</Button>
                )}
            </nav>

            {/* Mobile Hamburger */}
            <button
                className="md:hidden text-xl font-bold"
                onClick={() => setMobileOpen(!mobileOpen)}
            >
                {mobileOpen ? "✕" : "☰"}
            </button>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="absolute top-full left-0 w-full bg-white border-t border-border-light flex flex-col gap-2 p-4 md:hidden z-50 shadow-lg">
                    <Button onClick={() => { navigate("/eventos"); setMobileOpen(false); }} variant="ghost" color="secondary">
                        Eventos
                    </Button>
                    {token && (
                        <Button onClick={() => { handleAdminPanel(); setMobileOpen(false); }} variant="ghost" color="primary">
                            Painel de Administrador
                        </Button>
                    )}
                    {token ? (
                        <Button onClick={() => { handleLogout(); setMobileOpen(false); }} variant="ghost" color="destructive">
                            Sair
                        </Button>
                    ) : (
                        <Button onClick={() => { navigate("/entrar"); setMobileOpen(false); }} variant="ghost" color="primary">
                            Entrar
                        </Button>
                    )}
                </div>
            )}
        </header>
    );
};
