import React from 'react';
import TagEducationalIcon from '@/components/icons/TagEducationalIcon';
import TagInformativeIcon from '@/components/icons/TagInformativeIcon';
import TagCareerIcon from '@/components/icons/TagCareerIcon';
import TagAnalysisIcon from '@/components/icons/TagAnalysisIcon';
import ThumbsUpIcon from '@/components/icons/ThumbsUpIcon';
import CopyLinkIcon from '@/components/icons/CopyLinkIcon';
import PlayButtonIcon from '@/components/icons/PlayButtonIcon';
import CalendarDateIcon from '@/components/icons/CalendarDateIcon';
import EyeIcon from '@/components/icons/EyeIcon'; // Changed import
import { MessageSquare } from 'lucide-react';


interface Tag {
  name: string;
  bgColor: string;
  textColor: string;
  icon: React.ReactNode;
}

interface PublicationItemProps {
  title: string;
  description: string;
  status: string;
  statusBgColor: string;
  statusTextColor: string;
  tags: Tag[];
  likes: number;
  comments: number;
  views: number;
  date: string;
}

const PublicationItem: React.FC<PublicationItemProps> = ({
  title, description, status, statusBgColor, statusTextColor, tags, likes, comments, views, date
}) => {
  return (
    <div className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, index) => (
              <span key={index} className={`px-2 py-1 ${tag.bgColor} ${tag.textColor} text-xs font-medium rounded-full flex items-center`}>
                {tag.icon}
                {tag.name}
              </span>
            ))}
          </div>
        </div>
        <span className={`px-3 py-1 ${statusBgColor} ${statusTextColor} text-xs font-medium rounded-full`}>{status}</span>
      </div>
      
      <div className="flex items-center mt-4 space-x-6 border-t border-gray-100 pt-3">
        <div className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors">
          <ThumbsUpIcon className="w-5 h-5 text-gray-500" />
          <span className="text-sm">{likes}</span>
        </div>
        <div className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors">
          <MessageSquare size={20} className="text-gray-500" />
          <span className="text-sm">{comments}</span>
        </div>
        <div className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors">
          <EyeIcon className="text-gray-500" /> {/* Used EyeIcon */}
          <span className="text-sm">{views}</span>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <CalendarDateIcon />
          <span>{date}</span>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50" title="Copiar link">
            <CopyLinkIcon />
          </button>
          <button className="p-2 text-green-500 hover:text-green-600 transition-colors rounded-full hover:bg-green-50" title="Publicar agora">
            <PlayButtonIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublicationItem;
