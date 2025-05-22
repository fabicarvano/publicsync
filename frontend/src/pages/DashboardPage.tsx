import React, { useEffect, useState } from 'react';
import StatusCardsGrid from '@/components/publications/StatusCardsGrid';
import axios from 'axios';

const DashboardPage: React.FC = () => {
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
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Bem-vindo ao seu Dashboard!</h2>
      <p className="text-gray-600 mb-8">
        Aqui você pode ter uma visão geral das suas atividades e publicações.
      </p>

      {resumo ? (
        <StatusCardsGrid resumo={resumo} />
      ) : (
        <p className="text-center text-gray-500 mb-4">Carregando estatísticas...</p>
      )}

      <div className="mt-8 p-6 bg-white rounded-xl shadow-md border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Próximos Passos</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Explore a seção de <a href="/publicacoes" className="text-blue-600 hover:underline">Publicações</a> para gerenciar seu conteúdo.</li>
          <li>Configure seu <a href="/agendamento" className="text-blue-600 hover:underline">Agendamento</a> de posts.</li>
          <li>Adicione ou gerencie <a href="/usuarios" className="text-blue-600 hover:underline">Usuários</a>.</li>
          <li>Faça suas publicações para que possamos analisar tendências e dados, e gerar dashboards personalizados para você.</li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardPage;
