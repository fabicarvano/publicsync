import React, { useEffect, useState } from 'react';
import PublicationIcon from './PublicationIcon';

const AdvancedSettings: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tons, setTons] = useState<string[]>([]);
  const [tipos, setTipos] = useState<string[]>([]);
  const [objetivos, setObjetivos] = useState<string[]>([]);
  const [publicos, setPublicos] = useState<string[]>([]);

  useEffect(() => {
    fetch('http://192.168.0.15:8000/categorias/tom').then(res => res.json()).then(setTons);
    fetch('http://192.168.0.15:8000/categorias/tipo').then(res => res.json()).then(setTipos);
    fetch('http://192.168.0.15:8000/categorias/objetivo').then(res => res.json()).then(setObjetivos);
    fetch('http://192.168.0.15:8000/categorias/publico').then(res => res.json()).then(setPublicos);
  }, []);

  return (
    <>
      <details className="group border border-neutral-300 rounded-lg" open={isOpen} onToggle={(e) => setIsOpen((e.target as HTMLDetailsElement).open)}>
        <summary className="flex justify-between items-center p-4 cursor-pointer list-none bg-neutral-50 hover:bg-neutral-100 rounded-lg transition-colors">
          <span className="font-medium font-body">Configurações avançadas</span>
          <PublicationIcon name={isOpen ? "expand_less" : "expand_more"} className="transform transition-transform" />
        </summary>

        <div className="p-4 space-y-4">
          {/* Grade superior */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="publication-tone" className="block text-sm font-medium text-neutral-700 mb-1 font-body">Tom da publicação</label>
              <select id="publication-tone" className="w-full px-4 py-2 border border-neutral-300 rounded-lg">
                <option value="">Selecione um tom</option>
                {tons.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="publication-type" className="block text-sm font-medium text-neutral-700 mb-1 font-body">Tipo de publicação</label>
              <select id="publication-type" className="w-full px-4 py-2 border border-neutral-300 rounded-lg">
                <option value="">Selecione um tipo</option>
                {tipos.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="publication-goal" className="block text-sm font-medium text-neutral-700 mb-1 font-body">Objetivo da publicação</label>
              <select id="publication-goal" className="w-full px-4 py-2 border border-neutral-300 rounded-lg">
                <option value="">Selecione um objetivo</option>
                {objetivos.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="publication-publico" className="block text-sm font-medium text-neutral-700 mb-1 font-body">Público-alvo principal</label>
              <select id="publication-publico" className="w-full px-4 py-2 border border-neutral-300 rounded-lg">
                <option value="">Selecione o público</option>
                {publicos.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
          </div>

          {/* Grade de switches em duas colunas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            {/* Coluna Esquerda: Emojis + Hashtags */}
            <div className="flex flex-col gap-4 border p-3 rounded-md shadow-sm">
              <label className="flex items-center justify-between">
                <span className="text-sm font-medium text-neutral-700">Incluir emojis</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" id="emojis" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 transition-colors"></div>
                  <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5"></div>
                </label>
              </label>

              <label className="flex items-center justify-between">
                <span className="text-sm font-medium text-neutral-700">Incluir hashtags na publicação</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" id="include-hashtags" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 transition-colors"></div>
                  <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5"></div>
                </label>
              </label>
            </div>

            {/* Coluna Direita: Impacto + CTA */}
            <div className="flex flex-col gap-4 border p-3 rounded-md shadow-sm">
              <label className="flex items-center justify-between">
                <span className="text-sm font-medium text-neutral-700">Chamada de impacto</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" id="impacto" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 transition-colors"></div>
                  <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5"></div>
                </label>
              </label>

              <label className="flex items-center justify-between">
                <span className="text-sm font-medium text-neutral-700">Call-to-action</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" id="cta" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 transition-colors"></div>
                  <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5"></div>
                </label>
              </label>
            </div>
          </div>
        </div>
      </details>
    </>
  );
};

export default AdvancedSettings;
