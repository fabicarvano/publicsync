
import React from 'react';
import { Button } from '@/components/ui/button'; // Usando o shadcn button
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Usando o shadcn select

const ScheduleCalendar: React.FC = () => {
  // Lógica simplificada do calendário por enquanto
  const days = ["D", "S", "T", "Q", "Q", "S", "S"];
  const dates = [
    ...Array(3).fill(null).map((_, i) => ({ day: 29 + i, disabled: true })),
    ...Array(18).fill(null).map((_, i) => ({ day: 1 + i, disabled: false, isSelected: i === 8 }))
  ];

  return (
    <div className="absolute top-full mt-2 right-0 bg-white shadow-lg rounded-lg p-4 z-10 w-72 border border-neutral-200">
      <div className="text-center mb-3">
        <div className="bg-primary-50 rounded-lg p-2 mb-3">
          <div className="text-primary-700 font-medium font-body">Novembro 2023</div>
          <div className="grid grid-cols-7 gap-1 mt-2">
            {days.map((day) => (
              <div key={day} className="text-xs text-neutral-500 font-body">{day}</div>
            ))}
            {dates.map((date, index) => (
              <div
                key={index}
                className={`text-center p-1 text-sm font-body ${date.disabled ? 'text-neutral-400' : ''} ${
                  date.isSelected ? 'bg-primary-500 text-white rounded-full hover:bg-primary-600 cursor-pointer' : 'hover:bg-primary-100 rounded-full cursor-pointer'
                }`}
              >
                {date.day}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-neutral-700 font-body">Horário:</label>
          <Select defaultValue="09:00">
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
        <Button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-body">
          Confirmar agendamento
        </Button>
      </div>
    </div>
  );
};

export default ScheduleCalendar;
