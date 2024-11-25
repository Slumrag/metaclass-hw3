import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Token } from 'components/';
import style from './Topics.module.scss';

export type TopicsProps = {
  className?: string;
  topics: string[];
};

const Topics: React.FC<TopicsProps> = observer(({ className, topics }) => {
  return (
    <div className={classNames(style.topics, className)}>{topics?.map((el, i) => <Token key={i}>{el}</Token>)}</div>
  );
});

export default Topics;
