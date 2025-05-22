// src/components/publications/RecentPublicationsSection.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Publicacao {
  id: number;
  tema: string;
  data_publicacao: string;
  descricao: string;
  status: string;
  link_publicacao: string | null;
  imagem: string | null;
  curtidas: number;
  comentarios: number;
  interacoes: number;
  visualizacoes: number;
}

const RecentPublicationsSection: React.FC = () => {
  const [publicacoes, setPublicacoes] = useState<Publicacao[]>([]);
  const [imagemModal, setImagemModal] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPublicacoes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://192.168.0.15:8000/publicacoes?skip=0&limit=10', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPublicacoes(response.data);
      } catch (error) {
        console.error('Erro ao buscar publicações:', error);
      }
    };

    fetchPublicacoes();
  }, []);

  const abrirImagem = (url: string | null) => {
    if (url) setImagemModal(url);
  };

  const editarPublicacao = (pub: Publicacao) => {
    navigate('/cadastro', { state: pub });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Publicações Recentes</h2>
      <div className="space-y-4">
        {publicacoes.map((pub) => (
          <div key={pub.id} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-800">{pub.tema}</h3>
                <p className="text-sm text-gray-500 mt-1">{pub.descricao}</p>

                <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-600">
                  {pub.status === 'publicado' && pub.link_publicacao && (
                    <>
                      <span className="flex items-center">👍 {pub.curtidas}</span>
                      <span className="flex items-center">💬 {pub.comentarios}</span>
                      <span className="flex items-center">🔁 {pub.interacoes}</span>
                      <a href={pub.link_publicacao} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        🔗 Link
                      </a>
                    </>
                  )}
                </div>
              </div>

              {pub.imagem && (
                <img
                  src={pub.imagem}
                  alt="Imagem da publicação"
                  className="w-24 h-24 rounded-lg object-cover cursor-pointer"
                  onClick={() => abrirImagem(pub.imagem)}
                />
              )}
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              {(pub.status === 'pendente' || pub.status === 'agendado') && (
                <button
                  onClick={() => editarPublicacao(pub)}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm"
                >
                  ✏️ Editar
                </button>
              )}
              {pub.status === 'agendado' && (
                <button
                  onClick={() => {}}
                  className="px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 text-sm"
                >
                  🚀 Publicar Agora
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Modal de imagem */}
        {imagemModal && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
            <div className="bg-white rounded-xl p-4 max-w-xl">
              <img src={imagemModal} alt="Imagem ampliada" className="max-w-full max-h-[80vh] rounded" />
              <div className="text-center mt-4">
                <button
                  onClick={() => setImagemModal(null)}
                  className="text-red-600 hover:underline"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentPublicationsSection;
