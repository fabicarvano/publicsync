import React from 'react';

const EditIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 5h7M11 12h7M5 19h14M5 5l5 5-5 5"
    />
  </svg>
);

export default EditIcon;
