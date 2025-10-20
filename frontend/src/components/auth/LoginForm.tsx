import React, { useState } from "react";
// Assumindo que useAuth e useUI estão disponíveis no seu ambiente
// import { useAuth } from "../../context/AuthContext";
// import { useUI } from "../../context/UIContext";

// NOTA: O objeto 'colors' foi removido para usar as variáveis CSS globais

const LoginForm = () => {
  // Funções de Contexto simuladas para rodar o código fora do seu ambiente
  const login = (email: string, password: string) => {
    console.log("Tentativa de login");
    return true;
  };
  const closeModal = () => console.log("Fechando modal...");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estados para controle de hover dos botões
  const [isPrimaryHovered, setIsPrimaryHovered] = useState(false);
  const [isGoogleHovered, setIsGoogleHovered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      console.log("Login realizado com sucesso!");
      closeModal();
    } else {
      console.error("Email ou senha incorretos.");
    }
  };

  // --- Estilos Comuns e Dinâmicos ---

  const commonInputStyle: React.CSSProperties = {
    width: "100%",
    padding: "16px 15px",
    border: `1px solid var(--cor-primaria)`, // Usando variável CSS
    borderRadius: "25px",
    boxSizing: "border-box",
    fontSize: "16px",
    outline: "none",
    color: "#333",
    transition: "border-color 0.2s",
  };

  const primaryButtonStyle: React.CSSProperties = {
    width: "100%",
    padding: "16px 10px",
    background: "var(--cor-fundo)", // Usando variável CSS
    border: `1px solid var(--cor-primaria)`, // Usando variável CSS
    borderRadius: "25px",
    color: "var(--cor-primaria)", // Usando variável CSS
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "20px",
    transition: "background 0.2s, color 0.2s",
    userSelect: "none" as const,
  };

  const googleButtonStyle: React.CSSProperties = {
    ...primaryButtonStyle,
    background: isGoogleHovered
      ? "var(--cor-cinza-principal)"
      : "var(--cor-fundo)", // Usando variável CSS
    color: "#333",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `1px solid ${
      isGoogleHovered
        ? "var(--cor-cinza-secundario)"
        : "var(--cor-cinza-secundario)"
    }`, // Usando variável CSS
    marginBottom: "30px",
    fontWeight: "normal",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  // Estilo do botão de Login (o principal)
  const loginButtonStyle: React.CSSProperties = {
    ...primaryButtonStyle,
    background: isPrimaryHovered ? "var(--cor-hover)" : "var(--cor-primaria)", // Usando variável CSS
    color: "var(--cor-fundo)", // Usando variável CSS
    border: `1px solid ${
      isPrimaryHovered ? "var(--cor-hover)" : "var(--cor-primaria)"
    }`, // Usando variável CSS
  };

  return (
    <div
      style={{
        padding: "20px",
        position: "relative",
        maxWidth: "400px",
        margin: "auto",
        backgroundColor: "var(--cor-fundo)", // Usando variável CSS
      }}
    >
      {/* Título */}
      <h2
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "20px",
          lineHeight: "1.2",
        }}
      >
        Bem-vindo de volta a <br />
        rotas nordestinas
      </h2>

      {/* Botão de Login com Google - (com hover e o ícone simples) */}
      <button
        style={googleButtonStyle}
        onMouseEnter={() => setIsGoogleHovered(true)}
        onMouseLeave={() => setIsGoogleHovered(false)}
        onMouseDown={() => setIsGoogleHovered(true)}
        onMouseUp={() => setIsGoogleHovered(false)}
        onTouchStart={() => setIsGoogleHovered(true)}
        onTouchEnd={() => setIsGoogleHovered(false)}
      >
        <img
          src="..\src\assets\icons\google.svg"
          alt="Google Logo"
          style={{ width: "20px", height: "20px", marginRight: "10px" }}
        />
        Fazer login com o google
      </button>

      <form onSubmit={handleSubmit}>
        {/* Campo de Email */}
        <div style={{ marginBottom: "20px" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={commonInputStyle}
            required
          />
        </div>

        {/* Campo de Senha */}
        <div style={{ marginBottom: "20px", position: "relative" }}>
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={commonInputStyle}
            required
          />
        </div>

        {/* Botão de Login (com hover) */}
        <button
          type="submit"
          style={loginButtonStyle}
          onMouseEnter={() => setIsPrimaryHovered(true)}
          onMouseLeave={() => setIsPrimaryHovered(false)}
          onMouseDown={() => setIsPrimaryHovered(true)}
          onMouseUp={() => setIsPrimaryHovered(false)}
          onTouchStart={() => setIsPrimaryHovered(true)}
          onTouchEnd={() => setIsPrimaryHovered(false)}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
