import React from "react";
import UserTableRow, { UserData } from "./UserTableRow";

interface UserTableProps {
  users: UserData[];
  onUserStatusChange: (userId: string, isActive: boolean) => void;
  onUserDeleted: (userId: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onUserStatusChange, onUserDeleted }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left font-semibold text-gray-600">Usuário</th>
            <th className="px-4 py-2 text-left font-semibold text-gray-600">Email</th>
            <th className="px-4 py-2 text-left font-semibold text-gray-600">Perfil</th>
            <th className="px-4 py-2 text-left font-semibold text-gray-600">Status</th>
            <th className="px-4 py-2 text-left font-semibold text-gray-600">Último acesso</th>
            <th className="px-4 py-2 text-left font-semibold text-gray-600">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {users?.filter(user => user && user.id).map((user) => (
            <UserTableRow
              key={user.id}
              user={user}
              onUserStatusChange={onUserStatusChange}
              onUserDeleted={onUserDeleted}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
