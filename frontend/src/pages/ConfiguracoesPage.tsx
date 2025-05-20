import React from 'react';
import StatusCard from '@/components/publications/StatusCard';
import LinkedInApiConfigSection from '@/components/publications/LinkedInApiConfigSection';
import SystemMaintenanceSection from '@/components/publications/SystemMaintenanceSection';
import XIcon from '@/components/icons/XIcon';
import MoreHorizontalIcon from '@/components/icons/MoreHorizontalIcon';
import ClockIcon from '@/components/icons/ClockIcon';

const ConfiguracoesPage: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-white font-sans p-4 md:p-8">
      {/* Header content (title and subtitle) moved here from the HTML's header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 font-title">Configurações</h1>
        <p className="text-gray-500 font-body">Gerencie as configurações da sua aplicação e integrações</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatusCard
          title="Status da Aplicação"
          statusText="Offline"
          statusColorClass="text-red-600"
          IconComponent={XIcon}
          description="Alguns serviços estão com problemas"
          iconContainerColorClass="bg-red-100"
          iconColorClass="text-red-500"
        />
        <StatusCard
          title="Status do Backend"
          statusText="Conectado"
          statusColorClass="text-green-600"
          IconComponent={MoreHorizontalIcon}
          description="API respondendo em menos de 100ms"
          iconContainerColorClass="bg-green-100"
          iconColorClass="text-green-500"
        />
        <StatusCard
          title="Automação"
          statusText="Modo espera"
          statusColorClass="text-amber-600"
          IconComponent={ClockIcon}
          description="Aguardando próxima execução agendada"
          iconContainerColorClass="bg-amber-100"
          iconColorClass="text-amber-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <LinkedInApiConfigSection />
        <SystemMaintenanceSection />
      </div>
    </div>
  );
};

export default ConfiguracoesPage;
