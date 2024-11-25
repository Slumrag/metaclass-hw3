import classNames from 'classnames';
import React from 'react';
import { range } from 'utils/';
import RepoCardSkeleton from '../RepoCard/RepoCardSkeleton';
import style from './RepoCardDisplay.module.scss';

export type RepoCardDisplaySkeletonProps = {
  className?: string;
  cardsCount?: number;
};

const RepoCardDisplaySkeleton: React.FC<RepoCardDisplaySkeletonProps> = ({ className, cardsCount = 30 }) => {
  return (
    <div className={classNames(style.cardDisplay, className)}>
      {range(1, cardsCount).map((el) => (
        <RepoCardSkeleton key={el} />
      ))}
    </div>
  );
};

export default RepoCardDisplaySkeleton;
