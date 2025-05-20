import React from 'react';
import PublicationForm from '@/components/publications/PublicationForm';
import PublicationStats from '@/components/publications/PublicationStats';
import RecentPublicationList from '@/components/publications/RecentPublicationsList';
import PubliSyncTip from '@/components/publications/PubliSyncTip';

const CadastroPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div className="md:col-span-2 lg:col-span-3 space-y-6">
          <PublicationForm />
        </div>

        {/* Barra lateral */}
        <div className="md:col-span-1 space-y-6">
          <PublicationStats />
          <RecentPublicationList />
        </div>
      </div>

      <PubliSyncTip />
    </div>
  );
};

export default CadastroPage;
