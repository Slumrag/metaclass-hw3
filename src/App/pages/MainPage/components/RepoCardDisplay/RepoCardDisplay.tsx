import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React, { Suspense } from 'react';
import { MinimalRepositoryModel } from 'store/models';
import RepoCardSkeleton from '../RepoCard/RepoCardSkeleton';
import style from './RepoCardDisplay.module.scss';

const RepoCard = React.lazy(() => import('../RepoCard'));

export type RepoCardDisplayProps = {
  className?: string;
  data: MinimalRepositoryModel[];
  onClick?: (name: string) => void;
};

const RepoCardDisplay: React.FC<RepoCardDisplayProps> = observer(({ data, className, onClick }) => {
  return (
    <div className={classNames(style.cardDisplay, className)}>
      {data.map(({ id, name, description, stargazersCount, updatedAt, owner: { avatarUrl } }) => (
        <Suspense key={id} fallback={<RepoCardSkeleton />}>
          <RepoCard
            key={id}
            title={name}
            image={avatarUrl}
            subtitle={description!}
            updateTimestamp={updatedAt}
            starCount={stargazersCount!}
            onClick={onClick}
          />
        </Suspense>
      ))}
    </div>
  );
});

export default RepoCardDisplay;
