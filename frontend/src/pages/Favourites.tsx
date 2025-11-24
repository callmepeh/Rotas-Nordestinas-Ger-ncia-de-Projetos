import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Container from "../components/layout/Container";
import "./Favourites.css";

interface Favorito {
  id: number;
  rotaID: number;
  nome_rota: string;
  cidade: string;
  urlImagem?: string;
}

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function Favourites() {
  const [favoritos, setFavoritos] = useState<Favorito[]>([]);
  const [loading, setLoading] = useState(true);

  const userID = localStorage.getItem("userID") || "1";

  const carregarFavoritos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/favoritos/${userID}`);
      setFavoritos(response.data || []);
    } catch (err) {
      console.error("Erro ao carregar favoritos:", err);
    } finally {
      setLoading(false);
    }
  };

  const removerFavorito = async (rotaID: number) => {
    try {
      await axios.delete(`${API_BASE}/favoritos/remove`, {
        data: { userID, rotaID },
      });
      carregarFavoritos();
    } catch (err) {
      console.error("Erro ao remover favorito:", err);
    }
  };

  useEffect(() => {
    carregarFavoritos();
  }, []);

  return (
    <div className="favourites-page">
      <Navbar />

      <Container>
        <div className="fav-container">
          <h1 className="fav-title">Meus Favoritos</h1>

          {loading ? (
            <p className="fav-loading">Carregando...</p>
          ) : favoritos.length === 0 ? (
            <p className="fav-empty">Você ainda não tem rotas favoritas.</p>
          ) : (
            <div className="fav-list">
              {favoritos.map((fav) => (
                <div
                  key={fav.id}
                  className="fav-card"
                  style={{
                    backgroundImage: fav.urlImagem
                      ? `url(${fav.urlImagem})`
                      : "url('/src/assets/images/hero.jpg')",
                  }}
                >
                  <div className="fav-info">
                    <h2 className="fav-name">{fav.nome_rota}</h2>
                    <p className="fav-city">{fav.cidade}</p>
                  </div>

                  <button
                    className="fav-remove"
                    onClick={() => removerFavorito(fav.rotaID)}
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>

      <Footer />
    </div>
  );
}
