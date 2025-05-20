
import React from 'react';
import { Button } from '@/components/ui/button';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex justify-between items-center mt-6">
      <div className="text-sm text-neutral-600">
        Exibindo {totalItems > 0 ? startItem : 0}-{endItem} de {totalItems} usuários
      </div>
      <div className="flex space-x-1">
        <Button
          variant="outline"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded border border-neutral-300 text-neutral-700 hover:bg-neutral-100 transition-colors"
        >
          Anterior
        </Button>
        {[...Array(totalPages)].map((_, i) => (
          <Button
            key={i + 1}
            onClick={() => onPageChange(i + 1)}
            className={`px-3 py-1 rounded transition-colors ${
              currentPage === i + 1
                ? 'bg-primary-500 text-white hover:bg-primary-600'
                : 'border border-neutral-300 text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            {i + 1}
          </Button>
        ))}
        <Button
          variant="outline"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded border border-neutral-300 text-neutral-700 hover:bg-neutral-100 transition-colors"
        >
          Próximo
        </Button>
      </div>
    </div>
  );
};

export default PaginationControls;
