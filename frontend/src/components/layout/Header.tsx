import React from 'react';
import { useUserInfo } from '@/hooks/useUserInfo';
import NotificationIcon from '@/components/icons/NotificationIcon';

interface HeaderProps {
  title: string;
  description: string;
}

const Header: React.FC<HeaderProps> = ({ title, description }) => {
  const { user } = useUserInfo() || {};

  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div>
        <div className="text-2xl md:text-3xl font-bold text-gray-800">{title}</div>
        <div className="text-gray-500">{description}</div>
      </div>

      <div className="flex items-center space-x-4 mt-4 md:mt-0">
        <div className="relative">
          <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-200 relative">
            <NotificationIcon />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <img
            src={user?.avatar || "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=80"}
            alt="Usuário"
            className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover hover:scale-105 transition duration-200"
          />
          <div className="hidden md:block">
            <p className="text-sm font-medium leading-none">{user?.nome}</p>
            <p className="text-xs text-muted-foreground">{user?.perfil}</p>
         </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
