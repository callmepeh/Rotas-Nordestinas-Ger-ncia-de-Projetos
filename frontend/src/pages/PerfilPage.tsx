import React, { useEffect, useState } from "react";
import NavBar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useAuth } from "../context/AuthContext";
import "./PerfilPage.css";

const PerfilPage = () => {
  const { user } = useAuth();

  // Campos do usuário
  const [nome, setNome] = useState(user?.nomeCompleto || "");
  const [telefone, setTelefone] = useState(user?.telefone || "");
  const [dataNasc, setDataNasc] = useState(user?.dataNascimento || "");
  const [estado, setEstado] = useState(user?.siglaEstado || "");
  const [cidade, setCidade] = useState(user?.nomeCidade || "");

  // Estados e cidades da API IBGE
  const [estados, setEstados] = useState<{ sigla: string; nome: string }[]>([]);
  const [cidades, setCidades] = useState<string[]>([]);

  // 🔄 Carregar ESTADOS ao abrir a página
  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const res = await fetch(
          "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
        );
        const data = await res.json();
        setEstados(data);
      } catch (error) {
        console.error("Erro ao carregar estados:", error);
      }
    };

    fetchEstados();
  }, []);

  // 🔄 Carregar CIDADES quando o ESTADO mudar
  useEffect(() => {
    if (!estado) return;

    const fetchCidades = async () => {
      try {
        const res = await fetch(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`
        );
        const data = await res.json();
        setCidades(data.map((city: any) => city.nome));
      } catch (error) {
        console.error("Erro ao carregar cidades:", error);
      }
    };

    fetchCidades();
  }, [estado]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("Usuário não autenticado.");
      return;
    }

    function formatDateToISO(date: string) {
      const [dia, mes, ano] = date.split("/");
      return `${ano}-${mes}-${dia}`;
    }

    try {
      const response = await fetch(`http://localhost:5000/auth/update/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          action: "update_profile",
          nomeCompleto: nome,
          telefone,
          dataNascimento: formatDateToISO(dataNasc),
          siglaEstado: estado,
          nomeCidade: cidade,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Perfil atualizado com sucesso!");
      } else {
        alert(result.error || "Erro ao atualizar perfil.");
      }
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      alert("Erro desconhecido no servidor.");
    }
  };


  return (
    <div className="perfil-page-wrapper">
      <NavBar />
      <h2 className="perfil-title">Perfil</h2>

      <form className="perfil-form" onSubmit={handleSubmit}>

        {/* --- Dados pessoais --- */}
        <section className="form-section">
          <h3>Informações pessoais</h3>

          <div className="form-row">
            <div className="form-group">
              <label>Nome</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Telefone</label>
              <input
                type="tel"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Data de nascimento</label>
              <input
                type="text"
                value={dataNasc}
                onChange={(e) => setDataNasc(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* --- Localização --- */}
        <section className="form-section">
          <h3>Informações de localização</h3>

          <div className="form-row">
            {/* ESTADOS */}
            <div className="form-group">
              <label>Estado</label>
              <select
                value={estado}
                onChange={(e) => {
                  setEstado(e.target.value);
                  setCidade(""); // limpa cidade ao trocar o estado
                }}
              >
                <option value="">Selecione o Estado</option>
                {estados.map((uf) => (
                  <option key={uf.sigla} value={uf.sigla}>
                    {uf.nome} ({uf.sigla})
                  </option>
                ))}
              </select>
            </div>

            {/* CIDADES */}
            <div className="form-group">
              <label>Cidade</label>
              <select
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                disabled={!estado}
              >
                <option value="">
                  {estado ? "Selecione a cidade" : "Escolha um estado"}
                </option>
                {cidades.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <div className="form-actions">
          <button type="submit" className="save-button">
            Salvar
          </button>
        </div>
      </form>

      <Footer />
    </div>
  );
};

export default PerfilPage;
