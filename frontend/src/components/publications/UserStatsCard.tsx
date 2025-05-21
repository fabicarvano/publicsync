import React, { useEffect, useState } from "react";
import api from "@/services/api";

interface UserStats {
  ativos: number;
  inativos: number;
  novos: number;
}

const UserStatsCard: React.FC = () => {
  const [stats, setStats] = useState<UserStats | null>(null);

  // useEffect correto dentro do componente
  useEffect(() => {
    const handleRefresh = () => {
      api
        .get("/usuarios/status")
        .then((response) => setStats(response.data))
        .catch((error) =>
          console.error("Erro ao carregar estatísticas:", error)
        );
    };

    // Executa ao montar
    handleRefresh();

    // Escuta eventos de atualização
    window.addEventListener("refreshUserStats", handleRefresh);
    return () => window.removeEventListener("refreshUserStats", handleRefresh);
  }, []);

  const displayStats = stats
    ? [
        { label: "Ativos", value: stats.ativos, color: "bg-green-500" },
        { label: "Novos (7 dias)", value: stats.novos, color: "bg-amber-500" },
        { label: "Inativos", value: stats.inativos, color: "bg-red-500" },
      ]
    : [];

  return (
    <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-lg font-semibold mb-3 text-primary-800 border-b pb-2">
        Status Usuários
      </h3>
      <div className="space-y-4">
        {displayStats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <span
                className={`inline-block w-3 h-3 rounded-full ${stat.color} mr-2`}
              />
              <h4>{stat.label}</h4>
            </div>
            <span className="font-bold">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserStatsCard;

