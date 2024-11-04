import classNames from 'classnames';
import React from 'react';
import { Text } from 'components/';
import style from './IconStat.module.scss';

export type IconStatProps = {
  className?: string;
  icon?: React.ReactElement;
  count: number;
  title: string;
};

const IconStat: React.FC<IconStatProps> = ({ className, icon, count, title }) => {
  return (
    <Text className={classNames(style.body, className)} tag="span" color="secondary" view="p-14">
      {icon}
      <span>{count}</span>
      {title}
    </Text>
  );
};

export default IconStat;
