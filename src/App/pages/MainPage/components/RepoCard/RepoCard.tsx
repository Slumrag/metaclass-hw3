import { Dayjs } from 'dayjs';
import { observer } from 'mobx-react-lite';
import React from 'react';
import Card from 'components/Card';
import Skeleton from 'components/Skeleton';
import { StarIcon } from 'components/icons';
import style from './RepoCard.module.scss';

export type RepoCardProps = {
  title?: string;
  loading?: boolean;
  image?: string;
  subtitle?: string;
  updateTimestamp?: Dayjs | null;
  starCount?: number;
  onClick?: (name: string) => void;
};

const DATE_FORMAT = 'D MMM YYYY';

const RepoCard: React.FC<RepoCardProps> = observer(
  ({ title, subtitle, onClick, image, loading = false, updateTimestamp, starCount }) => {
    const captionSlot = () => (
      <span className={style.caption}>
        <StarIcon className={style.starIcon} />

        <span className={style.starCounter}> {starCount}</span>
        {updateTimestamp && <span>{`Updated ${updateTimestamp?.format(DATE_FORMAT)}`}</span>}
      </span>
    );

    const captionSkeleton = () => (
      <span className={style.captionSkeleton}>
        <span className={style.starCounter}> {<Skeleton width={30} />}</span>
        <Skeleton />
      </span>
    );

    return (
      <Card
        className={style.repoCard}
        image={image}
        imageFallback={loading ? <Skeleton style={{ width: '100%', height: '100%' }} variant="rectangle" /> : ''}
        title={loading ? <Skeleton height={22} /> : title}
        subtitle={loading ? <Skeleton /> : subtitle}
        captionSlot={loading ? captionSkeleton() : captionSlot()}
        onClick={() => {
          if (onClick !== undefined) {
            onClick(title ?? '');
          }
        }}
      />
    );
  },
);

export default RepoCard;
