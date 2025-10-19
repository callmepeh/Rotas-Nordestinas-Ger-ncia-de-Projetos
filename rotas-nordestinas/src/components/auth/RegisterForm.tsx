import React, { useState } from "react";
// Assumindo que useAuth e useUI estão disponíveis no seu ambiente
// import { useAuth } from "../../context/AuthContext";
// import { useUI } from "../../context/UIContext";

// NOTA: O objeto 'colors' foi removido para usar as variáveis CSS globais

const RegisterForm = () => {
  // Funções de Contexto simuladas para rodar o código fora do seu ambiente
  const register = (data: any) => ({
    success: true,
    message: "Cadastro realizado com sucesso!",
  });
  const closeModal = () => console.log("Fechando modal...");
  const showLoginModal = () => console.log("Abrindo modal de Login...");

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    dataNascimento: "",
    estado: "",
    cidade: "",
    telefone: "",
  });

  // Estados para controle de hover dos botões
  const [isPrimaryHovered, setIsPrimaryHovered] = useState(false);
  const [isGoogleHovered, setIsGoogleHovered] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.senha !== formData.confirmarSenha) {
      console.error("As senhas não coincidem!");
      return;
    }

    const { confirmarSenha, ...registerData } = formData;
    const result = register(registerData);

    if (result.success) {
      console.log(result.message);
      closeModal();
      showLoginModal();
    } else {
      console.error(result.message);
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
    background: isPrimaryHovered ? "var(--cor-hover)" : "var(--cor-primaria)", // Usando variáveis CSS
    border: `1px solid ${
      isPrimaryHovered ? "var(--cor-hover)" : "var(--cor-primaria)"
    }`, // Usando variáveis CSS
    borderRadius: "25px",
    color: "var(--cor-fundo)", // Usando variável CSS
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "20px",
    transition: "background 0.2s, border-color 0.2s",
    userSelect: "none" as const,
  };

  const googleButtonStyle: React.CSSProperties = {
    ...primaryButtonStyle,
    background: isGoogleHovered
      ? "var(--cor-cinza-principal)"
      : "var(--cor-fundo)", // Usando variáveis CSS
    color: "#333",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `1px solid ${
      isGoogleHovered
        ? "var(--cor-cinza-secundario)"
        : "var(--cor-cinza-secundario)"
    }`, // Usando variáveis CSS
    marginBottom: "30px",
    fontWeight: "normal",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
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
      {/* Botão de Fechar (X) */}
      <button
        onClick={closeModal}
        style={{
          position: "absolute",
          top: "0px",
          right: "0px",
          background: "none",
          border: "none",
          fontSize: "24px",
          cursor: "pointer",
        }}
      ></button>

      {/* Título */}
      <h2
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "20px",
          lineHeight: "1.2",
        }}
      >
        Bem-vindo a <br />
        rotas nordestinas
      </h2>

      {/* Botão de Login com Google (com hover e o ícone simples) */}
      <button
        style={googleButtonStyle}
        onMouseEnter={() => setIsGoogleHovered(true)}
        onMouseLeave={() => setIsGoogleHovered(false)}
        // Simulação de clique: um pouco de feedback visual (opcional)
        onMouseDown={() => setIsGoogleHovered(true)}
        onMouseUp={() => setIsGoogleHovered(false)}
        onTouchStart={() => setIsGoogleHovered(true)}
        onTouchEnd={() => setIsGoogleHovered(false)}
      >
        {/* Ícone do Google usando o caminho local */}
        <img
          src="..\src\assets\icons\google.svg"
          style={{ width: "20px", height: "20px", marginRight: "10px" }}
        />
        Fazer login com o google
      </button>

      <form onSubmit={handleSubmit}>
        {/* Campo Nome */}
        <div style={{ marginBottom: "20px" }}>
          <input
            name="nome"
            type="text"
            placeholder="Nome"
            onChange={handleChange}
            style={commonInputStyle}
            required
          />
        </div>

        {/* Campo Email */}
        <div style={{ marginBottom: "20px" }}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            style={commonInputStyle}
            required
          />
        </div>

        {/* Campo Senha */}
        <div style={{ marginBottom: "20px", position: "relative" }}>
          <input
            name="senha"
            type="password" // Tipo fixo como password
            placeholder="Senha"
            onChange={handleChange}
            style={commonInputStyle}
            required
          />
        </div>

        {/* Campo Confirmar Senha */}
        <div style={{ marginBottom: "20px", position: "relative" }}>
          <input
            name="confirmarSenha"
            type="password" // Tipo fixo como password
            placeholder="Confirmar senha"
            onChange={handleChange}
            style={commonInputStyle}
            required
          />
        </div>

        {/* Botão Criar Conta (com hover) */}
        <button
          type="submit"
          style={primaryButtonStyle}
          onMouseEnter={() => setIsPrimaryHovered(true)}
          onMouseLeave={() => setIsPrimaryHovered(false)}
          // Simulação de clique
          onMouseDown={() => setIsPrimaryHovered(true)}
          onMouseUp={() => setIsPrimaryHovered(false)}
          onTouchStart={() => setIsPrimaryHovered(true)}
          onTouchEnd={() => setIsPrimaryHovered(false)}
        >
          Criar conta
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
