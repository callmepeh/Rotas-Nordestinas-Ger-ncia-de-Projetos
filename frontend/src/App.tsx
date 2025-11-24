// src/App.tsx

import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DestinationDetailPage from "./pages/DestinationDetailPage";
import Modal from "./components/common/Modal";
import SugerirRotaPage from "./pages/SugerirRotaPage";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";

import CollaboratorForm from "./components/auth/CollaboratorForm";
import { useUI } from "./context/UIContext";
import Perfil from "./pages/PerfilPage";

import Favourites from "./pages/Favourites"; 

function App() {
  const { openModal } = useUI();

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/destinos/:id" element={<DestinationDetailPage />} />
        <Route path="/sugerir-rota" element={<SugerirRotaPage />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/favoritos" element={<Favourites />} /> {/* versão PT-BR */}
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
