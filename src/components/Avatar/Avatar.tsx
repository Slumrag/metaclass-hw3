import classNames from 'classnames';
import React, { useRef } from 'react';
import { Skeleton } from 'components/';
import { useOnImageLoad } from 'utils/';
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
  const imgRef = useRef<HTMLImageElement>(null);
  const isLoaded = useOnImageLoad(imgRef);
  const skeletonVariant: 'circle' | 'rectangle' | 'rounded' = variant === 'square' ? 'rectangle' : variant;

  return (
    <div className={classNames(style.avatar, { [style.border]: hasBorder }, style[variant], style[size], className)}>
      {!isLoaded && <Skeleton variant={skeletonVariant} className={style.skeleton} />}
      <img className={style.image} src={src} {...props} ref={imgRef} />
    </div>
  );
};

export default Avatar;
