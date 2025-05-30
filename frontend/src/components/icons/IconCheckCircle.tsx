
import React from 'react';

const IconCheckCircle = ({ className }: { className?: string }) => (
  <svg
    className={className || "w-6 h-6 text-green-500"}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
);
export default IconCheckCircle;
