
import React from 'react';
import {
  Sparkles,
  Save,
  CalendarDays,
  Send,
  Eye,
  Image as ImageIcon,
  BarChart2,
  ArrowRight,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  LucideProps,
  Icon as LucideIconComponent,
} from 'lucide-react';

// Mapeamento de nomes de ícones para componentes Lucide
const iconMap = {
  auto_awesome: Sparkles,
  save: Save,
  calendar_month: CalendarDays,
  send: Send,
  preview: Eye,
  image: ImageIcon,
  analytics: BarChart2,
  arrow_forward: ArrowRight,
  lightbulb: Lightbulb,
  expand_more: ChevronDown,
  expand_less: ChevronUp,
  // Adicione outros ícones do Material Symbols aqui se necessário
};

interface PublicationIconProps extends LucideProps {
  name: keyof typeof iconMap | string; // Permite nomes não mapeados para usar o span original
  className?: string;
}

const PublicationIcon: React.FC<PublicationIconProps> = ({ name, className, ...props }) => {
  const IconComponent = iconMap[name as keyof typeof iconMap];

  if (IconComponent) {
    return <IconComponent className={className} {...props} />;
  }

  // Fallback para Material Symbols se não mapeado ou se preferir usar a classe
  return (
    <span className={`material-symbols-outlined ${className || ''}`} {...props}>
      {name}
    </span>
  );
};

export default PublicationIcon;
