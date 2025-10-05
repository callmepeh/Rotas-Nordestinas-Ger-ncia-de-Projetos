import React, { createContext, useState, useContext } from "react";

type ModalType = "login" | "register" | null;

interface UIContextType {
  openModal: ModalType;
  showLoginModal: () => void;
  showRegisterModal: () => void;
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
  const closeModal = () => setOpenModal(null);

  const value = {
    openModal,
    showLoginModal,
    showRegisterModal,
    closeModal,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};
