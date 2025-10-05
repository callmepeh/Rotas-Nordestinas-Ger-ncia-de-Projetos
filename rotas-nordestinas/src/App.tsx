// src/App.tsx

import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DestinationDetailPage from "./pages/DestinationDetailPage"; // 1. IMPORTE A NOVA PÁGINA
import Modal from "./components/common/Modal";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import { useUI } from "./context/UIContext";

function App() {
  const { openModal } = useUI();

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {}
        <Route path="/destinos/:id" element={<DestinationDetailPage />} />
      </Routes>

      {openModal === "login" && (
        <Modal>
          <LoginForm />
        </Modal>
      )}

      {openModal === "register" && (
        <Modal>
          <RegisterForm />
        </Modal>
      )}
    </>
  );
}

export default App;
