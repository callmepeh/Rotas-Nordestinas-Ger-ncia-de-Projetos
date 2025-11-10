
export const USERS: User[] = [
  {
    id: 1,
    email: "colaborador@gmail.com",
    senha: "123",
    nome: "João Silva",
    dataNascimento: "15/03/1995",
    estado: "Pernambuco",
    cidade: "Recife",
    telefone: "(81) 99999-8888",
    role: "colaborador",
  },
  {
    id: 2,
    email: "usuario@gmail.com",
    senha: "123",
    nome: "Maria Joaquina",
    dataNascimento: "11/10/2002",
    estado: "Bahia",
    cidade: "Salvador",
    telefone: "(71) 98888-7777",
    role: "user",
  },
];

export const DESTINOS: Destino[] = [
  {
    id: "recife",
    estado: "Pernambuco",
    cidade: "Recife",
    imagem: "/cidade.png", // Sugestão: crie uma pasta public/images/
    imagemCapa: "/cidades.jpeg",
    descricao:
      'Recife, a capital do estado de Pernambuco, no nordeste do Brasil, é caracterizada por seus rios, pontes e ilhas. Conhecida como a "Veneza Brasileira", a cidade possui um centro histórico vibrante, o Recife Antigo, com edifícios coloniais coloridos e uma rica cena cultural.',
    pontosTuristicos: [
      {
        id: 1,
        nome: "Marco Zero",
        descricao:
          "O ponto de partida de todas as estradas de Pernambuco, um lugar histórico e cultural.",
        imagem: "/cidade.png",
      },
      {
        id: 2,
        nome: "Instituto Ricardo Brennand",
        descricao:
          "Um complexo cultural com um castelo medieval, museu de armas e uma vasta coleção de arte.",
        imagem: "/cidade.png",
      },
    ],
    comoChegar: [
      {
        id: 1,
        tipo: "Terrestre",
        titulo: "Terminal Integrado de Passageiros (TIP)",
        descricao:
          "O acesso rodoviário a Recife pode ser feito pelas BR-101 e BR-232. O Terminal Integrado de Passageiros (TIP) recebe ônibus de diversas capitais e cidades do Nordeste.",
      },
      {
        id: 2,
        tipo: "Aéreo",
        titulo: "Aeroporto Internacional do Recife / Guararapes – Gilberto Freyre",
        descricao:
          "O aeroporto fica a cerca de 11 km do centro e recebe voos nacionais e internacionais. Há opções de táxi, transporte por aplicativo e metrô para o deslocamento até as principais áreas da cidade.",
      },
      {
        id: 3,
        tipo: "Marítimo",
        titulo: "Porto do Recife",
        descricao:
          "Localizado próximo ao centro histórico, o Porto do Recife recebe cruzeiros marítimos e pequenas embarcações turísticas. É uma porta de entrada charmosa para quem chega pelo litoral.",
      },
    ],
  },
  {
    id: "olinda",
    estado: "Pernambuco",
    cidade: "Olinda",
    imagem: "/cidade.png",
    imagemCapa: "/cidades.jpeg",
    descricao:
      "Patrimônio Mundial da UNESCO, Olinda é famosa por suas ladeiras coloridas, igrejas barrocas e um dos carnavais mais autênticos do Brasil.",
    pontosTuristicos: [
      {
        id: 1,
        nome: "Alto da Sé",
        descricao:
          "Oferece uma vista panorâmica deslumbrante de Olinda e Recife, com a famosa feirinha de artesanato.",
        imagem: "/cidade.png",
      },
    ],
    comoChegar: [
      {
        id: 1,
        tipo: "Terrestre",
        titulo: "Acesso Rodoviário a partir de Recife",
        descricao:
          "Olinda está a cerca de 10 km do centro de Recife e pode ser acessada pelas avenidas Agamenon Magalhães e Presidente Kennedy, ou pela PE-15. Há linhas de ônibus metropolitanos que conectam os principais bairros de Recife a Olinda em poucos minutos.",
      },
      {
        id: 2,
        tipo: "Aéreo",
        titulo: "Aeroporto Internacional do Recife / Guararapes – Gilberto Freyre",
        descricao:
          "O aeroporto mais próximo é o de Recife, localizado a cerca de 20 km de Olinda. De lá, é possível seguir de táxi, aplicativo ou transporte público até o centro histórico de Olinda em aproximadamente 30 minutos.",
      },

    ],
  },
  {
    id: "Picos",
    estado: "Piaui",
    cidade: "Olinda",
    imagem: "/cidade.png",
    imagemCapa: "/cidades.jpeg",
    descricao:
      "Patrimônio Mundial da UNESCO, Olinda é famosa por suas ladeiras coloridas, igrejas barrocas e um dos carnavais mais autênticos do Brasil.",
    pontosTuristicos: [
      {
        id: 1,
        nome: "Alto da Sé",
        descricao:
          "Oferece uma vista panorâmica deslumbrante de Olinda e Recife, com a famosa feirinha de artesanato.",
        imagem: "/cidade.png",
      },
    ],
    comoChegar: [
      {
        id: 1,
        tipo: "Terrestre",
        titulo: "Acesso Rodoviário a partir de Recife",
        descricao:
          "Olinda está a cerca de 10 km do centro de Recife e pode ser acessada pelas avenidas Agamenon Magalhães e Presidente Kennedy, ou pela PE-15. Há linhas de ônibus metropolitanos que conectam os principais bairros de Recife a Olinda em poucos minutos.",
      },
      {
        id: 2,
        tipo: "Aéreo",
        titulo: "Aeroporto Internacional do Recife / Guararapes – Gilberto Freyre",
        descricao:
          "O aeroporto mais próximo é o de Recife, localizado a cerca de 20 km de Olinda. De lá, é possível seguir de táxi, aplicativo ou transporte público até o centro histórico de Olinda em aproximadamente 30 minutos.",
      },
    ],
  },
];
