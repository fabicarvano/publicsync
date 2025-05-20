
import React from 'react';
import RecentPublicationItem from './RecentPublicationItem';
import PublicationIcon from './PublicationIcon';
import { Button } from '@/components/ui/button';

const recentPublicationsData = [
  {
    title: "Lançamento do Produto X",
    status: "Publicado" as const,
    description: "Nossa nova linha de produtos está...",
    platform: "Instagram",
    time: "Hoje, 09:30"
  },
  {
    title: "5 Dicas para Produtividade",
    status: "Agendado" as const,
    description: "Descubra como aumentar sua...",
    platform: "LinkedIn",
    time: "Amanhã, 14:00"
  },
  {
    title: "Evento de Tecnologia",
    status: "Rascunho" as const,
    description: "O maior evento do ano está...",
    platform: "Facebook",
    time: "Editado ontem"
  }
];

const RecentPublicationsList: React.FC = () => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-lg font-semibold mb-3 text-primary-800 border-b pb-2 font-title">
        Publicações recentes
      </h3>
      <div className="space-y-4">
        {recentPublicationsData.map((item, index) => (
          <RecentPublicationItem key={index} {...item} />
        ))}
        <div className="mt-1">
          <Button variant="link" className="w-full text-sm text-primary-700 hover:text-primary-800 font-body">
            Ver todas as publicações
            <PublicationIcon name="arrow_forward" className="ml-1" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecentPublicationsList;
