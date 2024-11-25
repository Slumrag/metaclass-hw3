import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { EyeIcon, ForkIcon, StarIcon } from 'components/';
import IconStat from './components/IconStat';
import style from './EngagementStats.module.scss';

export type EngagementStatsProps = {
  className?: string;
  stargazers: number;
  watchers: number;
  forks: number;
};

const EngagementStats: React.FC<EngagementStatsProps> = observer(({ className, stargazers, watchers, forks }) => {
  return (
    <div className={classNames(style.stats, className)}>
      <IconStat icon={<StarIcon />} count={stargazers} title="stars" />
      <IconStat icon={<EyeIcon />} count={watchers} title="watching" />
      <IconStat icon={<ForkIcon />} count={forks} title="forks" />
    </div>
  );
});

export default EngagementStats;
