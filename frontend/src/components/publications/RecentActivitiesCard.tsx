
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const activities = [
  { user: "Ana Silva", action: "fez login no sistema", time: "Há 5 minutos", borderColor: "border-green-500" },
  { user: "Carlos Mendes", action: "alterou suas configurações", time: "Há 30 minutos", borderColor: "border-blue-500" },
  { user: "Júlia Oliveira", action: "atualizou seu avatar", time: "Há 2 horas", borderColor: "border-amber-500" },
  { user: "Administrador", action: "desativou um usuário", time: "Há 1 dia", borderColor: "border-red-500" },
  { user: "Sistema", action: "realizou backup automático", time: "Há 1 dia", borderColor: "border-purple-500" },
];

const RecentActivitiesCard: React.FC = () => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-lg font-semibold mb-3 text-primary-800 border-b pb-2">Atividades Recentes</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className={`border-l-2 ${activity.borderColor} pl-3 py-1`}>
            <div className="text-sm">
              <span className="font-medium">{activity.user}</span>
              <span className="text-neutral-600"> {activity.action}</span>
            </div>
            <div className="text-xs text-neutral-500">{activity.time}</div>
          </div>
        ))}
        <div className="mt-1">
          <Button variant="link" className="w-full py-2 text-sm text-primary-700 hover:text-primary-800 transition-colors flex items-center justify-center">
            Ver todas as atividades
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecentActivitiesCard;
