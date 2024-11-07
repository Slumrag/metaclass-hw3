import { observer } from 'mobx-react-lite';
import React from 'react';

const SVGArrowLeftIcon: React.FC<React.SVGAttributes<SVGElement>> = observer(({ ...props }) => (
  <svg
    width="33"
    height="32"
    viewBox="0 0 33 32"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    style={{ fill: 'none' }}
    {...props}
  >
    <path
      d="M20.62 26.5599L11.9267 17.8666C10.9 16.8399 10.9 15.1599 11.9267 14.1333L20.62 5.43994"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
));

export default SVGArrowLeftIcon;
