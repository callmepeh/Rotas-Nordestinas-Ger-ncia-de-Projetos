import { useState, useMemo } from "react";
import { Link as ScrollLink } from "react-scroll";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer"; // Lembre-se de importar o Footer se ele estiver aqui
import Container from "../components/layout/Container"; // O componente chave
import DestinationsCarousel from "../components/destinations/DestinationsCarousel";
import { DESTINOS } from "../data/database";
import type { Destino } from "../types";
import "./HomePage.css";
import heroImage from "../assets/images/hero.jpg";
import FeaturesSection from "../components/home/FeaturesSections";
import ValuesSection from "../components/home/ValuesSection";

// Interface para o objeto de destinos agrupados
interface GroupedDestinos {
  [estado: string]: Destino[];
}

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const groupedDestinos = useMemo(() => {
    const filtered = DESTINOS.filter(
      (destino) =>
        destino.cidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
        destino.estado.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.reduce((acc, destino) => {
      const { estado } = destino;
      if (!acc[estado]) {
        acc[estado] = [];
      }
      acc[estado].push(destino);
      return acc;
    }, {} as GroupedDestinos);
  }, [searchTerm]);

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

      <Container>
        <ValuesSection />
      </Container>

      <Container>
        <main className="home-content">
          {/* Seção dos Destinos com a busca */}
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
