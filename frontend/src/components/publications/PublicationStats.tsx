
import React from 'react';
import PublicationIcon from './PublicationIcon';
import { Button } from '@/components/ui/button';

const PublicationStats: React.FC = () => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-lg font-semibold mb-3 text-primary-800 border-b pb-2 font-title">
        Status Publicações
      </h3>
      <div className="space-y-4 font-body">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">Total</h4>
          <span className="font-bold text-lg">24</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
            <h4>Publicadas</h4>
          </div>
          <span className="font-medium">12</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
            <h4>Agendadas</h4>
          </div>
          <span className="font-medium">8</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-amber-500 mr-2"></span>
            <h4>Rascunhos</h4>
          </div>
          <span className="font-medium">4</span>
        </div>
        <div className="mt-2 pt-2 border-t">
          <Button variant="outline" className="w-full bg-primary-100 text-primary-700 hover:bg-primary-200 border-primary-100 font-body">
            <PublicationIcon name="analytics" className="mr-1" size={18} /> Ver estatísticas
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PublicationStats;
