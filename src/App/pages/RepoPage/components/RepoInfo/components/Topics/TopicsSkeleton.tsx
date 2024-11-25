import { observer } from 'mobx-react-lite';
import React from 'react';
import { Skeleton } from 'components/';
import { range } from 'utils/';
import style from './Topics.module.scss';

export type TopicsSkeletonProps = {
  count?: number;
};

const TopicsSkeleton: React.FC<TopicsSkeletonProps> = observer(({ count = 3 }) => {
  return (
    <div className={style.topics}>
      {range(1, count)?.map((el) => (
        <Skeleton key={el} variant="rounded" width={70} height={24} style={{ borderRadius: 20 }} />
      ))}
    </div>
  );
});

export default TopicsSkeleton;
