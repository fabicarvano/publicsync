import React, { useState } from 'react';
import PublicationIcon from './PublicationIcon';
import ScheduleCalendar from './ScheduleCalendar';
import { Button } from '@/components/ui/button';

interface FormActionsProps {
  tema: string;
  data?: stinrg;
  roteiro: string;
  tom?: string;
  tipo?: string;
  objetivo?: string;
  imagemUrl?: string;
}

const FormActions: React.FC<FormActionsProps> = ({
  tema,
  roteiro,
  tom,
  tipo,
  objetivo,
  imagemUrl
}) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const handleSalvarRascunho = async () => {
    if (!tema || !roteiro) {
      alert("Preencha o tema, roteiro e data para salvar.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://192.168.0.15:8000/publicacoes/rascunho", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          tema,
          roteiro,
          data_publicacao: localStorage.getItem('dataAgendamento'),
          tom,
          tipo,
          objetivo,
          imagem_url: imagemUrl,
          status_publicacao: "rascunho"
        }),
      });

      const data = await response.json();
      console.log("Rascunho salvo:", data);
      alert(`Rascunho salvo com sucesso. ID: ${data.id}`);
    } catch (error) {
      console.error("Erro ao salvar rascunho:", error);
      alert("Erro ao salvar rascunho.");
    }
  };

  return (
    <div className="flex flex-wrap gap-3 mt-8">
      <Button
        variant="outline"
        className="border-neutral-300 text-neutral-700 hover:bg-neutral-100 font-body"
        onClick={handleSalvarRascunho}
      >
        <PublicationIcon name="save" className="mr-1" size={18} /> Salvar rascunho
      </Button>

      <div className="relative group">
        <Button
          variant="outline"
          className="bg-primary-100 text-primary-700 border-primary-200 hover:bg-primary-200 font-body"
          onClick={() => setShowCalendar(!showCalendar)}
        >
          <PublicationIcon name="calendar_month" className="mr-1" size={18} /> Agendar publicação
        </Button>
        {showCalendar && <ScheduleCalendar />}
      </div>

      <Button className="bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all ml-auto font-body">
        <PublicationIcon name="send" className="mr-1" size={18} /> Publicar agora
      </Button>
    </div>
  );
};

export default FormActions;
