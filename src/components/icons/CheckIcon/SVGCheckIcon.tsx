import { observer } from 'mobx-react-lite';
import React from 'react';

const SVGCheckIcon: React.FC<React.SVGAttributes<SVGElement>> = observer(({ ...props }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    style={{ fill: 'none' }}
    fill="none"
    {...props}
  >
    <path d="M4 11.6129L9.87755 18L20 7" strokeWidth="2" />
  </svg>
));
export default SVGCheckIcon;
