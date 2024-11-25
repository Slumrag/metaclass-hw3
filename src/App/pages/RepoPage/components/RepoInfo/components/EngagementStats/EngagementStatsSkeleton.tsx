import React from 'react';
import { Skeleton } from 'components/';
import style from './EngagementStats.module.scss';
import styleIcon from './components/IconStat/IconStat.module.scss';

const EngagementStatsSkeleton: React.FC = () => {
  return (
    <div className={style.stats}>
      <span className={styleIcon.body}>
        <Skeleton height={16} width={16} />
        <Skeleton height={16} width={55} />
        <Skeleton height={16} width={85} />
      </span>

      <span className={styleIcon.body}>
        <Skeleton height={16} width={16} />
        <Skeleton height={16} width={55} />
        <Skeleton height={16} width={85} />
      </span>

      <span className={styleIcon.body}>
        <Skeleton height={16} width={16} />
        <Skeleton height={16} width={55} />
        <Skeleton height={16} width={85} />
      </span>
    </div>
  );
};

export default EngagementStatsSkeleton;
