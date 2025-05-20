
import React from 'react';

interface StatusCardProps {
  title: string;
  value: string;
  changeText: string;
  icon: React.ReactNode;
  iconBgColor: string;
}

const StatusCard: React.FC<StatusCardProps> = ({ title, value, changeText, icon, iconBgColor }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <div className={`p-3 ${iconBgColor} rounded-full`}>
          {icon}
        </div>
      </div>
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-gray-500 text-sm mt-1">{changeText}</p>
    </div>
  );
};

export default StatusCard;
