import React, { useEffect, useState } from 'react';
import api from '@/services/api';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pt-br';

dayjs.extend(relativeTime);
dayjs.locale('pt-br');

type Activity = {
  usuario: string;
  acao: string;
  tipo: string;
  data: string;
};

const RecentActivitiesCard: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await api.get('/atividades/recentes');
        setActivities(response.data);
      } catch (error) {
        console.error('Erro ao buscar atividades recentes:', error);
      }
    };

    fetchActivities();
  }, []);

  const getBorderColor = (tipo: string) => {
    switch (tipo) {
      case 'usuario':
        return 'border-green-500';
      case 'sistema':
        return 'border-purple-500';
      case 'publicacao':
        return 'border-blue-500';
      default:
        return 'border-gray-300';
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-lg font-semibold mb-3 text-primary-800 border-b pb-2">Atividades Recentes</h3>
      <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
        {activities.slice(0, 30).map((activity, index) => (
          <div key={index} className={`border-l-2 ${getBorderColor(activity.tipo)} pl-3 py-1`}>
            <div className="text-sm">
              <span className="font-medium">{activity.usuario}</span>
              <span className="text-neutral-600"> {activity.acao}</span>
            </div>
            <div className="text-xs text-neutral-500">
              {dayjs(activity.data + 'Z').fromNow()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivitiesCard;
