import React, { useState } from 'react';
import UserActions from './UserActions';
import { UserData } from './UserTableRow.types';

interface UserTableRowProps {
  user: UserData;
  onUserStatusChange: (userId: string, isActive: boolean) => void;
  onUserDeleted?: (userId: string) => void;
  onEditUser?: (user: UserData) => void;
}

const UserTableRow: React.FC<UserTableRowProps> = ({
  user,
  onUserStatusChange,
  onUserDeleted,
  onEditUser
}) => {
  const [ativo, setAtivo] = useState(user.isActive); // controle local

  return (
    <tr className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
      <td className="px-4 py-3">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full overflow-hidden bg-neutral-200 mr-3 flex-shrink-0">
            <img src={user.avatar || "/user.jpg"} alt={user.name} className="h-full w-full object-cover" />
          </div>
          <div>
            <div className="font-medium">{user.name}</div>
            <div className="text-xs text-neutral-500">{user.username}</div>
          </div>
        </div>
      </td>

      <td className="px-4 py-3 text-sm">{user.email}</td>

       <td className="px-4 py-3">
         <span className={`px-2 py-1 text-xs rounded-full ${
            user.role === 'admin' ? 'bg-red-100 text-red-700' :
            user.role === 'usuario' ? 'bg-blue-100 text-blue-700' :
           'bg-amber-100 text-amber-700'
         }`}>
       {user.role}
     </span>
   </td>
      <td className="px-4 py-3">
        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
          ativo ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
        }`}>
          {ativo ? 'Ativo' : 'Inativo'}
        </span>
      </td>

      <td className="px-4 py-3 text-sm">{user.lastAccess}</td>

      <td className="px-4 py-3">
        <UserActions
          userId={user.id}
          isActive={ativo}
          onStatusChange={(novoStatus) => {
            setAtivo(novoStatus); // ATUALIZA O SWITCH
            onUserStatusChange(user.id, novoStatus); // AVISA O PAI
          }}
          onUserDeleted={onUserDeleted}
          onEdit={() => onEditUser?.(user)}
        />
      </td>
    </tr>
  );
};

export default UserTableRow;
