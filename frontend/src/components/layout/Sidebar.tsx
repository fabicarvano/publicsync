
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThunderboltIcon from '@/components/icons/ThunderboltIcon';
import DashboardIcon from '@/components/icons/DashboardIcon';
import PublicationsIcon from '@/components/icons/PublicationsIcon';
import CalendarIcon from '@/components/icons/CalendarIcon';
import UsersIcon from '@/components/icons/UsersIcon';
import SettingsIcon from '@/components/icons/SettingsIcon';
import EditIcon from '@/components/icons/EditIcon';
import LogoutIcon from '@/components/icons/LogoutIcon';
import { cn } from '@/lib/utils';

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: DashboardIcon },
  { href: "/publicacoes", label: "Publicações", icon: PublicationsIcon },
  { href: "/cadastro", label: "Cadastro", icon: EditIcon },
  { href: "/usuarios", label: "Usuários", icon: UsersIcon },
  { href: "/configuracoes", label: "Configurações", icon: SettingsIcon },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="w-full md:w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white p-4 md:min-h-screen transition-all duration-300 ease-in-out shadow-lg flex flex-col">
      <div className="flex items-center space-x-2 mb-8 p-2">
        <ThunderboltIcon />
        <h1 className="text-2xl font-bold">PubliSync</h1>
      </div>
      
      <nav className="space-y-1 flex-grow">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-700 transition-all duration-200",
              location.pathname === item.href && "bg-blue-700"
            )}
          >
            <item.icon />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      
      <div className="mt-auto pt-8">
        <div className="border-t border-blue-700 pt-4">
          <Link to="/logout" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-700 transition-all duration-200">
            <LogoutIcon />
            <span>Sair</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
