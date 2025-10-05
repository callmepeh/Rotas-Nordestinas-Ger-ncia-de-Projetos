import { useState, useMemo } from "react";
import Navbar from "../components/layout/Navbar";
import DestinationsCarousel from "../components/destinations/DestinationsCarousel";
import { DESTINOS } from "../data/database";
import type { Destino } from "../types";
import "./HomePage.css";

// Interface para o objeto de destinos agrupados
interface GroupedDestinos {
  [estado: string]: Destino[];
}

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filtra e agrupa os destinos baseado na busca
  const groupedDestinos = useMemo(() => {
    const filtered = DESTINOS.filter(
      (destino) =>
        destino.cidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
        destino.estado.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Agrupa os destinos filtrados por estado
    return filtered.reduce((acc, destino) => {
      const { estado } = destino;
      if (!acc[estado]) {
        acc[estado] = [];
      }
      acc[estado].push(destino);
      return acc;
    }, {} as GroupedDestinos);
  }, [searchTerm]); // Recalcula apenas quando o searchTerm muda

  return (
    <div>
      <Navbar />

      {/* Seção Hero (imagem principal do topo) */}
      <header className="hero-section">
        <h1>Explore a essência do Nordeste</h1>
        <p>Um universo de cultura e paisagens únicas</p>
      </header>

      <main className="home-content">
        {/* Seção de Busca */}
        <div className="search-section">
          <h3>Descubra o Nordeste além dos roteiros convencionais</h3>
          <input
            type="text"
            placeholder="Pesquise por uma cidade ou estado"
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Seção de Valores (estática) */}
        <section className="values-section">
          {/* Você pode criar componentes para cada um desses cards se quiser */}
          <div className="value-card">
            <h4>Missão</h4>
            <p>Conectar viajantes à cultura, história e sabores do Nordeste.</p>
          </div>
          <div className="value-card">
            <h4>Visão</h4>
            <p>
              Ser a principal referência online para o turismo na região
              Nordeste.
            </p>
          </div>
          <div className="value-card">
            <h4>Valores</h4>
            <p>Autenticidade, Respeito à cultura local e Sustentabilidade.</p>
          </div>
        </section>

        {/* Seção Dinâmica dos Carrosséis */}
        <div className="destinations-list">
          {Object.entries(groupedDestinos).map(([estado, destinos]) => (
            <DestinationsCarousel
              key={estado}
              estado={estado}
              destinos={destinos}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
