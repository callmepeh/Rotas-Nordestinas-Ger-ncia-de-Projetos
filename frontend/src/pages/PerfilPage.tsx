import React, { useState } from "react";
import NavBar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useAuth} from "../context/AuthContext";
import "./PerfilPage.css";

const PerfilPage = () => {
	const { user, logout } = useAuth();
	const [nome, setNome] = useState(user?.nome || "");
  	const [telefone, setTelefone] = useState(user?.telefone || "");
  	const [dataNasc, setDataNasc] = useState(user?.dataNascimento || ""); 
  	const [estado, setEstado] = useState(user?.estado || "");
  	const [cidade, setCidade] = useState(user?.cidade || "");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Dados para salvar:", {
			nome,
			telefone,
			dataNasc,
			estado,
			cidade,
		});
  	};

	return (
    <div className="perfil-page-wrapper">
      <NavBar/>
        <h2 className="perfil-title">Perfil</h2>

        <form className="perfil-form" onSubmit={handleSubmit}>
          
          <section className="form-section">
            <h3>Informações pessoais</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nome">Nome</label>
                <input
                  type="text"
                  id="nome"
                  placeholder="Ex: Maria Joaquina"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="telefone">Numero de telefone</label>
                <input
                  type="tel"
                  id="telefone"
                  placeholder="(99) 9999-9999"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="dataNasc">Data de nascimento</label>
                <input
                  type="text" 
                  id="dataNasc"
                  placeholder="Ex: 11/10/2002"
                  value={dataNasc}
                  onChange={(e) => setDataNasc(e.target.value)}
                />
              </div>

              <div className="form-group-empty"></div>
            </div>
          </section>

          <section className="form-section">
            <h3>Informações de localização</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="estado">estado</label>
                <select
                  id="estado"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                >
                  <option value="" disabled>Selecionar o Estado</option>
                  <option value="PI">Piauí</option>
                  <option value="CE">Ceará</option>
                  <option value="MA">Maranhão</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="cidade">Cidade</label>
                <select
                  id="cidade"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                >
                  <option value="" disabled>Selecionar a Cidade</option>
                  <option value="Teresina">Teresina</option>
                  <option value="Parnaiba">Parnaíba</option>
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
		<Footer/>
    </div>
  );
};

export default PerfilPage;