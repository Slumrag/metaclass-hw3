import classNames from 'classnames';
import React, { useRef } from 'react';
import { useOnImageLoad } from 'utils/';
import Skeleton from '../Skeleton';
import Text from '../Text';
import style from './Card.module.scss';

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image?: string;
  /** Компоненнт, заменяющий изображение при отсутствие URL */
  imageFallback?: React.ReactNode;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  className,
  image,
  imageFallback = '',
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const isImageLoaded = useOnImageLoad(imgRef);
  return (
    <div className={classNames(style.card, className)} onClick={onClick}>
      <div className={style.header}>
        {image ? (
          <img className={style.image} src={image} ref={imgRef} style={{ display: isImageLoaded ? 'block' : 'none' }} />
        ) : (
          imageFallback
        )}
        {!isImageLoaded && <Skeleton variant="rectangle" />}
      </div>
      <div className={style.body}>
        <div className={style.main}>
          {captionSlot && (
            <Text className={style.caption} view="p-14" color="secondary">
              {captionSlot}
            </Text>
          )}
          <Text className={style.title} tag="h3" view="p-20" weight="bold" maxLines={2}>
            {title}
          </Text>
          <Text className={style.description} view="p-16" color="secondary" maxLines={3}>
            {subtitle}
          </Text>
        </div>
        <div className={style.footer}>
          {contentSlot && (
            <Text className={style.content} view="p-18" weight="bold">
              {contentSlot}
            </Text>
          )}
          {actionSlot && <div className={style.action}>{actionSlot}</div>}
        </div>
      </div>
    </div>
  );
};

export default Card;
