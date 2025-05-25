import React, { useEffect, useState } from 'react';
import StatusCardsGrid from '@/components/publications/StatusCardsGrid';
import CreatePublicationButton from '@/components/publications/CreatePublicationButton';
import PublicationsList from '@/components/publications/PublicationsList';
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
        if (!token) return;
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

      <div className="mt-6">
        <PublicationsList />
      </div>
    </div>
  );
};

export default PublicacoesPage;
