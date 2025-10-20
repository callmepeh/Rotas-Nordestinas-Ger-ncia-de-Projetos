// src/types/index.ts

// Definimos os papéis (roles) possíveis para um usuário.
// Usar um "union type" assim evita erros de digitação.
export type UserRole = "user" | "colaborador" | "admin";

// Este é o "contrato" que todo objeto de usuário deve seguir.
export interface User {
  id: number;
  email: string;
  senha?: string; // A senha é opcional, pois podemos não querer enviá-la para o front-end sempre.
  nome: string;
  dataNascimento: string;
  estado: string;
  cidade: string;
  telefone: string;
  role: UserRole;
}

// Um tipo para um Ponto Turístico, que será usado dentro de um Destino.
export interface PontoTuristico {
  id: number;
  nome: string;
  descricao: string;
  imagem: string;
}

// O "contrato" para nossos Destinos.
export interface Destino {
  id: string; // ex: 'recife', 'salvador'
  estado: string;
  cidade: string;
  imagem: string;
  imagemCapa: string;
  descricao: string;
  pontosTuristicos: PontoTuristico[];
  // Podemos adicionar outros campos que vimos no design depois
  // atividadesSugeridas: any[];
  // dicasLocais: any[];
}
