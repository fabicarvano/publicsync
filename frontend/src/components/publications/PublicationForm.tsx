import React, { useState } from 'react';
import AdvancedSettings from './AdvancedSettings';
import ContentPreview from './ContentPreview';
import ImageUpload from './ImageUpload';
import FormActions from './FormActions';
import PublicationIcon from './PublicationIcon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const PublicationForm: React.FC = () => {
  const [tema, setTema] = useState('');
  const [roteiro, setRoteiro] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [tom, setTom] = useState('');
  const [tipo, setTipo] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const [imagemUrl, setImagemUrl] = useState('');

  return (
    <div className="md:col-span-2 lg:col-span-3 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-2xl font-semibold mb-4 text-primary-800 border-b pb-2 font-title">Nova Publicação</h2>

      <div className="space-y-5">
        <div>
          <label htmlFor="tema" className="block text-sm font-medium text-neutral-700 mb-1 font-body">
            Tema da publicação
          </label>
          <Input
            id="tema"
            type="text"
            value={tema}
            onChange={(e) => setTema(e.target.value)}
            className="w-full px-4 py-2 border-neutral-300 rounded-lg focus:ring-primary-500 transition-all font-body"
            placeholder="Ex: Lançamento de produto, Dica profissional..."
          />
        </div>

        <div>
          <label htmlFor="roteiro" className="block text-sm font-medium text-neutral-700 mb-1 font-body">
            Roteiro
          </label>
          <Textarea
            id="roteiro"
            value={roteiro}
            onChange={(e) => setRoteiro(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border-neutral-300 rounded-lg focus:ring-primary-500 transition-all font-body"
            placeholder="Escreva os principais pontos para sua publicação..."
          />
        </div>

        <AdvancedSettings
          tom={tom}
          setTom={setTom}
          tipo={tipo}
          setTipo={setTipo}
          objetivo={objetivo}
          setObjetivo={setObjetivo}
        />

        <Button className="flex items-center justify-center w-full py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium rounded-lg shadow-sm hover:shadow-md hover:from-primary-600 hover:to-primary-700 transform hover:-translate-y-0.5 transition-all font-body">
          <PublicationIcon name="auto_awesome" className="mr-2" size={20} /> Gerar conteúdo com IA
        </Button>

        <ContentPreview />
        <ImageUpload />
      </div>

      <FormActions
        tema={tema}
        roteiro={roteiro}
        data={selectedDate?.toISOString().split('T')[0]} 
        tom={tom}
        tipo={tipo}
        objetivo={objetivo}
        imagemUrl={imagemUrl}
      />
    </div>
  );
};

export default PublicationForm;
