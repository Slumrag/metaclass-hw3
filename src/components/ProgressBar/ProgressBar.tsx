import classNames from 'classnames';
import React from 'react';
import style from './ProgressBar.module.scss';

export type ProgressBarProps = {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  /** value число от 0 до 100 процент заполнения шкалы */
  items?: { value: number; color: string }[];
};

const ProgressBar: React.FC<ProgressBarProps> = ({ className, items, size = 'medium' }) => {
  return (
    <div className={classNames(style.bar, style[size], className)}>
      {items?.map(({ color, value }, i) => (
        <span key={i} className={style.item} style={{ backgroundColor: color, width: value + '%' }}></span>
      ))}
    </div>
  );
};

export default ProgressBar;
