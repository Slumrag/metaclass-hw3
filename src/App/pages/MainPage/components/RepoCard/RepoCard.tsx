import { Dayjs } from 'dayjs';
import { observer } from 'mobx-react-lite';
import React from 'react';
import Card from 'components/Card';
import { StarIcon } from 'components/icons';
import style from './RepoCard.module.scss';

export type RepoCardProps = {
  title: string;
  image?: string;
  subtitle?: string;
  updateTimestamp?: Dayjs | null;
  starCount?: number;
  onClick?: (name: string) => void;
};

const RepoCard: React.FC<RepoCardProps> = observer(
  ({ title, subtitle, onClick, image, updateTimestamp, starCount }) => {
    const placeholder = '/placeholder.png';
    const dateFormat = 'D MMM YYYY';
    return (
      <Card
        className={style.repoCard}
        image={image ?? placeholder}
        title={title}
        subtitle={subtitle}
        captionSlot={
          <span className={style.caption}>
            <span>
              <StarIcon />
            </span>
            <span className={style.starCounter}>{starCount}</span>
            {updateTimestamp && <span>{`Updated ${updateTimestamp?.format(dateFormat)}`}</span>}
          </span>
        }
        onClick={() => {
          if (onClick !== undefined) {
            onClick(title);
          }
        }}
      />
    );
  },
);

export default RepoCard;
