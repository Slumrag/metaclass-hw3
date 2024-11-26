import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React, { Suspense } from 'react';
import { FullRepositoryModel } from 'store/models';
import { EngagementStatsSkeleton } from './components/EngagementStats';
import { HomePageLinkSkeleton } from './components/HomePageLink';

import { LanguageStatsSkeleton } from './components/LanguageStats';
import { TopicsSkeleton } from './components/Topics';
import { UserDisplaySkeleton } from './components/UserDisplay';
import style from './RepoInfo.module.scss';

const HomePageLink = React.lazy(() => import('./components/HomePageLink'));
const Topics = React.lazy(() => import('./components/Topics'));
const EngagementStats = React.lazy(() => import('./components/EngagementStats'));
const UserDisplay = React.lazy(() => import('./components/UserDisplay'));
const LanguageStats = React.lazy(() => import('./components/LanguageStats'));

export type RepoInfoProps = {
  className?: string;
  repo: FullRepositoryModel;
};

const RepoInfo: React.FC<RepoInfoProps> = observer(({ className, repo }) => {
  return (
    <div className={classNames(style.container, className)}>
      <Suspense fallback={<HomePageLinkSkeleton />}>{repo?.homepage && <HomePageLink href={repo.homepage} />}</Suspense>

      <Suspense fallback={<TopicsSkeleton />}>{repo?.topics && <Topics topics={repo.topics} />}</Suspense>

      <Suspense fallback={<EngagementStatsSkeleton />}>
        <EngagementStats stargazers={repo?.stargazersCount} watchers={repo?.watchers} forks={repo?.forks} />
      </Suspense>

      <div className={style.body}>
        <Suspense fallback={<UserDisplaySkeleton />}>
          {repo?.contributors && repo.contributors?.length > 0 && (
            <UserDisplay title="Contributors" users={repo.contributors} count={repo.contributorsCount} />
          )}
        </Suspense>
        <Suspense fallback={<LanguageStatsSkeleton />}>
          {repo?.languages && repo.languages?.length > 0 && (
            <LanguageStats title="Languages" className={style.languages} languages={repo.languages} />
          )}
        </Suspense>
      </div>
    </div>
  );
});

export default RepoInfo;
