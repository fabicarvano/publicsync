import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import NotFound from "./pages/NotFound";
import MainLayout from "./components/layout/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import PublicacoesPage from "./pages/PublicacoesPage";
import CadastroPage from "./pages/CadastroPage";
import UsuariosPage from "./pages/UsuariosPage";
import ConfiguracoesPage from "./pages/ConfiguracoesPage";
import LogoutPage from "./pages/LogoutPage";
import LoginPage from "./pages/Login";
import RotaProtegida from "./components/RotaProtegida";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Rota de login (não requer autenticação) */}
          <Route path="/login" element={<LoginPage />} />

          {/* Rotas protegidas com layout */}
          <Route
            element={
              <RotaProtegida>
                <MainLayout />
              </RotaProtegida>
            }
          >
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/publicacoes" element={<PublicacoesPage />} />
            <Route path="/cadastro" element={<CadastroPage />} />
            <Route path="/usuarios" element={<UsuariosPage />} />
            <Route path="/configuracoes" element={<ConfiguracoesPage />} />
          </Route>

          {/* Logout */}
          <Route path="/logout" element={<LogoutPage />} />

          {/* Página não encontrada */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
