import classNames from 'classnames';
import React from 'react';
import './Card.css';
import Text from '../Text';

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
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
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
}) => {
  return (
    <div className={classNames('Card', className)} onClick={onClick}>
      <div className="Card__header">
        <img className="Card__image" src={image} alt="" />
      </div>
      <div className="Card__body">
        <div className="Card__main">
          {captionSlot && (
            <Text className="Card__caption" view="p-14" color="secondary">
              {captionSlot}
            </Text>
          )}
          <Text
            className="Card__title"
            tag="h3"
            view="p-20"
            weight="bold"
            maxLines={2}
          >
            {title}
          </Text>
          <Text
            className="Card__description"
            view="p-16"
            color="secondary"
            maxLines={3}
          >
            {subtitle}
          </Text>
        </div>
        <div className="Card__footer">
          {contentSlot && (
            <Text className="Card__content" view="p-18" weight="bold">
              {contentSlot}
            </Text>
          )}
          {actionSlot && <div className="Card__action">{actionSlot}</div>}
        </div>
      </div>
    </div>
  );
};

export default Card;
