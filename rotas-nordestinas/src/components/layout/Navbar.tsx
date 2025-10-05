// src/components/layout/Navbar.tsx
import { useUI } from "../../context/UIContext";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  // Agora pegamos as duas funções do UIContext
  const { showLoginModal, showRegisterModal } = useUI();
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
        background: "#f8f8f8",
        alignItems: "center",
      }}
    >
      <h1>Rotas Nordestinas</h1>
      <nav>
        {isAuthenticated ? (
          <div>
            <span>Olá, {user?.nome}!</span>
            <button onClick={logout} style={{ marginLeft: "10px" }}>
              Sair
            </button>
          </div>
        ) : (
          // Botões separados para Login e Cadastro
          <div>
            <button onClick={showLoginModal} style={{ marginRight: "10px" }}>
              Login
            </button>
            <button
              onClick={showRegisterModal}
              style={{
                background: "orange",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: "4px",
              }}
            >
              Cadastre-se
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
