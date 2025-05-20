
import React from 'react';
// Re-using CalendarIcon as CalendarDateIcon with smaller size if needed, or create specific
const CalendarDateIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);
export default CalendarDateIcon;
