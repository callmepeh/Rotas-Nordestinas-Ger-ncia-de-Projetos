import React, { createContext, useState, useContext } from "react";

// 1. Adicionamos "collaborator" aos tipos de modais possíveis
type ModalType = "login" | "register" | "collaborator" | null;

interface UIContextType {
  openModal: ModalType;
  showLoginModal: () => void;
  showRegisterModal: () => void;
  showCollaboratorModal: () => void;
  closeModal: () => void;
}

const UIContext = createContext<UIContextType>(null!);

export const useUI = () => {
  return useContext(UIContext);
};

interface UIProviderProps {
  children: React.ReactNode;
}

export const UIProvider: React.FC<UIProviderProps> = ({ children }) => {
  const [openModal, setOpenModal] = useState<ModalType>(null);

  const showLoginModal = () => setOpenModal("login");
  const showRegisterModal = () => setOpenModal("register");
  // 2. Criamos a função para abrir o modal de colaborador
  const showCollaboratorModal = () => setOpenModal("collaborator");
  const closeModal = () => setOpenModal(null);

  const value = {
    openModal,
    showLoginModal,
    showRegisterModal,
    showCollaboratorModal,
    closeModal,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};
