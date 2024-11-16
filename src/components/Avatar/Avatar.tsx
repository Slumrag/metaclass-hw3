import classNames from 'classnames';
import React from 'react';
import style from './Avatar.module.scss';

export type AvatarProps = React.ComponentProps<'img'> & {
  variant?: 'square' | 'rounded' | 'circle';
  size?: 'small' | 'medium' | 'large';
  hasBorder?: boolean;
};

const Avatar: React.FC<AvatarProps> = ({
  className,
  src,
  variant = 'square',
  size = 'medium',
  hasBorder = false,
  ...props
}) => {
  return (
    <img
      className={classNames(style.avatar, { [style.border]: hasBorder }, style[variant], style[size], className)}
      src={src}
      {...props}
    />
  );
};

export default Avatar;
