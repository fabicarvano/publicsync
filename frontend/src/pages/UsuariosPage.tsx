
import React from 'react';
import UserListCard from '@/components/publications/UserListCard';
import UserStatsCard from '@/components/publications/UserStatsCard';
import RecentActivitiesCard from '@/components/publications/RecentActivitiesCard';
import SecurityTipCard from '@/components/publications/SecurityTipCard';

const UsuariosPage: React.FC = () => {
return (
  <div className="p-6 font-sans bg-gradient-to-br from-neutral-50 to-neutral-100 min-h-screen">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Coluna principal: tabela de usuários */}
      <div className="lg:col-span-2">
        <UserListCard />
      </div>

      {/* Coluna lateral direita: cards de status e atividades */}
      <div className="space-y-6">
        <UserStatsCard />
        <RecentActivitiesCard />
        <SecurityTipCard />
      </div>

    </div>
  </div>
);
};

export default UsuariosPage;
