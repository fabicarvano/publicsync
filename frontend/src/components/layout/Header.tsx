import React, { useState } from 'react';
import { useUserInfo } from '@/hooks/useUserInfo';
import NotificationIcon from '@/components/icons/NotificationIcon';
import AvatarDropdown from '../publications/AvatarDropdown';
import { UserCircle } from 'lucide-react';

interface HeaderProps {
  title: string;
  description: string;
}

const Header: React.FC<HeaderProps> = ({ title, description }) => {
  const { user } = useUserInfo() || {};
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

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

        <div className="relative cursor-pointer" onClick={toggleDropdown}>
          <div className="flex items-center space-x-3">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="Usuário"
                className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover hover:scale-105 transition duration-200"
              />
            ) : (
              <UserCircle className="w-10 h-10 text-neutral-500" />
            )}
            <div className="hidden md:block">
              <p className="text-sm font-medium leading-none">{user?.nome}</p>
              <p className="text-xs text-muted-foreground">{user?.perfil}</p>
            </div>
          </div>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 z-50">
              <AvatarDropdown />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
