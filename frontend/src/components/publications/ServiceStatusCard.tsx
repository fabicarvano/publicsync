import React from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';

interface ServiceStatusCardProps {
  name: string;
  status: string; // "operacional", "intermitente", "fora"
  description: string;
  lastChecked: string;
}

const statusConfig = {
  operacional: {
    color: 'text-green-600',
    bg: 'bg-green-100',
    icon: <FaCheckCircle className="w-6 h-6" />,
  },
  intermitente: {
    color: 'text-yellow-600',
    bg: 'bg-yellow-100',
    icon: <FaExclamationTriangle className="w-6 h-6" />,
  },
  fora: {
    color: 'text-red-600',
    bg: 'bg-red-100',
    icon: <FaTimesCircle className="w-6 h-6" />,
  },
};

const ServiceStatusCard: React.FC<ServiceStatusCardProps> = ({
  name,
  status,
  description,
  lastChecked,
}) => {
  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig['fora'];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition duration-200">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <div className={`p-3 rounded-full ${config.bg} ${config.color}`}>
          {config.icon}
        </div>
      </div>
      <p className={`text-md font-bold ${config.color}`}>{status}</p>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
      <p className="text-xs text-gray-400 mt-2">Última verificação: {lastChecked}</p>
    </div>
  );
};

export default ServiceStatusCard;
