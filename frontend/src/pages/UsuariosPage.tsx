
import React from 'react';
import UserListCard from '@/components/publications/UserListCard';
import UserStatsCard from '@/components/publications/UserStatsCard';
import RecentActivitiesCard from '@/components/publications/RecentActivitiesCard';
import QuickActionsCard from '@/components/publications/QuickActionsCard';
import SecurityTipCard from '@/components/publications/SecurityTipCard';

const UsuariosPage: React.FC = () => {
  return (
    <div className="p-6 font-sans bg-gradient-to-br from-neutral-50 to-neutral-100 min-h-screen">
      {/* O cabeçalho <header class="mb-6"> foi removido conforme solicitado */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <UserListCard />
        <div className="md:col-span-1 space-y-5">
          <UserStatsCard />
          <RecentActivitiesCard />
          <QuickActionsCard />
        </div>
      </div>
      <SecurityTipCard />
    </div>
  );
};

export default UsuariosPage;
