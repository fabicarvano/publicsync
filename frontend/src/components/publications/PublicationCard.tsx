
import React from 'react';
import PublicationTag from './PublicationTag';
import IconCalendar from '../icons/IconCalendar';
import IconMessageSquare from '../icons/IconMessageSquare';
import IconHeart from '../icons/IconHeart';
import IconEye from '../icons/IconEye';
import IconLink from '../icons/IconLink';
import IconPlayCircle from '../icons/IconPlayCircle';
import IconEdit from '../icons/IconEdit';
import IconImage from '../icons/IconImage';

// Supondo que os ícones de tag sejam passados como ReactNode
// ou podemos mapear strings para componentes de ícone aqui.
// Por simplicidade, vamos assumir que são passados.

interface Tag {
  text: string;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
}

interface PublicationCardProps {
  title: string;
  description: string;
  tags: Tag[];
  status: string;
  statusBgColor: string;
  statusTextColor: string;
  date: string;
  showImpressions?: boolean; // Para o card "Agendada"
}

const PublicationCard: React.FC<PublicationCardProps> = ({
  title,
  description,
  tags,
  status,
  statusBgColor,
  statusTextColor,
  date,
  showImpressions = true, // Padrão para mostrar, a menos que seja a agendada
}) => {
  return (
    <div className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, index) => (
              <PublicationTag
                key={index}
                text={tag.text}
                icon={tag.icon}
                bgColor={tag.bgColor}
                textColor={tag.textColor}
              />
            ))}
          </div>
        </div>
        <span className={`px-3 py-1 ${statusBgColor} ${statusTextColor} text-xs font-medium rounded-full`}>
          {status}
        </span>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <IconCalendar className="w-4 h-4" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex space-x-2">
            {status !== 'Agendada' && ( // Não mostrar para 'Agendada'
              <button
                className="p-2 text-blue-500 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50"
                title="Comentários"
              >
                <IconMessageSquare className="w-5 h-5" />
              </button>
            )}
            {status !== 'Agendada' && ( // Não mostrar para 'Agendada'
              <button
                className="p-2 text-rose-500 hover:text-rose-600 transition-colors rounded-full hover:bg-rose-50"
                title="Curtidas"
              >
                <IconHeart className="w-5 h-5" />
              </button>
            )}
            {showImpressions && (
              <button
                className="p-2 text-purple-500 hover:text-purple-600 transition-colors rounded-full hover:bg-purple-50"
                title="Impressões"
              >
                <IconEye className="w-5 h-5" />
              </button>
            )}
          </div>
          {status !== 'Agendada' && ( // Não mostrar para 'Agendada'
            <div className="flex space-x-2 border-l border-gray-200 pl-4">
              <button // Alterado para button para consistência, era um div
                className="p-2 text-gray-500 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50 flex items-center"
                title="Copiar link"
              >
                <IconLink className="w-5 h-5" />
              </button>
              <button
                className="p-2 text-green-500 hover:text-green-600 transition-colors rounded-full hover:bg-green-50"
                title="Publicar agora"
              >
                <IconPlayCircle className="w-5 h-5" />
              </button>
              <button
                className="p-2 text-blue-500 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50"
                title="Editar"
              >
                <IconEdit className="w-5 h-5" />
              </button>
            </div>
          )}
           {status !== 'Agendada' && (
            <button // Alterado para button, era div
                className="ml-2 p-2 text-gray-500 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50"
                title="Ver imagem anexada"
            >
                <IconImage className="w-5 h-5" />
            </button>
           )}
        </div>
      </div>
    </div>
  );
};

export default PublicationCard;
