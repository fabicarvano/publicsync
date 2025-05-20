
import React, { useState } from 'react';
import PaperClipIcon from '@/components/icons/PaperClipIcon';
import EyeIcon from '@/components/icons/EyeIcon';
import CheckIcon from '@/components/icons/CheckIcon';
import InfoIcon from '@/components/icons/InfoIcon';

const LinkedInApiConfigSection: React.FC = () => {
  const [showSecret, setShowSecret] = useState(false);

  return (
    <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Configuração da API do LinkedIn</h2>
      </div>
      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="linkedin-client-id" className="block text-sm font-medium text-gray-700">
            Client ID
          </label>
          <div className="flex">
            <input
              type="text"
              id="linkedin-client-id"
              className="flex-1 block w-full rounded-l-lg border-gray-300 shadow-sm border p-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              placeholder="Insira o Client ID da API do LinkedIn"
            />
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 rounded-r-lg border border-gray-300 border-l-0 transition-colors">
              <PaperClipIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="linkedin-client-secret" className="block text-sm font-medium text-gray-700">
            Client Secret
          </label>
          <div className="flex">
            <input
              type={showSecret ? 'text' : 'password'}
              id="linkedin-client-secret"
              className="flex-1 block w-full rounded-l-lg border-gray-300 shadow-sm border p-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              placeholder="••••••••••••••••••••"
            />
            <button
              onClick={() => setShowSecret(!showSecret)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 rounded-r-lg border border-gray-300 border-l-0 transition-colors"
            >
              <EyeIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="linkedin-redirect-uri" className="block text-sm font-medium text-gray-700">
            Redirect URI
          </label>
          <input
            type="text"
            id="linkedin-redirect-uri"
            className="block w-full rounded-lg border-gray-300 shadow-sm border p-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            placeholder="https://sua-aplicacao.com/auth/linkedin/callback"
            defaultValue="https://sua-aplicacao.com/auth/linkedin/callback"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="linkedin-api-tag" className="block text-sm font-medium text-gray-700">
            API Tag
          </label>
          <div className="flex">
            <input
              type="text"
              id="linkedin-api-tag"
              className="flex-1 block w-full rounded-l-lg border-gray-300 shadow-sm border p-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              placeholder="Insira a tag da API do LinkedIn"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg transition-colors flex items-center">
              <CheckIcon className="w-5 h-5 mr-1" />
              Verificar
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg text-blue-700 text-sm">
          <InfoIcon className="w-5 h-5 flex-shrink-0" />
          <p>
            A API do LinkedIn requer verificação a cada 60 dias. Última verificação: <span className="font-semibold">10/05/2023</span>
          </p>
        </div>
        <div className="pt-4 border-t border-gray-200 flex space-x-3">
          <button className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
            Salvar configurações
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkedInApiConfigSection;

