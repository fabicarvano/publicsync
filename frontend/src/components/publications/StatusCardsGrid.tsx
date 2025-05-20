
import React from 'react';
import StatusCard from './StatusCard';
import CheckCircleIcon from '@/components/icons/CheckCircleIcon';
import ClockIcon from '@/components/icons/ClockIcon';
import AlertTriangleIcon from '@/components/icons/AlertTriangleIcon';
import ThumbsUpIcon from '@/components/icons/ThumbsUpIcon';

const StatusCardsGrid: React.FC = () => {
  const cardsData = [
    { title: "Publicadas", value: "24", changeText: "↑ 12% desde o mês passado", icon: <CheckCircleIcon />, iconBgColor: "bg-green-100" },
    { title: "Agendadas", value: "8", changeText: "Para os próximos 7 dias", icon: <ClockIcon />, iconBgColor: "bg-blue-100" },
    { title: "Pendentes", value: "5", changeText: "Aguardando edição", icon: <AlertTriangleIcon />, iconBgColor: "bg-yellow-100" },
    { title: "Interações", value: "152", changeText: "Neste mês", icon: <ThumbsUpIcon />, iconBgColor: "bg-purple-100" },
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
