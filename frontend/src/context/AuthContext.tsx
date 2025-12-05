import React, { createContext, useState, useContext } from "react";
import { api } from "../services/api"; // ← usa seu axios apontando para o backend

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  token: string | null;
  register: (data: any) => Promise<{ success: boolean; message: string }>;
  login: (email: string, senha: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);

  // ---------- CADASTRO ----------
  const register = async (data: any) => {
    try {
      const response = await api.post("/auth/register", data);
      return { success: true, message: response.data.message };
    } catch (err: any) {
      return {
        success: false,
        message: err.response?.data?.error || "Erro ao cadastrar"
      };
    }
  };

  // ---------- LOGIN ----------
  const login = async (email: string, senha: string) => {
    try {
      const response = await api.post("/auth/login", { email, senha });

      setToken(response.data.token);
      setUser(response.data.user);

      // salva no localStorage (permite manter login ao recarregar página)
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      return true;
    } catch (err) {
      return false;
    }
  };

  // ---------- LOGOUT ----------
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const value = {
    isAuthenticated: !!user,
    user,
    token,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
