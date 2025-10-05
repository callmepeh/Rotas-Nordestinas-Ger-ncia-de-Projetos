// src/pages/DestinationDetailPage.tsx

import { useParams } from "react-router-dom";
import { DESTINOS } from "../data/database";
import Navbar from "../components/layout/Navbar";
import "./DestinationDetailPage.css"; // Estilos para a página

const DestinationDetailPage = () => {
  // O hook useParams() pega os parâmetros da URL.
  // No nosso caso, o `:id` que definiremos na rota.
  const { id } = useParams<{ id: string }>();

  // Encontra o destino correspondente no nosso banco de dados falso
  const destino = DESTINOS.find((d) => d.id === id);

  // Se o destino não for encontrado, exibe uma mensagem
  if (!destino) {
    return (
      <div>
        <Navbar />
        <div className="detail-container">
          <h2>Destino não encontrado!</h2>
        </div>
      </div>
    );
  }

  // Se encontrar, exibe as informações
  return (
    <div>
      <Navbar />
      <div
        className="detail-hero"
        style={{ backgroundImage: `url(${destino.imagem})` }}
      >
        <h1>{destino.cidade}</h1>
      </div>
      <main className="detail-container">
        <section className="description-section">
          <h2>Descrição</h2>
          <p>{destino.descricao}</p>
        </section>

        <section className="poi-section">
          <h2>Pontos Turísticos</h2>
          <div className="poi-grid">
            {destino.pontosTuristicos.map((ponto) => (
              <div key={ponto.id} className="poi-card">
                <img src={ponto.imagem} alt={ponto.nome} />
                <h3>{ponto.nome}</h3>
                <p>{ponto.descricao}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Aqui entrariam as outras seções como "Atividades", "Como Chegar", etc. */}
      </main>
    </div>
  );
};

export default DestinationDetailPage;
