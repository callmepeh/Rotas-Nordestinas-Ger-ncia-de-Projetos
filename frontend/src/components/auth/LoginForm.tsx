import React, { useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useUI } from "../../context/UIContext";

const LoginForm = () => {
  const { login: loginContext } = useAuth();
  const { closeModal } = useUI();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isPrimaryHovered, setIsPrimaryHovered] = useState(false);
  const [isGoogleHovered, setIsGoogleHovered] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const response = await api.post("/auth/login", {
        email,
        senha: password,
      });

      console.log("Login bem-sucedido:", response.data);

      const { token, user } = response.data;

      // salvar token
      localStorage.setItem("token", token);

      // atualizar contexto global
      loginContext(user);

      closeModal();
    } catch (error: any) {
      const msg =
        error.response?.data?.error || "Erro ao fazer login. Tente novamente.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  // --- Estilos (EXATAMENTE IGUAIS AOS SEUS) ---

  const commonInputStyle: React.CSSProperties = {
    width: "100%",
    padding: "16px 15px",
    border: `1px solid var(--cor-primaria)`,
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
    background: "var(--cor-fundo)",
    border: `1px solid var(--cor-primaria)`,
    borderRadius: "25px",
    color: "var(--cor-primaria)",
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
      : "var(--cor-fundo)",
    color: "#333",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `1px solid var(--cor-cinza-secundario)`,
    marginBottom: "30px",
    fontWeight: "normal",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  const loginButtonStyle: React.CSSProperties = {
    ...primaryButtonStyle,
    background: isPrimaryHovered ? "var(--cor-hover)" : "var(--cor-primaria)",
    color: "var(--cor-fundo)",
    border: `1px solid ${
      isPrimaryHovered ? "var(--cor-hover)" : "var(--cor-primaria)"
    }`,
    opacity: loading ? 0.7 : 1,
  };

  return (
    <div
      style={{
        padding: "20px",
        position: "relative",
        maxWidth: "400px",
        margin: "auto",
        backgroundColor: "var(--cor-fundo)",
      }}
    >
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

      {errorMsg && (
        <p style={{ color: "red", textAlign: "center", marginBottom: "15px" }}>
          {errorMsg}
        </p>
      )}

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
          src="../src/assets/icons/google.svg"
          alt="Google Logo"
          style={{ width: "20px", height: "20px", marginRight: "10px" }}
        />
        Fazer login com o google
      </button>

      <form onSubmit={handleSubmit}>
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

        <button
          type="submit"
          style={loginButtonStyle}
          disabled={loading}
          onMouseEnter={() => setIsPrimaryHovered(true)}
          onMouseLeave={() => setIsPrimaryHovered(false)}
          onMouseDown={() => setIsPrimaryHovered(true)}
          onMouseUp={() => setIsPrimaryHovered(false)}
          onTouchStart={() => setIsPrimaryHovered(true)}
          onTouchEnd={() => setIsPrimaryHovered(false)}
        >
          {loading ? "Entrando..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
