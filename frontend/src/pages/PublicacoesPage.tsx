import React from 'react';
import StatusCardsGrid from '@/components/publications/StatusCardsGrid';
import CreatePublicationButton from '@/components/publications/CreatePublicationButton';
import RecentPublicationsSection from '@/components/publications/RecentPublicationsSection';
import RecentPublicationList from '@/components/publications/RecentPublicationsList'; // <--- IMPORTADO AQUI

const PublicacoesPage: React.FC = () => {
  return (
    <div>
      <StatusCardsGrid />
      <CreatePublicationButton />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna principal */}
        <div className="lg:col-span-2">
          <RecentPublicationsSection />
        </div>

        {/* Barra lateral com publicações recentes simples */}
        <div className="lg:col-span-1 space-y-6">
          <RecentPublicationList />
        </div>
      </div>
    </div>
  );
};

export default PublicacoesPage;
