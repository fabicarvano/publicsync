
import React from 'react';
import PublicationIcon from './PublicationIcon';

const PubliSyncTip: React.FC = () => {
  return (
    <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-100">
      <h3 className="text-sm font-medium mb-2 text-primary-700 flex items-center font-body">
        <PublicationIcon name="lightbulb" className="mr-1 text-sm" size={16} /> Dica do PubliSync
      </h3>
      <p className="text-sm text-neutral-600 font-body">
        Publicações com imagens têm, em média, 2.3x mais engajamento. Utilize imagens de alta qualidade
        para aumentar o alcance do seu conteúdo.
      </p>
    </div>
  );
};

export default PubliSyncTip;
