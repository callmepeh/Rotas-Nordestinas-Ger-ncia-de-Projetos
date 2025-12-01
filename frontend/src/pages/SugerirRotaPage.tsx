// src/pages/SugerirRotaPage.tsx

import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Container from "../components/layout/Container";
import ImageUpload from "../components/forms/ImageUpload";
import { FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import "./SugerirRotaPage.css";

interface DynamicItem {
  id: number;
}

interface ComoChegarItem extends DynamicItem {
  nome: string;
  categoria: string;
  descricao: string;
}

interface PontoTuristicoItem extends DynamicItem {
  nome: string;
  descricao: string;
}

interface AtividadeItem extends DynamicItem {
  nome: string;
  descricao: string;
}

interface DicaLocalItem extends DynamicItem {
  nome: string;
  categoria: string;
  descricao: string;
}

const SugerirRotaPage: React.FC = () => {
  // Estados IBGE
  const [estados, setEstados] = useState<any[]>([]);
  const [cidades, setCidades] = useState<any[]>([]);

  const [estadoSelecionado, setEstadoSelecionado] = useState("");
  const [cidadeSelecionada, setCidadeSelecionada] = useState("");

  // Latitude e longitude
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  // --- Dados Dinâmicos ---
  const [comoChegarItens, setComoChegarItens] = useState<ComoChegarItem[]>([
    { id: Date.now(), nome: "", categoria: "", descricao: "" },
  ]);

  const [pontosTuristicos, setPontosTuristicos] = useState<
    PontoTuristicoItem[]
  >([{ id: Date.now(), nome: "", descricao: "" }]);

  const [atividades, setAtividades] = useState<AtividadeItem[]>([
    { id: Date.now(), nome: "", descricao: "" },
  ]);

  const [dicasLocais, setDicasLocais] = useState<DicaLocalItem[]>([
    { id: Date.now(), nome: "", categoria: "", descricao: "" },
  ]);

  // -------------------------------
  // BUSCAR ESTADOS DO IBGE
  // -------------------------------
  useEffect(() => {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
      .then((res) => res.json())
      .then((data) => setEstados(data));
  }, []);

  // -------------------------------
  // BUSCAR CIDADES BASEADO NO ESTADO
  // -------------------------------
  useEffect(() => {
    if (!estadoSelecionado) return;

    fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`
    )
      .then((res) => res.json())
      .then((data) => setCidades(data));
  }, [estadoSelecionado]);

  // -------------------------------
  // BUSCAR LATITUDE E LONGITUDE (OSM)
  // -------------------------------
  useEffect(() => {
    if (!cidadeSelecionada || !estadoSelecionado) return;

    const cidadeObj = cidades.find((c) => c.id == cidadeSelecionada);
    if (!cidadeObj) return;

    const cidadeNome = cidadeObj.nome;
    const estadoSigla = estados.find((e) => e.id == estadoSelecionado)?.sigla;

    fetch(
      `https://nominatim.openstreetmap.org/search?city=${cidadeNome}&state=${estadoSigla}&country=Brazil&format=json&limit=1`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.length > 0) {
          setLatitude(data[0].lat);
          setLongitude(data[0].lon);
        }
      });
  }, [cidadeSelecionada]);

  // -------------------------------
  // Funções dinâmicas
  // -------------------------------
  const addItem = <T extends DynamicItem>(
    setter: React.Dispatch<React.SetStateAction<T[]>>,
    newItem: Omit<T, "id">
  ) => {
    setter((prev) => [...prev, { ...newItem, id: Date.now() } as T]);
  };

  const removeItem = <T extends DynamicItem>(
    setter: React.Dispatch<React.SetStateAction<T[]>>,
    id: number
  ) => {
    setter((prev) => prev.filter((item) => item.id !== id));
  };

  const handleInputChange = <T extends DynamicItem>(
    setter: React.Dispatch<React.SetStateAction<T[]>>,
    id: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setter((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [name]: value } : item))
    );
  };

  return (
    <>
      <Navbar />
      <main className="sugerir-rota-page">
        <Container>
          <h1 className="main-title">Sugestão de Rotas</h1>
          <form className="suggestion-form">
            
            {/* =============== INFORMAÇÕES INICIAIS =============== */}
            <div className="form-section">
              <h2 className="section-title">Informações Iniciais</h2>

              <div className="form-grid">

                {/* ESTADO */}
                <div className="form-group">
                  <label htmlFor="estado">Estado</label>
                  <select
                    id="estado"
                    value={estadoSelecionado}
                    onChange={(e) => {
                      setEstadoSelecionado(e.target.value);
                      setCidadeSelecionada("");
                    }}
                  >
                    <option value="">Selecionar o Estado</option>
                    {estados.map((estado) => (
                      <option key={estado.id} value={estado.id}>
                        {estado.nome}
                      </option>
                    ))}
                  </select>
                </div>

                {/* CIDADE */}
                <div className="form-group">
                  <label htmlFor="cidade">Cidade</label>
                  <select
                    id="cidade"
                    value={cidadeSelecionada}
                    onChange={(e) => setCidadeSelecionada(e.target.value)}
                  >
                    <option value="">Selecionar a Cidade</option>
                    {cidades.map((cidade) => (
                      <option key={cidade.id} value={cidade.id}>
                        {cidade.nome}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* LATITUDE / LONGITUDE */}
              <div className="form-grid">
                <div className="form-group">
                  <label>Latitude</label>
                  <input type="text" value={latitude} readOnly />
                </div>

                <div className="form-group">
                  <label>Longitude</label>
                  <input type="text" value={longitude} readOnly />
                </div>
              </div>

              <ImageUpload />
            </div>


            {/* Seção Como Chegar (Dinâmica) */}
            <div className="form-section">
              <div className="section-header">
                <h2 className="section-title">Como chegar</h2>
                <button
                  type="button"
                  className="add-button"
                  onClick={() =>
                    addItem(setComoChegarItens, {
                      nome: "",
                      categoria: "",
                      descricao: "",
                    })
                  }
                >
                  <FaPlusCircle />
                </button>
              </div>
              {comoChegarItens.map((item) => (
                <div key={item.id} className="dynamic-card-item">
                  {comoChegarItens.length > 1 && (
                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => removeItem(setComoChegarItens, item.id)}
                    >
                      <FaTrashAlt />
                    </button>
                  )}
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor={`como-chegar-nome-${item.id}`}>
                        Nome
                      </label>
                      <input
                        type="text"
                        id={`como-chegar-nome-${item.id}`}
                        name="nome"
                        value={item.nome}
                        onChange={(e) =>
                          handleInputChange(setComoChegarItens, item.id, e)
                        }
                        placeholder="Ex: Saindo de Teresina"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor={`como-chegar-categoria-${item.id}`}>
                        Categoria
                      </label>
                      <input
                        type="text"
                        id={`como-chegar-categoria-${item.id}`}
                        name="categoria"
                        value={item.categoria}
                        onChange={(e) =>
                          handleInputChange(setComoChegarItens, item.id, e)
                        }
                        placeholder="Ex: De carro, Ônibus, Trilha"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor={`como-chegar-descricao-${item.id}`}>
                      Breve Descrição
                    </label>
                    <textarea
                      id={`como-chegar-descricao-${item.id}`}
                      name="descricao"
                      value={item.descricao}
                      onChange={(e) =>
                        handleInputChange(setComoChegarItens, item.id, e)
                      }
                      placeholder="Descreva aqui os detalhes de como chegar ao local"
                      rows={4}
                    ></textarea>
                  </div>
                </div>
              ))}
            </div>

            {/* Seção Pontos Turísticos (Dinâmica) */}
            <div className="form-section">
              <div className="section-header">
                <h2 className="section-title">Pontos Turísticos</h2>
                <button
                  type="button"
                  className="add-button"
                  onClick={() =>
                    addItem(setPontosTuristicos, { nome: "", descricao: "" })
                  }
                >
                  <FaPlusCircle />
                </button>
              </div>
              {pontosTuristicos.map((item) => (
                <div key={item.id} className="dynamic-card-item">
                  {pontosTuristicos.length > 1 && (
                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => removeItem(setPontosTuristicos, item.id)}
                    >
                      <FaTrashAlt />
                    </button>
                  )}
                  <div className="form-group">
                    <label htmlFor={`ponto-turistico-nome-${item.id}`}>
                      Nome
                    </label>
                    <input
                      type="text"
                      id={`ponto-turistico-nome-${item.id}`}
                      name="nome"
                      value={item.nome}
                      onChange={(e) =>
                        handleInputChange(setPontosTuristicos, item.id, e)
                      }
                      placeholder="Ex: Mirante do Cruzeiro"
                    />
                  </div>
                  <ImageUpload />
                  <div className="form-group">
                    <label htmlFor={`ponto-turistico-descricao-${item.id}`}>
                      Breve Descrição
                    </label>
                    <textarea
                      id={`ponto-turistico-descricao-${item.id}`}
                      name="descricao"
                      value={item.descricao}
                      onChange={(e) =>
                        handleInputChange(setPontosTuristicos, item.id, e)
                      }
                      placeholder="Descreva aqui os detalhes sobre o ponto turístico"
                      rows={4}
                    ></textarea>
                  </div>
                </div>
              ))}
            </div>

            {/* Seção Atividades Sugeridas (Dinâmica) */}
            <div className="form-section">
              <div className="section-header">
                <h2 className="section-title">Atividades Sugeridas</h2>
                <button
                  type="button"
                  className="add-button"
                  onClick={() =>
                    addItem(setAtividades, { nome: "", descricao: "" })
                  }
                >
                  <FaPlusCircle />
                </button>
              </div>
              {atividades.map((item) => (
                <div key={item.id} className="dynamic-card-item">
                  {atividades.length > 1 && (
                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => removeItem(setAtividades, item.id)}
                    >
                      <FaTrashAlt />
                    </button>
                  )}
                  <div className="form-group">
                    <label htmlFor={`atividade-nome-${item.id}`}>Nome</label>
                    <input
                      type="text"
                      id={`atividade-nome-${item.id}`}
                      name="nome"
                      value={item.nome}
                      onChange={(e) =>
                        handleInputChange(setAtividades, item.id, e)
                      }
                      placeholder="Ex: Trilha da cachoeira"
                    />
                  </div>
                  <ImageUpload />
                  <div className="form-group">
                    <label htmlFor={`atividade-descricao-${item.id}`}>
                      Breve Descrição
                    </label>
                    <textarea
                      id={`atividade-descricao-${item.id}`}
                      name="descricao"
                      value={item.descricao}
                      onChange={(e) =>
                        handleInputChange(setAtividades, item.id, e)
                      }
                      placeholder="Descreva aqui os detalhes sobre a atividade"
                      rows={4}
                    ></textarea>
                  </div>
                </div>
              ))}
            </div>

            {/* Seção Dicas do Local (Dinâmica) */}
            <div className="form-section">
              <div className="section-header">
                <h2 className="section-title">Dicas do local</h2>
                <button
                  type="button"
                  className="add-button"
                  onClick={() =>
                    addItem(setDicasLocais, {
                      nome: "",
                      categoria: "",
                      descricao: "",
                    })
                  }
                >
                  <FaPlusCircle />
                </button>
              </div>
              {dicasLocais.map((item) => (
                <div key={item.id} className="dynamic-card-item">
                  {dicasLocais.length > 1 && (
                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => removeItem(setDicasLocais, item.id)}
                    >
                      <FaTrashAlt />
                    </button>
                  )}
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor={`dica-nome-${item.id}`}>Nome</label>
                      <input
                        type="text"
                        id={`dica-nome-${item.id}`}
                        name="nome"
                        value={item.nome}
                        onChange={(e) =>
                          handleInputChange(setDicasLocais, item.id, e)
                        }
                        placeholder="Ex: Melhor restaurante"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor={`dica-categoria-${item.id}`}>
                        Categoria
                      </label>
                      <input
                        type="text"
                        id={`dica-categoria-${item.id}`}
                        name="categoria"
                        value={item.categoria}
                        onChange={(e) =>
                          handleInputChange(setDicasLocais, item.id, e)
                        }
                        placeholder="Ex: Restaurante, Bar, Loja"
                      />
                    </div>
                  </div>
                  <ImageUpload />
                  <div className="form-group">
                    <label htmlFor={`dica-descricao-${item.id}`}>
                      Breve Descrição
                    </label>
                    <textarea
                      id={`dica-descricao-${item.id}`}
                      name="descricao"
                      value={item.descricao}
                      onChange={(e) =>
                        handleInputChange(setDicasLocais, item.id, e)
                      }
                      placeholder="Descreva aqui a dica"
                      rows={4}
                    ></textarea>
                  </div>
                </div>
              ))}
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-button">
                Enviar
              </button>
            </div>
          </form>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default SugerirRotaPage;
