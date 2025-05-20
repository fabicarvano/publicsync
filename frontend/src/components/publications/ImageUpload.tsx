
import React, { useRef } from 'react';
import PublicationIcon from './PublicationIcon';

const ImageUpload: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="border-t pt-4">
      <label className="block text-sm font-medium text-neutral-700 mb-2 font-body">Imagem da publicação</label>
      <div
        className="border-2 border-dashed border-neutral-300 rounded-lg p-4 text-center hover:border-primary-400 transition-colors flex items-center justify-center"
      >
        <div className="flex flex-col items-center">
          <PublicationIcon name="image" className="text-3xl text-neutral-400" size={36} />
          <p className="mt-1 text-xs text-neutral-500 font-body">
            Arraste uma imagem ou clique para upload
          </p>
          <input type="file" className="hidden" id="image-upload" ref={fileInputRef} />
          <button
            type="button"
            onClick={handleButtonClick}
            className="mt-2 px-3 py-1 text-xs bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 transition-colors font-body"
          >
            Selecionar arquivo
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
