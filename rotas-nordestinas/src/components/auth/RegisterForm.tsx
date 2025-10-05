// src/components/auth/RegisterForm.tsx
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useUI } from "../../context/UIContext";

const RegisterForm = () => {
  const { register } = useAuth();
  const { closeModal, showLoginModal } = useUI();

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    const { confirmarSenha, ...registerData } = formData;

    const result = register(registerData);

    if (result.success) {
      alert(result.message);
      closeModal();
      showLoginModal();
    } else {
      alert(result.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crie sua conta</h2>
      {}
      <div style={{ margin: "10px 0" }}>
        <input
          name="nome"
          type="text"
          placeholder="Nome Completo"
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "8px" }}
        />
      </div>
      <div style={{ margin: "10px 0" }}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "8px" }}
        />
      </div>
      <div style={{ margin: "10px 0" }}>
        <input
          name="senha"
          type="password"
          placeholder="Senha"
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "8px" }}
        />
      </div>
      <div style={{ margin: "10px 0" }}>
        <input
          name="confirmarSenha"
          type="password"
          placeholder="Confirmar Senha"
          onChange={handleChange}
          required
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
        Criar conta
      </button>
    </form>
  );
};

export default RegisterForm;
