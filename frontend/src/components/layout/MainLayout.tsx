import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

interface PageMeta {
  title: string;
  description: string;
}

const pageMetaMap: Record<string, PageMeta> = {
  "/dashboard": { title: "Dashboard", description: "Visão geral da sua atividade." },
  "/publicacoes": { title: "Publicações", description: "Gerencie todo o seu conteúdo e acompanhe o status de suas publicações." },
  "/cadastro": { title: "Cadastro de Publicação", description: "Crie, edite e agende publicações com ajuda da inteligência artificial." },
  "/usuarios": { title: "Usuários", description: "Gerencie os usuários da plataforma." },
  "/configuracoes": { title: "Configurações", description: "Ajuste as configurações da sua conta e da aplicação." },
  "/logout": { title: "Logout", description: "Você foi desconectado." },
};

const MainLayout: React.FC = () => {
  const location = useLocation();

  const defaultMeta = { title: "PubliSync", description: "Bem-vindo ao PubliSync." };
  const currentMeta = pageMetaMap[location.pathname] || defaultMeta;

  return (
    <div id="webcrumbs" className="w-full min-h-screen bg-gradient-to-br from-blue-950 to-blue-500 font-sans">
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8 bg-white md:rounded-tl-3xl">
          <Header title={currentMeta.title} description={currentMeta.description} />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
