import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storagedUser = localStorage.getItem("@Auth:user");
    const storagedToken = localStorage.getItem("@Auth:token");

    if (
      storagedUser &&
      storagedToken &&
      storagedUser !== "undefined" &&
      storagedToken !== "undefined" &&
      storagedToken !== "null"
    ) {
      return JSON.parse(storagedUser);
    }

    return null;
  });

  useEffect(() => {
    const storagedToken = localStorage.getItem("@Auth:token");

    if (
      storagedToken &&
      storagedToken !== "undefined" &&
      storagedToken !== "null"
    ) {
      api.defaults.headers.common["Authorization"] = `Bearer ${storagedToken}`;
    }
  }, []);

  const SignIn = async (email, password) => {
    try {
      const response = await api.post("/api/users/login", { email, password });

      const { user, token } = response.data;

      if (!token || token === "null" || token === "undefined") {
        console.log("TOKEN INVÁLIDO NO LOGIN:", response.data);
        return false;
      }

      setUser(user);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      localStorage.setItem("@Auth:user", JSON.stringify(user));
      localStorage.setItem("@Auth:token", token);

      return true;
    } catch (err) {
      console.log("ERRO AO FAZER LOGIN:", err.response?.data || err.message);
      alert("Erro ao fazer login");
      return false;
    }
  };

  const Logout = () => {
    localStorage.removeItem("@Auth:user");
    localStorage.removeItem("@Auth:token");
    setUser(null);
    delete api.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        Signed: !!user,
        SignIn,
        Logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};