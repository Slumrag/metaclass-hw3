import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';
import style from './Avatar.module.scss';

export type AvatarProps = React.ComponentProps<'img'> & {
  variant?: 'square' | 'rounded' | 'circle';
  size?: 'small' | 'medium' | 'large';
  hasBorder?: boolean;
};

const Avatar: React.FC<AvatarProps> = observer(
  ({ className, src, variant = 'square', size = 'medium', hasBorder = false, ...props }) => {
    return (
      <img
        className={classNames(style.avatar, { [style.border]: hasBorder }, style[variant], style[size], className)}
        src={src}
        {...props}
      />
    );
  },
);

export default Avatar;
