// src/App.tsx

import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DestinationDetailPage from "./pages/DestinationDetailPage";
import Modal from "./components/common/Modal";
import SugerirRotaPage from "./pages/SugerirRotaPage";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
// 1. IMPORTE O SEU FORMULÁRIO DE COLABORADOR
import CollaboratorForm from "./components/auth/CollaboratorForm"; // <<< ADICIONE ESTA LINHA (ajuste o caminho se necessário)
import { useUI } from "./context/UIContext";
import Perfil from "./pages/PerfilPage";

function App() {
  const { openModal } = useUI();

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/destinos/:id" element={<DestinationDetailPage />} />
        <Route path="/sugerir-rota" element={<SugerirRotaPage />} />
        <Route path="/perfil" element={<Perfil />} />
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

      {openModal === "collaborator" && (
        <Modal>
          <CollaboratorForm />
        </Modal>
      )}
    </>
  );
}

export default App;
