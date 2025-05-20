
import React from 'react';
// Icon for security was omitted as it's not in the allowed list.

const SecurityTipCard: React.FC = () => {
  return (
    <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-100">
      <h3 className="text-sm font-medium mb-2 text-primary-700 flex items-center">
        {/* <ShieldAlert className="mr-1 h-4 w-4" />  Omitted icon */}
        Dica de Segurança
      </h3>
      <p className="text-sm text-neutral-600">
        Lembre-se de revisar periodicamente os privilégios de acesso dos usuários para garantir a
        segurança dos dados. Usuários inativos por mais de 90 dias devem ser desativados
        automaticamente.
      </p>
    </div>
  );
};

export default SecurityTipCard;
