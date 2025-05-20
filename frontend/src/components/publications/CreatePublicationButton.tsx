import React from 'react';
import { Link } from 'react-router-dom';
import PlusIcon from '@/components/icons/PlusIcon';

const CreatePublicationButton: React.FC = () => {
  return (
    <div className="mb-6">
      <Link to="/cadastro">
        <button className="w-full py-3 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors duration-200 flex items-center justify-center shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all">
          <PlusIcon />
          Criar nova publicação
        </button>
      </Link>
    </div>
  );
};

export default CreatePublicationButton;
