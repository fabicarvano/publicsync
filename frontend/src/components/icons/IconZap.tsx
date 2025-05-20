
import React from 'react';

const IconZap = ({ className }: { className?: string }) => (
  <svg
    className={className || "w-3 h-3 mr-1"}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13 10V3L4 14h7v7l9-11h-7z"
    ></path>
  </svg>
);
export default IconZap;
