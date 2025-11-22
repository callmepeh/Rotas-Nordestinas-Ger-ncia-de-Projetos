import { useParams } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import Container from "../components/layout/Container";
import Navbar from "../components/layout/Navbar";
import "./DestinationDetailPage.css";
import Footer from "../components/layout/Footer";
import { FaUserCircle } from "react-icons/fa";
import InfoCarousel from "../components/destinations/InfoCarousel";
import { MapGoogle } from "../components/map/MapGoogle";
import { api } from "../services/api";

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

interface CarouselItem {
  id: string;
  titulo: string;
  descricao: string;
  url_imagem: string;
}

interface ComoChegarItem {
  id: number;
  tipo: "Terrestre" | "Aéreo" | "Marítimo";
  titulo: string;
  descricao: string;
}

const DestinationDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [destino, setDestino] = useState<Destino | null>(null);

  const [comoChegar, setComoChegar] = useState<ComoChegarItem[]>([]);
  const [pontosTuristicos, setPontosTuristicos] = useState<CarouselItem[]>([]);
  const [atividades, setAtividades] = useState<CarouselItem[]>([]);
  const [dicas, setDicas] = useState<CarouselItem[]>([]);

  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);


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

  // Se encontrar, exibe as informações
  return (
    <div>
      <Navbar />
      <div
        className="detail-hero"
        style={{ backgroundImage: `url(${destino.imagemCapa})` }}
      >
        <h1>{destino.cidade}</h1>
      </div>

      <div className="flex_area">
        <p className="sugested_user">Rota sugerida por:</p>
        <div className="user">
          <FaUserCircle size={30} />
          <p>Viviany Silva</p>
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

        </main>
      </Container>
    </div>
  );
};

export default DestinationDetailPage;
