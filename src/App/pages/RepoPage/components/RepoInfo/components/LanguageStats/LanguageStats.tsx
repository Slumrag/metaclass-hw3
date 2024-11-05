import classNames from 'classnames';
import React from 'react';
import { RepositoryLanguages } from 'App/api/githubApi/types';
import { ProgressBar, Text } from 'components/';
import colorMapping from 'styles/githubColors.json';
import Legend from './components/Legend';
import style from './LanguageStats.module.scss';

type mapping = Record<string, { color: null | string }>;

export type LanguageStatsProps = {
  className?: string;
  languages: RepositoryLanguages;
  title: string;
};

const LanguageStats: React.FC<LanguageStatsProps> = ({ className, languages, title }) => {
  const items = Object.entries(languages);
  const totalLines = items.reduce((acc, cur) => acc + cur[1], 0);

  const progressItems = items.map(([lang, lines]) => ({
    text: lang,
    value: (lines / totalLines) * 100,
    color: (colorMapping as mapping)[lang].color ?? 'white',
  }));

  return (
    <div className={classNames(style.container, className)}>
      <Text weight="bold" view="p-18">
        {title}
      </Text>
      <ProgressBar items={progressItems} />
      <Legend items={progressItems} />
    </div>
  );
};

export default LanguageStats;
