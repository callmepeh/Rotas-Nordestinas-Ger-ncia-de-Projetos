// src/components/home/FeaturesSection.tsx
import React from "react";
import InfoCard from "./InfoCard";
import "../home/FeaturesSections.css";

import iconRotas from "../../assets/icons/ticket.svg";
import iconAtividades from "../../assets/icons/hot-air-balloon.svg";
import iconColaboradores from "../../assets/icons/diamond.svg";
import iconFeedbacks from "../../assets/icons/medal.svg";

const featuresData = [
  {
    icon: iconRotas,
    title: "Rotas Exclusivas",
    text: "Explore rotas personalizadas que vão desde os destinos mais conhecidos até os tesouros escondidos do Nordeste.",
  },
  {
    icon: iconAtividades,
    title: "Atividades e Experiências",
    text: "Mergulhe na cultura nordestina com atividades selecionadas para tornar sua viagem ainda mais inesquecível.",
  },
  {
    icon: iconColaboradores,
    title: "Colaboradores Locais",
    text: "Contamos com colaboradores em cada cidade, sempre atualizando nosso site.",
  },
  {
    icon: iconFeedbacks,
    title: "Feedbacks dos Viajantes",
    text: "Veja o que nossos visitantes têm a dizer sobre suas jornadas pelo Nordeste.",
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="features-section">
      <h2 className="features-main-title">
        Descubra o Nordeste além dos roteiros <br />
        convencionais
      </h2>
      <div className="features-grid">
        {featuresData.map((feature) => (
          <InfoCard
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            text={feature.text}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
