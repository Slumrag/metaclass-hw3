import React from 'react';
import Card, { CardProps } from 'components/Card';
import { StarIcon } from 'components/icons';
import style from './RepoCard.module.scss';

export type RepoCardProps = Pick<CardProps, 'title' | 'subtitle' | 'onClick'> & {
  updateTimestamp?: string;
  starCount?: number;
};

const RepoCard: React.FC<RepoCardProps> = ({ title, subtitle, onClick, updateTimestamp, starCount }) => {
  const placeholder = '/placeholder.png';
  return (
    <Card
      className={style.repoCard}
      image={placeholder}
      title={title}
      subtitle={subtitle}
      captionSlot={
        <span className={style.caption}>
          <span>
            <StarIcon />
          </span>
          <span className={style.starCounter}>{starCount}</span>
          <span>{updateTimestamp}</span>
        </span>
      }
      onClick={(e) => {
        if (onClick !== undefined) {
          onClick(e);
        }
      }}
    />
  );
};

export default RepoCard;
