import React, { useState, useEffect } from 'react';
import UserSearchAdd from './UserSearchAdd';
import UserTable from './UserTable';
import PaginationControls from './PaginationControls';
import NewUserModal from './NewUserModal';
import { UserData } from './UserTableRow';
import api from '@/services/api';

const ITEMS_PER_PAGE = 5;

const UserListCard: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = async () => {
  try {
    const response = await api.get("/usuarios");

    // Ajuste: adiciona status baseado no isActive
    const usuariosAtualizados = response.data.map((usuario: any) => ({
      ...usuario,
      status: usuario.isActive ? "Ativo" : "Inativo",
    }));

    setUsers(usuariosAtualizados);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
  }
};


  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);

  const paginatedUsers = users.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleUserStatusChange = async (userId: string, isActive: boolean) => {
  try {
    await api.put(`/usuarios/status/${userId}`, { ativo: isActive ? 1 : 2 });
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId
          ? { ...user, isActive, status: isActive ? 'Ativo' : 'Inativo' }
          : user
      )
    );
  } catch (error) {
    console.error("Erro ao atualizar status do usuário:", error);
    alert("Erro ao atualizar status do usuário.");
  }
};


  const handleUserDeleted = (userId: string) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
  };

  const handleUserCreated = (novoUsuario: UserData) => {
    setUsers(prevUsers => [...prevUsers, novoUsuario]);
    setIsModalOpen(false);
  };

  return (
    <div className="md:col-span-2 lg:col-span-3 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <UserSearchAdd onOpenModal={() => setIsModalOpen(true)} />
      <UserTable
        users={paginatedUsers}
        onUserStatusChange={handleUserStatusChange}
        onUserDeleted={handleUserDeleted}
      />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={ITEMS_PER_PAGE}
        totalItems={users.length}
        onPageChange={setCurrentPage}
      />
      <NewUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUserCreated={handleUserCreated}
      />
    </div>
  );
};

export default UserListCard;
