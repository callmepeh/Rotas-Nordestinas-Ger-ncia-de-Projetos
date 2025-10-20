import { useParams } from "react-router-dom";
import { DESTINOS } from "../data/database";
import Container from "../components/layout/Container"; 
import Navbar from "../components/layout/Navbar";
import "./DestinationDetailPage.css"; 
import { FaUserCircle } from "react-icons/fa";
import InfoCarousel from "../components/destinations/InfoCarousel";


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
            itens={destino.pontosTuristicos.map(pt => ({
              id: String(pt.id),      
              imagem: pt.imagem,
              nome: pt.nome,
              descricao: pt.descricao
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
      </main>
    </Container>
    </div>
  );
};

export default DestinationDetailPage;
