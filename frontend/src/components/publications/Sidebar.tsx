
import React from 'react';
import PublicationStats from './PublicationStats';
import RecentPublicationsList from './RecentPublicationsList';

const Sidebar: React.FC = () => {
  return (
    <div className="md:col-span-1 space-y-5">
      <PublicationStats />
      <RecentPublicationsList />
    </div>
  );
};

export default Sidebar;
