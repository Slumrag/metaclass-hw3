import React from 'react';
import './Loader.css';
import LoaderIcon from '../icons/LoaderIcon';

export type LoaderProps = {
  /** Размер */
  size?: 's' | 'm' | 'l';
  /** Дополнительный класс */
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({ size = 'l', className = '' }) => {
  const sizesMapping = {
    s: 24,
    m: 48,
    l: 60,
  };
  const iconSize = sizesMapping[size];
  return (
    <LoaderIcon
      className={'Loader ' + className}
      width={iconSize}
      height={iconSize}
    />
  );
};

export default Loader;
