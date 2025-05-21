// Exemplo baseado no UserListCard.tsx

import React, { useState, useEffect } from "react";
import NewUserModal from "./NewUserModal";
import UserTable from "./UserTable";
import api from "@/services/api";

const UserListCard: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null); // Novo estado

  const fetchUsers = async () => {
    try {
      const response = await api.get("/usuarios");
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditUser = (user: any) => {
    setUserToEdit(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUserToEdit(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Usuários</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          onClick={() => setIsModalOpen(true)}
        >
          Novo Usuário
        </button>
      </div>
      <UserTable users={users} onEditUser={handleEditUser} onUserUpdated={fetchUsers} />
      <NewUserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onUserCreated={fetchUsers}
        userToEdit={userToEdit} // Propriedade passada para edição
      />
    </div>
  );
};

export default UserListCard;
