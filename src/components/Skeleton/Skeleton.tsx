import classNames from 'classnames';
import React from 'react';
import style from './Skeleton.module.scss';

export type SkeletonProps = React.ComponentProps<'div'> & {
  className?: string;
  variant?: 'text' | 'rectangle' | 'rounded' | 'circle';
  width?: number;
  height?: number;
};

const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className,
  style: styleProp,
  ...props
}) => {
  const components = {
    div: (
      <div
        className={classNames(style.skeleton, style[variant], className)}
        style={width || height ? { ...styleProp, width, height } : styleProp}
        {...props}
      ></div>
    ),
    span: (
      <span
        className={classNames(style.skeleton, style.text, className)}
        style={width || height ? { ...styleProp, width, height } : styleProp}
        {...props}
      ></span>
    ),
  };
  return components[variant === 'text' ? 'span' : 'div'];
};

export default Skeleton;
