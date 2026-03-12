import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

   
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

            return true; 
        } catch (err) {
            alert("Erro ao fazer login");
            return false; 
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