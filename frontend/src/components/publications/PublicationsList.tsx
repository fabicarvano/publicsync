
import React from 'react';
import PublicationItem from './PublicationItem';
import FilterIcon from '@/components/icons/FilterIcon';
import TagEducationalIcon from '@/components/icons/TagEducationalIcon';
import TagInformativeIcon from '@/components/icons/TagInformativeIcon';
import TagCareerIcon from '@/components/icons/TagCareerIcon';
import TagAnalysisIcon from '@/components/icons/TagAnalysisIcon';

const publicationsData = [
  {
    title: "Dicas de produtividade para profissionais",
    description: "Conteúdo educativo sobre aumento de produtividade",
    status: "Publicada", statusBgColor: "bg-green-100", statusTextColor: "text-green-800",
    tags: [
      { name: "Educativo", bgColor: "bg-indigo-100", textColor: "text-indigo-700", icon: <TagEducationalIcon /> },
      { name: "Informativo", bgColor: "bg-blue-100", textColor: "text-blue-700", icon: <TagInformativeIcon /> },
      { name: "Carreira", bgColor: "bg-amber-100", textColor: "text-amber-700", icon: <TagCareerIcon /> },
    ],
    likes: 45, comments: 12, views: 256, date: "12/05/2023"
  },
  {
    title: "Tendências de marketing para 2023",
    description: "Análise de tendências e previsões para o próximo ano",
    status: "Agendada", statusBgColor: "bg-blue-100", statusTextColor: "text-blue-800", // Example different status
    tags: [
      { name: "Análise", bgColor: "bg-purple-100", textColor: "text-purple-700", icon: <TagAnalysisIcon /> },
      // ... more tags for the second item if provided or desired
    ],
    likes: 102, comments: 25, views: 512, date: "15/06/2023"
  }
  // ... more publication items
];


const PublicationsList: React.FC = () => {
  return (
    <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Todas as Publicações</h2>
        <div className="flex space-x-2">
          <button className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800 transition-colors">
            <span>Filtrar</span>
            <FilterIcon />
          </button>
        </div>
      </div>

      <div className="flex mb-4 overflow-x-auto space-x-2 pb-2">
        {["Todas", "Publicadas", "Agendadas", "Pendentes", "Rascunhos"].map((filter, index) => (
          <button 
            key={filter}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              index === 0 
                ? "bg-blue-600 text-white hover:bg-blue-700" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {publicationsData.map((pub, index) => (
          <PublicationItem key={index} {...pub} />
        ))}
        {/* Placeholder for the incomplete item from original code */}
        <div className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-start">
                <div>
                <h3 className="font-medium text-gray-800">Tendências de marketing para 2023 (Exemplo)</h3>
                <p className="text-sm text-gray-500 mt-1">Análise de tendências e previsões para o próximo ano (continuação)</p>
                
                <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full flex items-center">
                        <TagAnalysisIcon />
                        Análise
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full flex items-center">
                        {/* Placeholder for missing icon and text for "bg-green" */}
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Marketing
                    </span>
                </div>
                </div>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">Pendente</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PublicationsList;
