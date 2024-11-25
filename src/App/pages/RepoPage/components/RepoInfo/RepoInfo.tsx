import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React, { Suspense } from 'react';
import { FullRepositoryModel } from 'store/models';
import EngagementStats from './components/EngagementStats';
import { HomePageLinkSkeleton } from './components/HomePageLink';

import LanguageStats from './components/LanguageStats';
import Topics from './components/Topics';
import UserDisplay from './components/UserDisplay';
import style from './RepoInfo.module.scss';

const HomePageLink = React.lazy(() => import('./components/HomePageLink'));

export type RepoInfoProps = {
  className?: string;
  repo: FullRepositoryModel;
};

const RepoInfo: React.FC<RepoInfoProps> = observer(({ className, repo }) => {
  return (
    <div className={classNames(style.container, className)}>
      <Suspense fallback={<HomePageLinkSkeleton />}>{repo?.homepage && <HomePageLink href={repo.homepage} />}</Suspense>

      {repo?.topics && <Topics topics={repo.topics} />}

      <EngagementStats stargazers={repo.stargazersCount} watchers={repo.watchers} forks={repo.forks} />

      <div className={style.body}>
        {repo?.contributors && repo.contributors?.length > 0 && (
          <UserDisplay title="Contributors" users={repo.contributors} count={repo.contributorsCount} />
        )}

        {repo?.languages && repo.languages?.length > 0 && (
          <LanguageStats title="Languages" className={style.languages} languages={repo.languages} />
        )}
      </div>
    </div>
  );
});

export default RepoInfo;
