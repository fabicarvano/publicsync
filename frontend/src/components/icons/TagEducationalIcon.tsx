
import React from 'react';
// Using the same as ThunderboltIcon but smaller for tags
const TagEducationalIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);
export default TagEducationalIcon;
