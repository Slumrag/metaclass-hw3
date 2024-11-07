import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { LanguagesTuple } from 'App/pages/RepoPage/types';

import { ProgressBar, Text } from 'components/';
import colorMapping from 'styles/githubColors.json';
import { calculateFraction } from 'utils/helpers/calculateFraction';
import Legend from './components/Legend';
import style from './LanguageStats.module.scss';

type mapping = Record<string, { color: null | string }>;

export type LanguageStatsProps = {
  className?: string;
  languages: LanguagesTuple[];
  title: string;
};

const LanguageStats: React.FC<LanguageStatsProps> = observer(({ className, languages, title }) => {
  const MAX_ITEMS = 6;
  const THRESHOLD = 0.2;
  const DEFAULT_COLOR = '#EDEDED';

  function sumLines(items: [string, number][]): number {
    return items.reduce((acc, cur) => acc + cur[1], 0);
  }

  let items = languages;
  const totalLines = sumLines(items);
  let subtotal = 0;

  const compareToThreshold = (el: [string, number]): boolean => calculateFraction(el[1], totalLines) > THRESHOLD;

  const isAboveThreshold = items.every(compareToThreshold);

  if (!isAboveThreshold || items.length > MAX_ITEMS) {
    if (!isAboveThreshold) {
      items = items.filter(compareToThreshold);
    }

    if (items.length > MAX_ITEMS) {
      items = items.slice(0, MAX_ITEMS);
    }

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
});

export default LanguageStats;
