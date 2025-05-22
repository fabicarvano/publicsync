import React, { useEffect, useState } from 'react';
import api from '@/services/api';
import TagInformativeIcon from '@/components/icons/TagInformativeIcon';
import TagAnalysisIcon from '@/components/icons/TagAnalysisIcon';
import TagEducationalIcon from '@/components/icons/TagEducationalIcon';
import PublicationItem from './PublicationItem';

const PublicationsList: React.FC = () => {
  const [publicacoes, setPublicacoes] = useState<any[]>([]);

  useEffect(() => {
    const fetchPublicacoes = async () => {
      try {
        const response = await api.get('/publicacoes?skip=0&limit=10');
        setPublicacoes(response.data);
      } catch (error) {
        console.error('Erro ao buscar publicações:', error);
      }
    };

    fetchPublicacoes();
  }, []);

const montarTags = (pub: any) => {
  const todasTags = [];

  if (pub.tom) {
    todasTags.push({
      nome: pub.tom,
      corDeFundo: 'bg-indigo-100',
      corTexto: 'text-indigo-700',
      Icone: TagInformativeIcon,
    });
  }

  if (pub.tipo) {
    todasTags.push({
      nome: pub.tipo,
      corDeFundo: 'bg-yellow-100',
      corTexto: 'text-yellow-700',
      Icone: TagAnalysisIcon,
    });
  }

  if (pub.objetivo) {
    todasTags.push({
      nome: pub.objetivo,
      corDeFundo: 'bg-green-100',
      corTexto: 'text-green-700',
      Icone: TagEducationalIcon,
    });
  }

  return todasTags;
};

  return (
     <div className="flex flex-col gap-4">
      {publicacoes.map((pub, index) => (
        <PublicationItem
          key={index}
          tema={pub.tema}
          descricao={pub.descricao || 'Sem descrição'}
          status={pub.status}
          curtidas={pub.curtidas || 0}
          comentarios={pub.comentarios || 0}
          visualizacoes={pub.visualizacoes || 0}
          data_publicacao={pub.data_publicacao}
          link_publicacao={pub.link_publicacao}
          imagem={pub.imagem}
          tags={montarTags(pub)}
        />
      ))}
    </div>
  );
};

export default PublicationsList;
