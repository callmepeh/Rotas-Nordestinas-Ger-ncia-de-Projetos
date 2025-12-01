// src/components/layout/Navbar.tsx

import { useState } from "react";
import {
  NavLink,
  Link as RouterLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { scroller } from "react-scroll";
import { useAuth } from "../../context/AuthContext";
import { useUI } from "../../context/UIContext";
import logo from "../../assets/logo.svg";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";
import Container from "./Container";

const Navbar = () => {
  const { isAuthenticated, user } = useAuth(); // <- Usamos 'isAuthenticated' e 'user' aqui
  const { showLoginModal, showRegisterModal, showCollaboratorModal } = useUI();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleNavAndScroll = (sectionId: string) => {
    setIsMenuOpen(false); // Fecha o menu mobile primeiro

    if (location.pathname === "/") {
      scroller.scrollTo(sectionId, {
        duration: 500,
        smooth: true,
        offset: -80,
      });
    } else {
      navigate("/", { state: { scrollTo: sectionId } });
    }
  };

  const renderUserActions = () => {
    // Cenário 1: Usuário está autenticado
    if (isAuthenticated) {
      // Se for um colaborador, mostra "Crie uma Rota" junto ao ícone
      if (user?.role === "colaborador") {
        return (
          <div className="nav-actions">
            <RouterLink to="/sugerir-rota" className="nav-link">
              Crie uma Rota
            </RouterLink>
            <RouterLink to="/perfil" className="nav-profile-icon">
              <FaUserCircle size={28} />
            </RouterLink>
          </div>
        );
      }
      // Se for um usuário comum logado, mostra "Seja um colaborador"
      else {
        return (
          <div className="nav-actions">
            <button
              onClick={() => {
                showCollaboratorModal();
                setIsMenuOpen(false);
              }}
              className="nav-link as-button"
            >
              Seja um colaborador
            </button>
            <RouterLink to="/perfil" className="nav-profile-icon">
              <FaUserCircle size={28} />
            </RouterLink>
          </div>
        );
      }
    }

    // Cenário 2: Usuário não está autenticado
    return (
      <div className="nav-actions">
        <button
          onClick={() => {
            showLoginModal();
            setIsMenuOpen(false);
          }}
          className="nav-button"
        >
          Login
        </button>
        <button
          onClick={() => {
            showRegisterModal();
            setIsMenuOpen(false);
          }}
          className="nav-button primary"
        >
          Cadastre-se
        </button>
      </div>
    );
  };

  const navMenuLinks = (
    <>
      <RouterLink
        to="/"
        className="nav-link"
        onClick={() => setIsMenuOpen(false)}
      >
        Home
      </RouterLink>
      <button
        onClick={() => handleNavAndScroll("sobre")}
        className="nav-link as-button"
      >
        Sobre
      </button>
      <button
        onClick={() => handleNavAndScroll("destinos")}
        className="nav-link as-button"
      >
        Destinos
      </button>

      <NavLink
        to="/favoritos"
        className="nav-link"
        onClick={() => setIsMenuOpen(false)}
      >
        Favoritos
      </NavLink>
      
      {isAuthenticated && user?.funcao === "colaborador" && (
        <NavLink
          to="/sugerir-rota"
          className="nav-link"
          onClick={() => setIsMenuOpen(false)}
        >
          Sugerir Rota
        </NavLink>
      )}
    </>
  );

  return (
    <nav className="navbar">
      <Container>
        <div className="navbar-content">
          <RouterLink to="/" className="navbar-logo">
            <img src={logo} alt="Rotas Nordestinas Logo" />
          </RouterLink>
          <div className="nav-links">{navMenuLinks}</div>
          <div className="desktop-actions">{renderUserActions()}</div>
          <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </Container>
      {isMenuOpen && (
        <div className="mobile-nav-menu">
          {navMenuLinks}
          <div className="mobile-actions">{renderUserActions()}</div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;