import React from 'react';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import IconCalendar from '@/components/icons/IconCalendar';
import IconCheckCircle from '@/components/icons/IconCheckCircle';
import IconAlertTriangle from '@/components/icons/IconAlertTriangle';
import IconThumbsUp from '@/components/icons/IconThumbsUp';
import IconMessageSquare from '@/components/icons/IconMessageSquare';
import IconEye from '@/components/icons/IconEye';
import IconLink from '@/components/icons/IconLink';
import PlayButtonIcon from '@/components/icons/PlayButtonIcon';

interface Tag {
  nome: string;
  corDeFundo: string;
  corTexto: string;
  Icone: React.ElementType;
}

interface PublicationItemProps {
  tema: string;
  descricao: string;
  status: string;
  curtidas: number;
  comentarios: number;
  visualizacoes: number;
  data_publicacao: string;
  link_publicacao?: string;
  imagem?: string;
  tags?: Tag[];
}


const statusColors: Record<string, { bg: string; text: string }> = {
  publicado: { bg: 'bg-green-100', text: 'text-green-700' },
  pendente: { bg: 'bg-gray-100', text: 'text-gray-700' },
  agendado: { bg: 'bg-blue-100', text: 'text-blue-700' },
  em_publicacao: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
};

const PublicationItem: React.FC<PublicationItemProps> = ({
  tema,
  descricao,
  status,
  curtidas,
  comentarios,
  visualizacoes,
  data_publicacao,
  link_publicacao,
  imagem,
  tags = [],
}) => {
  
  console.log('🧪 Renderizando item:', tema);
  console.log('📦 Tags recebidas:', tags);
  
const data = new Date(data_publicacao);
  const hoje = new Date();
  const dataFormatada = format(data, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });

  let StatusIcon = IconCalendar;
  if (status === 'publicado') {
    StatusIcon = IconCheckCircle;
  } else if (data < hoje) {
    StatusIcon = IconAlertTriangle;
  }

  const statusStyle = statusColors[status] || statusColors['pendente'];
 
  console.log('🧩 Tags recebidas:', tags);
     tags.forEach((tag, i) => {
       if (!tag.Icone) {
  console.error(`❌ Tag sem ícone na posição ${i}:`, tag);
  }
  });

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 space-y-3">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-base font-semibold text-gray-800 mb-1">{tema}</h3>
          <p className="text-sm text-gray-600">{descricao}</p>
        </div>
        {imagem && (
          <img src={imagem} alt="Imagem da publicação" className="w-16 h-16 object-cover rounded-md" />
        )}
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
        <div className="flex items-center space-x-1">
          <IconThumbsUp className="w-4 h-4 text-gray-500" />
          <span>{curtidas}</span>
        </div>
        <div className="flex items-center space-x-1">
          <IconMessageSquare className="w-4 h-4 text-gray-500" />
          <span>{comentarios}</span>
        </div>
        <div className="flex items-center space-x-1">
          <IconEye className="w-4 h-4 text-gray-500" />
          <span>{visualizacoes}</span>
        </div>
        <div className={`flex items-center space-x-2 ${statusStyle.text}`}>
          <StatusIcon className={`w-4 h-4`} />
          <span>{dataFormatada}</span>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap pt-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${tag.corDeFundo} ${tag.corTexto}`}
          >
            <tag.Icone className="w-3 h-3" />
            {tag.nome}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center pt-2 border-t border-gray-100">
        {link_publicacao ? (
          <a
            href={link_publicacao}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:underline text-sm"
          >
            <IconLink className="w-4 h-4 mr-1" /> Ver no LinkedIn
          </a>
        ) : (
          <button className="flex items-center text-blue-600 hover:underline text-sm">
            <PlayButtonIcon className="w-4 h-4 mr-1" /> Publicar agora
          </button>
        )}
      </div>
    </div>
  );
};

export default PublicationItem;
