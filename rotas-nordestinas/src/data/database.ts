import { type User, type Destino } from "../types";

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
  },
  {
    id: "olinda",
    estado: "Pernambuco",
    cidade: "Olinda",
    imagem: "/cidade.png",
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
  },
  {
    id: "Picos",
    estado: "Piaui",
    cidade: "Olinda",
    imagem: "/cidade.png",
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
  },
];
