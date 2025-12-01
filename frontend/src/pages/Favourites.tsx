import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Container from "../components/layout/Container";
import "./Favourites.css";
import { useAuth } from "../context/AuthContext";

interface Favorito {
  id: number;
  rotaID: number;
  nome_rota: string;
  cidade: string;
  urlImagem?: string;
}

const API_BASE = "http://localhost:5000";

export default function Favourites() {
  const [favoritos, setFavoritos] = useState<Favorito[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, token } = useAuth();

  const carregarFavoritos = async () => {
    if (!user || !token) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/favoritos/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFavoritos(response.data || []);
    } catch (err) {
      console.error("Erro ao carregar favoritos:", err);
    } finally {
      setLoading(false);
    }
  };

  const removerFavorito = async (rotaID: number) => {
    if (!user || !token) return;

    try {
      await axios.delete(`${API_BASE}/favoritos/remove`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { userID: user.id, rotaID },
      });
      carregarFavoritos();
    } catch (err) {
      console.error("Erro ao remover favorito:", err);
    }
  };

  useEffect(() => {
    carregarFavoritos();
  }, [user, token]);

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