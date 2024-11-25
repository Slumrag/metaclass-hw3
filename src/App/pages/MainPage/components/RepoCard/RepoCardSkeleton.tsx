import React from 'react';
import { Card, Skeleton } from 'components/';
import style from './RepoCard.module.scss';

const RepoCardSkeleton: React.FC = () => {
  return (
    <Card
      className={style.repoCard}
      imageFallback={<Skeleton style={{ width: '100%', height: '100%' }} variant="rectangle" />}
      title={<Skeleton height={22} />}
      subtitle={<Skeleton />}
      captionSlot={
        <span className={style.captionSkeleton}>
          <span className={style.starCounter}> {<Skeleton width={30} />}</span>
          <Skeleton />
        </span>
      }
    />
  );
};

export default RepoCardSkeleton;
