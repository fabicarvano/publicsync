import React from 'react';
import StatusCard from './StatusCard';
import CheckCircleIcon from '@/components/icons/CheckCircleIcon';
import ClockIcon from '@/components/icons/ClockIcon';
import AlertTriangleIcon from '@/components/icons/AlertTriangleIcon';
import ThumbsUpIcon from '@/components/icons/ThumbsUpIcon';

interface ResumoPublicacoes {
  publicadas: number;
  agendadas: number;
  pendentes: number;
  interacoes: number;
}

const StatusCardsGrid: React.FC<{ resumo: ResumoPublicacoes }> = ({ resumo }) => {
  const cardsData = [
    {
      title: "Publicadas",
      value: resumo.publicadas.toString(),
      changeText: "<criar metricas>",
      icon: <CheckCircleIcon />,
      iconBgColor: "bg-green-100"
    },
    {
      title: "Agendadas",
      value: resumo.agendadas.toString(),
      changeText: "<criar Metricas>",
      icon: <ClockIcon />,
      iconBgColor: "bg-blue-100"
    },
    {
      title: "Pendentes",
      value: resumo.pendentes.toString(),
      changeText: "<criar Metricas>",
      icon: <AlertTriangleIcon />,
      iconBgColor: "bg-yellow-100"
    },
    {
      title: "Interações",
      value: resumo.interacoes.toString(),
      changeText: "<criar Metricas>",
      icon: <ThumbsUpIcon />,
      iconBgColor: "bg-purple-100"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cardsData.map((card, index) => (
        <StatusCard
          key={index}
          title={card.title}
          value={card.value}
          changeText={card.changeText}
          icon={card.icon}
          iconBgColor={card.iconBgColor}
        />
      ))}
    </div>
  );
};

export default StatusCardsGrid;
