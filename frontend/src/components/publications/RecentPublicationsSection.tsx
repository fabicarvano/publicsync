
import React, { useState } from 'react';
import PublicationCard from './PublicationCard';
import IconChevronRight from '../icons/IconChevronRight';
import IconZap from '../icons/IconZap';
import IconInfo from '../icons/IconInfo';
import IconUser from '../icons/IconUser';
import IconBarChart from '../icons/IconBarChart';
import IconTrendingUp from '../icons/IconTrendingUp';
import IconGlobe from '../icons/IconGlobe';

const RecentPublicationsSection: React.FC = () => {
  const [filter, setFilter] = useState('Todas');

  const publications = [
    {
      title: "Dicas de produtividade para profissionais",
      description: "Conteúdo educativo sobre aumento de produtividade",
      tags: [
        { text: "Educativo", icon: <IconZap />, bgColor: "bg-indigo-100", textColor: "text-indigo-700" },
        { text: "Informativo", icon: <IconInfo />, bgColor: "bg-blue-100", textColor: "text-blue-700" },
        { text: "Carreira", icon: <IconUser />, bgColor: "bg-amber-100", textColor: "text-amber-700" },
      ],
      status: "Publicada",
      statusBgColor: "bg-green-100",
      statusTextColor: "text-green-800",
      date: "12/05/2023",
      showImpressions: true,
    },
    {
      title: "Tendências de marketing para 2023",
      description: "Análise de tendências e previsões para o próximo ano",
      tags: [
        { text: "Análise", icon: <IconBarChart />, bgColor: "bg-purple-100", textColor: "text-purple-700" },
        { text: "Marketing", icon: <IconTrendingUp />, bgColor: "bg-green-100", textColor: "text-green-700" },
        { text: "Tendências", icon: <IconGlobe />, bgColor: "bg-pink-100", textColor: "text-pink-700" },
      ],
      status: "Agendada",
      statusBgColor: "bg-blue-100",
      statusTextColor: "text-blue-800",
      date: "18/05/2023",
      showImpressions: true, // HTML mostrava impressões para agendada, mas pode ser condicional
    },
  ];

  const filteredPublications = publications.filter(pub => {
    if (filter === 'Todas') return true;
    return pub.status === filter;
  });

  const filterButtons = ["Todas", "Publicadas", "Agendadas", "Pendentes"];

  return (
    <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 font-lato">Publicações Recentes</h2>
        <div className="flex space-x-2">
          <button className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800 transition-colors">
            <span>Ver tudo</span>
            <IconChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex mb-4 overflow-x-auto space-x-2 pb-2">
        {filterButtons.map(btnFilter => (
          <button
            key={btnFilter}
            onClick={() => setFilter(btnFilter)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === btnFilter
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {btnFilter}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        {filteredPublications.map((pub, index) => (
          <PublicationCard
            key={index}
            title={pub.title}
            description={pub.description}
            tags={pub.tags}
            status={pub.status}
            statusBgColor={pub.statusBgColor}
            statusTextColor={pub.statusTextColor}
            date={pub.date}
            showImpressions={pub.showImpressions}
          />
        ))}
         {filteredPublications.length === 0 && <p className="text-gray-500">Nenhuma publicação encontrada para este filtro.</p>}
      </div>
    </div>
  );
};

export default RecentPublicationsSection;
