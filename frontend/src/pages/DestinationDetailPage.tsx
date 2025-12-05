import { useParams } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import Container from "../components/layout/Container";
import Navbar from "../components/layout/Navbar";
import "./DestinationDetailPage.css";
import Footer from "../components/layout/Footer";
import { FaUserCircle } from "react-icons/fa";
import InfoCarousel from "../components/destinations/InfoCarousel";
import { api } from "../services/api";
import { LeafletMap } from "../components/map/MapLeaflet";
import 'leaflet/dist/leaflet.css';

interface Destino { 
  id: string;
  nomeCidade: string;
  url_imagem: string;
  descricao?: string;
  estado?: {
    nome: string;
    sigla: string;
  };
  usuario?: {
    id: string;
    nomeCompleto: string;
  };
}

interface ComoChegarItem {
  id: number;
  tipo: "Terrestre" | "Aéreo" | "Marítimo";
  titulo: string;
  descricao: string;
}

interface CarouselItem {
  id: string;
  titulo: string;
  descricao: string;
  url_imagem: string;
}

interface Users {
    id: string;
    nomeCompleto: string;
}

interface Comentario {
    id: number;
    mensagem: string;
    created_at: string;
    usuario: Users; 
}

const DestinationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [destino, setDestino] = useState<Destino | null>(null);

  const [comoChegar, setComoChegar] = useState<ComoChegarItem[]>([]);
  const [pontosTuristicos, setPontosTuristicos] = useState<CarouselItem[]>([]);
  const [atividades, setAtividades] = useState<CarouselItem[]>([]);
  const [dicas, setDicas] = useState<CarouselItem[]>([]);
  
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [commentError, setCommentError] = useState('');

  // Substitua pela lógica real de autenticação (Context API, etc.)
  const [session, setSession] = useState<{ user: { id: string } } | null>({ user: { id: "a9a8b8e4-3b7b-4b4f-8b3b-5b3b3b3b3b3b" } });

  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar comentários
  const fetchComments = useCallback(async () => {
    if (!id) return;
    try {
      const response = await api.get(`/comentarios/${id}`);
      setComentarios(response.data);
    } catch (error) {
      console.error("Erro ao buscar comentários:", error);
    }
  }, [id]);

  // Busca o destino pelo ID vindo da URL
  useEffect(() => {
    async function fetchDestino() {
      try {
        //Busca dados do destino
        const response = await api.get(`/cidades/${id}`);
        const destinoData = response.data;
        // console.log("Destino carregado:", response.data);
        setDestino(response.data);
        
        //Busca dados de como chegar
        const comoChegarResponse = await api.get(`/como-chegar/${id}`);
        // console.log("Como Chegar carregado:", comoChegarResponse.data);
        setComoChegar(comoChegarResponse.data);
        
        //Busca dados de pontos turísticos
        const pontosTuristicosResponse = await api.get(`/pontos/${id}`);
        // console.log("Pontos Turísticos carregados:", pontosTuristicosResponse.data);
        setPontosTuristicos(pontosTuristicosResponse.data);
        
        //Busca dados de atividades
        const atividadesResponse = await api.get(`/atividades/${id}`);
        // console.log("Atividades carregadas:", atividadesResponse.data);
        setAtividades(atividadesResponse.data);
        
        //Busca dados de dicas
        const dicasResponse = await api.get(`/dicas/${id}`);
        // console.log("Dicas carregadas:", dicasResponse.data);
        setDicas(dicasResponse.data);
        
        await fetchComments();

       // Define coordenadas vindo do backend
      if (destinoData.latitude && destinoData.longitude) {
        setCoordinates([destinoData.latitude, destinoData.longitude]);
      }

      } catch (err) {
        console.error("Erro ao buscar destino:", err);
        setError("Destino não encontrado.");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchDestino();
    
  }, [id, fetchComments]);
  
  // Função para obter a localização da cidade através da biblioteca Nominatim
  // const fetchCoordinates = async (cidade: string, estado: string) => {
  //   try {
  //     const query = `${cidade}, ${estado}, Brazil`;
  //     const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
  //     const data = await response.json();
  //     if (data && data.length > 0) {
  //       setCoordinates([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
  //     } else {
  //       console.warn("A API de geocodificação não encontrou o local:", query);
  //     }
  //   } catch (error) {
  //     console.error("Falha ao buscar coordenadas na API de geocodificação:", error);
  //   }
  // };

  // Função para renderizar cada item de "Como Chegar"
  const renderComoChegarItem = (item: ComoChegarItem) => (
    <div key={item.id} className="container-to-arrive">
      <div className="title">
        <h3>{item.titulo}</h3>
        <div className="icon-type" >
          {/* {item.tipo === "Terrestre" && <FaBusSimple size={40} />}
          {item.tipo === "Aéreo" && <FaPlane size={40} />}
          {item.tipo === "Marítimo" && <FaShip size={40} />} */}
          <span>{item.tipo}</span>
        </div>
      </div>
      <p>{item.descricao}</p>
    </div>
  );

  // Função para submeter o comentário
   const handleCommentSubmit = async (e:  React.FormEvent) => {
    e.preventDefault();

    if (!session || !session.user || !newCommentText.trim() || !id) {
      setCommentError('Você precisa estar logado e o comentário não pode ser vazio.');
      return;
    }
    setCommentError('');

    try {
      await api.post('/comentarios', {
          userId: session.user.id, // Corrigido para corresponder ao backend
          cidadeId: parseInt(id, 10), // Corrigido para corresponder ao backend
          mensagem: newCommentText
      });

      setNewCommentText('');
      await fetchComments(); // Re-busca os comentários para exibir o novo

    } catch (err) {
      console.error('ERRO AO ADICIONAR COMENTÁRIO:', err);
      setCommentError('Erro ao adicionar comentário. Tente novamente.');
    }
  };

  if (loading)
    return (
      <div>
        <Navbar />
        <div className="detail-container">
          <h2>Carregando destino...</h2>
        </div>
      </div>
    );

  if (error || !destino)
    return (
      <div>
        <Navbar />
        <div className="detail-container">
          <h2>{error || "Destino não encontrado!"}</h2>
        </div>
      </div>
    );

  // Renderiza o conteúdo se o destino foi encontrado
  return (
    <div>
      <Navbar />
      <div
        className="detail-hero"
        style={{ backgroundImage: `url(${destino.url_imagem})` }}
      >
        <h1>{destino.nomeCidade}</h1>
      </div>

      <div className="flex_area">
        <p className="sugested_user">Rota sugerida por:</p>
        <div className="user">
          <FaUserCircle size={30} />
          <p>{destino.usuario?.nomeCompleto || "Usuário anônimo"}</p>
        </div>
      </div>

      <Container>
        <main className="detail-container">
          <section className="description-section">
            <h2>Descrição</h2>
            <p>{destino.descricao}</p>
          </section>

          <div className="carousel-section">
            <InfoCarousel
              titulo="Pontos Turísticos"
              itens={pontosTuristicos.map((pt) => ({
                id: String(pt.id),
                imagem: pt.url_imagem,
                nome: pt.titulo,
                descricao: pt.descricao,
              }))}
            />

            <InfoCarousel
            titulo="Atividades"
            itens={atividades.map(a => ({
              id: String(a.id),
              imagem: a.url_imagem,
              nome: a.titulo,
              descricao: a.descricao
            }))}
          />

          <InfoCarousel
            titulo="Dicas"
            itens={dicas.map(d => ({
              id: String(d.id),
              imagem: d.url_imagem,
              nome: d.titulo,
              descricao: d.descricao
            }))}
          />
          </div>

          <div className="localization-grid">
            <section className="map-section">
              <h2>Destino</h2>
              {coordinates ? (
                <LeafletMap 
                  latitude={coordinates[0]} 
                  longitude={coordinates[1]}
                  popupText={destino?.nomeCidade}
                />
                ) : (
                  <p>Carregando mapa...</p>
                )}
            </section>

            <section className="to-arrive">
              <h2>Como Chegar</h2>
              {comoChegar.map(renderComoChegarItem)}
            </section>
          </div>
          
          <section className="container_feedbacks">
            <h2>Feedbacks</h2>

            {session && session.user ? (
              <form onSubmit={handleCommentSubmit} className="commentForm">
                <textarea
                  className="commentInput"
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Adicione seu comentário aqui..."
                  rows={4}
                  maxLength={500}
                ></textarea>
                {commentError && <p className="commentError">{commentError}</p>}
                <button type="submit" className="hero-button2">
                  Enviar Comentário
                </button>
              </form>
            ) : (
                <p>Faça login para adicionar um comentário.</p>
            )}

            {comentarios?.length > 0 ? (
              comentarios.map((comentario) => (
                <div key={comentario.id} className="user_feedback">
                  <div className="info_user1">
                    <FaUserCircle size={45} />
                    <div>
                      <h3>{comentario.usuario?.nomeCompleto || 'Usuário Anônimo'}</h3>
                      <span>{new Date(comentario.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <p>{comentario.mensagem}</p>
                </div>
              ))
            ) : (
              <p>Não há comentários ainda. Seja o primeiro a comentar!</p>
            )}
          </section>
        </main>
      </Container>

      <Footer />
    </div>
  );
};

export default DestinationDetailPage;
