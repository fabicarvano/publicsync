
import React from 'react';
import PublicationIcon from './PublicationIcon';

const ContentPreview: React.FC = () => {
  return (
    <div className="border rounded-lg p-4 bg-white">
      <h3 className="font-medium mb-3 flex items-center text-primary-700 font-body">
        <PublicationIcon name="preview" className="mr-1" size={20} /> Prévia do conteúdo
      </h3>
      <div
        className="prose-sm prose-neutral max-w-none h-48 overflow-y-auto p-3 bg-white rounded-lg border border-neutral-200 font-body"
      >
        <p>
          A tecnologia está revolucionando a forma como interagimos com o mundo ao nosso
          redor. Nosso novo produto visa simplificar seu dia a dia, trazendo soluções
          inteligentes para problemas comuns.
        </p>
        <p>
          Descubra como você pode otimizar seus processos e economizar tempo com apenas
          alguns cliques. Nossa abordagem inovadora combina facilidade de uso com recursos
          avançados que atendem às suas necessidades específicas.
        </p>
        <p>
          Junte-se a milhares de usuários satisfeitos que já transformaram sua experiência
          diária com nossa solução. Estamos comprometidos em fornecer suporte contínuo e
          atualizações regulares para garantir que você sempre tenha acesso às melhores
          ferramentas disponíveis.
        </p>
      </div>
    </div>
  );
};

export default ContentPreview;
