import { createContext, useContext, useState, type ReactNode } from "react";

type AuthContextType = {
     user: number | null; 
     token: string | null; 
     login: (token:string, user:number)=>void; 
     logout:()=>void
};

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = (newToken: string, newUser: number) => {
    setToken(newToken);
    setUser(newUser);
    // localStorage.setItem("token", newToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    // localStorage.removeItem("token");
  };

  return <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>;
};

export function useAuth(){
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}