// src/pages/HomePage.tsx

import { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scroller, Link as ScrollLink } from "react-scroll";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Container from "../components/layout/Container";
import DestinationsCarousel from "../components/destinations/DestinationsCarousel";
import FeaturesSection from "../components/home/FeaturesSections";
import ValuesSection from "../components/home/ValuesSection";
import heroImage from "../assets/images/hero.jpg";
import { api } from "../services/api";
import "./HomePage.css";

interface Estado {
  nome: string;
  sigla: string;
}

interface Destino {
  id: string;
  nomeCidade: string;
  urlImagem: string;
  descricao?: string;
  estados?: Estado;
}

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [destinos, setDestinos] = useState<Destino[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();

  // Efeito para rolar a tela quando vindo de outra página
  useEffect(() => {
    async function fetchDestinos() {
      try {
        const response = await fetch("http://localhost:5000/api/cidades");
        const data = await response.json();
        setDestinos(data);
      } catch (err) {
        setError("Erro ao carregar os destinos.");
      } finally {
        setLoading(false);
      }
    }
    fetchDestinos();
  }, []);

  // Lógica de busca e agrupamento dos destinos
  const groupedDestinos = useMemo(() => {
    return destinos.reduce((acc: Record<string, Destino[]>, destino) => {
      const estado = destino.estados?.nome || "Desconhecido";
      if (!acc[estado]) acc[estado] = [];
      acc[estado].push(destino);
      return acc;
    }, {});
  }, [searchTerm, destinos]);

  return (
    <div>
      <Navbar />

      <header
        id="Home"
        className="hero-section"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <Container>
          <div className="hero-content">
            <h1>
              Explore a essência <br /> do Nordeste
            </h1>
            <p>Um universo de cultura e paisagens únicas</p>

            <ScrollLink
              to="destinos"
              smooth={true}
              duration={500}
              offset={-80}
              className="hero-button"
            >
              Descubra o que o Nordeste tem a oferecer
            </ScrollLink>
          </div>
        </Container>
      </header>

      <Container>
        <FeaturesSection />
      </Container>

      {/* A seção "Sobre" precisa ter o ID "sobre" para o scroll funcionar */}
      <div id="sobre">
        <ValuesSection />
      </div>

      <Container>
        <main className="home-content">
          <section id="destinos" className="destinations-section">
            <div className="destinations-header">
              <h2>Destinos</h2>
              <input
                type="text"
                placeholder="Pesquise por um destino"
                className="search-bar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="destinations-list">
              {Object.entries(groupedDestinos).map(([estado, destinos]) => (
                <DestinationsCarousel
                  key={estado}
                  estado={estado}
                  destinos={destinos}
                />
              ))}
            </div>
          </section>
        </main>
      </Container>

      <Footer />
    </div>
  );
};

export default HomePage;
