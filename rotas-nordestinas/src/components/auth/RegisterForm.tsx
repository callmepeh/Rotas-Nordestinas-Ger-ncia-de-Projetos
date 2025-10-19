import React, { useState } from "react";
// Assumindo que useAuth e useUI estão disponíveis no seu ambiente
// import { useAuth } from "../../context/AuthContext";
// import { useUI } from "../../context/UIContext";

// Definição das cores personalizadas
const colors = {
  primary: "#eb662b",
  secondary: "#ef9f4e",
  hover: "#d84606",
  grayPrimary: "#e9e9e9",
  graySecondary: "#adadad",
  background: "#ffffff",
  success: "#28a745",
  error: "#dc3545",
};

// Componente simulado para ícone de olho (removido, mas mantendo a estrutura
// para evitar erros caso estivesse sendo usado em outro lugar)

const RegisterForm = () => {
  // const { register } = useAuth(); // Descomente quando usar em seu projeto
  // const { closeModal, showLoginModal } = useUI(); // Descomente quando usar em seu projeto

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

  // Removendo estados de visibilidade da senha conforme solicitado
  // const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      // Substituído alert() por console.error() para evitar erros em iframes
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
    border: `1px solid ${colors.primary}`, // Usando cor primária
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
    background: isPrimaryHovered ? colors.hover : colors.primary, // Cor dinâmica
    border: `1px solid ${isPrimaryHovered ? colors.hover : colors.primary}`,
    borderRadius: "25px",
    color: colors.background,
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "20px",
    transition: "background 0.2s, border-color 0.2s",
    userSelect: "none" as const, // Para simular clique
  };

  const googleButtonStyle: React.CSSProperties = {
    ...primaryButtonStyle,
    background: isGoogleHovered ? colors.grayPrimary : colors.background, // Fundo cinza claro no hover
    color: "#333",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `1px solid ${
      isGoogleHovered ? colors.graySecondary : colors.graySecondary
    }`, // Borda cinza
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
        backgroundColor: colors.background,
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
        <img
          src="..\src\assets\icons\google.svg"
          alt="Google Logo"
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

        {/* Campo Senha (EyeIcon e toggle removidos) */}
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

        {/* Campo Confirmar Senha (EyeIcon e toggle removidos) */}
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
