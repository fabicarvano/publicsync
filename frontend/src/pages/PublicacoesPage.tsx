import React, { useEffect, useState } from 'react';
import StatusCardsGrid from '@/components/publications/StatusCardsGrid';
import CreatePublicationButton from '@/components/publications/CreatePublicationButton';
import RecentPublicationsSection from '@/components/publications/RecentPublicationsSection';
import RecentPublicationList from '@/components/publications/RecentPublicationsList';
import axios from 'axios';

const PublicacoesPage: React.FC = () => {
  const [resumo, setResumo] = useState<null | {
    publicadas: number;
    agendadas: number;
    pendentes: number;
    interacoes: number;
  }>(null);

  useEffect(() => {
    const fetchResumo = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://192.168.0.15:8000/publicacoes/resumo', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setResumo(response.data);
      } catch (error) {
        console.error('Erro ao buscar resumo:', error);
      }
    };

    fetchResumo();
  }, []);

  return (
    <div>
      {resumo ? (
        <StatusCardsGrid resumo={resumo} />
      ) : (
        <p className="text-center text-gray-500 mb-4">Carregando estatísticas...</p>
      )}

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
