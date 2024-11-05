import classNames from 'classnames';
import React from 'react';
import { EyeIcon, ForkIcon, StarIcon, Token } from 'components/';
import { FullRepositoryDisplayProps } from '../../types';
import HomePageLink from './components/HomePageLink';
import IconStat from './components/IconStat';
import LanguageStats from './components/LanguageStats';
import UserList from './components/UserList';
import style from './RepoInfo.module.scss';

export type RepoInfoProps = FullRepositoryDisplayProps & {
  className?: string;
};

const RepoInfo: React.FC<RepoInfoProps> = ({
  className,
  homepage,
  forks,
  stars,
  watchers,
  topics,
  languages,
  contributors,
}) => {
  return (
    <div className={classNames(style.container, className)}>
      {homepage && <HomePageLink href={homepage} />}

      {topics && <div className={style.topics}>{topics?.map((el, i) => <Token key={i}>{el}</Token>)}</div>}

      <div className={style.stats}>
        <IconStat icon={<StarIcon />} count={stars} title="stars" />
        <IconStat icon={<EyeIcon />} count={watchers} title="watching" />
        <IconStat icon={<ForkIcon />} count={forks} title="forks" />
      </div>
      <div className={style.body}>
        {contributors && <UserList title="Contributors" users={contributors} />}

        {languages && <LanguageStats title="Languages" className={style.languages} languages={languages} />}
      </div>
    </div>
  );
};

export default RepoInfo;
