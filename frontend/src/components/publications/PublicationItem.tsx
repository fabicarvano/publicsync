import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import IconImage from '@/components/icons/IconImage';
import IconCalendar from '@/components/icons/IconCalendar';
import IconCheckCircle from '@/components/icons/IconCheckCircle';
import IconAlertTriangle from '@/components/icons/IconAlertTriangle';
import IconThumbsUp from '@/components/icons/IconThumbsUp';
import IconMessageSquare from '@/components/icons/IconMessageSquare';
import IconEye from '@/components/icons/IconEye';
import LinkedinIcon from '@/components/icons/LinkedinIcon';
import EditIcon from '@/components/icons/EditIcon';
import PlayButtonIcon from '@/components/icons/PlayButtonIcon';
import IconLinkedin from '@/components/icons/IconLinkedin';


interface Tag {
  nome: string;
  corDeFundo: string;
  corTexto: string;
  Icone: React.ElementType;
}

interface PublicationItemProps {
  tema: string;
  resposta: string;
  status: string;
  curtidas: number;
  comentarios: number;
  visualizacoes: number;
  data_publicacao: string;
  imagem_path?: string;
  tags?: Tag[];
  linkedin_url?: string;
}

const statusColors: Record<string, { bg: string; text: string }> = {
  publicado: { bg: 'bg-green-100', text: 'text-green-700' },
  pendente: { bg: 'bg-gray-100', text: 'text-gray-700' },
  agendado: { bg: 'bg-blue-100', text: 'text-blue-700' },
};

const PublicationItem: React.FC<PublicationItemProps> = ({
  tema,
  resposta,
  status,
  curtidas,
  comentarios,
  visualizacoes,
  data_publicacao,
  imagem_path,
  tags = [],
  linkedin_url,
}) => {
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

  return (
    <div className="relative bg-white border border-gray-200 rounded-lg shadow-sm p-4 space-y-3">
      <span
        className={`absolute top-2 right-2 px-3 py-1 text-xs font-semibold rounded-full ${statusStyle.bg} ${statusStyle.text}`}
      >
        {status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Sem status'}
      </span>

      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-base font-semibold text-gray-800 mb-1">{tema}</h3>
          <p className="text-sm text-gray-600">{resposta}</p>
        </div>

        {imagem_path && (
          <a
            href={`http://192.168.0.15:8000${imagem_path}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:underline text-sm flex items-center ml-2"
            title="Ver imagem da publicação"
          >
            <IconImage className="w-5 h-5 mr-1" />
            Ver imagem
          </a>
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
          <StatusIcon className="w-4 h-4" />
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
  {status.toLowerCase() === 'publicado' && linkedin_url ? (
    <a
      href={linkedin_url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center text-blue-600 hover:underline text-sm"
    >
      <IconLinkedin className="w-4 h-4 mr-1" /> Ver no LinkedIn
    </a>
  ) : status.toLowerCase() !== 'publicado' ? (
    <div className="flex gap-4">
      <button className="flex items-center text-green-800 hover:underline text-sm">
        <PlayButtonIcon className="w-4 h-4 mr-1" /> Publicar agora
      </button>

      {['agendado', 'pendente'].includes(status.toLowerCase()) && (
        <button className="flex items-center text-blue-700 hover:underline text-sm">
          <EditIcon className="w-4 h-4 mr-1" /> Editar
        </button>
      )}
    </div>
  ) : null}
</div>
    </div>
  );
};

export default PublicationItem;
