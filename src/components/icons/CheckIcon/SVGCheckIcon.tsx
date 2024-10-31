import React from 'react';

const SVGCheckIcon: React.FC<React.SVGAttributes<SVGElement>> = ({ stroke, ...props }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props} fill="none">
    <path d="M4 11.6129L9.87755 18L20 7" stroke={stroke} strokeWidth="2" />
  </svg>
);
export default SVGCheckIcon;
