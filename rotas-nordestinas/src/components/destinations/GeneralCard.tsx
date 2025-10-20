import React from "react";
import "./GeneralCard.css";

export interface InfoItem {
  id: string;
  imagem: string;
  nome: string;
  descricao: string;
}

interface InfoCardProps {
  item: InfoItem;
}

const InfoCard: React.FC<InfoCardProps> = ({ item }) => {
  return (
    <div className="info-card">
      <img src={item.imagem} alt={item.nome} className="info-card-image" />
      <div className="info-card-content">
        <h3 className="info-card-title">{item.nome}</h3>
        <p className="info-card-description">{item.descricao}</p>
      </div>
    </div>
  );
};

export default InfoCard;
