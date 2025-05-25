import React, { useEffect, useState } from 'react';
import api from '@/services/api';
import TagInformativeIcon from '@/components/icons/TagInformativeIcon';
import TagAnalysisIcon from '@/components/icons/TagAnalysisIcon';
import TagEducationalIcon from '@/components/icons/TagEducationalIcon';
import PublicationItem from './PublicationItem';

const PublicationsList: React.FC = () => {
  const [publicacoes, setPublicacoes] = useState<any[]>([]);
  const [skip, setSkip] = useState(0);
  const [temMais, setTemMais] = useState(true);
  const [carregando, setCarregando] = useState(false);
  const limit = 10;

  const fetchPublicacoes = async () => {
    if (carregando || !temMais) return;

    setCarregando(true);
    try {
      const response = await api.get(`/publicacoes?skip=${skip}&limit=${limit}`);
      const novas = response.data;

      if (novas.length < limit) {
        setTemMais(false);
      }

      setPublicacoes((prev) => [...prev, ...novas]);
      setSkip((prev) => prev + limit);
    } catch (error) {
      console.error('Erro ao buscar publicações:', error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
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
          imagem_path={pub.imagem_path}
          tags={montarTags(pub)}
        />
      ))}

      {temMais && (
        <button
          onClick={fetchPublicacoes}
          disabled={carregando}
          className="self-center mt-4 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
        >
          {carregando ? 'Carregando...' : 'Carregar mais'}
        </button>
      )}
    </div>
  );
};

export default PublicationsList;
