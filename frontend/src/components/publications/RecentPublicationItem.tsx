
import React from 'react';

interface RecentPublicationItemProps {
  title: string;
  status: 'Publicado' | 'Agendado' | 'Rascunho';
  description: string;
  platform: string;
  time: string;
}

const statusColors = {
  Publicado: 'bg-green-100 text-green-800',
  Agendado: 'bg-blue-100 text-blue-800',
  Rascunho: 'bg-amber-100 text-amber-800',
};

const RecentPublicationItem: React.FC<RecentPublicationItemProps> = ({ title, status, description, platform, time }) => {
  return (
    <div
      className="border border-neutral-200 rounded-lg p-3 hover:border-primary-300 hover:shadow-sm transition-all cursor-pointer font-body"
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium">{title}</h4>
        <span className={`text-xs px-2 py-1 ${statusColors[status]} rounded-full`}>
          {status}
        </span>
      </div>
      <p className="text-sm text-neutral-600 truncate">{description}</p>
      <div className="flex justify-between text-xs text-neutral-500 mt-2">
        <span>{platform}</span> <span>{time}</span>
      </div>
    </div>
  );
};

export default RecentPublicationItem;
