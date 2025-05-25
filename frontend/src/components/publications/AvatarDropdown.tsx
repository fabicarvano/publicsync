import React from 'react';
import { useUserInfo } from '@/hooks/useUserInfo';
import { LogOut, Pencil, Link2Off } from 'lucide-react';

const AvatarDropdown: React.FC = () => {
  const { user } = useUserInfo() || {};

  return (
    <div className="w-64 bg-white rounded-2xl shadow-lg p-4 border text-sm text-neutral-700 space-y-4">
      {/* Avatar + Nome + Perfil */}
      <div className="flex flex-col items-center space-y-2">
        <img
          src={user?.avatar || '/public/user.jpg'}
          alt="Avatar"
          className="w-16 h-16 rounded-full border-2 border-blue-500 object-cover"
        />
        <div className="text-center">
          <p className="font-semibold text-sm">{user?.nome || 'Usuário'}</p>
          <p className="text-xs text-muted-foreground capitalize">{user?.perfil || 'perfil'}</p>
        </div>
      </div>

      {/* Status Conexão */}
      <div className="flex items-center justify-between text-neutral-500">
        <div className="flex items-center gap-1 text-xs">
          <Link2Off size={14} /> Desconectado
        </div>
        <div className="flex gap-2">
          <Pencil size={14} className="cursor-pointer hover:text-blue-500" />
          <LogOut size={14} className="cursor-pointer hover:text-red-500" />
        </div>
      </div>

      {/* Créditos de IA */}
      <div className="bg-neutral-100 px-3 py-2 rounded-xl">
        <div className="flex justify-between items-center mb-1 text-xs font-semibold">
          <span>Créditos de IA</span>
          <span className="text-neutral-400">3/10</span>
        </div>
        <div className="w-full bg-neutral-300 h-1 rounded-full">
          <div className="bg-purple-500 h-1 rounded-full" style={{ width: '30%' }} />
        </div>
      </div>

      {/* Publicações resumo */}
      <div className="flex justify-between text-xs font-medium px-1">
        <span className="text-green-600">Publicadas</span>
        <span className="text-blue-600">Agendadas</span>
        <span className="text-yellow-500">Pendentes</span>
      </div>
    </div>
  );
};

export default AvatarDropdown;
