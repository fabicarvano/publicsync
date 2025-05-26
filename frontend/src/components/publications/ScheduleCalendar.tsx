import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ptBR } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PublicacaoStatus {
  data: string; // formato ISO: yyyy-MM-dd
  status: 'agendado' | 'publicado';
}

const ScheduleCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState('09:00');
  const [datasStatus, setDatasStatus] = useState<PublicacaoStatus[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCalendar, setShowCalendar] = useState(true);

  useEffect(() => {
    fetch('http://192.168.0.15:8000/publicacoes/status-por-data')
      .then((res) => res.json())
      .then(setDatasStatus)
      .catch((err) => console.error('Erro ao carregar status das datas:', err));
  }, []);

  const getDayClassName = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    const status = datasStatus.find((d) => d.data === dateStr)?.status;
    if (status === 'agendado') return 'bg-blue-200 text-blue-800 rounded-full';
    if (status === 'publicado') return 'bg-green-200 text-green-800 rounded-full';
    return '';
  };

  const isDayDisabled = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    const isAgendado = datasStatus.some((d) => d.data === dateStr && d.status === 'agendado');
    const isPast = date < new Date().setHours(0, 0, 0, 0);
    return isAgendado || isPast;
  };

  const handleAgendar = async () => {
    if (!selectedDate) return;

    const dataISO = selectedDate.toISOString().split('T')[0];
    setIsLoading(true);

    try {
      const response = await fetch('http://192.168.0.15:8000/publicacoes/agendar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify({ data: dataISO, hora: selectedTime }),
      });

      if (!response.ok) {
        throw new Error('Erro ao agendar');
      }

      setShowCalendar(false);
    } catch (error) {
      console.error('Erro ao agendar:', error);
      alert('Erro ao agendar publicação!');
    } finally {
      setIsLoading(false);
    }
  };

  if (!showCalendar) return null;

  return (
    <div className="absolute top-full mt-2 right-0 bg-white shadow-lg rounded-lg p-4 z-10 w-80 border border-neutral-200">
      <div className="text-center mb-3">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          locale={ptBR}
          dateFormat="dd/MM/yyyy"
          inline
          dayClassName={getDayClassName}
          excludeDates={datasStatus.filter(d => d.status === 'agendado').map(d => new Date(d.data))}
          filterDate={(date) => !isDayDisabled(date)}
        />

        <div className="flex items-center justify-between mb-3 mt-2">
          <label className="block text-sm font-medium text-neutral-700 font-body">Horário:</label>
          <Select defaultValue={selectedTime} onValueChange={setSelectedTime}>
            <SelectTrigger className="w-[100px] px-2 py-1 border-neutral-300 rounded h-8 text-sm">
              <SelectValue placeholder="Hora" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="09:00">09:00</SelectItem>
              <SelectItem value="12:00">12:00</SelectItem>
              <SelectItem value="15:00">15:00</SelectItem>
              <SelectItem value="18:00">18:00</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          className="w-full bg-blue-600 hover:bg-green-700 text-white font-body font-medium rounded shadow-sm"
          onClick={handleAgendar}
          disabled={isLoading}
        >
          {isLoading ? 'Agendando...' : 'Confirmar agendamento'}
        </Button>
      </div>
    </div>
  );
};

export default ScheduleCalendar;
