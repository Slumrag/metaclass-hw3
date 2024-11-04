import classNames from 'classnames';
import React from 'react';
import style from './Avatar.module.scss';

export type AvatarProps = React.ComponentProps<'img'> & {
  variant?: 'square' | 'rounded' | 'circle';
  size?: 'small' | 'medium' | 'large';
};

const Avatar: React.FC<AvatarProps> = ({ className, src, variant = 'square', size = 'medium', ...props }) => {
  return <img className={classNames(style.avatar, style[variant], style[size], className)} src={src} {...props} />;
};

export default Avatar;
