import React, { useState, useEffect } from 'react';
import { X, Eye, EyeOff, Info } from 'lucide-react';
import api from '@/services/api';

interface NewUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserCreated: () => void;
  userToEdit?: {
    id: string;
    nome: string;
    email: string;
    perfil: string;
  };
}

const NewUserModal: React.FC<NewUserModalProps> = ({ isOpen, onClose, onUserCreated, userToEdit }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [perfil, setPerfil] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (userToEdit) {
      setNome(userToEdit.nome);
      setEmail(userToEdit.email);
      setPerfil(userToEdit.perfil);
    } else {
      setNome("");
      setEmail("");
      setPerfil("");
      setSenha("");
      setConfirmarSenha("");
    }
  }, [userToEdit]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!nome || !email || !perfil || (!userToEdit && (!senha || !confirmarSenha))) {
      alert("Preencha todos os campos.");
      return;
    }

    if (!userToEdit && senha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    try {
      if (userToEdit) {
        await api.put(`/usuarios/${userToEdit.id}`, { nome, email, perfil });
        alert("Usuário atualizado com sucesso!");
      } else {
        await api.post("/usuarios", { nome, email, senha, perfil });
        alert("Usuário criado com sucesso!");
      }
      onUserCreated();
      onClose();
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
      alert("Erro ao salvar usuário.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full mx-auto transform transition-all duration-300 ease-in-out">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 font-lato">{userToEdit ? "Editar Usuário" : "Novo Usuário"}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Fechar modal">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex flex-col space-y-1">
            <label htmlFor="nome" className="text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="block w-full rounded-lg border-gray-300 shadow-sm border p-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              placeholder="Digite o nome completo"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-lg border-gray-300 shadow-sm border p-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              placeholder="exemplo@email.com"
            />
          </div>

          {!userToEdit && (
            <>
              <div className="flex flex-col space-y-1">
                <label htmlFor="senha" className="text-sm font-medium text-gray-700">Senha</label>
                <div className="flex">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="flex-1 block w-full rounded-l-lg border-gray-300 shadow-sm border p-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    placeholder="••••••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 rounded-r-lg border border-gray-300 border-l-0 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div className="flex flex-col space-y-1">
                <label htmlFor="confirmar-senha" className="text-sm font-medium text-gray-700">Confirmar Senha</label>
                <div className="flex">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmar-senha"
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    className="flex-1 block w-full rounded-l-lg border-gray-300 shadow-sm border p-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    placeholder="••••••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 rounded-r-lg border border-gray-300 border-l-0 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="trocar-senha"
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 mr-2 h-4 w-4"
                />
                <label htmlFor="trocar-senha" className="text-sm font-medium text-gray-700">Forçar troca de senha no primeiro acesso</label>
              </div>
            </>
          )}

          <div className="flex flex-col space-y-1">
            <label htmlFor="perfil" className="text-sm font-medium text-gray-700">Perfil</label>
            <select
              id="perfil"
              value={perfil}
              onChange={(e) => setPerfil(e.target.value)}
              className="block w-full rounded-lg border-gray-300 shadow-sm border p-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            >
              <option value="" disabled>Selecione um perfil</option>
              <option value="admin">Administrador</option>
              <option value="usuario">Usuário</option>
            </select>
          </div>

          {!userToEdit && (
            <div className="flex items-center p-3 bg-blue-50 rounded-lg text-blue-700 text-sm mt-4">
              <Info className="w-5 h-5 flex-shrink-0 mr-2" />
              <p>Um email com as instruções de acesso será enviado para o novo usuário.</p>
            </div>
          )}
        </div>
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
          >
            {userToEdit ? "Salvar alterações" : "Criar usuário"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewUserModal;
