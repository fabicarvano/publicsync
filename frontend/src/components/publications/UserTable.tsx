import React, { useEffect, useState } from 'react';
import api from '@/services/api';
import UserTableRow from './UserTableRow';
import { UserData } from './UserTableRow.types';

const UserTable: React.FC = () => {
  const [usuarios, setUsuarios] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    setLoading(true);
    api
      .get('/usuarios')
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => {
        console.error('Erro ao carregar usuários:', error);
      })
      .finally(() => setLoading(false));
  }, [refreshTrigger]);

  const handleStatusChange = (userId: string, isActive: boolean) => {
    setUsuarios((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, isActive, status: isActive ? 'Ativo' : 'Inativo' } : u
      )
    );
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleUserDeleted = (userId: string) => {
    setUsuarios((prev) => prev.filter((u) => u.id !== userId));
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="overflow-x-auto">
      {loading ? (
        <p className="text-center py-4">Carregando usuários...</p>
      ) : (
        <table className="min-w-full divide-y divide-neutral-200">
          <thead className="bg-neutral-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold text-neutral-600 uppercase">Usuário</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-neutral-600 uppercase">Email</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-neutral-600 uppercase">Perfil</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-neutral-600 uppercase">Status</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-neutral-600 uppercase">Último acesso</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-neutral-600 uppercase">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-100">
            {usuarios.map((user) => (
              <UserTableRow
                key={user.id}
                user={user}
                onUserStatusChange={handleStatusChange}
                onUserDeleted={handleUserDeleted}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserTable;
