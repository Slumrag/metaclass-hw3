import classNames from 'classnames';
import React from 'react';
import { Text } from 'components/';
import style from './Legend.module.scss';

export type LegendProps = {
  className?: string;
  items: { color: string; value: number; text: string }[];
};

const Legend: React.FC<LegendProps> = ({ className, items }) => {
  return (
    <ul className={classNames(style.legend, className)}>
      {items.map(({ text, value, color }) => (
        <li key={text} className={style.legendItem}>
          <span className={style.dot} style={{ backgroundColor: color }}></span>
          <span className={style.text}>
            <Text view="p-14" tag="span">
              {text}
            </Text>
            <span> </span>
            <Text view="p-14" tag="span" color="secondary">
              {value.toFixed(1) + '%'}
            </Text>
          </span>
        </li>
      ))}
    </ul>
  );
};

export default Legend;
