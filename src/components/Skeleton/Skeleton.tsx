import classNames from 'classnames';
import React from 'react';
import style from './Skeleton.module.scss';

export type SkeletonProps = React.ComponentProps<'div'> & {
  variant?: 'text' | 'rectangle' | 'rounded' | 'circle';
  width?: number;
  height?: number;
};

const Skeleton: React.FC<SkeletonProps> = ({ variant = 'text', width, height, ...props }) => {
  return (
    <div
      className={classNames(style.skeleton, style[variant])}
      style={width || height ? { width, height } : {}}
      {...props}
    ></div>
  );
};

export default Skeleton;
