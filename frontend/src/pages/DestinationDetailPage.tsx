import { useParams } from "react-router-dom";
import { DESTINOS } from "../data/database";
import Container from "../components/layout/Container";
import Navbar from "../components/layout/Navbar";
import "./DestinationDetailPage.css";
import { FaUserCircle } from "react-icons/fa";
import InfoCarousel from "../components/destinations/InfoCarousel";
import { MapGoogle } from "../components/map/MapGoogle";
import { FaBusSimple, FaPlane, FaShip } from "react-icons/fa6";

interface ComoChegarItem {
  id: number;
  tipo: "Terrestre" | "Aéreo" | "Marítimo";
  titulo: string;
  descricao: string;
}

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
              itens={destino.pontosTuristicos.map((pt) => ({
                id: String(pt.id),
                imagem: pt.imagem,
                nome: pt.nome,
                descricao: pt.descricao,
              }))}
            />

            {/* <InfoCarousel
            titulo="Atividades"
            itens={destino.atividades.map(a => ({
              id: String(a.id),
              imagem: a.imagem,
              nome: a.nome,
              descricao: a.descricao
            }))}
          />

          <InfoCarousel
            titulo="Dicas"
            itens={destino.dicas.map(d => ({
              id: String(d.id),
              imagem: d.imagem,
              nome: d.nome,
              descricao: d.descricao
            }))}
          /> */}
          </div>

          <div className="localization-grid">
            <section className="map-section">
              <h2>Destino</h2>
              <MapGoogle city={destino.cidade} state={destino.estado} />
            </section>

            <section className="to-arrive">
              <h2>Como Chegar</h2>
              {destino.comoChegar.map(renderComoChegarItem)}
            </section>
          </div>

        </main>
      </Container>
    </div>
  );
};

export default DestinationDetailPage;
