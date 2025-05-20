
import React, { useState } from 'react';
import PublicationIcon from './PublicationIcon';

const AdvancedSettings: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <details className="group border border-neutral-300 rounded-lg" open={isOpen} onToggle={(e) => setIsOpen((e.target as HTMLDetailsElement).open)}>
      <summary
        className="flex justify-between items-center p-4 cursor-pointer list-none bg-neutral-50 hover:bg-neutral-100 rounded-lg transition-colors"
      >
        <span className="font-medium font-body">Configurações avançadas</span>
        <PublicationIcon name={isOpen ? "expand_less" : "expand_more"} className="transform transition-transform" />
      </summary>
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="publication-tone" className="block text-sm font-medium text-neutral-700 mb-1 font-body">
              Tom da publicação
            </label>
            <select
              id="publication-tone"
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all font-body"
            >
              <option value="">Selecione um tom</option>
              <option value="profissional">Profissional</option>
              <option value="casual">Casual</option>
              <option value="inspirador">Inspirador</option>
              <option value="formal">Formal</option>
              <option value="divertido">Divertido</option>
            </select>
          </div>
          <div>
            <label htmlFor="publication-type" className="block text-sm font-medium text-neutral-700 mb-1 font-body">
              Tipo de publicação
            </label>
            <select
              id="publication-type"
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all font-body"
            >
              <option value="">Selecione um tipo</option>
              <option value="artigo">Artigo</option>
              <option value="noticia">Notícia</option>
              <option value="tutorial">Tutorial</option>
              <option value="caso-estudo">Caso de estudo</option>
              <option value="dica">Dica rápida</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-1/2">
            <label htmlFor="publication-goal" className="block text-sm font-medium text-neutral-700 mb-1 font-body">
              Objetivo da publicação
            </label>
            <select
              id="publication-goal"
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all font-body"
            >
              <option value="">Selecione um objetivo</option>
              <option value="awareness">Aumentar visibilidade</option>
              <option value="leads">Gerar leads</option>
              <option value="educacao">Educar a audiência</option>
              <option value="engajamento">Aumentar engajamento</option>
              <option value="vendas">Impulsionar vendas</option>
            </select>
          </div>
          <div className="w-1/2">
            <label
              htmlFor="include-hashtags"
              className="flex items-center justify-between text-sm font-medium text-neutral-700 mb-1 font-body"
            >
              <span>Incluir hashtags</span>
              <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                <input
                  id="include-hashtags"
                  type="checkbox"
                  className="absolute w-6 h-6 transition duration-200 ease-in-out transform bg-white border rounded-full appearance-none cursor-pointer peer border-neutral-300 checked:right-0 checked:border-primary-500 right-6 top-0 checked:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <span
                  className="absolute inset-0 transition duration-200 ease-in-out rounded-full bg-neutral-200 peer-checked:bg-primary-200"
                ></span>
              </div>
            </label>
            <div className="text-xs text-neutral-500 mt-1 font-body">
              A IA irá gerar hashtags relevantes para seu conteúdo
            </div>
          </div>
        </div>
      </div>
    </details>
  );
};

export default AdvancedSettings;
