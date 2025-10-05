import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useUI } from "../../context/UIContext";

const LoginForm = () => {
  const { login } = useAuth();
  const { closeModal } = useUI();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      alert("Login realizado com sucesso!");
      closeModal();
    } else {
      alert("Email ou senha incorretos.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Bem-vindo de volta</h2>
      <div style={{ margin: "10px 0" }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        />
      </div>
      <div style={{ margin: "10px 0" }}>
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        />
      </div>
      <button
        type="submit"
        style={{
          width: "100%",
          padding: "10px",
          background: "orange",
          border: "none",
          color: "white",
        }}
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
