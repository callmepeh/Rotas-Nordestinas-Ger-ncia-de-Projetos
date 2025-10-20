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

export const useAuth = () => {
  return useContext(AuthContext);
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

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
