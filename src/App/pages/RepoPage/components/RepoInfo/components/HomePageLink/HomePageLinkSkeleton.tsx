import React from 'react';
import { Skeleton } from 'components/';
import style from './HomePageLink.module.scss';

export type HomePageLinkSkeletonProps = {
  className?: string;
};

const HomePageLinkSkeleton: React.FC<HomePageLinkSkeletonProps> = () => {
  return (
    <span className={style.link}>
      <Skeleton variant="rounded" className={style.icon} height={16} width={16} />

      <Skeleton />
    </span>
  );
};

export default HomePageLinkSkeleton;
