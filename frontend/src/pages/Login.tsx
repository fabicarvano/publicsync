import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
         const response = await fetch("http://192.168.0.15:8000/login", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
          username: email,
          password: senha,
          }),
         });

      if (!response.ok) {
        throw new Error("Credenciais inválidas");
      }

const data = await response.json();

const avatar = data.avatar || "/public/user.jpg";

// Salvar tudo de forma centralizada
localStorage.setItem("token", data.access_token);
localStorage.setItem("user", JSON.stringify({
  nome: data.nome,
  perfil: data.perfil, // 'admin' ou 'usuario'
  avatar: avatar,
}));


      navigate("/dashboard");
    } catch (error: any) {
      setErro(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-blue-500 flex items-center justify-center font-sans">
      <div className="bg-white rounded-3xl shadow-xl flex w-full max-w-5xl overflow-hidden">
        {/* Lado esquerdo */}
        <div className="hidden md:flex w-2/5 bg-gradient-to-b from-blue-900 to-blue-700 p-10 text-white flex-col justify-between">
          <div>
            <div className="flex items-center mb-10 space-x-3">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h1 className="text-3xl font-bold">PubliSync</h1>
            </div>
            <h2 className="text-xl font-semibold mb-4">Gerencie suas publicações em um só lugar</h2>
            <p className="text-sm opacity-90 leading-relaxed">
              Agende, crie e analise o desempenho do seu conteúdo em diversas plataformas com facilidade.
            </p>
          </div>
          <ul className="space-y-4 mt-6 text-sm">
            <li>✅ Agende publicações para múltiplas redes</li>
            <li>✅ Analise métricas de desempenho</li>
            <li>✅ Colabore com sua equipe em tempo real</li>
          </ul>
        </div>

        {/* Lado direito - Login */}
        <div className="w-full md:w-3/5 p-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Bem-vindo de volta</h2>
          <p className="text-gray-600 mb-6">Faça login para acessar sua conta</p>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 mt-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="senha" className="block text-sm font-medium text-gray-700">Senha</label>
              <input
                id="senha"
                type="password"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full px-4 py-3 mt-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {erro && <p className="text-red-500 text-sm">{erro}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Entrar
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Não tem uma conta?{" "}
            <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">Criar conta</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
