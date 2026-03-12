import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Carrega usuário do localStorage ao iniciar
    useEffect(() => {
        const storagedUser = localStorage.getItem("@Auth:user");
        const storagedToken = localStorage.getItem("@Auth:token");

        if (storagedUser && storagedToken && storagedUser !== "undefined") {
            setUser(JSON.parse(storagedUser));
            api.defaults.headers.common["Authorization"] = `Bearer ${storagedToken}`;
        }
    }, []);

    const SignIn = async (email, password) => {
        try {
            const response = await api.post("/api/users/login", { email, password });

            const { user, token } = response.data;

            setUser(user);
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            localStorage.setItem("@Auth:user", JSON.stringify(user));
            localStorage.setItem("@Auth:token", token);

            return true; // ✅ Retorna sucesso
        } catch (err) {
            alert("Erro ao fazer login");
            return false; // ❌ Retorna falha
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                Signed: !!user,
                SignIn,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};