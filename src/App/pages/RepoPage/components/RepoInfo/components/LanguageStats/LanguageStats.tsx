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

function calculateFraction(value: number, total: number) {
  return (value / total) * 100;
}

const LanguageStats: React.FC<LanguageStatsProps> = ({ className, languages, title }) => {
  const MAX_ITEMS = 6;
  const DEFAULT_COLOR = '#EDEDED';
  let items = Object.entries(languages);
  const totalLines = sumLines(items);
  let subtotal = 0;

  if (items.length > MAX_ITEMS) {
    items = items.slice(0, MAX_ITEMS);
    subtotal = sumLines(items);
    const others = ['other', totalLines - subtotal] as [string, number];
    items.push(others);
  }

  const progressItems = items.map(([lang, lines]) => ({
    text: lang,
    value: calculateFraction(lines, totalLines),
    color: (colorMapping as mapping)[lang]?.color ?? DEFAULT_COLOR,
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

  function sumLines(items: [string, number][]): number {
    return items.reduce((acc, cur) => acc + cur[1], 0);
  }
};

export default LanguageStats;
