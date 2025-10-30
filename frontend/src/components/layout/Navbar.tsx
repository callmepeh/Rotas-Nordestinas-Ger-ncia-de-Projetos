import { useState } from "react";
import { NavLink, Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { useAuth } from "../../context/AuthContext";
import { useUI } from "../../context/UIContext";
import logo from "../../assets/logo.svg";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";
import Container from "./Container";

const Navbar = () => {
  const { isAuthenticated, user } = useAuth();
  const { showLoginModal, showRegisterModal, showCollaboratorModal } = useUI();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const renderUserActions = () => {
    if (!isAuthenticated) {
      //tira esse !
      if (user?.role !== "colaborador") {
        //aqui é igual
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
      // Se for um usuário comum, mostra o botão para se tornar colaborador
      if (!isAuthenticated) {
        return (
          <div className="nav-actions">
            {/* 2. Alterado de RouterLink para button para chamar a função do modal */}
            <button
              onClick={() => {
                showCollaboratorModal();
                setIsMenuOpen(false); // Fecha o menu mobile se estiver aberto
              }}
              className="nav-link as-button" // Mantém a classe de estilo do link
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
      <ScrollLink
        to="Home"
        smooth={true}
        duration={500}
        spy={true}
        offset={-80}
        className="nav-link"
        onClick={() => setIsMenuOpen(false)}
      >
        Home
      </ScrollLink>
      <ScrollLink
        to="destinos"
        smooth={true}
        duration={500}
        spy={true}
        offset={-80}
        className="nav-link"
        onClick={() => setIsMenuOpen(false)}
      >
        Destinos
      </ScrollLink>
      <ScrollLink
        to="sobre"
        smooth={true}
        duration={500}
        spy={true}
        offset={-80}
        className="nav-link"
        onClick={() => setIsMenuOpen(false)}
      >
        Sobre
      </ScrollLink>
      <NavLink
        to="/favoritos"
        className="nav-link"
        onClick={() => setIsMenuOpen(false)}
      >
        Favoritos
      </NavLink>
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
