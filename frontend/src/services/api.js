import axios from "axios";

// Em produção/PWA instalado, defina VITE_API_URL (ex.: https://api.seudominio.com)
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3333";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("@Auth:token");

  if (token && token !== "null" && token !== "undefined") {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
