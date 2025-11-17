import React, { createContext, useState, useContext } from "react";
import type { User } from "../types";
import { USERS } from "../data/database";

type RegisterData = Omit<User, "id" | "role">;

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, senha: string) => boolean;
  logout: () => void;
  register: (data: RegisterData) => { success: boolean; message: string };
}

const AuthContext = createContext<AuthContextType>(null!);
export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

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

  const login = (email: string, senha: string): boolean => {
    const foundUser = USERS.find((u) => u.email === email && u.senha === senha);
    if (foundUser) {
      const { senha, ...userToSave } = foundUser;
      setUser(userToSave as User);
      return true;
    }
    return false;
  };

  const register = (
    data: RegisterData
  ): { success: boolean; message: string } => {
    // Verifica se o email já existe
    const userExists = USERS.find((u) => u.email === data.email);
    if (userExists) {
      return { success: false, message: "Este email já está em uso." };
    }

    // Cria um novo usuário
    const newUser: User = {
      ...data,
      id: USERS.length + 1, // Gera um ID simples
      role: "user", // Todo novo usuário começa como 'user'
    };

    // Adiciona o novo usuário à nossa "database" em memória
    USERS.push(newUser);
    console.log("Usuário registrado:", newUser);
    console.log("Banco de dados atualizado:", USERS);

    return { success: true, message: "Usuário cadastrado com sucesso!" };
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    isAuthenticated: !!user,
    user,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
