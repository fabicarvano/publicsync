
import React from 'react';
import TrashIcon from '@/components/icons/TrashIcon';
import ArrowRightIcon from '@/components/icons/ArrowRightIcon';
import ArchiveBoxArrowDownIcon from '@/components/icons/ArchiveBoxArrowDownIcon';
import DownloadIcon from '@/components/icons/DownloadIcon';
import { Switch } from "@/components/ui/switch"; // Using shadcn Switch

const SystemMaintenanceSection: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-5">Manutenção do Sistema</h2>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-700">Cache do Sistema</h3>
            <p className="text-sm text-gray-500">Última limpeza: 2 dias atrás</p>
          </div>
          <button className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors">
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <h3 className="font-medium text-gray-700 mb-3">Logs do Sistema</h3>
          <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600 max-h-40 overflow-y-auto">
            <p className="mb-1">
              <span className="text-green-600 font-mono">[10:45:23]</span> API do LinkedIn conectada com sucesso
            </p>
            <p className="mb-1">
              <span className="text-yellow-600 font-mono">[09:32:15]</span> Aviso: taxa de requisições se aproximando do limite
            </p>
            <p className="mb-1">
              <span className="text-gray-500 font-mono">[08:15:07]</span> Automação iniciada
            </p>
            <p className="mb-1">
              <span className="text-gray-500 font-mono">[07:00:00]</span> Sistema iniciado
            </p>
          </div>
          <button className="mt-2 text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center">
            <span>Ver todos os logs</span>
            <ArrowRightIcon className="w-4 h-4 ml-1" />
          </button>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <h3 className="font-medium text-gray-700 mb-3">Backup de Dados</h3>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="w-10 h-10 flex-shrink-0 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <ArchiveBoxArrowDownIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Backup automático</p>
                <p className="text-sm text-gray-500">Próximo: 12 horas</p>
              </div>
            </div>
            {/* Original HTML had a custom toggle. Using shadcn Switch for consistency if available or a simple checkbox. */}
            {/* For now, let's use shadcn's Switch component. Ensure it's installed or adapt. */}
            <Switch id="automatic-backup-toggle" defaultChecked />
          </div>
          <button className="w-full py-2 mt-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center justify-center">
            <DownloadIcon className="w-5 h-5 mr-2" />
            Download do backup
          </button>
        </div>
      </div>
    </div>
  );
};

export default SystemMaintenanceSection;

