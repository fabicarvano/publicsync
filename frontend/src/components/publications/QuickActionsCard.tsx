
import React from 'react';
import { Users, Download, Mail } from 'lucide-react'; // Users for group_add
import { Button } from '@/components/ui/button';

const actions = [
  { label: "Importar usuários", icon: Users },
  { label: "Exportar relatório", icon: Download },
  { label: "Enviar mensagem", icon: Mail },
];

const QuickActionsCard: React.FC = () => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-lg font-semibold mb-3 text-primary-800 border-b pb-2">Ações Rápidas</h3>
      <div className="space-y-3">
        {actions.map((action, index) => (
          <Button key={index} variant="outline" className="w-full py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors flex items-center justify-center">
            <action.icon className="mr-1 h-5 w-5" /> {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsCard;
