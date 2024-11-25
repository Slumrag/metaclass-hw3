import React from 'react';

import { Skeleton, Text } from 'components/';
import styleProgressBar from 'components/ProgressBar/ProgressBar.module.scss';
import { range } from 'utils/';
import style from './LanguageStats.module.scss';
import styleLegend from './components/Legend/Legend.module.scss';

export type LanguageStatsSkeleton = {
  count?: number;
};

const LanguageStatsSkeleton: React.FC<LanguageStatsSkeleton> = ({ count = 3 }) => {
  return (
    <div className={style.container}>
      <Text weight="bold" view="p-18">
        <Skeleton width={100} />
      </Text>
      <Skeleton variant="rounded" className={(styleProgressBar.bar, styleProgressBar.small)} />
      <span className={styleLegend.legend}>
        {range(1, count).map((el) => (
          <span key={el} className={styleLegend.legendItem}>
            <Skeleton className={styleLegend.dot} />
            <Skeleton className={styleLegend.text} width={45} />
          </span>
        ))}
      </span>
    </div>
  );
};

export default LanguageStatsSkeleton;
