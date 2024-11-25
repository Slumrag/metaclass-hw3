import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Token } from 'components/';
import { FullRepositoryModel } from 'store/models';
import EngagementStats from './components/EngagementStats';
import HomePageLink from './components/HomePageLink';

import LanguageStats from './components/LanguageStats';
import UserDisplay from './components/UserDisplay';
import style from './RepoInfo.module.scss';

export type RepoInfoProps = {
  className?: string;
  repo: FullRepositoryModel;
};

const RepoInfo: React.FC<RepoInfoProps> = observer(({ className, repo }) => {
  return (
    <div className={classNames(style.container, className)}>
      {repo?.homepage && <HomePageLink href={repo.homepage} />}

      {repo?.topics && <div className={style.topics}>{repo.topics?.map((el, i) => <Token key={i}>{el}</Token>)}</div>}

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
