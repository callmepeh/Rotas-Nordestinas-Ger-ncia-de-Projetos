import { useState, useEffect, useMemo } from "react";
import { Link as ScrollLink } from "react-scroll";
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
  url_imagem: string;
  descricao?: string;
  estados?: Estado;
}

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [destinos, setDestinos] = useState<Destino[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🟢 Carrega todos os destinos APENAS ao entrar na página
  const fetchAllDestinos = async () => {
    try {
      setLoading(true);
      const response = await api.get("/cidades");
      setDestinos(response.data);
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar destinos.");
    } finally {
      setLoading(false);
    }
  };

  // 🟡 Busca por nome
  const fetchByNome = async (nome: string) => {
    try {
      setLoading(true);
      const response = await api.get(`/cidades/buscar?nome=${nome}`);
      setDestinos(response.data);
    } catch (err) {
      console.error(err);
      setError("Erro ao buscar destinos.");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Carrega todos UM ÚNICO VEZ
  useEffect(() => {
    fetchAllDestinos();
  }, []);

  // 🔥 Busca por nome SOMENTE quando tem texto digitado
  useEffect(() => {
    if (searchTerm.trim() === "") return; // ← evita sobrescrever os destinos já carregados

    const delay = setTimeout(() => {
      fetchByNome(searchTerm);
    }, 500);

    return () => clearTimeout(delay);
  }, [searchTerm]);

  // 🔵 Agrupa por estado — seguro
  const groupedDestinos = useMemo(() => {
    return destinos.reduce((acc: Record<string, Destino[]>, destino) => {
      const estado = destino.estados?.nome || "Desconhecido";
      if (!acc[estado]) acc[estado] = [];
      acc[estado].push(destino);
      return acc;
    }, {});
  }, [destinos]);

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
        <div id="sobre">
          <ValuesSection />
        </div>
      </Container>

      <Container>
        <main className="home-content">
          <section id="destinos" className="destinations-section">
            <div className="destinations-header">
              <h2>Destinos</h2>
              <input
                type="text"
                placeholder="Pesquise por uma cidade"
                className="search-bar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {loading ? (
              <p>Carregando destinos...</p>
            ) : error ? (
              <p style={{ color: "red" }}>{error}</p>
            ) : (
              <div className="destinations-list">
                {Object.entries(groupedDestinos).map(([estado, cidades]) => (
                  <DestinationsCarousel
                    key={estado}
                    estado={estado}
                    destinos={cidades}
                  />
                ))}
              </div>
            )}
          </section>
        </main>
      </Container>

      <Footer />
    </div>
  );
};

export default HomePage;
