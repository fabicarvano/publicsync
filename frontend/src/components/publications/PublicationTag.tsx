
import React from 'react';

interface PublicationTagProps {
  text: string;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
}

const PublicationTag: React.FC<PublicationTagProps> = ({ text, icon, bgColor, textColor }) => {
  return (
    <span className={`px-2 py-1 ${bgColor} ${textColor} text-xs font-medium rounded-full flex items-center`}>
      {icon}
      {text}
    </span>
  );
};

export default PublicationTag;
