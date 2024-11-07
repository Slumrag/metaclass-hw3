import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';
import React from 'react';
import Card from 'components/Card';
import { StarIcon } from 'components/icons';
import style from './RepoCard.module.scss';

export type RepoCardProps = {
  title: string;
  subtitle?: string;
  updateTimestamp?: string;
  starCount?: number;
  onClick?: (name: string) => void;
};

const RepoCard: React.FC<RepoCardProps> = observer(({ title, subtitle, onClick, updateTimestamp, starCount }) => {
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
          {updateTimestamp && <span>{`Updated ${dayjs(updateTimestamp).format('D MMM YYYY')}`}</span>}
        </span>
      }
      onClick={() => {
        if (onClick !== undefined) {
          onClick(title);
        }
      }}
    />
  );
});

export default RepoCard;
