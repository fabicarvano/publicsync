import React from 'react';
import UserActions from './UserActions';
import { UserData } from './UserTableRow.types'; // Você pode manter esse tipo no mesmo arquivo se preferir.

interface UserTableRowProps {
  user: UserData;
  onUserStatusChange: (userId: string, isActive: boolean) => void;
  onUserDeleted?: (userId: string) => void;
}

const UserTableRow: React.FC<UserTableRowProps> = ({ user, onUserStatusChange, onUserDeleted }) => {
  return (
    <tr className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
      {/* Nome e avatar */}
      <td className="px-4 py-3">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full overflow-hidden bg-neutral-200 mr-3 flex-shrink-0">
            <img
              src={user.avatar || "/user.jpg"}
              alt={user.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <div className="font-medium">{user.name}</div>
            <div className="text-xs text-neutral-500">{user.username}</div>
          </div>
        </div>
      </td>

      {/* Email */}
      <td className="px-4 py-3 text-sm">{user.email}</td>

      {/* Função */}
      <td className="px-4 py-3">
        <span className={`px-2 py-1 text-xs rounded-full ${
          user.role === 'Administrador' ? 'bg-primary-100 text-primary-700' :
          user.role === 'Editor' ? 'bg-blue-100 text-blue-700' :
          user.role === 'Visualizador' ? 'bg-green-100 text-green-700' :
          'bg-amber-100 text-amber-700'
        }`}>
          {user.role}
        </span>
      </td>

      {/* Status Online/Offline */}
      <td className="px-4 py-3">
        <div className="flex items-center space-x-1">
          <span className={`w-2 h-2 rounded-full ${user.status === 'Online' ? 'bg-green-500' : 'bg-neutral-400'}`}></span>
          <span className="text-xs">{user.status}</span>
        </div>
      </td>

      {/* Último acesso */}
      <td className="px-4 py-3 text-sm">{user.lastAccess}</td>

      {/* Ações */}
      <td className="px-4 py-3">
        <UserActions
          userId={user.id}
          isActive={user.isActive}
          onStatusChange={(isActive) => onUserStatusChange(user.id, isActive)}
          onUserDeleted={onUserDeleted}
        />
      </td>
    </tr>
  );
};

export default UserTableRow;
