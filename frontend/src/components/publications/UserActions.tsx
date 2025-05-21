import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import api from "@/services/api";

interface UserActionsProps {
  userId: string;
  isActive: boolean;
  onStatusChange: (isActive: boolean) => void;
  onUserDeleted?: (userId: string) => void;
  onEdit?: () => void; // nova prop
}

const UserActions: React.FC<UserActionsProps> = ({ userId, isActive, onStatusChange, onUserDeleted, onEdit }) => {
  const handleDelete = async () => {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
      try {
        await api.delete(`/usuarios/${userId}`);
        alert("Usuário deletado com sucesso.");
        if (onUserDeleted) {
          onUserDeleted(userId);
        }
      } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        alert("Erro ao deletar usuário.");
      }
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        className="text-gray-500 hover:text-blue-600 transition"
        onClick={onEdit} // chama função de edição
      >
        <Pencil size={18} />
      </button>
      <button
        onClick={handleDelete}
        className="text-gray-500 hover:text-red-600 transition"
      >
        <Trash2 size={18} />
      </button>
      <label className="inline-flex items-center cursor-pointer ml-2">
<input
  type="checkbox"
  className="sr-only peer"
  checked={isActive}
  onChange={async (e) => {
    console.log("Alterando status para", e.target.checked); // <-- Adicione isso
    const novoStatus = e.target.checked ? 1 : 2;

    try {
      await api.put(`/usuarios/status/${userId}`, {
        ativo: novoStatus,
      });

      onStatusChange(e.target.checked);
      window.dispatchEvent(new Event("refreshUserStats"));

    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      alert("Erro ao atualizar o status do usuário.");
    }
  }}
/>

        <div className="w-9 h-5 bg-gray-300 rounded-full peer peer-checked:bg-green-500 relative">
          <div className="dot absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition peer-checked:translate-x-4"></div>
        </div>
      </label>
    </div>
  );
};

export default UserActions;
