
import React from 'react';
import { ArrowRight } from 'lucide-react'; // Changed from 'analytics'
import { Button } from '@/components/ui/button';

const UserStatsCard: React.FC = () => {
  const stats = [
    { label: "Total", value: 24, color: "" },
    { label: "Ativos", value: 18, color: "bg-green-500" },
    { label: "Online", value: 8, color: "bg-blue-500" },
    { label: "Novos (7 dias)", value: 3, color: "bg-amber-500" },
    { label: "Inativos", value: 6, color: "bg-red-500" },
  ];

  return (
    <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-lg font-semibold mb-3 text-primary-800 border-b pb-2">Status Usuários</h3>
      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              {stat.color && <span className={`inline-block w-3 h-3 rounded-full ${stat.color} mr-2`}></span>}
              <h4>{stat.label}</h4>
            </div>
            <span className={`font-bold ${index === 0 ? 'text-lg': 'font-medium'}`}>{stat.value}</span>
          </div>
        ))}
        <div className="mt-2 pt-2 border-t">
          <Button variant="ghost" className="w-full py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors flex items-center justify-center">
            <ArrowRight className="mr-1 h-5 w-5" /> Ver relatórios detalhados
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserStatsCard;
