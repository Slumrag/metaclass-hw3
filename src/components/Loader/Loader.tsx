import classNames from 'classnames';
import React from 'react';
import LoaderIcon from '../icons/LoaderIcon';
import style from './Loader.module.scss';

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
    <LoaderIcon className={classNames(style.loader, className)} width={iconSize} height={iconSize} color="accent" />
  );
};

export default Loader;
