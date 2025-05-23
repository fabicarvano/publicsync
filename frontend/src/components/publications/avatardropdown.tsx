import React from "react";
import { LogOut, Pencil, Linkedin } from "lucide-react";

interface AvatarDropdownProps {
  nome: string;
  email: string;
  avatarUrl: string;
  perfil: "Administrador" | "Usuário";
  conectadoLinkedin: boolean;
  creditosUsados: number;
  creditosTotais: number;
  totalPublicadas: number;
  totalAgendadas: number;
  totalPendentes: number;
  onEditarPerfil: () => void;
  onLogout: () => void;
}

const AvatarDropdown: React.FC<AvatarDropdownProps> = ({
  nome,
  email,
  avatarUrl,
  perfil,
  conectadoLinkedin,
  creditosUsados,
  creditosTotais,
  totalPublicadas,
  totalAgendadas,
  totalPendentes,
  onEditarPerfil,
  onLogout,
}) => {
  const progresso = (creditosUsados / creditosTotais) * 100;

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 w-full max-w-sm text-center border border-dashed border-red-300">
      <img
        src={avatarUrl}
        alt="Avatar"
        className="w-24 h-24 rounded-full mx-auto mb-2"
      />
      <h2 className="text-xl font-semibold text-gray-800">{nome}</h2>
      <p className="text-sm text-gray-500">{email}</p>
      <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full inline-block mt-2">
        {perfil}
      </span>

      <div className="mt-4 flex items-center justify-center gap-2">
        <span
          className={`text-sm font-medium flex items-center gap-1 ${
            conectadoLinkedin ? "text-blue-600" : "text-gray-400"
          }`}
        >
          <Linkedin size={16} /> {conectadoLinkedin ? "Connected" : "Desconectado"}
        </span>
        <button
          onClick={onEditarPerfil}
          className="text-gray-600 hover:text-gray-900"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={onLogout}
          className="text-red-600 hover:text-red-800"
        >
          <LogOut size={16} />
        </button>
      </div>

      <div className="bg-gray-100 rounded-xl p-3 mt-4">
        <div className="flex justify-between text-sm text-gray-600 font-medium mb-1">
          <span>Créditos de IA</span>
          <span>
            {creditosUsados}/{creditosTotais}
          </span>
        </div>
        <div className="w-full bg-gray-300 rounded-full h-2">
          <div
            className="bg-purple-500 h-2 rounded-full"
            style={{ width: `${progresso}%` }}
          ></div>
        </div>
      </div>

      <div className="mt-4 flex justify-around text-center">
        <div>
          <div className="text-xl font-bold text-green-700">
            {totalPublicadas}
          </div>
          <div className="text-sm text-green-700">Publicadas</div>
        </div>
        <div>
          <div className="text-xl font-bold text-blue-700">
            {totalAgendadas}
          </div>
          <div className="text-sm text-blue-700">Agendadas</div>
        </div>
        <div>
          <div className="text-xl font-bold text-gray-700">
            {totalPendentes}
          </div>
          <div className="text-sm text-gray-700">Pendentes</div>
        </div>
      </div>
    </div>
  );
};

export default AvatarDropdown;
